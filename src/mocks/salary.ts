// src/api/mockSalaryData.ts

export type SalaryApiItem = {
  employee_id: string | number;
  employee_no: string;
  employee_name: string;
  department_name?: string;
  position_name?: string;
  employment_status: string;
  total_salary?: number;
};

export type SalaryComponentResponse = {
  base_salary: number | null;
  position_salary: number | null;
  meal_allowance: number | null;
  other_allowance: number | null;
  total_amount: number | null;
  status: "COMPLETE" | "UNKNOWN";
  effective_date: string;
};

export type SalaryHistoryItem = {
  effective_date: string;
  total_amount: number;
  base_salary?: number | null;
};

export const mockSalaryList: SalaryApiItem[] = [
  {
    employee_id: "1",
    employee_no: "EMP001",
    employee_name: "김민수",
    department_name: "인사팀",
    position_name: "대리",
    employment_status: "ACTIVE",
    total_salary: 3500000,
  },
  {
    employee_id: "2",
    employee_no: "EMP002",
    employee_name: "이서연",
    department_name: "개발팀",
    position_name: "사원",
    employment_status: "ACTIVE",
    total_salary: 2800000,
  },
  {
    employee_id: "3",
    employee_no: "EMP003",
    employee_name: "박지훈",
    department_name: "기획팀",
    position_name: "과장",
    employment_status: "ACTIVE",
    total_salary: 4200000,
  },
  {
    employee_id: "4",
    employee_no: "EMP004",
    employee_name: "최유진",
    department_name: "디자인팀",
    position_name: "대리",
    employment_status: "ON_LEAVE",
    total_salary: 3200000,
  },
  {
    employee_id: "5",
    employee_no: "EMP005",
    employee_name: "정재현",
    department_name: "영업팀",
    position_name: "차장",
    employment_status: "ACTIVE",
    total_salary: 5100000,
  },
];

export const mockSalaryDetails: Record<string, SalaryComponentResponse> = {
  "1": {
    base_salary: 2800000,
    position_salary: 300000,
    meal_allowance: 200000,
    other_allowance: 200000,
    total_amount: 3500000,
    status: "COMPLETE",
    effective_date: "2026.09.01",
  },
  "2": {
    base_salary: 2300000,
    position_salary: 100000,
    meal_allowance: 200000,
    other_allowance: 200000,
    total_amount: 2800000,
    status: "COMPLETE",
    effective_date: "2026.08.01",
  },
  "3": {
    base_salary: null,
    position_salary: null,
    meal_allowance: null,
    other_allowance: null,
    total_amount: 4200000,
    status: "UNKNOWN", // 명세서 7-1: 항목 미입력 테스트용
    effective_date: "2026.01.01",
  },
};

export const mockSalaryHistories: Record<string, SalaryHistoryItem[]> = {
  "1": [
    { effective_date: "2024.01", total_amount: 2900000 },
    { effective_date: "2024.07", total_amount: 3100000 },
    { effective_date: "2025.01", total_amount: 3300000 },
    { effective_date: "2026.01", total_amount: 3500000 },
  ],
  "2": [
    { effective_date: "2024.03", total_amount: 2500000 },
    { effective_date: "2025.03", total_amount: 2800000 },
  ],
  "3": [
    { effective_date: "2023.01", total_amount: 3800000 },
    { effective_date: "2025.01", total_amount: 4200000 },
  ],
};