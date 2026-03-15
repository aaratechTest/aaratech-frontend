import { useEffect, useState } from "react";
import { getSettings, updateSettings } from "../../../services/settingsService";
import Alert from "../../../shared/Alert/Alert";
import "./SettingsPage.css";

export default function SettingsPage() {
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [privacyPolicyUrl, setPrivacyPolicyUrl] = useState("");
  const [openingsUrl, setOpeningsUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getSettings()
      .then((s) => {
        setWhatsappNumber(s.whatsappNumber || "");
        setPrivacyPolicyUrl(s.privacyPolicyUrl || "");
        setOpeningsUrl(s.openingsUrl || "");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSuccess("");
    setError("");

    try {
      await updateSettings({ whatsappNumber, privacyPolicyUrl, openingsUrl });
      setSuccess("Settings saved successfully");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save settings");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p>Loading settings...</p>;

  return (
    <div className="settings-page">
      <h1 className="settings-page__title">Site Settings</h1>

      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="error">{error}</Alert>}

      <form className="settings-page__form" onSubmit={handleSave}>
        <label className="settings-page__label" htmlFor="whatsappNumber">
          WhatsApp Number
          <span className="settings-page__hint">
            Include country code without + (e.g. 919876543210)
          </span>
        </label>
        <input
          id="whatsappNumber"
          className="settings-page__input"
          type="text"
          placeholder="919876543210"
          value={whatsappNumber}
          onChange={(e) => setWhatsappNumber(e.target.value)}
        />
        <label className="settings-page__label" htmlFor="privacyPolicyUrl">
          Privacy Policy URL
          <span className="settings-page__hint">
            External link that opens when users click "Privacy Policy"
          </span>
        </label>
        <input
          id="privacyPolicyUrl"
          className="settings-page__input"
          type="url"
          placeholder="https://example.com/privacy-policy"
          value={privacyPolicyUrl}
          onChange={(e) => setPrivacyPolicyUrl(e.target.value)}
        />
        <label className="settings-page__label" htmlFor="openingsUrl">
          Current Openings URL
          <span className="settings-page__hint">
            External link that opens when users click "Openings" (e.g. GreytHR jobs page)
          </span>
        </label>
        <input
          id="openingsUrl"
          className="settings-page__input"
          type="url"
          placeholder="https://aaratech.greythr.com/hire/jobs/"
          value={openingsUrl}
          onChange={(e) => setOpeningsUrl(e.target.value)}
        />
        <button
          className="settings-page__save"
          type="submit"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
