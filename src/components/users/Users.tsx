import { useEffect, useState } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton} from '@mui/material';
import { getUsers, User } from '../../api/UsersService';
import './Users.scss';
import { useNavigate } from 'react-router-dom';
import BlockIcon from '@mui/icons-material/Block';
import VisibilityIcon from '@mui/icons-material/Visibility';


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
      <TableContainer component={Paper} className='user-table-container'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className='user-table-header'>
            <TableRow hover>
              <TableCell className='user-table-row-cell'>Status</TableCell>
              <TableCell className='user-table-row-cell'>Username</TableCell>
              <TableCell className='user-table-row-cell'>Name</TableCell>
              <TableCell className='user-table-row-cell'>Surname</TableCell>
              <TableCell className='user-table-row-cell'>Email</TableCell>
              <TableCell className='user-table-row-cell'>Registration date</TableCell>
              <TableCell className='user-table-row-cell'>Birth date</TableCell>
              <TableCell className='user-table-row-cell'>Location</TableCell>
              <TableCell className='user-table-row-cell'>Weight</TableCell>
              <TableCell className='user-table-row-cell'>Height</TableCell>
              <TableCell className='user-table-row-cell'>Role</TableCell>
              <TableCell className='user-table-row-cell'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className='user-table-body'>
            {users.map((user) => (
              <TableRow
                className={user.is_blocked ? 'user-table-row blocked' : 'user-table-row'}
                hover
                key={user.username}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <div className='user-table-row-status'>
                    <span></span>
                  </div>
                </TableCell>
                <TableCell className='user-table-row-cell' component="th" scope="row">
                  {user.username}
                </TableCell>
                <TableCell className='user-table-row-cell'>{user.name}</TableCell>
                <TableCell className='user-table-row-cell'>{user.surname}</TableCell>
                <TableCell className='user-table-row-cell'>{user.email}</TableCell>
                <TableCell className='user-table-row-cell'>{user.registration_date}</TableCell>
                <TableCell className='user-table-row-cell'>{user.birth_date}</TableCell>
                <TableCell className='user-table-row-cell'>{user.location}</TableCell>
                <TableCell className='user-table-row-cell'>{user.weight}</TableCell>
                <TableCell className='user-table-row-cell'>{user.height}</TableCell>
                <TableCell className='user-table-row-cell'>{user.is_athlete ? "Athlete" : "Trainer"}</TableCell>
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
