import { useEffect, useState } from "react";
import { getSettings } from "../../services/settingsService";
import "./WhatsAppWidget.css";

export default function WhatsAppWidget() {
  const [number, setNumber] = useState("");

  useEffect(() => {
    getSettings()
      .then((s) => setNumber(s.whatsappNumber || ""))
      .catch(() => {});
  }, []);

  if (!number) return null;

  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-widget"
      title="Chat with us"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.962A15.91 15.91 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.32 22.598c-.39 1.1-1.932 2.012-3.178 2.278-.852.18-1.964.324-5.71-1.228-4.796-1.986-7.882-6.848-8.122-7.166-.23-.318-1.932-2.574-1.932-4.908 0-2.334 1.222-3.48 1.656-3.956.434-.476.948-.596 1.264-.596.316 0 .632.002.908.016.292.016.684-.11 1.07.816.39.94 1.326 3.234 1.442 3.468.116.234.194.508.04.816-.156.316-.234.512-.468.788-.234.278-.492.62-.702.832-.234.234-.478.49-.206.96.272.472 1.212 2 2.602 3.24 1.786 1.592 3.292 2.086 3.764 2.32.472.234.748.194 1.022-.118.272-.316 1.17-1.364 1.482-1.834.312-.468.624-.39 1.054-.234.434.156 2.726 1.286 3.194 1.52.468.234.78.352.896.546.118.194.118 1.128-.272 2.226z" />
      </svg>
    </a>
  );
}
