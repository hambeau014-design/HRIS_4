import { apiGet, apiPost, apiPatch, apiDelete } from "./client";

// ==========================================
// Types 정의 (직급 관련 명세 기준)
// ==========================================

export interface JobGrade {
  position_id: number;
  position_code: string;
  position_name: string;
  level: number;
  description?: string | null;
  min_tenure_months?: number | null;
  is_active: boolean;
  headcount: number;
}

export interface JobGradeListResponse {
  items: JobGrade[];
  total: number;
}

export interface CreateJobGradeRequest {
  position_name: string;
  position_code: string;
  level: number;
  description?: string;
  min_tenure_months?: number;
}

export interface UpdateJobGradeRequest {
  position_name?: string;
  position_code?: string;
  level?: number;
  description?: string;
  min_tenure_months?: number;
}

// ==========================================
// JobGrade API 모듈 (ORG-08 ~ ORG-12)
// ==========================================

export const jobGradeApi = {
  // ORG-08: 직급 목록 조회 (검색어 q, 사용 중인 항목만 active_only 필터 지원)
  getJobGrades: async (params?: { q?: string; active_only?: boolean }): Promise<JobGradeListResponse> => {
    const searchParams = new URLSearchParams();
    if (params?.q) searchParams.append("q", params.q);
    if (params?.active_only !== undefined) searchParams.append("active_only", String(params.active_only));

    const queryStr = searchParams.toString() ? `?${searchParams.toString()}` : "";
    return apiGet<JobGradeListResponse>(`/api/v1/positions${queryStr}`);
  },

  // ORG-09: 직급 상세 조회
  getJobGradeDetail: async (positionId: number): Promise<JobGrade> => {
    return apiGet<JobGrade>(`/api/v1/positions/${positionId}`);
  },

  // ORG-10: 직급 추가
  createJobGrade: async (data: CreateJobGradeRequest): Promise<JobGrade> => {
    return apiPost<JobGrade, CreateJobGradeRequest>("/api/v1/positions", data);
  },

  // ORG-11: 직급 수정 (부분 수정)
  updateJobGrade: async (positionId: number, data: UpdateJobGradeRequest): Promise<JobGrade> => {
    return apiPatch<JobGrade, UpdateJobGradeRequest>(`/api/v1/positions/${positionId}`, data);
  },

  // ORG-12: 직급 사용 중지 (is_active = false 처리)
  deleteJobGrade: async (positionId: number): Promise<void> => {
    return apiDelete(`/api/v1/positions/${positionId}`);
  },
};