import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Snackbar, Alert, Grid } from "@mui/material";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
    correo: "",
    fechaNacimiento: "",
    clave: "",
  });
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200 || response.status === 201) {
        setMessage("Usuario registrado exitosamente");
        setSeverity("success");
        setOpenSnackbar(true);
        setTimeout(() => navigate("/"), 3000); // Redirige a Home después de 3 segundos
      } else {
        setMessage("Error al registrar el usuario");
        setSeverity("error");
        setOpenSnackbar(true);
        setTimeout(() => navigate("/"), 3000); // Redirige a Home después de 3 segundos
      }
    } catch (error) {
      setMessage("Error al registrar el usuario");
      setSeverity("error");
      setOpenSnackbar(true);
      setTimeout(() => navigate("/"), 3000); // Redirige a Home después de 3 segundos
    }
  };

  const handleExit = () => {
    navigate("/"); // Redirige directamente a Home
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "80px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "600px",
          border: "1px solid transparent", // Define el borde
          borderImage: "linear-gradient(to right, #87CEFA, #1E90FF) 1", // Aplica el degradado
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center", marginBottom: "2rem" }}>
          Registro de Usuario
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <TextField
              label="Nombre"
              name="nombre"
              variant="outlined"
              fullWidth
              value={formData.nombre}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Apellido"
              name="apellido"
              variant="outlined"
              fullWidth
              value={formData.apellido}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Dirección"
              name="direccion"
              variant="outlined"
              fullWidth
              value={formData.direccion}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Correo"
              name="correo"
              type="email"
              variant="outlined"
              fullWidth
              value={formData.correo}
              onChange={handleChange}
            />
          </Grid>
          <Box sx={{ width: "40%" }}> {/* Contenedor para asegurar el ancho completo */}              
          <Grid item xs={12}>
          <TextField
              label="Fecha de Nacimiento"
              name="fechaNacimiento"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.fechaNacimiento}
              onChange={handleChange}
            />
            
          </Grid></Box>
          <Grid item xs={12}>
            <TextField
              label="Clave"
              name="clave"
              type="password"
              variant="outlined"
              fullWidth
              value={formData.clave}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2rem",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "48%" }}
            onClick={handleSubmit}
          >
            Enviar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "48%" }}
            onClick={handleExit}
          >
            Salir
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Register;