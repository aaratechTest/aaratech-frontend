import "./EventListPage.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../../services/eventService";
import type { EventListItem } from "../../types/event";
import SEO from "../../components/SEO/SEO";
import { seoDefaults } from "../../constants/seoDefaults";
import { breadcrumbSchema } from "../../utils/structuredData";

const typeLabels: Record<string, string> = {
  webinar: "Webinar",
  conference: "Conference",
  workshop: "Workshop",
  meetup: "Meetup",
};

export default function EventListPage() {
  const [events, setEvents] = useState<EventListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load events"))
      .finally(() => setLoading(false));
  }, []);

  function formatDate(dateStr: string) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function formatDay(dateStr: string) {
    if (!dateStr) return "";
    return new Date(dateStr).getDate().toString();
  }

  function formatMonth(dateStr: string) {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  }

  return (
    <div className="event-list">
      <SEO
        title={seoDefaults["events"].title}
        description={seoDefaults["events"].description}
        path="/events"
        structuredData={breadcrumbSchema([{ name: "Events", path: "/events" }])}
      />
      {/* Hero */}
      <section className="event-list__hero">
        <div className="event-list__hero-content">
          <span className="event-list__hero-label">Upcoming &amp; Past</span>
          <h1 className="event-list__hero-title">Events</h1>
          <div className="event-list__hero-divider" />
          <p className="event-list__hero-desc">
            Join us at conferences, webinars, workshops, and meetups. Stay
            connected with the AaraTech community.
          </p>
        </div>
      </section>

      {/* Event Grid */}
      <section className="event-list__section">
        {loading ? (
          <div className="event-list__loading">Loading events...</div>
        ) : error ? (
          <div className="event-list__empty">
            <p>Something went wrong: {error}</p>
          </div>
        ) : events.length === 0 ? (
          <div className="event-list__empty">
            <p>No events published yet. Check back soon!</p>
          </div>
        ) : (
          <div className="event-list__grid">
            {events.map((evt) => (
              <Link
                to={`/events/${evt.slug}`}
                key={evt.id}
                className="event-card"
              >
                <div className="event-card__image-wrap">
                  {evt.coverImageUrl ? (
                    <img
                      src={evt.coverImageUrl}
                      alt={evt.title}
                      className="event-card__image"
                      loading="lazy"
                    />
                  ) : (
                    <div className="event-card__image-placeholder" />
                  )}
                  <div className="event-card__overlay" />
                  {evt.eventDate && (
                    <div className="event-card__date-badge">
                      <span className="event-card__date-day">{formatDay(evt.eventDate)}</span>
                      <span className="event-card__date-month">{formatMonth(evt.eventDate)}</span>
                    </div>
                  )}
                </div>
                <div className="event-card__body">
                  <div className="event-card__meta">
                    <span className="event-card__type-tag">
                      {typeLabels[evt.eventType] || evt.eventType}
                    </span>
                    {evt.location && (
                      <span className="event-card__location">{evt.location}</span>
                    )}
                  </div>
                  <h3 className="event-card__title">{evt.title}</h3>
                  {evt.excerpt && (
                    <p className="event-card__excerpt">{evt.excerpt}</p>
                  )}
                  <span className="event-card__read-more">
                    View Details &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
