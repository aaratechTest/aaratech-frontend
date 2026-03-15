import "./Navbar.css";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BRAND } from "../../constants/Assets";
import { Menu, X } from "lucide-react";
import { getSettings } from "../../services/settingsService";
import { useMenu } from "../../contexts/MenuContext";
import type { MenuGroup } from "../../types/page";

function Navbar() {
  const { groups } = useMenu();
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [privacyPolicyUrl, setPrivacyPolicyUrl] = useState("");
  const [openingsUrl, setOpeningsUrl] = useState("");
  const location = useLocation();

  useEffect(() => {
    getSettings()
      .then((s) => {
        setPrivacyPolicyUrl(s.privacyPolicyUrl || "");
        setOpeningsUrl(s.openingsUrl || "");
      })
      .catch(() => {});
  }, []);

  const visibleGroups = groups
    .filter((g) => g.visible)
    .sort((a, b) => a.order - b.order);

  const isGroupActive = (group: MenuGroup) => {
    if (group.url && location.pathname === group.url) return true;
    if (group.children.length > 0) {
      return group.children.some(
        (child) => child.url && location.pathname === child.url
      );
    }
    return false;
  };

  const hasDropdown = (group: MenuGroup) => {
    const visibleChildren = group.children.filter((c) => c.visible);
    return visibleChildren.length > 0;
  };

  const resolveChild = (child: { url: string; label: string; openInNewTab?: boolean }) => {
    // Settings URLs always override — admin controls these from Settings page
    if (child.label === "Privacy Policy" && privacyPolicyUrl) {
      return { url: privacyPolicyUrl, external: true };
    }
    if (child.label === "Openings" && openingsUrl) {
      return { url: openingsUrl, external: true };
    }
    return { url: child.url, external: child.openInNewTab || (child.url && child.url.startsWith("http")) };
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
        {visibleGroups.map((group, index) => (
          <li
            key={group.id}
            className={isGroupActive(group) ? "nav-active" : ""}
            onMouseEnter={() => setActiveMenu(index)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            {/* TOP-LEVEL LINK */}
            {group.url && !hasDropdown(group) ? (
              <Link to={group.url}>{group.label}</Link>
            ) : (
              <a href="#">
                {group.label}
                {hasDropdown(group) && <span className="arrow">▼</span>}
              </a>
            )}

            {/* DROPDOWN */}
            {hasDropdown(group) && activeMenu === index && (
              <ul className="dropdown">
                {group.children
                  .filter((c) => c.visible)
                  .sort((a, b) => a.order - b.order)
                  .map((child) => {
                    const resolved = resolveChild(child);

                    return (
                      <li key={child.id}>
                        {resolved.external && resolved.url ? (
                          <a href={resolved.url} target="_blank" rel="noopener noreferrer">
                            {child.label}
                          </a>
                        ) : resolved.url ? (
                          <Link to={resolved.url}>{child.label}</Link>
                        ) : (
                          <a href="#">{child.label}</a>
                        )}
                      </li>
                    );
                  })}
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
