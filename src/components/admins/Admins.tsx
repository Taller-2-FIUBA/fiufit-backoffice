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

import { Admin, getAdmins, createAdmin } from "../../api/AdminsService";

const AdminsTablePage: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [error, setError] = useState<string>("");

  const [newAdmin, setNewAdmin] = useState<Admin>({
    id: "",
    email: "",
    password: "",
    username: "",
  });
  const [isAdding, setIsAdding] = useState(false);
  const [addAdminButtonText, setAddAdminButtonText] =
    useState<string>("+ Agregar Admin");

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
  const handleAddAdmin = async () => {
    if (isAdding) {
      console.log("Guardar admin");

      try {
        const savedAdmin = await createAdmin(newAdmin);
        setAdmins([...admins, savedAdmin]); // Agrego el nuevo admin a la lista

        // OK
      } catch (error) {
        //TODO esto para el caso de 500, sino identificar el error en particular
        setError("Error al guardar el admin. Por favor, inténtelo de nuevo.");
      }

      setIsAdding(false); // Vuelvo a la vista normal
      setAddAdminButtonText("+ Agregar Admin");
    } else {
      setIsAdding(true);
      setNewAdmin({ id: "", username: "", email: "", password: "" }); // Limpio el campo
      setAddAdminButtonText("Guardar"); // Cambiar el texto del botón a "Guardar"
    }
  };

  const handleNewAdminChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewAdmin({ ...newAdmin, [name]: value });
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
              <TableCell>Password</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>{admin.id}</TableCell>
                <TableCell>{admin.username}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell> *** </TableCell>
              </TableRow>
            ))}
            {isAdding && (
              <TableRow>
                <TableCell>
                  <input
                    type="text"
                    name="id"
                    value={newAdmin.id}
                    disabled
                    readOnly={true}
                    style={{ backgroundColor: "#f2f2f2" }}
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    name="username"
                    value={newAdmin.username}
                    onChange={handleNewAdminChange}
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    name="email"
                    value={newAdmin.email}
                    onChange={handleNewAdminChange}
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    name="password"
                    value={newAdmin.password}
                    onChange={handleNewAdminChange}
                  />
                </TableCell>
              </TableRow>
            )}
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
        {addAdminButtonText} {/* Me devuelve el texto del botón */}
      </Button>
    </Container>
  );
};

export default AdminsTablePage;
