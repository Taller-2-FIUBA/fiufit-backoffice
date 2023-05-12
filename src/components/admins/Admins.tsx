import React, { useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import "./Admins.scss";
import { useAdminsData } from "../../api/AdminsService";
import ModalWrapper from "../common/modal-wrapper/ModalWrapper";
import { useNavigate } from "react-router-dom";


const headerRowItems = ["ID", "Username", "Email", "Password"];

const AdminsTablePage: React.FC = () => {

  const {isLoading, isError, error, data } = useAdminsData();
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();
  const buttonText = "+ Agregar Admin";
  
  const handleAddAdmin = () => {
    setIsAdding(true);
  }

  const handleCancelAddAdmin = () => {
    setIsAdding(false);
  }

  if (isError && (error as Error).message === "Unauthorized") {
    navigate("/login");
  }

  return (
    <Container className="admins">
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead className="table-header">
            <TableRow>
              {headerRowItems.map((item) => (
                <TableCell className="table-row-cell" key={item}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className='table-body'>
            {data && data.map((admin) => (
              <TableRow 
                className='table-row'
                key={admin.id}
                hover
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell className="table-row-cell">{admin.id}</TableCell>
                <TableCell className="table-row-cell">
                  {admin.username}
                </TableCell>
                <TableCell className="table-row-cell">{admin.email}</TableCell>
                <TableCell className="table-row-cell"> *** </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isError && (
          <Typography color="error" variant="body1">
            {(error as Error).message}
          </Typography>
        )}
        {isLoading && <Typography variant="body1">Loading...</Typography>}
      </TableContainer>
      <Button
        variant="contained"
        onClick={handleAddAdmin}
        className="add-admin-button"
      >
        {buttonText}
      </Button>
      <ModalWrapper 
        open={isAdding} 
        handleOnClose={handleCancelAddAdmin}
        type="admin-creator"
      />
    </Container>
  );
};

export default AdminsTablePage;
