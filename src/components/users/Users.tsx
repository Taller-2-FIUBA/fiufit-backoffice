import { useEffect, useState } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton} from '@mui/material';
import { getUsers, User } from '../../api/UsersService';
import './Users.scss';
import { useNavigate } from 'react-router-dom';
import BlockIcon from '@mui/icons-material/Block';
import VisibilityIcon from '@mui/icons-material/Visibility';

const headerRowItems = ['Status', 'Username', 'Name', 'Surname', 'Email', 'Registration date', 'Location', 'Role', 'Actions'];

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const data: User[] = await getUsers();
      setUsers(data);
    }
  
    fetchData()
      .catch(console.error);
  }, []);

  const handleProfileClick = (user: User) => {
    navigate(`/profile/${user.id}`);
  };

  const handleBlockClick = (user: User) => { 
    user.is_blocked = !user.is_blocked;
    setUsers([...users]);
  };

  return (
    <div className="users">
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
            {users.map((user) => (
              <TableRow
                className={user.is_blocked ? 'table-row blocked' : 'table-row'}
                hover
                key={user.username}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <div className='table-row-cell status'>
                    <span></span>
                  </div>
                </TableCell>
                <TableCell className='table-row-cell'>{user.username}</TableCell>
                <TableCell className='table-row-cell'>{user.name}</TableCell>
                <TableCell className='table-row-cell'>{user.surname}</TableCell>
                <TableCell className='table-row-cell'>{user.email}</TableCell>
                <TableCell className='table-row-cell'>{user.registration_date}</TableCell>
                <TableCell className='table-row-cell'>{user.location}</TableCell>
                <TableCell className='table-row-cell'>{user.is_athlete ? "Athlete" : "Trainer"}</TableCell>
                <TableCell>
                  <IconButton className='user-table-icon' size="large" onClick={() => handleProfileClick(user)}>
                    <VisibilityIcon></VisibilityIcon>
                  </IconButton>
                  <IconButton className='user-table-icon' size="large" onClick={() => handleBlockClick(user)}>
                    <BlockIcon></BlockIcon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
