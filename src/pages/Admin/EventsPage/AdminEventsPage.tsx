import "./AdminEventsPage.css";
import { useState, useEffect, useRef } from "react";
import * as eventService from "../../../services/eventService";
import type { Event, EventType } from "../../../types/event";
import ConfirmDialog from "../../../shared/ConfirmDialog/ConfirmDialog";
import Alert from "../../../shared/Alert/Alert";
import Modal from "../../../shared/Modal/Modal";
import { Plus, Pencil, Trash2, ImageIcon } from "lucide-react";

const MAX_EVENTS = 15;
const MAX_COVER_SIZE = 500 * 1024; // 500KB

const eventTypeOptions: { value: EventType; label: string }[] = [
  { value: "webinar", label: "Webinar" },
  { value: "conference", label: "Conference" },
  { value: "workshop", label: "Workshop" },
  { value: "meetup", label: "Meetup" },
];

interface EventFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  status: "draft" | "published";
  eventDate: string;
  location: string;
  eventType: EventType;
  registrationUrl: string;
}

const emptyForm: EventFormData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  author: "",
  status: "draft",
  eventDate: "",
  location: "",
  eventType: "webinar",
  registrationUrl: "",
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [form, setForm] = useState<EventFormData>(emptyForm);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [saving, setSaving] = useState(false);

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState<Event | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      setLoading(true);
      const data = await eventService.getAllEvents();
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load events");
    } finally {
      setLoading(false);
    }
  }

  function openCreateModal() {
    setEditingEvent(null);
    setForm(emptyForm);
    setCoverFile(null);
    setCoverPreview("");
    setModalOpen(true);
  }

  function openEditModal(evt: Event) {
    setEditingEvent(evt);
    setForm({
      title: evt.title,
      slug: evt.slug,
      excerpt: evt.excerpt,
      content: evt.content,
      author: evt.author,
      status: evt.status,
      eventDate: evt.eventDate ? evt.eventDate.slice(0, 10) : "",
      location: evt.location,
      eventType: evt.eventType,
      registrationUrl: evt.registrationUrl,
    });
    setCoverFile(null);
    setCoverPreview(evt.coverImageUrl || "");
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingEvent(null);
    setForm(emptyForm);
    setCoverFile(null);
    setCoverPreview("");
  }

  function handleTitleChange(value: string) {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: editingEvent ? prev.slug : slugify(value),
    }));
  }

  function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_COVER_SIZE) {
      setError("Cover image must be under 500KB");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("slug", form.slug);
      formData.append("excerpt", form.excerpt);
      formData.append("content", form.content);
      formData.append("author", form.author);
      formData.append("status", form.status);
      formData.append("eventDate", form.eventDate ? new Date(form.eventDate).toISOString() : "");
      formData.append("location", form.location);
      formData.append("eventType", form.eventType);
      formData.append("registrationUrl", form.registrationUrl);

      if (coverFile) {
        formData.append("coverImage", coverFile);
      }

      if (editingEvent) {
        await eventService.updateEvent(editingEvent.id, formData);
        setSuccess("Event updated successfully");
      } else {
        await eventService.createEvent(formData);
        setSuccess("Event created successfully");
      }

      closeModal();
      loadEvents();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save event");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await eventService.deleteEvent(deleteTarget.id);
      setDeleteTarget(null);
      setSuccess("Event deleted successfully");
      loadEvents();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete event");
      setDeleteTarget(null);
    } finally {
      setDeleteLoading(false);
    }
  }

  function formatDate(dateStr: string) {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div className="admin-events">
      <div className="admin-events__header">
        <div>
          <h1 className="admin-events__title">Events</h1>
          <p className="admin-events__subtitle">
            Manage events &middot;{" "}
            <strong>
              {events.length} / {MAX_EVENTS}
            </strong>{" "}
            events
          </p>
        </div>
        <button className="admin-events__create-btn" onClick={openCreateModal}>
          <Plus size={18} />
          New Event
        </button>
      </div>

      {error && <Alert variant="error">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {loading ? (
        <div className="admin-events__loading">Loading events...</div>
      ) : events.length === 0 ? (
        <div className="admin-events__empty">
          <ImageIcon size={48} />
          <p>No events yet</p>
          <p className="admin-events__empty-hint">
            Create your first event to get started
          </p>
        </div>
      ) : (
        <div className="admin-events__table-wrap">
          <table className="admin-events__table">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title</th>
                <th>Type</th>
                <th>Event Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((evt) => (
                <tr key={evt.id}>
                  <td>
                    <div className="admin-events__thumb">
                      {evt.coverImageUrl ? (
                        <img src={evt.coverImageUrl} alt={evt.title} />
                      ) : (
                        <ImageIcon size={20} />
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="admin-events__cell-title">{evt.title}</div>
                    <div className="admin-events__cell-slug">/{evt.slug}</div>
                  </td>
                  <td>
                    <span className="admin-events__type-badge">
                      {evt.eventType}
                    </span>
                  </td>
                  <td className="admin-events__cell-date">
                    {formatDate(evt.eventDate)}
                  </td>
                  <td>
                    <span
                      className={`admin-events__badge admin-events__badge--${evt.status}`}
                    >
                      {evt.status}
                    </span>
                  </td>
                  <td>
                    <div className="admin-events__actions">
                      <button
                        className="admin-events__action-btn admin-events__action-btn--edit"
                        onClick={() => openEditModal(evt)}
                        title="Edit"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        className="admin-events__action-btn admin-events__action-btn--delete"
                        onClick={() => setDeleteTarget(evt)}
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create / Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editingEvent ? "Edit Event" : "New Event"}
        size="lg"
      >
        <form className="admin-events__form" onSubmit={handleSubmit}>
          <div className="admin-events__form-row">
            <label className="admin-events__form-label">Title *</label>
            <input
              className="admin-events__form-input"
              type="text"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              placeholder="Enter event title"
            />
          </div>

          <div className="admin-events__form-row">
            <label className="admin-events__form-label">Slug</label>
            <input
              className="admin-events__form-input"
              type="text"
              value={form.slug}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, slug: e.target.value }))
              }
              placeholder="auto-generated-from-title"
            />
          </div>

          <div className="admin-events__form-row-group">
            <div className="admin-events__form-row">
              <label className="admin-events__form-label">Event Date</label>
              <input
                className="admin-events__form-input"
                type="date"
                value={form.eventDate}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, eventDate: e.target.value }))
                }
              />
            </div>
            <div className="admin-events__form-row">
              <label className="admin-events__form-label">Event Type</label>
              <select
                className="admin-events__form-select"
                value={form.eventType}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    eventType: e.target.value as EventType,
                  }))
                }
              >
                {eventTypeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="admin-events__form-row-group">
            <div className="admin-events__form-row">
              <label className="admin-events__form-label">Location</label>
              <input
                className="admin-events__form-input"
                type="text"
                value={form.location}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, location: e.target.value }))
                }
                placeholder='e.g. "Online" or venue name'
              />
            </div>
            <div className="admin-events__form-row">
              <label className="admin-events__form-label">Registration URL</label>
              <input
                className="admin-events__form-input"
                type="url"
                value={form.registrationUrl}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, registrationUrl: e.target.value }))
                }
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="admin-events__form-row">
            <label className="admin-events__form-label">Excerpt</label>
            <textarea
              className="admin-events__form-textarea admin-events__form-textarea--sm"
              value={form.excerpt}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, excerpt: e.target.value }))
              }
              placeholder="Brief summary of the event"
              rows={2}
            />
          </div>

          <div className="admin-events__form-row">
            <label className="admin-events__form-label">Content *</label>
            <textarea
              className="admin-events__form-textarea"
              value={form.content}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, content: e.target.value }))
              }
              required
              placeholder="Event description (HTML supported)"
              rows={8}
            />
          </div>

          <div className="admin-events__form-row">
            <label className="admin-events__form-label">
              Cover Image (max 500KB)
            </label>
            <div className="admin-events__cover-upload">
              {coverPreview && (
                <div className="admin-events__cover-preview">
                  <img src={coverPreview} alt="Cover preview" />
                </div>
              )}
              <button
                type="button"
                className="admin-events__cover-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon size={16} />
                {coverPreview ? "Change Image" : "Choose Image"}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
                style={{ display: "none" }}
              />
            </div>
          </div>

          <div className="admin-events__form-row-group">
            <div className="admin-events__form-row">
              <label className="admin-events__form-label">Author</label>
              <input
                className="admin-events__form-input"
                type="text"
                value={form.author}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, author: e.target.value }))
                }
                placeholder="Author name"
              />
            </div>

            <div className="admin-events__form-row">
              <label className="admin-events__form-label">Status</label>
              <select
                className="admin-events__form-select"
                value={form.status}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    status: e.target.value as "draft" | "published",
                  }))
                }
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div className="admin-events__form-actions">
            <button
              type="button"
              className="admin-events__form-cancel"
              onClick={closeModal}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="admin-events__form-submit"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : editingEvent
                  ? "Update Event"
                  : "Create Event"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Event"
        confirmLabel="Yes, Delete"
        variant="danger"
        loading={deleteLoading}
      >
        Are you sure you want to delete{" "}
        <strong>{deleteTarget?.title}</strong>? This will permanently remove the
        event and its cover image.
      </ConfirmDialog>
    </div>
  );
}
