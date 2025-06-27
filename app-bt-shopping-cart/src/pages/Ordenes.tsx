import React, { useState, useEffect } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate

function Ordenes() {
  const [ordenes, setOrdenes] = useState<any[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate(); // Inicializa el hook useNavigate

  // Función para obtener las órdenes al cargar el componente
  useEffect(() => {
    const fetchOrdenes = async () => {
      const accessToken = localStorage.getItem("access_token"); // Obtiene el token del localStorage

      try {
        const response = await fetch("http://localhost:8080/api/ordenes", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Agrega el encabezado Authorization
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrdenes(data); // Actualiza el estado con las órdenes obtenidas
        } else {
          setMessage("Error al obtener las órdenes.");
        }
      } catch (error) {
        console.error("Error en la petición:", error);
        setMessage("Error en la petición.");
      }
    };

    fetchOrdenes();
  }, []);

  return (
    <Box sx={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      {/* Título y botón de volver */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <Typography variant="h4">Gestión de Órdenes</Typography>
        <Button variant="contained" color="secondary" onClick={() => navigate("/")}>
          Volver
        </Button>
      </Box>

      {/* Mensaje de error */}
      {message && (
        <Alert severity="error" sx={{ marginBottom: "1rem" }}>
          {message}
        </Alert>
      )}

      {/* Tabla de órdenes */}
      <TableContainer
        sx={{
          maxHeight: "400px", // Altura máxima para habilitar el scroll
          overflowY: "auto", // Habilita el scroll vertical
          border: "1px solid #ddd", // Bordes para la tabla
          borderRadius: "8px", // Bordes redondeados
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Monto Total</TableCell>
              <TableCell>Activo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordenes.map((orden) => (
              <TableRow key={orden.id}>
                <TableCell>{orden.id}</TableCell>
                <TableCell>{orden.usuario?.nombre || "Sin usuario"}</TableCell>
                <TableCell>{orden.montoTotal}$</TableCell>
                <TableCell
                  sx={{
                    boxShadow: orden.activo ? "0px 4px 8px rgba(0, 255, 0, 0.6)" : "0px 4px 8px rgba(255, 0, 0, 0.6)", // Sombra verde o roja
                    borderRadius: "4px", // Bordes redondeados
                    padding: "0.5rem", // Espaciado interno
                    textAlign: "center", // Centra el texto
                  }}
                >
                  {orden.activo ? "Sí" : "No"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Ordenes;