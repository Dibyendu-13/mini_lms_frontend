import axios from "axios";

const instance = axios.create({
  baseURL: "https://mini-lms-backend.onrender.com",
});

export default instance;

