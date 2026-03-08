import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./components/Admin/AdminLayout/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import { routes } from "./routes";
import { adminRoutes } from "./routes/adminRoutes";
import LoginPage from "./pages/Admin/LoginPage/LoginPage";
import SetPasswordPage from "./pages/Admin/SetPasswordPage/SetPasswordPage";
import ForgotPasswordPage from "./pages/Admin/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./pages/Admin/ResetPasswordPage/ResetPasswordPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes with Navbar + Footer */}
        <Route element={<PublicLayout />}>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        {/* Admin auth pages — no layout */}
        <Route path="/admin" element={<LoginPage />} />
        <Route path="/admin/set-password" element={<SetPasswordPage />} />
        <Route path="/admin/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/admin/reset-password" element={<ResetPasswordPage />} />

        {/* Protected admin routes with AdminLayout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            {adminRoutes.map((route) => (
              <Route
                key={route.path}
                path={`/admin/${route.path}`}
                element={route.element}
              />
            ))}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
