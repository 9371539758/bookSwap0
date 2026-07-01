import { useNavigate } from "react-router-dom";
import "../styles/landing.scss";

/**
 * Landing Page Component
 */
const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__wrapper">
          {/* Left Info Section */}
          <div className="hero__left">
            <div className="hero__info">
              <p className="hero__year">EST 2026</p>
              <p className="hero__description">
                Unique Books<br />
                and philosophy shop
              </p>
              <p className="hero__mission">
                Our mission is<br />
                preserving long-term<br />
                handmade pottery<br />
                traditions
              </p>
              <svg className="hero__icon" viewBox="0 0 100 100" width="60" height="60">
                <path d="M20,50 Q50,20 80,50" stroke="currentColor" fill="none" strokeWidth="2"/>
              </svg>
            </div>
          </div>

          {/* Center Title Section */}
          <div className="hero__center">
            <h1 className="hero__title">
              THE FUSION<br />
              OF IMAGINATION
            </h1>
          </div>

          {/* Right Showcase Section */}
          <div className="hero__right">
            <div className="hero__showcase">
              <div className="showcase-item">
                <div className="showcase-box"></div>
              </div>
              <div className="showcase-item">
                <div className="showcase-box"></div>
              </div>
              <div className="showcase-item">
                <div className="showcase-box"></div>
              </div>
            </div>
            <p className="hero__shop-label">(shop all)</p>
          </div>
        </div>
      </section>

      {/* Brand Section */}
      <section className="brand-section">
        <div className="brand-section__container">
          <div className="brand-name">UCLAY ©</div>
          <div className="brand-arrow">→</div>
        </div>
      </section>

      {/* Main Image Area */}
      <section className="image-showcase">
        <div className="image-showcase__container">
          <div className="image-showcase__placeholder">
            <div className="image-showcase__content">
              <p className="image-showcase__text">Your Product Image Here</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features__container">
          <h2 className="features__title">Why Our Ceramics?</h2>
          <div className="features__grid">
            <div className="feature-card">
              <div className="feature-card__number">01</div>
              <h3 className="feature-card__title">Handcrafted</h3>
              <p className="feature-card__description">
                Each piece is carefully handmade by skilled artisans
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-card__number">02</div>
              <h3 className="feature-card__title">Unique Design</h3>
              <p className="feature-card__description">
                One of a kind pieces that tell their own story
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-card__number">03</div>
              <h3 className="feature-card__title">Premium Quality</h3>
              <p className="feature-card__description">
                Made with the finest materials and techniques
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-section__container">
          <h2 className="cta-section__title">Ready to Explore?</h2>
          <button 
            className="cta-section__btn"
            onClick={() => navigate("/register")}
          >
            Shop Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Landing;