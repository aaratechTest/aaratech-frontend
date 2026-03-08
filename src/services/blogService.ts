import { apiRequest, BASE_URL } from "./api";
import type { Blog, BlogListItem, CreateBlogResponse, MessageResponse } from "../types/blog";

// Public
export async function getBlogs(): Promise<BlogListItem[]> {
  return apiRequest<BlogListItem[]>("/blogs");
}

export async function getBlogBySlug(slug: string): Promise<Blog> {
  return apiRequest<Blog>(`/blogs/slug/${slug}`);
}

// Admin
export async function getAllBlogs(): Promise<Blog[]> {
  return apiRequest<Blog[]>("/blogs/all");
}

export async function getBlogById(id: string): Promise<Blog> {
  return apiRequest<Blog>(`/blogs/${id}`);
}

export async function createBlog(formData: FormData): Promise<CreateBlogResponse> {
  const token = localStorage.getItem("admin_token");
  const response = await fetch(`${BASE_URL}/blogs`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  if (!response.ok) {
    let errorMessage = `Failed: ${response.status}`;
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

export async function updateBlog(id: string, formData: FormData): Promise<MessageResponse> {
  const token = localStorage.getItem("admin_token");
  const response = await fetch(`${BASE_URL}/blogs/${id}`, {
    method: "PUT",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  if (!response.ok) {
    let errorMessage = `Failed: ${response.status}`;
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

export async function deleteBlog(id: string): Promise<MessageResponse> {
  return apiRequest<MessageResponse>(`/blogs/${id}`, { method: "DELETE" });
}
