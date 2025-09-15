import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserByEmail } from "../../backend/methods/GetUser";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem("email"); // store email instead of uid
    if (!email) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await getUserByEmail(email);
        if (res.success) {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        } else {
          setUser(null);
          localStorage.removeItem("email");
          localStorage.removeItem("user");
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = (email, basicData = {}) => {
    localStorage.setItem("email", email);
    localStorage.setItem("user", JSON.stringify(basicData));
    setUser(basicData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("email");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
