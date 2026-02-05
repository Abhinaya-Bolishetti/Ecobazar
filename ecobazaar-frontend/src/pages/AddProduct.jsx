import { useState } from "react";
import api from "../api/api";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    carbonImpact: "",
    ecoCertified: false,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("description", form.description);
    data.append("price", form.price);
    data.append("carbonImpact", form.carbonImpact);
    data.append("ecoCertified", form.ecoCertified);
    data.append("image", image);

    try {
      await api.post("/api/products", data);
      alert("Product uploaded successfully!");
    } catch (err) {
      alert("Upload failed (check token / role)");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Add Product</h2>

      {preview && <img src={preview} alt="preview" width="120" />}

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />
        <input name="price" placeholder="Price" onChange={handleChange} />
        <input
          name="carbonImpact"
          placeholder="Carbon Impact"
          onChange={handleChange}
        />

        <label>
          Eco Certified
          <input type="checkbox" name="ecoCertified" onChange={handleChange} />
        </label>

        <input type="file" accept="image/*" onChange={handleImage} />

        <button type="submit">Upload Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
