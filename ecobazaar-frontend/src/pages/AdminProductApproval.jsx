import React, { useEffect, useState } from "react";
import api from "../api/api";

const AdminProductApproval = () => {
  const [products, setProducts] = useState([]);

  const loadPending = () => {
    api
      .get("/admin/products/unverified") // ✅ FIXED
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Fetch pending products error", err));
  };

  useEffect(() => {
    loadPending();
  }, []);

  const approve = async (id) => {
    await api.put(`/admin/products/${id}/verify`); // ✅ FIXED
    loadPending();
  };

  const reject = async (id) => {
    await api.delete(`/admin/products/${id}`); // ✅ FIXED
    loadPending();
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Pending Product Approvals</h2>

      {products.length === 0 && <p>No pending products 🎉</p>}

      {products.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ccc",
            padding: 12,
            borderRadius: 8,
            marginBottom: 10,
          }}
        >
          <p>
            <b>Name:</b> {p.name}
          </p>
          <p>
            <b>Price:</b> ₹{p.price}
          </p>
          <p>
            <b>Carbon Impact:</b> {p.carbonImpact}
          </p>
          <p>
            <b>Eco Certified:</b> {p.ecoCertified ? "Yes" : "No"}
          </p>

          <button
            onClick={() => approve(p.id)}
            style={{
              marginRight: 10,
              background: "green",
              color: "#fff",
              border: "none",
              padding: "6px 12px",
            }}
          >
            Approve
          </button>

          <button
            onClick={() => reject(p.id)}
            style={{
              background: "red",
              color: "#fff",
              border: "none",
              padding: "6px 12px",
            }}
          >
            Reject
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminProductApproval;
