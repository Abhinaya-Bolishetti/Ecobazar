import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8082",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Ensure this key matches your Login.jsx
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // ✅ This is mandatory
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
