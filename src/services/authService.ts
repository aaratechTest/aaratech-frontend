import { apiRequest } from "./api";

interface LoginResponse {
  token: string;
  admin: {
    id: string;
    name: string;
    email: string;
    role: "super_admin" | "admin";
  };
}

interface VerifyTokenResponse {
  valid: boolean;
  email: string;
  type: string;
}

interface MessageResponse {
  message: string;
}

interface ProfileResponse {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "admin";
  status: string;
  createdAt: number;
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  return apiRequest<LoginResponse>("/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

export async function verifyToken(token: string): Promise<VerifyTokenResponse> {
  return apiRequest<VerifyTokenResponse>("/auth/verify-token", {
    method: "POST",
    body: { token },
  });
}

export async function setPassword(
  token: string,
  password: string
): Promise<MessageResponse> {
  return apiRequest<MessageResponse>("/auth/set-password", {
    method: "POST",
    body: { token, password },
  });
}

export async function forgotPassword(
  email: string
): Promise<MessageResponse> {
  return apiRequest<MessageResponse>("/auth/forgot-password", {
    method: "POST",
    body: { email },
  });
}

export async function resetPassword(
  token: string,
  password: string
): Promise<MessageResponse> {
  return apiRequest<MessageResponse>("/auth/reset-password", {
    method: "POST",
    body: { token, password },
  });
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<MessageResponse> {
  return apiRequest<MessageResponse>("/auth/change-password", {
    method: "POST",
    body: { currentPassword, newPassword },
  });
}

export async function getProfile(): Promise<ProfileResponse> {
  return apiRequest<ProfileResponse>("/auth/profile");
}

export function logout(): void {
  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin_user");
}
