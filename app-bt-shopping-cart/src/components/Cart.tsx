import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Box, Typography, Button, Alert } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface CartProps {
  onClose: () => void;
  cart: any[];
  setCart: (cart: any[]) => void;
}

function Cart({ onClose, cart, setCart }: CartProps) {
  const [message, setMessage] = useState<string | null>(null); // Estado para el mensaje
  const [statusRes, setStatusRes] = useState<boolean | null>(null); // Estado para el resultado de la operación

  const handleRemoveItem = (productId: number) => {
    const index = cart.findIndex((product) => product.id === productId);
    if (index !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(index, 1); // Elimina solo el primer producto que coincida con el id
      setCart(updatedCart); // Actualiza el estado del carrito
    }
  };

  // Calcula el total de la compra
  const totalCompra = cart.reduce((total, product) => total + product.precio, 0).toFixed(2);

  // Función para guardar la información en la base de datos
  const handleSaveToDatabase = async () => {
    const userId = localStorage.getItem("user_id");
    const accessToken = localStorage.getItem("access_token");

    if (!userId || !accessToken) {
      setMessage("No se encontró el user-id o access_token en localStorage.");
      return;
    }

    const body = {
      usuarioId: userId,
      montoTotal: parseFloat(totalCompra), // Convierte el total a número
      activo: false,
    };

    try {
      const response = await fetch("http://localhost:8080/api/ordenes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      });

      
      
      

      if (response.ok) {
        const orden = await response.json();
        setMessage("Se registro la orgen "+ orden.id + " satisfactoriamente.");
        setStatusRes(true);

        setTimeout(() => {
          setCart([]);
          onClose(); // Oculta el componente Cart después de 3 segundos

        }, 3000);

      } else {
        setStatusRes(false);
        setMessage(`Error al guardar el carrito: ${response.statusText}`);
      }
    } catch (error) {
      setMessage("Error en la petición ");
    }
  };

  return (
    <Box
      sx={{
        position: "fixed", // Posiciona el carrito en relación a la ventana
        top: "50%", // Centra verticalmente
        left: "50%", // Centra horizontalmente
        transform: "translate(-50%, -50%)", // Ajusta el punto de referencia al centro
        width: "90%", // Tamaño fijo responsive
        maxWidth: "800px", // Limita el ancho máximo
        height: "70vh", // Tamaño fijo para la altura
        padding: "2rem",
        backgroundColor: "rgba(255, 255, 255, 0.94)", // Fondo blanco con transparencia
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)", // Sombra para efecto flotante
        borderRadius: "16px", // Bordes curvos
        border: "1px solid #ddd", // Bordes delgados
        overflow: "hidden", // Elimina el scroll en el contenedor principal
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: "1rem", textAlign: "center" }}>
        Carrito de Compras
      </Typography>
      {cart && cart.length > 0 ? (
        <>
          <TableContainer
            sx={{
              maxHeight: "50vh", // Limita la altura de la tabla para habilitar el scroll
              overflowY: "auto", // Habilita el scroll vertical en la tabla
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Precio</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.nombre}</TableCell>
                    <TableCell>{product.precio}$</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveItem(product.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold", // Texto en negritas
              marginTop: "1rem",
              textAlign: "center",
            }}
          >
            Total de la compra: {totalCompra}$
          </Typography>
        </>
      ) : (
        <Typography variant="body1" sx={{ textAlign: "center", marginTop: "1rem" }}>
          No hay productos en el carrito.
        </Typography>
      )}
      {message && (
        <Alert severity={statusRes ? "success" : "error"} sx={{ marginTop: "1rem" }}>
          {message}
        </Alert>
      )}
      <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={onClose} // Oculta el componente al hacer clic
        >
          Salir
        </Button>
        {cart.length > 0 && ( // Renderiza el botón "Guardar" solo si hay elementos en el carrito
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveToDatabase} // Guarda la información en la base de datos
          >
            Guardar
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default Cart;