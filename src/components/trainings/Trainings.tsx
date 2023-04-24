import { useEffect, useState } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './Trainings.scss';
import { useNavigate } from 'react-router-dom';
import { getTrainings, Training } from '../../api/TrainingService';


export default function Trainings() {
  const [rows, setRows] = useState<Training[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const data: Training[] = await getTrainings();
      console.log(data);
      setRows(data);
    }
  
    fetchData()
      .catch(console.error);
  }, []);

  const handleRowClick = (training: Training) => {
    navigate(`/training/${training.id}`);
  };

  return (
    <div className="trainings">
      <TableContainer component={Paper} className='user-table-container'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className='user-table-header'>
            <TableRow hover>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell>Media</TableCell>
              <TableCell>Goals</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow 
                hover
                selected
                key={row.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={() => handleRowClick(row)}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.difficulty}</TableCell>
                <TableCell>{row.media}</TableCell>
                <TableCell>{row.goals}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
