import React from "react";
// We removed the 'api' import here because it was not being used,
// which fixes the "no-unused-vars" warning.

const ProductCard = ({ product, onAddToCart }) => {
  // Helper to determine color based on backend ecoRating
  const getRatingColor = (carbon) => {
    if (carbon <= 0.3) return "#2e7d32"; // Green for very low impact
    if (carbon <= 0.7) return "#f9a825"; // Yellow/Orange for medium
    return "#d32f2f"; // Red for high impact
  };

  return (
    <div style={cardStyle}>
      <img
        src={
          product.imageUrl
            ? `http://localhost:8082${product.imageUrl}`
            : "https://via.placeholder.com/150"
        }
        alt={product.name}
        style={imgStyle}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/150?text=No+Image";
        }}
      />
      <div style={{ padding: "15px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{product.name}</h3>
          <span
            style={{
              background: getRatingColor(product.ecoRating),
              color: "white",
              padding: "2px 8px",
              borderRadius: "10px",
              fontSize: "11px",
              fontWeight: "bold",
              whiteSpace: "nowrap",
            }}
          >
            {product.carbonImpact} kg CO₂
          </span>
        </div>

        <p style={{ color: "#666", fontSize: "13px", margin: "10px 0" }}>
          {product.description}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "15px",
          }}
        >
          <span
            style={{ fontWeight: "bold", fontSize: "1.2rem", color: "#333" }}
          >
            ₹{product.price}
          </span>
          <button
            onClick={() => onAddToCart(product.id)}
            style={btnStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1b5e20")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#2e7d32")}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// Internal Styles
const cardStyle = {
  border: "1px solid #eee",
  borderRadius: "12px",
  overflow: "hidden",
  backgroundColor: "#fff",
  boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
  transition: "transform 0.2s",
};

const imgStyle = {
  width: "100%",
  height: "160px",
  objectFit: "cover",
};

const btnStyle = {
  backgroundColor: "#2e7d32",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500",
  transition: "background 0.3s",
};

export default ProductCard;
