import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSellers: 0,
    totalProducts: 0,
  });
  const [pendingUsers, setPendingUsers] = useState([]);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (activeTab === "overview") fetchStats();
    if (activeTab === "leaderboard") fetchAnalytics();
    if (activeTab === "users") fetchPendingUsers();
    if (activeTab === "products") fetchPendingProducts();
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Stats fetch failed", err);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await api.get("/analytics/leaderboard");
      setChartData({
        labels: res.data.map((item) => item[0]),
        datasets: [
          {
            label: "Total CO₂ Impact (kg)",
            data: res.data.map((item) => item[1]),
            backgroundColor: "rgba(46, 125, 50, 0.7)",
          },
        ],
      });
    } catch (err) {
      console.error("Analytics failed", err);
    }
  };

  const fetchPendingUsers = async () => {
    try {
      const res = await api.get("/admin/users/pending");
      setPendingUsers(res.data);
    } catch (err) {
      console.error("User fetch failed", err);
    }
  };

  const fetchPendingProducts = async () => {
    try {
      const res = await api.get("/admin/products/pending");
      setPendingProducts(res.data);
    } catch (err) {
      console.error("Product fetch failed", err);
    }
  };

  const handleUserAction = async (id, action) => {
    try {
      if (action === "approve") await api.put(`/admin/users/approve/${id}`);
      else await api.delete(`/admin/users/${id}`);
      fetchPendingUsers();
    } catch {
      alert("Action failed");
    }
  };

  const handleProductAction = async (id, action) => {
    try {
      if (action === "verify") await api.put(`/admin/products/verify/${id}`);
      else await api.delete(`/admin/products/reject/${id}`);
      fetchPendingProducts();
    } catch {
      alert("Action failed");
    }
  };

  const downloadReport = async () => {
    try {
      setDownloading(true);
      const res = await api.get("/analytics/download-report", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "eco_ai_report.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      alert("Not authorized or session expired");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div>
          <h2 style={{ margin: 0 }}>🛡️ Admin Portal</h2>
          <p style={{ color: "#4caf50", marginTop: 4 }}>
            EcoBazaar Sustainability Control Panel
          </p>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <Link to="/admin/products" style={{ textDecoration: "none" }}>
            <button style={primaryBtn}>🗂️ Product Management</button>
          </Link>
          <button onClick={downloadReport} style={secondaryBtn}>
            {downloading ? "⏳ Exporting..." : "📥 Export AI Report"}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={statsRow}>
        <div style={statCard}>
          👤 Users
          <br />
          <b>{stats.totalUsers}</b>
        </div>
        <div style={statCard}>
          🛒 Sellers
          <br />
          <b>{stats.totalSellers}</b>
        </div>
        <div style={statCard}>
          🌿 Products
          <br />
          <b>{stats.totalProducts}</b>
        </div>
      </div>

      {/* Tabs */}
      <div style={tabBar}>
        {["overview", "leaderboard", "users", "products"].map((tab) => (
          <button
            key={tab}
            style={activeTab === tab ? activeTabBtn : tabBtn}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "overview" && "🏠 Overview"}
            {tab === "leaderboard" && "📊 Leaderboard"}
            {tab === "users" && "👥 Approvals"}
            {tab === "products" && "🌿 Product Verification"}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={contentArea}>
        {activeTab === "overview" && (
          <div>
            <h3>System Status</h3>
            <p>
              The platform is running smoothly. AI monitors sustainability
              trends and generates insights for eco-friendly governance.
            </p>
          </div>
        )}

        {activeTab === "leaderboard" && (
          <div>
            <h3>Sustainability Impact</h3>
            <div style={{ height: 350 }}>
              {chartData.labels.length ? (
                <Bar
                  data={chartData}
                  options={{ maintainAspectRatio: false }}
                />
              ) : (
                <p>Loading analytics...</p>
              )}
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <ApprovalTable
            title="User & Seller Approvals"
            data={pendingUsers}
            onApprove={(id) => handleUserAction(id, "approve")}
            onReject={(id) => handleUserAction(id, "delete")}
            columns={["username", "role"]}
          />
        )}

        {activeTab === "products" && (
          <ApprovalTable
            title="Product Verification"
            data={pendingProducts}
            onApprove={(id) => handleProductAction(id, "verify")}
            onReject={(id) => handleProductAction(id, "delete")}
            columns={["name", "carbonImpact"]}
          />
        )}
      </div>
    </div>
  );
}

const ApprovalTable = ({ title, data, onApprove, onReject, columns }) => (
  <div>
    <h3>{title}</h3>
    <table style={tableStyle}>
      <thead>
        <tr style={thRow}>
          {columns.map((c) => (
            <th key={c} style={thStyle}>
              {c}
            </th>
          ))}
          <th style={thStyle}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length ? (
          data.map((row) => (
            <tr key={row.id}>
              {columns.map((c) => (
                <td key={c} style={tdStyle}>
                  {row[c]}
                </td>
              ))}
              <td style={tdStyle}>
                <button style={approveBtn} onClick={() => onApprove(row.id)}>
                  Approve
                </button>
                <button style={rejectBtn} onClick={() => onReject(row.id)}>
                  Reject
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={columns.length + 1}
              style={{ padding: 20, textAlign: "center" }}
            >
              No pending items 🎉
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

// --- Styles (Eco Theme + Animations) ---
const containerStyle = {
  padding: 30,
  background: "#f3f8f5",
  minHeight: "100vh",
};
const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20,
};
const statsRow = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
  gap: 20,
  marginBottom: 20,
};
const statCard = {
  background: "#fff",
  padding: 20,
  borderRadius: 12,
  textAlign: "center",
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
  transition: "transform 0.2s ease",
};
const tabBar = { display: "flex", gap: 10, marginBottom: 20 };
const tabBtn = {
  padding: "10px 16px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontWeight: 600,
  color: "#666",
};
const activeTabBtn = {
  ...tabBtn,
  color: "#2e7d32",
  borderBottom: "3px solid #2e7d32",
};
const contentArea = {
  background: "#fff",
  borderRadius: 12,
  padding: 24,
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
};
const primaryBtn = {
  background: "#2e7d32",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: 8,
  cursor: "pointer",
};
const secondaryBtn = {
  background: "#1976d2",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: 8,
  cursor: "pointer",
};

const tableStyle = { width: "100%", borderCollapse: "collapse" };
const thRow = { background: "#2e7d32", color: "#fff" };
const thStyle = { padding: 12 };
const tdStyle = { padding: 12, borderBottom: "1px solid #eee" };
const approveBtn = {
  background: "#2e7d32",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  borderRadius: 6,
  marginRight: 6,
  cursor: "pointer",
};
const rejectBtn = {
  background: "#d32f2f",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  borderRadius: 6,
  cursor: "pointer",
};

export default AdminDashboard;
