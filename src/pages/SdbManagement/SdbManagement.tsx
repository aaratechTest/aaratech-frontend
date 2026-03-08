import { useState } from "react";
import { PRODUCTS,INDUSTRIES  } from "../../constants/Assets";
import { usePageContent } from "../../hooks/usePageContent";

import {
  FiBox,
  FiDollarSign,
  FiUserCheck,
  FiAlertCircle,
  FiFileText,
  FiSettings,
  FiShield,
  FiDatabase,
  FiGlobe,
  FiUsers,
  FiLock,
  FiZap,
} from "react-icons/fi";
import "./SdbManagement.css";

/* ================= FEATURE TABS DATA ================= */
const featureTabs = [
  {
    key: "inventory",
    title: "Inventory Setup",
    content: (
      <>
        <p>
          Easy transfer of existing inventory from bank branches to system. Easy
          configuration and customisable rates for various box sizes. SECUREBOX
          automates renting safe deposit boxes of different sizes, offer
          discounts, add multiple co-signers, verify signature or photo-ID
          before box access, and much more.
        </p>

        <strong>Inventory Management Features:</strong>
        <ul>
          <li>Easy transfer of existing inventory from bank branches to system</li>
          <li>Easy configuration and customisable rates for various box sizes</li>
          <li>Add multiple co-signers per box</li>
          <li>Maintenance of damaged boxes</li>
          <li>Real-time box availability tracking across branches</li>
        </ul>

        <strong>Flexibility:</strong>
        <p>
          Designed to easily interface with core banking systems and third party
          software for access control and document scanning systems.
        </p>
      </>
    ),
  },
  {
    key: "rental",
    title: "Rental Rates & Discounts",
    content: (
      <>
        <p>
          AaraTech's SECUREBOX system allows for discounts on box rates and
          dynamic pricing at box level for a particular branch. The system
          supports flexible pricing configurations to maximize box rentals and
          revenue.
        </p>

        <strong>Pricing Features:</strong>
        <ul>
          <li>Dynamic pricing at box level for a particular branch</li>
          <li>Add discount on account and branch level</li>
          <li>Customisable rates for various box sizes</li>
          <li>Real-time configuration changes</li>
          <li>Parameter driven pricing management</li>
        </ul>

        <strong>Business Case:</strong>
        <p>
          Attract new customer segments and better control over
          delinquent/forecast boxes. To improve income/revenues and also
          customer service.
        </p>
      </>
    ),
  },
  {
    key: "access",
    title: "Box Rental & Access",
    content: (
      <>
        <p>
          Customer Information can be retrieved from core banking system or can
          be entered and stored directly to the SECUREBOX system. Access to box
          is based on photo/signature verification. Safe Deposit Box Access can
          be restricted based on court and legal cases.
        </p>

        <strong>Access Control Features:</strong>
        <ul>
          <li>Photo-ID / Signature verification before box access</li>
          <li>Customer information retrieval from core banking system</li>
          <li>Access restriction based on court and legal cases</li>
          <li>Multiple co-signers support</li>
          <li>Electronic audit trail at application and system level</li>
          <li>Different access levels for users (Admin, HQ User, Branch User)</li>
        </ul>

        <strong>Security:</strong>
        <p>
          In-built security features with different access levels for users and
          electronic audit trail at application and system level.
        </p>
      </>
    ),
  },
  {
    key: "delinquency",
    title: "Delinquency Follow-up",
    content: (
      <>
        <p>
          Late notices on delinquent accounts can be generated based on banking
          institution's policies. Option to send SMS reminders automatically
          once certain triggers are met.
        </p>

        <strong>Delinquency Management:</strong>
        <ul>
          <li>Late notices generation based on banking institution's policies</li>
          <li>Automatic SMS reminders on trigger events</li>
          <li>Export notices and reminders to third party SMS and Email providers</li>
          <li>Customers get notified on annual fee payments</li>
          <li>Better control over delinquent/forecast boxes</li>
        </ul>

        <strong>Notifications:</strong>
        <p>
          Customers get notified on annual fee payments. Export notices and
          reminders to third party SMS and Email providers for seamless
          communication.
        </p>
      </>
    ),
  },
  {
    key: "reports",
    title: "Reports & Audit",
    content: (
      <>
        <p>
          SECUREBOX has a customisable reports engine which helps you keep track
          of delinquent customers and can be exported in various different
          formats. Track and monitor activities within the safe deposit box for
          enhanced transparency and accountability.
        </p>

        <strong>Reporting Features:</strong>
        <ul>
          <li>Customisable reports engine</li>
          <li>Delinquent customer tracking reports</li>
          <li>Export reports in various formats</li>
          <li>Real-time enquiry and reports generation</li>
          <li>Audit trail and G/L maintenance</li>
          <li>Real-time operations and cash updates</li>
        </ul>

        <strong>Audit Trail:</strong>
        <p>
          Electronic audit trail at application and system level ensures
          complete transparency and accountability for all safe deposit box
          operations.
        </p>
      </>
    ),
  },
];

