import React from "react";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";
import { toast } from "react-toastify"; // Import toast

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      await axios.post("/api/auth/register", data);
      toast.success("Registration successful!"); // Show success toast
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred"); // Show error toast
    }
  };

  return (
    <div>
      <AuthForm title="Register" onSubmit={handleRegister} />
    </div>
  );
};

export default Register;
