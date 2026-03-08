import { useState } from "react";
import { INDUSTRIES } from "../../constants/Assets";
import { usePageContent } from "../../hooks/usePageContent";

import {
  FiFileText,
  FiDatabase,
  FiDollarSign,
  FiSettings,
  FiTruck,
  FiBarChart2,
  FiCheckCircle,
  FiShield,
  FiUsers,
  FiLayers,
  FiZap,
  FiGlobe,
} from "react-icons/fi";
import "./LeasingPage.css";

/* ================= FEATURE TABS DATA ================= */
const featureTabs = [
  {
    key: "lease-mgmt",
    title: "Lease Management",
    content: (
      <>
        <p>
          Aara Tech's Lease Management System is a web based software solution
          for the Equipment Finance and Leasing Industry. It is a product that
          helps provide corporate loans to the customer by leasing equipments,
          vehicles and other industrial machines. The system is able to serve
          various sizes of industries, including SMEs to large corporations,
          state enterprises and subsidiaries of multinational companies.
        </p>

        <strong>End-to-End Leasing Solution</strong>
        <p>
          Aara Tech's Leasing Solution simplifies every part of Lease and Asset
          Management - from Lease Initiation, Contract Preparation, Asset
          Management including Registration and Insurance, Account Receivables
          to Lease Closure.
        </p>

        <strong>Key Capabilities:</strong>
        <ul>
          <li>Lease Initiation and Contract Preparation</li>
          <li>Asset Management including Registration and Insurance</li>
          <li>Account Receivables Management</li>
          <li>Lease Closure and Termination</li>
          <li>
            Support for multiple equipment and vehicle lease portfolios
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "accounts",
    title: "Accounts Receivable",
    content: (
      <>
        <p>
          Aara Tech's Leasing Solution has a powerful accounts receivables
          system which handles PDC (Post Dated Cheques), payment processing,
          delinquency, accruals, amortization, Profit & Loss statements,
          balance sheet and G/L Posting.
        </p>

        <strong>Financial Management Features:</strong>
        <ul>
          <li>PDC (Post Dated Cheques) Handling</li>
          <li>Payment Processing and Tracking</li>
          <li>Delinquency Management</li>
          <li>Accruals and Amortization</li>
          <li>Profit & Loss Statements</li>
          <li>Balance Sheet Generation</li>
          <li>General Ledger (G/L) Posting</li>
        </ul>

        <strong>Benefits:</strong>
        <p>
          The system enables banks to improve the agility, transparency and
          efficiency of their lending solutions. It will help to support
          decision-making in the lending lifecycle to banks and financial
          services companies.
        </p>
      </>
    ),
  },
  {
    key: "asset-mgmt",
    title: "Asset Management",
    content: (
      <>
        <p>
          The Asset Management module provides end-to-end visibility and
          tracking of customer's assets - with options to add unlimited assets
          per lease, manage depreciation, insurance and taxes for each asset.
        </p>

        <strong>Asset Tracking Features:</strong>
        <ul>
          <li>Unlimited assets per lease</li>
          <li>Depreciation management and tracking</li>
          <li>Insurance tracking and management</li>
          <li>Tax management for each asset</li>
          <li>Asset registration and documentation</li>
          <li>End-to-end visibility of customer assets</li>
        </ul>

        <strong>Backend Operations:</strong>
        <p>
          A robust backend handles all the functions related to contract
          termination, asset repossession, criminal litigation and enforcement
          process.
        </p>
      </>
    ),
  },
  {
    key: "reporting",
    title: "Reporting & MIS",
    content: (
      <>
        <p>
          A powerful reporting system provides detailed MIS reports. The system
          supports decision-making in the lending lifecycle to banks and
          financial services companies.
        </p>

        <strong>Reporting Capabilities:</strong>
        <ul>
          <li>Detailed MIS Reports</li>
          <li>Profit & Loss Statements</li>
          <li>Balance Sheet Reports</li>
          <li>Delinquency Reports</li>
          <li>Portfolio Performance Analytics</li>
          <li>Custom Report Generation</li>
        </ul>

        <strong>Decision Support:</strong>
        <p>
          The system will help to support decision-making in the lending
          lifecycle to banks and financial services companies. The system
          enables banks to improve the agility, transparency and efficiency of
          their lending solutions.
        </p>
      </>
    ),
  },
  {
    key: "crm",
    title: "CRM & Search",
    content: (
      <>
        <p>
          The user is greeted with search screen with multiple search options
          to search by prospect, customer, credit line. Aara Tech's Leasing
          System is built using state of the art technologies and will have
          features that are best in the leasing industry.
        </p>

        <strong>CRM Features:</strong>
        <ul>
          <li>Multi-criteria search by prospect, customer, credit line</li>
          <li>Credit line establishment and management</li>
          <li>Customer relationship tracking</li>
          <li>Prospect management and conversion</li>
          <li>Payment management and invoice issuance</li>
        </ul>

        <strong>Technology:</strong>
        <p>
          The product is run as a web based application which can be accessed
          anywhere using a browser. Aara Tech's Leasing System is built on the
          latest technologies and is fully customizable for your business.
        </p>
      </>
    ),
  },
];

/* ================= WHY CHOOSE TABS ================= */
const chooseUsTabs = [
  {
    key: "different",
    title: "What Makes Us Different",
    list: [
      {
        label: "Fully Customizable",
        description:
          "Parameter-driven configuration lets you adapt the system to your business needs and workflows.",
      },
      {
        label: "Web Based",
        description:
          "Browser-based deployment reduces infrastructure expenses and can be accessed anywhere.",
      },
      {
        label: "Workflow Oriented",
        description:
          "User friendly GUI with user defined screens and workflow oriented processing makes complex processes look simple.",
      },
      {
        label: "Easy Integration",
        description:
          "Smooth migration from legacy systems ensures your data and processes stay functional.",
      },
      {
        label: "Proven Expertise",
        description:
          "14+ years in banking and financial tech delivering reliable and high-performing solutions.",
      },
    ],
  },
  {
    key: "why",
    title: "Why Choose Aara Tech?",
    list: [
      {
        label: "Flagship Product",
        description:
          "Our Leasing System is our flagship product providing an end-to-end leasing solution with a robust feature set.",
      },
      {
        label: "Industry Experts",
        description:
          "Developed by functional experts in the Leasing and Equipment Finance industry.",
      },
      {
        label: "Scalable & Secure",
        description:
          "Serves various sizes of industries, from SMEs to Fortune 500 companies.",
      },
      {
        label: "Continuous Evolution",
        description:
          "We continually take feedback from customers to ensure our product is updated based on evolving requirements.",
      },
      {
        label: "Proven Track Record",
        description:
          "Providing highly customizable technology solutions for Fortune 500 Banks and Financial Institutions for well over a decade.",
      },
    ],
  },
];

const LeasingPage = () => {
  const { content: sections } = usePageContent("leasing");
  const [activeFeatureTab, setActiveFeatureTab] = useState("lease-mgmt");
  const [activeChooseTab, setActiveChooseTab] = useState("different");

  const currentChooseTab = chooseUsTabs.find(
    (tab) => tab.key === activeChooseTab
  );

  return (
    <div className="leasing-scope">
      {/* ================= HERO ================= */}
      <section className="leasing-hero">
        <div className="hero-overlay" />
        <h1 className="hero-main-title">
          {sections.hero?.heading ?? (<>Leasing <span>System</span></>)}
        </h1>
        <p className="hero-description">
          {sections.hero?.description ?? "A web based CRM & lease/loan origination software, optimized for the Equipment Finance & Leasing Industry. Our flagship product providing an end-to-end leasing solution."}
        </p>
        <div className="hero-badges">
          {(sections.hero?.badges ?? ["Equipment Finance", "Vehicle Leasing", "Industrial Machines", "Corporate Loans"]).map((badge: string, index: number) => (
            <span className="hero-badge-item" key={index}>{badge}</span>
          ))}
        </div>
      </section>

      {/* ================= OVERVIEW SECTION ================= */}
      <section className="leasing-section-2 split-section-2">
        <div className="section-header-2">
          <span className="section-label-2">{sections.overview?.label ?? "Our Flagship Product"}</span>
          <h2 className="section-headline-2">
            <span className="title-red-2">{sections.overview?.headingRed ?? "Aara Tech's"}</span>{" "}
            <span className="title-blue-2">{sections.overview?.headingBlue ?? "Leasing System"}</span>
          </h2>
          <div className="headline-underline-2"></div>
        </div>

        <div className="split-container-2">
          <div className="split-text-2">
            <p className="split-body-2">
              {sections.overview?.description ?? "Aara Tech Group has been providing highly customizable technology solutions for Fortune 500 Banks and Financial Institutions for well over a decade. Aara Tech's Leasing System is our flagship product which provides an end-to-end leasing solution, with a robust feature set which can support the needs of the Equipment Finance and Leasing Industry."}
            </p>

            <p className="split-body-2">
              Aara Tech's Leasing Solution simplifies every part of Lease and
              Asset Management - from Lease Initiation, Contract Preparation,
              Asset Management including Registration and Insurance, Account
              Receivables to Lease Closure. The product is run as a web based
              application which can be accessed anywhere using a browser.
            </p>

            <p className="split-body-2">
              Aara Tech's Leasing System is built on the latest technologies
              and is fully customizable for your business. The system is able to
              serve various sizes of industries, including SMEs to large
              corporations, state enterprises and subsidiaries of multinational
              companies.
            </p>
          </div>

          <div className="split-image-2">
            <img src={INDUSTRIES.approachImg} alt="Leasing System" />
            <div className="cen">
              <button className="request-demo-btn">Request Demo</button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CORE MODULES ================= */}
      <section className="leasing-section-2">
        <div className="section-container-2">
          <div className="section-header-2">
            <span className="section-label-2">Core Modules</span>
            <h2 className="section-headline-2">
              <span className="title-red-2">End-to-End</span>{" "}
              <span className="title-blue-2">Leasing Lifecycle</span>
            </h2>
            <div className="headline-underline-2"></div>
          </div>

          <div className="features-grid-2">
            <div className="feature-card-2">
              <div className="card-header-2">
                <div className="icon-box-2">
                  <FiFileText />
                </div>
                <h3>Lease Initiation</h3>
              </div>
              <p>
                Initiate leases with streamlined workflows for equipment,
                vehicles and industrial machines across multiple portfolios.
              </p>
            </div>

            <div className="feature-card-2">
              <div className="card-header-2">
                <div className="icon-box-2">
                  <FiSettings />
                </div>
                <h3>Contract Preparation</h3>
              </div>
              <p>
                Prepare and manage lease contracts with parameter-driven
                configuration and workflow oriented processing.
              </p>
            </div>

            <div className="feature-card-2">
              <div className="card-header-2">
                <div className="icon-box-2">
                  <FiTruck />
                </div>
                <h3>Asset Management</h3>
              </div>
              <p>
                End-to-end visibility and tracking with unlimited assets per
                lease, depreciation, insurance and tax management.
              </p>
            </div>

            <div className="feature-card-2">
              <div className="card-header-2">
                <div className="icon-box-2">
                  <FiDollarSign />
                </div>
                <h3>Account Receivables</h3>
              </div>
              <p>
                Powerful system handling PDC, payment processing, delinquency,
                accruals, amortization and G/L posting.
              </p>
            </div>

            <div className="feature-card-2">
              <div className="card-header-2">
                <div className="icon-box-2">
                  <FiBarChart2 />
                </div>
                <h3>Reporting & MIS</h3>
              </div>
              <p>
                Detailed MIS reports including Profit & Loss statements,
                balance sheets and portfolio performance analytics.
              </p>
            </div>

            <div className="feature-card-2">
              <div className="card-header-2">
                <div className="icon-box-2">
                  <FiShield />
                </div>
                <h3>Lease Closure</h3>
              </div>
              <p>
                Complete lifecycle management including contract termination,
                asset repossession, litigation and enforcement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURE TABS SECTION ================= */}
      <section className="it-services-section leasing-section-2 split-section-2">
        <div className="section-header-2">
          <span className="section-label-2">Product Features</span>
          <h2 className="section-headline-2">
            <span className="title-red-2">Explore</span>{" "}
            <span className="title-blue-2">System Features</span>
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

      {/* ================= KEY HIGHLIGHTS ================= */}
      <section className="leasing-section-2 split-section-2">
        <div className="section-header-2">
          <span className="section-label-2">Key Highlights</span>
          <h2 className="section-headline-2">
            <span className="title-red-2">Built for</span>{" "}
            <span className="title-blue-2">Equipment Finance</span>
          </h2>
          <div className="headline-underline-2"></div>
        </div>

        <div className="split-container-2">
          <div className="split-image-2">
            <img src={INDUSTRIES.service} alt="Leasing Highlights" />
          </div>

          <div className="split-text-2">
            <div className="info-box-2">
              <h3>Parameter Driven & Configurable</h3>
              <p>
                Aara Tech's Leasing System is completely parameter driven, and
                can be configured to suit your business needs. User friendly
                graphical user interface, with user defined screens and workflow
                oriented processing, makes complex processes look simple.
              </p>
            </div>

            <div className="info-box-2">
              <h3>Built by Industry Experts</h3>
              <p>
                Aara Tech's Leasing System is developed by functional experts in
                the Leasing and Equipment Finance industry. We continually take
                feedback from our customers to ensure that our product is updated
                based on evolving requirements.
              </p>
            </div>

            <div className="info-box-2">
              <h3>Increase Productivity & Profit</h3>
              <p>
                Aara Tech's Leasing System will increase user productivity,
                reduce errors and increase your profit margins!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= INDUSTRIES SERVED ================= */}
      <section className="leasing-section-2">
        <div className="section-container-2">
          <div className="section-header-2">
            <span className="section-label-2">Industries Served</span>
            <h2 className="section-headline-2">
              <span className="title-red-2">Who</span>{" "}
              <span className="title-blue-2">We Serve</span>
            </h2>
            <div className="headline-underline-2"></div>
          </div>

          <div className="features-grid-2 industries-grid-3">
            <div className="feature-card-2">
              <div className="card-header-2">
                <div className="icon-box-2">
                  <FiDatabase />
                </div>
                <h3>SMEs</h3>
              </div>
              <p>
                Small and medium enterprises looking for efficient equipment
                leasing and finance management solutions.
              </p>
            </div>

            <div className="feature-card-2">
              <div className="card-header-2">
                <div className="icon-box-2">
                  <FiGlobe />
                </div>
                <h3>Large Corporations</h3>
              </div>
              <p>
                State enterprises and subsidiaries of multinational companies
                requiring scalable leasing platforms.
              </p>
            </div>

            <div className="feature-card-2">
              <div className="card-header-2">
                <div className="icon-box-2">
                  <FiUsers />
                </div>
                <h3>Banks & Financial Institutions</h3>
              </div>
              <p>
                Fortune 500 Banks and Financial Institutions for equipment
                finance and leasing operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="leasing-section-2 split-section-2 choose-us-section">
        <div className="section-header-2">
          <span className="section-label-2">Why Choose Us?</span>
          <h2 className="section-headline-2">
            <span className="title-red-2">Why</span>{" "}
            <span className="title-blue-2">Choose AaraTech?</span>
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
            <img src={INDUSTRIES.service} alt="Why Choose Us" />
          </div>
        </div>
      </section>

      {/* ================= FOOTER CTA ================= */}
      <section className="footer-cta-section">
        <div className="footer-cta-container">
          <h2 className="footer-cta-headline">
            {sections.cta?.heading ?? "What can we help you to achieve today?"}
          </h2>
          <p className="footer-cta-subtext">
            {sections.cta?.description ?? "Partner with AaraTech to modernize your Equipment Finance and Leasing operations."}
          </p>
          <button className="footer-cta-btn">{sections.cta?.buttonText ?? "CONTACT"}</button>
        </div>
      </section>
    </div>
  );
};

export default LeasingPage;