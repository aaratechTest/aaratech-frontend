import { useState } from "react";
import { PRODUCTS,INDUSTRIES  } from "../../constants/Assets";
import { usePageContent } from "../../hooks/usePageContent";
import { useSettings } from "../../contexts/SettingsContext";
import SEO from "../../components/SEO/SEO";
import { seoDefaults } from "../../constants/seoDefaults";
import { serviceSchema, breadcrumbSchema } from "../../utils/structuredData";

import {
  FiSend,
  FiCreditCard,
  FiSmartphone,
  FiHome,
  FiRefreshCw,
  FiZap,
  FiShield,
  FiLayout,
  FiSettings,
  FiGlobe,
  FiUsers,
  FiLock,
} from "react-icons/fi";
import "./MobileWalletPage.css";

/* ================= FEATURE TABS DATA ================= */
const featureTabs = [
  {
    key: "fund-transfer",
    title: "Fund Transfer",
    content: (
      <>
        <p>
          Send money in a jiffy with Sling Wallet! The wallet enables the user
          to transfer money from wallet-to-wallet instantly and securely.
          Request money from your family and friends with ease.
        </p>

        <strong>Fund Transfer Features:</strong>
        <ul>
          <li>Instant wallet-to-wallet money transfer</li>
          <li>Request money from family and friends</li>
          <li>Cashless fund transfer with secure protocols</li>
          <li>Pay through virtual card</li>
          <li>Transaction history and tracking</li>
        </ul>

        <strong>Security:</strong>
        <p>
          Payments and money transfers are fast and secure, built using custom
          and standards based protocols for maximum protection of user data and
          transactions.
        </p>
      </>
    ),
  },
  {
    key: "bookings",
    title: "Hotel & Airline Booking",
    content: (
      <>
        <p>
          Book your stay across the country in a click! Fly across the country
          with just a one-click payment. Sling Wallet integrates seamlessly
          with booking platforms for a frictionless travel experience.
        </p>

        <strong>Booking Features:</strong>
        <ul>
          <li>Hotel booking with one-click payment</li>
          <li>Airline booking across the country</li>
          <li>Instant confirmation and e-tickets</li>
          <li>Integrated with external booking services</li>
          <li>Secure payment processing for all bookings</li>
        </ul>

        <strong>Convenience:</strong>
        <p>
          All booking services are integrated within the wallet application,
          enabling users to search, book, and pay without leaving the app.
        </p>
      </>
    ),
  },
  {
    key: "recharge",
    title: "Recharge & Bill Payments",
    content: (
      <>
        <p>
          No more e-recharge via an agent! Recharge mobile and DTH at ease.
          Make one-click payments for your bills, mobile recharge, DTH
          recharge, and utility payments directly from the wallet.
        </p>

        <strong>Recharge & Payment Features:</strong>
        <ul>
          <li>Mobile recharge across all operators</li>
          <li>DTH recharge with instant activation</li>
          <li>Utility bill payments</li>
          <li>One-click payment processing</li>
          <li>Payment history and receipts</li>
        </ul>

        <strong>Ease of Use:</strong>
        <p>
          The wallet comes ready with integrated and optimized payment gateways,
          eliminating the long and expensive procedure of gateway integration
          for your business.
        </p>
      </>
    ),
  },
  {
    key: "deployment",
    title: "Deployment Options",
    content: (
      <>
        <p>
          Sling Wallet platform is an end-to-end mobile wallet solution which
          can be deployed as a turnkey, OEM or hosted solution for banks across
          the world. The wallet application is built from the ground up to
          easily integrate with telecom infrastructure, financial institutions,
          and other third-parties.
        </p>

        <strong>Deployment Models:</strong>
        <ul>
          <li>Turnkey solution – ready to deploy out of the box</li>
          <li>OEM solution – rebrand and integrate into your ecosystem</li>
          <li>Hosted solution – fully managed cloud deployment</li>
          <li>Custom built and standards based protocols</li>
          <li>Easy integration with telecom and financial infrastructure</li>
        </ul>

        <strong>White Label:</strong>
        <p>
          Technology is all set. Want to amend the look and feel of your choice?
          Sling Wallet is a one-stop white label solution that can be fully
          customized to match your brand identity.
        </p>
      </>
    ),
  },
  {
    key: "integration",
    title: "Integration & Architecture",
    content: (
      <>
        <p>
          Sling Wallet is built with an open architecture that makes it easy to
          integrate with your existing systems. The platform uses custom built
          and standards based protocols to connect with telecom infrastructure,
          financial institutions, and other third-party services.
        </p>

        <strong>Integration Capabilities:</strong>
        <ul>
          <li>Open architecture for easy system integration</li>
          <li>Telecom infrastructure compatibility</li>
          <li>Financial institutions connectivity</li>
          <li>Third-party service integration</li>
          <li>Standards based communication protocols</li>
          <li>Payment gateway integration (pre-built)</li>
        </ul>

        <strong>External Services:</strong>
        <p>
          Integrated with external services for hotel booking, airline booking,
          mobile and DTH recharge, and utility bill payments – all accessible
          from within the wallet application.
        </p>
      </>
    ),
  },
];