/* ================= WHY CHOOSE TABS ================= */
const chooseUsTabs = [
  {
    key: "benefits",
    title: "Customer Benefits",
    list: [
      {
        label: "Flexibility",
        description:
          "Designed to easily interface with core banking systems and third party software for access control and document scanning systems.",
      },
      {
        label: "Improved Customer Service",
        description:
          "Real-time access to Customer history and Box inventory, provides staff easy access to valuable information to serve customers better.",
      },
      {
        label: "Simple & Straightforward",
        description:
          "Responsive and fluid user interface with simple and straightforward menus and UI.",
      },
      {
        label: "Configurable",
        description:
          "Parameter driven, configuration changes can be made in real-time.",
      },
      {
        label: "Real-Time Updates",
        description:
          "Real-time operations and cash updates. Real-time enquiry and reports generation.",
      },
    ],
  },
  {
    key: "why",
    title: "Why Choose SecureBox?",
    list: [
      {
        label: "Platform Independent",
        description:
          "Developed using the latest technologies and is run as a web-based application that can run on any platform with a compatible browser.",
      },
      {
        label: "Banking Expertise",
        description:
          "AaraTech Group has been serving banks and financial institutions for 14+ years. Product developed as result of year-long study of needs of banks and branches.",
      },
      {
        label: "Security",
        description:
          "Different access levels for users (Admin, HQ User, Branch User). Electronic audit trail at application and system level.",
      },
      {
        label: "Tailored Solutions",
        description:
          "Customize features to suit your Banking, Jewelleries, and NBFC needs.",
      },
      {
        label: "Scalable Growth",
        description:
          "Scale your storage capacity as your business expands, without compromising on security.",
      },
    ],
  },
];

