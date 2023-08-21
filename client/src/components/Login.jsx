import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import { authApi } from "../utils/HandleApi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../redux/slices/authSlice";
import './signup.css'

const Login = () => {
  const navigate = useNavigate();
  const paperStyle = {
    padding: 20,
    height: "73vh",
    width: 300,
    margin: "0 auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  const headerStyle = { marginTop: 0 };
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async() => {
    try {
      const res = await authApi.login({
        username: inputs.username,
        password: inputs.password,
      });

      dispatch(
        login({
          username: inputs.username,
          password: inputs.password,
        })
      );

      localStorage.setItem("token", res.token);
      return res;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    sendRequest()
  .then((data) => {
    navigate("/dashboard");
  })
  .catch((err) => {
    console.log(err);
    toast.error(err.data.message); 
  });

  };

  return (
    <Grid sx={{marginTop:10}}>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOpenIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign In</h2>
        </Grid>
        <TextField
          label="Username"
          placeholder="Enter username"
          name="username"
          fullWidth
          required
          className="textField"
          onChange={handleChange}
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          name="password"
          fullWidth
          required
          className="textField"
          onChange={handleChange}
        />

        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          onClick={handleSubmit}
          fullWidth
        >
          Sign in
        </Button>

        <Typography>
          {" "}
          Do you have an account ?<Link to="/signup">Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
