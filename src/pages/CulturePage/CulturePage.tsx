import "./CulturePage.css";
import { useEffect, useState } from "react";
import { CULTURE, COMMITMENT } from "../../constants/Assets";
import { usePageContent } from "../../hooks/usePageContent";
import { getSettings } from "../../services/settingsService";
import SEO from "../../components/SEO/SEO";
import { seoDefaults } from "../../constants/seoDefaults";
import { breadcrumbSchema } from "../../utils/structuredData";

const valueImages = [COMMITMENT.innovation, COMMITMENT.collaboration, COMMITMENT.quality, COMMITMENT.people];

const CulturePage = () => {
  const { content: sections } = usePageContent("culture");
  const [openingsUrl, setOpeningsUrl] = useState("");

  useEffect(() => {
    getSettings()
      .then((s) => setOpeningsUrl(s.openingsUrl || ""))
      .catch(() => {});
  }, []);

  const hero = sections.hero || {};
  const values = sections.values || {};
  const lifeAtAara = sections.lifeAtAara || {};
  const stats = sections.stats || {};
  const growth = sections.growth || {};
  const whyJoin = sections.whyJoin || {};
  const cta = sections.cta || {};

  return (
    <div className="culture-page">
      <SEO
        title={seoDefaults["culture"].title}
        description={seoDefaults["culture"].description}
        path="/culture"
        structuredData={breadcrumbSchema([{ name: "Our Culture", path: "/culture" }])}
      />
      {/* HERO */}
      <section className="culture-hero">
        <div className="culture-hero__container">
          <div className="culture-hero__text">
            <h1>{hero.heading ?? "Our Work Culture"}</h1>
            <p>{hero.description ?? ""}</p>
          </div>
          <div className="culture-hero__image">
            <img src={hero.image || CULTURE.hero} alt="Our Culture" />
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="culture-values">
        <div className="culture-values__header">
          <h2>{values.heading ?? "Our Core Values"}</h2>
          <p>{values.description ?? ""}</p>
        </div>
        <div className="culture-values__grid">
          {(values.items ?? []).map((item: any, i: number) => (
            <div className={`culture-values__item ${i % 2 !== 0 ? "reverse" : ""}`} key={i}>
              <div className="culture-values__text">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
              <div className="culture-values__image">
                <img src={item.image || valueImages[i] || ""} alt={item.title} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="culture-stats">
        <div className="culture-stats__grid">
          {(stats.items ?? []).map((stat: any, i: number) => (
            <div className="culture-stats__item" key={i}>
              <span className="culture-stats__value">{stat.value}</span>
              <span className="culture-stats__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* LIFE AT AARA */}
      <section className="culture-life">
        <div className="culture-life__container">
          <div className="culture-life__content">
            <h2>{lifeAtAara.heading ?? "Life at Aara Tech"}</h2>
            <p className="culture-life__desc">{lifeAtAara.description ?? ""}</p>
          </div>
          <div className="culture-life__highlights">
            {(lifeAtAara.highlights ?? []).map((item: any, i: number) => (
              <div className="culture-life__card" key={i}>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GROWTH & LEARNING */}
      <section className="culture-growth">
        <div className="culture-growth__container">
          <div className="culture-growth__header">
            <h2>{growth.heading ?? "Growth & Learning"}</h2>
            <p>{growth.description ?? ""}</p>
          </div>
          <div className="culture-growth__grid">
            {(growth.items ?? []).map((item: any, i: number) => (
              <div className="culture-growth__card" key={i}>
                <div className="culture-growth__number">{String(i + 1).padStart(2, "0")}</div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY JOIN */}
      <section className="culture-why-join">
        <h2>{whyJoin.heading ?? "Why Join Aara Tech?"}</h2>
        <div className="culture-why-join__grid">
          {(whyJoin.items ?? []).map((item: any, i: number) => (
            <div className="culture-why-join__card" key={i}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>
          <strong>{cta.heading ?? "Ready to join our team?"}</strong>
        </h2>
        {openingsUrl ? (
          <a href={openingsUrl} target="_blank" rel="noopener noreferrer">
            <button className="cta-btn">{cta.buttonText ?? "VIEW OPENINGS"}</button>
          </a>
        ) : (
          <button className="cta-btn">{cta.buttonText ?? "VIEW OPENINGS"}</button>
        )}
      </section>
    </div>
  );
};

export default CulturePage;
