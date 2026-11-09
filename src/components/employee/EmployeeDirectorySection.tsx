import { useEffect, useMemo, useState, type JSX } from "react";
import { getEmployees } from "../../api/employeeApi";

export type Employee = {
  id: string;
  employeeNo: string;
  name: string;
  initial: string;
  department: string;
  position: string;
  status: string;
  joinedAt: string;
  avatarClass: string;
};

type EmployeeDirectorySectionProps = {
  selectedEmployeeId: string | null;
  onSelectEmployee: (employee: Employee) => void;
};


const columnClass =
  "relative row-[1_/_2] self-center w-full h-[18px] flex flex-col items-start";


export const EmployeeDirectorySection = ({
  selectedEmployeeId,
  onSelectEmployee,
}: EmployeeDirectorySectionProps): JSX.Element => {

  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("전체 부서");
  const [status, setStatus] = useState("전체 상태");
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;

    const loadEmployees = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getEmployees();
        if (!cancelled) setEmployeeList(data);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "직원 목록을 불러오지 못했습니다.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void loadEmployees();
    return () => {
      cancelled = true;
    };
  }, []);

  const departments = [
    "전체 부서",
    ...Array.from(new Set(employeeList.map((employee) => employee.department))),
  ];
  const statuses = [
    "전체 상태",
    ...Array.from(new Set(employeeList.map((employee) => employee.status))),
  ];

  const filteredEmployees = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return employeeList.filter((employee) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        employee.employeeNo.toLowerCase().includes(normalizedSearch) ||
        employee.name.toLowerCase().includes(normalizedSearch) ||
        employee.department.toLowerCase().includes(normalizedSearch);

      const matchesDepartment =
        department === "전체 부서" || employee.department === department;

      const matchesStatus =
        status === "전체 상태" || employee.status === status;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [department, employeeList, search, status]);

  const allVisibleSelected =
    filteredEmployees.length > 0 &&
    filteredEmployees.every((employee) =>
      selectedEmployees.includes(employee.id),
    );

  const toggleEmployee = (id: string) => {
    setSelectedEmployees((current) =>
      current.includes(id)
        ? current.filter((employeeId) => employeeId !== id)
        : [...current, id],
    );
  };

  const toggleAllVisible = () => {
    if (allVisibleSelected) {
      setSelectedEmployees((current) =>
        current.filter(
          (employeeId) =>
            !filteredEmployees.some((employee) => employee.id === employeeId),
        ),
      );
      return;
    }

    setSelectedEmployees((current) => [
      ...current,
      ...filteredEmployees
        .map((employee) => employee.id)
        .filter((employeeId) => !current.includes(employeeId)),
    ]);
  };

  return (
    <section className="relative row-[1_/_2] col-[1_/_2] w-full h-full flex flex-col items-start">
      <header className="flex h-[148px] items-center justify-between px-0.5 py-0 relative self-stretch w-full">
        <div className="flex flex-col w-[287.38px] items-start relative">
          <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
            <h1 className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#080d1e] text-[45px] tracking-[-1.80px] leading-[45px] whitespace-nowrap">
              인사관리
            </h1>
          </div>
          <div className="flex flex-col w-[287.38px] h-[35px] items-start pt-3 pb-0 px-0 relative">
            <p className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#8998ad] text-[15px] tracking-[0] leading-[22.5px] whitespace-nowrap">
              직원 정보를 조회하고 인사 업무를 처리합니다.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="all-unset box-border inline-flex flex-col items-start px-[19px] py-[13px] relative flex-[0_0_auto] bg-[#0db7d8] rounded-[9px] shadow-[0px_8px_18px_#0db7d838] focus-visible:ring-2 focus-visible:ring-[#0db7d8] focus-visible:ring-offset-2"
          aria-label="직원 등록"
        >
          <span className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-bold text-white text-[13px] tracking-[0] leading-[19.5px] whitespace-nowrap">
            + 직원 등록
          </span>
        </button>
      </header>
      <form
        className="flex h-[67px] items-center gap-[9px] px-[13px] py-[11px] relative self-stretch w-full bg-[#ffffff00] rounded-[13px] border border-solid border-[#e7ebf2] shadow-[0px_4px_18px_#28405d09]"
        onSubmit={(event) => event.preventDefault()}
        aria-label="직원 검색 및 필터"
      >
        <label className="flex w-[298.31px] h-[43px] items-center gap-3 px-3.5 py-0 relative bg-[#fbfcfe] rounded-lg border border-solid border-[#dfe5ed]">
          <span className="relative w-[16.11px] h-[18px]" aria-hidden="true">
            <img
              className="absolute w-[86.87%] h-[83.00%] top-[17.00%] left-[13.13%]"
              alt=""
              src="/img/employee/vector.svg"
            />
            <img
              className="absolute w-[36.87%] h-[38.25%] top-[61.75%] left-[63.13%]"
              alt=""
              src="/img/employee/vector-1.svg"
            />
          </span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="relative self-stretch w-[240.2px] min-w-0 bg-transparent [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#54657b] text-[13px] tracking-[0] leading-[normal] placeholder:text-[#94a5ba] focus:outline-none"
            placeholder="이름, 사번, 부서명 검색"
            aria-label="이름, 사번, 부서명 검색"
          />
        </label>
        <label className="relative w-[126px] h-[43px] bg-white rounded-lg overflow-hidden border border-solid border-[#dfe5ed]">
          <select
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
            className="absolute inset-0 z-[1] h-full w-full cursor-pointer bg-transparent pl-5 pr-8 [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#54657b] text-[13px] tracking-[0] leading-[normal] focus:outline-none"
            aria-label="부서 필터"
          >
            {departments.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <span className="flex w-5 h-[41px] items-center justify-center absolute top-px left-[106px] pointer-events-none">
            <span className="relative w-2.5 h-1.5">
              <img
                className="absolute w-[97.50%] h-[95.83%] top-[4.17%] left-[2.50%]"
                alt=""
                src="/img/employee/vector-3.svg"
              />
            </span>
          </span>
        </label>
        <label className="relative w-[126px] h-[43px] bg-white rounded-lg overflow-hidden border border-solid border-[#dfe5ed]">
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="absolute inset-0 z-[1] h-full w-full cursor-pointer bg-transparent pl-5 pr-8 [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#54657b] text-[13px] tracking-[0] leading-[normal] focus:outline-none"
            aria-label="상태 필터"
          >
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <span className="flex w-5 h-[41px] items-center justify-center absolute top-px left-[106px] pointer-events-none">
            <span className="relative w-2.5 h-1.5">
              <img
                className="absolute w-[97.50%] h-[95.83%] top-[4.17%] left-[2.50%]"
                alt=""
                src="/img/employee/vector-3.svg"
              />
            </span>
          </span>
        </label>
        <button
          type="button"
          className="grid grid-cols-[41px] grid-rows-[41px] w-[43px] h-[43px] place-items-center rounded-lg border border-solid border-[#dfe5ed] bg-white focus-visible:ring-2 focus-visible:ring-[#0db7d8] focus-visible:ring-offset-1"
          aria-label="필터 초기화"
          onClick={() => {
            setSearch("");
            setDepartment("전체 부서");
            setStatus("전체 상태");
          }}
        >
          <span className="flex flex-col gap-[3px]" aria-hidden="true">
            <span className="block w-[12px] h-[2px] rounded-full bg-[#687990]" />
            <span className="block w-[8px] h-[2px] rounded-full bg-[#687990]" />
            <span className="block w-[4px] h-[2px] rounded-full bg-[#687990]" />
          </span>
        </button>
      </form>
      <div className="pt-[25px] pb-0 px-0 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
        <div
          className="flex flex-col h-[625px] items-start relative self-stretch w-full bg-white rounded-[15px] overflow-hidden border border-solid border-[#e4e9f0]"
          role="table"
          aria-label="직원 목록"
        >
          <div
            className="grid grid-cols-[48px_101px_136px_103px_95px_84px_110px] grid-rows-[49px] h-[49px] bg-[#f6f8fc]"
            role="row"
          >
            <div className="relative row-[1_/_2] col-[1_/_2] justify-self-center self-center">
              <input
                type="checkbox"
                checked={allVisibleSelected}
                onChange={toggleAllVisible}
                className="peer absolute h-[18px] w-[18px] cursor-pointer appearance-none rounded-[5px] border border-solid border-[#dce4ed] bg-white checked:border-[#2587f5] checked:bg-[#2587f5] focus-visible:ring-2 focus-visible:ring-[#2587f5]"
                aria-label="전체 직원 선택"
              />
              <span className="pointer-events-none absolute left-0 top-0 hidden h-[18px] w-[18px] items-center justify-center text-xs text-white peer-checked:flex">
                ✓
              </span>
            </div>
            {["사번", "이름", "부서", "직급", "상태", "입사일"].map(
              (heading, index) => (
                <div
                  key={heading}
                  className={`${columnClass} col-[${index + 2}_/_${index + 3}]`}
                  role="columnheader"
                >
                  <span className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#687990] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                    {heading}
                  </span>
                </div>
              ),
            )}
          </div>
          <div className="flex flex-col h-[574px] items-start relative self-stretch w-full">
            {loading ? (
              <div className="flex h-full w-full items-center justify-center text-sm text-[#687990]">
                직원 목록을 불러오는 중입니다...
              </div>
            ) : error ? (
              <div className="flex h-full w-full items-center justify-center px-4 text-sm text-red-500">
                {error}
              </div>
            ) : filteredEmployees.length === 0 ? (
              <div className="flex h-full w-full items-center justify-center text-sm text-[#687990]">
                조회된 직원이 없습니다.
              </div>
            ) : filteredEmployees.map((employee) => {
              const isChecked = selectedEmployees.includes(employee.id);
              const isActive = selectedEmployeeId === employee.id;

              return (
                <div
                  key={employee.id}
                  className={`grid grid-cols-[48px_101px_136px_103px_95px_84px_110px] grid-rows-[79px] h-20 w-full border-b [border-bottom-style:solid] border-[#edf0f4] ${
                    isActive ? "bg-[#eaf6ff]" : ""
                  }`}
                  role="row"
                  onClick={() => onSelectEmployee(employee)}
                >
                  <div className="relative row-[1_/_2] col-[1_/_2] justify-self-center self-center">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onClick={(event) => event.stopPropagation()}
                      onChange={() => toggleEmployee(employee.id)}
                      className="peer absolute h-[18px] w-[18px] cursor-pointer appearance-none rounded-[5px] border border-solid border-[#dce4ed] bg-white checked:border-[#2587f5] checked:bg-[#2587f5] checked:shadow-[0px_3px_8px_#2587f540] focus-visible:ring-2 focus-visible:ring-[#2587f5]"
                      aria-label={`${employee.name} 선택`}
                    />
                    <span className="pointer-events-none absolute left-0 top-0 hidden h-[18px] w-[18px] items-center justify-center text-xs text-white peer-checked:flex">
                      ✓
                    </span>
                  </div>
                  <div className={`${columnClass} col-[2_/_3]`} role="cell">
                    <span className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#62768e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                      {employee.id}
                    </span>
                  </div>
                  <div
                    className="relative row-[1_/_2] col-[3_/_4] self-center w-full h-fit flex items-center gap-2.5"
                    role="cell"
                  >
                    <div
                      className={`grid grid-cols-[31px] grid-rows-[31px] w-[35px] h-[35px] ${employee.avatarClass} rounded-[17.5px] overflow-hidden border-2 border-solid border-white shadow-[0px_0px_0px_1px_#e5ebf2]`}
                    >
                      <span className="relative row-[1_/_2] col-[1_/_2] justify-self-center self-center w-3 h-[18px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#66809d] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                        {employee.initial}
                      </span>
                    </div>
                    <span className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                      <span className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#26364b] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                        {employee.name}
                      </span>
                    </span>
                  </div>
                  <div className={`${columnClass} col-[4_/_5]`} role="cell">
                    <span className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#506177] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                      {employee.department}
                    </span>
                  </div>
                  <div className={`${columnClass} col-[5_/_6]`} role="cell">
                    <span className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#506177] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                      {employee.position}
                    </span>
                  </div>
                  <div
                    className="relative row-[1_/_2] col-[6_/_7] self-center w-full h-[18px]"
                    role="cell"
                  >
                    <span className="relative top-[-5px] w-[46px] h-[27px] flex bg-[#dff8ee] rounded-xl">
                      <span className="mt-[3px] w-[23px] h-[18px] ml-3 [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#12a86f] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                        {employee.status}
                      </span>
                    </span>
                  </div>
                  <div className={`${columnClass} col-[7_/_8]`} role="cell">
                    <span className="text-[#506177] text-xs leading-[18px] relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-normal tracking-[0] whitespace-nowrap">
                      {employee.joinedAt}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
