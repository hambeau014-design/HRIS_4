
import { apiGet, apiPost } from "./client";

export interface EvaluationPeriod {
  period_id: number;
  year: number;
  half: "H1" | "H2";
  title: string;
  start_date: string;
  end_date: string;
  status: "PLANNED" | "IN_PROGRESS" | "CLOSED";
  target_count: number;
  days_left: number | null;
}

export interface EvaluationPeriodListResponse {
  items: EvaluationPeriod[];
  total: number;
}

export interface EvaluationSummaryResponse {
  period_id: number;
  year: number;
  half: "H1" | "H2";
  title: string;
  start_date: string;
  end_date: string;
  status: "PLANNED" | "IN_PROGRESS" | "CLOSED";
  days_left: number | null;
  target_count: number;
  completed_count: number;
  not_submitted_count: number;
  progress_rate: number | null;
  progress_rate_change_vs_last_week: number | null;
  stages: Array<{
    stage: "GOAL" | "SELF" | "PEER" | "LEADER";
    completed_targets: number;
    rate: number;
  }>;
  grade_distribution: Array<{
    grade: "S" | "A" | "B" | "C" | "D";
    count: number;
    rate: number | null;
  }>;
}

export interface ParticipantItem {
  evaluation_id: number;
  employee_id: number;
  name: string;
  department_name: string;
  progress_rate: number;
  grade: "S" | "A" | "B" | "C" | "D" | null;
  status:
    | "NOT_STARTED"
    | "GOAL"
    | "SELF"
    | "PEER"
    | "LEADER"
    | "COMPLETED";
}

export interface ParticipantListResponse {
  items: ParticipantItem[];
  page: number;
  size: number;
  total: number;
}

export const evaluationApi = {
  // 평가 회차 목록 조회
  getEvaluationPeriods: async (): Promise<EvaluationPeriodListResponse> => {
    return apiGet<EvaluationPeriodListResponse>(
      "/evaluation-periods"
    );
  },

  // 평가 현황 요약 조회
  getEvaluationSummary: async (
    periodId: number
  ): Promise<EvaluationSummaryResponse> => {
    return apiGet<EvaluationSummaryResponse>(
      `/evaluation-periods/${periodId}/summary`
    );
  },

  // 평가 대상자 목록 조회
  getParticipants: async (
    periodId: number,
    params?: {
      q?: string;
      status?: string;
      grade?: string;
      page?: number;
      size?: number;
    }
  ): Promise<ParticipantListResponse> => {
    const searchParams = new URLSearchParams();

    if (params?.q) searchParams.append("q", params.q);
    if (params?.status && params.status !== "전체 상태") {
      searchParams.append("status", params.status);
    }
    if (params?.grade) searchParams.append("grade", params.grade);
    if (params?.page) {
      searchParams.append("page", String(params.page));
    }
    if (params?.size) {
      searchParams.append("size", String(params.size));
    }

    const queryStr = searchParams.toString()
      ? `?${searchParams.toString()}`
      : "";

    return apiGet<ParticipantListResponse>(
      `/evaluation-periods/${periodId}/participants${queryStr}`
    );
  },

  // 평가 단계 제출
  submitStageRecord: async (
    evaluationId: number,
    stage: string
  ): Promise<void> => {
    return apiPost<void, { stage: string }>(
      `/evaluations/${evaluationId}/stage-records`,
      { stage }
    );
  },
};
