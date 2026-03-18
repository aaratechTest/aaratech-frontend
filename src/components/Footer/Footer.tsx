import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageContent } from "../../hooks/usePageContent";
import { useSettings } from "../../contexts/SettingsContext";
import "./Footer.css";

interface Office {
  country: string;
  address: string;
  phone?: string;
  email?: string;
}

const defaultOffices: Office[] = [
  {
    country: "India",
    address:
      "Unit No. 4A & 5, Ground Floor, Pinnacle Building, International Tech Park, Taramani, Chennai \u2013 600113.",
    phone: "+91 7299978701",
    email: "info@aaratech.com",
  },
  {
    country: "Singapore",
    address: "100 Jalan Sultan, #03-45, Sultan Plaza, Singapore \u2013 199001",
  },
  {
    country: "USA",
    address: "39555 Orchard Hill Place, Novi, MI 48375",
  },
  {
    country: "Malaysia",
    address:
      "No. 15-2-2, Medan Niaga Mutiara Cheras, Jalan 3/101C, Cheras Business Centre, Batu 5, Jalan Cheras, 56100, Kuala Lumpur",
  },
];

export default function Footer() {
  const { content } = usePageContent("footer");
  const settings = useSettings();

  const offices: Office[] = content.offices?.items?.length
    ? content.offices.items
    : defaultOffices;

  const copyrightText =
    content.bottom?.copyrightText ?? "Aara Tech Pvt Ltd. All rights reserved.";

  // Split offices: first one gets full detail, rest are compact
  const primaryOffice = offices[0];
  const secondaryOffices = offices.slice(1);

  // Group secondary offices into pairs for layout
  const midOffices = secondaryOffices.slice(0, 2);
  const restOffices = secondaryOffices.slice(2);

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* PRIMARY OFFICE (with phone/email) */}
        {primaryOffice && (
          <div className="footer-column">
            <h4 className="footer-title">{primaryOffice.country}</h4>
            <address className="footer-item">
              <MapPin size={22} className="footer-icon" />
              <p>{primaryOffice.address}</p>
            </address>
            {primaryOffice.phone && (
              <div className="footer-item">
                <Phone size={16} className="footer-icon" />
                <p>{primaryOffice.phone}</p>
              </div>
            )}
            {primaryOffice.email && (
              <div className="footer-item">
                <Mail size={16} className="footer-icon" />
                <p>{primaryOffice.email}</p>
              </div>
            )}
          </div>
        )}

        {/* MID OFFICES (Singapore & USA style — compact) */}
        {midOffices.length > 0 && (
          <div className="footer-column">
            {midOffices.map((office, i) => (
              <section key={i} className={i > 0 ? "footer-section" : undefined}>
                <h4 className="footer-title">{office.country}</h4>
                <p className="footer-text">{office.address}</p>
                {office.phone && (
                  <div className="footer-item">
                    <Phone size={16} className="footer-icon" />
                    <p>{office.phone}</p>
                  </div>
                )}
                {office.email && (
                  <div className="footer-item">
                    <Mail size={16} className="footer-icon" />
                    <p>{office.email}</p>
                  </div>
                )}
              </section>
            ))}
          </div>
        )}

        {/* REMAINING OFFICES */}
        {restOffices.map((office, i) => (
          <div className="footer-column" key={i}>
            <h4 className="footer-title">{office.country}</h4>
            <address className="footer-item">
              <MapPin size={22} className="footer-icon" />
              <p>{office.address}</p>
            </address>
            {office.phone && (
              <div className="footer-item">
                <Phone size={16} className="footer-icon" />
                <p>{office.phone}</p>
              </div>
            )}
            {office.email && (
              <div className="footer-item">
                <Mail size={16} className="footer-icon" />
                <p>{office.email}</p>
              </div>
            )}
          </div>
        ))}

        {/* QUICK LINKS */}
        <div className="footer-column">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Our Services</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>

          {(settings.socialFacebook || settings.socialTwitter || settings.socialLinkedin || settings.socialInstagram || settings.socialYoutube) && (
            <div className="footer-social">
              {settings.socialFacebook && (
                <a href={settings.socialFacebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                  <Facebook size={20} />
                </a>
              )}
              {settings.socialTwitter && (
                <a href={settings.socialTwitter} aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                  <Twitter size={20} />
                </a>
              )}
              {settings.socialLinkedin && (
                <a href={settings.socialLinkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={20} />
                </a>
              )}
              {settings.socialInstagram && (
                <a href={settings.socialInstagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <Instagram size={20} />
                </a>
              )}
              {settings.socialYoutube && (
                <a href={settings.socialYoutube} aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                  <Youtube size={20} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {copyrightText}</p>
        <div className="footer-policy">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
