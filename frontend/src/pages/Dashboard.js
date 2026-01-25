import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/OIP.jpg";

function Dashboard({ setIsAuth }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    navigate("/");
  };

  return (
    <div style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div style={{
        background: "rgba(255,255,255,0.9)",
        padding: "40px",
        borderRadius: "12px",
        textAlign: "center",
        width: "400px",
      }}>
        <h2>Welcome to EcoBazaar</h2>
        <h4>EcoBazaarX – Carbon Footprint Aware Shopping Assistant</h4>

        <button onClick={logout} style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#2e7d32",
          color: "white",
          border: "none",
          borderRadius: "6px",
        }}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
