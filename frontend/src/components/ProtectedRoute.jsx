import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await api.get("/user");

        console.log("USER:", response.data);

        setAuthenticated(true);
      } catch (error) {
        console.log("AUTH ERROR:", error);

        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (loading) {
     return (
    <div className="flex justify-center items-center py-20">
      <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  }

  return authenticated
    ? children
    : <Navigate to="/admin/login" replace />;
}

export default ProtectedRoute;