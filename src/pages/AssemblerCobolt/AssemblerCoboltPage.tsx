import { useState } from "react";
import { usePageContent } from "../../hooks/usePageContent";
import { useSettings } from "../../contexts/SettingsContext";
import "./AssemblerCoboltPage.css";

/* ================= SIDEBAR TAB KEYS ================= */
const sidebarTabs = [
  { key: "mainframe-legacy", title: "Mainframe Legacy" },
  { key: "our-tool", title: "Our Tool" },
  { key: "advantages", title: "Advantages" },
  { key: "limitations", title: "Limitations" },
  { key: "migration-methodology", title: "Migration Methodology" },
  { key: "expectation-from-clients", title: "Expectation from Clients" },
  { key: "performance", title: "Performance" },
  { key: "glossary", title: "Glossary" },
];

/* ================= GLOSSARY DATA (A-Z) ================= */
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
  E: ["EAR", "ED", "EDMK", "EFPC", "EX"],
  F: ["FIDR", "FIER", "FIXR"],
  G: ["GET", "GETMAIN"],
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
  P: ["PACK", "PKA", "PKU", "PUT"],
  R: ["RISBG", "RLL", "RLLG"],
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
  U: ["UNPK", "UNPKA", "UNPKU"],
  W: ["WTO", "WTOR"],
  X: [
    "X", "XC", "XG", "XGR", "XI", "XIHF", "XILF",
    "XR", "XY",
  ],
  Z: ["ZAP"],
};

/* ================= MIGRATION METHODOLOGY SUB-TABS ================= */
const migrationSubTabs = [
  { key: "strategy", title: "Strategy" },
  { key: "tool-usage", title: "Tool Usage" },
  { key: "data-security", title: "Data Security" },
];

const AssemblerCobolPage = () => {
  const { content: sections } = usePageContent("assembler-cobol");
  const settings = useSettings();
  const [activeTab, setActiveTab] = useState("mainframe-legacy");
  const [activeGlossaryLetter, setActiveGlossaryLetter] = useState("A");
  const [activeMigrationSubTab, setActiveMigrationSubTab] = useState("strategy");

  const tabContent = sections.tabContent || {};
  const alphabet = "ABCDEFGILMNOPRSTUWXZ".split("");

  /* Get content for a tab by key */
  const getTabData = (key: string) => {
    return tabContent[key] || {};
  };

  /* Render HTML content from CMS */
  const renderContent = (key: string) => {
    const data = getTabData(key);
    if (!data.content) {
      return (
        <div className="asm-content-block">
          <p>Content coming soon. This section can be updated from the admin panel.</p>
        </div>
      );
    }
    return (
      <div className="asm-content-block">
        <div
          className="asm-cms-content"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </div>
    );
  };

  /* Render Migration Methodology with sub-tabs */
  const renderMigrationMethodology = () => {
    const subTabData = tabContent["migration-methodology"] || {};
    const activeSubData = subTabData[activeMigrationSubTab] || {};

    return (
      <div className="asm-content-block">
        {/* Sub-tab bar */}
        <div className="asm-subtab-bar">
          {migrationSubTabs.map((tab) => (
            <button
              key={tab.key}
              className={`asm-subtab-btn ${activeMigrationSubTab === tab.key ? "active" : ""}`}
              onClick={() => setActiveMigrationSubTab(tab.key)}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Sub-tab content */}
        <div className="asm-subtab-content">
          {activeSubData.content ? (
            <div
              className="asm-cms-content"
              dangerouslySetInnerHTML={{ __html: activeSubData.content }}
            />
          ) : (
            <p>Content coming soon. This section can be updated from the admin panel.</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="asm-scope">
      {/* ================= HEADER BAR ================= */}
      <div className="asm-header-bar">
        <h1 className="asm-header-title">Assembler to COBOL conversion</h1>
        <div className="asm-header-actions">
          <a href={settings.experienceToolUrl || "#"} target="_blank" rel="noopener noreferrer" className="asm-header-btn asm-header-btn--experience">
            Experience the Tool
          </a>
          <a href={settings.requestDemoUrl || "#"} target="_blank" rel="noopener noreferrer" className="asm-header-btn asm-header-btn--demo">
            Request for Demo
          </a>
        </div>
      </div>

      {/* ================= MAIN LAYOUT (Content LEFT + Tabs RIGHT) ================= */}
      <div className="asm-layout">
        {/* CONTENT PANEL (LEFT) */}
        <div className="asm-content-panel">
          {/* Tab content sections */}
          {activeTab === "migration-methodology" && renderMigrationMethodology()}
          {activeTab !== "glossary" && activeTab !== "migration-methodology" && renderContent(activeTab)}

          {/* ========== GLOSSARY ========== */}
          {activeTab === "glossary" && (
            <div className="asm-content-block asm-glossary-block">
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

        {/* SIDEBAR TABS (RIGHT) */}
        <aside className="asm-sidebar">
          {sidebarTabs.map((tab) => (
            <button
              key={tab.key}
              className={`asm-tab-btn ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.title}
            </button>
          ))}
        </aside>
      </div>
    </div>
  );
};

export default AssemblerCobolPage;
