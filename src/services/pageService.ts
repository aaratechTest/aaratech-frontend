import { apiRequest, BASE_URL } from "./api";
import type { Page, PageListItem, Menu, Block } from "../types/page";

interface MessageResponse {
  message: string;
}

interface CreatePageResponse {
  message: string;
  page: { id: string; title: string; slug: string; status: string };
}

// ── Pages ──

export async function getPages(): Promise<PageListItem[]> {
  return apiRequest<PageListItem[]>("/pages");
}

export async function getPageById(id: string): Promise<Page> {
  return apiRequest<Page>(`/pages/${id}`);
}

export async function getPageBySlug(slug: string): Promise<Page> {
  return apiRequest<Page>(`/pages/slug/${slug}`);
}

export async function createPage(data: {
  title: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  blocks?: Block[];
  status?: string;
}): Promise<CreatePageResponse> {
  return apiRequest<CreatePageResponse>("/pages", {
    method: "POST",
    body: data,
  });
}

export async function updatePage(
  id: string,
  data: Partial<{
    title: string;
    slug: string;
    metaTitle: string;
    metaDescription: string;
    blocks: Block[];
    status: string;
  }>
): Promise<MessageResponse> {
  return apiRequest<MessageResponse>(`/pages/${id}`, {
    method: "PUT",
    body: data,
  });
}

export async function deletePage(id: string): Promise<MessageResponse> {
  return apiRequest<MessageResponse>(`/pages/${id}`, {
    method: "DELETE",
  });
}

export async function seedPages(): Promise<{ message: string; created: number; skipped: number }> {
  return apiRequest<{ message: string; created: number; skipped: number }>("/pages/seed", {
    method: "POST",
  });
}

// ── Menu ──

export async function getMenu(): Promise<Menu> {
  return apiRequest<Menu>("/menu");
}

export async function updateMenu(items: Menu["items"]): Promise<MessageResponse> {
  return apiRequest<MessageResponse>("/menu", {
    method: "PUT",
    body: { items },
  });
}

// ── Images ──

export interface GalleryImage {
  id: string;
  fileName: string;
  originalName: string;
  url: string;
  contentType: string;
  size: number;
  createdAt: string;
}

export async function getImages(): Promise<GalleryImage[]> {
  return apiRequest<GalleryImage[]>("/images");
}

export async function deleteImage(id: string): Promise<MessageResponse> {
  return apiRequest<MessageResponse>(`/images/${id}`, { method: "DELETE" });
}

export async function uploadImage(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("image", file);

  const token = localStorage.getItem("admin_token");
  const response = await fetch(`${BASE_URL}/images/upload`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  if (!response.ok) {
    let errorMessage = `Upload failed: ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData.error) errorMessage = errorData.error;
    } catch {
      // not JSON
    }
    throw new Error(errorMessage);
  }

  return response.json();
}
