import "./App.css";
import BuyerRegister from "./pages/buyer/BuyerRegister";
import BuyerLogin from "./pages/buyer/BuyerLogin";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";
import { Routes, Route, Navigate } from "react-router";
import { useAuthContext } from "./context/AuthContext";
import BuyerHome from "./pages/buyer/BuyerHome";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SearchProduct from "@/components/buyer/searchProduct";
import ProductInfo from "@/components/buyer/productInfo";
import Orders from "@/components/admin/orders/orders";
import Users from "@/components/admin/users/users";
import Manage from "@/components/admin/manage/manage";

function App() {
  const { user } = useAuthContext();

  return (
    <Routes>

      <Route
        path="admin/dashboard"
        element={
          user && user.role === "ADMIN" ? (
            <AdminDashboard />
          ) : (
            <Navigate to={"/auth/admin/login"} />
          )
        }
      >
        <Route index element={<Manage />} />
        <Route path="orders" element={<Orders />} />
        <Route path="users" element={<Users />} />
      </Route>

      <Route
        path="buyer"
        element={
          user ? (
            user.role !== "USER" && <Navigate to={"/admin/dashboard"} />
          ) : (
            <Navigate to={"/auth/buyer/login"} />
          )
        }
      >
        <Route index element={<BuyerHome />} />
        <Route path="search" element={<SearchProduct />} />
        <Route path="product-info" element={<ProductInfo />} />
        <Route path="*" element={<Navigate to={"/auth/buyer/login"} />} />
      </Route>

      <Route
        path="auth/buyer/login"
        element={
          !user ? (
            <BuyerLogin />
          ) : user.role !== "USER" ? (
            <Navigate to={"/admin/dashboard"} />
          ) : (
            <Navigate to={"/buyer"} />
          )
        }
      />
      <Route
        path="auth/buyer/register"
        element={
          !user || user.role !== "USER" ? (
            <BuyerRegister />
          ) : (
            <Navigate to={"/buyer"} />
          )
        }
      />
      <Route
        path="auth/admin/login"
        element={
          user ? (
            user.role === "ADMIN" ? (
              <Navigate to={"/admin/dashboard"} />
            ) : (
              <Navigate to={"/buyer"} />
            )
          ) : (
            <AdminLogin />
          )
        }
      />
      <Route
        path="auth/admin/register"
        element={
          user && user.role === "ADMIN" ? (
            <Navigate to={"/admin/dashboard"} />
          ) : (
            <AdminRegister />
          )
        }
      />
      <Route
        path="*"
        element={
          !user ? (
            <Navigate to={"/auth/buyer/login"} />
          ) : (
            <Navigate to={"/buyer"} />
          )
        }
      />
    </Routes>
  );
}

export default App;
