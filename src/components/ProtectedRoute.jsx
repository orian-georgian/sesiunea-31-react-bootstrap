import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { pathname } = useLocation();
  const token = localStorage.getItem("token");

  if (!token && pathname !== "/login") {
    return <Navigate to="/login" />;
  }

  if (token && pathname === "/login") {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
