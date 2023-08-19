import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
      };
  return (
    <AppBar
    sx={{
      position: "static",
      boxShadow: "none",
    }}
  >
    <Toolbar sx={{ justifyContent: "space-between" }}>
       
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
          {
            isLoggedIn ? " Logout" : "Login"
        }
          </Button>
    </Toolbar>
  </AppBar>
  )
}

export default Navbar