import { useEffect, useState } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getUsers, User } from '../../api/UsersService';
import './Users.scss';
import Profile from '../profile/Profile';


export default function BasicTable() {
  const [rows, setRows] = useState<User[]>([]);
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const fetchData = async () => {
      const data: User[] = await getUsers();
      setRows(data);
      setUser(data[0]);
    }
  
    fetchData()
      .catch(console.error);
  }, []);

  const handleRowClick = (user: User) => {
    setUser(user);
  };

  return (
    <div className="users">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className='user-table-header'>
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
                onClick={() => handleRowClick(row)}
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
      <Profile user={user}/>
    </div>
  );
}
