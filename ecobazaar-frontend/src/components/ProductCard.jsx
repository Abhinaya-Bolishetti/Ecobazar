import React, { useState } from "react";
import api from "../api/api";

const ProductCard = ({ product, onAddToCart }) => {
  const [showAI, setShowAI] = useState(false);
  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const res = await api.post("/ai/chat", {
        message: `Tell me if ${product.name} is eco-friendly and suggest greener alternatives if any. ${question}`,
      });
      setReply(res.data.reply);
    } catch (e) {
      setReply("Sorry, I couldn't process your request right now.");
    } finally {
      setLoading(false);
    }
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
      />

      <h4>{product.name}</h4>
      <p>{product.description}</p>
      <p>
        <b>₹{product.price}</b>
      </p>
      <p>
        <b>Carbon Impact:</b> {product.carbonImpact} kg CO₂
      </p>

      <button onClick={() => onAddToCart(product)} style={btnPrimary}>
        Add to Cart
      </button>

      <button
        onClick={() => setShowAI(true)}
        style={{ ...btnSecondary, marginLeft: 10 }}
      >
        Ask AI
      </button>

      {/* AI Modal */}
      {showAI && (
        <div style={modalOverlay}>
          <div style={modalCard}>
            <h3>Ask AI about {product.name}</h3>

            <textarea
              rows={3}
              placeholder="Ask about eco-friendliness, carbon impact, alternatives..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              style={{ width: "100%", padding: 8 }}
            />

            <button onClick={askAI} style={btnPrimary}>
              {loading ? "Thinking..." : "Ask"}
            </button>

            {reply && (
              <div
                style={{ marginTop: 10, background: "#f1f8e9", padding: 10 }}
              >
                <b>AI:</b> {reply}
              </div>
            )}

            <button
              onClick={() => {
                setShowAI(false);
                setQuestion("");
                setReply("");
              }}
              style={{ ...btnSecondary, marginTop: 10 }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: 8,
  padding: 15,
  width: 250,
  margin: 10,
  background: "#fff",
};

const imgStyle = {
  width: "100%",
  height: 150,
  objectFit: "cover",
  borderRadius: 6,
};

const btnPrimary = {
  marginTop: 10,
  padding: "8px 12px",
  background: "#2e7d32",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};

const btnSecondary = {
  marginTop: 10,
  padding: "8px 12px",
  background: "#1565c0",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalCard = {
  background: "#fff",
  padding: 20,
  borderRadius: 8,
  width: 400,
};

export default ProductCard;