const SDBManagementPage = () => {
  const { content: sections } = usePageContent("sdb-management");
  const [activeFeatureTab, setActiveFeatureTab] = useState("inventory");
  const [activeChooseTab, setActiveChooseTab] = useState("benefits");

  const currentChooseTab = chooseUsTabs.find(
    (tab) => tab.key === activeChooseTab
  );

  return (
    <div className="sdb-scope">
      {/* ================= HERO ================= */}
      <section className="sdb-hero">
        <div className="hero-overlay" />
        <h1 className="hero-main-title">
          {sections.hero?.heading ?? "SecureBox \u2013 Safe Deposit Box Management"}
        </h1>
        <p className="hero-description">
          {sections.hero?.description ?? "An end-to-end software solution for safe deposit box systems that can automate your entire safe deposit box operations, from inventory setup to box rentals to delinquency follow-up."}
        </p>
        <div className="hero-badges">
          {(sections.hero?.badges ?? ["Banking", "Jewelleries", "NBFC", "Financial Services"]).map((badge: string, i: number) => (
            <span className="hero-badge-item" key={i}>{badge}</span>
          ))}
        </div>
      </section>

      {/* ================= OVERVIEW SECTION ================= */}
      <section className="sdb-section-2 split-section-2">
        <div className="section-header-2">
          <span className="section-label-2">{sections.overview?.label ?? "Our Product"}</span>
          <h2 className="section-headline-2">
            {sections.overview?.heading ?? <><span className="title-red-2">Automated Safe Deposit</span>{" "}<span className="title-blue-2">Box Management</span></>}
          </h2>
          <div className="headline-underline-2"></div>
        </div>

        <div className="split-container-2">
          <div className="split-text-2">
            <p className="split-body-2">
              Safe deposit boxes are primarily used for storing valuable
              documents and precious assets. The administration of these boxes,
              however, can be quite cumbersome and time consuming, more so if
              you are working with paper and spreadsheet based management
              systems.
            </p>

            <p className="split-body-2">
              AaraTech's SECUREBOX application is an end-to-end software
              solution for safe deposit box systems that can automate your
              entire safe deposit box operations, from inventory setup to box
              rentals to delinquency follow-up. SECUREBOX automates renting
              safe deposit boxes of different sizes, offer discounts, add
              multiple co-signers, verify signature or photo-ID before box
              access, and much more.
            </p>

            <p className="split-body-2">
              Developed with functional experts in financial industry. Proven
              product, based on marketplace experience. Fully configurable to
              comply with bank specific requirements.
            </p>
          </div>

          <div className="split-image-2">
            <img src={PRODUCTS.safebox} alt="SecureBox Safe Deposit Box" />
            <div className="cen">
              <button className="request-demo-btn">Request Demo</button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CORE FEATURES ================= */}
      <section className="sdb-section-2">
        <div className="section-container-2">
          <div className="section-header-2">
            <span className="section-label-2">Core Features</span>
            <h2 className="section-headline-2">
              <span className="title-red-2">Complete</span>{" "}
              <span className="title-blue-2">SDB Operations</span>
            </h2>
            <div className="headline-underline-2"></div>
          </div>

          <div className="features-grid-2">
            <div className="feature-card-2">
              <div className="card-header-2">
                <div className="icon-box-2">
                  <FiBox />
                </div>
                <h3>Inventory Setup</h3>
              </div>
              <p>
                Easy transfer of existing inventory from bank branches to
                system. Easy configuration and customisable rates for various
                box sizes.
              </p>
            </div>

            <div className="feature-card-2">
              <div className="card-header-2">
                <div className="icon-box-2">
                  <FiDollarSign />
                </div>
                <h3>Rental Rates</h3>
              </div>
              <p>
                Discounts on box rates and dynamic pricing at box level for a
                particular branch. Add discount on account and branch level.
              </p>
            </div>

            <div className="feature-card-2">
              <div className="card-header-2">
                <div className="icon-box-2">
                  <FiUserCheck />
                </div>
                <h3>Box Rental & Access</h3>
              </div>
              <p>
                Photo-ID / Signature verification before box access. Access
                restriction based on court and legal cases.
              </p>
            </div>

            <div className="feature-card-2">
              <div className="card-header-2">
                <div className="icon-box-2">
                  <FiAlertCircle />
                </div>
                <h3>Delinquency Follow-up</h3>
              </div>
              <p>
                Late notices on delinquent accounts based on banking
                institution's policies. Automatic SMS reminders on triggers.
              </p>
            </div>

            <div className="feature-card-2">
              <div className="card-header-2">
                <div className="icon-box-2">
                  <FiFileText />
                </div>
                <h3>Reports</h3>
              </div>
              <p>
                Customisable reports engine to track delinquent customers.
                Export reports in various different formats.
              </p>
            </div>

            <div className="feature-card-2">
              <div className="card-header-2">
                <div className="icon-box-2">
                  <FiShield />
                </div>
                <h3>Security & Audit</h3>
              </div>
              <p>
                Different access levels for users. Electronic audit trail at
                application and system level. G/L maintenance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURE TABS SECTION ================= */}
      <section className="it-services-section sdb-section-2 split-section-2">
        <div className="section-header-2">
          <span className="section-label-2">Explore Features</span>
          <h2 className="section-headline-2">
            <span className="title-red-2">SecureBox</span>{" "}
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

      {/* ================= KEY HIGHLIGHTS ================= */}
      <section className="sdb-section-2 split-section-2">
        <div className="section-header-2">
          <span className="section-label-2">Functionalities Achieved</span>
          <h2 className="section-headline-2">
            <span className="title-red-2">What</span>{" "}
            <span className="title-blue-2">SECUREBOX Delivers</span>
          </h2>
          <div className="headline-underline-2"></div>
        </div>

        <div className="split-container-2">
          <div className="split-image-2">
            <img src={INDUSTRIES.service} alt="SecureBox Features" />
          </div>

          <div className="split-text-2">
            <div className="info-box-2">
              <h3>Complete Automation of Locker Management</h3>
              <p>
                Completion automation of Locker Management with workflow driven
                processes, from contract creation until termination with
                multiple roles.
              </p>
            </div>

            <div className="info-box-2">
              <h3>KYC, AML Checks & 30+ API Integrations</h3>
              <p>
                Enabled KYC, AML checks and 30+ API integration. Supports
                third party integrations with client preferred partners for
                payment, notifications, signature validation, document
                validation and core Banking or other CRMs.
              </p>
            </div>

            <div className="info-box-2">
              <h3>Parameter Driven & Configurable</h3>
              <p>
                Parameter driven, configuration changes can be made in
                real-time. Fully configurable to comply with bank specific and
                regulatory requirements. Leveraged MVC and Web API architecture
                style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ADDITIONAL FEATURES ================= */}
      <section className="sdb-section-2">
        <div className="section-container-2">
          <div className="section-header-2">
            <span className="section-label-2">And Many More</span>
            <h2 className="section-headline-2">
              <span className="title-red-2">Additional</span>{" "}
              <span className="title-blue-2">Capabilities</span>
            </h2>
            <div className="headline-underline-2"></div>
          </div>

          <div className="features-grid-2 industries-grid-3">
            <div className="feature-card-2">
              <div className="card-header-2">
                <div className="icon-box-2">
                  <FiUsers />
                </div>
                <h3>Multiple Co-signers</h3>
              </div>
              <p>
                Add multiple co-signers per box with photo-ID and signature
                verification for each co-signer.
              </p>
            </div>

            <div className="feature-card-2">
              <div className="card-header-2">
                <div className="icon-box-2">
                  <FiGlobe />
                </div>
                <h3>Platform Independent</h3>
              </div>
              <p>
                Developed using the latest technologies. Can be run on any
                platform with a compatible browser as a web-based application.
              </p>
            </div>

            <div className="feature-card-2">
              <div className="card-header-2">
                <div className="icon-box-2">
                  <FiDatabase />
                </div>
                <h3>Seamless Integration</h3>
              </div>
              <p>
                Easily integrate with existing core banking systems, access
                control and document scanning systems for a smooth workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="sdb-section-2 split-section-2 choose-us-section">
        <div className="section-header-2">
          <span className="section-label-2">Why Choose Us?</span>
          <h2 className="section-headline-2">
            <span className="title-red-2">Why</span>{" "}
            <span className="title-blue-2">Choose SecureBox?</span>
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
            <img src={INDUSTRIES.service} alt="Why Choose SecureBox" />
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
            Contact us for a live demo of AaraTech's SecureBox Safe Deposit Box
            Management Solution.
          </p>
          <button className="footer-cta-btn">{sections.cta?.buttonText ?? "CONTACT"}</button>
        </div>
      </section>
    </div>
  );
};

export default SDBManagementPage;