import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/admin/login" replace />;
}

export default ProtectedRoute;