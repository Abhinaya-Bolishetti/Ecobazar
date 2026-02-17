import React, { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", {
        username: user.email,
        password: user.password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      alert("Login Successful!");

      if (response.data.role === "ADMIN") navigate("/admin-dashboard");
      else if (response.data.role === "SELLER") navigate("/seller-dashboard");
      else navigate("/products");
    } catch (err) {
      alert(err.response?.data || "Invalid credentials");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <img src="/logo.png" alt="EcoBazaar" style={logo} />

        <h2 style={title}>Welcome Back</h2>
        <p style={subtitle}>Login to continue your eco journey 🌿</p>

        <form onSubmit={handleLogin} style={formStyle}>
          <input
            type="email"
            placeholder="Email"
            style={inputStyle}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            style={inputStyle}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>

        <p style={footerText}>
          New here?{" "}
          <Link to="/register" style={link}>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

// ---- Styles ----

const container = {
  minHeight: "100vh",
  backgroundImage: "url('/background.png')", // ✅ from public
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  background: "rgba(255,255,255,0.92)",
  padding: "40px",
  borderRadius: "16px",
  width: "360px",
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
};

const logo = {
  width: "80px",
  marginBottom: "10px",
};

const title = {
  margin: "10px 0 5px",
  color: "#2e7d32",
};

const subtitle = {
  marginBottom: "20px",
  color: "#555",
  fontSize: "0.95rem",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "0.95rem",
};

const buttonStyle = {
  background: "#2e7d32",
  color: "white",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  fontSize: "1rem",
  cursor: "pointer",
  marginTop: "10px",
};

const footerText = {
  marginTop: "15px",
  fontSize: "0.9rem",
};

const link = {
  color: "#2e7d32",
  fontWeight: "bold",
  textDecoration: "none",
};

export default Login;
