import { apiRequest, BASE_URL } from "./api";
import type { Event, EventListItem, CreateEventResponse, MessageResponse } from "../types/event";

// Public
export async function getEvents(): Promise<EventListItem[]> {
  return apiRequest<EventListItem[]>("/events");
}

export async function getEventBySlug(slug: string): Promise<Event> {
  return apiRequest<Event>(`/events/slug/${slug}`);
}

// Admin
export async function getAllEvents(): Promise<Event[]> {
  return apiRequest<Event[]>("/events/all");
}

export async function getEventById(id: string): Promise<Event> {
  return apiRequest<Event>(`/events/${id}`);
}

export async function createEvent(formData: FormData): Promise<CreateEventResponse> {
  const token = localStorage.getItem("admin_token");
  const response = await fetch(`${BASE_URL}/events`, {
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

export async function updateEvent(id: string, formData: FormData): Promise<MessageResponse> {
  const token = localStorage.getItem("admin_token");
  const response = await fetch(`${BASE_URL}/events/${id}`, {
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

export async function deleteEvent(id: string): Promise<MessageResponse> {
  return apiRequest<MessageResponse>(`/events/${id}`, { method: "DELETE" });
}
