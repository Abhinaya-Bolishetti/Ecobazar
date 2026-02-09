import React, { useEffect, useState, useCallback } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = useCallback(async () => {
    try {
      const res = await api.get("/api/cart");
      setItems(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching cart", err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleCheckout = async () => {
    try {
      const res = await api.post("/api/orders/checkout");
      // ✅ Navigates to success page with data for "Sustainability Receipt"
      navigate("/order-success", {
        state: {
          totalCarbon: res.data.totalCarbon,
          orderId: res.data.orderId,
          totalAmount: res.data.totalAmount,
        },
      });
      setItems([]);
    } catch (err) {
      console.error(err);
      alert(
        "Checkout failed. Please ensure your backend is running and you are logged in.",
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

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        Loading eco-cart...
      </div>
    );

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ color: "#2e7d32", borderBottom: "2px solid #2e7d32" }}>
        🛒 My Smart Cart
      </h2>
      {items.length > 0 ? (
        <>
          <div
            style={{
              background: "#f1f8e9",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "20px",
            }}
          >
            <p>
              Total Carbon Footprint:{" "}
              <strong>{totalCarbon.toFixed(2)} kg CO2e</strong>
            </p>
            <p>
              Total Price: <strong>₹{totalPrice}</strong>
            </p>
            <button
              onClick={handleCheckout}
              style={{
                width: "100%",
                background: "#2e7d32",
                color: "white",
                padding: "12px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Confirm Purchase & Offset Carbon
            </button>
          </div>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                padding: "15px",
                borderBottom: "1px solid #eee",
              }}
            >
              <img
                src={`http://localhost:8082${item.product.imageUrl}`}
                alt=""
                style={{ width: "60px", borderRadius: "8px" }}
              />
              <div style={{ flex: 1, marginLeft: "15px" }}>
                <h4>{item.product.name}</h4>
                <p>
                  ₹{item.product.price} x {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>Cart is empty.</p>
      )}
    </div>
  );
}

export default Cart;
