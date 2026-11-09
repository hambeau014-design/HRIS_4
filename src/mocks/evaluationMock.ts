import type { EvaluationPeriod, EvaluationSummaryResponse, ParticipantItem } from "../api/evaluationApi";

const PERIODS_STORAGE_KEY = "hris_eval_periods_v1";
const PARTICIPANTS_STORAGE_KEY = "hris_eval_participants_v1";

const initialPeriods: EvaluationPeriod[] = [
  {
    period_id: 3,
    year: 2025,
    half: "H1",
    title: "2025 상반기 성과 평가",
    start_date: "2025-06-01",
    end_date: "2025-06-30",
    status: "IN_PROGRESS",
    target_count: 248,
    days_left: 12,
  },
];

const initialParticipants: ParticipantItem[] = [
  { evaluation_id: 10, employee_id: 1, name: "김미수", department_name: "개발팀", progress_rate: 0.5, grade: null, status: "SELF" },
  { evaluation_id: 11, employee_id: 2, name: "김민수", department_name: "플랫폼 개발", progress_rate: 0.75, grade: null, status: "LEADER" },
  { evaluation_id: 12, employee_id: 3, name: "김만수", department_name: "피플팀", progress_rate: 0.5, grade: null, status: "PEER" },
  { evaluation_id: 13, employee_id: 4, name: "김매수", department_name: "사업 전략", progress_rate: 0.25, grade: null, status: "SELF" },
];

export const getStoredPeriods = (): EvaluationPeriod[] => {
  const data = localStorage.getItem(PERIODS_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(PERIODS_STORAGE_KEY, JSON.stringify(initialPeriods));
    return initialPeriods;
  }
  try { return JSON.parse(data); } catch { return initialPeriods; }
};

export const getStoredParticipants = (): ParticipantItem[] => {
  const data = localStorage.getItem(PARTICIPANTS_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(PARTICIPANTS_STORAGE_KEY, JSON.stringify(initialParticipants));
    return initialParticipants;
  }
  try { return JSON.parse(data); } catch { return initialParticipants; }
};

export const saveStoredParticipants = (items: ParticipantItem[]) => {
  localStorage.setItem(PARTICIPANTS_STORAGE_KEY, JSON.stringify(items));
};

export const getMockSummary = (periodId: number): EvaluationSummaryResponse => {
  return {
    period_id: periodId,
    year: 2025,
    half: "H1",
    title: "2025 상반기 성과 평가",
    start_date: "2025-06-01",
    end_date: "2025-06-30",
    status: "IN_PROGRESS",
    days_left: 12,
    target_count: 248,
    completed_count: 96,
    not_submitted_count: 0,
    progress_rate: 0.7399,
    progress_rate_change_vs_last_week: 0.12,
    stages: [
      { stage: "GOAL", completed_targets: 248, rate: 1.0 },
      { stage: "SELF", completed_targets: 212, rate: 0.8548 },
      { stage: "PEER", completed_targets: 178, rate: 0.7177 },
      { stage: "LEADER", completed_targets: 96, rate: 0.3871 },
    ],
    grade_distribution: [
      { grade: "S", count: 18, rate: 0.1023 },
      { grade: "A", count: 44, rate: 0.25 },
      { grade: "B", count: 78, rate: 0.4432 },
      { grade: "C", count: 28, rate: 0.1591 },
      { grade: "D", count: 8, rate: 0.0455 },
    ],
  };
};