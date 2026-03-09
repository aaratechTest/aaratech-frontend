import { apiRequest } from "./api";

export interface SiteSettings {
  whatsappNumber?: string;
}

interface MessageResponse {
  message: string;
}

export async function getSettings(): Promise<SiteSettings> {
  return apiRequest<SiteSettings>("/settings");
}

export async function updateSettings(
  settings: SiteSettings
): Promise<MessageResponse> {
  return apiRequest<MessageResponse>("/settings", {
    method: "PUT",
    body: settings,
  });
}
