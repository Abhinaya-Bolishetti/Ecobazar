import React, { useState } from "react";
import api from "../api/api"; // Corrected path
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    carbonImpact: "",
    ecoCertified: false,
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("carbonImpact", formData.carbonImpact);
    data.append("ecoCertified", formData.ecoCertified);
    data.append("image", image);

    try {
      await api.post("/api/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product added successfully!");
      navigate("/products");
    } catch (err) {
      alert("Error adding product. Ensure you are logged in as a SELLER.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h2>Add New Eco-Product</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          type="text"
          placeholder="Product Name"
          style={inputStyle}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          style={inputStyle}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          style={inputStyle}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
        <input
          type="number"
          step="0.1"
          placeholder="Carbon Impact (kg CO2e)"
          style={inputStyle}
          onChange={(e) =>
            setFormData({ ...formData, carbonImpact: e.target.value })
          }
          required
        />
        <label>
          <input
            type="checkbox"
            onChange={(e) =>
              setFormData({ ...formData, ecoCertified: e.target.checked })
            }
          />{" "}
          Eco-Certified
        </label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#2e7d32",
            color: "white",
            padding: "10px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Upload Product
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

export default AddProduct;
