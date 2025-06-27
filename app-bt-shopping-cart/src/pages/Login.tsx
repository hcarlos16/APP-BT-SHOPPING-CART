import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Snackbar, Alert } from "@mui/material";

function Login({ setUser }: { setUser: (user: any) => void }) { // Recibe la función para actualizar el usuario
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/login?correo=${encodeURIComponent(correo)}&clave=${encodeURIComponent(clave)}`,
        {
          method: "POST",
        }
      );

      if (response.status === 200) {
        const token = await response.text();
        localStorage.setItem("access_token", token);

        const userResponse = await fetch(`http://localhost:8080/api/usuarios/correo?correo=${encodeURIComponent(correo)}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (userResponse.status === 200) {
          const userData = await userResponse.json();
          setUser(userData); 
          localStorage.setItem("user_id", userData.id);
          setMessage("Login exitoso");
          setSeverity("success");
          setOpenSnackbar(true);
          setTimeout(() => navigate("/"), 3000);
        } else {
          setMessage("Error al obtener los datos del usuario");
          setSeverity("error");
          setOpenSnackbar(true);
          setTimeout(() => navigate("/"), 3000);
        }
      } else {
        setMessage("Error en el login");
        setSeverity("error");
        setOpenSnackbar(true);
        setTimeout(() => navigate("/"), 3000);
      }
    } catch (error) {
      setMessage("Error en el login");
      setSeverity("error");
      setOpenSnackbar(true);
      setTimeout(() => navigate("/"), 3000);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleExit = () => {
    navigate("/"); // Redirige directamente a Home
  };

  return (
    <Box
      sx={{
        backgroundColor: "#ADD8E6",
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
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          width: "300px",
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "center", marginBottom: "1rem" }}>
          Iniciar Sesión
        </Typography>
        <TextField
          label="Correo"
          variant="outlined"
          fullWidth
          margin="normal"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <TextField
          label="Clave"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: "1rem" }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{ marginTop: "1rem" }}
          onClick={handleExit}
        >
          Salir
        </Button>
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

export default Login;