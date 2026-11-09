import { useEffect, useState } from "react";

import { getEmployeeDetail } from "../../api/employeeApi";
import {
  getEmployeeSalary,
  getEmployeeSalaryHistory,
  type SalaryComponentResponse,
  type SalaryHistoryItem,
} from "../../api/salaryApi";

type TabType = "profile" | "salary";

export default function MyInfo() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  const [employee, setEmployee] = useState<any>(null);
  const [salary, setSalary] = useState<SalaryComponentResponse | null>(null);
  const [salaryHistory, setSalaryHistory] = useState<SalaryHistoryItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 로그인한 사원의 ID를 안전하게 가져오기 (localStorage 키 불일치 및 예외 방어)
  const getLoggedInEmployeeId = () => {
    const rawId = localStorage.getItem("employee_id");
    if (rawId) return rawId;

    try {
      const userInfoStr = localStorage.getItem("hris_user_info");
      if (userInfoStr) {
        const userInfo = JSON.parse(userInfoStr);
        if (userInfo?.id) return String(userInfo.id);
      }
    } catch (e) {
      console.error("사용자 정보 파싱 오류:", e);
    }

    return "1"; // 기본값 (테스트용)
  };

  const employeeId = getLoggedInEmployeeId();

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        setLoading(true);
        setError("");

        const [employeeData, salaryData, historyData] =
          await Promise.all([
            getEmployeeDetail(employeeId),
            getEmployeeSalary(employeeId),
            getEmployeeSalaryHistory(employeeId),
          ]);

        setEmployee(employeeData);
        setSalary(salaryData);
        setSalaryHistory(historyData);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "정보를 불러오지 못했습니다."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyInfo();
  }, [employeeId]);

  if (loading) {
    return <div className="p-6">정보를 불러오는 중입니다.</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  const profileFields = [
    { label: "이름", value: employee?.employee_name },
    { label: "사번", value: employee?.employee_no },
    { label: "부서", value: employee?.department_name },
    { label: "직급", value: employee?.position_name },
    { label: "입사일", value: employee?.hire_date },
    { label: "재직 상태", value: employee?.employment_status },
  ];

  const salaryFields = [
    { label: "기본급", value: salary?.base_salary },
    { label: "직책수당", value: salary?.position_salary },
    { label: "식대", value: salary?.meal_allowance },
    { label: "기타수당", value: salary?.other_allowance },
  ];

  const formatMoney = (value: number | null | undefined) =>
    value == null ? "-" : `${value.toLocaleString("ko-KR")}원`;

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold">내 정보</h1>
        <p className="mt-2 text-sm text-gray-500">
          나의 인사 정보와 급여 정보를 확인할 수 있습니다.
        </p>
      </div>

      {/* 사원 프로필 */}
      <div className="rounded-xl border bg-white p-6">
        <h2 className="text-lg font-semibold">
          {employee?.employee_name || "사원"}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {employee?.department_name || "-"} · {employee?.position_name || "-"}
        </p>
      </div>

      {/* 탭 */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-6 py-3 text-sm ${
            activeTab === "profile"
              ? "border-b-2 border-blue-600 font-semibold text-blue-600"
              : "text-gray-500"
          }`}
        >
          기본 인사 정보
        </button>

        <button
          onClick={() => setActiveTab("salary")}
          className={`px-6 py-3 text-sm ${
            activeTab === "salary"
              ? "border-b-2 border-blue-600 font-semibold text-blue-600"
              : "text-gray-500"
          }`}
        >
          급여 정보
        </button>
      </div>

      {/* 기본 인사 정보 */}
      {activeTab === "profile" && (
        <section className="rounded-xl border bg-white p-6">
          <h2 className="mb-6 text-lg font-semibold">
            기본 인사 정보
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {profileFields.map((field) => (
              <div key={field.label} className="border-b pb-3">
                <p className="mb-2 text-sm text-gray-500">
                  {field.label}
                </p>
                <p className="font-medium">
                  {field.value ?? "-"}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 급여 정보 */}
      {activeTab === "salary" && (
        <section className="space-y-5">
          <div className="rounded-xl border bg-white p-6">
            <h2 className="mb-6 text-lg font-semibold">
              현재 급여 구성
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {salaryFields.map((field) => (
                <div key={field.label} className="border-b pb-3">
                  <p className="mb-2 text-sm text-gray-500">
                    {field.label}
                  </p>
                  <p className="font-semibold">
                    {formatMoney(field.value)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg bg-blue-50 p-5">
              <p className="text-sm text-blue-700">
                총 급여
              </p>
              <p className="mt-2 text-2xl font-bold text-blue-900">
                {formatMoney(salary?.total_amount)}
              </p>
            </div>
          </div>

          <div className="rounded-xl border bg-white p-6">
            <h2 className="mb-5 text-lg font-semibold">
              급여 변경 이력
            </h2>

            {salaryHistory.length === 0 ? (
              <p className="text-sm text-gray-500">
                급여 변경 이력이 없습니다.
              </p>
            ) : (
              <div className="space-y-4">
                {salaryHistory.map((item, index) => (
                  <div
                    key={`${item.effective_date}-${index}`}
                    className="flex justify-between border-b pb-3"
                  >
                    <span className="text-sm text-gray-500">
                      {item.effective_date}
                    </span>
                    <span className="font-medium">
                      {formatMoney(item.total_amount)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}