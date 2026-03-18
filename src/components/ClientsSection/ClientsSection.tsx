import { Link } from "react-router-dom";
import "./ClientsSection.css";

interface ClientItem {
  name: string;
  logo?: string;
}

interface ClientsData {
  label?: string;
  heading?: string;
  description?: string;
  stats?: Array<{ value: string; label: string }>;
  clients?: ClientItem[];
}

const defaultStats = [
  { value: "50+", label: "Clients Worldwide" },
  { value: "14+", label: "Years of Trust" },
  { value: "100+", label: "Projects Delivered" },
];

function ClientsSection({ data }: { data?: ClientsData }) {
  const label = data?.label ?? "Our Clients";
  const heading = data?.heading ?? "Trusted by Leading Banks & Enterprises";
  const description =
    data?.description ??
    "We are proud to partner with some of the most prestigious financial institutions and enterprises across the globe. Our solutions power critical operations for banks, NBFCs, and fintech companies.";
  const stats = data?.stats ?? defaultStats;
  const clients = data?.clients ?? [];

  // Only show clients that have a logo image uploaded
  const clientsWithLogos = clients.filter((c) => c.logo);

  // If no images uploaded yet, don't render the carousel
  if (clientsWithLogos.length === 0) {
    return (
      <section className="clients-section">
        <div className="clients-inner clients-inner--center">
          <div className="clients-content">
            <span className="section-label">{label}</span>
            <h2>{heading}</h2>
            <p>{description}</p>
            <div className="clients-stats">
              {stats.map((s, i) => (
                <div className="clients-stat" key={i}>
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
            <p className="clients-placeholder">
              Add client logos from the admin panel to display them here.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Duplicate for seamless infinite scroll
  const row1 = [...clientsWithLogos, ...clientsWithLogos];
  const row2 = [...clientsWithLogos.slice().reverse(), ...clientsWithLogos.slice().reverse()];

  // Dynamic speed based on number of items
  const duration = Math.max(15, clientsWithLogos.length * 4);

  return (
    <section className="clients-section">
      <div className="clients-inner">
        {/* LEFT — Content */}
        <div className="clients-content">
          <span className="section-label">{label}</span>
          <h2>{heading}</h2>
          <p>{description}</p>
          <div className="clients-stats">
            {stats.map((s, i) => (
              <div className="clients-stat" key={i}>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Image Carousel */}
        <div className="clients-carousel">
          <div className="clients-track">
            {/* Row 1 — scrolls left */}
            <div
              className="clients-row"
              style={{ animationDuration: `${duration}s` }}
            >
              {row1.map((client, i) => (
                <div className="client-logo-card" key={`r1-${i}`}>
                  <img src={client.logo} alt={client.name} title={client.name} />
                </div>
              ))}
            </div>

            {/* Row 2 — scrolls right (reverse direction) */}
            <div
              className="clients-row clients-row--reverse"
              style={{ animationDuration: `${duration}s` }}
            >
              {row2.map((client, i) => (
                <div className="client-logo-card" key={`r2-${i}`}>
                  <img src={client.logo} alt={client.name} title={client.name} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClientsSection;
