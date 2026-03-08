import "./Navbar.css";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BRAND  } from "../../constants/Assets";
import { Menu, X } from "lucide-react";

/* ================= ROUTE MAP FOR DROPDOWN ITEMS ================= */
const subRoutes: Record<string, string> = {
  "Assembler to COBOL Conversion Tool":"/assembler-cobol",
  "Lending Solutions": "/lending-solutions",
  "Leasing System": "/leasing",
  "Safe Deposit Box management": "/sdb-management",
  "Mobile Wallet": "/mobile-wallet",
  "Blog": "/blog",
};

const menuItems = [
  {
    name: "PRODUCTS",
    subs: [
      "Assembler to COBOL Conversion Tool",
      "Lending Solutions",
      "Leasing System",
      "Safe Deposit Box management",
      "Mobile Wallet",
    ],
  },
  {
    name: "SERVICES",
    subs: [],
  },
  {
    name: "INDUSTRIES",
    subs: [],
  },
  { name: "CAREERS", subs: ["Culture", "Openings"] },
  { name: "ABOUT", subs: [] },
  { name: "INSIGHTS", subs: ["Blog", "Events", "Privacy Policy"] },
  { name: "CONTACT", subs: [] },
];

/* ================= ROUTE MAP FOR TOP-LEVEL ITEMS ================= */
const topRoutes: Record<string, string> = {
  SERVICES: "/services",
  INDUSTRIES: "/industries",
  ABOUT: "/about",
  CONTACT: "/contact",
};

function Navbar() {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isMenuActive = (item: (typeof menuItems)[0]) => {
    // Check top-level route match
    if (topRoutes[item.name] && location.pathname === topRoutes[item.name]) {
      return true;
    }
    // Check if current path matches any sub-route (e.g. PRODUCTS children)
    if (item.subs.length > 0) {
      return item.subs.some(
        (sub) => subRoutes[sub] && location.pathname === subRoutes[sub]
      );
    }
    return false;
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">
          <img src={BRAND.logo} alt="Logo" />
        </Link>
      </div>

      <div className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X size={26} /> : <Menu size={26} />}
      </div>

      <ul className={`nav-menu ${mobileOpen ? "active" : ""}`}>
        {menuItems.map((item, index) => (
          <li
            key={item.name}
            className={isMenuActive(item) ? "nav-active" : ""}
            onMouseEnter={() => setActiveMenu(index)}
            onMouseLeave={() => setActiveMenu(null)}>
            {/* TOP-LEVEL LINK */}
            {topRoutes[item.name] ? (
              <Link to={topRoutes[item.name]}>{item.name}</Link>
            ) : (
              <a href="#">
                {item.name}
                {item.subs.length > 0 && <span className="arrow">▼</span>}
              </a>
            )}

            {/* DROPDOWN */}
            {item.subs.length > 0 && activeMenu === index && (
              <ul className="dropdown">
                {item.subs.map((sub) => (
                  <li key={sub}>
                    {subRoutes[sub] ? (
                      <Link to={subRoutes[sub]}>{sub}</Link>
                    ) : (
                      <a href="#">{sub}</a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <div className="nav-search">
        <img src={BRAND.searchIcon} alt="Search" />
      </div>
    </nav>
  );
}

export default Navbar;