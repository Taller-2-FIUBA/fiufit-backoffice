import React, { useState } from "react";
import { Admin, useCreateAdmin } from "../../../api/AdminsService";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import "./AdminCreator.scss";

interface AdminCreatorProps {
    handleOnSuccess: () => void;
}

const AdminCreator: React.FC<AdminCreatorProps> = ({handleOnSuccess}) => {
    const {mutate: addAdmin} = useCreateAdmin();
    
    const [errorAdmin, setErrorAdmin] = useState<string>("");
    const [newAdmin, setNewAdmin] = useState<Admin>({
      id: "",
      email: "",
      password: "",
      username: "",
    });

    // Función para agregar un nuevo admin a la lista
    const handleAddAdmin = () => {
        if (!newAdmin.email || !newAdmin.password || !newAdmin.username) {
            setErrorAdmin("Todos los campos son requeridos."); // Mostrar mensaje de error si falta algún campo requerido
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
            handleOnSuccess();    // Cierro el modal
        } catch (error) {
            //TODO esto para el caso de 500, sino identificar el error en particular
            setErrorAdmin("Error al guardar el admin. Por favor, inténtelo de nuevo.");
        } 
    };

    const handleNewAdminChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewAdmin({ ...newAdmin, [name]: value });
    };

    return (
        <Card className="modal-container admin-creator-container">
            <CardContent className='modal-content admin-creator-content'>
                <Box className="admin-creator-details" sx={{ flexGrow: 1, overflow: 'hidden'}}>
                    <div className="admin-creator-field">
                        <span>Id:</span>
                        <input
                            className="admin-creator-field-input disabled"
                            type="text"
                            name="id"
                            value={newAdmin.id}
                            disabled
                            readOnly={true}
                        />
                    </div>
                    <div className="admin-creator-field">
                        <span>Username:</span>
                        <input
                            className="admin-creator-field-input"
                            type="text"
                            name="username"
                            value={newAdmin.username}
                            onChange={handleNewAdminChange}
                            required
                        />
                    </div>
                    <div className="admin-creator-field">
                        <span>Email:</span>
                        <input
                            className="admin-creator-field-input"
                            type="text"
                            name="email"
                            value={newAdmin.email}
                            onChange={handleNewAdminChange}
                            required
                        />
                    </div>
                    <div className="admin-creator-field">
                        <span>Password:</span>
                        <input
                            className="admin-creator-field-input"
                            type="text"
                            name="password"
                            value={newAdmin.password}
                            onChange={handleNewAdminChange}
                            required
                        />
                    </div>
                    <Button
                        variant="contained"
                        onClick={handleAddAdmin}
                        className='add-new-admin-button'
                    >
                        {"Guardar"}
                    </Button>
                </Box>
                {errorAdmin && (
                    <Typography
                        className="admin-creator-error"
                        color="error" 
                        variant="body1"
                    >
                        {errorAdmin}
                    </Typography>
                )}
                
            </CardContent>
        </Card>
    );
}

export default AdminCreator;