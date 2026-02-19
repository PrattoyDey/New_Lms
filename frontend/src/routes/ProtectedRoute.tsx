import { Navigate } from "react-router-dom";
import authorization from "@/core/Authorization";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
}

function ProtectedRoute({
  children,
  requiredPermission,
}: ProtectedRouteProps) {
  const isLoggedIn = !!localStorage.getItem("access");

  // Not logged in → go to landing
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // If permission required and user doesn't have it
  if (
    requiredPermission &&
    !authorization.isAuthorized(requiredPermission)
  ) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
