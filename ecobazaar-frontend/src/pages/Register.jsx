import React, { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "USER",
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/register", user);
      alert("Registration Successful! Please Login.");
      navigate("/login");
    } catch (err) {
      alert("Registration failed. Email might already exist.");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <h2 style={{ margin: "0", color: "#2e7d32" }}>📝 Join EcoBazaar</h2>
          <p style={{ color: "#666", fontSize: "0.9rem" }}>
            Create an account to start your eco-journey
          </p>
        </div>

        <form onSubmit={handleRegister} style={formStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              style={inputStyle}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              required
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              placeholder="eco@example.com"
              style={inputStyle}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              style={inputStyle}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Select Your Role</label>
            <select
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
              style={selectStyle}
            >
              <option value="USER">Customer (Buy Eco-Products)</option>
              <option value="SELLER">Seller (List Eco-Products)</option>
              <option value="ADMIN">Administrator</option>
            </select>
          </div>

          <button type="submit" style={buttonStyle}>
            Create Account
          </button>
        </form>

        <p style={footerTextStyle}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#2e7d32",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

// --- Styles ---

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #f1f8e9 0%, #dcedc8 100%)", // Light eco-green gradient
  padding: "20px",
};

const cardStyle = {
  background: "white",
  padding: "40px",
  borderRadius: "15px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  width: "100%",
  maxWidth: "450px",
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "30px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const inputGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const labelStyle = {
  fontSize: "0.85rem",
  fontWeight: "bold",
  color: "#444",
  marginLeft: "4px",
};

const inputStyle = {
  padding: "12px 15px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "1rem",
  outline: "none",
  transition: "border-color 0.3s",
};

const selectStyle = {
  ...inputStyle,
  cursor: "pointer",
  backgroundColor: "#fff",
};

const buttonStyle = {
  background: "#2e7d32",
  color: "white",
  padding: "14px",
  borderRadius: "8px",
  border: "none",
  fontSize: "1rem",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px",
  transition: "background 0.3s",
};

const footerTextStyle = {
  textAlign: "center",
  marginTop: "20px",
  fontSize: "0.9rem",
  color: "#666",
};

export default Register;
