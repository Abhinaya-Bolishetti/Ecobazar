import React, { useEffect, useState } from "react";
import api from "../api/api";

function AdminDashboard() {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalOrders: 0,
    globalSavings: 0,
  });

  useEffect(() => {
    api.get("/api/admin/metrics").then((res) => setMetrics(res.data));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>🛡️ Admin Dashboard</h1>
      <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
        <div className="stat-card">
          <h3>Users</h3>
          <p>{metrics.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Orders</h3>
          <p>{metrics.totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Total CO2 Saved</h3>
          <p>{metrics.globalSavings.toFixed(2)} kg</p>
        </div>
      </div>
    </div>
  );
}
export default AdminDashboard;
