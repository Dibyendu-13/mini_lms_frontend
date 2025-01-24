import React, { useState } from "react";
import axios from "../services/api";
import styled from "styled-components";

const DashboardContainer = styled.div`
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  color: #2575fc;
  margin-bottom: 10px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  label {
    font-weight: bold;
    margin-bottom: 5px;
  }

  input,
  textarea,
  button {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  button {
    background-color: #2575fc;
    color: white;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #1e63d6;
    }
  }
`;

const TeacherDashboard = () => {
  const [resourceName, setResourceName] = useState("");
  const [resourceFile, setResourceFile] = useState(null);
  const [classTitle, setClassTitle] = useState("");
  const [classTime, setClassTime] = useState("");

  const handleResourceUpload = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!resourceFile || !resourceName) {
      alert('Please provide both resource name and file.');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('file', resourceFile);
      formData.append('name', resourceName);
  
      const response = await axios.post('http://localhost:5001/api/teacher/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Resource uploaded successfully:', response.data);
      alert('Resource uploaded successfully');
      setResourceName('');
      setResourceFile(null);
    } catch (error) {
      console.error('Error uploading resource:', error);
      alert('Failed to upload resource.');
    }
  };
  
  
  const handleScheduleClass = (e) => {
    e.preventDefault();
  
    const classData = {
      title: classTitle,
      time: classTime,
    };
  
    const token = localStorage.getItem('token'); // Get the token from localStorage
    console.log("Scheduling class with data:", classData);
    console.log("Using token:", token); // Log the token
  
    axios
      .post("/api/teacher/schedules", classData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Class scheduled successfully:", response.data);
        alert("Class scheduled successfully!");
        setClassTitle("");
        setClassTime("");
      })
      .catch((error) => {
        console.error("Error scheduling class:", error);
        alert("Failed to schedule class.");
      });
  };
  

  return (
    <DashboardContainer>
      <Title>Teacher Dashboard</Title>

      <Section>
        <SectionTitle>Upload Resources</SectionTitle>
        <form onSubmit={handleResourceUpload}>
          <InputGroup>
            <label htmlFor="resourceName">Resource Name</label>
            <input
              type="text"
              id="resourceName"
              value={resourceName}
              onChange={(e) => setResourceName(e.target.value)}
              required
            />

            <label htmlFor="resourceFile">Upload File</label>
            <input
              type="file"
              id="resourceFile"
              onChange={(e) => setResourceFile(e.target.files[0])}
              required
            />

            <button type="submit">Upload</button>
          </InputGroup>
        </form>
      </Section>

      <Section>
        <SectionTitle>Schedule Classes</SectionTitle>
        <form onSubmit={handleScheduleClass}>
          <InputGroup>
            <label htmlFor="classTitle">Class Title</label>
            <input
              type="text"
              id="classTitle"
              value={classTitle}
              onChange={(e) => setClassTitle(e.target.value)}
              required
            />

            <label htmlFor="classTime">Class Time</label>
            <input
              type="datetime-local"
              id="classTime"
              value={classTime}
              onChange={(e) => setClassTime(e.target.value)}
              required
            />

            <button type="submit">Schedule</button>
          </InputGroup>
        </form>
      </Section>
    </DashboardContainer>
  );
};

export default TeacherDashboard;
