import React, { useEffect, useState } from "react";
import api from "../api/api";

const AnalyticsDashboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    api
      .get("/analytics/leaderboard")
      .then((res) => setLeaderboard(res.data))
      .catch((err) => console.error("Error fetching analytics", err));
  }, []);

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#2e7d32", textAlign: "center" }}>
        🌍 Eco-Warrior Leaderboard
      </h1>
      <p style={{ textAlign: "center", color: "#666" }}>
        Recognizing our top carbon-saving heroes.
      </p>

      <div style={tableContainer}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#2e7d32", color: "white" }}>
              <th style={thStyle}>Rank</th>
              <th style={thStyle}>Eco-Warrior</th>
              <th style={thStyle}>CO2 Saved (kg)</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((data, index) => (
              <tr
                key={index}
                style={{ borderBottom: "1px solid #ddd", textAlign: "center" }}
              >
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{data[0]}</td>
                <td
                  style={{ ...tdStyle, color: "#2e7d32", fontWeight: "bold" }}
                >
                  {/* data[1] is totalCarbonImpact from backend */}
                  {data[1] ? data[1].toFixed(2) : "0.00"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const tableContainer = {
  maxWidth: "800px",
  margin: "30px auto",
  background: "white",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
};
const thStyle = { padding: "15px" };
const tdStyle = { padding: "15px" };

export default AnalyticsDashboard;
