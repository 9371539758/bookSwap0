import { login, register, logout, getme } from "../services/auth.api";
import { useContext } from "react";
import { AuthContext } from "../auth.context";
export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;
  async function handleRegister({
    username,
    fullName,
    email,
    password,
    phone,
    location,
  }) {
    try {
      setLoading(true);
      const data = await register({
        username,
        fullName,
        email,
        password,
        phone,
        location,
      });
      console.log("registered user successfully:", data);
      setUser(data.user);
      localStorage.setItem("bookswap_user", JSON.stringify(data.user));
      setLoading(false);
    } catch (error) {
      console.error("Register error:", error.response?.data || error.message);
      setLoading(false);
      throw error;
    }
  }
  async function handleLogin({ identifier, password }) {
    try {
      setLoading(true);
      console.log("Attempting login with identifier:", identifier);
      const data = await login({ identifier, password });
      console.log("Login successful:", data);
      setUser(data.user);
      localStorage.setItem("bookswap_user", JSON.stringify(data.user));
      setLoading(false);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setLoading(false);
      throw error;
    }
  }
  async function handleGetMe() {
    setLoading(true);
    const data = await getme();
    setUser(data.user);
    setLoading(false);
  }
  async function handleLogout() {
    setLoading(true);
    const data = await logout();
    setUser(null);
    localStorage.removeItem("bookswap_user");
    setLoading(false);
    return data;
  }
  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleGetMe,
    handleLogout,
  };
};
