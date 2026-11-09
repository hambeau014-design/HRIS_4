import { apiGet, apiPost, apiPatch, apiDelete } from "./client";

// ==========================================
// Types 정의
// ==========================================

export interface CompanyInfo {
  company_id: number;
  name: string;
  name_en?: string | null;
  business_number: string;
  ceo_name?: string | null;
  founded_date?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  homepage?: string | null;
  industry?: string | null;
  logo_url?: string | null;
}

export interface DepartmentChild {
  department_id: number;
  department_name: string;
  is_active: boolean;
}

export interface Department {
  department_id: number;
  department_code: string;
  department_name: string;
  parent_department_id?: number | null;
  parent_department_name?: string | null;
  manager_employee_id?: number | null;
  manager_name?: string | null;
  description?: string | null;
  is_active: boolean;
  headcount: number;
  direct_headcount: number;
  children?: DepartmentChild[];
}

export interface Position {
  position_id: number;
  position_code: string;
  position_name: string;
  level: number;
  description?: string | null;
  min_tenure_months?: number | null;
  is_active: boolean;
  headcount: number;
}

export interface JobTitle {
  job_title_id: number;
  job_title_code: string;
  job_title_name: string;
  description?: string | null;
  is_active: boolean;
  headcount: number;
}

export interface Job {
  job_id: number;
  job_code: string;
  job_name: string;
  job_family?: string | null;
  job_category: string;
  description?: string | null;
  is_active: boolean;
  headcount: number;
}

export interface HeadcountSummary {
  total: number;
  total_change_vs_last_month: number;
  active: number;
  active_rate: number | null;
  on_leave: number;
  on_leave_rate: number | null;
  new_hires_this_month: number;
  new_hires_change_vs_last_month: number;
}

export interface DepartmentHeadcountItem {
  department_id: number;
  department_name: string;
  manager_name?: string | null;
  total: number;
  active: number;
  on_leave: number;
  new_hires: number;
  active_rate: number | null;
}

export interface HeadcountResponse {
  summary: HeadcountSummary;
  items: DepartmentHeadcountItem[];
  page: number;
  size: number;
  total: number;
}

// ==========================================
// Organization API 모듈
// ==========================================

