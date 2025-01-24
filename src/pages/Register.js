import React from "react";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      await axios.post("/api/auth/register", data);
      alert("Registration successful!");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div>
      <AuthForm title="Register" onSubmit={handleRegister} />
     
    </div>
  );
};

export default Register;
