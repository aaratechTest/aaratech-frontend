import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { getSettings } from "../services/settingsService";
import type { SiteSettings } from "../services/settingsService";

const SettingsContext = createContext<SiteSettings>({});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>({});

  useEffect(() => {
    getSettings()
      .then(setSettings)
      .catch(() => {});
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
