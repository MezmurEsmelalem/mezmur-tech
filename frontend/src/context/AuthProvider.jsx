import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import api from "../api/axios";


export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const checkUser = async () => {

            try {

                const response = await api.get("/api/user");

                setUser(response.data);

            } catch {

                setUser(null);

            } finally {

                setLoading(false);

            }

        };


        checkUser();

    }, []);



    const login = (userData) => {
        setUser(userData);
    };


    const logout = async () => {

        try {

            await api.post("/api/logout");

            setUser(null);

        } catch {

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