import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import PageHeader from "../components/PageHeader";

function Cart() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cartMap = JSON.parse(localStorage.getItem("cartMap") || "{}");
    const products = JSON.parse(localStorage.getItem("productsCache") || "[]");

    const cartItems = Object.entries(cartMap)
      .map(([id, qty]) => {
        const product = products.find((p) => String(p.id) === String(id));
        return product ? { ...product, quantity: qty } : null;
      })
      .filter(Boolean);

    setItems(cartItems);
  }, []);

  const syncCartMap = (updatedMap) => {
    localStorage.setItem("cartMap", JSON.stringify(updatedMap));
  };

  const increaseQty = (id) => {
    const cartMap = JSON.parse(localStorage.getItem("cartMap") || "{}");
    const updated = { ...cartMap, [id]: (cartMap[id] || 0) + 1 };
    syncCartMap(updated);
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)),
    );
  };

  const decreaseQty = (id) => {
    const cartMap = JSON.parse(localStorage.getItem("cartMap") || "{}");
    const newQty = (cartMap[id] || 0) - 1;
    let updated = { ...cartMap };

    if (newQty <= 0) {
      delete updated[id];
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      updated[id] = newQty;
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i)),
      );
    }
    syncCartMap(updated);
  };

  const handleCheckout = async () => {
    if (items.length === 0) return alert("Your cart is empty!");

    try {
      const payload = items.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        carbonImpact: i.carbonImpact,
        quantity: i.quantity,
      }));

      await api.post("/orders/place", payload);
      localStorage.removeItem("cartMap");
      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error("Order placement failed", err);
      alert("Checkout failed. Please ensure you are logged in.");
    }
  };

  const totalPrice = items.reduce(
    (sum, i) => sum + Number(i.price || 0) * i.quantity,
    0,
  );

  const totalCarbon = items.reduce(
    (sum, i) => sum + Number(i.carbonImpact || 0) * i.quantity,
    0,
  );

  return (
    <div style={pageBg}>
      <div style={container}>
        <PageHeader
          title="Your Eco-Cart"
          subtitle="Review your sustainable picks"
        />

        {items.length === 0 ? (
          <div style={emptyState}>
            <h3>🛒 Your cart is empty</h3>
            <button style={ghostBtn} onClick={() => navigate("/products")}>
              Browse Products
            </button>
          </div>
        ) : (
          <>
            <div style={listCard}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={itemRow}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f1f8f4")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <div>
                    <b>{item.name}</b>
                    <div style={muted}>
                      ₹{item.price} • {item.carbonImpact}kg CO₂
                    </div>
                  </div>

                  <div style={qtyBoxStyle}>
                    <button onClick={() => decreaseQty(item.id)} style={qtyBtn}>
                      –
                    </button>
                    <span style={{ margin: "0 10px", fontWeight: 600 }}>
                      {item.quantity}
                    </span>
                    <button onClick={() => increaseQty(item.id)} style={qtyBtn}>
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={summaryCard}>
              <div>
                <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
                <p style={{ color: "#2e7d32", fontWeight: 600 }}>
                  🌿 Carbon Impact: {totalCarbon.toFixed(2)} kg CO₂
                </p>
              </div>

              <button style={primaryBtn} onClick={handleCheckout}>
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// --- Styles ---
const pageBg = {
  minHeight: "100vh",
  background: "#f3f8f5",
  padding: "30px",
};

const container = {
  maxWidth: "720px",
  margin: "0 auto",
};

const listCard = {
  background: "#fff",
  borderRadius: "14px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  overflow: "hidden",
};

const itemRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 16px",
  borderBottom: "1px solid #eee",
  transition: "background 0.15s ease",
};

const summaryCard = {
  marginTop: "16px",
  background: "#fff",
  borderRadius: "14px",
  padding: "16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
};

const emptyState = {
  textAlign: "center",
  background: "#fff",
  padding: "40px",
  borderRadius: "14px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
};

const muted = { fontSize: 12, color: "#6b7280" };

const qtyBoxStyle = {
  display: "flex",
  alignItems: "center",
  border: "1px solid #2e7d32",
  borderRadius: 8,
  padding: "4px 8px",
};

const qtyBtn = {
  background: "#2e7d32",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "4px 10px",
  cursor: "pointer",
};

const primaryBtn = {
  background: "#2e7d32",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  padding: "12px 18px",
  cursor: "pointer",
  fontWeight: 600,
};

const ghostBtn = {
  background: "transparent",
  border: "1px solid #2e7d32",
  color: "#2e7d32",
  borderRadius: 10,
  padding: "10px 16px",
  cursor: "pointer",
  fontWeight: 600,
};

export default Cart;
