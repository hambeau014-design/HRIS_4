import { useState, useEffect, type JSX } from "react";
import { getEmployeeSalary, getEmployeeSalaryHistory, type SalaryComponentResponse, type SalaryHistoryItem } from "../../api/salaryApi";
import type { SalaryEmployee } from "./EmployeeSalaryListSection";

type EmployeeSalaryDetailsSectionProps = {
  employee: SalaryEmployee | null;
};

export const EmployeeSalaryDetailsSection = ({
  employee,
}: EmployeeSalaryDetailsSectionProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState<"history" | "profile">("history");
  const [salaryInfo, setSalaryInfo] = useState<SalaryComponentResponse | null>(null);
  const [salaryHistory, setSalaryHistory] = useState<SalaryHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  // 선택된 사원이 바뀔 때마다 SAL-02, SAL-03 API 호출
  useEffect(() => {
    if (!employee) return;

    let cancelled = false;
    const loadSalaryDetails = async () => {
      try {
        setLoading(true);
        const [compData, historyData] = await Promise.all([
          getEmployeeSalary(employee.id),
          getEmployeeSalaryHistory(employee.id),
        ]);
        if (!cancelled) {
          setSalaryInfo(compData);
          setSalaryHistory(historyData);
        }
      } catch (err) {
        console.error("급여 상세 정보 로딩 실패:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void loadSalaryDetails();
    return () => {
      cancelled = true;
    };
  }, [employee]);

  if (!employee) {
    return (
      <section className="relative row-[1_/_2] col-[2_/_3] w-full h-[864px] flex items-center justify-center bg-white rounded-[15px] border border-solid border-[#e4e9f0]">
        <p className="text-sm text-[#8091a7]">직원을 선택하면 상세 급여 정보가 표시됩니다.</p>
      </section>
    );
  }

  const isUnknown = salaryInfo?.status === "UNKNOWN";

  return (
    <section
      aria-labelledby="employee-salary-heading"
      className="relative row-[1_/_2] col-[2_/_3] [align-self:start] w-full h-[864px] flex flex-col items-start bg-white rounded-[15px] overflow-hidden border border-solid border-[#e4e9f0] shadow-[0px_10px_30px_#2239560b]"
    >
      {/* 헤더 프로필 영역 */}
      <header className="flex w-full flex-col items-start border-b border-[#e9edf2] pt-[31px] pb-[21px] px-[23px]">
        <div className="flex w-full items-center justify-start gap-[17px]">
          <div
            aria-label="프로필"
            className="relative grid grid-cols-[68px] grid-rows-[68px] w-[68px] h-[68px] bg-[#e7f3fe] rounded-[34px] shadow-[inset_0px_0px_0px_4px_#eff7ff]"
          >
            <div className="relative row-[1_/_2] col-[1_/_2] justify-self-center self-center w-[22px] h-[35px] [font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#4071ac] text-[23px] tracking-[0] leading-[34.5px] whitespace-nowrap">
              {employee.initial || employee.name?.[0] || ""}
            </div>
          </div>
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <h1 id="employee-salary-heading" className="max-w-full break-words text-center text-lg font-bold text-[#172136] sm:text-xl">
                {employee.name}
              </h1>
              <span className="bg-[#dcf8eb] text-[#13a970] text-[10px] px-2 py-0.5 rounded-md font-bold">
                {employee.status}
              </span>
            </div>
            <p className="mt-2 text-left text-[10px] leading-[15px] text-[#8392a6]">
              {employee.employeeNo} · {employee.department} · {employee.position}
            </p>
          </div>
        </div>

        {/* 현재 급여 카드 (SAL-02 연동) */}
        <div className="h-44 px-[18px] py-[21px] self-stretch bg-[#ffffff00] rounded-[7px] border border-solid border-[#e1eaf4] flex items-center relative w-full mt-3">
          <div className="flex flex-col items-start relative flex-1 self-stretch border-r border-[#e0e8f2] justify-center">
            <p className="text-xs text-[#7589a1]">
              현재 급여 정보 <span className="font-medium">({salaryInfo?.effective_date || "최근 기준"})</span>
            </p>
            <p className="font-bold text-[#142b4e] text-[26px] mt-2">
              {salaryInfo?.total_amount ? salaryInfo.total_amount.toLocaleString() : employee.salary}
              <span className="text-sm">원</span>
            </p>
            <span className="mt-2 text-[10px] bg-[#f3f7fc] text-[#66809e] px-2 py-0.5 rounded">월 급여</span>
          </div>

          <div className="flex w-[180px] pl-4 flex-col justify-center">
            {isUnknown ? (
              <p className="text-xs text-[#8998aa]">항목 미입력·총액만 관리됨 (v6 이력)</p>
            ) : (
              <dl className="flex flex-col gap-2 text-xs">
                <div className="flex justify-between"><dt className="text-[#6d8099]">기본급</dt><dd className="text-[#293f5d]">{salaryInfo?.base_salary?.toLocaleString() ?? 0}원</dd></div>
                <div className="flex justify-between"><dt className="text-[#6d8099]">직책수당</dt><dd className="text-[#293f5d]">{salaryInfo?.position_salary?.toLocaleString() ?? 0}원</dd></div>
                <div className="flex justify-between"><dt className="text-[#6d8099]">식대</dt><dd className="text-[#293f5d]">{salaryInfo?.meal_allowance?.toLocaleString() ?? 0}원</dd></div>
                <div className="flex justify-between"><dt className="text-[#6d8099]">기타수당</dt><dd className="text-[#293f5d]">{salaryInfo?.other_allowance?.toLocaleString() ?? 0}원</dd></div>
              </dl>
            )}
          </div>
        </div>
      </header>

      {/* 탭 네비게이션 */}
      <nav className="flex h-[53px] items-center gap-[18px] px-[23px] relative self-stretch w-full border-b border-[#e6edf5]">
        <button
          type="button"
          onClick={() => setActiveTab("history")}
          className={`font-bold text-[13px] pb-1 cursor-pointer ${activeTab === "history" ? "text-[#0db7d8] border-b-2 border-[#0db7d8]" : "text-[#6d819c]"}`}
        >
          급여 변경 이력
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("profile")}
          className={`font-bold text-[13px] pb-1 cursor-pointer ${activeTab === "profile" ? "text-[#0db7d8] border-b-2 border-[#0db7d8]" : "text-[#6d819c]"}`}
        >
          기본 정보
        </button>
      </nav>

      {/* 탭 콘텐츠: 급여 변경 이력 및 추이 (SAL-03 연동) */}
      {activeTab === "history" ? (
        <div className="p-5 w-full flex flex-col gap-4">
          <section className="flex flex-col h-56 items-start pt-[18px] pb-[13px] px-5 relative self-stretch w-full rounded-lg border border-[#e4edf7] bg-[#fbfdff]">
            <h2 className="font-bold text-[#17375e] text-xs mb-3">급여 변동 추이</h2>
            <div className="flex h-[145px] items-end gap-6 w-full overflow-x-auto pb-2">
              {loading ? (
                <p className="text-xs text-[#8998aa]">이력 불러오는 중...</p>
              ) : salaryHistory.length === 0 ? (
                <p className="text-xs text-[#8998aa]">변경 이력이 없습니다.</p>
              ) : (
                salaryHistory.map((item) => (
                  <div key={item.effective_date} className="flex flex-col items-center gap-1">
                    <span className="text-[9px] text-[#354d6c]">{item.total_amount.toLocaleString()}</span>
                    <div
                      className="w-9 bg-[#0db7d8] rounded-t-[5px]"
                      style={{ height: `${Math.min(item.total_amount / 50000, 100)}px` }}
                    />
                    <span className="text-[9px] text-[#687e9a]">{item.effective_date}</span>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      ) : (
        <div className="p-5 text-xs text-[#506781]">
          <h2 className="font-bold text-[#17375e] mb-2">기본 정보</h2>
          <p>사번: {employee.employeeNo}</p>
          <p>부서: {employee.department}</p>
          <p>직급: {employee.position}</p>
        </div>
      )}
    </section>
  );
};