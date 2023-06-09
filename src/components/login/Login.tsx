import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

import { loginAdmin, LoginRequestData } from "../../api/AdminsService";

const LoginScreen: React.FC = () => {
  const [formData, setFormData] = useState<LoginRequestData>({
    email: "",
    password: "",
  });

  // Manejo de estados
  const [emailError, setEmailError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Limpio el estado de error cuando se modifica el campo de email
    if (name === "email" && emailError) {
      setEmailError(false);
    }
  };

  const handleLogin = async () => {
    // Valido el formato de email
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(formData.email)) {
      setEmailError(true); // Cambio el estado a error en el form
      return;
    }

    try {
      await loginAdmin(formData);
      navigate("/users");
    } catch (error: any) {
      //TODO esto para el caso de 500, sino identificar el error en particular
      setServerError(true);
      console.log(error.message);
    }
  };

  return (
    <Container maxWidth="xs" style={{ height: "100vh" }}>
      <Box className="login-container">
        <img src="/fiufit-logo.png" alt="logo" loading="lazy" />
        <Box className="login-form-container">
          {/* Formulario de inicio de sesión */}
          <Paper style={{ padding: 20, backgroundColor: "#fff" }}>
            <Typography variant="h5" align="center" gutterBottom>
              Iniciar Sesión
            </Typography>
            <TextField
              fullWidth
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              label="Email"
              margin="normal"
              error={emailError} //Cambio el estilo si hay error
              helperText={
                emailError
                  ? "Por favor, ingrese un correo electrónico válido."
                  : null
              } // TODO sacar el mensaje de acá.
            />
            <TextField
              fullWidth
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              label="Contraseña"
              margin="normal"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
              style={{
                marginTop: 20,
                backgroundColor: "#13678A",
                color: "#fff",
              }}
            >
              Iniciar Sesión
            </Button>
            {serverError && ( // Mostrar mensaje de error del servidor si serverError es verdadero
              <Typography
                variant="body2"
                color="error"
                align="center"
                style={{ marginTop: 10 }}
              >
                Server error. Please, try again later.
                {/* TODO sacar el mensaje de acá.*/}
              </Typography>
            )}
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginScreen;
