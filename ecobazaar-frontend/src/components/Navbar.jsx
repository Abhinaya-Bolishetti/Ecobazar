import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let role = null;
  if (token) {
    try {
      role = jwtDecode(token).role;
    } catch {}
  }

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: 10, background: "#1f7a5b", color: "white" }}>
      <Link to="/">Login</Link> | <Link to="/register">Register</Link> |{" "}
      <Link to="/products">Products</Link>
      {role === "SELLER" && (
        <>
          {" "}
          | <Link to="/add-product">Add Product</Link>
        </>
      )}
      {token && (
        <>
          {" "}
          | <Link to="/cart">Cart</Link>
        </>
      )}
      {token && (
        <>
          {" "}
          | <Link to="/wishlist">Wishlist</Link>
        </>
      )}
      {token && (
        <button onClick={logout} style={{ marginLeft: 20 }}>
          Logout
        </button>
      )}
    </div>
  );
}

export default Navbar;
