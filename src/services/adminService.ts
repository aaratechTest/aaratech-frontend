import { apiRequest } from "./api";

interface Admin {
  id: string;
  email: string;
  name: string;
  role: "super_admin" | "admin";
  status: "pending" | "active";
  createdAt: number;
  createdBy: string;
}

interface InviteResponse {
  message: string;
  admin: Admin;
}

interface MessageResponse {
  message: string;
}

export async function getAdmins(): Promise<Admin[]> {
  return apiRequest<Admin[]>("/admins");
}

export async function inviteAdmin(data: {
  email: string;
  name: string;
  role: string;
}): Promise<InviteResponse> {
  return apiRequest<InviteResponse>("/admins/invite", {
    method: "POST",
    body: data,
  });
}

export async function deleteAdmin(id: string): Promise<MessageResponse> {
  return apiRequest<MessageResponse>(`/admins/${id}`, {
    method: "DELETE",
  });
}

export async function resendInvite(id: string): Promise<MessageResponse> {
  return apiRequest<MessageResponse>(`/admins/${id}/resend-invite`, {
    method: "POST",
  });
}
