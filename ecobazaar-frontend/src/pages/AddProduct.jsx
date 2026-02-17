import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    carbonImpact: 0,
    ecoCertified: false,
    category: "General",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Upload an image!");

    const data = new FormData();
    data.append("image", file);
    data.append("product", JSON.stringify(formData));

    try {
      await api.post("/products/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("✅ Product Published Successfully!");
      navigate("/seller-dashboard");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add product.");
    }
  };

  return (
    <div style={pageBg}>
      <div style={card}>
        <img src="/logo.png" alt="EcoBazaar" style={logo} />

        <h2 style={title}>Add New Eco-Product</h2>

        <form onSubmit={handleSubmit} style={form}>
          <input
            name="name"
            placeholder="Product Name"
            onChange={handleInputChange}
            required
            style={input}
          />
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleInputChange}
            style={input}
          />
          <input
            name="price"
            type="number"
            placeholder="Price (₹)"
            onChange={handleInputChange}
            required
            style={input}
          />
          <input
            name="carbonImpact"
            type="number"
            placeholder="CO₂ Impact (kg)"
            onChange={handleInputChange}
            required
            style={input}
          />

          <label style={checkboxRow}>
            <input
              name="ecoCertified"
              type="checkbox"
              onChange={handleInputChange}
            />
            🌿 Eco-Certified Product
          </label>

          <label style={label}>Product Image</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />

          <button type="submit" style={primaryBtn}>
            List Product
          </button>
        </form>
      </div>
    </div>
  );
};

const pageBg = {
  minHeight: "100vh",
  background: "#f3f8f5",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  background: "#fff",
  padding: "40px",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  width: "100%",
  maxWidth: "420px",
  textAlign: "center",
};

const logo = { width: "70px", marginBottom: "10px" };
const title = { color: "#2e7d32", marginBottom: "20px" };
const form = { display: "flex", flexDirection: "column", gap: "12px" };
const input = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};
const label = { textAlign: "left", fontWeight: 600 };
const checkboxRow = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  justifyContent: "center",
};
const primaryBtn = {
  marginTop: "10px",
  padding: "12px",
  background: "#2e7d32",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: 600,
};

export default AddProduct;
