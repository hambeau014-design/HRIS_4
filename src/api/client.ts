const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api/v1";

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`API GET 요청 실패 (${response.status})`);
  }

  return (await response.json()) as T;
}

export async function apiPost<T, B = unknown>(path: string, body?: B, isFormData = false): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    credentials: "include",
    headers,
    body: isFormData ? (body as BodyInit) : JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`API POST 요청 실패 (${response.status})`);
  }

  // 204 No Content 등의 응답 처리
  if (response.status === 204) {
    return {} as T;
  }

  return (await response.json()) as T;
}

export async function apiPatch<T, B = unknown>(path: string, body?: B): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`API PATCH 요청 실패 (${response.status})`);
  }

  return (await response.json()) as T;
}

export async function apiDelete(path: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`API DELETE 요청 실패 (${response.status})`);
  }
}