import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

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
    <div style={{ padding: "50px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>📝 Join EcoBazaar</h2>
      <form
        onSubmit={handleRegister}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) => setUser({ ...user, fullName: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
        />

        <label>Select Your Role:</label>
        <select
          value={user.role}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
          style={{ padding: "10px" }}
        >
          <option value="USER">Customer (Buy Eco-Products)</option>
          <option value="SELLER">Seller (List Eco-Products)</option>
          <option value="ADMIN">Administrator</option>
        </select>

        <button
          type="submit"
          style={{
            background: "#2e7d32",
            color: "white",
            padding: "12px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
