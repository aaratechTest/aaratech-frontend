import { useState } from "react";
import { Link } from "react-router-dom";
import "./LendingSolutions.css";
import { PRODUCTS, INDUSTRIES } from "../../constants/Assets";
import { usePageContent } from "../../hooks/usePageContent";

/* ================= MODULE DATA ================= */
const modules = [
  {
    icon: "📋",
    title: "Loan Origination",
    desc: "End-to-end loan origination from application capture, credit assessment, to approval and disbursement with automated workflows.",
  },
  {
    icon: "📊",
    title: "Credit Line Management",
    desc: "Establish and manage credit lines with multiple search options by prospect, customer, or existing credit facilities.",
  },
  {
    icon: "💰",
    title: "Accounts Receivable",
    desc: "Powerful AR system handling PDC, payment processing, delinquency tracking, accruals, amortization, and G/L posting.",
  },
  {
    icon: "🏢",
    title: "Asset Management",
    desc: "End-to-end visibility and tracking of customer assets with depreciation, insurance, and tax management per asset.",
  },
  {
    icon: "📄",
    title: "Contract Management",
    desc: "Complete contract lifecycle from preparation and execution to termination, with full audit trail and compliance tracking.",
  },
  {
    icon: "📈",
    title: "Financial Reporting",
    desc: "Comprehensive P&L statements, balance sheets, amortization schedules, and regulatory reporting built into the platform.",
  },
];

/* ================= LIFECYCLE DATA ================= */
const lifecycle = [
  { step: "1", title: "Prospect", desc: "Lead capture & qualification" },
  { step: "2", title: "Assess", desc: "Credit evaluation & scoring" },
  { step: "3", title: "Approve", desc: "Decision & authorization" },
  { step: "4", title: "Disburse", desc: "Funding & contract execution" },
  { step: "5", title: "Service", desc: "Repayment & asset tracking" },
  { step: "6", title: "Close", desc: "Settlement & reporting" },
];

/* ================= FEATURE TABS DATA ================= */
const featureTabs = [
  {
    key: "origination",
    title: "Loan Origination",
    heading: "Streamlined Loan Origination Process",
    desc: "Aara Tech's Lending Solution provides a comprehensive loan origination system that supports decision-making across the entire lending lifecycle for banks and financial services companies. The system enables banks to improve agility, transparency, and efficiency of their lending operations.",
    checklist: [
      "Automated application processing with configurable workflows",
      "Built-in credit scoring and risk assessment engine",
      "Multi-level approval matrix with role-based access",
      "Digital document collection and verification",
      "Real-time status tracking and notifications",
      "Seamless integration with core banking systems",
    ],
  },
  {
    key: "asset",
    title: "Asset Management",
    heading: "Complete Asset Lifecycle Management",
    desc: "The Asset Management module provides end-to-end visibility and tracking of customer assets — with options to add unlimited assets per loan, manage depreciation, insurance, and taxes for each asset. A robust backend handles all functions related to contract termination, asset repossession, and enforcement processes.",
    checklist: [
      "Unlimited assets per lease or loan contract",
      "Automated depreciation calculations",
      "Insurance tracking and renewal alerts",
      "Tax computation and compliance reporting",
      "Asset repossession and recovery workflows",
      "Complete asset history and audit trail",
    ],
  },
  {
    key: "accounting",
    title: "Accounting System",
    heading: "Powerful Financial Accounting Engine",
    desc: "Aara Tech's Lending Solution is powered by a robust accounting system capable of handling multiple equipment and vehicle loan portfolios. The system manages credit lines, payment processing, invoice generation, and provides comprehensive financial statements and G/L posting.",
    checklist: [
      "Post-dated cheque (PDC) management",
      "Automated accrual and amortization processing",
      "Real-time P&L and balance sheet generation",
      "General Ledger posting and reconciliation",
      "Multi-currency and multi-entity support",
      "Delinquency tracking and escalation workflows",
    ],
  },
  {
    key: "crm",
    title: "CRM & Pipeline",
    heading: "Integrated CRM & Pipeline Management",
    desc: "The user is greeted with a powerful search screen with multiple search options to search by prospect, customer, or credit line. The integrated CRM module helps manage the complete customer journey from initial lead capture through the entire lending lifecycle.",
    checklist: [
      "360-degree customer view with complete history",
      "Lead scoring and prospect prioritization",
      "Automated follow-up and task management",
      "Pipeline analytics and conversion tracking",
      "Communication log and document management",
      "Cross-sell and upsell opportunity identification",
    ],
  },
  {
    key: "compliance",
    title: "Risk & Compliance",
    heading: "Enterprise-Grade Risk & Compliance",
    desc: "Built-in compliance and risk management features ensure your lending operations meet regulatory requirements. The system provides comprehensive audit trails, automated compliance checks, and real-time risk monitoring across all lending activities.",
    checklist: [
      "KYC/AML automated verification workflows",
      "Regulatory compliance reporting (Basel, IFRS)",
      "Real-time fraud detection and monitoring",
      "Configurable risk scoring models",
      "Complete audit trail for all transactions",
      "Data privacy and security controls",
    ],
  },
];

