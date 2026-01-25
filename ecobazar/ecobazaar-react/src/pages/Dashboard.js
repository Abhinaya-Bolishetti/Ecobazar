import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/OIP.jpg";

function Dashboard({ setIsAuth }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // 👈 GET ROLE

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); // 👈 CLEAR ROLE
    setIsAuth(false);
    navigate("/");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.9)",
          padding: "40px",
          borderRadius: "12px",
          textAlign: "center",
          width: "420px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        }}
      >
        <h2>Welcome to EcoBazaar</h2>

        <h4 style={{ marginTop: "10px", color: "#2e7d32" }}>
          EcoBazaarX – Carbon Footprint Aware Shopping Assistant
        </h4>

        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          Explore eco-friendly products, track carbon footprints,
          and make sustainable shopping choices.
        </p>

        {/* 🔹 PRODUCT CATALOG (ALL USERS) */}
        <button onClick={() => navigate("/products")} style={btnStyle}>
          🌿 View Product Catalog
        </button>

        {/* 🔹 SELLER ONLY */}
        {role === "SELLER" && (
          <button onClick={() => navigate("/add-product")} style={btnStyle}>
            ➕ Add Product
          </button>
        )}

        {/* 🔹 ADMIN ONLY */}
        {role === "ADMIN" && (
          <button onClick={() => navigate("/admin-approval")} style={btnStyle}>
            ✅ Approve Products
          </button>
        )}

        {/* 🔹 LOGOUT */}
        <button
          onClick={logout}
          style={{
            ...btnStyle,
            backgroundColor: "#d32f2f",
          }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

const btnStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "18px",
  backgroundColor: "#2e7d32",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
};

export default Dashboard;
