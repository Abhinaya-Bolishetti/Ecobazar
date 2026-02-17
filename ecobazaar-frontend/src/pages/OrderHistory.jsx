import React, { useEffect, useState } from "react";
import api from "../api/api";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/orders/user")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch orders error", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={pageStyle}>
        <h2 style={titleStyle}>📦 My Orders</h2>
        <p>Loading your orders...</p>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <h2 style={titleStyle}>📦 My Orders</h2>

      {orders.length === 0 ? (
        <div style={emptyBox}>
          <p>No orders found 🌱</p>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={cardStyle}>
            <div style={cardHeader}>
              <div>
                <h4 style={{ margin: 0 }}>Order #{order.id}</h4>
                <p style={mutedText}>
                  {new Date(order.orderDate).toLocaleString()}
                </p>
              </div>

              <span
                style={{
                  ...statusBadge,
                  background:
                    order.status === "DELIVERED"
                      ? "#2e7d32"
                      : order.status === "PENDING"
                        ? "#f9a825"
                        : "#1565c0",
                }}
              >
                {order.status}
              </span>
            </div>

            <div style={summaryRow}>
              <div>
                <p style={label}>Total Price</p>
                <p style={priceText}>₹{order.totalPrice}</p>
              </div>
              <div>
                <p style={label}>Carbon Impact</p>
                <p style={carbonText}>🌿 {order.totalCarbonImpact} kg CO₂</p>
              </div>
            </div>

            <div style={itemsBox}>
              <h4 style={{ marginBottom: 10 }}>Products</h4>
              {order.items && order.items.length > 0 ? (
                order.items.map((item, idx) => (
                  <div key={idx} style={itemRow}>
                    <div>
                      <b>{item.productName}</b>
                      <div style={mutedText}>Qty: {item.quantity}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div>₹{item.price}</div>
                      <div style={carbonSmall}>🌿 {item.carbonImpact} kg</div>
                    </div>
                  </div>
                ))
              ) : (
                <p style={mutedText}>No items found for this order</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;

//
// 🌿 Styles (Eco Theme)
//
const pageStyle = {
  padding: "30px",
  maxWidth: "900px",
  margin: "0 auto",
  background: "#f4f7f6",
  minHeight: "90vh",
};

const titleStyle = {
  color: "#2e7d32",
  marginBottom: "25px",
};

const emptyBox = {
  background: "#fff",
  padding: "30px",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
};

const cardStyle = {
  background: "#ffffff",
  borderRadius: "14px",
  padding: "20px",
  marginBottom: "20px",
  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};

const cardHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #eee",
  paddingBottom: "10px",
  marginBottom: "15px",
};

const statusBadge = {
  padding: "6px 14px",
  borderRadius: "20px",
  color: "#fff",
  fontSize: "12px",
  fontWeight: "bold",
};

const summaryRow = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "15px",
};

const label = {
  fontSize: "12px",
  color: "#777",
};

const priceText = {
  fontSize: "16px",
  fontWeight: "bold",
};

const carbonText = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#2e7d32",
};

const itemsBox = {
  background: "#f9f9f9",
  padding: "15px",
  borderRadius: "10px",
};

const itemRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 0",
  borderBottom: "1px dashed #ddd",
};

const mutedText = {
  fontSize: "12px",
  color: "#777",
};

const carbonSmall = {
  fontSize: "12px",
  color: "#2e7d32",
};
