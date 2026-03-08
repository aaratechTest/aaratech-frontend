import "./AboutPage.css";
import { ABOUT, COMMITMENT, TEAM } from "../../constants/Assets";
import { usePageContent } from "../../hooks/usePageContent";
import { useState } from "react";

const commitmentImages = [COMMITMENT.innovation, COMMITMENT.quality, COMMITMENT.collaboration, COMMITMENT.customer, COMMITMENT.people];
const teamImages = [TEAM.balamurugan, TEAM.ravi, TEAM.chandra];

const AboutPage = () => {
  const { content: sections } = usePageContent("about");
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const hero = sections.hero || {};
  const vm = sections.visionMission || {};
  const commitments = sections.commitments || {};
  const team = sections.team || {};
  const approach = sections.approach || {};
  const bto = sections.bto || {};
  const delivery = sections.deliveryModel || {};
  const cta = sections.cta || {};

  return (
    <div className="about-page">
      {/* HERO */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-text">
            <h2>{hero.heading ?? "About Us"}</h2>
            <p>{hero.description ?? ""}</p>
          </div>
          <div className="about-image">
            <img src={hero.image || ABOUT.hero} alt="AURA TECH" />
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="vision-mission">
        <div className="vm-card">
          <div className="vm-left">
            <img src={ABOUT.plan} alt="Planning" />
          </div>
          <div className="vm-content">
            <div className="vm-block">
              <img src={ABOUT.visionIcon} alt="Vision icon" className="vm-icon" />
              <h3>{vm.vision?.heading ?? "Our Vision"}</h3>
              <p>{vm.vision?.description ?? ""}</p>
            </div>
            <div className="vm-block">
              <img src={ABOUT.missionIcon} alt="Mission icon" className="vm-icon" />
              <h3>{vm.mission?.heading ?? "Our Mission"}</h3>
              <p>{vm.mission?.description ?? ""}</p>
            </div>
          </div>
        </div>
      </section>

      {/* COMMITMENT */}
      <section className="commitment">
        <h2>{commitments.heading ?? "We are committed to"}</h2>
        <div className="commitment-grid">
          {(commitments.items ?? []).map((item: any, i: number) => (
            <div className={`commitment-item ${i % 2 !== 0 ? "reverse" : ""}`} key={i}>
              <div className="commitment-text">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
              <div className="commitment-image">
                <img src={commitmentImages[i] || ""} alt={item.title} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MANAGEMENT */}
      <section className="team-section">
        <h2>{team.heading ?? "Our Management Team"}</h2>
        <div className="team-container">
          {(team.members ?? []).map((member: any, i: number) => (
            <div className="team-card" key={i}>
              <img src={member.image || teamImages[i] || ""} alt={member.name} />
              <h3>{member.name}</h3>
              <div className="role">{member.role}</div>
              <div className="leader-desc">
                <p>{member.shortBio}</p>
                <button
                  className="read-more-btn"
                  onClick={() => setSelectedMember({
                    name: member.name,
                    role: member.role,
                    desc: member.fullBio,
                    img: member.image || teamImages[i] || "",
                  })}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM MODAL */}
      {selectedMember && (
        <div className="team-modal-overlay" role="dialog" aria-modal="true">
          <div className="team-modal">
            <button
              className="team-modal-close"
              onClick={() => setSelectedMember(null)}
              aria-label="Close"
            >
              <span className="close-icon"></span>
            </button>
            <div className="team-modal-image-wrap">
              <img src={selectedMember.img} alt={selectedMember.name} className="team-modal-img" />
            </div>
            <h3 className="team-modal-name">{selectedMember.name}</h3>
            <p className="team-modal-role">{selectedMember.role}</p>
            <div className="team-modal-desc">
              {Array.isArray(selectedMember?.desc) ? (
                selectedMember.desc.map((para: string, index: number) => (
                  <p key={index}>{para}</p>
                ))
              ) : (
                <p>{selectedMember?.desc}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* APPROACH */}
      <section className="approach-2-section">
        <div className="approach-2-container">
          <div className="approach-2-image">
            <img src={ABOUT.approach} alt="Approach" />
          </div>
          <div className="approach-2-content">
            <h2><strong>{approach.heading ?? "Our approach"}</strong></h2>
            <p className="approach-2-desc">{approach.description ?? ""}</p>
            <ul className="approach-2-list">
              {(approach.items ?? []).map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* BTO */}
      <section className="bto-section">
        <div className="bto-container">
          <div className="bto-left">
            <h2><strong>{bto.heading ?? "Business Technology Optimization (BTO)"}</strong></h2>
            <p>{bto.description ?? ""}</p>
            <ul>
              {(bto.items ?? []).map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bto-right">
            <h3><strong>{bto.lifecycleHeading ?? "BTO Lifecycle"}</strong></h3>
            <div className="bto-lifecycle">
              {(bto.lifecycle ?? []).map((step: string, i: number) => (
                <div className="bto-step" key={i}>
                  {step}<br /><span>{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERY MODEL */}
      <section className="delivery-model">
        <div className="delivery-container">
          <div className="delivery-left">
            <h3><strong>{delivery.heading ?? "Our Delivery Model"}</strong></h3>
            <p>{delivery.subtitle ?? ""}</p>
            <span className="delivery-line"></span>
          </div>
          <div className="delivery-right">
            <ul>
              {(delivery.models ?? []).map((model: any, i: number) => (
                <li key={i}>
                  <strong>{model.name}</strong> &ndash; {model.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>
          <strong>
            {cta.heading ?? "What can we help you to achieve today?"}
          </strong>
        </h2>
        <button className="cta-btn">{cta.buttonText ?? "CONTACT"}</button>
      </section>
    </div>
  );
};

export default AboutPage;
