import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    api
      .get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Fetch error", err));
  }, []);

  const handleAddToCart = async (id) => {
    try {
      await api.post(`/api/cart/add/${id}`);
      alert("Added to Cart!");
    } catch (err) {
      alert("Please login first.");
    }
  };

  const addToWishlist = async (id) => {
    try {
      await api.post(`/api/wishlist/add/${id}`);
      alert("Added to Wishlist ❤️");
    } catch (err) {
      alert("Wishlist error.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await api.delete(`/api/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  // Internal Styles to fix "not defined" errors
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
  };
  const cardStyle = {
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "8px",
    textAlign: "center",
  };
  const imgStyle = { width: "100%", height: "150px", objectFit: "cover" };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Eco-Catalog</h2>
      <div style={gridStyle}>
        {products.map((p) => (
          <div key={p.id} style={cardStyle}>
            <img
              src={`http://localhost:8082${p.imageUrl}`}
              style={imgStyle}
              alt={p.name}
              onError={(e) => {
                e.target.src = "https://placehold.co/150x150?text=Product";
              }}
            />
            <h4>{p.name}</h4>
            <button onClick={() => handleAddToCart(p.id)}>Cart</button>
            <button
              onClick={() => addToWishlist(p.id)}
              style={{ border: "none", background: "none" }}
            >
              ❤️
            </button>

            {userRole === "SELLER" && (
              <div style={{ marginTop: "10px" }}>
                <button onClick={() => navigate(`/edit-product/${p.p.id}`)}>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  style={{ color: "red" }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
