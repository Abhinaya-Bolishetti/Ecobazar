import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import ProductDetails from "./pages/ProductDetails";
import AdminDashboard from "./pages/AdminDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import OrderSuccess from "./pages/OrderSuccess";
import AddProduct from "./pages/AddProduct";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import AdminLogin from "./pages/AdminLogin";
import EditProduct from "./pages/EditProduct";
import OrderHistory from "./pages/OrderHistory";
import OrderDetails from "./pages/OrderDetails";
import AdminProductApproval from "./pages/AdminProductApproval";
import Home from "./pages/Home";
import AiChatbot from "./pages/AiChatbot";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register", "/admin-login"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <div style={{ minHeight: "80vh" }} className="page">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* User */}
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/ai-chat" element={<AiChatbot />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/order-success" element={<OrderSuccess />} />

          {/* Seller */}
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />

          {/* Admin */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProductApproval />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
