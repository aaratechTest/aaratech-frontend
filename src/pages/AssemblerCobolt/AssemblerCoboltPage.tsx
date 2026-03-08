import { useState } from "react";
import { usePageContent } from "../../hooks/usePageContent";
import {
  FiCode,
  FiCpu,
  FiCheckCircle,
  FiZap,
  FiShield,
  FiDollarSign,
  FiLayers,
  FiRefreshCw,
  FiTrendingUp,
  FiTarget,
  FiBook,
  FiSettings,
  FiAward,
  FiGlobe,
} from "react-icons/fi";
import { PRODUCTS,INDUSTRIES  } from "../../constants/Assets";
import "./AssemblerCoboltPage.css";

/* ================= SIDEBAR MENU ITEMS ================= */
const sidebarMenu = [
  { key: "overview", title: "Overview", icon: FiLayers },
  { key: "features", title: "Key Features", icon: FiSettings },
  { key: "how-it-works", title: "How It Works", icon: FiRefreshCw },
  { key: "benefits", title: "Benefits", icon: FiTrendingUp },
  { key: "use-cases", title: "Use Cases", icon: FiTarget },
  { key: "why-aaratech", title: "Why Aara Tech", icon: FiAward },
  { key: "glossary", title: "Glossary", icon: FiBook },
];

