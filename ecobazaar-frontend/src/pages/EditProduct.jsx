import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});

  useEffect(() => {
    api.get("/api/products").then((res) => {
      const p = res.data.find((x) => x.id === Number(id));
      setProduct(p);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/api/products/${id}`, product);
    navigate("/products");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={product.name || ""}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      <input
        value={product.description || ""}
        onChange={(e) =>
          setProduct({ ...product, description: e.target.value })
        }
      />
      <input
        value={product.price || ""}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
      />
      <input
        value={product.carbonImpact || ""}
        onChange={(e) =>
          setProduct({ ...product, carbonImpact: e.target.value })
        }
      />
      <button>Save</button>
    </form>
  );
}
export default EditProduct;
