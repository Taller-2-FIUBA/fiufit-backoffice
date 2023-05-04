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
import "./Admins.scss";
import { Admin, getAdmins, createAdmin } from "../../api/AdminsService";

const headerRowItems = ["ID", "Username", "Email", "Password"];

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
      if (!newAdmin.email || !newAdmin.password || !newAdmin.username) {
        setError("Todos campos son requeridos."); // Mostrar mensaje de error si falta algún campo requerido
        return;
      }

      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(newAdmin.email)) {
        setError("El email no tiene el formato correcto");
        return;
      }

      if (newAdmin.password.length < 6) {
        setError("La password tiene que tener al menos 6 caracteres");
        return;
      }

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
            {admins.map((admin) => (
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
        {error && (
          <Typography color="error" variant="body1">
            {error}
          </Typography>
        )}
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
