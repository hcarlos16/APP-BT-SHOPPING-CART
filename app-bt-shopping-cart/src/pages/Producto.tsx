import React, { useState, useEffect } from "react";
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, Alert } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

function Producto() {
  const [productos, setProductos] = useState<any[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

 
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/productos");
        if (response.ok) {
          const data = await response.json();
          setProductos(data);
        } else {
          console.error("Error al obtener los productos:", response.statusText);
        }
      } catch (error) {
        console.error("Error en la petición:", error);
      }
    };

    fetchProductos();
  }, []);

 
  const handleDeleteProducto = async (id: number) => {
    try {
      const accessToken = localStorage.getItem("access_token");

      const response = await fetch(`http://localhost:8080/api/productos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setMessage("Producto eliminado.");
        setProductos((prevProductos) => prevProductos.filter((producto) => producto.id !== id));

        setTimeout(() => {
          setMessage(null);
        }, 3000);
      } else {
        console.error("Error al eliminar el producto:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };

  return (
    <Box sx={{ padding: "2rem", display: "flex", flexDirection: "column", height: "100vh" }}>
     
      <Typography variant="h4" sx={{ marginBottom: "1rem", textAlign: "center" }}>
        Gestión de productos
      </Typography>

     
      {message && (
        <Alert severity="success" sx={{ marginBottom: "1rem" }}>
          {message}
        </Alert>
      )}

      
      <TableContainer
        sx={{
          flex: 1, // Hace que la tabla ocupe el espacio disponible
          maxHeight: "400px", // Altura máxima para habilitar el scroll
          overflowY: "auto", // Habilita el scroll vertical
          border: "1px solid #ddd", // Bordes para la tabla
          borderRadius: "8px", // Bordes redondeados
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Imagen</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((producto) => (
              <TableRow key={producto.id}>
                <TableCell>{producto.nombre}</TableCell>
                <TableCell>
                  <img src={producto.imagen} alt={producto.nombre} style={{ width: "50px", height: "50px" }} />
                </TableCell>
                <TableCell>{producto.precio}$</TableCell>
                <TableCell align="center">
                  <IconButton color="error" onClick={() => handleDeleteProducto(producto.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

     
      <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
        <Button variant="contained" color="secondary" onClick={() => navigate("/")}>
          Salir
        </Button>
        <Button variant="contained" color="primary" onClick={() => navigate("/crear-producto")}>
          Crear
        </Button>
      </Box>
    </Box>
  );
}

export default Producto;