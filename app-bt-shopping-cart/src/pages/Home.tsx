import { useEffect } from "react";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import styles from "./Home.module.css";

function Home({ user,setUser, cart,
  setCart }: { user: any; setUser: (user: any) => void ; cart: any[];
    setCart: (cart: any[]) => void; })  {

      useEffect(() => {
        const validateUser = async () => {
          if (!user) {
            const userId = localStorage.getItem("user_id");
            
            if (userId ) {
              try {
                const response = await fetch(`http://localhost:8080/api/usuarios/${userId}`);
                if (response.ok) {
                  const userData = await response.json();
                  console.log("Usuario encontrado:", userData);
                  setUser(userData); 
                } else {
                  console.error("Error al buscar el usuario:", response.statusText);
                }
              } catch (error) {
                console.error("Error en la petición:", error);
              }
            }
          }
        };
    
        validateUser();
      }, [user, setUser]); 
  return (
    <>
    <div className={styles.home}>
    <Navbar user={user} setUser={setUser} cart = {cart} setCart = {setCart}/>
    <ProductList cart = {cart} setCart = {setCart} />  
    </div>
      
    </>
  );
}

export default Home;
