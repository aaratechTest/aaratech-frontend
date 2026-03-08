import { useState } from "react";
import "./ContactPage.css";
import { usePageContent } from "../../hooks/usePageContent";

const ContactPage = () => {
  const { content: sections } = usePageContent("contact");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const hero = sections.hero || {};
  const offices = sections.offices || {};

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setResult("");

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "a61c96b8-6373-4ca2-92ff-cc71e8eeed5c");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("success");
        (event.target as HTMLFormElement).reset();
      } else {
        setResult("error");
      }
    } catch {
      setResult("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-scope">
      {/* HERO */}
      <header className="contact-hero">
        <div className="hero-content">
          <h1>{hero.heading ?? "Let's Talk Business"}</h1>
          <p>{hero.description ?? ""}</p>
          <span className="hero-badge">{hero.badge ?? "India \u2022 Singapore \u2022 USA \u2022 Malaysia"}</span>
        </div>
      </header>

      {/* FORM */}
      <section className="contact-form-section">
        <div className="contact-card">
          <h2>
            Send Us a <span>Message</span>
          </h2>

          <form className="contact-form" onSubmit={onSubmit}>
            <input type="hidden" name="subject" value="New Enquiry from AaraTech Website" />

            <div className="form-grid">
              <input type="text" name="name" placeholder="Full Name" required />
              <input type="email" name="email" placeholder="Email Address" required />
              <input type="tel" name="phone" placeholder="Phone Number" required />
              <input type="text" name="country" placeholder="Country" required />
            </div>

            <textarea name="message" placeholder="Your Message" rows={5} required />

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Submit Enquiry"}
            </button>

            {result === "success" && (
              <p className="form-status form-success">
                Thank you! Your message has been sent successfully. We'll get back to you soon.
              </p>
            )}
            {result === "error" && (
              <p className="form-status form-error">
                Something went wrong. Please try again or email us at hr@aaratech.com.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* OFFICES */}
      <section className="contact-info-section">
        <h2 className="section-title-2">
          {offices.heading ?? "Our Global Offices"}
        </h2>

        <div className="office-grid">
          {(offices.items ?? []).map((office: any, i: number) => (
            <article className="office-card" key={i}>
              <h3>{office.country}</h3>
              <address>{office.address}</address>

              <div className="office-contact-row">
                {office.phone && (
                  <div className="contact-item">
                    <svg viewBox="0 0 24 24">
                      <path d="M6.6 10.8c1.4 2.7 3.9 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.6.6 4 .6.6 0 1 .4 1 1V21c0 .6-.4 1-1 1C10.6 22 2 13.4 2 3c0-.6.4-1 1-1h4.5c.6 0 1 .4 1 1 0 1.4.2 2.8.6 4 .1.4 0 .8-.3 1.1l-2.2 2.2z" />
                    </svg>
                    <span>{office.phone}</span>
                  </div>
                )}
                {office.email && (
                  <div className="contact-item">
                    <svg viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                    <span>{office.email}</span>
                  </div>
                )}
              </div>

              {office.mapUrl && (
                <iframe
                  title={`${office.country} Office`}
                  src={office.mapUrl}
                  loading="lazy"
                />
              )}
            </article>
          ))}
        </div>
      </section>
    </section>
  );
};

export default ContactPage;
