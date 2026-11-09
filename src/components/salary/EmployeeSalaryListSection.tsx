import { useEffect, useMemo, useState, type JSX } from "react";
import { getSalaryList, type SalaryApiItem } from "../../api/salaryApi";

export type SalaryEmployee = {
  id: string;
  employeeNo: string;
  name: string;
  initial: string;
  department: string;
  position: string;
  status: string;
  salary: string;
  avatarColor: string;
};

type EmployeeSalaryListSectionProps = {
  selectedEmployeeId: string | null;
  onSelectEmployee: (employee: SalaryEmployee) => void;
};

const columnClasses = "grid grid-cols-[48px_101px_136px_103px_95px_84px_110px]";

export const EmployeeSalaryListSection = ({
  selectedEmployeeId,
  onSelectEmployee,
}: EmployeeSalaryListSectionProps): JSX.Element => {
  const [employeeList, setEmployeeList] = useState<SalaryEmployee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("전체 부서");
  const [status, setStatus] = useState("전체 상태");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // SAL-01 API 호출 연동
  useEffect(() => {
    let cancelled = false;

    const fetchSalaries = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getSalaryList();
        if (!cancelled) {
          const mapped: SalaryEmployee[] = data.items.map((item, idx) => ({
            id: String(item.employee_id),
            employeeNo: item.employee_no || `EMP00${idx + 1}`,
            name: item.employee_name,
            initial: item.employee_name?.charAt(0) ?? "?",
            department: item.department_name || "미배치",
            position: item.position_name || "사원",
            status: item.employment_status === "ACTIVE" ? "재직" : item.employment_status,
            salary: item.total_salary ? item.total_salary.toLocaleString() : "0",
            avatarColor: idx % 2 === 0 ? "bg-[#e6f2fc]" : "bg-[#f0effd]",
          }));
          setEmployeeList(mapped);
          if (mapped.length > 0 && !selectedEmployeeId) {
            onSelectEmployee(mapped[0]); // 초기 선택
            setSelectedIds([mapped[0].id]);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "급여 목록을 불러오지 못했습니다.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void fetchSalaries();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredEmployees = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return employeeList.filter((employee) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        employee.id.toLowerCase().includes(normalizedSearch) ||
        employee.name.toLowerCase().includes(normalizedSearch) ||
        employee.department.toLowerCase().includes(normalizedSearch);

      const matchesDepartment =
        department === "전체 부서" || employee.department === department;
      const matchesStatus =
        status === "전체 상태" || employee.status === status;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [department, employeeList, searchTerm, status]);

  const allVisibleSelected =
    filteredEmployees.length > 0 &&
    filteredEmployees.every((employee) => selectedIds.includes(employee.id));

  const toggleEmployee = (employee: SalaryEmployee) => {
    onSelectEmployee(employee);
    setSelectedIds((current) =>
      current.includes(employee.id)
        ? current.filter((id) => id !== employee.id)
        : [employee.id],
    );
  };

  const toggleAllVisible = () => {
    if (allVisibleSelected) {
      setSelectedIds([]);
      return;
    }
    setSelectedIds(filteredEmployees.map((e) => e.id));
    if (filteredEmployees.length > 0) {
      onSelectEmployee(filteredEmployees[0]);
    }
  };

  return (
    <section
      aria-labelledby="salary-management-title"
      className="row-[1_/_2] col-[1_/_2] h-full flex-col flex items-start relative w-full"
    >
      <div className="flex h-[148px] items-center justify-between px-0.5 py-0 relative self-stretch w-full">
        <div className="flex flex-col w-[287.38px] items-start relative">
          <h1
            id="salary-management-title"
            className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#080d1e] text-[45px] tracking-[-1.80px] leading-[45px] whitespace-nowrap"
          >
            급여관리
          </h1>
          <p className="relative w-fit mt-3 [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#8998ad] text-[15px] tracking-[0] leading-[22.5px] whitespace-nowrap">
            직원의 현재 급여 정보와 급여 변경 이력을 조회할 수 있습니다.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsAddDialogOpen(true)}
          className="all-unset box-border inline-flex flex-col items-start px-[19px] py-[13px] relative flex-[0_0_auto] bg-[#0db7d8] rounded-[9px] shadow-[0px_8px_18px_#0db7d838] cursor-pointer"
        >
          <span className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-bold text-white text-[13px]">
            + 직원 등록
          </span>
        </button>
      </div>

      {/* 검색 및 필터 폼 */}
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="flex h-[67px] items-center gap-[9px] px-[13px] py-[11px] relative self-stretch w-full rounded-[13px] border border-solid border-[#e7ebf2] shadow-[0px_4px_18px_#28405d09]"
      >
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="이름, 사번, 부서명 검색"
          aria-label="이름, 사번, 부서명 검색"
          className="w-[240.2px] h-[35px] bg-[#fbfcfe] px-3 rounded-lg border border-[#dfe5ed] text-[13px] outline-none"
        />
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-[126px] h-[43px] px-3 bg-white rounded-lg border border-[#dfe5ed] text-[13px]"
        >
          <option>전체 부서</option>
          <option>인사팀</option>
          <option>개발팀</option>
          <option>기획팀</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-[126px] h-[43px] px-3 bg-white rounded-lg border border-[#dfe5ed] text-[13px]"
        >
          <option>전체 상태</option>
          <option>재직</option>
          <option>휴직</option>
        </select>
      </form>

      {/* 목록 테이블 */}
      <div className="flex pt-[25px] pb-0 px-0 self-stretch w-full flex-col items-start relative">
        <div className="flex flex-col h-[625px] items-start relative self-stretch w-full bg-white rounded-[15px] overflow-hidden border border-solid border-[#e4e9f0]">
          <div role="row" className={`${columnClasses} grid-rows-[49px] h-[49px] bg-[#f6f8fc] items-center px-3`}>
            <input
              type="checkbox"
              checked={allVisibleSelected}
              onChange={toggleAllVisible}
              aria-label="전체 직원 선택"
            />
            {["사번", "이름", "부서", "직급", "상태", "현재 급여(월)"].map((h) => (
              <span key={h} className="text-xs text-[#687990] font-normal">{h}</span>
            ))}
          </div>

          <div className="flex flex-col h-[574px] items-start relative self-stretch w-full overflow-y-auto">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center text-sm text-[#687990]">
                급여 목록을 불러오는 중...
              </div>
            ) : error ? (
              <div className="w-full h-full flex items-center justify-center text-sm text-red-500">
                {error}
              </div>
            ) : filteredEmployees.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center text-sm text-[#687990]">
                조회된 데이터가 없습니다.
              </div>
            ) : (
              filteredEmployees.map((emp) => {
                const isSelected = selectedEmployeeId === emp.id;
                return (
                  <div
                    key={emp.id}
                    role="row"
                    onClick={() => toggleEmployee(emp)}
                    className={`${columnClasses} grid-rows-[79px] h-20 items-center px-3 cursor-pointer ${
                      isSelected ? "bg-[#eaf6ff]" : ""
                    } border-b border-[#edf0f4]`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(emp.id)}
                      onChange={() => toggleEmployee(emp)}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`${emp.name} 선택`}
                    />
                    <span className="text-xs text-[#62768e]">{emp.employeeNo}</span>
                    <div className="flex items-center gap-2.5">
                      <div className={`w-[35px] h-[35px] ${emp.avatarColor} rounded-full flex items-center justify-center text-xs text-[#66809d]`}>
                        {emp.initial}
                      </div>
                      <span className="text-xs font-bold text-[#26364b]">{emp.name}</span>
                    </div>
                    <span className="text-xs text-[#506177]">{emp.department}</span>
                    <span className="text-xs text-[#506177]">{emp.position}</span>
                    <span className="text-xs text-[#12a86f] bg-[#dff8ee] px-2 py-1 rounded-xl w-fit">{emp.status}</span>
                    <span className="text-xs text-[#506177]">{emp.salary}원</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};