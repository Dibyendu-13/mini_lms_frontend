import axios from "axios";

const instance = axios.create({
  baseURL: "https://83e7-2402-e280-3d9b-1f3-1007-f151-1b93-e67e.ngrok-free.app",
});

export default instance;

