import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const SellerDashboard = () => {
  const [myProducts, setMyProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const fetchMyProducts = async () => {
    try {
      const res = await api.get("/products/my-products");
      setMyProducts(res.data);
    } catch (err) {
      console.error("Failed to load products", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/products/${id}`);
        setMyProducts(myProducts.filter((p) => p.id !== id));
        alert("Product deleted!");
      } catch (err) {
        alert("Delete failed!");
      }
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2>My Inventory</h2>
        <button onClick={() => navigate("/add-product")} style={addBtn}>
          + Add New Product
        </button>
      </div>

      <table style={tableStyle}>
        <thead>
          <tr style={{ background: "#eee" }}>
            <th style={th}>Image</th>
            <th style={th}>Name</th>
            <th style={th}>Price</th>
            <th style={th}>Status</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {myProducts.map((p) => (
            <tr key={p.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={td}>
                <img
                  src={`http://localhost:8082${p.imageUrl}`}
                  alt=""
                  style={{ width: "50px" }}
                />
              </td>
              <td style={td}>{p.name}</td>
              <td style={td}>₹{p.price}</td>
              <td style={td}>
                <span
                  style={{
                    color: p.status === "APPROVED" ? "green" : "orange",
                  }}
                >
                  {p.status}
                </span>
              </td>
              <td style={td}>
                <button
                  onClick={() => navigate(`/edit-product/${p.id}`)}
                  style={editBtn}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(p.id)} style={delBtn}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const addBtn = {
  background: "#2e7d32",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
const editBtn = {
  marginRight: "10px",
  padding: "5px 10px",
  background: "#2196F3",
  color: "white",
  border: "none",
  cursor: "pointer",
};
const delBtn = {
  padding: "5px 10px",
  background: "#f44336",
  color: "white",
  border: "none",
  cursor: "pointer",
};
const tableStyle = { width: "100%", borderCollapse: "collapse" };
const th = { padding: "12px", textAlign: "left" };
const td = { padding: "12px" };

export default SellerDashboard;
