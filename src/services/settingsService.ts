import { apiRequest } from "./api";

export interface SiteSettings {
  whatsappNumber?: string;
  privacyPolicyUrl?: string;
  openingsUrl?: string;
  requestDemoUrl?: string;
  experienceToolUrl?: string;
  socialFacebook?: string;
  socialTwitter?: string;
  socialLinkedin?: string;
  socialInstagram?: string;
  socialYoutube?: string;
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
