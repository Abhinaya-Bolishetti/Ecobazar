import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [impactFilter, setImpactFilter] = useState(0);
  const [cartMap, setCartMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/products").then((res) => {
      setProducts(res.data);
      localStorage.setItem("productsCache", JSON.stringify(res.data));
    });

    const savedCart = JSON.parse(localStorage.getItem("cartMap") || "{}");
    setCartMap(savedCart);
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesImpact = p.carbonImpact >= impactFilter;
    return matchesSearch && matchesImpact;
  });

  const syncCart = (updated) => {
    localStorage.setItem("cartMap", JSON.stringify(updated));
  };

  const addToCart = (p) => {
    const updated = { ...cartMap, [p.id]: (cartMap[p.id] || 0) + 1 };
    setCartMap(updated);
    syncCart(updated);
  };

  // ✅ Added Wishlist Function
  const addToWishlist = async (product) => {
    try {
      await api.post(`/wishlist/${product.id}`);
      alert(`❤️ ${product.name} added to wishlist!`);
    } catch (err) {
      console.error("Wishlist error:", err);
      alert("Please login to add items to wishlist.");
    }
  };

  const increaseQty = (id) => {
    const updated = { ...cartMap, [id]: cartMap[id] + 1 };
    setCartMap(updated);
    syncCart(updated);
  };

  const decreaseQty = (id) => {
    const newQty = cartMap[id] - 1;
    let updated = { ...cartMap };
    if (newQty <= 0) delete updated[id];
    else updated[id] = newQty;
    setCartMap(updated);
    syncCart(updated);
  };

  return (
    <div style={{ padding: 30 }}>
      <h2 style={{ color: "#2e7d32", textAlign: "center" }}>🌿 Eco-Catalog</h2>

      <div style={filterBar}>
        <input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInput}
        />
        <input
          type="range"
          min="0"
          max="50"
          value={impactFilter}
          onChange={(e) => setImpactFilter(e.target.value)}
        />
        <span>{impactFilter}kg+</span>
      </div>

      <div style={grid}>
        {filteredProducts.map((p) => {
          const qty = cartMap[p.id] || 0;
          return (
            <div key={p.id} style={card}>
              <img
                src={`http://localhost:8082${p.imageUrl}`}
                alt={p.name}
                style={img}
                onClick={() => navigate(`/products/${p.id}`)}
              />
              <h4>{p.name}</h4>
              <p>{p.carbonImpact}kg CO₂</p>
              <p>₹{p.price}</p>

              {/* ✅ Combined Cart and Wishlist Row */}
              <div style={{ display: "flex", gap: "10px", marginTop: 10 }}>
                {qty > 0 ? (
                  <div style={{ ...qtyBox, flex: 1 }}>
                    <button onClick={() => decreaseQty(p.id)} style={qtyBtn}>
                      –
                    </button>
                    <b>{qty}</b>
                    <button onClick={() => increaseQty(p.id)} style={qtyBtn}>
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(p)}
                    style={{ ...cartBtn, flex: 1, marginTop: 0 }}
                  >
                    Add to Cart
                  </button>
                )}

                {/* ❤️ Wishlist Button */}
                <button
                  onClick={() => addToWishlist(p)}
                  style={wishBtn}
                  title="Add to Wishlist"
                >
                  ❤️
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- Styles ---

const filterBar = {
  display: "flex",
  gap: 12,
  alignItems: "center",
  marginBottom: 20,
};

const searchInput = {
  padding: "8px 12px",
  borderRadius: 6,
  border: "1px solid #ccc",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: 20,
};

const card = {
  background: "#fff",
  padding: 15,
  borderRadius: 10,
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const img = {
  width: "100%",
  height: 160,
  objectFit: "cover",
  borderRadius: 8,
  cursor: "pointer",
};

const qtyBox = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  background: "#f1f8e9",
  borderRadius: 6,
  padding: "5px",
};

const qtyBtn = {
  background: "#2e7d32",
  color: "#fff",
  border: "none",
  padding: "4px 10px",
  borderRadius: 4,
  cursor: "pointer",
};

const cartBtn = {
  width: "100%",
  background: "#2e7d32",
  color: "#fff",
  border: "none",
  padding: "8px",
  borderRadius: 6,
  cursor: "pointer",
  fontWeight: "bold",
};

// ✅ Added Wishlist Button Style
const wishBtn = {
  background: "#fff",
  border: "1px solid #ddd",
  borderRadius: 6,
  padding: "8px 12px",
  cursor: "pointer",
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease",
};

export default Products;
