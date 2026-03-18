import "./EventDetailPage.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getEventBySlug } from "../../services/eventService";
import type { Event } from "../../types/event";
import SEO from "../../components/SEO/SEO";
import { eventSchema } from "../../utils/structuredData";

const typeLabels: Record<string, string> = {
  webinar: "Webinar",
  conference: "Conference",
  workshop: "Workshop",
  meetup: "Meetup",
};

export default function EventDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getEventBySlug(slug)
      .then(setEvent)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  function formatDate(dateStr: string) {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function formatShortDate(dateStr: string) {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function getShareUrl() {
    return window.location.href;
  }

  function shareFacebook() {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  function shareTwitter() {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(getShareUrl())}&text=${encodeURIComponent(event?.title || "")}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  function shareLinkedIn() {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl())}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  function shareWhatsApp() {
    window.open(
      `https://wa.me/?text=${encodeURIComponent((event?.title || "") + " " + getShareUrl())}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  function copyLink() {
    navigator.clipboard.writeText(getShareUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) {
    return (
      <div className="event-detail__loading">Loading event...</div>
    );
  }

  if (notFound || !event) {
    return (
      <div className="event-detail__not-found">
        <h2>Event Not Found</h2>
        <p>The event you're looking for doesn't exist or has been removed.</p>
        <Link to="/events" className="event-detail__back-link">
          &larr; Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="event-detail">
      <SEO
        title={event.title}
        description={event.excerpt || event.title}
        path={`/events/${event.slug}`}
        ogType="article"
        ogImage={event.coverImageUrl}
        structuredData={eventSchema({
          title: event.title,
          excerpt: event.excerpt || event.title,
          coverImageUrl: event.coverImageUrl,
          eventDate: event.eventDate,
          location: event.location,
          registrationUrl: event.registrationUrl,
          slug: event.slug,
        })}
      />
      {/* Hero */}
      <section
        className="event-detail__hero"
        style={
          event.coverImageUrl
            ? { backgroundImage: `url(${event.coverImageUrl})` }
            : undefined
        }
      >
        <div className="event-detail__hero-overlay" />
        <div className="event-detail__hero-content">
          <span className="event-detail__hero-type">
            {typeLabels[event.eventType] || event.eventType}
          </span>
          <h1 className="event-detail__hero-title">{event.title}</h1>
          {event.author && (
            <span className="event-detail__hero-author">
              By {event.author}
            </span>
          )}
        </div>
      </section>

      {/* Content + Sidebar */}
      <div className="event-detail__body">
        <article className="event-detail__content-wrap">
          <Link to="/events" className="event-detail__back-link">
            &larr; Back to Events
          </Link>

          <div
            className="event-detail__content"
            dangerouslySetInnerHTML={{ __html: event.content }}
          />

          {/* Social Share */}
          <div className="event-detail__share">
            <span className="event-detail__share-label">Share this event</span>
            <div className="event-detail__share-buttons">
              <button
                className="event-detail__share-btn event-detail__share-btn--facebook"
                onClick={shareFacebook}
                title="Share on Facebook"
                aria-label="Share on Facebook"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button
                className="event-detail__share-btn event-detail__share-btn--twitter"
                onClick={shareTwitter}
                title="Share on X"
                aria-label="Share on X"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>
              <button
                className="event-detail__share-btn event-detail__share-btn--linkedin"
                onClick={shareLinkedIn}
                title="Share on LinkedIn"
                aria-label="Share on LinkedIn"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
              <button
                className="event-detail__share-btn event-detail__share-btn--whatsapp"
                onClick={shareWhatsApp}
                title="Share on WhatsApp"
                aria-label="Share on WhatsApp"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </button>
              <button
                className="event-detail__share-btn event-detail__share-btn--copy"
                onClick={copyLink}
                title="Copy link"
                aria-label="Copy link"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                </svg>
              </button>
            </div>
            {copied && (
              <span className="event-detail__copied">Link copied!</span>
            )}
          </div>
        </article>

        {/* Sidebar */}
        <aside className="event-detail__sidebar">
          <div className="event-detail__sidebar-card">
            <h3 className="event-detail__sidebar-heading">Event Details</h3>

            {event.eventDate && (
              <div className="event-detail__sidebar-row">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <div>
                  <span className="event-detail__sidebar-label">Date</span>
                  <span className="event-detail__sidebar-value">{formatDate(event.eventDate)}</span>
                </div>
              </div>
            )}

            {event.location && (
              <div className="event-detail__sidebar-row">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <div>
                  <span className="event-detail__sidebar-label">Location</span>
                  <span className="event-detail__sidebar-value">{event.location}</span>
                </div>
              </div>
            )}

            <div className="event-detail__sidebar-row">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <div>
                <span className="event-detail__sidebar-label">Type</span>
                <span className="event-detail__sidebar-value">
                  {typeLabels[event.eventType] || event.eventType}
                </span>
              </div>
            </div>

            {event.registrationUrl && (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="event-detail__register-btn"
              >
                Register Now
              </a>
            )}
          </div>

          <div className="event-detail__sidebar-meta">
            <span>Published {formatShortDate(event.createdAt)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
