import "./AdminBlogPage.css";
import { useState, useEffect, useRef } from "react";
import * as blogService from "../../../services/blogService";
import type { Blog } from "../../../types/blog";
import ConfirmDialog from "../../../shared/ConfirmDialog/ConfirmDialog";
import Alert from "../../../shared/Alert/Alert";
import Modal from "../../../shared/Modal/Modal";
import { Plus, Pencil, Trash2, ImageIcon } from "lucide-react";

const MAX_BLOGS = 15;
const MAX_COVER_SIZE = 500 * 1024; // 500KB

interface BlogFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  status: "draft" | "published";
}

const emptyForm: BlogFormData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  author: "",
  status: "draft",
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [form, setForm] = useState<BlogFormData>(emptyForm);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [saving, setSaving] = useState(false);

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState<Blog | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadBlogs();
  }, []);

  async function loadBlogs() {
    try {
      setLoading(true);
      const data = await blogService.getAllBlogs();
      setBlogs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  }

  function openCreateModal() {
    setEditingBlog(null);
    setForm(emptyForm);
    setCoverFile(null);
    setCoverPreview("");
    setModalOpen(true);
  }

  function openEditModal(blog: Blog) {
    setEditingBlog(blog);
    setForm({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      status: blog.status,
    });
    setCoverFile(null);
    setCoverPreview(blog.coverImageUrl || "");
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingBlog(null);
    setForm(emptyForm);
    setCoverFile(null);
    setCoverPreview("");
  }

  function handleTitleChange(value: string) {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: editingBlog ? prev.slug : slugify(value),
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

      if (coverFile) {
        formData.append("coverImage", coverFile);
      }

      if (editingBlog) {
        await blogService.updateBlog(editingBlog.id, formData);
        setSuccess("Blog post updated successfully");
      } else {
        await blogService.createBlog(formData);
        setSuccess("Blog post created successfully");
      }

      closeModal();
      loadBlogs();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save blog");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await blogService.deleteBlog(deleteTarget.id);
      setDeleteTarget(null);
      setSuccess("Blog post deleted successfully");
      loadBlogs();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete blog");
      setDeleteTarget(null);
    } finally {
      setDeleteLoading(false);
    }
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div className="admin-blog">
      <div className="admin-blog__header">
        <div>
          <h1 className="admin-blog__title">Blog</h1>
          <p className="admin-blog__subtitle">
            Manage blog posts &middot;{" "}
            <strong>
              {blogs.length} / {MAX_BLOGS}
            </strong>{" "}
            blogs
          </p>
        </div>
        <button className="admin-blog__create-btn" onClick={openCreateModal}>
          <Plus size={18} />
          New Post
        </button>
      </div>

      {error && <Alert variant="error">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {loading ? (
        <div className="admin-blog__loading">Loading blogs...</div>
      ) : blogs.length === 0 ? (
        <div className="admin-blog__empty">
          <ImageIcon size={48} />
          <p>No blog posts yet</p>
          <p className="admin-blog__empty-hint">
            Create your first blog post to get started
          </p>
        </div>
      ) : (
        <div className="admin-blog__table-wrap">
          <table className="admin-blog__table">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td>
                    <div className="admin-blog__thumb">
                      {blog.coverImageUrl ? (
                        <img src={blog.coverImageUrl} alt={blog.title} />
                      ) : (
                        <ImageIcon size={20} />
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="admin-blog__cell-title">{blog.title}</div>
                    <div className="admin-blog__cell-slug">/{blog.slug}</div>
                  </td>
                  <td>
                    <span
                      className={`admin-blog__badge admin-blog__badge--${blog.status}`}
                    >
                      {blog.status}
                    </span>
                  </td>
                  <td className="admin-blog__cell-date">
                    {formatDate(blog.createdAt)}
                  </td>
                  <td>
                    <div className="admin-blog__actions">
                      <button
                        className="admin-blog__action-btn admin-blog__action-btn--edit"
                        onClick={() => openEditModal(blog)}
                        title="Edit"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        className="admin-blog__action-btn admin-blog__action-btn--delete"
                        onClick={() => setDeleteTarget(blog)}
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
        title={editingBlog ? "Edit Blog Post" : "New Blog Post"}
        size="lg"
      >
        <form className="admin-blog__form" onSubmit={handleSubmit}>
          <div className="admin-blog__form-row">
            <label className="admin-blog__form-label">Title *</label>
            <input
              className="admin-blog__form-input"
              type="text"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              placeholder="Enter blog title"
            />
          </div>

          <div className="admin-blog__form-row">
            <label className="admin-blog__form-label">Slug</label>
            <input
              className="admin-blog__form-input"
              type="text"
              value={form.slug}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, slug: e.target.value }))
              }
              placeholder="auto-generated-from-title"
            />
          </div>

          <div className="admin-blog__form-row">
            <label className="admin-blog__form-label">Excerpt</label>
            <textarea
              className="admin-blog__form-textarea admin-blog__form-textarea--sm"
              value={form.excerpt}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, excerpt: e.target.value }))
              }
              placeholder="Brief summary of the blog post"
              rows={2}
            />
          </div>

          <div className="admin-blog__form-row">
            <label className="admin-blog__form-label">Content *</label>
            <textarea
              className="admin-blog__form-textarea"
              value={form.content}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, content: e.target.value }))
              }
              required
              placeholder="Blog content (HTML supported)"
              rows={8}
            />
          </div>

          <div className="admin-blog__form-row">
            <label className="admin-blog__form-label">
              Cover Image (max 500KB)
            </label>
            <div className="admin-blog__cover-upload">
              {coverPreview && (
                <div className="admin-blog__cover-preview">
                  <img src={coverPreview} alt="Cover preview" />
                </div>
              )}
              <button
                type="button"
                className="admin-blog__cover-btn"
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

          <div className="admin-blog__form-row-group">
            <div className="admin-blog__form-row">
              <label className="admin-blog__form-label">Author</label>
              <input
                className="admin-blog__form-input"
                type="text"
                value={form.author}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, author: e.target.value }))
                }
                placeholder="Author name"
              />
            </div>

            <div className="admin-blog__form-row">
              <label className="admin-blog__form-label">Status</label>
              <select
                className="admin-blog__form-select"
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

          <div className="admin-blog__form-actions">
            <button
              type="button"
              className="admin-blog__form-cancel"
              onClick={closeModal}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="admin-blog__form-submit"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : editingBlog
                  ? "Update Post"
                  : "Create Post"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Blog Post"
        confirmLabel="Yes, Delete"
        variant="danger"
        loading={deleteLoading}
      >
        Are you sure you want to delete{" "}
        <strong>{deleteTarget?.title}</strong>? This will permanently remove the
        post and its cover image.
      </ConfirmDialog>
    </div>
  );
}
