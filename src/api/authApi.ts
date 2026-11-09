// src/api/authApi.ts
import { apiPost } from "./client";

export interface LoginRequest {
  username: string;
  password?: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    username: string;
    name: string;
    role: "ADMIN" | "USER";
    department: string;
  };
}

export const authApi = {
  // 실제 로그인 API 호출
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    return apiPost<LoginResponse, LoginRequest>("/api/v1/auth/login", data);
  },
};