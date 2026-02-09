import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const res = await api.post("/api/auth/login", { username, password });
    localStorage.setItem("token", res.data.token);
    navigate("/products");
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={login} style={cardStyle}>
        <h2>🌿 EcoBazaar Login</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button style={buttonStyle}>Login</button>
      </form>
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(120deg, #d4fc79, #96e6a1)",
};

const cardStyle = {
  background: "white",
  padding: 30,
  borderRadius: 12,
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  width: 320,
  textAlign: "center",
};

const inputStyle = {
  width: "100%",
  padding: 10,
  margin: "10px 0",
  borderRadius: 6,
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: 10,
  background: "#2fa36b",
  color: "white",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};

export default Login;
