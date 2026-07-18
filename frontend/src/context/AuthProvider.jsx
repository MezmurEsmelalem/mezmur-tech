import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import api from "../api/axios";


export function AuthProvider({ children }) {


    const token = localStorage.getItem("token");

    const [loading, setLoading] = useState(!!token);
    const [user, setUser] = useState(null);

useEffect(() => {
  if (!token) return;

  const checkUser = async () => {
    try {
      const response = await api.get("/api/user");
      setUser(response.data);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  checkUser();
}, [token]);


    const login = (userData) => {
        setUser(userData);
    };


    const logout = async () => {

    try {

        await api.post("/api/logout");

    } catch {

        console.log("Logout error");

    } finally {

        localStorage.removeItem("token");
        setUser(null);

    }

  };


    return (

        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}