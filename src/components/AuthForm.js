import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FormContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 40px 30px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: auto;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;

  &:focus {
    border-color: #2575fc;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #2575fc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;

  &:hover {
    background: #6a11cb;
  }
`;

const RoleSelector = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  button {
    padding: 10px;
    flex: 1;
    margin: 0 5px;
    background: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;

    &.active {
      background: #2575fc;
      color: white;
    }
  }
`;

const LinkContainer = styled.div`
  text-align: center;
  margin-top: 15px;

  a {
    color: #2575fc;
    text-decoration: none;
    font-size: 14px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const AuthForm = ({ title, onSubmit }) => {
  const [formData, setFormData] = useState({ email: "", password: "", role: "student" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <FormContainer>
      <Title>{title}</Title>
      <RoleSelector>
        <button
          type="button"
          className={formData.role === "student" ? "active" : ""}
          onClick={() => handleRoleChange("student")}
        >
          Student
        </button>
        <button
          type="button"
          className={formData.role === "teacher" ? "active" : ""}
          onClick={() => handleRoleChange("teacher")}
        >
          Teacher
        </button>
      </RoleSelector>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button type="submit">{title}</Button>
      </form>

      <LinkContainer>
        {title === "Login" ? (
          <>
            <p>Not registered yet? <Link to="/register">Create an account</Link></p>
          </>
        ) : (
          <>
            <p>Already registered? <Link to="/">Login here</Link></p>
          </>
        )}
      </LinkContainer>
    </FormContainer>
  );
};

export default AuthForm;
