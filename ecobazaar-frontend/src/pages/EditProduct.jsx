import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    carbonImpact: "",
    ecoCertified: false,
    category: "General",
  });

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({ ...product, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/products/${id}`, product);
      alert("✅ Product updated successfully!");
      navigate("/products");
    } catch (err) {
      console.error(err);
      alert("❌ Update failed. Please try again.");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <img
          src="/logo.png"
          alt="EcoBazaar"
          style={{ width: 70, margin: "0 auto 10px", display: "block" }}
        />

        <h2 style={headerStyle}>📦 Edit Product</h2>
        <p style={subHeaderStyle}>
          Modify product details and sustainability impact.
        </p>

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroup}>
            <label style={labelStyle}>Product Name</label>
            <input
              style={inputStyle}
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="e.g. Bamboo Toothbrush"
              required
            />
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>Description</label>
            <textarea
              style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Describe the eco-friendly benefits..."
              required
            />
          </div>

          <div style={rowStyle}>
            <div style={{ ...inputGroup, flex: 1, marginRight: "10px" }}>
              <label style={labelStyle}>Price ($)</label>
              <input
                style={inputStyle}
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ ...inputGroup, flex: 1 }}>
              <label style={labelStyle}>CO2 Impact (kg)</label>
              <input
                style={inputStyle}
                type="number"
                name="carbonImpact"
                value={product.carbonImpact}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div style={checkboxContainer}>
            <input
              type="checkbox"
              id="ecoCertified"
              name="ecoCertified"
              checked={product.ecoCertified}
              onChange={handleChange}
              style={checkboxStyle}
            />
            <label htmlFor="ecoCertified" style={checkboxLabel}>
              🌿 This product is Eco-Certified
            </label>
          </div>

          <div style={buttonGroup}>
            <button
              type="button"
              onClick={() => navigate("/products")}
              style={cancelBtn}
            >
              Cancel
            </button>
            <button type="submit" style={submitBtn}>
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- Styles ---
const containerStyle = {
  minHeight: "100vh",
  background: "#f3f8f5",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
};

const cardStyle = {
  background: "white",
  padding: "40px",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  width: "100%",
  maxWidth: "550px",
};

const headerStyle = {
  margin: "0 0 10px 0",
  color: "#2e7d32",
  fontSize: "24px",
  textAlign: "center",
};

const subHeaderStyle = {
  textAlign: "center",
  color: "#666",
  marginBottom: "30px",
  fontSize: "14px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
};

const inputGroup = {
  marginBottom: "20px",
};

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "600",
  color: "#444",
  fontSize: "14px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  fontSize: "15px",
  boxSizing: "border-box",
  outline: "none",
  transition: "border-color 0.3s",
};

const checkboxContainer = {
  display: "flex",
  alignItems: "center",
  marginBottom: "30px",
  backgroundColor: "#e8f5e9",
  padding: "12px",
  borderRadius: "6px",
};

const checkboxStyle = {
  width: "18px",
  height: "18px",
  cursor: "pointer",
};

const checkboxLabel = {
  marginLeft: "10px",
  fontSize: "14px",
  color: "#2e7d32",
  cursor: "pointer",
  fontWeight: "500",
};

const buttonGroup = {
  display: "flex",
  gap: "10px",
};

const submitBtn = {
  flex: 2,
  padding: "14px",
  background: "#2e7d32",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
};

const cancelBtn = {
  flex: 1,
  padding: "14px",
  background: "#f5f5f5",
  color: "#666",
  border: "1px solid #ddd",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default EditProduct;
