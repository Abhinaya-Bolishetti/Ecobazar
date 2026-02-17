import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", {
        username: credentials.email,
        password: credentials.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "ADMIN") {
        navigate("/admin-dashboard");
      } else {
        alert("Access Denied: You are not an Admin.");
        localStorage.clear();
      }
    } catch (err) {
      alert("Invalid Admin Credentials.");
    }
  };

  return (
    <div style={container}>
      <form onSubmit={handleAdminLogin} style={card}>
        <img src="/logo.png" alt="EcoBazaar" style={logo} />

        <h2 style={title}>Admin Portal</h2>
        <p style={subtitle}>Secure access for administrators only</p>

        <input
          type="email"
          placeholder="Admin Email"
          style={inputStyle}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Password"
          style={inputStyle}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          required
        />
        <button type="submit" style={btnStyle}>
          Login to Dashboard
        </button>
      </form>
    </div>
  );
}

// ---- Styles ----

const container = {
  minHeight: "100vh",
  backgroundImage: "url('/background.png')", // eco background
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  background: "rgba(255,255,255,0.95)",
  padding: "40px",
  borderRadius: "16px",
  width: "360px",
  textAlign: "center",
  boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
};

const logo = {
  width: "70px",
  marginBottom: "10px",
};

const title = {
  color: "#2e7d32",
  marginBottom: "6px",
};

const subtitle = {
  fontSize: "0.9rem",
  color: "#555",
  marginBottom: "20px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "14px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "0.95rem",
};

const btnStyle = {
  width: "100%",
  padding: "12px",
  background: "#2e7d32",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "1rem",
};

export default AdminLogin;
