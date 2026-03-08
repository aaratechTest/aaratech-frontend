import "./GalleryPage.css";
import { useState, useEffect, useRef } from "react";
import * as pageService from "../../../services/pageService";
import type { GalleryImage } from "../../../services/pageService";
import ConfirmDialog from "../../../shared/ConfirmDialog/ConfirmDialog";
import Alert from "../../../shared/Alert/Alert";
import { Upload, Trash2, Copy, ImageIcon } from "lucide-react";

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [copied, setCopied] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<GalleryImage | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    try {
      setLoading(true);
      const data = await pageService.getImages();
      setImages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load images");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError("");

    try {
      for (let i = 0; i < files.length; i++) {
        await pageService.uploadImage(files[i]);
      }
      setSuccess(
        files.length === 1
          ? "Image uploaded successfully"
          : `${files.length} images uploaded successfully`
      );
      loadImages();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await pageService.deleteImage(deleteTarget.id);
      setDeleteTarget(null);
      setSuccess("Image deleted successfully");
      loadImages();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete image");
      setDeleteTarget(null);
    } finally {
      setDeleteLoading(false);
    }
  }

  function handleCopyUrl(url: string) {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <div className="gallery">
      <div className="gallery__header">
        <div>
          <h1 className="gallery__title">Gallery</h1>
          <p className="gallery__subtitle">
            Upload and manage images for your pages
          </p>
        </div>
        <button
          className="gallery__upload-btn"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          <Upload size={18} />
          {uploading ? "Uploading..." : "Upload Images"}
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        style={{ display: "none" }}
      />

      {error && <Alert variant="error">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {loading ? (
        <div className="gallery__loading">Loading images...</div>
      ) : images.length === 0 ? (
        <div className="gallery__empty">
          <div className="gallery__empty-icon">
            <ImageIcon size={48} />
          </div>
          <p className="gallery__empty-text">No images uploaded yet</p>
          <p className="gallery__empty-hint">
            Upload images to use them in your page builder
          </p>
        </div>
      ) : (
        <div className="gallery__grid">
          {images.map((img) => (
            <div key={img.id} className="gallery__card">
              <div className="gallery__card-img-wrap">
                <img
                  src={img.url}
                  alt={img.originalName}
                  className="gallery__card-img"
                  loading="lazy"
                />
              </div>
              <div className="gallery__card-info">
                <div className="gallery__card-name" title={img.originalName}>
                  {img.originalName}
                </div>
                <div className="gallery__card-size">{formatSize(img.size)}</div>
              </div>
              <div className="gallery__card-actions">
                <button
                  className="gallery__card-action gallery__card-action--copy"
                  onClick={() => handleCopyUrl(img.url)}
                  title="Copy URL"
                >
                  <Copy size={14} />
                </button>
                <button
                  className="gallery__card-action gallery__card-action--delete"
                  onClick={() => setDeleteTarget(img)}
                  title="Delete image"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {copied && <div className="gallery__copied">URL copied to clipboard</div>}

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Image"
        confirmLabel="Yes, Delete"
        variant="danger"
        loading={deleteLoading}
      >
        Are you sure you want to delete{" "}
        <strong>{deleteTarget?.originalName}</strong>? This will remove it from
        storage permanently.
      </ConfirmDialog>
    </div>
  );
}
