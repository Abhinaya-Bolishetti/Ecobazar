// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8082/api",
});

// This interceptor adds the token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Or wherever you store your JWT
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
