import "./ProfilePage.css";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import * as authService from "../../../services/authService";
import Alert from "../../../shared/Alert/Alert";
import { Eye, EyeOff, Lock, UserCircle, Mail, Shield } from "lucide-react";

export default function ProfilePage() {
  const { admin } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await authService.changePassword(currentPassword, newPassword);
      setSuccess("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to change password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="profile-page">
      <h1 className="profile-page__title">Profile</h1>

      {/* Profile Info Card */}
      <div className="profile-page__card">
        <div className="profile-page__avatar">
          <UserCircle size={64} />
        </div>
        <div className="profile-page__info">
          <h2 className="profile-page__name">{admin?.name}</h2>
          <div className="profile-page__detail">
            <Mail size={16} />
            <span>{admin?.email}</span>
          </div>
          <div className="profile-page__detail">
            <Shield size={16} />
            <span className="profile-page__role-badge">
              {admin?.role === "super_admin" ? "Super Admin" : "Admin"}
            </span>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="profile-page__section">
        <h2 className="profile-page__section-title">Change Password</h2>

        {error && <Alert variant="error">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <form className="profile-page__form" onSubmit={handleChangePassword}>
          <div className="profile-page__form-field">
            <label htmlFor="currentPassword">Current Password</label>
            <div className="profile-page__input-wrap">
              <Lock size={18} className="profile-page__input-icon" />
              <input
                id="currentPassword"
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="profile-page__eye-btn"
                onClick={() => setShowCurrent(!showCurrent)}
              >
                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="profile-page__form-field">
            <label htmlFor="newPassword">New Password</label>
            <div className="profile-page__input-wrap">
              <Lock size={18} className="profile-page__input-icon" />
              <input
                id="newPassword"
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="profile-page__eye-btn"
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="profile-page__form-field">
            <label htmlFor="confirmNewPassword">Confirm New Password</label>
            <div className="profile-page__input-wrap">
              <Lock size={18} className="profile-page__input-icon" />
              <input
                id="confirmNewPassword"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="profile-page__eye-btn"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="profile-page__submit"
            disabled={loading}
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
