import "./NotFound.css";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiArrowLeft, FiMail } from "react-icons/fi";
import SEO from "../../components/SEO/SEO";

function NotFoundPage() {
  const location = useLocation();

  return (
    <div className="notfound-scope">
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist or has been moved."
        noindex
      />
      {/* HERO */}
      <section className="notfound-hero">
        <div className="notfound-hero-overlay" />

        <div className="notfound-content">
          {/* Animated 404 */}
          <div className="notfound-code">
            <span className="digit">4</span>
            <span className="digit zero">0</span>
            <span className="digit">4</span>
          </div>

          <h1>Page Not Found</h1>
          <p className="notfound-desc">
            The page <span className="notfound-path">{location.pathname}</span> doesn't
            exist or has been moved. Let's get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="notfound-actions">
            <Link to="/" className="notfound-btn primary">
              <FiHome size={18} />
              Back to Home
            </Link>
            <button
              className="notfound-btn secondary"
              onClick={() => window.history.back()}
            >
              <FiArrowLeft size={18} />
              Go Back
            </button>
            <Link to="/contact" className="notfound-btn outline">
              <FiMail size={18} />
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="notfound-links-section">
        <div className="notfound-links-container">
          <h2>
            Explore <span>Our Pages</span>
          </h2>
          <div className="notfound-links-grid">
            <Link to="/services" className="quick-link-card">
              <div className="ql-icon">S</div>
              <div>
                <h3>Services</h3>
                <p>Explore our IT services and solutions</p>
              </div>
            </Link>
            <Link to="/industries" className="quick-link-card">
              <div className="ql-icon">I</div>
              <div>
                <h3>Industries</h3>
                <p>Industries we serve across the globe</p>
              </div>
            </Link>
            <Link to="/about" className="quick-link-card">
              <div className="ql-icon">A</div>
              <div>
                <h3>About Us</h3>
                <p>Learn about our mission and team</p>
              </div>
            </Link>
            <Link to="/contact" className="quick-link-card">
              <div className="ql-icon">C</div>
              <div>
                <h3>Contact</h3>
                <p>Get in touch with our team</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NotFoundPage;
