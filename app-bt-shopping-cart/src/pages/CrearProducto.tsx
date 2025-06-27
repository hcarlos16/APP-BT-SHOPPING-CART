import React, { useState } from "react";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate

function CrearProducto() {
  const [formData, setFormData] = useState({
    imagen: "",
    descripcion: "",
    nombre: "",
    precio: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate(); // Inicializa el hook useNavigate

  // Maneja los cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Valida que el precio solo permita números decimales
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^\d*\.?\d*$/.test(value)) {
      setFormData((prevData) => ({
        ...prevData,
        precio: value,
      }));
    }
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("access_token"); // Obtiene el token del localStorage

    const body = {
      imagen: formData.imagen,
      descripcion: formData.descripcion,
      nombre: formData.nombre,
      precio: parseFloat(formData.precio), // Convierte el precio a número
    };

    try {
      const response = await fetch("http://localhost:8080/api/productos", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`, // Agrega el encabezado Authorization
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setMessage("Producto creado exitosamente.");
        setFormData({ imagen: "", descripcion: "", nombre: "", precio: "" }); // Limpia el formulario
      } else {
        setMessage("Error al crear el producto.");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      setMessage("Error en la petición.");
    }

    // Limpia el mensaje después de 3 segundos
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  return (
    <Box sx={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      {/* Título */}
      <Typography variant="h4" sx={{ marginBottom: "2rem", textAlign: "center" }}>
        Crear Producto
      </Typography>

      {/* Mensaje de éxito o error */}
      {message && (
        <Alert severity={message.includes("exitosamente") ? "success" : "error"} sx={{ marginBottom: "1rem" }}>
          {message}
        </Alert>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre del producto"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Descripción"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "1rem" }}
        />
        <TextField
          label="URL de la imagen"
          name="imagen"
          value={formData.imagen}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Precio"
          name="precio"
          value={formData.precio}
          onChange={handlePriceChange}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "1rem" }}
        />
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Guardar
          </Button>
          <Button variant="contained" color="secondary" fullWidth onClick={() => navigate("/productos")}>
            Volver a Productos
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default CrearProducto;