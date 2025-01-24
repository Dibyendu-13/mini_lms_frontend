import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "./styles/GlobalStyles.js";
import Register from "./pages/Register";
import Login from "./pages/Login";
import TeacherDashboard from "./components/TeacherDashboard";
import StudentDashboard from "./components/StudentDashboard.js";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
        </Routes>
      </Router>
      {/* ToastContainer with autoClose set to 3000ms (3 seconds) */}
      <ToastContainer 
  autoClose={3000} 
  closeButton 
  hideProgressBar={false} 
  newestOnTop 
  pauseOnFocusLoss 
  draggable 
/>

    </>
  );
};

export default App;
