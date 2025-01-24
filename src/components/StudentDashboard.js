import React, { useState, useEffect } from "react";
import axios from "../services/api";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardContainer = styled.div`
  padding: 20px;
  max-width: 1100px;
  margin: 0 auto;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  font-size: 36px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

const Section = styled.div`
  margin-bottom: 50px;

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  color: #2575fc;
  margin-bottom: 25px;

  @media (max-width: 768px) {
    font-size: 22px;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 10px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const TableHeader = styled.th`
  background-color: #2575fc;
  color: white;
  padding: 12px 18px;
  text-align: left;

  @media (max-width: 768px) {
    padding: 10px 12px;
  }

  @media (max-width: 480px) {
    padding: 8px 10px;
  }
`;

const TableData = styled.td`
  padding: 12px 18px;
  border: 1px solid #ddd;
  text-align: left;

  @media (max-width: 768px) {
    padding: 10px 12px;
  }

  @media (max-width: 480px) {
    padding: 8px 10px;
  }
`;

const ResourceList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ResourceItem = styled.li`
  background: #f9f9f9;
  border: 1px solid #ddd;
  padding: 20px 30px;
  margin-bottom: 20px;
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 15px 25px;
  }

  @media (max-width: 480px) {
    padding: 12px 20px;
  }

  a {
    color: #2575fc;
    text-decoration: none;
    font-weight: bold;
    font-size: 18px;

    &:hover {
      text-decoration: underline;
    }
  }

  button {
    padding: 12px 20px;
    border: none;
    background-color: #2575fc;
    color: white;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    border-radius: 8px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #1d61c5;
    }

    @media (max-width: 768px) {
      padding: 10px 15px;
      font-size: 14px;
    }

    @media (max-width: 480px) {
      padding: 8px 12px;
      font-size: 12px;
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
        toast.success("Schedules loaded successfully!");
      } catch (err) {
        console.error("Error fetching schedules:", err);
        setError("Failed to fetch schedules.");
        toast.error("Failed to fetch schedules.");
      }
    };

    const fetchResources = async () => {
      try {
        const response = await axios.get("/api/student/resources", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResources(response.data.resources);
        toast.success("Resources loaded successfully!");
      } catch (err) {
        console.error("Error fetching resources:", err);
        setError("Failed to fetch resources.");
        toast.error("Failed to fetch resources.");
      }
    };

    fetchSchedules();
    fetchResources();
  }, []);

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString([], options);
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

    toast.success(`Downloading ${fileName}...`);
  };

  return (
    <div style={{margin: "100px"}}>
<DashboardContainer>
      <Title>Student Dashboard</Title>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <Section>
        <SectionTitle>Class Schedules</SectionTitle>
        <Table>
          <thead>
            <tr>
              <TableHeader>Title</TableHeader>
              <TableHeader>Time</TableHeader>
            </tr>
          </thead>
          <tbody>
            {schedules.length > 0 ? (
              schedules.map((schedule) => (
                <tr key={schedule._id}>
                  <TableData>{schedule.title}</TableData>
                  <TableData>{formatTime(schedule.time)}</TableData>
                </tr>
              ))
            ) : (
              <tr>
                <TableData colSpan="2">No schedules available.</TableData>
              </tr>
            )}
          </tbody>
        </Table>
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
    </div>
    
  );
};

export default StudentDashboard;