/* ================= WHY CHOOSE TABS ================= */
const chooseUsTabs = [
  {
    key: "benefits",
    title: "Wallet Benefits",
    list: [
      {
        label: "Ease of Transaction",
        description:
          "Share your customized Sling Wallet with customers for their ease of transaction. One-click payments for all services.",
      },
      {
        label: "Open Architecture",
        description:
          "Sling Wallet is easy to integrate with your existing systems, telecom infrastructure, and financial institutions.",
      },
      {
        label: "Zero Maintenance",
        description:
          "Maintaining an app is not an easy job. We do it for you with fully managed deployment and support.",
      },
      {
        label: "Payments Ready",
        description:
          "Integrating and optimizing payment gateways is a long and expensive procedure. We come ready with it.",
      },
      {
        label: "Fast and Secure",
        description:
          "Payments and money transfers are fast and secure, using custom built and standards based protocols.",
      },
    ],
  },
  {
    key: "why",
    title: "Why Choose Sling Wallet?",
    list: [
      {
        label: "White Label Solution",
        description:
          "Technology is all set. Amend the look and feel of your choice with our one-stop white label solution.",
      },
      {
        label: "Multiple Deployment Options",
        description:
          "Deploy as turnkey, OEM, or hosted solution for banks and financial institutions across the world.",
      },
      {
        label: "End-to-End Platform",
        description:
          "Complete mobile wallet solution from fund transfer to bookings, recharge, and bill payments.",
      },
      {
        label: "Banking Expertise",
        description:
          "AaraTech has 14+ years of experience serving Fortune 500 banks and financial institutions globally.",
      },
      {
        label: "Scalable Architecture",
        description:
          "Built to handle growing transaction volumes with high availability and performance standards.",
      },
    ],
  },
];

