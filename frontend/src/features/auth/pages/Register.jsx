import React, { useState } from "react";
import { useNavigate } from "react-router";
import "../styles/register.scss";
import bgImage from "../assets/home.jpg";
import { useAuth } from "../hooks/useAuth";

const Register = () => { 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const{loading,handleRegister} = useAuth();
   const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    
   await handleRegister({
    username: name,
    email,
    password
});
    navigate("/");
  };

  return (
    <div className="auth-page" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="auth-image-panel" />

      <div className="auth-panel">
        <div className="auth-form-inner">
          <h1 className="auth-heading">Create account</h1>
          <p className="auth-subtext">Start your journey today.</p>

          <form onSubmit={submitHandler}>
            <div className="field">
              <label>Full name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="field">
              <label>E-mail</label>
              <input
                type="email"
                placeholder="Enter your e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            <div className="field">
              <label>Confirm password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>

            <button className="auth-btn" type="submit">
              Create account
            </button>
          </form>

          <p className="auth-footer">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Sign in here</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;