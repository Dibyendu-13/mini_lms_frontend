import React from "react";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const response = await axios.post("/api/auth/login", data);
      localStorage.setItem("token", response.data.token);
      navigate(data.role === "teacher" ? "/teacher-dashboard" : "/student-dashboard");
    } catch (error) {
      alert(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div>
      <AuthForm title="Login" onSubmit={handleLogin} />
      
    </div>
  );
};

export default Login;
