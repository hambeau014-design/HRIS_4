// src/api/salaryApi.ts
import { apiGet } from "./client";
import {
  mockSalaryList,
  mockSalaryDetails,
  mockSalaryHistories,
  type SalaryApiItem,
  type SalaryComponentResponse,
  type SalaryHistoryItem,
} from "../mocks/salary";

// true면 분리된 목 데이터 사용, false면 실제 서버 API 호출
const USE_MOCK_DATA = true;

export type { SalaryApiItem, SalaryComponentResponse, SalaryHistoryItem };

export type SalaryListResponse = {
  items: SalaryApiItem[];
  total: number;
  page: number;
  size: number;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// SAL-01: 급여 대상자 목록 조회
export async function getSalaryList(): Promise<SalaryListResponse> {
  if (USE_MOCK_DATA) {
    await delay(300);
    return {
      items: mockSalaryList,
      total: mockSalaryList.length,
      page: 1,
      size: 100,
    };
  }
  return apiGet<SalaryListResponse>("/salaries");
}

// SAL-02: 현재 급여 구성 조회
export async function getEmployeeSalary(employeeId: string): Promise<SalaryComponentResponse> {
  if (USE_MOCK_DATA) {
    await delay(200);
    return (
      mockSalaryDetails[employeeId] || {
        base_salary: 3000000,
        position_salary: 200000,
        meal_allowance: 200000,
        other_allowance: 100000,
        total_amount: 3500000,
        status: "COMPLETE",
        effective_date: "2026.01.01",
      }
    );
  }
  return apiGet<SalaryComponentResponse>(`/employees/${employeeId}/salary`);
}

// SAL-03: 급여 변경 이력·추이 조회
export async function getEmployeeSalaryHistory(employeeId: string): Promise<SalaryHistoryItem[]> {
  if (USE_MOCK_DATA) {
    await delay(200);
    return (
      mockSalaryHistories[employeeId] || [
        { effective_date: "2025.01", total_amount: 3000000 },
        { effective_date: "2026.01", total_amount: 3500000 },
      ]
    );
  }
  return apiGet<SalaryHistoryItem[]>(`/employees/${employeeId}/salary-history`);
}