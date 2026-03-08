import type { JSX } from "react";
import NotFoundPage from "../pages/NotFound/NotFound";
import HomePage from "../pages/HomePage/HomePage";
import AboutPage from "../pages/AboutPage/AboutPage";
import ServicesPage from "../pages/ServicesPage/ServicesPage";
import IndustriesPage from "../pages/IndustriesPage/IndustriesPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import LendingSolutions from "../pages/LendingSolutions/LendingSolutions";
import LeasingPage from "../pages/Leasing/LeasingPage";
import SdbManagement from "../pages/SdbManagement/SdbManagement";
import MobileWalletPage from "../pages/MobileWallet/MobileWalletPage";
import AssemblerCoboltPage from "../pages/AssemblerCobolt/AssemblerCoboltPage";
import BlogListPage from "../pages/BlogPage/BlogListPage";
import BlogDetailPage from "../pages/BlogPage/BlogDetailPage";

export interface AppRoute {
  path: string;
  element: JSX.Element;
}

export const routes: AppRoute[] = [
  { path: "/", element: <HomePage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/services", element: <ServicesPage /> },
  { path: "/industries", element: <IndustriesPage /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "/lending-solutions", element: <LendingSolutions /> },
  { path: "/leasing", element: <LeasingPage /> },
  { path: "/sdb-management", element: <SdbManagement /> },
  { path: "/mobile-wallet", element: <MobileWalletPage /> },
  { path: "/assembler-cobol", element: <AssemblerCoboltPage /> },
  { path: "/blog", element: <BlogListPage /> },
  { path: "/blog/:slug", element: <BlogDetailPage /> },
  { path: "*", element: <NotFoundPage /> },
];
