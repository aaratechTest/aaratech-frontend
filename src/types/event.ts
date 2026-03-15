export type EventType = "webinar" | "conference" | "workshop" | "meetup";

export interface Event {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  coverImagePath: string;
  eventDate: string;
  location: string;
  eventType: EventType;
  registrationUrl: string;
  author: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}

export interface EventListItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl: string;
  eventDate: string;
  location: string;
  eventType: EventType;
  registrationUrl: string;
  author: string;
  createdAt: string;
}

export interface CreateEventResponse {
  message: string;
  id: string;
  event: Event;
}

export interface MessageResponse {
  message: string;
}
