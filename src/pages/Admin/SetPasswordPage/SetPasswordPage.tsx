import "./SetPasswordPage.css";
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { BRAND } from "../../../constants/Assets";
import * as authService from "../../../services/authService";
import { Eye, EyeOff, Lock, MapPin, AlertCircle, CheckCircle, Loader } from "lucide-react";

type PageState = "loading" | "form" | "success" | "error";

export default function SetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [pageState, setPageState] = useState<PageState>("loading");
  const [tokenError, setTokenError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setTokenError("No token provided");
      setPageState("error");
      return;
    }

    authService
      .verifyToken(token)
      .then(() => setPageState("form"))
      .catch((err) => {
        setTokenError(err.message);
        setPageState("error");
      });
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await authService.setPassword(token, password);
      setPageState("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to set password");
    } finally {
      setLoading(false);
    }
  }

  function renderContent() {
    if (pageState === "loading") {
      return (
        <div className="set-password__status">
          <Loader size={40} className="set-password__spinner-icon" />
          <h2>Verifying your link...</h2>
          <p>Please wait while we validate your setup link.</p>
        </div>
      );
    }

    if (pageState === "error") {
      return (
        <div className="set-password__status">
          <AlertCircle size={40} className="set-password__error-icon" />
          <h2>Invalid Link</h2>
          <p>{tokenError}</p>
          <Link to="/admin" className="set-password__back-link">
            Back to Login
          </Link>
        </div>
      );
    }

    if (pageState === "success") {
      return (
        <div className="set-password__status">
          <CheckCircle size={40} className="set-password__success-icon" />
          <h2>Password Set!</h2>
          <p>Your account is now active. You can log in.</p>
          <Link to="/admin" className="set-password__back-link">
            Go to Login
          </Link>
        </div>
      );
    }

    return (
      <>
        <div className="login-form__header">
          <h1 className="login-form__title">Set Your Password</h1>
          <p className="login-form__subtitle">
            Create a password to activate your admin account
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
            <label htmlFor="password">New Password</label>
            <div className="login-form__input-wrap">
              <Lock size={18} className="login-form__input-icon" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="login-form__eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="login-form__field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="login-form__input-wrap">
              <Lock size={18} className="login-form__input-icon" />
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="login-form__eye-btn"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="login-form__submit"
            disabled={loading}
          >
            {loading ? <span className="login-form__spinner" /> : "Set Password"}
          </button>
        </form>
      </>
    );
  }

  return (
    <div className="login-page">
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
            <div className="login-page__location"><MapPin size={14} /><span>India</span></div>
            <div className="login-page__location"><MapPin size={14} /><span>Singapore</span></div>
            <div className="login-page__location"><MapPin size={14} /><span>USA</span></div>
            <div className="login-page__location"><MapPin size={14} /><span>Malaysia</span></div>
          </div>
        </div>
        <p className="login-page__copyright">&copy; {new Date().getFullYear()} Aara Tech Pvt Ltd</p>
      </div>

      <div className="login-page__form-side">
        <div className="login-form-wrapper">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
