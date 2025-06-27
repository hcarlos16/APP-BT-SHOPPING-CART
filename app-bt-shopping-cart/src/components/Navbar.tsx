import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Importa el ícono de carrito
import Cart from '../components/Cart'; // Importa el componente Cart


const pages = ['Home', 'Productos', 'Ordenes'];

function Navbar({ user, setUser, cart, setCart }: { user: any; setUser: (user: any) => void; cart: any[]; setCart: (cart: any[]) => void; }) {

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [isCartOpen, setIsCartOpen] = React.useState(false); // Estado para controlar la visibilidad del carrito

    const navigate = useNavigate();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        console.log("paso");
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCartClick = () => {
        navigate('/cart'); // Redirige a la ruta "/cart"
    };

    const toggleCart = () => {
        setIsCartOpen((prev) => !prev); // Alterna la visibilidad del carrito
    };

    const filteredSettings = user ? ['Crear usuario', 'Salir'] : ['Login', 'Crear usuario'];

    return (
        <>
            <AppBar position="static" sx={{ marginTop: '50px' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                {pages.map((page) => (

                                    <MenuItem
                                        key={page}
                                        onClick={() => {
                                            
                                            handleCloseNavMenu();
                                            
                                        }}
                                    >
                                        <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                               
                               <span>
                               <Button
                                key={page}
                                onClick={() => {
                                  
                                  handleCloseNavMenu();
                                  if (page === 'Home') {
                                    navigate(`/`);
                                } else if (page === 'Productos') {
                                    
                                    navigate(`/productos`);
                                }else if (page === 'Ordenes') {
                                    
                                    navigate(`/ordenes`);
                                }
                                }}
                                disabled={page === "Ordenes" && !localStorage.getItem("user_id")}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                              >
                                {page}
                              </Button>
                              </span>
                            ))}
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            {user && ( // Renderiza el carrito solo si hay un usuario logueado
                                <Tooltip title="Carrito">
                                    <IconButton onClick={toggleCart} sx={{ color: 'white' }}>
                                        <ShoppingCartIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    {user ? (
                                        <Typography sx={{ color: 'white' }}>{user.nombre}</Typography> // Muestra el nombre del usuario
                                    ) : (
                                        <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIrxPSJI-uVlJtW6uLDwKFu13Ys9rqfpjo_w&s" /> // Muestra el avatar por defecto
                                    )}
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {filteredSettings.map((setting) => (
                                    <MenuItem
                                        key={setting}
                                        onClick={() => {
                                            handleCloseUserMenu();
                                            if (setting === 'Login') {
                                                navigate('/login'); // Redirige al componente Login
                                            } else if (setting === 'Crear usuario') {
                                                navigate('/register'); // Redirige al componente Register
                                            } else if (setting === 'Salir') {
                                                localStorage.removeItem('access_token');
                                                localStorage.removeItem('user_id');  // Elimina la clave access_token del localStorage
                                                navigate('/'); // Redirige al Home
                                                setUser(null); // Limpia el estado del usuario
                                            }
                                        }}
                                    >
                                        <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Renderiza el carrito si está abierto */}
            {isCartOpen && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        right: 0,
                        width: '300px',
                        height: '100%',
                        backgroundColor: 'transparent',
                        boxShadow: '-2px 0px 5px rgba(0,0,0,0.1)',
                        zIndex: 1200,
                        overflowY: 'auto',
                    }}
                >
                    <Cart onClose={toggleCart} cart={cart} setCart={setCart} />
                </Box>
            )}
        </>

    );
}

export default Navbar;
