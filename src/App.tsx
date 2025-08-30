import "./App.css";
import BuyerRegister from "./pages/buyer/BuyerRegister";
import BuyerLogin from "./pages/buyer/BuyerLogin";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";
import { Routes, Route, Navigate } from "react-router";
import { useAuthContext } from "./context/AuthContext";
import BuyerHome from "./pages/buyer/BuyerHome";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  const { user } = useAuthContext();

  return (
    <Routes>
      <Route
        path="admin/dashboard"
        element={
          user ? <AdminDashboard /> : <Navigate to={"/auth/admin/login"} />
        }
      />
      <Route
        path="buyer"
        element={user ? <BuyerHome /> : <Navigate to={"/auth/buyer/login"} />}
      />
      <Route
        path="auth/buyer/login"
        element={!user ? <BuyerLogin /> : <Navigate to={"/buyer"} />}
      />
      <Route
        path="auth/buyer/register"
        element={!user ? <BuyerRegister /> : <Navigate to={"/buyer"} />}
      />
      <Route
        path="auth/admin/login"
        element={!user ? <AdminLogin /> : <Navigate to={"/admin/dashboard"} />}
      />
      <Route
        path="auth/admin/register"
        element={
          !user ? <AdminRegister /> : <Navigate to={"/admin/dashboard"} />
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
