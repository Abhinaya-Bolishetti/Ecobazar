import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function AuthPage({ setIsAuth }) {
  const [mode, setMode] = useState("login");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  // 🔐 LOGIN
  const handleLogin = async () => {
    if (!username || !password) {
      alert("Enter username and password");
      return;
    }

    try {
      const res = await API.post("/api/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setIsAuth(true);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data || "Login failed");
    }
  };

  // 📝 SIGNUP
  const handleSignup = async () => {
    if (!username || !email || !password || !confirmPassword) {
      alert("All fields required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await API.post("/api/auth/signup", {
        username,
        email,
        password,
        confirmPassword,
      });

      alert(res.data);
      setMode("login");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      alert(err.response?.data || "Signup failed");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2>{mode === "login" ? "Login" : "Signup"}</h2>

        <div style={{ display: "flex", marginBottom: "15px" }}>
          <button onClick={() => setMode("login")} style={mode === "login" ? activeBtn : btn}>
            Login
          </button>
          <button onClick={() => setMode("signup")} style={mode === "signup" ? activeBtn : btn}>
            Signup
          </button>
        </div>

        <input style={input} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />

        {mode === "signup" && (
          <input style={input} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        )}

        <input style={input} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        {mode === "signup" && (
          <input
            style={input}
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        <button style={submitBtn} onClick={mode === "login" ? handleLogin : handleSignup}>
          {mode === "login" ? "Login" : "Signup"}
        </button>
      </div>
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  backgroundImage: "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",
  backgroundSize: "cover",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const cardStyle = {
  width: "350px",
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  textAlign: "center",
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
};

const btn = {
  flex: 1,
  padding: "10px",
  border: "none",
  cursor: "pointer",
};

const activeBtn = {
  ...btn,
  background: "#1976d2",
  color: "white",
};

const submitBtn = {
  width: "100%",
  padding: "12px",
  background: "#1976d2",
  color: "white",
  border: "none",
  marginTop: "10px",
};

export default AuthPage;
