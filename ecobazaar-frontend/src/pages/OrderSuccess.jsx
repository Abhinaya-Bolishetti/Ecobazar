import React from "react";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "100px 20px" }}>
      <h1 style={{ color: "#2e7d32", fontSize: "48px" }}>🎉 Success!</h1>
      <h2>Your Eco-Order has been placed.</h2>
      <p style={{ color: "#666", marginBottom: "30px" }}>
        Thank you for supporting sustainable shopping and reducing your carbon
        footprint.
      </p>
      <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        <button
          onClick={() => navigate("/products")}
          style={{
            padding: "12px 24px",
            background: "#2e7d32",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Keep Shopping
        </button>
        <button
          onClick={() => navigate("/orders")}
          style={{
            padding: "12px 24px",
            border: "1px solid #2e7d32",
            color: "#2e7d32",
            background: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          View My Orders
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;
