import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import './Trainings.scss';
import { useNavigate } from 'react-router-dom';
import { useTrainingsData, Training } from '../../api/TrainingService';

const headerRowItems = ['Title', 'Description', 'Type', 'Difficulty', 'Media', 'Goals'];

export default function Trainings() {
  const {isLoading, isError, error, data} = useTrainingsData();

  const navigate = useNavigate();
  
  const handleRowClick = (training: Training) => {
    //navigate(`/training/${training.id}`);
  };

  return (
    <div className="trainings">
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
            {data && data.map((row) => (
              <TableRow
                className='table-row' 
                hover
                key={row.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={() => handleRowClick(row)}
              >
                <TableCell className='table-row-cell'>{row.title}</TableCell>
                <TableCell className='table-row-cell'>{row.description}</TableCell>
                <TableCell className='table-row-cell'>{row.type}</TableCell>
                <TableCell className='table-row-cell'>{row.difficulty}</TableCell>
                <TableCell className='table-row-cell'>{row.media}</TableCell>
                <TableCell className='table-row-cell'>{row.goals}</TableCell>
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
    </div>
  );
}
