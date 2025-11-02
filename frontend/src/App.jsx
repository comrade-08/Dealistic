import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "./store/slices/authSlice";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import Layout from "./components/Layout/Layout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import VendorDashboard from "./pages/Vendor/VendorDashboard";
import UserDashboard from "./pages/User/UserDashboard";
import ProtectedRoute from "./pages/Auth/ProtectedRoute";
import { useColorMode } from "./theme/ThemeProviderWrapper";
import { Toaster } from "react-hot-toast";
import OrdersPage from "./pages/User/OrdersPage";
import NotFound from "./pages/NotFound";

export default function App() {
  const { mode } = useColorMode();
  const { user } = useSelector((s) => s.auth);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(refreshToken());
  // }, [dispatch]);

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to={"/"} /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to={"/"} /> : <RegisterPage />}
        />

        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/user" replace />} />
          <Route
            path="admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="vendor"
            element={
              <ProtectedRoute roles={["vendor"]}>
                <VendorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="user"
            element={
              <ProtectedRoute roles={["user", "vendor", "admin"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="orders"
            element={
              <ProtectedRoute roles={["user", "admin"]}>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* ✅ Themed Toaster */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: mode === "dark" ? "#333" : "#fff",
            color: mode === "dark" ? "#fff" : "#000",
            border: mode === "dark" ? "1px solid #444" : "1px solid #ddd",
          },
          success: {
            iconTheme: {
              primary: mode === "dark" ? "#4ade80" : "#22c55e", // green
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: mode === "dark" ? "#f87171" : "#ef4444", // red
              secondary: "#fff",
            },
          },
        }}
      />
    </>
  );
}
