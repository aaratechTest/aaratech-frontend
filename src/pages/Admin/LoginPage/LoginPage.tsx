import "./LoginPage.css";
import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { BRAND } from "../../../constants/Assets";
import { Eye, EyeOff, Mail, Lock, MapPin, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      {/* Left — Brand Panel */}
      <div className="login-page__brand">
        <div className="login-page__brand-bg" />
        <div className="login-page__brand-content">
          <div className="login-page__logo-wrap">
            <img src={BRAND.logo} alt="Aara Tech" className="login-page__logo" />
          </div>

          <p className="login-page__tagline">
            We build modern software &amp; AI solutions that help businesses
            grow faster, work smarter, and deliver better digital experiences.
          </p>

          <div className="login-page__locations">
            <div className="login-page__location">
              <MapPin size={14} />
              <span>India</span>
            </div>
            <div className="login-page__location">
              <MapPin size={14} />
              <span>Singapore</span>
            </div>
            <div className="login-page__location">
              <MapPin size={14} />
              <span>USA</span>
            </div>
            <div className="login-page__location">
              <MapPin size={14} />
              <span>Malaysia</span>
            </div>
          </div>
        </div>

        <p className="login-page__copyright">
          &copy; {new Date().getFullYear()} Aara Tech Pvt Ltd
        </p>
      </div>

      {/* Right — Login Form */}
      <div className="login-page__form-side">
        <div className="login-form-wrapper">
          <div className="login-form__header">
            <h1 className="login-form__title">Welcome Back</h1>
            <p className="login-form__subtitle">
              Sign in to the admin dashboard
            </p>
          </div>

          {error && (
            <div className="login-form__error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form__field">
              <label htmlFor="email">Email Address</label>
              <div className="login-form__input-wrap">
                <Mail size={18} className="login-form__input-icon" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@aaratech.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="login-form__field">
              <label htmlFor="password">Password</label>
              <div className="login-form__input-wrap">
                <Lock size={18} className="login-form__input-icon" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="login-form__eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="login-form__submit"
              disabled={loading}
            >
              {loading ? (
                <span className="login-form__spinner" />
              ) : (
                "Sign In"
              )}
            </button>

            <Link to="/admin/forgot-password" className="login-form__forgot">
              Forgot Password?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
