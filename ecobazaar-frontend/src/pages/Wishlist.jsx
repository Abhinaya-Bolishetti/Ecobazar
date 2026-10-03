import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadWishlist = async () => {
    try {
      const res = await api.get("/wishlist");
      setItems(res.data || []);
    } catch (e) {
      console.error(e);
      alert("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const moveToCart = async (product) => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cartMap") || "{}");
      savedCart[product.id] = (savedCart[product.id] || 0) + 1;
      localStorage.setItem("cartMap", JSON.stringify(savedCart));

      await api.delete(`/wishlist/${product.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setItems((prev) => prev.filter((p) => p.id !== product.id));
      navigate("/cart");
      window.dispatchEvent(new Event("storage"));
    } catch (e) {
      console.error(e);
      alert("Failed to move to cart");
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await api.delete(`/wishlist/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setItems((prev) => prev.filter((p) => p.id !== productId));
      window.dispatchEvent(new Event("wishlist_updated"));
    } catch (e) {
      console.error(e);
      alert("Failed to remove from wishlist");
    }
  };

  if (loading) {
    return (
      <p style={{ padding: 40, textAlign: "center", color: "#2e7d32" }}>
        🌿 Loading your wishlist...
      </p>
    );
  }

  return (
    <div style={pageStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <img src="/logo.png" alt="EcoBazaar" style={logoStyle} />
        <div>
          <h2 style={titleStyle}>My Wishlist</h2>
          <p style={subtitleStyle}>Your saved eco-friendly products 🌱</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div style={emptyBox}>
          <h3>Your wishlist is empty 💚</h3>
          <p>Browse products and save your favorites here.</p>
        </div>
      ) : (
        <div style={gridStyle}>
          {items.map((p) => (
            <div key={p.id} style={cardStyle}>
              <img
                src={`http://localhost:8082${p.imageUrl}`}
                alt={p.name}
                style={imageStyle}
              />

              <div style={{ padding: "12px" }}>
                <h4 style={{ margin: "0 0 6px 0" }}>{p.name}</h4>
                <p style={metaStyle}>🌿 {p.carbonImpact}kg CO₂ impact</p>
                <p style={priceStyle}>₹{p.price}</p>

                <div style={btnRow}>
                  <button onClick={() => moveToCart(p)} style={moveBtn}>
                    🛒 Move to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(p.id)}
                    style={removeBtn}
                  >
                    ✖ Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ---------- Styles ---------- */

const pageStyle = {
  padding: "40px",
  maxWidth: "1100px",
  margin: "0 auto",
  minHeight: "80vh",
  background: "#f4f7f6",
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  marginBottom: "30px",
};

const logoStyle = {
  width: "60px",
};

const titleStyle = {
  color: "#2e7d32",
  margin: 0,
};

const subtitleStyle = {
  color: "#607d8b",
  fontSize: "14px",
};

const emptyBox = {
  marginTop: 50,
  padding: 40,
  border: "2px dashed #c8e6c9",
  borderRadius: 14,
  textAlign: "center",
  background: "#ffffff",
  color: "#2e7d32",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  background: "#fff",
  borderRadius: 16,
  overflow: "hidden",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  transition: "transform 0.25s ease, box-shadow 0.25s ease",
};

const imageStyle = {
  width: "100%",
  height: "160px",
  objectFit: "cover",
};

const metaStyle = {
  fontSize: "12px",
  color: "#4caf50",
  margin: "4px 0",
};

const priceStyle = {
  fontWeight: "bold",
  color: "#2e7d32",
  marginBottom: "10px",
};

const btnRow = {
  display: "flex",
  gap: "8px",
};

const moveBtn = {
  flex: 1,
  padding: "8px",
  background: "#2e7d32",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: "600",
};

const removeBtn = {
  flex: 1,
  padding: "8px",
  background: "#ffebee",
  color: "#d32f2f",
  border: "1px solid #ffcdd2",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: "600",
};

export default Wishlist;
