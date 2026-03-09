import type { ReactNode } from "react";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import ManageAdminsPage from "../pages/Admin/ManageAdminsPage/ManageAdminsPage";
import ProfilePage from "../pages/Admin/ProfilePage/ProfilePage";
import ContentPagesPage from "../pages/Admin/ContentPagesPage/ContentPagesPage";
import ContentEditorPage from "../pages/Admin/ContentEditorPage/ContentEditorPage";
import MenuBuilderPage from "../pages/Admin/MenuBuilderPage/MenuBuilderPage";
import GalleryPage from "../pages/Admin/GalleryPage/GalleryPage";
import AdminBlogPage from "../pages/Admin/BlogPage/AdminBlogPage";
import SettingsPage from "../pages/Admin/SettingsPage/SettingsPage";

export interface AdminRoute {
  path: string;
  element: ReactNode;
}

export const adminRoutes: AdminRoute[] = [
  { path: "dashboard", element: <Dashboard /> },
  { path: "content", element: <ContentPagesPage /> },
  { path: "content/:slug", element: <ContentEditorPage /> },
  { path: "menu", element: <MenuBuilderPage /> },
  { path: "gallery", element: <GalleryPage /> },
  { path: "blog", element: <AdminBlogPage /> },
  { path: "manage-admins", element: <ManageAdminsPage /> },
  { path: "profile", element: <ProfilePage /> },
  { path: "settings", element: <SettingsPage /> },
];
