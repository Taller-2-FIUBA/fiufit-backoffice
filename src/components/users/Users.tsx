import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Container} from '@mui/material';
import { useUsersData, useUserUpdate, UserItem } from '../../api/UsersService';
import './Users.scss';
import BlockIcon from '@mui/icons-material/Block';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React from 'react';
import ModalWrapper from '../common/modal-wrapper/ModalWrapper';

const headerRowItems = [
  "Status",
  "Username",
  "Name",
  "Surname",
  "Email",
  "Registration date",
  "Location",
  "Role",
  "Actions",
];

export default function Users() {
  const {isLoading, isError, error, data} = useUsersData();
  const {mutate: updateUser} = useUserUpdate();

  const [selectedUser, setSelectedUser] = React.useState<UserItem | null>(null);
  
  const handleProfileClick = (user: UserItem) => {
    setSelectedUser(user);
  };

  const handleProfileClose = () => {
    setSelectedUser(null);
  }
  const handleBlockClick = (user: UserItem) => { 
    updateUser(user);
  };

  return (
    <Container className="users">
      <TableContainer component={Paper} className='table-container'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="table-header">
            <TableRow hover>
              {headerRowItems.map((item) => (
                <TableCell className="table-row-cell" key={item}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className='table-body'>
            {data && data.items && data.items.map((user) => (
              <TableRow
                className={user.is_blocked ? "table-row blocked" : "table-row"}
                hover
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <div className="table-row-cell status">
                    <span></span>
                  </div>
                </TableCell>
                <TableCell className="table-row-cell">
                  {user.username}
                </TableCell>
                <TableCell className="table-row-cell">{user.name}</TableCell>
                <TableCell className="table-row-cell">{user.surname}</TableCell>
                <TableCell className="table-row-cell">{user.email}</TableCell>
                <TableCell className="table-row-cell">
                  {user.registration_date}
                </TableCell>
                <TableCell className="table-row-cell">
                  {user.location}
                </TableCell>
                <TableCell className="table-row-cell">
                  {user.is_athlete ? "Athlete" : "Trainer"}
                </TableCell>
                <TableCell>
                  <IconButton className='table-icon' size="large" onClick={() => handleProfileClick(user)}>
                    <VisibilityIcon></VisibilityIcon>
                  </IconButton>
                  <IconButton className='table-icon' size="large" onClick={() => handleBlockClick(user)}>
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
      <ModalWrapper
        open={!!selectedUser}
        handleOnClose={handleProfileClose}
        type='user-details'
        value={selectedUser}
      />
    </Container>
  );
}
