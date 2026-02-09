import { useEffect, useState, useCallback } from "react";
import api from "../api/api"; // Updated path

function Cart() {
  const [items, setItems] = useState([]);

  const fetchCart = useCallback(async () => {
    try {
      const res = await api.get("/api/cart");
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching cart", err);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const removeItem = async (productId) => {
    try {
      // Note: Ensure your backend has this @DeleteMapping
      await api.delete(`/api/cart/remove/${productId}`);
      fetchCart();
    } catch (err) {
      console.error("Error removing item", err);
    }
  };

  const handleCheckout = async () => {
    try {
      await api.post("/api/orders/checkout");
      alert(
        "Order placed! Your carbon footprint for this purchase has been saved.",
      );
      setItems([]);
    } catch (err) {
      alert(
        "Checkout failed. Make sure your OrderController is running on port 8082.",
      );
    }
  };

  const totalPrice = items.reduce(
    (sum, item) => sum + (item.product.price || 0) * item.quantity,
    0,
  );
  const totalCarbon = items.reduce(
    (sum, item) => sum + (item.product.carbonImpact || 0) * item.quantity,
    0,
  );

  return (
    <div style={containerStyle}>
      <h2
        style={{
          borderBottom: "2px solid #2e7d32",
          paddingBottom: "10px",
          color: "#2e7d32",
        }}
      >
        🛒 My Smart Cart
      </h2>

      {items.length > 0 ? (
        <>
          <div style={summaryStyle}>
            <h4 style={{ margin: "0 0 10px 0" }}>🌍 Sustainability Summary</h4>
            <p>
              Total Carbon: <strong>{totalCarbon.toFixed(2)} kg CO2e</strong>
            </p>
            <p>
              Total Price: <strong>₹{totalPrice}</strong>
            </p>
            <button onClick={handleCheckout} style={checkoutButtonStyle}>
              Confirm Purchase
            </button>
          </div>

          {items.map((item) => (
            <div key={item.id} style={itemCardStyle}>
              <img
                src={`http://localhost:8082${item.product.imageUrl}`}
                alt={item.product.name}
                style={imgStyle}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/80?text=Eco";
                }}
              />
              <div style={{ flex: 1, marginLeft: "15px" }}>
                <h4 style={{ margin: "0" }}>{item.product.name}</h4>
                <p style={{ margin: "5px 0", color: "#666" }}>
                  ₹{item.product.price} x {item.quantity}
                  <span
                    style={{
                      marginLeft: "10px",
                      color: "#2e7d32",
                      fontWeight: "bold",
                    }}
                  >
                    ({item.product.carbonImpact} kg CO2/unit)
                  </span>
                </p>
              </div>
              <button
                onClick={() => removeItem(item.product.id)}
                style={removeBtnStyle}
              >
                Remove
              </button>
            </div>
          ))}
        </>
      ) : (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <p style={{ fontSize: "1.2rem", color: "#666" }}>
            Your cart is empty.
          </p>
          <a
            href="/products"
            style={{ color: "#2e7d32", textDecoration: "underline" }}
          >
            Browse eco-friendly products
          </a>
        </div>
      )}
    </div>
  );
}

// Styles
const containerStyle = {
  padding: "30px",
  maxWidth: "800px",
  margin: "0 auto",
  fontFamily: "Arial, sans-serif",
};
const summaryStyle = {
  background: "#e8f5e9",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "30px",
  border: "1px solid #c8e6c9",
};
const itemCardStyle = {
  display: "flex",
  alignItems: "center",
  padding: "15px",
  borderBottom: "1px solid #eee",
};
const imgStyle = {
  width: "80px",
  height: "80px",
  objectFit: "cover",
  borderRadius: "8px",
};
const checkoutButtonStyle = {
  width: "100%",
  background: "#2e7d32",
  color: "white",
  padding: "12px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
  marginTop: "10px",
};
const removeBtnStyle = {
  background: "none",
  border: "1px solid #ff4d4f",
  color: "#ff4d4f",
  padding: "5px 10px",
  borderRadius: "4px",
  cursor: "pointer",
};

export default Cart;
