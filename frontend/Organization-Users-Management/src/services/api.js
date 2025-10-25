import axios from "axios";

// 1. Create the axios instance
const api = axios.create({
  // 2. Set the base URL to your backend
  baseURL: "http://localhost:8000",

  // 3. Set default headers
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
