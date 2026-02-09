import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalCarbon, orderId, totalAmount } = location.state || {};

  return (
    <div
      style={{
        padding: "50px",
        textAlign: "center",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ color: "#2e7d32" }}>🌿 Order Successful!</h1>
      <div
        style={{
          background: "#f1f8e9",
          padding: "30px",
          borderRadius: "15px",
          border: "1px solid #c8e6c9",
        }}
      >
        <h3>Sustainability Receipt</h3>
        <p>
          Order ID: <strong>#ECO-{orderId}</strong>
        </p>
        <p>
          Your Carbon Offset:{" "}
          <span style={{ color: "#2e7d32", fontWeight: "bold" }}>
            {totalCarbon?.toFixed(2)} kg CO2e
          </span>
        </p>
        <p>
          Total Paid: <strong>₹{totalAmount}</strong>
        </p>
      </div>
      <button
        onClick={() => navigate("/products")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#2e7d32",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Return to Catalog
      </button>
    </div>
  );
}

export default OrderSuccess;