/* ================= GLOSSARY DATA (A-Z) — Instruction Mnemonics ================= */
const glossaryData: Record<string, string[]> = {
  A: ["A", "ABEND", "AH", "AHI", "AP", "AR", "ASMLEAVE", "AY"],
  B: [
    "B", "BAL", "BALR", "BAS", "BASR", "BC", "BCR",
    "BCT", "BCTR", "BE", "BER", "BH", "BHLR", "BHR",
    "BL", "BLR", "BM", "BMR", "BNE", "BNER", "BNH",
    "BNHR", "BNL", "BNLR", "BNM", "BNMR", "BNO", "BNOR",
    "BNP", "BNPR", "BNZ", "BNZR", "BO", "BOR", "BP",
    "BPR", "BR", "BRC", "BRCT", "BRE", "BRH", "BRL",
    "BRM", "BRNE", "BRNH", "BRNL", "BRNM", "BRNO", "BRNP",
    "BRNZ", "BRO", "BRP", "BRU", "BRXH", "BRXLE", "BRZ",
    "BXH", "BXLE", "BY", "BZ", "BZR",
  ],
  C: [
    "C", "CDS", "CE", "CER", "CF", "CFC", "CFDR", "CFER",
    "CFI", "CFXR", "CG", "CGF", "CGFR", "CGR", "CH",
    "CHI", "CL", "CLC", "CLCL", "CLCLE", "CLI", "CLM",
    "CLR", "CLST", "CP", "CPYA", "CR", "CS", "CUSE",
    "CVB", "CVD", "CVDY",
  ],
  D: [
    "D", "DD", "DDR", "DE", "DER", "DL", "DLG", "DLGR",
    "DLR", "DP", "DR", "DSG", "DSGF", "DSGFR", "DSGR",
    "DXR",
  ],
  E: [
    "EAR", "ED", "EDMK", "EFPC", "EX",
  ],
  F: [
    "FIDR", "FIER", "FIXR",
  ],
  G: [
    "GET", "GETMAIN",
  ],
  I: [
    "IC", "ICM", "IILF", "IILH", "IILL", "IIHF", "IIHH",
    "IIHL", "IPM", "ISKE",
  ],
  L: [
    "L", "LA", "LAE", "LAM", "LARL", "LCDR", "LCER",
    "LCGFR", "LCGR", "LCR", "LCXR", "LD", "LDE", "LDER",
    "LDR", "LDXR", "LE", "LEDR", "LER", "LEXR", "LG",
    "LGF", "LGFR", "LGHI", "LGR", "LH", "LHI", "LLC",
    "LLCR", "LLGC", "LLGCR", "LLGF", "LLGFR", "LLGH",
    "LLGHR", "LLGT", "LLGTR", "LLH", "LLHR", "LLIHF",
    "LLIHH", "LLIHL", "LLILF", "LLILH", "LLILL", "LM",
    "LMG", "LNDR", "LNER", "LNGFR", "LNGR", "LNR",
    "LNXR", "LPDR", "LPER", "LPGFR", "LPGR", "LPR",
    "LPXR", "LR", "LRVG", "LRVGR", "LRVR", "LT", "LTDR",
    "LTER", "LTG", "LTGFR", "LTGR", "LTR", "LTXR", "LXR",
    "LY",
  ],
  M: [
    "M", "MADR", "MAER", "MC", "MD", "MDE", "MDER",
    "MDR", "ME", "MEE", "MEER", "MER", "MG", "MGH",
    "MGHI", "MH", "MHI", "ML", "MLG", "MLGR", "MLR",
    "MP", "MR", "MS", "MSDR", "MSER", "MSFI", "MSG",
    "MSGF", "MSGFR", "MSGR", "MSR", "MVC", "MVCL",
    "MVCLE", "MVCP", "MVCS", "MVI", "MVN", "MVO", "MVZ",
    "MXDR", "MXR", "MY",
  ],
  N: [
    "N", "NC", "NG", "NGR", "NI", "NIHF", "NIHH",
    "NIHL", "NILF", "NILH", "NILL", "NR", "NY",
  ],
  O: [
    "O", "OC", "OG", "OGR", "OI", "OIHF", "OIHH",
    "OIHL", "OILF", "OILH", "OILL", "OR", "OY",
  ],
  P: [
    "PACK", "PKA", "PKU", "PUT",
  ],
  R: [
    "RISBG", "RLL", "RLLG",
  ],
  S: [
    "S", "SAR", "SD", "SDB", "SDBR", "SDR", "SE",
    "SEB", "SEBR", "SER", "SFPC", "SG", "SGF", "SGFR",
    "SGR", "SH", "SHY", "SL", "SLA", "SLAG", "SLB",
    "SLBG", "SLBGR", "SLBR", "SLDA", "SLDL", "SLFI",
    "SLG", "SLGF", "SLGFR", "SLGR", "SLL", "SLLG",
    "SLR", "SLY", "SP", "SPM", "SR", "SRA", "SRAG",
    "SRDA", "SRDL", "SRL", "SRLG", "SRP", "ST", "STC",
    "STCM", "STD", "STE", "STG", "STH", "STHY", "STM",
    "STMG", "STMY", "STY", "SVC", "SXR", "SY",
  ],
  T: [
    "TM", "TMH", "TMHH", "TMHL", "TML", "TMLH", "TMLL",
    "TMY", "TP", "TR", "TRE", "TROO", "TROT", "TRT",
    "TRTE", "TRTO", "TRTR", "TRTT", "TS",
  ],
  U: [
    "UNPK", "UNPKA", "UNPKU",
  ],
  W: [
    "WTO", "WTOR",
  ],
  X: [
    "X", "XC", "XG", "XGR", "XI", "XIHF", "XILF",
    "XR", "XY",
  ],
  Z: [
    "ZAP",
  ],
};

