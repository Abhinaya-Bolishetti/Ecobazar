import React, { useEffect, useState } from "react";
import api from "../api/api";

function Leaderboard() {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    api
      .get("/api/analytics/leaderboard")
      .then((res) => setRankings(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>🌍 Eco-Warrior Leaderboard</h1>
      <p>Top users saving the planet through green purchases.</p>
      <div style={{ maxWidth: "600px", margin: "20px auto" }}>
        {rankings.map((user, index) => (
          <div key={index} style={rankCard}>
            <span>
              #{index + 1} {user[0]}
            </span>
            <span style={{ color: "green", fontWeight: "bold" }}>
              {user[1].toFixed(2)} kg CO2 Saved
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
const rankCard = {
  display: "flex",
  justifyContent: "space-between",
  padding: "15px",
  borderBottom: "1px solid #ddd",
  background: "#f9f9f9",
  marginBottom: "5px",
  borderRadius: "8px",
};
export default Leaderboard;
