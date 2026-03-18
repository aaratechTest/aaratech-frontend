import React from "react";
import { Link } from "react-router-dom";
import "./CaseStudySection.css";

interface CaseStudyData {
  heading?: string;
  subtitle?: string;
  items?: Array<{ tag?: string; title: string; description?: string }>;
}

const CaseStudySection: React.FC<{ data?: CaseStudyData }> = ({ data }) => {
  const heading = data?.heading ?? "Who We Are?";
  const subtitle = data?.subtitle ?? "Case Study";
  const items = data?.items ?? [
    { tag: "Case Study", title: "Transforming Reinsurance Claims Management", description: "Convert Old Mainframe Assembler Programs To Modern COBOL For Easier Maintenance And Modernization." },
    { tag: "Case Study", title: "Establishing a Modern Digital Banking Experience", description: "" },
    { tag: "Case Study", title: "Empowering Digital Identity", description: "" },
    { tag: "Case Study", title: "Embracing Phygital Banking", description: "" },
  ];

  return (
    <section className="case-section">
      {/* HEADER */}
      <div className="case-header">
        <div>
          <h2>{heading}</h2>
          <p>{subtitle}</p>
        </div>
        <Link to="/about" className="view-all" style={{ textDecoration: "none", color: "inherit" }}>VIEW ALL</Link>
      </div>

      {/* CARDS */}
      <div className="case-cards">
        {items.map((item, i) => (
          <div
            className={`case-card ${i === 0 ? "highlight" : `image-card card-${i}`}`}
            key={i}
          >
            <span className="tag">{item.tag ?? "Case Study"}</span>
            <h3>{item.title}</h3>
            {item.description && <p>{item.description}</p>}
            <div className="arrow-btn">&rarr;</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CaseStudySection;
