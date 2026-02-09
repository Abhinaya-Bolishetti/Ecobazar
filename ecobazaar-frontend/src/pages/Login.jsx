import React, { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const res = await api.post("/api/auth/login", { username, password });

      // Save Token and Role for Security Configuration
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userRole", res.data.role); // Important for Seller/User logic

      alert("Welcome back to EcoBazaar!");
      navigate("/products");
    } catch (err) {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <h2 style={{ color: "#2e7d32", margin: "0" }}>🌿 EcoBazaar Login</h2>
          <p style={{ fontSize: "0.85rem", color: "#666" }}>
            Welcome back, Eco-Warrior!
          </p>
        </div>

        {error && <p style={errorStyle}>{error}</p>}

        <form onSubmit={login} style={formStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Username</label>
            <input
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
              required
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Password</label>
            <input
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
            />
          </div>

          <button style={buttonStyle}>Sign In</button>
        </form>

        <p style={footerStyle}>
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#2e7d32",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

// --- Enhanced Styles ---

const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #f1f8e9 0%, #dcedc8 100%)",
};

const cardStyle = {
  background: "white",
  padding: "40px",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  width: "100%",
  maxWidth: "380px",
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "25px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const inputGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
};

const labelStyle = {
  fontSize: "0.8rem",
  fontWeight: "bold",
  color: "#555",
  marginLeft: "5px",
};

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "1rem",
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#2e7d32",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "1rem",
  marginTop: "10px",
  transition: "0.3s",
};

const errorStyle = {
  color: "#d32f2f",
  background: "#ffebee",
  padding: "10px",
  borderRadius: "6px",
  fontSize: "0.85rem",
  textAlign: "center",
  marginBottom: "15px",
};

const footerStyle = {
  textAlign: "center",
  marginTop: "25px",
  fontSize: "0.9rem",
  color: "#666",
};

export default Login;
