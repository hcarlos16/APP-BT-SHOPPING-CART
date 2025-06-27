import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Cart from "./components/Cart";
import Producto from "./pages/Producto";
import CrearProducto from "./pages/CrearProducto";
import Ordenes from "./pages/Ordenes";

function App() {
  
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState<any[]>([]);
 
  const toggleCart = () => {
    console.log("Carrito abierto/cerrado");
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} cart={cart} setCart={setCart}/>} /> {/* Página principal */}
        <Route path="/login" element={<Login setUser={setUser} />}/> {/* Página de login */}
        <Route path="/register" element={<Register />} /> {/* Página de login */}
        <Route path="/productos" element={<Producto />} /> {/* Página de login */}
        <Route path="/crear-producto" element={<CrearProducto />} /> {/* Página de login */}
        <Route path="/ordenes" element={<Ordenes />} /> {/* Página de login */}
        <Route path="*" element={<NotFound />} /> {/* Ruta no encontrada */}
        <Route path="/cart" element={<Cart onClose={toggleCart} cart={cart} setCart = {setCart} />} />
      </Routes>
    </Router>
  );
}

export default App
