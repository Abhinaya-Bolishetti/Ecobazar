import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function AuthPage({ setIsAuth }) {
  const [mode, setMode] = useState("login");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("USER");

  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  // ✅ Email validation
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

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

      // ✅ STORE TOKEN + ROLE
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      setIsAuth(true);

      // 🔁 ROLE-BASED REDIRECT
      if (res.data.role === "ADMIN") {
        navigate("/admin-approval");
      } else if (res.data.role === "SELLER") {
        navigate("/add-product");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      alert(err.response?.data || "Login failed");
    }
  };

  // 📝 SIGNUP
  const handleSignup = async () => {
    if (!username || !email || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    } else {
      setEmailError("");
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
        role,
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

        {/* TOGGLE */}
        <div style={{ display: "flex", marginBottom: "15px" }}>
          <button
            onClick={() => setMode("login")}
            style={mode === "login" ? activeBtn : btn}
          >
            Login
          </button>
          <button
            onClick={() => setMode("signup")}
            style={mode === "signup" ? activeBtn : btn}
          >
            Signup
          </button>
        </div>

        {/* USERNAME */}
        <input
          style={input}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* EMAIL */}
        {mode === "signup" && (
          <>
            <input
              style={input}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <div style={{ color: "red", fontSize: "12px", marginBottom: "10px" }}>
                {emailError}
              </div>
            )}
          </>
        )}

        {/* ROLE SELECTION */}
        {mode === "signup" && (
          <select
            style={input}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="USER">User</option>
            <option value="SELLER">Seller</option>
            <option value="ADMIN">Admin</option>
          </select>
        )}

        {/* PASSWORD */}
        <input
          style={input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* CONFIRM PASSWORD */}
        {mode === "signup" && (
          <input
            style={input}
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        <button
          style={submitBtn}
          onClick={mode === "login" ? handleLogin : handleSignup}
        >
          {mode === "login" ? "Login" : "Signup"}
        </button>
      </div>
    </div>
  );
}

/* 🎨 STYLES */
const bgImageUrl =
  "https://tse2.mm.bing.net/th/id/OIP.8Xdx0h73TTYvbQNfSe5wUgHaEK?pid=Api&P=0&h=180";

const containerStyle = {
  minHeight: "100vh",
  backgroundImage: `url(${bgImageUrl})`,
  backgroundSize: "cover",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const cardStyle = {
  width: "360px",
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