const AssemblerCobolPage = () => {
  const { content: sections } = usePageContent("assembler-cobol");
  const [activeSection, setActiveSection] = useState("overview");
  const [activeGlossaryLetter, setActiveGlossaryLetter] = useState("A");

  const heroSection = sections.hero || {};
  const overviewSection = sections.overview || {};
  const cta = sections.cta || {};

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="asm-scope">
      {/* ================= HERO ================= */}
      <section className="asm-hero">
        <div className="asm-hero-overlay" />
        <div className="asm-hero-content">
          <span className="asm-hero-badge">
            <FiCode size={16} /> {heroSection.badge ?? "Flagship Product"}
          </span>
          <h1>
            {heroSection.heading ?? "Assembler to COBOL "}<span>{heroSection.headingSpan ?? "Conversion Tool"}</span>
          </h1>
          <p className="asm-hero-desc">
            {heroSection.description ?? "Step into the world of seamless code conversion. Modernize your Assembler code base to COBOL with our fully automated, user-friendly tool — preserving business logic while unlocking maintainability and modern integration."}
          </p>
          <div className="asm-hero-buttons">
            <button className="asm-btn-primary" onClick={() => {}}>
              Request a Demo
            </button>
            <button className="asm-btn-secondary" onClick={() => {}}>
              Experience the Tool
            </button>
          </div>
          <div className="asm-hero-stats">
            <div className="asm-stat">
              <strong>500+</strong>
              <span>Programs Converted</span>
            </div>
            <div className="asm-stat">
              <strong>95%+</strong>
              <span>Auto-Conversion Rate</span>
            </div>
            <div className="asm-stat">
              <strong>14+</strong>
              <span>Years Expertise</span>
            </div>
            <div className="asm-stat">
              <strong>30M+</strong>
              <span>Lines Migrated</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT (Sidebar + Content) ================= */}
      <section className="asm-main-section">
        <div className="asm-main-container">
          {/* SIDEBAR */}
          <aside className="asm-sidebar">
            {sidebarMenu.map((item) => (
              <button
                key={item.key}
                className={`asm-sidebar-btn ${activeSection === item.key ? "active" : ""}`}
                onClick={() => setActiveSection(item.key)}
              >
                <item.icon size={18} />
                <span>{item.title}</span>
              </button>
            ))}
          </aside>

          {/* CONTENT PANEL */}
          <div className="asm-content-panel">
            {/* ========== OVERVIEW ========== */}
            {activeSection === "overview" && (
              <div className="asm-content-block">
                <h2>Assembler to COBOL Conversion Tool</h2>
                <p>
                  Aara Tech's proprietary Assembler to COBOL Conversion Tool is
                  a fully automated solution that transforms IBM High Level
                  Assembler (HLASM) programs into clean, maintainable COBOL
                  code. The tool preserves the original business logic,
                  data structures, and program flow while producing
                  well-structured, readable COBOL that meets enterprise coding
                  standards.
                </p>
                <p>
                  We successfully transformed assembler programs into COBOL
                  modules, involving the migration and adaptation of code and
                  functionality from a lower-level assembler language to the
                  more user-friendly COBOL programming language. This transition
                  provides several benefits including improved code readability,
                  enhanced development efficiency, and a shorter learning curve
                  for developers.
                </p>

                <div className="asm-highlight-grid">
                  <div className="asm-highlight-card">
                    <FiCpu size={28} />
                    <h4>Automated Conversion</h4>
                    <p>
                      Our tool automatically converts HLASM source code to
                      standards-compliant COBOL with minimal manual
                      intervention.
                    </p>
                  </div>
                  <div className="asm-highlight-card">
                    <FiShield size={28} />
                    <h4>Logic Preservation</h4>
                    <p>
                      Business logic, conditional flows, and data handling are
                      faithfully preserved during the conversion process.
                    </p>
                  </div>
                  <div className="asm-highlight-card">
                    <FiZap size={28} />
                    <h4>Rapid Turnaround</h4>
                    <p>
                      Convert programs in days, not months. Free 2-week POC for
                      up to 5 programs (max 500 lines each).
                    </p>
                  </div>
                </div>

                <div className="asm-overview-image">
                  <img src={PRODUCTS.cobol} alt="Assembler to COBOL Conversion" />
                </div>
              </div>
            )}

            {/* ========== KEY FEATURES ========== */}
            {activeSection === "features" && (
              <div className="asm-content-block">
                <h2>Key Features</h2>
                <p>
                  Our conversion tool is engineered for enterprise-grade
                  Assembler modernization with industry-leading accuracy and
                  compliance.
                </p>

                <strong>Core Conversion Capabilities</strong>
                <ul>
                  <li>
                    Automatic translation of HLASM instructions to equivalent
                    COBOL statements
                  </li>
                  <li>
                    DSECT to COBOL Copybook conversion with accurate data type
                    mapping
                  </li>
                  <li>
                    Support for PACK, UNPK, TR, TRT, MVC, CLC and all standard
                    instruction sets
                  </li>
                  <li>
                    Macro expansion and inline conversion for complex macro
                    libraries
                  </li>
                  <li>
                    CICS and IMS interface preservation during conversion
                  </li>
                  <li>
                    Automatic register resolution and base-displacement
                    addressing elimination
                  </li>
                </ul>

                <strong>Output Quality</strong>
                <ul>
                  <li>
                    Produces readable, maintainable COBOL code following
                    enterprise naming conventions
                  </li>
                  <li>
                    Cross-reference mapping between source Assembler and
                    generated COBOL
                  </li>
                  <li>
                    Inline comments preserving original Assembler line references
                  </li>
                  <li>
                    Support for IBM Enterprise COBOL, Micro Focus COBOL, and
                    NTT DATA compilers
                  </li>
                </ul>

                <strong>Platform Support</strong>
                <ul>
                  <li>z/OS mainframe-native execution</li>
                  <li>Big-Endian and Little-Endian target support</li>
                  <li>32-bit and 64-bit output modes</li>
                  <li>
                    Compatible with DevOps toolchains for CI/CD integration
                  </li>
                </ul>
              </div>
            )}

            {/* ========== HOW IT WORKS ========== */}
            {activeSection === "how-it-works" && (
              <div className="asm-content-block">
                <h2>How It Works</h2>
                <p>
                  Our systematic approach to Assembler modernization follows a
                  proven lifecycle that minimizes risk and ensures accurate
                  conversion from legacy code to modern COBOL.
                </p>

                <div className="asm-steps-grid">
                  <div className="asm-step-card">
                    <div className="asm-step-number">1</div>
                    <h4>Assess</h4>
                    <p>
                      We kick off each initiative with a complimentary system
                      assessment. Our experts document your business and
                      technical goals, analyze the Assembler codebase, and
                      identify conversion complexity.
                    </p>
                  </div>
                  <div className="asm-step-card">
                    <div className="asm-step-number">2</div>
                    <h4>POC &amp; Design</h4>
                    <p>
                      We offer a free 2-week automated Proof of Concept or
                      conversion of 5 programs (max 500 lines). Upon gaining
                      confidence, we formulate a comprehensive project plan.
                    </p>
                  </div>
                  <div className="asm-step-card">
                    <div className="asm-step-number">3</div>
                    <h4>Convert</h4>
                    <p>
                      We initiate migrating each work item from legacy
                      Assembler to modern COBOL. Following an iterative model,
                      we prioritize flexibility with continuous feedback.
                    </p>
                  </div>
                  <div className="asm-step-card">
                    <div className="asm-step-number">4</div>
                    <h4>Test &amp; Validate</h4>
                    <p>
                      Converted programs are rigorously tested — comparing
                      output of the original Assembler against the new COBOL
                      to ensure functional equivalence.
                    </p>
                  </div>
                  <div className="asm-step-card">
                    <div className="asm-step-number">5</div>
                    <h4>Deploy</h4>
                    <p>
                      Work packets are delivered through the DevOps toolchain.
                      We collaboratively develop a go-live cutover plan to
                      minimize production risks.
                    </p>
                  </div>
                  <div className="asm-step-card">
                    <div className="asm-step-number">6</div>
                    <h4>Support</h4>
                    <p>
                      Post-deployment warranty support ensures stability.
                      We provide ongoing assistance, monitoring, and
                      enhancements as needed.
                    </p>
                  </div>
                </div>

                <div className="asm-cta-inline">
                  <p>Ready to see it in action?</p>
                  <button className="asm-btn-primary" onClick={() => {}}>
                    Request a Demo
                  </button>
                </div>
              </div>
            )}

            {/* ========== BENEFITS ========== */}
            {activeSection === "benefits" && (
              <div className="asm-content-block">
                <h2>Benefits</h2>
                <p>
                  Facilitating the transition of Assembler to modern languages
                  like COBOL empowers both private and public sector
                  organizations to foster innovation and reduce technical debt.
                </p>

                <div className="asm-benefits-grid">
                  <div className="asm-benefit-item">
                    <FiDollarSign size={24} className="asm-benefit-icon" />
                    <div>
                      <h4>Reduced Maintenance Costs</h4>
                      <p>
                        COBOL is significantly cheaper to maintain than
                        Assembler. The diminishing availability of Assembler
                        expertise drives up operational expenses.
                      </p>
                    </div>
                  </div>
                  <div className="asm-benefit-item">
                    <FiCheckCircle size={24} className="asm-benefit-icon" />
                    <div>
                      <h4>Improved Code Readability</h4>
                      <p>
                        COBOL's English-like syntax makes programs far more
                        readable and accessible to a broader developer
                        workforce.
                      </p>
                    </div>
                  </div>
                  <div className="asm-benefit-item">
                    <FiGlobe size={24} className="asm-benefit-icon" />
                    <div>
                      <h4>Modern Integration</h4>
                      <p>
                        Converted COBOL integrates seamlessly with modern IT
                        environments, DevOps pipelines, and cloud platforms.
                      </p>
                    </div>
                  </div>
                  <div className="asm-benefit-item">
                    <FiShield size={24} className="asm-benefit-icon" />
                    <div>
                      <h4>Risk Mitigation</h4>
                      <p>
                        Automated conversion eliminates human error inherent
                        in manual rewriting, ensuring functional equivalence.
                      </p>
                    </div>
                  </div>
                  <div className="asm-benefit-item">
                    <FiZap size={24} className="asm-benefit-icon" />
                    <div>
                      <h4>Faster Development Cycles</h4>
                      <p>
                        Enhanced development efficiency and a shorter learning
                        curve for developers joining legacy projects.
                      </p>
                    </div>
                  </div>
                  <div className="asm-benefit-item">
                    <FiTrendingUp size={24} className="asm-benefit-icon" />
                    <div>
                      <h4>Larger Talent Pool</h4>
                      <p>
                        Far more developers know COBOL than Assembler,
                        reducing dependency on scarce and expensive specialist
                        resources.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========== USE CASES ========== */}
            {activeSection === "use-cases" && (
              <div className="asm-content-block">
                <h2>Use Cases</h2>
                <p>
                  Our Assembler to COBOL Conversion Tool serves organizations
                  across multiple industries and modernization scenarios.
                </p>

                <strong>Banking &amp; Financial Services</strong>
                <p>
                  We have successfully executed global migrations of legacy
                  applications employed by multinational banks. Core banking
                  systems with decades of Assembler code are converted to
                  maintainable COBOL, enabling continued compliance and
                  innovation.
                </p>

                <strong>Insurance</strong>
                <p>
                  Claims processing, policy administration, and actuarial
                  systems built on Assembler are modernized to COBOL for
                  improved agility and regulatory compliance.
                </p>

                <strong>Government &amp; Public Sector</strong>
                <p>
                  Tax processing, benefits administration, and citizen-facing
                  systems running on legacy Assembler are transitioned to
                  COBOL to meet modernization mandates.
                </p>

                <strong>Telecommunications</strong>
                <p>
                  Billing platforms, network management, and subscriber systems
                  are upgraded from Assembler to enable integration with modern
                  digital channels.
                </p>

                <strong>Migration Scenarios</strong>
                <ul>
                  <li>
                    <strong>Mainframe Optimization:</strong> Consolidate
                    Assembler to COBOL on the same mainframe for reduced
                    complexity
                  </li>
                  <li>
                    <strong>Replatforming:</strong> Convert Assembler to COBOL
                    as a stepping stone for cloud migration
                  </li>
                  <li>
                    <strong>Automated Refactoring:</strong> Convert Assembler
                    to COBOL, then refactor COBOL to Java/C# using additional
                    tools
                  </li>
                  <li>
                    <strong>Risk Reduction:</strong> Eliminate single-point-of
                    -failure dependency on retiring Assembler experts
                  </li>
                </ul>
              </div>
            )}

            {/* ========== WHY AARA TECH ========== */}
            {activeSection === "why-aaratech" && (
              <div className="asm-content-block">
                <h2>Why Choose Aara Tech?</h2>
                <p>
                  With over 14 years of specialized experience in mainframe
                  modernization, Aara Tech brings unmatched expertise in
                  Assembler to COBOL conversion.
                </p>

                <strong>What Makes Us Different</strong>
                <ul>
                  <li>
                    <strong>Proprietary Conversion Tool:</strong> Our in-house
                    tool delivers 95%+ automated conversion accuracy
                  </li>
                  <li>
                    <strong>Free POC:</strong> 2-week complimentary proof of
                    concept with up to 5 program conversions
                  </li>
                  <li>
                    <strong>Domain Expertise:</strong> Deep understanding of
                    banking, insurance, and enterprise mainframe environments
                  </li>
                  <li>
                    <strong>End-to-End Support:</strong> From assessment through
                    deployment and post-go-live warranty
                  </li>
                  <li>
                    <strong>Proven Track Record:</strong> Successfully migrated
                    30M+ lines of legacy code for multinational enterprises
                  </li>
                </ul>

                <strong>Why Choose Aara Tech?</strong>
                <ul>
                  <li>
                    <strong>Trusted Partner:</strong> We focus on understanding
                    your goals and delivering solutions aligned with your vision
                  </li>
                  <li>
                    <strong>Agile &amp; Innovative:</strong> Flexible approach
                    adapts to changing requirements and ensures faster delivery
                  </li>
                  <li>
                    <strong>Scalable &amp; Secure:</strong> Enterprise-ready
                    solutions that grow with your business and maintain strong
                    security
                  </li>
                  <li>
                    <strong>Dedicated Support:</strong> Ongoing maintenance and
                    assistance to keep operations smooth
                  </li>
                </ul>

                <div className="asm-overview-image">
                  <img src={INDUSTRIES.service} alt="Why Aara Tech" />
                </div>
              </div>
            )}

            {/* ========== GLOSSARY ========== */}
            {activeSection === "glossary" && (
              <div className="asm-content-block">
                <h2>Instructions Covered</h2>
                <p>
                  Following are some of the instructions covered which are most
                  commonly used. We will keep updating the list very frequently
                  to cover as many instructions as possible.
                </p>

                {/* A-Z ALPHABET BAR */}
                <div className="asm-alphabet-bar">
                  {alphabet.map((letter) => (
                    <button
                      key={letter}
                      className={`asm-alpha-btn ${activeGlossaryLetter === letter ? "active" : ""} ${glossaryData[letter] ? "" : "disabled"}`}
                      onClick={() =>
                        glossaryData[letter] &&
                        setActiveGlossaryLetter(letter)
                      }
                    >
                      {letter}
                    </button>
                  ))}
                </div>

                {/* INSTRUCTIONS GRID */}
                <div className="asm-glossary-content">
                  <div className="asm-glossary-letter-heading">
                    {activeGlossaryLetter}
                  </div>
                  {glossaryData[activeGlossaryLetter] ? (
                    <div className="asm-instructions-grid">
                      {glossaryData[activeGlossaryLetter].map(
                        (instruction, idx) => (
                          <div key={idx} className="asm-instruction-cell">
                            {instruction}
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="asm-no-terms">
                      No instructions available for letter "{activeGlossaryLetter}".
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= FOOTER CTA ================= */}
      <section className="footer-cta-section">
        <div className="footer-cta-container">
          <h2 className="footer-cta-headline">
            {cta.heading ?? "Ready to modernize your Assembler codebase?"}
          </h2>
          <p className="footer-cta-subtext">
            {cta.subtext ?? "Start with a free assessment and 2-week proof of concept."}
          </p>
          <div className="asm-footer-cta-buttons">
            <button className="footer-cta-btn" onClick={() => {}}>
              {cta.buttonText ?? "REQUEST A DEMO"}
            </button>
            <button
              className="footer-cta-btn footer-cta-btn-outline"
              onClick={() => {}}
            >
              {cta.buttonText2 ?? "EXPERIENCE THE TOOL"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AssemblerCobolPage;