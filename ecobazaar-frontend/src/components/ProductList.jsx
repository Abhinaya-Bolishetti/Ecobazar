import React, { useEffect, useState } from "react";
import api from "../api";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from Milestone 2 backend
    api
      .get("/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products", err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (productId) => {
    api
      .post(`/api/cart/add/${productId}`)
      .then(() => alert("Product added to your Green Cart!"))
      .catch((err) => alert("Error adding to cart. Please login."));
  };

  if (loading)
    return (
      <div className="text-center mt-10">Loading Sustainable Products...</div>
    );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
        Eco-Friendly Catalog
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found. Start by adding some as a Seller!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};
// ecobazaar-frontend/src/pages/Products.jsx (or ProductList.jsx)

const ProductCard = ({ product, userRole }) => {
  const addToWishlist = async (id) => {
    try {
      await api.post(`/api/wishlist/add/${id}`);
      alert("Added to Wishlist!");
    } catch (err) {
      alert("Error adding to wishlist");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/api/products/${id}`);
        alert("Deleted successfully!");
        fetchProducts(); // ✅ Refresh the list so it disappears from UI
      } catch (err) {
        console.error(err);
        alert("Delete failed. Check permissions.");
      }
    }
  };

  return (
    <div className="product-card">
      <img
        src={`http://localhost:8082${product.imageUrl}`}
        alt={product.name}
      />
      <h3>{product.name}</h3>

      {/* Wishlist Button */}
      <button
        onClick={() => addToWishlist(product.id)}
        style={{ background: "#ffc107" }}
      >
        ❤️ Wishlist
      </button>

      {/* Seller Specific Actions */}
      {userRole === "SELLER" && (
        <div className="seller-actions">
          <button
            onClick={() =>
              (window.location.href = `/edit-product/${product.id}`)
            }
          >
            Edit
          </button>
          <button
            onClick={() => deleteProduct(product.id)}
            style={{ background: "red", color: "white" }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
