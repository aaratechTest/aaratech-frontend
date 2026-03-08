import "./ImagePicker.css";
import { useState, useEffect, useRef } from "react";
import { uploadImage, getImages } from "../../../services/pageService";
import type { GalleryImage } from "../../../services/pageService";
import { Upload, X, ImageIcon, Check } from "lucide-react";

interface ImagePickerProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImagePicker({ value, onChange, label }: ImagePickerProps) {
  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState<"gallery" | "upload">("gallery");
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showModal) {
      loadGallery();
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  async function loadGallery() {
    setLoadingImages(true);
    try {
      const data = await getImages();
      setImages(data);
    } catch {
      // silently fail, user can still upload
    } finally {
      setLoadingImages(false);
    }
  }

  function handleSelect(url: string) {
    onChange(url);
    setShowModal(false);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);
    try {
      const result = await uploadImage(file);
      onChange(result.url);
      setShowModal(false);
      // Refresh gallery in background
      loadGallery();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) setShowModal(false);
  }

  return (
    <div className="image-picker">
      {label && <label className="image-picker__label">{label}</label>}

      {value ? (
        <div className="image-picker__preview">
          <img src={value} alt="Preview" className="image-picker__img" />
          <button
            className="image-picker__remove"
            onClick={() => onChange("")}
            type="button"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          className="image-picker__upload-btn"
          onClick={() => setShowModal(true)}
          type="button"
        >
          <ImageIcon size={16} />
          Choose Image
        </button>
      )}

      {value && (
        <button
          className="image-picker__change-btn"
          onClick={() => setShowModal(true)}
          type="button"
        >
          Change
        </button>
      )}

      {/* Gallery Modal */}
      {showModal && (
        <div
          className="imgpicker-modal-overlay"
          ref={overlayRef}
          onClick={handleOverlayClick}
        >
          <div className="imgpicker-modal">
            <div className="imgpicker-modal__header">
              <h3 className="imgpicker-modal__title">Select Image</h3>
              <button
                className="imgpicker-modal__close"
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="imgpicker-modal__tabs">
              <button
                className={`imgpicker-modal__tab ${tab === "gallery" ? "imgpicker-modal__tab--active" : ""}`}
                onClick={() => setTab("gallery")}
              >
                <ImageIcon size={16} />
                Gallery
              </button>
              <button
                className={`imgpicker-modal__tab ${tab === "upload" ? "imgpicker-modal__tab--active" : ""}`}
                onClick={() => setTab("upload")}
              >
                <Upload size={16} />
                Upload New
              </button>
            </div>

            <div className="imgpicker-modal__body">
              {tab === "gallery" && (
                <>
                  {loadingImages ? (
                    <div className="imgpicker-modal__loading">
                      Loading images...
                    </div>
                  ) : images.length === 0 ? (
                    <div className="imgpicker-modal__empty">
                      <ImageIcon size={36} />
                      <p>No images in gallery</p>
                      <button
                        className="imgpicker-modal__empty-upload"
                        onClick={() => setTab("upload")}
                      >
                        Upload your first image
                      </button>
                    </div>
                  ) : (
                    <div className="imgpicker-modal__grid">
                      {images.map((img) => (
                        <button
                          key={img.id}
                          className={`imgpicker-modal__item ${value === img.url ? "imgpicker-modal__item--selected" : ""}`}
                          onClick={() => handleSelect(img.url)}
                          type="button"
                        >
                          <img
                            src={img.url}
                            alt={img.originalName}
                            loading="lazy"
                          />
                          {value === img.url && (
                            <div className="imgpicker-modal__check">
                              <Check size={16} />
                            </div>
                          )}
                          <div className="imgpicker-modal__item-name">
                            {img.originalName}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}

              {tab === "upload" && (
                <div className="imgpicker-modal__upload-area">
                  <button
                    className="imgpicker-modal__dropzone"
                    onClick={() => inputRef.current?.click()}
                    disabled={uploading}
                    type="button"
                  >
                    <Upload size={32} />
                    <span>
                      {uploading
                        ? "Uploading..."
                        : "Click to select an image file"}
                    </span>
                    <span className="imgpicker-modal__dropzone-hint">
                      JPG, PNG, WebP, GIF - Max 5MB
                    </span>
                  </button>
                  {error && (
                    <div className="imgpicker-modal__error">{error}</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        style={{ display: "none" }}
      />
    </div>
  );
}
