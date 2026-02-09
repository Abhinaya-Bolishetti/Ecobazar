import React, { useEffect, useState } from "react";
import api from "../api/api"; // Corrected path
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

  const handleAddToCart = async (id) => {
    try {
      await api.post(`/api/cart/add/${id}`);
      alert("Added to Smart Cart!");
    } catch (err) {
      alert("Login required to add items to cart.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#2e7d32" }}>Eco-Friendly Catalog</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default Products;
