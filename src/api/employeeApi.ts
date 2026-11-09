import { apiGet } from "./client";
import type { Employee } from "../components/employee/EmployeeDirectorySection";

type EmployeeApiItem = {
  employee_id: number | string;
  employee_no: string;
  employee_name: string;
  department_id: number | string;
  department_name?: string | null;
  position_id: number | string;
  position_name?: string | null;
  employment_status: string;
  hire_date: string;
};

type EmployeeListResponse = {
  items: EmployeeApiItem[];
  page: number;
  size: number;
  total: number;
};

const USE_MOCK_DATA = true;

const mockEmployees: Employee[] = [
  { id: "1", employeeNo: "EMP001", name: "김민수", initial: "김", department: "인사팀", position: "대리", status: "재직", joinedAt: "2021.03.15", avatarClass: "bg-[#e6f2fc]" },
  { id: "2", employeeNo: "EMP002", name: "이서연", initial: "이", department: "개발팀", position: "사원", status: "재직", joinedAt: "2022.07.01", avatarClass: "bg-[#f0effd]" },
  { id: "3", employeeNo: "EMP003", name: "박지훈", initial: "박", department: "기획팀", position: "대리", status: "재직", joinedAt: "2020.11.23", avatarClass: "bg-[#e8f8f6]" },
  { id: "4", employeeNo: "EMP004", name: "최유진", initial: "최", department: "디자인팀", position: "사원", status: "재직", joinedAt: "2023.02.10", avatarClass: "bg-[#f4effa]" },
  { id: "5", employeeNo: "EMP005", name: "정재현", initial: "정", department: "영업팀", position: "과장", status: "재직", joinedAt: "2019.08.12", avatarClass: "bg-[#e6f2fc]" },
  { id: "6", employeeNo: "EMP006", name: "김수빈", initial: "김", department: "마케팅팀", position: "대리", status: "재직", joinedAt: "2021.09.03", avatarClass: "bg-[#f0effd]" },
  { id: "7", employeeNo: "EMP007", name: "이준호", initial: "이", department: "개발팀", position: "과장", status: "재직", joinedAt: "2018.12.17", avatarClass: "bg-[#e8f8f6]" },
];

function formatDate(date: string): string {
  if (!date) return "-";
  return date.replaceAll("-", ".");
}

function formatStatus(status: string): string {
  const statusMap: Record<string, string> = {
    ACTIVE: "재직",
    ON_LEAVE: "휴직",
    TERMINATED: "퇴사",
  };
  return statusMap[status] ?? status;
}

//EMP-01 사원 목록 검색 (GET /api/v1/employees)
function convertEmployee(item: EmployeeApiItem): Employee {
  return {
    id: String(item.employee_id),
    employeeNo: item.employee_no,
    name: item.employee_name,
    initial: item.employee_name?.charAt(0) ?? "?",
    department: item.department_name ?? `부서(${item.department_id})`,
    position: item.position_name ?? `직급(${item.position_id})`,
    status: formatStatus(item.employment_status),
    joinedAt: formatDate(item.hire_date),
    avatarClass: "bg-[#e6f2fc]",
  };
}

export async function getEmployees(): Promise<Employee[]> {
  if (USE_MOCK_DATA) {
    return mockEmployees;
  }

  const data = await apiGet<EmployeeListResponse>("/employees?page=1&size=100");
  return data.items.map(convertEmployee);
}

// EMP-02: 사원 상세 조회 (GET /api/v1/employees/{employee_id})
export async function getEmployeeDetail(employeeId: string): Promise<any> {
  const response = await fetch(`/api/v1/employees/${employeeId}`);
  if (!response.ok) {
    throw new Error("사원 상세 정보를 불러오지 못했습니다.");
  }
  return response.json();
}

// EMP-03: 직원 등록 (POST /api/v1/employees)
export async function registerEmployee(employeeData: {
  employee_name: string;
  email: string;
  department_id: string;
  position_id: string;
  job_title_id?: string;
  hire_date: string;
}): Promise<any> {
  const response = await fetch(`/api/v1/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employeeData),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "직원 등록에 실패했습니다.");
  }
  return response.json();
}

//EMP-04 사원 정보 수정 (PATCH /api/v1/employees/{employee_id})
export async function updateEmployee(
  employeeId: string,
  updateData: {
    department?: string;
    position?: string;
    phone?: string;
    email?: string;
    address?: string;
  }
): Promise<any> {
  const response = await fetch(`/api/v1/employees/${employeeId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "사원 정보 수정에 실패했습니다.");
  }

  return response.json();
}

// EMP-06: 인사발령 등록 (POST /api/v1/employees/{employee_id}/assignments)
export async function createAssignment(
  employeeId: string,
  assignmentData: {
    appointment_type: string; // 예: 'PROMOTION', 'DEPARTMENT_TRANSFER' 등
    target_department_id?: string;
    target_position_id?: string;
    effective_date: string;
  }
): Promise<any> {
  const response = await fetch(`/api/v1/employees/${employeeId}/assignments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(assignmentData),
  });
  if (!response.ok) {
    throw new Error("인사발령 등록에 실패했습니다.");
  }
  return response.json();
}

// EMP-07: 퇴사 처리 (POST /api/v1/employees/{employee_id}/termination)
export async function terminateEmployee(
  employeeId: string,
  terminationData: {
    termination_date: string;
    reason: string;
  }
): Promise<any> {
  const response = await fetch(`/api/v1/employees/${employeeId}/termination`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(terminationData),
  });
  if (!response.ok) {
    throw new Error("퇴사 처리에 실패했습니다.");
  }
  return response.json();
}

//EMP-08
export async function deleteEmployee(employeeId: string): Promise<void> {
  const response = await fetch(`/api/v1/employees/${employeeId}`, {
    method: "DELETE",
  });

  if (!response.ok && response.status !== 204) {
    if (response.status === 409) {
      throw new Error("인사 이력이 존재하여 삭제할 수 없습니다. (상태 충돌)");
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "사원 삭제에 실패했습니다.");
  }
}
