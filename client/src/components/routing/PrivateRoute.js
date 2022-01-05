import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../../components/pages/Home";
import Login from "../../components/auth/Login";
import AuthContext from "../../context/auth/authContext";

const PrivateRoute = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;

  return !isAuthenticated && !loading ? (
    <Route path="/" element={<Login />} />
  ) : (
    <Route path="/" element={<Home />} />
  );
};

export default PrivateRoute;
