import { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, Grid, Box, Button } from "@mui/material";

function ProductList({
  cart,
  setCart,
}: {
  cart: any[];
  setCart: (cart: any[]) => void;
}) {
  const [products, setProducts] = useState<any[]>([]); 

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/productos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProducts(data); 
        } else {
          console.error("Error al cargar los productos:", response.statusText);
        }
      } catch (error) {
        console.error("Error en la petición:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setCart([...cart, product]);
    }

    console.log("Producto agregado al carrito:", cart);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh", 
      }}
    >
     
      <Box sx={{ flexShrink: 0, padding: "1rem", backgroundColor: "#f5f5f5" }}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Catálogo de Productos
        </Typography>
      </Box>

      
      <Box
        sx={{
          flex: 1, 
          overflowY: "auto", 
          padding: "1rem",
        }}
      >
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.imagen}
                  alt={product.nombre}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.nombre + " " + product.precio + "$"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.descripcion}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: "1rem" }}
                    onClick={() => handleAddToCart(product.id)}
                    disabled={!localStorage.getItem("user_id")}
                  >
                    Agregar al carrito
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default ProductList;