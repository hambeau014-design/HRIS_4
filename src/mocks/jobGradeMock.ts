// src/mocks/jobGradesMock.ts
export type JobGradeMock = {
  position_id: number;
  position_code: string;
  position_name: string;
  level: number;
  description: string;
  min_tenure_months: number;
  is_active: boolean;
  headcount: number;
};

const STORAGE_KEY = "hris_job_grades_mock_v1";

const initialJobGrades: JobGradeMock[] = [
  {
    position_id: 1,
    position_code: "RANK-01",
    position_name: "사원",
    level: 1,
    description: "신입 및 실무 담당자에게 적용되는 기본 직급입니다.",
    min_tenure_months: 12,
    is_active: true,
    headcount: 63,
  },
  {
    position_id: 2,
    position_code: "RANK-02",
    position_name: "대리",
    level: 2,
    description: "주무 담당자 직급입니다.",
    min_tenure_months: 24,
    is_active: true,
    headcount: 41,
  },
  {
    position_id: 3,
    position_code: "RANK-03",
    position_name: "과장",
    level: 3,
    description: "실무 총괄 및 프로젝트 리드 직급입니다.",
    min_tenure_months: 36,
    is_active: true,
    headcount: 28,
  },
  {
    position_id: 4,
    position_code: "RANK-04",
    position_name: "차장",
    level: 4,
    description: "파트장 및 중간 관리자 직급입니다.",
    min_tenure_months: 48,
    is_active: true,
    headcount: 14,
  },
  {
    position_id: 5,
    position_code: "RANK-05",
    position_name: "부장",
    level: 5,
    description: "부서 총괄 및 최고 관리자 직급입니다.",
    min_tenure_months: 60,
    is_active: true,
    headcount: 9,
  },
];

export const getStoredJobGrades = (): JobGradeMock[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialJobGrades));
    return initialJobGrades;
  }
  try {
    return JSON.parse(data);
  } catch {
    return initialJobGrades;
  }
};

export const saveStoredJobGrades = (grades: JobGradeMock[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(grades));
};