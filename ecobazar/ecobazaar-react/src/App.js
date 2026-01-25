import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import AdminApproval from "./pages/AdminApproval";

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

  return (
    <BrowserRouter>
      <Routes>

        {/* ================= LOGIN PAGE ================= */}
        <Route
          path="/"
          element={<AuthPage setIsAuth={setIsAuth} />}
        />

        {/* ================= DASHBOARD ================= */}
        <Route
          path="/dashboard"
          element={
            isAuth ? (
              <Dashboard setIsAuth={setIsAuth} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* ================= PRODUCT LIST ================= */}
        <Route
          path="/products"
          element={
            isAuth ? (
              <ProductList />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* ================= PRODUCT DETAIL ================= */}
        <Route
          path="/products/:id"
          element={
            isAuth ? (
              <ProductDetail />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* ================= ADD PRODUCT (SELLER) ================= */}
        <Route
          path="/add-product"
          element={
            isAuth ? (
              <AddProduct />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* ================= ADMIN APPROVAL ================= */}
        <Route
          path="/admin-approval"
          element={
            isAuth ? (
              <AdminApproval />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
