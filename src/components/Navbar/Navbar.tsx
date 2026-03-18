import "./Navbar.css";
import { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { BRAND } from "../../constants/Assets";
import { Menu, X, ChevronDown } from "lucide-react";
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

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
    if (child.label === "Privacy Policy" && privacyPolicyUrl) {
      return { url: privacyPolicyUrl, external: true };
    }
    if (child.label === "Openings" && openingsUrl) {
      return { url: openingsUrl, external: true };
    }
    return { url: child.url, external: child.openInNewTab || (child.url && child.url.startsWith("http")) };
  };

  // Toggle dropdown on click (works for both mobile and desktop)
  const handleDropdownToggle = useCallback((index: number, hasChildren: boolean) => {
    if (!hasChildren) return;
    setActiveMenu((prev) => (prev === index ? null : index));
  }, []);

  // Close menu when clicking a link
  const handleLinkClick = useCallback(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" onClick={handleLinkClick}>
          <img src={BRAND.logo} alt="Logo" />
        </Link>
      </div>

      <div className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X size={26} /> : <Menu size={26} />}
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="nav-overlay" onClick={() => setMobileOpen(false)} />
      )}

      <ul className={`nav-menu ${mobileOpen ? "active" : ""}`}>
        {visibleGroups.map((group, index) => (
          <li
            key={group.id}
            className={isGroupActive(group) ? "nav-active" : ""}
            onMouseEnter={() => {
              if (window.innerWidth > 768) setActiveMenu(index);
            }}
            onMouseLeave={() => {
              if (window.innerWidth > 768) setActiveMenu(null);
            }}
          >
            {/* TOP-LEVEL LINK */}
            {group.url && !hasDropdown(group) ? (
              <Link to={group.url} onClick={handleLinkClick}>{group.label}</Link>
            ) : (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleDropdownToggle(index, hasDropdown(group));
                }}
              >
                {group.label}
                {hasDropdown(group) && (
                  <ChevronDown
                    size={14}
                    className={`arrow-icon ${activeMenu === index ? "rotated" : ""}`}
                  />
                )}
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
                          <a
                            href={resolved.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleLinkClick}
                          >
                            {child.label}
                          </a>
                        ) : resolved.url ? (
                          <Link to={resolved.url} onClick={handleLinkClick}>
                            {child.label}
                          </Link>
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
