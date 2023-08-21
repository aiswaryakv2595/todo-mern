import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import "./signup.css";
import { authApi } from "../utils/HandleApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signup = () => {
  const navigate = useNavigate()
  const paperStyle = {
    padding: 20,
    height: "73vh",
    width: 300,
    margin: "0 auto",
  };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await authApi.signup(inputs)
        if(res)
        toast.success("sign up successfully")
        navigate('/')
        
    } catch (error) {
      toast.error(error)
        console.log(error)
    }
  };
  return (
    <Grid sx={{marginTop:10}}>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            onChange={handleChange}
            placeholder="Enter your name"
            className="textField"
          />
          <TextField
            fullWidth
            label="Username"
            name="username"
            onChange={handleChange}
            placeholder="Enter your username"
            className="textField"
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
              onChange={handleChange}
            placeholder="Enter your password"
            className="textField"
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign up
          </Button>
        </form>
        <Typography>
          {" "}
          Do you have an account ?<Link to="/">Sign In</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Signup;
