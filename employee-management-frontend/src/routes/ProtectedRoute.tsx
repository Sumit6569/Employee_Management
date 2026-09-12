import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

function ProtectedRoute({
  allowedRoles,
}: ProtectedRouteProps) {
  const { auth } = useAuth();

  // 401 - User is not authenticated
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 403 - User is authenticated but doesn't have permission
  if (
    allowedRoles &&
    !allowedRoles.some((role) => auth.roles.includes(role))
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;