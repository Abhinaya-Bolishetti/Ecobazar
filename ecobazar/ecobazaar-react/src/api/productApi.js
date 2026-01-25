import axios from "axios";

const PRODUCT_API = axios.create({
  baseURL: "http://localhost:8082/api/products",
});

PRODUCT_API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default PRODUCT_API;
