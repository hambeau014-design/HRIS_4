// src/mocks/departmentsMock.ts
export type Department = {
  id: string;
  name: string;
  parent: string;
  members: number;
};

const STORAGE_KEY = "hris_departments_mock_v1";

const initialDepartments: Department[] = [
  { id: "DEP-001", name: "경영지원본부", parent: "최상위 부서", members: 18 },
  { id: "DEP-002", name: "인사팀", parent: "경영지원본부", members: 8 },
  { id: "DEP-003", name: "재무회계팀", parent: "경영지원본부", members: 7 },
  { id: "DEP-004", name: "사업본부", parent: "최상위 부서", members: 42 },
  { id: "DEP-005", name: "서비스개발팀", parent: "사업본부", members: 24 },
];

export const getStoredDepartments = (): Department[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDepartments));
    return initialDepartments;
  }
  try {
    return JSON.parse(data);
  } catch {
    return initialDepartments;
  }
};

export const saveStoredDepartments = (departments: Department[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(departments));
};