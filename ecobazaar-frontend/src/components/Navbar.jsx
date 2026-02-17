import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={nav}>
      <div style={left}>
        <span style={brand} onClick={() => navigate("/products")}>
          🌿 EcoBazaar
        </span>
      </div>

      <div style={right}>
        <Link style={link} to="/products">
          Products
        </Link>

        {token && role === "USER" && (
          <>
            <Link style={link} to="/user-dashboard">
              Dashboard
            </Link>
            <Link style={link} to="/cart">
              Cart
            </Link>
            <Link style={link} to="/wishlist">
              Wishlist
            </Link>
            <Link style={link} to="/orders">
              My Orders
            </Link>
          </>
        )}

        {!token && (
          <>
            <Link style={link} to="/login">
              Login
            </Link>
            <Link style={link} to="/register">
              Register
            </Link>
          </>
        )}

        {role === "ADMIN" && (
          <Link style={link} to="/admin-dashboard">
            Admin Dashboard
          </Link>
        )}

        {role === "SELLER" && (
          <Link style={link} to="/seller-dashboard">
            Seller Dashboard
          </Link>
        )}

        {/* 🤖 AI Assistant Floating Button */}
        {token && role === "USER" && (
          <button
            onClick={() => navigate("/ai-chat")}
            style={aiBtn}
            title="AI Sustainability Assistant"
          >
            🤖
          </button>
        )}

        {token && (
          <button onClick={logout} style={logoutBtn}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;

const nav = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 30px",
  background: "#2e7d32",
  color: "white",
};

const left = {
  fontSize: "1.2rem",
  fontWeight: "bold",
  cursor: "pointer",
};

const right = {
  display: "flex",
  alignItems: "center",
  gap: "18px",
};

const brand = {
  cursor: "pointer",
};

const link = {
  color: "white",
  textDecoration: "none",
  fontWeight: "500",
};

const logoutBtn = {
  background: "#1b5e20",
  border: "none",
  color: "#fff",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
};

const aiBtn = {
  background: "#fff",
  color: "#2e7d32",
  border: "none",
  borderRadius: "50%",
  width: "38px",
  height: "38px",
  cursor: "pointer",
  fontSize: "18px",
  fontWeight: "bold",
};
