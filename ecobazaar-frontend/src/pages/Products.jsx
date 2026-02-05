import { useEffect, useState } from "react";
import api from "../api/api";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>

      {products.length === 0 && <p>No products found.</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "16px",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            {p.imageUrl && (
              <img
                src={`http://localhost:8082${p.imageUrl}`}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
            )}
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p>
              <b>₹{p.price}</b>
            </p>
            <p>Carbon Impact: {p.carbonImpact}</p>
            <p>{p.ecoCertified ? "🌱 Eco Certified" : "Not Eco Certified"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
