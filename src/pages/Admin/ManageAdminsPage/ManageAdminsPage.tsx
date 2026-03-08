import "./ManageAdminsPage.css";
import { useState, useEffect } from "react";
import * as adminService from "../../../services/adminService";
import Modal from "../../../shared/Modal/Modal";
import ConfirmDialog from "../../../shared/ConfirmDialog/ConfirmDialog";
import Alert from "../../../shared/Alert/Alert";
import { UserPlus, Trash2, RotateCw, Shield, User } from "lucide-react";

interface Admin {
  id: string;
  email: string;
  name: string;
  role: "super_admin" | "admin";
  status: "pending" | "active";
  createdAt: number;
  createdBy: string;
}

export default function ManageAdminsPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Invite modal
  const [showInvite, setShowInvite] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("admin");
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteError, setInviteError] = useState("");

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState<Admin | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Resend loading
  const [resendingId, setResendingId] = useState<string | null>(null);

  useEffect(() => {
    loadAdmins();
  }, []);

  async function loadAdmins() {
    try {
      setLoading(true);
      const data = await adminService.getAdmins();
      setAdmins(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load admins");
    } finally {
      setLoading(false);
    }
  }

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    setInviteError("");

    if (!inviteName || !inviteEmail) {
      setInviteError("Name and email are required");
      return;
    }

    setInviteLoading(true);
    try {
      await adminService.inviteAdmin({
        name: inviteName,
        email: inviteEmail,
        role: inviteRole,
      });
      setShowInvite(false);
      setInviteName("");
      setInviteEmail("");
      setInviteRole("admin");
      setSuccess("Admin invited successfully! They will receive an email.");
      loadAdmins();
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setInviteError(err instanceof Error ? err.message : "Failed to invite admin");
    } finally {
      setInviteLoading(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await adminService.deleteAdmin(deleteTarget.id);
      setDeleteTarget(null);
      setSuccess("Admin deleted successfully");
      loadAdmins();
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete admin");
      setDeleteTarget(null);
    } finally {
      setDeleteLoading(false);
    }
  }

  async function handleResend(admin: Admin) {
    setResendingId(admin.id);
    try {
      await adminService.resendInvite(admin.id);
      setSuccess(`Invite resent to ${admin.email}`);
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend invite");
    } finally {
      setResendingId(null);
    }
  }

  return (
    <div className="manage-admins">
      <div className="manage-admins__header">
        <div>
          <h1 className="manage-admins__title">Manage Admins</h1>
          <p className="manage-admins__subtitle">Invite and manage admin accounts</p>
        </div>
        <button className="manage-admins__invite-btn" onClick={() => setShowInvite(true)}>
          <UserPlus size={18} />
          Invite Admin
        </button>
      </div>

      {error && <Alert variant="error">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {loading ? (
        <div className="manage-admins__loading">Loading admins...</div>
      ) : (
        <div className="manage-admins__table-wrap">
          <table className="manage-admins__table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td>
                    <div className="manage-admins__name-cell">
                      {admin.role === "super_admin" ? (
                        <Shield size={16} className="manage-admins__role-icon manage-admins__role-icon--super" />
                      ) : (
                        <User size={16} className="manage-admins__role-icon" />
                      )}
                      {admin.name}
                    </div>
                  </td>
                  <td>{admin.email}</td>
                  <td>
                    <span className={`manage-admins__badge manage-admins__badge--${admin.role}`}>
                      {admin.role === "super_admin" ? "Super Admin" : "Admin"}
                    </span>
                  </td>
                  <td>
                    <span className={`manage-admins__badge manage-admins__badge--${admin.status}`}>
                      {admin.status}
                    </span>
                  </td>
                  <td>
                    <div className="manage-admins__actions">
                      {admin.status === "pending" && (
                        <button
                          className="manage-admins__action-btn manage-admins__action-btn--resend"
                          onClick={() => handleResend(admin)}
                          disabled={resendingId === admin.id}
                          title="Resend invite"
                        >
                          <RotateCw size={15} className={resendingId === admin.id ? "manage-admins__spin" : ""} />
                        </button>
                      )}
                      <button
                        className="manage-admins__action-btn manage-admins__action-btn--delete"
                        onClick={() => setDeleteTarget(admin)}
                        title="Delete admin"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {admins.length === 0 && (
                <tr>
                  <td colSpan={5} className="manage-admins__empty">
                    No admins found. Invite one to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Invite Modal */}
      <Modal open={showInvite} onClose={() => setShowInvite(false)} title="Invite Admin" size="sm">
        <form className="manage-admins__invite-form" onSubmit={handleInvite}>
          {inviteError && (
            <Alert variant="error">{inviteError}</Alert>
          )}

          <div className="manage-admins__form-field">
            <label htmlFor="invite-name">Name</label>
            <input
              id="invite-name"
              type="text"
              value={inviteName}
              onChange={(e) => setInviteName(e.target.value)}
              placeholder="Full name"
            />
          </div>

          <div className="manage-admins__form-field">
            <label htmlFor="invite-email">Email</label>
            <input
              id="invite-email"
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="email@example.com"
            />
          </div>

          <div className="manage-admins__form-field">
            <label htmlFor="invite-role">Role</label>
            <select
              id="invite-role"
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>

          <div className="manage-admins__form-actions">
            <button
              type="button"
              className="confirm-dialog__btn confirm-dialog__btn--cancel"
              onClick={() => setShowInvite(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="confirm-dialog__btn confirm-dialog__btn--primary"
              disabled={inviteLoading}
            >
              {inviteLoading ? "Sending..." : "Send Invite"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Admin"
        confirmLabel="Yes, Delete"
        variant="danger"
        loading={deleteLoading}
      >
        Are you sure you want to delete <strong>{deleteTarget?.name}</strong> ({deleteTarget?.email})?
        This action cannot be undone.
      </ConfirmDialog>
    </div>
  );
}
