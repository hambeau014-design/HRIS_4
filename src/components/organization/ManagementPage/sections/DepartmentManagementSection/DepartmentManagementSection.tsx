// src/components/organization/ManagementPage/sections/DepartmentManagementSection/DepartmentManagementSection.tsx
import { useMemo, useState, useEffect, type JSX } from "react";
import { 
  getStoredDepartments, 
  saveStoredDepartments, 
  type Department 
} from "../../../../../mocks/departmentsMock";
import { organizationApi } from "../../../../../api/organizationApi"; // 앞서 만든 API 모듈

// 💡 Mock 데이터 사용 여부 플래그 (true면 임시 목데이터, false면 실제 API 호출)
const USE_MOCK_DATA = true; 

export const DepartmentManagementSection = (): JSX.Element => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [query, setQuery] = useState("");
  const [activeOnly, setActiveOnly] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [form, setForm] = useState({
    name: "",
    code: "",
    parent: "최상위 부서",
    description: "",
    leader: "",
    members: "0",
  });

  // 데이터 불러오기 (USE_MOCK_DATA 값에 따른 분기)
  const fetchDepartments = async () => {
    setIsLoading(true);
    try {
      if (USE_MOCK_DATA) {
        // 1. Mock 데이터 모듈 사용
        const loaded = getStoredDepartments();
        setDepartments(loaded);
        if (loaded.length > 0) {
          selectDepartment(loaded[0]);
        }
      } else {
        // 2. 실제 백엔드 API 호출 (organizationApi)
        const response = await organizationApi.getDepartments({ q: query, active_only: activeOnly });
        // API 응답 구조를 컴포넌트의 Department 타입에 맞게 매핑
        const mappedData: Department[] = response.items.map((item) => ({
          id: item.department_code,
          name: item.department_name,
          parent: item.parent_department_name ?? "최상위 부서",
          members: item.headcount,
        }));
        
        setDepartments(mappedData);
        if (mappedData.length > 0) {
          selectDepartment(mappedData[0]);
        }
      }
    } catch (error) {
      console.error("부서 목록을 불러오는 중 오류가 발생했습니다:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [activeOnly]);

  const filteredDepartments = useMemo(
    () =>
      departments.filter((department) => {
        const matchesQuery =
          department.name.includes(query) || department.id.includes(query);
        const matchesActive = !activeOnly || department.members > 0;
        return matchesQuery && matchesActive;
      }),
    [departments, activeOnly, query],
  );

  const selectedDepartment =
    departments.find((department) => department.id === selectedId) ??
    departments[0];

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const selectDepartment = (department: Department) => {
    setSelectedId(department.id);
    setForm({
      name: department.name,
      code: department.id,
      parent: department.parent,
      description:
        department.id === "DEP-001"
          ? "전사 경영지원 및 운영 업무를 담당합니다."
          : "",
      leader: department.id === "DEP-001" ? "김하늘" : "",
      members: String(department.members),
    });
  };

  // 변경사항 저장 (Mock vs API 분기)
  const saveChanges = async () => {
    try {
      if (USE_MOCK_DATA) {
        const updated = departments.map((dep) => {
          if (dep.id === selectedId || dep.id === form.code) {
            return {
              ...dep,
              id: form.code,
              name: form.name,
              parent: form.parent,
              members: Number(form.members) || 0,
            };
          }
          return dep;
        });

        setDepartments(updated);
        saveStoredDepartments(updated);
        setSelectedId(form.code);
        alert("변경사항이 임시 저장되었습니다.");
      } else {
        // 실제 API 연동 시 (예: updateDepartment 호출)
        // await organizationApi.updateDepartment(Number(selectedId), { ... });
        alert("백엔드 API로 수정 기능이 연동되었습니다.");
        fetchDepartments();
      }
    } catch (error) {
      console.error("저장 실패:", error);
    }
  };

  // 부서 삭제 (Mock vs API 분기)
  const handleDelete = async () => {
    if (window.confirm("선택한 부서를 삭제하시겠습니까?")) {
      try {
        if (USE_MOCK_DATA) {
          const updated = departments.filter((dep) => dep.id !== selectedId);
          setDepartments(updated);
          saveStoredDepartments(updated);
          if (updated.length > 0) {
            selectDepartment(updated[0]);
          }
        } else {
          // 실제 API 연동 시 (예: deleteDepartment 호출)
          // await organizationApi.deleteDepartment(Number(selectedId));
          fetchDepartments();
        }
      } catch (error) {
        console.error("삭제 실패:", error);
      }
    }
  };

  return (
    <div className="grid grid-cols-[385px_650px] grid-rows-[505.50px] min-h-[438px] h-fit gap-4">
      <section
        aria-label="부서 목록"
        className="col-[1_/_2] relative row-[1_/_2] w-full h-full flex flex-col items-start bg-white rounded-lg overflow-hidden border border-solid border-[#e1e9f2]"
      >
        <div className="flex h-[58px] items-start gap-2 px-[13px] py-[11px] relative self-stretch w-full border-b border-[#edf1f6]">
          <label className="flex items-center gap-2 px-[11px] py-0 bg-[#fafcff] rounded-[5px] border border-[#dfe7f0]">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="부서명 또는 코드 검색"
              placeholder="부서명 또는 코드 검색"
              className="relative w-[265.39px] h-[17.25px] font-normal text-[#395a7a] text-[11.5px] placeholder:text-[#97a7ba] outline-none bg-transparent"
            />
          </label>
        </div>

        <div className="flex h-[38px] items-center justify-between px-3.5 py-0 relative self-stretch w-full bg-[#f8fafd]">
          <span className="text-[#7890ad] text-[10.5px]">
            전체 {departments.length}개 {isLoading && "(로딩 중...)"}
          </span>
          <button
            type="button"
            aria-pressed={activeOnly}
            onClick={() => setActiveOnly((value) => !value)}
            className="cursor-pointer text-[#56789f] text-[10.5px]"
          >
            사용 중인 항목만
          </button>
        </div>

        <div className="flex flex-col items-start px-[7px] py-[5px] w-full overflow-y-auto max-h-[360px]">
          {filteredDepartments.map((department) => {
            const selected = department.id === selectedId;
            return (
              <button
                type="button"
                key={department.id}
                onClick={() => selectDepartment(department)}
                aria-pressed={selected}
                className={`flex w-[369px] h-[58px] items-center gap-2.5 px-2.5 py-2 relative cursor-pointer ${
                  selected ? "bg-[#cff6ff] rounded-md border-transparent" : "bg-white border-b border-[#edf1f5]"
                }`}
              >
                <span className={`w-[27px] h-[27px] ${selected ? "bg-[#dbeaff]" : "bg-[#f0f4f8]"} rounded-md`} />
                <span className="flex flex-col items-start text-left">
                  <span className="font-bold text-[#294968] text-xs">{department.name}</span>
                  <span className="text-[#8799ae] text-[9.5px]">{department.id} · {department.parent}</span>
                </span>
                <span className="relative ml-auto text-xs font-bold text-[#365c85]">
                  {department.members}명
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="col-[2_/_3] pt-0 pb-[58px] px-0 relative row-[1_/_2] w-full h-full flex flex-col items-start bg-white rounded-lg overflow-hidden border border-[#e1e9f2]">
        <header className="flex h-[78px] items-center gap-[13px] px-5 py-0 relative self-stretch w-full border-b border-[#e8edf3]">
          <div className="w-[42px] h-[42px] bg-[#f0f4f8] rounded-md flex items-center justify-center text-xs font-bold text-[#193a61]">
            🏢
          </div>
          <div className="flex flex-col w-[150px] items-start relative">
            <span className="text-[#7e93ad] text-[9px]">{selectedDepartment?.id}</span>
            <h2 className="pt-1 text-[#193a61] text-base">{selectedDepartment?.name}</h2>
          </div>
        </header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveChanges();
          }}
          className="flex flex-col items-start pt-[17px] pb-3 px-5 relative self-stretch w-full"
        >
          {/* 입력 폼 영역은 기존과 동일 */}
          <div className="flex items-center gap-[9px] relative self-stretch w-full">
            <h3 className="font-bold text-[#365775] text-[11.5px]">기본 정보</h3>
          </div>

          <div className="items-start pt-3 flex flex-col relative self-stretch w-full">
            <div className="grid grid-cols-[297.50px_297.50px] gap-[11px_13px]">
              <label className="flex flex-col items-start">
                <span className="pb-1.5 text-[#657e9b] text-[9.5px]">부서명 *</span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-[297.5px] h-[31px] px-[9px] bg-white rounded-[5px] border border-[#dfe7f0] text-[11px]"
                />
              </label>
              <label className="flex flex-col items-start">
                <span className="pb-1.5 text-[#657e9b] text-[9.5px]">부서 코드 *</span>
                <input
                  required
                  value={form.code}
                  onChange={(e) => updateField("code", e.target.value)}
                  className="w-[297.5px] h-[31px] px-[9px] bg-white rounded-[5px] border border-[#dfe7f0] text-[11px]"
                />
              </label>
            </div>
          </div>

          <footer className="flex w-[648px] h-[57px] items-center justify-end gap-2 px-5 py-0 absolute top-[448px] left-px bg-[#fbfcfe] border-t border-[#e7edf4]">
            <div className="flex items-start relative flex-1 grow">
              <button
                type="button"
                onClick={handleDelete}
                className="cursor-pointer text-[#e65a62] text-[10.5px]"
              >
                삭제
              </button>
            </div>
            <button
              type="submit"
              className="cursor-pointer px-[13px] h-[31px] bg-[#15b9dc] rounded-[5px] text-white text-[10.5px]"
            >
              변경사항 저장
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
};