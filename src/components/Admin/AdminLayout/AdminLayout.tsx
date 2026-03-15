import "./AdminLayout.css";
import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { LayoutDashboard, FileText, Settings, LogOut, Users, UserCircle, Menu, ImageIcon, BookOpen, Calendar } from "lucide-react";
import ConfirmDialog from "../../../shared/ConfirmDialog/ConfirmDialog";

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  function handleLogout() {
    logout();
    navigate("/admin");
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <span className="admin-sidebar__logo">A</span>
          <span className="admin-sidebar__title">AaraTech</span>
        </div>

        <nav className="admin-sidebar__nav">
          <NavLink to="/admin/dashboard" className="admin-sidebar__link">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/admin/content" className="admin-sidebar__link">
            <FileText size={20} />
            <span>Pages</span>
          </NavLink>
          <NavLink to="/admin/menu" className="admin-sidebar__link">
            <Menu size={20} />
            <span>Menu</span>
          </NavLink>
          <NavLink to="/admin/gallery" className="admin-sidebar__link">
            <ImageIcon size={20} />
            <span>Gallery</span>
          </NavLink>
          <NavLink to="/admin/blog" className="admin-sidebar__link">
            <BookOpen size={20} />
            <span>Blog</span>
          </NavLink>
          <NavLink to="/admin/events" className="admin-sidebar__link">
            <Calendar size={20} />
            <span>Events</span>
          </NavLink>
          <NavLink to="/admin/settings" className="admin-sidebar__link">
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>
          {admin?.role === "super_admin" && (
            <NavLink to="/admin/manage-admins" className="admin-sidebar__link">
              <Users size={20} />
              <span>Manage Admins</span>
            </NavLink>
          )}
          <NavLink to="/admin/profile" className="admin-sidebar__link">
            <UserCircle size={20} />
            <span>Profile</span>
          </NavLink>
        </nav>

        <button className="admin-sidebar__logout" onClick={() => setShowLogout(true)}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <h2 className="admin-topbar__title">Admin Panel</h2>
          <div className="admin-topbar__user">
            <span className="admin-topbar__name">{admin?.name ?? "Admin"}</span>
            <button className="admin-topbar__logout" onClick={() => setShowLogout(true)}>
              Logout
            </button>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>

      <ConfirmDialog
        open={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={handleLogout}
        title="Logout"
        confirmLabel="Yes, Logout"
        cancelLabel="Cancel"
        variant="danger"
      >
        Are you sure you want to logout? You will need to sign in again to
        access the admin dashboard.
      </ConfirmDialog>
    </div>
  );
}
