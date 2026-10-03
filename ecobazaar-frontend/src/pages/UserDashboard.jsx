import React, { useEffect, useState } from "react";
import api from "../api/api";

const UserDashboard = () => {
  const [stats, setStats] = useState(null);
  const [aiReport, setAiReport] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    api
      .get("/user/analytics")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Analytics error", err));
  }, []);

  const generateAIReport = () => {
    setLoadingAI(true);
    api
      .get("/reports/sustainability")
      .then((res) => setAiReport(res.data))
      .catch((err) => console.error("AI Report error", err))
      .finally(() => setLoadingAI(false));
  };

  if (!stats)
    return (
      <div style={pageStyle}>
        <h2 style={titleStyle}>🌿 My Eco Dashboard</h2>
        <p>Loading dashboard...</p>
      </div>
    );

  const badge =
    stats.totalCarbon > 50
      ? { label: "🌍 Eco Hero", color: "#1b5e20" }
      : stats.totalCarbon > 20
        ? { label: "🌱 Carbon Saver", color: "#2e7d32" }
        : { label: "🌿 Green Starter", color: "#66bb6a" };

  return (
    <div style={pageStyle}>
      <h2 style={titleStyle}>🌿 My Eco Dashboard</h2>

      {/* Stats Cards */}
      <div style={cardRow}>
        <div style={statCard}>
          <p style={label}>Total Orders</p>
          <h3>{stats.totalOrders}</h3>
        </div>

        <div style={statCard}>
          <p style={label}>Total Carbon Saved</p>
          <h3 style={{ color: "#2e7d32" }}>
            🌿 {stats.totalCarbon.toFixed(2)} kg CO₂
          </h3>
        </div>

        <div style={{ ...statCard, borderLeft: `6px solid ${badge.color}` }}>
          <p style={label}>Eco Badge</p>
          <h3 style={{ color: badge.color }}>{badge.label}</h3>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div style={sectionCard}>
        <h3 style={sectionTitle}>📊 Monthly Carbon Saved</h3>
        <div style={monthGrid}>
          {Object.entries(stats.monthlyCarbon).map(([month, val]) => (
            <div key={month} style={monthCard}>
              <p style={label}>{month}</p>
              <h4 style={{ color: "#2e7d32" }}>{val.toFixed(2)} kg</h4>
            </div>
          ))}
        </div>
      </div>

      {/* AI Report Button */}
      <div style={actionBox}>
        <button
          onClick={generateAIReport}
          style={{
            ...primaryBtn,
            opacity: loadingAI ? 0.7 : 1,
            cursor: loadingAI ? "not-allowed" : "pointer",
          }}
          disabled={loadingAI}
        >
          {loadingAI ? "🤖 Generating AI Report..." : "🤖 Generate AI Report"}
        </button>

        <a
          href="http://localhost:8082/api/user/analytics/report"
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "none" }}
        >
          <button style={secondaryBtn}>📥 Download My Carbon Report</button>
        </a>
      </div>

      {/* AI Report Output */}
      {aiReport && (
        <div style={aiCard}>
          <h3 style={sectionTitle}>🤖 AI Sustainability Report</h3>

          <div style={aiGrid}>
            <div>
              <p style={label}>Total Orders</p>
              <b>{aiReport.totalOrders}</b>
            </div>
            <div>
              <p style={label}>Total Carbon</p>
              <b>{aiReport.totalCarbon.toFixed(2)} kg</b>
            </div>
            <div>
              <p style={label}>Eco %</p>
              <b>{aiReport.ecoPercentage}%</b>
            </div>
          </div>

          <p style={{ marginTop: 10 }}>
            <b>AI Insight:</b> {aiReport.aiInsight}
          </p>

          <h4 style={{ marginTop: 15 }}>AI Recommendations</h4>
          <ul>
            {aiReport.recommendations.map((r, idx) => (
              <li key={idx}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;

//
// 🌿 Styles
//
const pageStyle = {
  padding: "30px",
  maxWidth: "1100px",
  margin: "0 auto",
  background: "#f4f7f6",
  minHeight: "90vh",
};

const titleStyle = {
  color: "#2e7d32",
  marginBottom: "25px",
};

const cardRow = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  marginBottom: "30px",
};

const statCard = {
  background: "#fff",
  padding: "20px",
  borderRadius: "14px",
  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
};

const sectionCard = {
  background: "#fff",
  padding: "25px",
  borderRadius: "14px",
  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
  marginBottom: "25px",
};

const sectionTitle = {
  marginBottom: "15px",
  color: "#2e7d32",
};

const monthGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
  gap: "15px",
};

const monthCard = {
  background: "#f1f8f4",
  padding: "15px",
  borderRadius: "10px",
  textAlign: "center",
};

const actionBox = {
  display: "flex",
  gap: "15px",
  flexWrap: "wrap",
  marginBottom: "25px",
};

const aiCard = {
  background: "#f7fdf9",
  padding: "25px",
  borderRadius: "14px",
  border: "1px solid #dcedc8",
};

const aiGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "15px",
};

const label = {
  fontSize: "12px",
  color: "#777",
};

const primaryBtn = {
  padding: "12px 20px",
  background: "#1565c0",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
};

const secondaryBtn = {
  padding: "12px 20px",
  background: "#2e7d32",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
};
