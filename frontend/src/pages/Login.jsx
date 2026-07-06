import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await api.get("/sanctum/csrf-cookie");
      console.log("CSRF cookie requested");

      const response = await api.post("/login", {
        email,
        password,
      });

      console.log(response.data);
      navigate("/admin/dashboard");
    } catch (error) {
  console.error("Full error:", error);

  if (error.response) {
    console.log("Status:", error.response.status);
    console.log("Data:", error.response.data);

    alert(`Error ${error.response.status}`);
  } else {
    alert("Network Error");
  }
}
  };

return (
  <div className="flex pb-4 pt-4 justify-center bg-gray-100 dark:bg-gray-900">

    <div className="bg-gray-300 dark:bg-gray-800 rounded p-8 w-full max-w-sm">

      <h1 className="text-2xl font-bold mb-6 text-center dark:text-white">
        Login
      </h1>

      <form className="space-y-4" onSubmit={handleLogin}>

        <div>
          <label className="block mb-1 font-medium dark:text-white">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <label className="block mb-1 font-medium dark:text-white">
            Password
          </label>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500 hover:scale-110 transition-transform duration-100 hover:text-black"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

      </form>

    </div>

  </div>
);
}

export default Login;