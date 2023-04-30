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
import { Admin, useCreateAdmin, useAdminsData } from "../../api/AdminsService";


const headerRowItems = ["ID", "Username", "Email", "Password"];

const AdminsTablePage: React.FC = () => {

  const {isLoading, isError, error, data } = useAdminsData();
  const {mutate: addAdmin} = useCreateAdmin();

  const [errorAdmin, setErrorAdmin] = useState<string>("");
  const [newAdmin, setNewAdmin] = useState<Admin>({
    id: "",
    email: "",
    password: "",
    username: "",
  });
  const [isAdding, setIsAdding] = useState(false);
  const [addAdminButtonText, setAddAdminButtonText] = useState<string>("+ Agregar Admin");

  // Función para agregar un nuevo admin a la lista
  const handleAddAdmin = async () => {
    if (isAdding) {
      console.log("Guardar admin");
      if (!newAdmin.email || !newAdmin.password || !newAdmin.username) {
        setErrorAdmin("Todos campos son requeridos."); // Mostrar mensaje de error si falta algún campo requerido
        return;
      }

      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(newAdmin.email)) {
        setErrorAdmin("El email no tiene el formato correcto");
        return;
      }

      if (newAdmin.password.length < 6) {
        setErrorAdmin("La password tiene que tener al menos 6 caracteres");
        return;
      }

      try {
        addAdmin(newAdmin)  // Guardo el nuevo admin en la base de datos
        // OK
      } catch (error) {
        //TODO esto para el caso de 500, sino identificar el error en particular
        setErrorAdmin("Error al guardar el admin. Por favor, inténtelo de nuevo.");
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
    <Container className="admins">
      <TableContainer component={Paper} className='table-container'>
        <Table>
          <TableHead className='table-header'>
            <TableRow>
              {headerRowItems.map((item) => (
                <TableCell className='table-row-cell' key={item}>{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className='table-body'>
            {data && data.map((admin) => (
              <TableRow 
                className='table-row'
                key={admin.id}
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                  <TableCell className='table-row-cell'>{admin.id}</TableCell>
                  <TableCell className='table-row-cell'>{admin.username}</TableCell>
                  <TableCell className='table-row-cell'>{admin.email}</TableCell>
                  <TableCell className='table-row-cell'> *** </TableCell>
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
                    required
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    name="email"
                    value={newAdmin.email}
                    onChange={handleNewAdminChange}
                    required
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    name="password"
                    value={newAdmin.password}
                    onChange={handleNewAdminChange}
                    required
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {isError && (
          <Typography color="error" variant="body1">
            {(error as Error).message}
          </Typography>
        )}
        {errorAdmin && (
          <Typography color="error" variant="body1">
            {errorAdmin}
          </Typography>
        )}
        {isLoading && <Typography variant="body1">Loading...</Typography>}
      </TableContainer>
      <Button
        variant="contained"
        onClick={handleAddAdmin}
        className='add-admin-button'
      >
        {addAdminButtonText} {/* Me devuelve el texto del botón */}
      </Button>
    </Container>
  );
};

export default AdminsTablePage;
