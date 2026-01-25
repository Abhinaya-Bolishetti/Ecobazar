import React, { useState } from "react";
import PRODUCT_API from "../api/productApi";

function AddProduct() {
  const role = localStorage.getItem("role");

  // ✅ Hooks FIRST
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    carbonImpact: "",
  });

  // ✅ THEN role check
  if (role !== "SELLER") {
    return <h3>❌ Access Denied: Only sellers can add products</h3>;
  }

  const handleSubmit = () => {
    PRODUCT_API.post("", product)
      .then(() => alert("Product Added"))
      .catch((err) => alert(err.response?.data || "Error"));
  };

  return (
    <div style={{ padding: "25px" }}>
      <h2>Add Product (Seller)</h2>

      <input
        placeholder="Name"
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      <br /><br />

      <input
        placeholder="Description"
        onChange={(e) =>
          setProduct({ ...product, description: e.target.value })
        }
      />
      <br /><br />

      <input
        placeholder="Price"
        type="number"
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
      />
      <br /><br />

      <input
        placeholder="Carbon Impact (CO₂/kg)"
        type="number"
        onChange={(e) =>
          setProduct({ ...product, carbonImpact: e.target.value })
        }
      />
      <br /><br />

      <button onClick={handleSubmit}>Add Product</button>
    </div>
  );
}

export default AddProduct;
