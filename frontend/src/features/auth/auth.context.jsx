import { createContext, useEffect, useState } from "react";
import { getme } from "./services/auth.api";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("bookswap_user")) || null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getme();
        setUser(data.user);
        localStorage.setItem("bookswap_user", JSON.stringify(data.user));
      } catch (error) {
        setUser(null);
        localStorage.removeItem("bookswap_user");
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("bookswap_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("bookswap_user");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};