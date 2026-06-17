import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { useState, useEffect } from "react";
import "../styles/navbar.scss";

/**
 * Navbar Component
 * Provides navigation and authentication status display
 * Features: Logo, nav links, and auth buttons
 * Scroll behavior: Hides when scrolling down, shows when scrolling up
 */
const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar if at top
      if (currentScrollY < 50) {
        setIsVisible(true);
      }
      // Hide navbar when scrolling down
      else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      }
      // Show navbar when scrolling up
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className={`navbar ${!isVisible ? "navbar--hidden" : ""}`}>
      <div className="navbar__container">
        {/* Logo Section */}
        <div className="navbar__logo" onClick={() => navigate("/home")}>
          <span className="navbar__logo-icon">📚</span>
          <span className="navbar__logo-text">BookSwap</span>
        </div>

        {/* Navigation Links */}
        <ul className="navbar__menu">
          <li className="navbar__item">
            <a href="#features" className="navbar__link">
              Features
            </a>
          </li>
          <li className="navbar__item">
            <a href="#how-it-works" className="navbar__link">
              How It Works
            </a>
          </li>
          <li className="navbar__item">
            <a href="#about" className="navbar__link">
              About
            </a>
          </li>
        </ul>

        {/* Auth Section */}
        <div className="navbar__auth">
          {user ? (
            <>
              <span className="navbar__user-greeting">
                Welcome, {user.name || user.email}
              </span>
              <button
                className="navbar__btn navbar__btn--logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="navbar__btn navbar__btn--login"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="navbar__btn navbar__btn--signup"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
