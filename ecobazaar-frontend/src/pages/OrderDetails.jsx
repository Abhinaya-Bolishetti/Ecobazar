import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import PageHeader from "../components/PageHeader";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/orders/${id}`)
      .then((res) => setOrder(res.data))
      .catch((err) => console.error("Error fetching order details", err));
  }, [id]);

  if (!order)
    return (
      <div style={pageBg}>
        <p style={{ textAlign: "center", padding: "50px" }}>
          Loading details...
        </p>
      </div>
    );

  return (
    <div style={pageBg}>
      <div style={container}>
        <PageHeader
          title={`Order #${order.id}`}
          subtitle="Order details & sustainability impact"
        />

        <button onClick={() => navigate("/orders")} style={backBtn}>
          ← Back to Orders
        </button>

        <div style={summaryCard}>
          <p>
            <b>Status:</b> {order.status}
          </p>
          <p>
            <b>Placed on:</b> {new Date(order.orderDate).toLocaleString()}
          </p>
        </div>

        <div style={itemsCard}>
          {order.items.map((item, index) => (
            <div key={index} style={itemRow}>
              <div>
                <p style={{ fontWeight: "bold", margin: 0 }}>
                  {item.productName}
                </p>
                <p style={muted}>Qty: {item.quantity}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ margin: 0 }}>₹{item.price}</p>
                <p style={{ ...muted, color: "#2e7d32" }}>
                  🌿 {item.carbonImpact}kg CO₂
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={totalsCard}>
          <h3>Total: ₹{order.totalPrice}</h3>
          <h3 style={{ color: "#2e7d32" }}>
            🌿 Total Carbon: {order.totalCarbonImpact} kg CO₂
          </h3>
        </div>
      </div>
    </div>
  );
};

const pageBg = {
  minHeight: "100vh",
  background: "#f3f8f5",
  padding: "30px",
};

const container = {
  maxWidth: "820px",
  margin: "0 auto",
};

const backBtn = {
  background: "transparent",
  border: "1px solid #2e7d32",
  color: "#2e7d32",
  borderRadius: "8px",
  padding: "8px 12px",
  cursor: "pointer",
  marginBottom: "12px",
};

const summaryCard = {
  background: "#fff",
  borderRadius: "12px",
  padding: "14px 16px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  marginBottom: "12px",
};

const itemsCard = {
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  overflow: "hidden",
};

const itemRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "14px 16px",
  borderBottom: "1px solid #eee",
};

const totalsCard = {
  marginTop: "12px",
  background: "#fff",
  borderRadius: "12px",
  padding: "14px 16px",
  display: "flex",
  justifyContent: "space-between",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
};

const muted = { fontSize: 12, color: "#6b7280", margin: 0 };

export default OrderDetails;
