import "./ForgotPasswordPage.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BRAND } from "../../../constants/Assets";
import * as authService from "../../../services/authService";
import { Mail, MapPin, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function renderContent() {
    if (sent) {
      return (
        <div className="forgot-password__sent">
          <CheckCircle size={40} className="forgot-password__sent-icon" />
          <h2>Check Your Email</h2>
          <p>
            If an account exists with <strong>{email}</strong>, we've sent a
            password reset link.
          </p>
          <Link to="/admin" className="set-password__back-link">
            Back to Login
          </Link>
        </div>
      );
    }

    return (
      <>
        <div className="login-form__header">
          <h1 className="login-form__title">Forgot Password</h1>
          <p className="login-form__subtitle">
            Enter your email and we'll send you a reset link
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

          <button
            type="submit"
            className="login-form__submit"
            disabled={loading}
          >
            {loading ? <span className="login-form__spinner" /> : "Send Reset Link"}
          </button>

          <Link to="/admin" className="forgot-password__back">
            <ArrowLeft size={16} />
            Back to Login
          </Link>
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