/* ================= WHY CHOOSE DATA ================= */
const whyChoose = [
  {
    icon: "⚙️",
    title: "Fully Parameter-Driven",
    desc: "Completely configurable to suit your business needs. Adapt workflows, rules, and processes without code changes.",
  },
  {
    icon: "🖥️",
    title: "Browser-Based Deployment",
    desc: "Web-based application accessible anywhere via browser, greatly reducing installation and infrastructure costs.",
  },
  {
    icon: "🔄",
    title: "Easy Legacy Integration",
    desc: "Smooth migration from legacy systems ensures your existing data and processes remain fully functional during transition.",
  },
  {
    icon: "👆",
    title: "Intuitive Workflow UI",
    desc: "User-friendly, workflow-oriented screens make complex processes simple with fast adoption across all team members.",
  },
  {
    icon: "🏦",
    title: "14+ Years Banking Expertise",
    desc: "Proven track record serving Fortune 500 banks and financial institutions with highly customizable technology solutions.",
  },
  {
    icon: "📱",
    title: "Scalable Architecture",
    desc: "Enterprise-ready platform that grows with your business, supporting SMEs to large corporations and multinational subsidiaries.",
  },
];

const LendingSolutionsPage = () => {
  const { content: sections } = usePageContent("lending-solutions");
  const [activeFeatureTab, setActiveFeatureTab] = useState("origination");
  const currentFeature = featureTabs.find((t) => t.key === activeFeatureTab);

  return (
    <div className="lending-scope">
      {/* ================= HERO ================= */}
      <section className="lending-hero">
        <div className="lending-hero-content">
          <span className="lending-hero-badge">{sections.hero?.badge ?? "💳 Enterprise Lending Platform"}</span>

          <h1>
            {sections.hero?.heading ?? (<>End-to-End <span>Lending Solutions</span> for Modern Banking</>)}
          </h1>

          <p className="lending-hero-desc">
            {sections.hero?.description ?? "A comprehensive web-based lending and loan origination platform that supports decision-making across the entire lending lifecycle — from prospect management to loan closure — for banks and financial services companies worldwide."}
          </p>

          <div className="lending-hero-actions">
            <button className="btn-lending-primary">{sections.hero?.primaryButton ?? "REQUEST A DEMO"}</button>
            <Link to="/contact">
              <button className="btn-lending-secondary">{sections.hero?.secondaryButton ?? "CONTACT SALES"}</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= STATS BAR ================= */}
      <section className="lending-stats">
        <div className="lending-stats-grid">
          {(sections.stats?.items ?? [
            { number: "14+", label: "Years in Banking" },
            { number: "500+", label: "Financial Institutions" },
            { number: "100%", label: "Web-Based Platform" },
            { number: "6", label: "Core Modules" },
          ]).map((item: any, index: number) => (
            <div className="stat-item" key={index}>
              <span className="stat-number">{item.number}</span>
              <span className="stat-label">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ================= OVERVIEW ================= */}
      <section className="lending-overview">
        <div className="lending-overview-container">
          <div className="lending-overview-text">
            <span className="section-tag">{sections.overview?.tag ?? "Product Overview"}</span>

            <h2>
              {sections.overview?.heading ?? (<>Simplify Every Part of <span>Lending & Loan Management</span></>)}
            </h2>

            <p>
              {sections.overview?.description ?? "Aara Tech's Lending Solution is a web-based CRM and loan origination software built using state-of-the-art technologies. The system helps support decision-making in the lending lifecycle for banks and financial services companies, enabling them to improve agility, transparency, and efficiency."}
            </p>

            <p>
              The platform simplifies every aspect — from loan initiation,
              contract preparation, asset management, accounts receivable, to
              loan closure. It serves various sizes of industries including SMEs,
              large corporations, state enterprises, and subsidiaries of
              multinational companies.
            </p>

            <div className="overview-features">
              <div className="overview-feature">
                <span className="overview-feature-icon">✓</span>
                Loan Origination
              </div>
              <div className="overview-feature">
                <span className="overview-feature-icon">✓</span>
                Asset Management
              </div>
              <div className="overview-feature">
                <span className="overview-feature-icon">✓</span>
                Account Receivables
              </div>
              <div className="overview-feature">
                <span className="overview-feature-icon">✓</span>
                Contract Management
              </div>
              <div className="overview-feature">
                <span className="overview-feature-icon">✓</span>
                Financial Reporting
              </div>
              <div className="overview-feature">
                <span className="overview-feature-icon">✓</span>
                Compliance & Risk
              </div>
            </div>
          </div>

          <div className="lending-overview-visual">
            <img src={PRODUCTS.lending} alt="Aara Tech Lending Solutions" />
            <div className="overview-float-card">
              <div className="float-icon">🏦</div>
              <div className="float-text">
                <strong>Fortune 500 Ready</strong>
                <span>Serving top-tier banks globally</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MODULES ================= */}
      <section className="lending-modules">
        <div className="lending-modules-header">
          <span className="section-tag">Core Modules</span>
          <h2>
            Comprehensive <span>Lending Modules</span>
          </h2>
          <p>
            Six powerful modules working together to deliver a complete
            end-to-end lending solution for your institution.
          </p>
          <div className="underline-bar"></div>
        </div>

        <div className="modules-grid">
          {modules.map((mod, index) => (
            <div className="module-card" key={index}>
              <div className="module-icon">{mod.icon}</div>
              <h3>{mod.title}</h3>
              <p>{mod.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= LIFECYCLE ================= */}
      <section className="lending-lifecycle">
        <div className="lending-lifecycle-header">
          <h2>Lending Lifecycle</h2>
          <p>
            A structured six-stage process covering the complete lending journey
            from initial prospect to final loan closure.
          </p>
        </div>

        <div className="lifecycle-grid">
          {lifecycle.map((item, index) => (
            <div className="lifecycle-step" key={index}>
              <div className="lifecycle-step-number">{item.step}</div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURES DETAIL ================= */}
      <section className="lending-features">
        <div className="lending-features-header">
          <span className="section-tag">Detailed Features</span>
          <h2>
            Explore <span>Platform Capabilities</span>
          </h2>
          <p>
            Deep dive into each module's features designed for enterprise-grade
            lending operations.
          </p>
          <div className="underline-bar"></div>
        </div>

        <div className="features-tabs">
          {featureTabs.map((tab) => (
            <button
              key={tab.key}
              className={`feature-tab ${activeFeatureTab === tab.key ? "active" : ""}`}
              onClick={() => setActiveFeatureTab(tab.key)}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className="features-content">
          <div className="features-text">
            <h3>{currentFeature?.heading}</h3>
            <p>{currentFeature?.desc}</p>
            <ul className="features-checklist">
              {currentFeature?.checklist.map((item, idx) => (
                <li key={idx}>
                  <span className="check-icon">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="features-visual">
            <img src={INDUSTRIES.service} alt="Lending Features" />
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE ================= */}
      <section className="lending-why">
        <div className="lending-why-header">
          <span className="section-tag">Why Aara Tech</span>
          <h2>
            Why Choose <span>Our Lending Platform?</span>
          </h2>
          <div className="underline-bar"></div>
        </div>

        <div className="why-grid">
          {whyChoose.map((item, index) => (
            <div className="why-card" key={index}>
              <div className="why-card-icon">{item.icon}</div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= INTEGRATION ================= */}
      <section className="lending-integration">
        <div className="lending-integration-container">
          <div className="integration-visual">
            <img src={PRODUCTS.lending} alt="System Integration" />
          </div>

          <div className="integration-text">
            <span className="section-tag">Integration</span>
            <h2>
              Seamless <span>System Integration</span>
            </h2>
            <p>
              Aara Tech's Lending Solution is designed for easy integration with
              your existing infrastructure, ensuring smooth data migration from
              legacy systems and seamless connectivity with core banking
              platforms.
            </p>

            <ul className="integration-list">
              <li>
                <div className="integration-bullet"></div>
                <div>
                  <strong>Core Banking Integration</strong>
                  <span>
                    Connect seamlessly with major core banking systems for
                    real-time data synchronization.
                  </span>
                </div>
              </li>
              <li>
                <div className="integration-bullet"></div>
                <div>
                  <strong>Legacy Data Migration</strong>
                  <span>
                    Easy migration from existing systems ensuring data integrity
                    and process continuity.
                  </span>
                </div>
              </li>
              <li>
                <div className="integration-bullet"></div>
                <div>
                  <strong>Third-Party Services</strong>
                  <span>
                    API-based connectivity with credit bureaus, KYC providers,
                    and payment gateways.
                  </span>
                </div>
              </li>
              <li>
                <div className="integration-bullet"></div>
                <div>
                  <strong>Regulatory Reporting</strong>
                  <span>
                    Built-in compliance reporting for Basel, IFRS, and local
                    regulatory requirements.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="lending-cta">
        <div className="lending-cta-content">
          <h2>{sections.cta?.heading ?? "Ready to Transform Your Lending Operations?"}</h2>
          <p>
            {sections.cta?.description ?? "Partner with Aara Tech to deploy a modern, scalable lending platform that drives efficiency and growth."}
          </p>
          <Link to="/contact">
            <button className="btn-cta-white">{sections.cta?.buttonText ?? "GET STARTED TODAY"}</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LendingSolutionsPage;