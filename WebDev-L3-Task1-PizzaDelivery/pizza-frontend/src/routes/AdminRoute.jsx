import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold text-gray-600">
          Loading...
        </div>
      </div>
    );
  }

  // User not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User is not an admin
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Render nested admin routes
  return <Outlet />;
}

export default AdminRoute;