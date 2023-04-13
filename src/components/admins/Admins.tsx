import React, { useState, useEffect } from "react";
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
import { Admin, getAdmins } from "../../api/AdminsService";

const AdminsTablePage: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const adminsData = await getAdmins();
        setAdmins(adminsData); // Actualizo con los datos nuevos
      } catch (error) {
        console.error("Error al cargar administradores", error);
        setError("Error al traer los admins. Por favor, inténtelo de nuevo.");
      }
    };
    fetchAdmins();
  }, []);

  // Función para agregar un nuevo admin a la lista
  const handleAddAdmin = () => {
    console.log("agregar admin");
  };

  return (
    <Container maxWidth="md">
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ marginTop: 20, backgroundColor: "#ccc" }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>{admin.id}</TableCell>
                <TableCell>{admin.username}</TableCell>
                <TableCell>{admin.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {error && (
          <Typography color="error" variant="body1">
            {error}
          </Typography>
        )}
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddAdmin}
        style={{ marginTop: 20, backgroundColor: "#45C4B0" }}
      >
        + Agregar Admin
      </Button>
    </Container>
  );
};

export default AdminsTablePage;
