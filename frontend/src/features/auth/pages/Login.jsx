import React, { useState } from "react";
import { useNavigate } from "react-router";
import "../styles/login.scss";
import bgImage from "../assets/home.jpg";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { loading, handleLogin } = useAuth();
  // const [email, setEmail] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!identifier || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await handleLogin({ identifier, password });
      navigate("/");
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Login failed";
      setError(errorMessage);
      console.error("Login error:", err);
    }
  };

  return (
    <div className="auth-page" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="auth-image-panel" />

      <div className="auth-panel">
        <div className="auth-form-inner">
          <h1 className="auth-heading">Welcome back</h1>
          <p className="auth-subtext">Please enter your details.</p>

          {error && <div style={{color: "red", marginBottom: "15px", padding: "10px", backgroundColor: "#ffe6e6", borderRadius: "4px"}}>{error}</div>}

          <form onSubmit={submitHandler}>
            <div className="field">
              <label>Username or Email</label>
              <input
                type="text"
                placeholder="Username or Email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="auth-row">
              <label className="remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember me
              </label>
              <span className="forgot">Forgot your password?</span>
            </div>

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")}>Register here</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
