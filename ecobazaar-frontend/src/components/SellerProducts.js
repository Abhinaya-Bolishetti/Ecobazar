import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

function SellerProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const fetchMyProducts = async () => {
    try {
      const res = await api.get("/products/my-products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div style={pageBg}>
      <div style={container}>
        <PageHeader
          title="My Inventory"
          subtitle="Track and manage your listed products"
        />

        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr style={thead}>
                <th style={pad}>Product Name</th>
                <th style={pad}>Price</th>
                <th style={pad}>Status</th>
                <th style={pad}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} style={tr}>
                  <td style={pad}>{p.name}</td>
                  <td style={pad}>₹{p.price}</td>
                  <td style={pad}>
                    <span
                      style={{
                        ...statusPill,
                        background:
                          p.status === "APPROVED" ? "#e8f5e9" : "#fff3e0",
                        color: p.status === "APPROVED" ? "#2e7d32" : "#ef6c00",
                      }}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td style={pad}>
                    <button
                      style={editBtn}
                      onClick={() => navigate(`/seller/edit-product/${p.id}`)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      style={deleteBtn}
                      onClick={() => handleDelete(p.id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ padding: 20, textAlign: "center" }}>
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const pageBg = {
  minHeight: "100vh",
  background: "#f3f8f5",
  padding: "30px",
};

const container = { maxWidth: "1100px", margin: "0 auto" };

const tableWrap = {
  background: "#fff",
  borderRadius: "14px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  overflow: "hidden",
};

const table = { width: "100%", borderCollapse: "collapse" };
const thead = { background: "#2e7d32", color: "#fff", textAlign: "left" };
const tr = { borderBottom: "1px solid #eee" };
const pad = { padding: "12px" };

const statusPill = {
  padding: "4px 10px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: 600,
};

const editBtn = {
  background: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "6px 10px",
  cursor: "pointer",
  marginRight: "6px",
};

const deleteBtn = {
  background: "#d32f2f",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "6px 10px",
  cursor: "pointer",
};

export default SellerProducts;
