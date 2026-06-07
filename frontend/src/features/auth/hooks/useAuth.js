import { login, register, logout, getme } from "../services/auth.api";
import { useContext } from "react";
import { AuthContext } from "../auth.context";
export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;
  async function handleRegister({username, email, password}) {
    try {
      setLoading(true);
      const data = await register({ username, email, password });
      console.log("registered user successfully:",data);
      setUser(data.user);
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
    setLoading(false);
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
