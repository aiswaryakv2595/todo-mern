import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter

import TodoOperation from "./components/TodoOperation";
import Signup from "./components/Signup";
import Container from "./components/Container";
import Login from "./components/Login";
import PublicRoutes from "./routes/PublicRoutes";
import UserPrivateRoute from "./routes/UserPrivateRoute";
import HomePage from "./screen/HomePage";

function App() {
  return (
    <Router> 
      <Routes>
      <Route element={<PublicRoutes/>}>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<UserPrivateRoute/>}>
        <Route path="/dashboard" element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
