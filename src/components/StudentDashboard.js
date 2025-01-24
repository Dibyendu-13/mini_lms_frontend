import React, { useState, useEffect } from "react";
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

const ScheduleList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ScheduleItem = styled.li`
  background: #f9f9f9;
  border: 1px solid #ddd;
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-weight: bold;
    color: #333;
  }
`;

const ResourceList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ResourceItem = styled.li`
  background: #f9f9f9;
  border: 1px solid #ddd;
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    color: #2575fc;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const StudentDashboard = () => {
  const [schedules, setSchedules] = useState([]);
  const [resources, setResources] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Authentication token is missing. Please log in.");
      return;
    }

    const fetchSchedules = async () => {
      try {
        const response = await axios.get("/api/student/schedules", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSchedules(response.data.schedules);
      } catch (err) {
        console.error("Error fetching schedules:", err);
        setError("Failed to fetch schedules.");
      }
    };

    const fetchResources = async () => {
      try {
        const response = await axios.get("/api/student/resources", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResources(response.data.resources);
      } catch (err) {
        console.error("Error fetching resources:", err);
        setError("Failed to fetch resources.");
      }
    };

    fetchSchedules();
    fetchResources();
  }, []);

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleTimeString([], options);
  };

  const handleDownload = (filePath) => {
    const baseUrl = "http://localhost:5001"; // Update this if necessary
    const fullUrl = `${baseUrl}${filePath}`;

    const link = document.createElement("a");
    link.href = fullUrl;

    const fileName = filePath.split("/").pop();
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardContainer>
      <Title>Student Dashboard</Title>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <Section>
        <SectionTitle>Class Schedules</SectionTitle>
        <ScheduleList>
          {schedules.length > 0 ? (
            schedules.map((schedule) => (
              <ScheduleItem key={schedule._id}>
                <span>{schedule.title}</span>
                <span>{formatTime(schedule.time)}</span>
              </ScheduleItem>
            ))
          ) : (
            <p>No schedules available.</p>
          )}
        </ScheduleList>
      </Section>

      <Section>
        <SectionTitle>Resources</SectionTitle>
        <ResourceList>
          {resources.length > 0 ? (
            resources.map((resource) => (
              <ResourceItem key={resource._id}>
                <span>{resource.name}</span>
                <button onClick={() => handleDownload(resource.filePath)}>
                  Download
                </button>
              </ResourceItem>
            ))
          ) : (
            <p>No resources available.</p>
          )}
        </ResourceList>
      </Section>
    </DashboardContainer>
  );
};

export default StudentDashboard;
