import { apiRequest } from "./api";

export interface PageContent {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  sections: Record<string, unknown>;
  updatedAt?: number;
  updatedBy?: string;
}

export async function getContent(slug: string): Promise<PageContent> {
  return apiRequest<PageContent>(`/content/${slug}`);
}

export async function updateContent(
  slug: string,
  data: {
    title?: string;
    metaTitle?: string;
    metaDescription?: string;
    sections: Record<string, unknown>;
  }
): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`/content/${slug}`, {
    method: "PUT",
    body: data,
  });
}

export async function seedContent(): Promise<{
  message: string;
  seeded: number;
  skipped: number;
}> {
  return apiRequest<{ message: string; seeded: number; skipped: number }>(
    "/content/seed",
    { method: "POST" }
  );
}
