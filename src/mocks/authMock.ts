// src/mocks/authMock.ts

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

export const authLogin = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const username = credentials.username || "";
  const lowerId = username.trim().toLowerCase();
  
  const isAdmin = lowerId.includes("admin") || lowerId.includes("관리자");

  const user = {
    id: isAdmin ? 1 : 2,
    username: username,
    name: isAdmin ? "홍승희" : "김민수",
    role: (isAdmin ? "ADMIN" : "USER") as "ADMIN" | "USER",
    department: isAdmin ? "피플팀 (HR)" : "플랫폼 개발팀",
  };

  const response: LoginResponse = {
    access_token: `mock-token-${user.role.toLowerCase()}`,
    token_type: "Bearer",
    user,
  };

  //사이드바 권한 필터링 및 인증 상태 유지를 위해 로컬 스토리지에 저장
  localStorage.setItem("user_role", user.role);
  localStorage.setItem("hris_access_token", response.access_token);
  localStorage.setItem("hris_user_info", JSON.stringify(user));

  return response;
};