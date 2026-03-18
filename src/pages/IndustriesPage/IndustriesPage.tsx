import { useState } from "react";
import { INDUSTRIES } from "../../constants/Assets";
import { usePageContent } from "../../hooks/usePageContent";
import PageLoader from "../../components/PageLoader/PageLoader";
import SEO from "../../components/SEO/SEO";
import { seoDefaults } from "../../constants/seoDefaults";
import { breadcrumbSchema } from "../../utils/structuredData";

import { FiCreditCard, FiTruck, FiShoppingCart, FiMail } from "react-icons/fi";

import "../../shared/services-shared.css";
import "./IndustriesPage.css";

/* ================= CHOOSE US TABS DATA ================= */
const industriesContent = {
  banking: {
    heading: "Core Banking Upgrades",
    services: [
      {
        title: "Digital Banking",
        desc: "Create simple and secure mobile and web banking experiences.",
      },
      {
        title: "Risk & Compliance",
        desc: "Automate KYC, AML, and fraud monitoring for regulatory compliance.",
      },
      {
        title: "Payments",
        desc: "Enable fast and secure payment processing across channels.",
      },
      {
        title: "Data & Analytics",
        desc: "Use insights to understand behavior and forecast trends.",
      },
      {
        title: "Cybersecurity for BFSI",
        desc: "Protect financial data with advanced threat detection.",
      },
    ],
    image: INDUSTRIES.banking,
    challenges: [
      "Increasing regulatory and security requirements",
      "Providing superior levels of customer service",
      "Managing price pressures with greater efficiency",
    ],
  },
  logistics: {
    heading: "Logistics Technology Solutions",
    services: [
      {
        title: "Fleet Management",
        desc: "Track and optimize fleet performance in real time.",
      },
      {
        title: "Route Optimization",
        desc: "Reduce delivery time and operational costs.",
      },
      {
        title: "Warehouse Automation",
        desc: "Improve inventory accuracy and throughput.",
      },
      {
        title: "Supply Chain Visibility",
        desc: "End-to-end tracking across the supply chain.",
      },
      {
        title: "Analytics & Reporting",
        desc: "Data-driven logistics decision making.",
      },
    ],
    image: INDUSTRIES.logistics,
    challenges: [
      "High last-mile delivery costs",
      "Lack of real-time visibility",
      "Inefficient warehouse operations",
    ],
  },
  ecommerce: {
    heading: "E-commerce Enablement",
    services: [
      {
        title: "Platform Development",
        desc: "Scalable and secure e-commerce platforms.",
      },
      {
        title: "Payment Integration",
        desc: "Multiple secure payment options.",
      },
      {
        title: "Order Management",
        desc: "Automated order processing workflows.",
      },
      { title: "Customer Experience", desc: "Personalized shopping journeys." },
      {
        title: "Performance Optimization",
        desc: "High-speed and high-availability systems.",
      },
    ],
    image: INDUSTRIES.ecommerce,
    challenges: [
      "Cart abandonment",
      "Scaling during peak traffic",
      "Payment failures",
    ],
  },
  postal: {
    heading: "Postal Technology Modernization",
    services: [
      {
        title: "Digital Postal Platforms",
        desc: "Citizen-centric postal services.",
      },
      { title: "Shipment Tracking", desc: "Real-time tracking and updates." },
      {
        title: "Sorting Automation",
        desc: "Faster processing with automation.",
      },
      { title: "Legacy Modernization", desc: "Upgrade outdated systems." },
      {
        title: "Security & Compliance",
        desc: "Data protection and compliance.",
      },
    ],
    image: INDUSTRIES.postal,
    challenges: [
      "Manual processes",
      "Slow delivery cycles",
      "Outdated infrastructure",
    ],
  },
};
const ServicesPage = () => {
  const { content: sections, loading, meta } = usePageContent("industries");
  const seo = seoDefaults.industries;
  const [activeTab, setActiveTab] =
    useState<keyof typeof industriesContent>("banking");
  const activeData = industriesContent[activeTab];

  return (
    <div className="services-scope">
      <SEO
        title={meta.metaTitle || seo.title}
        description={meta.metaDescription || seo.description}
        path="/industries"
        structuredData={breadcrumbSchema([{ name: "Industries", path: "/industries" }])}
      />
      {loading && <PageLoader />}
      {/* ================= HERO ================= */}
      <section className="services-hero-1">
        <div className="hero-overlay" />
        <h1 className="hero-main-title">{sections.hero?.heading ?? "Industries We Serve"}</h1>

        <p className="hero-description">
          {sections.hero?.description ?? "Banking & Financial Services, Logistics Services, E-commerce Services, and Postal Solutions."}
        </p>

        <div className="hero-tabs-wrapper"></div>
      </section>
      <section className="industries-exact">
        <h2 className="industries-title">All Your Team Needs In One Place</h2>
        <p className="industries-subtitle">
          IT services that streamline operations, improve efficiency, and
          maximize business value.
        </p>

        {/* Tabs */}
        <div className="industries-tabs-exact">
          <button
            className={`tab ${activeTab === "banking" ? "active" : ""}`}
            onClick={() => setActiveTab("banking")}>
            <FiCreditCard size={18} />
            <span>Banking & Finance</span>
          </button>

          <button
            className={`tab ${activeTab === "logistics" ? "active" : ""}`}
            onClick={() => setActiveTab("logistics")}>
            <FiTruck size={18} />
            <span>Logistics Technology</span>
          </button>

          <button
            className={`tab ${activeTab === "ecommerce" ? "active" : ""}`}
            onClick={() => setActiveTab("ecommerce")}>
            <FiShoppingCart size={18} />
            <span>E-commerce</span>
          </button>

          <button
            className={`tab ${activeTab === "postal" ? "active" : ""}`}
            onClick={() => setActiveTab("postal")}>
            <FiMail size={18} />
            <span>Postal Technology</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="industries-main">
          {/* Left Card */}
          <div className="services-card">
            <span className="services-label">Services</span>
            <h3 className="services-heading">{activeData.heading}</h3>

            <div className="services-list">
              {activeData.services.map((item, index) => (
                <div
                  key={index}
                  className={`service-item ${index === 0 ? "active" : ""}`}>
                  <strong>{item.title}</strong>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image + Challenges */}
          <div className="industries-right">
            <div className="image-wrapper">
              <img src={activeData.image} alt="Industry Solutions" loading="lazy" />
            </div>

            <div className="challenges">
              <h4>Client Challenges We Solve</h4>
              <ul>
                {activeData.challenges.map((c, i) => (
                  <li key={i}>✔ {c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER CTA ================= */}
      <section className="footer-cta-section">
        <div className="footer-cta-container">
          <h2 className="footer-cta-headline">
            {sections.cta?.heading ?? "What can we help you to achieve today?"}
          </h2>
          <button className="footer-cta-btn">{sections.cta?.buttonText ?? "CONTACT"}</button>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
