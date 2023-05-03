import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container, IconButton, Modal } from '@mui/material';
import './Trainings.scss';
import { useTrainingsData, Training, useTrainingUpdate } from '../../api/TrainingService';
import BlockIcon from '@mui/icons-material/Block';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React from 'react';
import TrainingDetailView from './training-detail-view/TrainingDetailView';

const headerRowItems = ['Status', 'Title', 'Description', 'Type', 'Difficulty', 'Media', 'Goals', 'Actions'];

export default function Trainings() {
  const {isLoading, isError, error, data} = useTrainingsData();
  const {mutate: updateTraining} = useTrainingUpdate();

  const [selectedTraining, setSelectedTraining] = React.useState<Training | null>(null);
  
  
  const handleDetailViewClick = (training: Training) => {
    setSelectedTraining(training);
  };

  const handleProfileClose = () => {
    setSelectedTraining(null);
  }
  const handleBlockClick = (training: Training) => { 
    training.is_blocked = !training.is_blocked;
    updateTraining(training);
  };

  return (
    <Container className="trainings">
      <TableContainer component={Paper} className='table-container'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className='table-header'>
            <TableRow hover>
              {headerRowItems.map((item) => (
                <TableCell className='table-row-cell' key={item}>{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className='table-body'>
            {data && data.map((training) => (
              <TableRow
              className={training.is_blocked ? 'table-row blocked' : 'table-row'}
                hover
                key={training.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <div className='table-row-cell status'>
                    <span></span>
                  </div>
                </TableCell>
                <TableCell className='table-row-cell'>{training.title}</TableCell>
                <TableCell className='table-row-cell'>{training.description}</TableCell>
                <TableCell className='table-row-cell'>{training.type}</TableCell>
                <TableCell className='table-row-cell'>{training.difficulty}</TableCell>
                <TableCell className='table-row-cell'>{training.media}</TableCell>
                <TableCell className='table-row-cell'>{training.goals}</TableCell>
                <TableCell>
                  <IconButton className='table-icon' size="large" onClick={() => handleDetailViewClick(training)}>
                    <VisibilityIcon></VisibilityIcon>
                  </IconButton>
                  <IconButton className='table-icon' size="large" onClick={() => handleBlockClick(training)}>
                    <BlockIcon></BlockIcon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isError && <div>
          <Typography color="error" variant="body1">
            {(error as Error).message}
          </Typography>
        </div>}
        {isLoading && <div>Loading...</div>}
      </TableContainer>
      <Modal
        open={!!selectedTraining}
        onClose={handleProfileClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <TrainingDetailView training={selectedTraining}></TrainingDetailView>
      </Modal>
    </Container>
  );
}
