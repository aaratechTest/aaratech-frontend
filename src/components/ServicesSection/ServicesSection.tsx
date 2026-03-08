import "./ServicesSection.css";

type Service = {
  title: string;
  desc: string;
  icon: string;
};

const defaultServices: Service[] = [
  { title: "IT Services Outsourcing", desc: "Customized services in IT Software Development, Testing, Maintenance and Outsourcing Services for Banking, Logistics and E-commerce verticals.", icon: "\u2699\uFE0F" },
  { title: "IT Strategy Consulting", desc: "Aara Tech focuses on serving the technology needs with an innovative business model to help our clients achieve their business goals.", icon: "\uD83D\uDC64" },
  { title: "Digital Solutions", desc: "End-to-end digital transformation using Mobility, Big Data Analytics, and Cloud technologies to enhance business efficiency.", icon: "\uD83D\uDCBB" },
  { title: "Testing Services", desc: "Comprehensive quality assurance including software testing, performance testing, and specialized testing services.", icon: "\uD83D\uDEE0\uFE0F" },
];

interface ServicesData {
  heading?: string;
  items?: Array<{ title: string; description: string; icon?: string }>;
}

function ServicesSection({ data }: { data?: ServicesData }) {
  const services: Service[] = data?.items
    ? data.items.map((item, i) => ({
        title: item.title,
        desc: item.description,
        icon: item.icon || defaultServices[i]?.icon || "\u2699\uFE0F",
      }))
    : defaultServices;

  return (
    <section className="services-section">
      <h2 className="section-title">{data?.heading ?? "Our Services"}</h2>

      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.desc}</p>
            <div className="service-link">
              Explore more <span>&rarr;</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServicesSection;
