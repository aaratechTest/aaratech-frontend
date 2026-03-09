import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import WhatsAppWidget from "../components/WhatsAppWidget/WhatsAppWidget";

export default function PublicLayout() {
  return (
    <div className="public-layout">
      <Navbar />
      <Outlet />
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
