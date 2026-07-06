import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Link } from "react-router-dom";

function AdminDashboard() {
  console.log("AdminDashboard Loaded");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/user");
        setUser(response.data);
      } catch (error) {
  console.log("Dashboard Error:", error);
  console.log("Status:", error?.response?.status);
  console.log("Data:", error?.response?.data);

  navigate("/admin/login");
} finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await api.post("/logout");

      navigate("/admin/login");
    } catch (error) {
      console.error(error);
      alert("Logout failed");
    }
  };

  if (loading) {
    return (
    <div className="flex justify-center items-center py-20">
      <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  }

  return (
    <div className="max-w-6xl min-w-full overflow-hidden mx-auto p-2 bg-gray-200">
    <h1 className="text-3xl font-bold bg-blue-200 p-4 shadow-lg">  
      Admin Dashboard  
      </h1>
<div className="bg-blue-200 shadow-lg p-4 mb-20 flex items-center gap-4">
  <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
    {user?.name?.charAt(0).toUpperCase()}
  </div>

  <div>
    <h2 className="text-2xl font-semibold">
      Welcome Back!
    </h2>

    <p className="text-gray-600">
      {user?.name}
    </p>

    <p className="text-gray-500 text-sm">
      {user?.email}
    </p>
  </div>
</div>

    <div className="items-center justify-center grid grid-cols-1 md:grid-cols-3 w-auto gap-4 text-white">

      <Link to="/admin/projects"
        className="block bg-blue-500 p-4 rounded-lg shadow-md hover:scale-105 transition-all duration-200">    
        Manage Projects
      </Link>

      <Link to="/admin/skills"
        className="block bg-emerald-500 p-4 rounded-lg shadow-md hover:scale-105 transition-all duration-200">
        Manage Skills
      </Link>

      <Link to="/admin/blogs"
        className="block bg-orange-500 p-4 rounded-lg shadow-md hover:scale-105 transition-all duration-200">    
        Manage Blogs
      </Link>

      <Link to="/admin/messages"
        className="block bg-red-500 p-4 rounded-lg shadow-md hover:scale-105 transition-all duration-200">    
        Manage Messages
      </Link>

      <Link to="/admin/abouts"
        className="block bg-purple-500 p-4 rounded-lg shadow-md hover:scale-105 transition-all duration-200">    
        Manage About Me
      </Link>

      <Link to="/admin/services"
        className="block bg-cyan-500 p-4 rounded-lg shadow-md hover:scale-105 transition-all duration-200">    
        Manage Services
      </Link>

      </div>

      <button
        onClick={handleLogout}
        className="mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
      >
        Logout
      </button>

    </div>
  );
}

export default AdminDashboard;