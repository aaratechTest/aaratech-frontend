import "./ContentEditorPage.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { pageDefinitions } from "../../../constants/pageDefinitions";
import type { FieldDef, SectionDef } from "../../../constants/pageDefinitions";
import { getContent, updateContent } from "../../../services/contentService";
import { defaultContent } from "../../../constants/defaultContent";
import ImagePicker from "../../../shared/ImagePicker/ImagePicker";
import { ArrowLeft, ChevronDown, ChevronRight, Save, Plus, Trash2 } from "lucide-react";
import Alert from "../../../shared/Alert/Alert";

export default function ContentEditorPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [sections, setSections] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const pageDef = pageDefinitions.find((p) => p.slug === slug);

  useEffect(() => {
    if (!slug) return;
    loadContent();
  }, [slug]);

  async function loadContent() {
    setLoading(true);
    try {
      const data = await getContent(slug!);
      setSections(data.sections as Record<string, any>);
    } catch {
      setSections(defaultContent[slug!]?.sections || {});
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setAlert(null);
    try {
      await updateContent(slug!, { sections });
      setAlert({ type: "success", message: "Content saved successfully!" });
    } catch (err) {
      setAlert({ type: "error", message: err instanceof Error ? err.message : "Save failed" });
    } finally {
      setSaving(false);
    }
  }

  function toggleSection(key: string) {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function getNestedValue(obj: any, path: string): any {
    return path.split(".").reduce((o, k) => o?.[k], obj);
  }

  function setNestedValue(obj: any, path: string, value: any): any {
    const keys = path.split(".");
    if (keys.length === 1) {
      return { ...obj, [keys[0]]: value };
    }
    return {
      ...obj,
      [keys[0]]: setNestedValue(obj?.[keys[0]] || {}, keys.slice(1).join("."), value),
    };
  }

  function updateSectionField(sectionKey: string, fieldPath: string, value: any) {
    setSections((prev) => ({
      ...prev,
      [sectionKey]: setNestedValue(prev[sectionKey] || {}, fieldPath, value),
    }));
  }

  function renderField(sectionKey: string, field: FieldDef, parentPath = "") {
    const fullPath = parentPath ? `${parentPath}.${field.key}` : field.key;
    const value = getNestedValue(sections[sectionKey], fullPath);

    switch (field.type) {
      case "text":
        return (
          <div className="ce-field" key={fullPath}>
            <label className="ce-field__label">{field.label}</label>
            <input
              className="ce-field__input"
              type="text"
              value={value ?? ""}
              onChange={(e) => updateSectionField(sectionKey, fullPath, e.target.value)}
            />
          </div>
        );

      case "textarea":
        return (
          <div className="ce-field" key={fullPath}>
            <label className="ce-field__label">{field.label}</label>
            <textarea
              className="ce-field__textarea"
              rows={3}
              value={value ?? ""}
              onChange={(e) => updateSectionField(sectionKey, fullPath, e.target.value)}
            />
          </div>
        );

      case "image":
        return (
          <div className="ce-field" key={fullPath}>
            <ImagePicker
              label={field.label}
              value={value ?? ""}
              onChange={(url) => updateSectionField(sectionKey, fullPath, url)}
            />
          </div>
        );

      case "list":
        return (
          <div className="ce-field" key={fullPath}>
            <label className="ce-field__label">{field.label}</label>
            <div className="ce-list">
              {(Array.isArray(value) ? value : []).map((item: string, i: number) => (
                <div className="ce-list__row" key={i}>
                  <input
                    className="ce-field__input"
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const arr = [...(value || [])];
                      arr[i] = e.target.value;
                      updateSectionField(sectionKey, fullPath, arr);
                    }}
                  />
                  <button
                    className="ce-list__remove"
                    type="button"
                    onClick={() => {
                      const arr = [...(value || [])];
                      arr.splice(i, 1);
                      updateSectionField(sectionKey, fullPath, arr);
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button
                className="ce-list__add"
                type="button"
                onClick={() => {
                  updateSectionField(sectionKey, fullPath, [...(value || []), ""]);
                }}
              >
                <Plus size={14} /> Add Item
              </button>
            </div>
          </div>
        );

      case "items":
        return (
          <div className="ce-field" key={fullPath}>
            <label className="ce-field__label">{field.label}</label>
            <div className="ce-items">
              {(Array.isArray(value) ? value : []).map((item: any, i: number) => (
                <div className="ce-items__row" key={i}>
                  <div className="ce-items__row-header">
                    <span className="ce-items__row-num">#{i + 1}</span>
                    <button
                      className="ce-items__row-remove"
                      type="button"
                      onClick={() => {
                        const arr = [...(value || [])];
                        arr.splice(i, 1);
                        updateSectionField(sectionKey, fullPath, arr);
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="ce-items__row-fields">
                    {field.subFields?.map((sub) => {
                      if (sub.type === "image") {
                        return (
                          <div className="ce-field" key={sub.key}>
                            <ImagePicker
                              label={sub.label}
                              value={item?.[sub.key] ?? ""}
                              onChange={(url) => {
                                const arr = [...(value || [])];
                                arr[i] = { ...arr[i], [sub.key]: url };
                                updateSectionField(sectionKey, fullPath, arr);
                              }}
                            />
                          </div>
                        );
                      }
                      return (
                        <div className="ce-field" key={sub.key}>
                          <label className="ce-field__label ce-field__label--small">
                            {sub.label}
                          </label>
                          {sub.type === "textarea" ? (
                            <textarea
                              className="ce-field__textarea"
                              rows={2}
                              value={item?.[sub.key] ?? ""}
                              onChange={(e) => {
                                const arr = [...(value || [])];
                                arr[i] = { ...arr[i], [sub.key]: e.target.value };
                                updateSectionField(sectionKey, fullPath, arr);
                              }}
                            />
                          ) : (
                            <input
                              className="ce-field__input"
                              type="text"
                              value={item?.[sub.key] ?? ""}
                              onChange={(e) => {
                                const arr = [...(value || [])];
                                arr[i] = { ...arr[i], [sub.key]: e.target.value };
                                updateSectionField(sectionKey, fullPath, arr);
                              }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              <button
                className="ce-list__add"
                type="button"
                onClick={() => {
                  const blank: Record<string, string> = {};
                  field.subFields?.forEach((sf) => (blank[sf.key] = ""));
                  updateSectionField(sectionKey, fullPath, [...(value || []), blank]);
                }}
              >
                <Plus size={14} /> Add {field.label?.replace(/s$/, "")}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  }

  function renderSection(sectionDef: SectionDef) {
    const expanded = expandedSections.has(sectionDef.key);
    return (
      <div className="ce-section" key={sectionDef.key}>
        <button
          className="ce-section__header"
          onClick={() => toggleSection(sectionDef.key)}
          type="button"
        >
          {expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          <span className="ce-section__label">{sectionDef.label}</span>
          <span className="ce-section__count">{sectionDef.fields.length} fields</span>
        </button>
        {expanded && (
          <div className="ce-section__body">
            {sectionDef.fields.map((field) => renderField(sectionDef.key, field))}
          </div>
        )}
      </div>
    );
  }

  if (!pageDef) {
    return (
      <div className="content-editor">
        <p>Page not found.</p>
        <button onClick={() => navigate("/admin/content")}>Back to Content</button>
      </div>
    );
  }

  return (
    <div className="content-editor">
      <div className="content-editor__header">
        <button
          className="content-editor__back"
          onClick={() => navigate("/admin/content")}
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <div className="content-editor__title-wrap">
          <h1 className="content-editor__title">{pageDef.title}</h1>
          <p className="content-editor__subtitle">Edit content for the {pageDef.title} page</p>
        </div>
        <button
          className="content-editor__save"
          onClick={handleSave}
          disabled={saving || loading}
        >
          <Save size={16} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {alert && (
        <Alert variant={alert.type}>
          {alert.message}
        </Alert>
      )}

      {loading ? (
        <div className="content-editor__loading">Loading content...</div>
      ) : (
        <div className="content-editor__sections">
          {pageDef.sections.map(renderSection)}
        </div>
      )}
    </div>
  );
}