const MobileWalletPage = () => {
  const { content: sections } = usePageContent("mobile-wallet");
  const settings = useSettings();
  const [activeFeatureTab, setActiveFeatureTab] = useState("fund-transfer");
  const [activeChooseTab, setActiveChooseTab] = useState("benefits");

  const hero = sections.hero || {};
  const overview = sections.overview || {};
  const cta = sections.cta || {};

  const currentChooseTab = chooseUsTabs.find(
    (tab) => tab.key === activeChooseTab
  );

  return (
    <div className="wallet-scope">
      <SEO
        title={seoDefaults["mobile-wallet"].title}
        description={seoDefaults["mobile-wallet"].description}
        path="/mobile-wallet"
        structuredData={[
          serviceSchema("Mobile Wallet", seoDefaults["mobile-wallet"].description, "/mobile-wallet"),
          breadcrumbSchema([{ name: "Mobile Wallet", path: "/mobile-wallet" }]),
        ]}
      />
      {/* ================= HERO ================= */}
      <section className="wallet-hero">
        <div className="hero-overlay" />
        <h1 className="hero-main-title">
          {hero.heading ?? "Sling Wallet – "}<span>{hero.headingSpan ?? "Mobile Wallet Solution"}</span>
        </h1>
        <p className="hero-description">
          {hero.description ?? "An end-to-end mobile wallet solution for instant and cashless fund transfer, hotel booking, airline booking, mobile recharge, and utility payments."}
        </p>
        <div className="hero-badges">
          <span className="hero-badge-item">{hero.badge1 ?? "Fund Transfer"}</span>
          <span className="hero-badge-item">{hero.badge2 ?? "Hotel Booking"}</span>
          <span className="hero-badge-item">{hero.badge3 ?? "Airline Booking"}</span>
          <span className="hero-badge-item">{hero.badge4 ?? "Recharge & Bills"}</span>
        </div>
      </section>

      {/* ================= OVERVIEW SECTION ================= */}
      <section className="wallet-section-2 split-section-2">
        <div className="section-header-2">
          <span className="section-label-2">{overview.label ?? "Our Product"}</span>
          <h2 className="section-headline-2">
            <span className="title-red-2">{overview.headingRed ?? "Payments"}</span>{" "}
            <span className="title-blue-2">{overview.headingBlue ?? "Made Easy"}</span>
          </h2>
          <div className="headline-underline-2"></div>
        </div>

        <div className="split-container-2">
          <div className="split-text-2">
            <p className="split-body-2">
              {overview.description ?? "Sling Wallet platform is an end-to-end mobile wallet solution which can be deployed as a turnkey, OEM or hosted solution for banks across the world. The wallet application is built from the ground up to easily integrate with telecom infrastructure, financial institutions, and other third-parties using custom built and standards based protocols."}
            </p>

            <p className="split-body-2">
              This wallet enables the user to transfer money from
              wallet-to-wallet and make one-click payments for bills, mobile
              recharge, DTH recharge, hotel bookings and airline bookings.
            </p>

            <p className="split-body-2">
              Sling Wallet is a one-stop white label solution – the technology
              is all set, and you can amend the look and feel to match your
              brand identity. Payments and money transfers are fast, secure,
              and built for scale.
            </p>
          </div>

          <div className="split-image-2">
            <img src={PRODUCTS.wallet} alt="Sling Wallet Mobile Wallet" loading="lazy" />
            <div className="cen">
              <a href={settings.requestDemoUrl || "#"} target="_blank" rel="noopener noreferrer" className="request-demo-btn">Request Demo</a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CORE SERVICES ================= */}
      <section className="wallet-section-2">
        <div className="section-container-2">
          <div className="section-header-2">
            <span className="section-label-2">Core Services</span>
            <h2 className="section-headline-2">
              <span className="title-red-2">What You Can Do</span>{" "}
              <span className="title-blue-2">With Sling Wallet</span>
            </h2>
            <div className="headline-underline-2"></div>
          </div>

          <div className="features-grid-2">
            <div className="feature-card-2">
              <div className="card-header-2">
                <div className="icon-box-2">
                  <FiSend />
                </div>
                <h3>Send Money</h3>
              </div>
              <p>
                Send money in a jiffy with Sling! Instant wallet-to-wallet
                transfers with secure protocols.
              </p>
            </div>

            <div className="feature-card-2">
              <div className="card-header-2">
                <div className="icon-box-2">
                  <FiUsers />
                </div>
                <h3>Request Money</h3>
              </div>
              <p>
                Request money from your family and friends with ease, directly
                within the wallet application.
              </p>
            </div>

            <div className="feature-card-2">
              <div className="card-header-2">
                <div className="icon-box-2">
                  <FiHome />
                </div>
                <h3>Hotel Booking</h3>
              </div>
              <p>
                Book your stay across the country in a click! One-click payment
                for seamless hotel bookings.
              </p>
            </div>

            <div className="feature-card-2">
              <div className="card-header-2">
                <div className="icon-box-2">
                  <FiGlobe />
                </div>
                <h3>Airline Booking</h3>
              </div>
              <p>
                Fly across the country! All you have to do is a one-click
                payment for airline bookings.
              </p>
            </div>

            <div className="feature-card-2">
              <div className="card-header-2">
                <div className="icon-box-2">
                  <FiSmartphone />
                </div>
                <h3>Mobile & DTH Recharge</h3>
              </div>
              <p>
                No more e-recharge via an agent! Recharge mobile and DTH at
                ease directly from the wallet.
              </p>
            </div>

            <div className="feature-card-2">
              <div className="card-header-2">
                <div className="icon-box-2">
                  <FiCreditCard />
                </div>
                <h3>Virtual Card Payments</h3>
              </div>
              <p>
                Pay through virtual card for secure and convenient cashless
                transactions anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURE TABS SECTION ================= */}
      <section className="it-services-section wallet-section-2 split-section-2">
        <div className="section-header-2">
          <span className="section-label-2">Explore Features</span>
          <h2 className="section-headline-2">
            <span className="title-red-2">Sling Wallet</span>{" "}
            <span className="title-blue-2">Feature Details</span>
          </h2>
          <div className="headline-underline-2"></div>
        </div>

        <div className="it-services-container">
          <div className="it-services-tabs">
            {featureTabs.map((tab) => (
              <button
                key={tab.key}
                className={`it-tab ${activeFeatureTab === tab.key ? "active" : ""}`}
                onClick={() => setActiveFeatureTab(tab.key)}>
                {tab.title}
              </button>
            ))}
          </div>

          <div className="it-services-content">
            {featureTabs.find((t) => t.key === activeFeatureTab)?.content}
          </div>
        </div>
      </section>

      {/* ================= KEY BENEFITS ================= */}
      <section className="wallet-section-2 split-section-2">
        <div className="section-header-2">
          <span className="section-label-2">Key Benefits</span>
          <h2 className="section-headline-2">
            <span className="title-red-2">Why</span>{" "}
            <span className="title-blue-2">Sling Wallet Stands Out</span>
          </h2>
          <div className="headline-underline-2"></div>
        </div>

        <div className="split-container-2">
          <div className="split-image-2">
            <img src={INDUSTRIES.service} alt="Sling Wallet Benefits" loading="lazy" />
          </div>

          <div className="split-text-2">
            <div className="info-box-2">
              <h3>Turnkey, OEM & Hosted Deployment</h3>
              <p>
                Deploy as a turnkey solution ready out of the box, an OEM
                solution rebranded for your ecosystem, or a fully managed
                hosted solution for banks across the world.
              </p>
            </div>

            <div className="info-box-2">
              <h3>White Label Solution</h3>
              <p>
                Technology is all set. Want to amend the look and feel of your
                choice? Sling Wallet is a one-stop white label solution fully
                customizable to your brand identity.
              </p>
            </div>

            <div className="info-box-2">
              <h3>Pre-Integrated Payment Gateways</h3>
              <p>
                Integrating and optimizing payment gateways is a long and
                expensive procedure. Sling Wallet comes ready with integrated
                and optimized payment gateways.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DEPLOYMENT MODELS ================= */}
      <section className="wallet-section-2">
        <div className="section-container-2">
          <div className="section-header-2">
            <span className="section-label-2">Deployment</span>
            <h2 className="section-headline-2">
              <span className="title-red-2">Flexible</span>{" "}
              <span className="title-blue-2">Deployment Models</span>
            </h2>
            <div className="headline-underline-2"></div>
          </div>

          <div className="features-grid-2 deployment-grid-3">
            <div className="feature-card-2">
              <div className="card-header-2">
                <div className="icon-box-2">
                  <FiZap />
                </div>
                <h3>Turnkey Solution</h3>
              </div>
              <p>
                Ready to deploy out of the box with pre-configured features,
                payment gateways, and integrations for rapid go-live.
              </p>
            </div>

            <div className="feature-card-2">
              <div className="card-header-2">
                <div className="icon-box-2">
                  <FiLayout />
                </div>
                <h3>OEM Solution</h3>
              </div>
              <p>
                Rebrand and integrate the wallet platform into your existing
                ecosystem with full white label customization.
              </p>
            </div>

            <div className="feature-card-2">
              <div className="card-header-2">
                <div className="icon-box-2">
                  <FiSettings />
                </div>
                <h3>Hosted Solution</h3>
              </div>
              <p>
                Fully managed cloud deployment with zero maintenance overhead.
                We maintain the app and infrastructure for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="wallet-section-2 split-section-2 choose-us-section">
        <div className="section-header-2">
          <span className="section-label-2">Why Choose Us?</span>
          <h2 className="section-headline-2">
            <span className="title-red-2">Why</span>{" "}
            <span className="title-blue-2">Choose Sling Wallet?</span>
          </h2>
          <div className="headline-underline-2"></div>
        </div>

        <div className="split-container-2">
          <div className="split-text-2">
            <div className="choose-us-tabs">
              {chooseUsTabs.map((tab) => (
                <button
                  key={tab.key}
                  className={`choose-tab ${activeChooseTab === tab.key ? "active" : ""}`}
                  onClick={() => setActiveChooseTab(tab.key)}>
                  {tab.title}
                </button>
              ))}
            </div>

            <ul className="choose-us-list">
              {currentChooseTab?.list.map((item, idx) => (
                <li key={idx}>
                  <strong>{item.label}:</strong> {item.description}
                </li>
              ))}
            </ul>
          </div>

          <div className="split-image-2">
            <img src={PRODUCTS.wallet} alt="Why Choose Sling Wallet" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ================= FOOTER CTA ================= */}
      <section className="footer-cta-section">
        <div className="footer-cta-container">
          <h2 className="footer-cta-headline">
            {cta.heading ?? "What can we help you to achieve today?"}
          </h2>
          <p className="footer-cta-subtext">
            {cta.subtext ?? "Contact us for a live demo of AaraTech's Sling Wallet Mobile Wallet Solution."}
          </p>
          <button className="footer-cta-btn">{cta.buttonText ?? "CONTACT"}</button>
        </div>
      </section>
    </div>
  );
};

export default MobileWalletPage;