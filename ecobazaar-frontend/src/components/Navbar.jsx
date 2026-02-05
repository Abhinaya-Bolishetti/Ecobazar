import { Link } from "react-router-dom";
import "./Navbar.css"; // optional if you create separate css

function Navbar() {
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="navbar">
      <Link to="/">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/products">Products</Link>
      <Link to="/add-product">Add Product</Link>

      {token && (
        <button onClick={logout} style={{ marginLeft: 20 }}>
          Logout
        </button>
      )}
    </div>
  );
}

export default Navbar;
