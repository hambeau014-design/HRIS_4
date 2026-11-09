import { apiGet, apiPost, apiPatch, apiDelete } from "./client";

export interface JobItem {
  job_id: number;
  job_code: string;
  job_name: string;
  job_family: string;
  job_category: string;
  description?: string | null;
  is_active: boolean;
  headcount: number;
}

export interface JobListResponse {
  items: JobItem[];
  total: number;
}

export const jobApi = {
  // ORG-18: 직무 목록 조회
  getJobs: async (params?: { q?: string; active_only?: boolean }): Promise<JobListResponse> => {
    const searchParams = new URLSearchParams();
    if (params?.q) searchParams.append("q", params.q);
    if (params?.active_only !== undefined) searchParams.append("active_only", String(params.active_only));

    const queryStr = searchParams.toString() ? `?${searchParams.toString()}` : "";
    return apiGet<JobListResponse>(`/api/v1/jobs${queryStr}`);
  },

  // ORG-19: 직무 상세 조회
  getJobDetail: async (jobId: number): Promise<JobItem> => {
    return apiGet<JobItem>(`/api/v1/jobs/${jobId}`);
  },

  // ORG-20: 직무 추가
  createJob: async (data: {
    job_name: string;
    job_code: string;
    job_family: string;
    job_category: string;
    description?: string;
  }): Promise<JobItem> => {
    return apiPost<JobItem, typeof data>("/api/v1/jobs", data);
  },

  // ORG-21: 직무 수정
  updateJob: async (
    jobId: number,
    data: Partial<{
      job_name: string;
      job_code: string;
      job_family: string;
      job_category: string;
      description: string;
    }>
  ): Promise<JobItem> => {
    return apiPatch<JobItem, typeof data>(`/api/v1/jobs/${jobId}`, data);
  },

  // ORG-22: 직무 사용 중지 (DELETE)
  deleteJob: async (jobId: number): Promise<void> => {
    return apiDelete(`/api/v1/jobs/${jobId}`);
  },
};