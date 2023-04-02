import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  firstName: string,
  lastName: string,
  email: string,
  registrationDate: string,
  role: string,
) {
  return { firstName, lastName, email, registrationDate, role };
}

const rows = [
  createData('Valeria', 'Rocha', 'valeria.mrb@gmail.com', '1/04/2023', 'trainer'),
  createData('Laura', 'Diaz', 'ldiaz@gmail.com', '1/04/2023', 'trainer'),
  createData('Lautaro', 'React', 'lautr@gmail.com', '1/04/2023', 'athlete'),
  createData('Mario', 'Paz', 'mpaz@gmail.com', '1/04/2023', 'athlete'),
  createData('Gimena', 'Lara', 'glara@gmail.com', '1/04/2023', 'athlete'),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Registration date</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.firstName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.firstName}
              </TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.registrationDate}</TableCell>
              <TableCell>{row.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
