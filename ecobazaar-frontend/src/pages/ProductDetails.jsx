import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

const BACKEND_URL = "http://localhost:8082";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
        // Check if item is already in cart
        const cartMap = JSON.parse(localStorage.getItem("cartMap") || "{}");
        if (cartMap[id]) setInCart(true);
      })
      .catch((err) => {
        console.error("❌ Product fetch failed:", err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    const cartMap = JSON.parse(localStorage.getItem("cartMap") || "{}");
    cartMap[product.id] = (cartMap[product.id] || 0) + 1;
    localStorage.setItem("cartMap", JSON.stringify(cartMap));
    setInCart(true);
    alert("Added to cart! 🌿");
  };

  if (loading)
    return (
      <p style={{ textAlign: "center", padding: "50px" }}>
        Loading eco-details...
      </p>
    );
  if (!product)
    return (
      <p style={{ textAlign: "center", color: "red", padding: "50px" }}>
        Product not found
      </p>
    );

  return (
    <div style={container}>
      <div style={card}>
        <img
          src={
            product.imageUrl
              ? `${BACKEND_URL}${product.imageUrl}`
              : "https://placehold.co/400x300?text=Eco+Product"
          }
          alt={product.name}
          style={image}
        />

        <div style={info}>
          <h2 style={{ color: "#2e7d32", marginBottom: "10px" }}>
            {product.name}
          </h2>
          <p style={{ color: "#666", lineHeight: "1.6" }}>
            {product.description}
          </p>

          <div style={statsBox}>
            <p style={{ fontSize: "20px", margin: "10px 0" }}>
              💰 <b>Price:</b> ₹{product.price}
            </p>
            <p style={{ color: "#2e7d32", fontSize: "18px" }}>
              🌿 <b>Carbon Impact:</b> {product.carbonImpact} kg CO₂ saved
            </p>
          </div>

          <div style={btnRow}>
            <button style={backBtn} onClick={() => navigate("/products")}>
              ← Catalog
            </button>
            <button
              style={inCart ? addedBtn : buyBtn}
              onClick={handleAddToCart}
              disabled={inCart}
            >
              {inCart ? "In Cart ✓" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Additional Styles
const statsBox = {
  padding: "15px",
  background: "#f9f9f9",
  borderRadius: "8px",
  margin: "20px 0",
};

const buyBtn = {
  padding: "10px 25px",
  borderRadius: "6px",
  border: "none",
  background: "#2e7d32",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  flex: 1,
};

const addedBtn = {
  ...buyBtn,
  background: "#81c784",
  cursor: "default",
};

const container = {
  minHeight: "90vh",
  background: "#f4f7f6",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "30px",
};
const card = {
  background: "#fff",
  padding: "30px",
  borderRadius: "12px",
  maxWidth: "900px",
  width: "100%",
  display: "flex",
  gap: "30px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
};
const image = {
  width: "350px",
  height: "350px",
  objectFit: "cover",
  borderRadius: "10px",
  border: "1px solid #ddd",
};
const info = { flex: 1 };
const btnRow = { marginTop: "25px", display: "flex", gap: "15px" };
const backBtn = {
  padding: "10px 20px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  background: "#f5f5f5",
  cursor: "pointer",
};

export default ProductDetails;
