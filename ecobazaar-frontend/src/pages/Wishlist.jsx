import { useEffect, useState } from "react";
import api from "../api/api";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await api.get("/api/wishlist");
      setWishlist(res.data);
    } catch (err) {
      console.error("Error fetching wishlist", err);
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      await api.delete(`/api/wishlist/remove/${id}`);
      setWishlist(wishlist.filter((p) => p.id !== id));
    } catch (err) {
      alert("Failed to remove from wishlist");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ color: "#2e7d32" }}>❤️ My Eco-Wishlist</h2>
      <hr />
      {wishlist.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No items in wishlist yet.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "25px",
            marginTop: "20px",
          }}
        >
          {wishlist.map((p) => (
            <div
              key={p.id}
              style={{
                border: "1px solid #eee",
                padding: "15px",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <img
                src={`http://localhost:8082${p.imageUrl}`}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/200?text=Product";
                }}
              />
              <h3 style={{ margin: "10px 0" }}>{p.name}</h3>
              <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                ₹{p.price}
              </p>
              <button
                onClick={() => removeFromWishlist(p.id)}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "none",
                  border: "1px solid #ff4d4f",
                  color: "#ff4d4f",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
