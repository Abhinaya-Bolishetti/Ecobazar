import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={container}>
      <div style={overlay}>
        <img src="/logo.png" alt="EcoBazaar" style={logo} />

        <h1 style={title}>Welcome to EcoBazaar</h1>
        <p style={subtitle}>Your Marketplace for Eco-Friendly Products</p>

        <button style={btn} onClick={() => navigate("/products")}>
          Shop Now
        </button>

        <div style={features}>
          <div>🌿 Eco-Certified Products</div>
          <div>🌍 Reduce Carbon Footprint</div>
          <div>♻️ Support Sustainable Living</div>
        </div>
      </div>
    </div>
  );
}

const container = {
  minHeight: "100vh",
  backgroundImage: "url('/background.png')", // ✅ from public folder
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const overlay = {
  background: "rgba(255,255,255,0.88)",
  padding: "60px",
  borderRadius: "20px",
  textAlign: "center",
  maxWidth: "700px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
};

const logo = {
  width: "90px",
  marginBottom: "20px",
};

const title = {
  fontSize: "2.4rem",
  color: "#2e7d32",
  marginBottom: "10px",
};

const subtitle = {
  fontSize: "1.1rem",
  color: "#555",
  marginBottom: "25px",
};

const btn = {
  padding: "14px 30px",
  background: "#2e7d32",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "1rem",
  cursor: "pointer",
};

const features = {
  display: "flex",
  justifyContent: "space-around",
  marginTop: "30px",
  color: "#2e7d32",
  fontWeight: "600",
};

export default Home;