export const organizationApi = {
  // --- 1. 회사 정보 (ORG-01, ORG-02, ORG-24) ---
  getCompany: async (): Promise<CompanyInfo> => {
    return apiGet<CompanyInfo>('/api/v1/company');
  },

  updateCompany: async (data: Partial<CompanyInfo>): Promise<CompanyInfo> => {
    return apiPatch<CompanyInfo, Partial<CompanyInfo>>('/api/v1/company', data);
  },

  uploadCompanyLogo: async (file: File): Promise<{ logo_url: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    return apiPost<{ logo_url: string }, FormData>('/api/v1/company/logo', formData, true);
  },

  // --- 2. 부서 관리 (ORG-03 ~ ORG-07) ---
  getDepartments: async (params?: { q?: string; active_only?: boolean }): Promise<{ items: Department[]; total: number }> => {
    const searchParams = new URLSearchParams();
    if (params?.q) searchParams.append('q', params.q);
    if (params?.active_only !== undefined) searchParams.append('active_only', String(params.active_only));
    
    const queryStr = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return apiGet<{ items: Department[]; total: number }>(`/api/v1/departments${queryStr}`);
  },

  getDepartmentDetail: async (departmentId: number): Promise<Department> => {
    return apiGet<Department>(`/api/v1/departments/${departmentId}`);
  },

  createDepartment: async (data: {
    department_name: string;
    department_code: string;
    parent_department_id?: number | null;
    description?: string;
    manager_employee_id?: number | null;
  }): Promise<Department> => {
    return apiPost<Department, typeof data>('/api/v1/departments', data);
  },

  updateDepartment: async (
    departmentId: number,
    data: Partial<{
      department_name: string;
      department_code: string;
      parent_department_id: number | null;
      description: string;
      manager_employee_id: number | null;
    }>
  ): Promise<Department> => {
    return apiPatch<Department, typeof data>(`/api/v1/departments/${departmentId}`, data);
  },

  deleteDepartment: async (departmentId: number): Promise<void> => {
    return apiDelete(`/api/v1/departments/${departmentId}`);
  },

  // --- 3. 직급 관리 (ORG-08 ~ ORG-12) ---
  getPositions: async (params?: { q?: string; active_only?: boolean }): Promise<{ items: Position[]; total: number }> => {
    const searchParams = new URLSearchParams();
    if (params?.q) searchParams.append('q', params.q);
    if (params?.active_only !== undefined) searchParams.append('active_only', String(params.active_only));

    const queryStr = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return apiGet<{ items: Position[]; total: number }>(`/api/v1/positions${queryStr}`);
  },

  getPositionDetail: async (positionId: number): Promise<Position> => {
    return apiGet<Position>(`/api/v1/positions/${positionId}`);
  },

  createPosition: async (data: {
    position_name: string;
    position_code: string;
    level: number;
    description?: string;
    min_tenure_months?: number;
  }): Promise<Position> => {
    return apiPost<Position, typeof data>('/api/v1/positions', data);
  },

  updatePosition: async (
    positionId: number,
    data: Partial<{
      position_name: string;
      position_code: string;
      level: number;
      description: string;
      min_tenure_months: number;
    }>
  ): Promise<Position> => {
    return apiPatch<Position, typeof data>(`/api/v1/positions/${positionId}`, data);
  },

  deletePosition: async (positionId: number): Promise<void> => {
    return apiDelete(`/api/v1/positions/${positionId}`);
  },

  // --- 4. 직책 관리 (ORG-13 ~ ORG-17) ---
  getJobTitles: async (params?: { q?: string; active_only?: boolean }): Promise<{ items: JobTitle[]; total: number }> => {
    const searchParams = new URLSearchParams();
    if (params?.q) searchParams.append('q', params.q);
    if (params?.active_only !== undefined) searchParams.append('active_only', String(params.active_only));

    const queryStr = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return apiGet<{ items: JobTitle[]; total: number }>(`/api/v1/job-titles${queryStr}`);
  },

  getJobTitleDetail: async (jobTitleId: number): Promise<JobTitle> => {
    return apiGet<JobTitle>(`/api/v1/job-titles/${jobTitleId}`);
  },

  createJobTitle: async (data: {
    job_title_name: string;
    job_title_code: string;
    description?: string;
  }): Promise<JobTitle> => {
    return apiPost<JobTitle, typeof data>('/api/v1/job-titles', data);
  },

  updateJobTitle: async (
    jobTitleId: number,
    data: Partial<{
      job_title_name: string;
      job_title_code: string;
      description: string;
    }>
  ): Promise<JobTitle> => {
    return apiPatch<JobTitle, typeof data>(`/api/v1/job-titles/${jobTitleId}`, data);
  },

  deleteJobTitle: async (jobTitleId: number): Promise<void> => {
    return apiDelete(`/api/v1/job-titles/${jobTitleId}`);
  },

  // --- 5. 직무 관리 (ORG-18 ~ ORG-22) ---
  getJobs: async (params?: { q?: string; active_only?: boolean }): Promise<{ items: Job[]; total: number }> => {
    const searchParams = new URLSearchParams();
    if (params?.q) searchParams.append('q', params.q);
    if (params?.active_only !== undefined) searchParams.append('active_only', String(params.active_only));

    const queryStr = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return apiGet<{ items: Job[]; total: number }>(`/api/v1/jobs${queryStr}`);
  },

  getJobDetail: async (jobId: number): Promise<Job> => {
    return apiGet<Job>(`/api/v1/jobs/${jobId}`);
  },

  createJob: async (data: {
    job_name: string;
    job_code: string;
    job_family: string;
    job_category: string;
    description?: string;
  }): Promise<Job> => {
    return apiPost<Job, typeof data>('/api/v1/jobs', data);
  },

  updateJob: async (
    jobId: number,
    data: Partial<{
      job_name: string;
      job_code: string;
      job_family: string;
      job_category: string;
      description: string;
    }>
  ): Promise<Job> => {
    return apiPatch<Job, typeof data>(`/api/v1/jobs/${jobId}`, data);
  },

  deleteJob: async (jobId: number): Promise<void> => {
    return apiDelete(`/api/v1/jobs/${jobId}`);
  },

  // --- 6. 조직별 인원 현황 (ORG-23) ---
  getHeadcounts: async (params?: {
    q?: string;
    employment_status?: 'ACTIVE' | 'ON_LEAVE';
    division_id?: number;
    page?: number;
    size?: number;
  }): Promise<HeadcountResponse> => {
    const searchParams = new URLSearchParams();
    if (params?.q) searchParams.append('q', params.q);
    if (params?.employment_status) searchParams.append('employment_status', params.employment_status);
    if (params?.division_id !== undefined) searchParams.append('division_id', String(params.division_id));
    if (params?.page !== undefined) searchParams.append('page', String(params.page));
    if (params?.size !== undefined) searchParams.append('size', String(params.size));

    const queryStr = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return apiGet<HeadcountResponse>(`/api/v1/organization/headcounts${queryStr}`);
  },
};