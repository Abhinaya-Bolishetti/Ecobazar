import React, { useEffect, useState } from "react";
import PRODUCT_API from "../api/productApi";

function AdminApproval() {
  const role = localStorage.getItem("role");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setLoading(true);

    PRODUCT_API.get("")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("LOAD ERROR:", err);
        alert("Failed to load products");
        setLoading(false);
      });
  };

  // 🔐 Role Guard
  if (role !== "ADMIN") {
    return (
      <div style={{ padding: "25px" }}>
        <h3>❌ Access Denied</h3>
        <p>Only admins can approve products.</p>
      </div>
    );
  }

  const approve = (id) => {
    console.log("Approving product:", id);

    PRODUCT_API.put(`/approve/${id}`)
      .then(() => {
        alert("Approval processed");
        loadProducts(); // 🔄 Refresh list
      })
      .catch((err) => {
        console.error("APPROVE ERROR:", err);

        if (err.response?.status === 403) {
          alert("403 Forbidden — You are not ADMIN");
        } else {
          alert(err.response?.data || "Approval failed");
        }
      });
  };

  return (
    <div style={{ padding: "25px" }}>
      <h2>🛡️ Admin – Approve Eco Products</h2>

      {loading && <p>Loading products...</p>}

      {!loading && products.length === 0 && (
        <p>No products found</p>
      )}

      {!loading &&
        products.map((p) => {
          const isEco = p.ecoCertified === true;
          const badEco =
            p.ecoRating === "C" ||
            p.ecoRating === "D" ||
            p.ecoRating === "E";

          return (
            <div
              key={p.id}
              style={{
                marginBottom: "15px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "6px",
              }}
            >
              <b>{p.name}</b>
              <br />

              Eco Rating: <b>{p.ecoRating}</b>
              <br />

              Eco Certified:{" "}
              <span style={{ color: isEco ? "green" : "red" }}>
                {isEco ? "Yes" : "No"}
              </span>

              <br />

              {/* ⚠️ Badge for reviewed but still non-eco */}
              {badEco && !isEco && (
                <div
                  style={{
                    color: "orange",
                    fontSize: "13px",
                    marginTop: "4px",
                  }}
                >
                  ⚠️ Admin Reviewed — Still Non-Eco
                </div>
              )}

              {/* ✅ Show button only if not certified */}
              {!isEco && (
                <button
                  style={{
                    marginTop: "6px",
                    padding: "6px 12px",
                    backgroundColor: badEco ? "#999" : "#2e7d32",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => approve(p.id)}
                >
                  {badEco ? "Review" : "Approve"}
                </button>
              )}
            </div>
          );
        })}
    </div>
  );
}

export default AdminApproval;
