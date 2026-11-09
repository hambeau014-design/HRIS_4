// src/components/organization/ManagementPage/sections/JobGradeManagementSection/JobGradeManagementSection.tsx
import { useMemo, useState, useEffect, type JSX } from "react";
import { 
  getStoredJobGrades, 
  saveStoredJobGrades, 
  type JobGradeMock 
} from "../../../../../mocks/jobGradeMock";
import { organizationApi } from "../../../../../api/organizationApi";

// 💡 백엔드 연동 플래그 (true: 임시 스토리지 모드, false: 실제 API 호출 모드)
const USE_MOCK_DATA = true;

export const JobGradeManagementSection = (): JSX.Element => {
  const [jobGrades, setJobGrades] = useState<JobGradeMock[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeOnly, setActiveOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 수정 폼 상태
  const [form, setForm] = useState({
    position_name: "",
    position_code: "",
    level: 1,
    description: "",
    min_tenure_months: 12,
    headcount: 0,
  });

  // 데이터 로드 함수
  const fetchJobGrades = async () => {
    setIsLoading(true);
    try {
      if (USE_MOCK_DATA) {
        const loaded = getStoredJobGrades();
        setJobGrades(loaded);
        if (loaded.length > 0 && selectedId === null) {
          selectGrade(loaded[0]);
        }
      } else {
        // 실제 API 연동 시 (ORG-08)
        const response = await organizationApi.getPositions({ q: searchTerm, active_only: activeOnly });
        const mapped: JobGradeMock[] = response.items.map((item) => ({
          position_id: item.position_id,
          position_code: item.position_code,
          position_name: item.position_name,
          level: item.level,
          description: item.description ?? "",
          min_tenure_months: item.min_tenure_months ?? 0,
          is_active: item.is_active,
          headcount: item.headcount,
        }));
        setJobGrades(mapped);
        if (mapped.length > 0 && selectedId === null) {
          selectGrade(mapped[0]);
        }
      }
    } catch (error) {
      console.error("직급 목록 조회 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobGrades();
  }, [activeOnly]);

  const selectedGrade =
    jobGrades.find((grade) => grade.position_id === selectedId) ?? jobGrades[0];

  const selectGrade = (grade: JobGradeMock) => {
    setSelectedId(grade.position_id);
    setForm({
      position_name: grade.position_name,
      position_code: grade.position_code,
      level: grade.level,
      description: grade.description,
      min_tenure_months: grade.min_tenure_months,
      headcount: grade.headcount,
    });
  };

  const visibleGrades = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return jobGrades.filter((grade) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        grade.position_name.toLowerCase().includes(normalizedSearch) ||
        grade.position_code.toLowerCase().includes(normalizedSearch);

      return matchesSearch && (!activeOnly || grade.is_active);
    });
  }, [activeOnly, jobGrades, searchTerm]);

  const updateForm = (changes: Partial<typeof form>) => {
    setForm((current) => ({ ...current, ...changes }));
  };

  // 변경사항 저장 (Mock vs API 분기)
  const handleSave = async () => {
    if (!selectedGrade) return;

    try {
      if (USE_MOCK_DATA) {
        const updated = jobGrades.map((grade) =>
          grade.position_id === selectedGrade.position_id
            ? {
                ...grade,
                position_name: form.position_name,
                position_code: form.position_code,
                level: Number(form.level),
                description: form.description,
                min_tenure_months: Number(form.min_tenure_months),
                headcount: Number(form.headcount),
              }
            : grade
        );
        setJobGrades(updated);
        saveStoredJobGrades(updated);
        alert("직급 정보가 임시 저장되었습니다.");
      } else {
        // 실제 API 연동 시 (ORG-11)
        // await organizationApi.updatePosition(selectedGrade.position_id, form);
        alert("백엔드 API로 직급 수정이 연동되었습니다.");
        fetchJobGrades();
      }
    } catch (error) {
      console.error("직급 저장 실패:", error);
    }
  };

  // 직급 삭제/사용 중지 (Mock vs API 분기)
  const handleDelete = async () => {
    if (!selectedGrade) return;
    if (jobGrades.length <= 1) {
      alert("최소 1개 이상의 직급이 존재해야 합니다.");
      return;
    }

    if (window.confirm(`"${selectedGrade.position_name}" 직급을 삭제(사용 중지)하시겠습니까?`)) {
      try {
        if (USE_MOCK_DATA) {
          const remaining = jobGrades.filter((grade) => grade.position_id !== selectedGrade.position_id);
          setJobGrades(remaining);
          saveStoredJobGrades(remaining);
          if (remaining.length > 0) {
            selectGrade(remaining[0]);
          }
        } else {
          // 실제 API 연동 시 (ORG-12)
          // await organizationApi.deletePosition(selectedGrade.position_id);
          fetchJobGrades();
        }
      } catch (error) {
        console.error("직급 삭제 실패:", error);
      }
    }
  };

  const handleCancel = () => {
    if (selectedGrade) {
      selectGrade(selectedGrade);
    }
  };

  return (
    <section
      aria-label="직급 관리"
      className="grid min-h-[438px] h-fit grid-cols-1 gap-4 xl:grid-cols-[385px_650px] xl:grid-rows-[505.5px]"
    >
      {/* 좌측 목록 영역 */}
      <div className="relative flex h-full min-h-[438px] w-full flex-col items-start overflow-hidden rounded-lg border border-solid border-[#e1e9f2] bg-white">
        <div className="flex h-[58px] w-full items-start gap-2 border-b border-solid border-[#edf1f6] px-[13px] py-[11px]">
          <label className="flex min-w-0 flex-1 items-center gap-2 rounded-[5px] border border-solid border-[#dfe7f0] bg-[#fafcff] px-[11px]">
            <input
              aria-label="직급명 또는 코드 검색"
              className="min-w-0 flex-1 bg-transparent font-['Noto_Sans_KR',Helvetica] text-[11.5px] font-normal text-[#395a7a] outline-none placeholder:text-[#97a7ba]"
              placeholder="직급명 또는 코드 검색"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
        </div>

        <div className="flex h-[38px] w-full items-center justify-between bg-[#f8fafd] px-3.5">
          <span className="font-['Noto_Sans_KR',Helvetica] text-[10.5px] leading-[15.8px] text-[#7890ad]">
            전체 {jobGrades.length}개 {isLoading && "(로딩 중...)"}
          </span>
          <button
            type="button"
            aria-pressed={activeOnly}
            onClick={() => setActiveOnly((current) => !current)}
            className="font-['Noto_Sans_KR',Helvetica] text-[10.5px] leading-[15.8px] text-[#56789f] cursor-pointer"
          >
            사용 중인 항목만
          </button>
        </div>

        <div className="flex w-full flex-col items-start px-[7px] py-[5px] overflow-y-auto max-h-[360px]">
          {visibleGrades.map((jobGrade) => {
            const isSelected = jobGrade.position_id === selectedGrade?.position_id;
            const isFinalGrade = jobGrade.level === 5;

            return (
              <button
                type="button"
                key={jobGrade.position_id}
                onClick={() => selectGrade(jobGrade)}
                aria-pressed={isSelected}
                className={`flex h-[58px] w-full items-center gap-2.5 border-b border-solid px-2.5 py-2 text-left cursor-pointer ${
                  isSelected
                    ? "rounded-md border-transparent bg-[#cff7ff]"
                    : "border-[#edf1f5] bg-white"
                }`}
              >
                <span className="grid h-[27px] w-[27px] place-items-center rounded-md font-['Noto_Sans_KR',Helvetica] text-[9px] bg-[#f0f4f8] text-[#7d93ad]">
                  {jobGrade.position_id}
                </span>
                <span className="flex min-w-0 flex-1 flex-col items-start">
                  <strong className="font-['Noto_Sans_KR',Helvetica] text-xs leading-[18px] text-[#294968]">
                    {jobGrade.position_name}
                  </strong>
                  <span className="pt-[5px] font-['Noto_Sans_KR',Helvetica] text-[9.5px] leading-[14.2px] text-[#8799ae]">
                    {jobGrade.position_code} · {jobGrade.level}단계
                  </span>
                </span>
                <span className="flex items-baseline gap-1 font-['Noto_Sans_KR',Helvetica]">
                  <strong className="text-xs leading-[18px] text-[#365c85]">
                    {jobGrade.headcount}
                  </strong>
                  <span className="text-[9px] text-[#8799ae]">명</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 우측 상세/수정 폼 영역 */}
      <div className="relative flex h-full min-h-[505.5px] w-full flex-col overflow-hidden rounded-lg border border-solid border-[#e1e9f2] bg-white xl:pb-[58px]">
        <header className="flex h-[78px] w-full items-center gap-[13px] border-b border-solid border-[#e8edf3] px-5">
          <div className="grid h-[42px] w-[42px] place-items-center rounded-[9px] bg-[#e5f8f5]">
            <span>🏢</span>
          </div>
          <div className="flex flex-col">
            <span className="font-['Noto_Sans_KR',Helvetica] text-[9px] text-[#7e93ad]">
              {selectedGrade?.position_code}
            </span>
            <span className="pt-1 font-['Noto_Sans_KR',Helvetica] text-base text-[#193a61]">
              {selectedGrade?.position_name}
            </span>
          </div>
        </header>

        <form
          className="flex flex-col px-5 pt-[17px]"
          onSubmit={(event) => {
            event.preventDefault();
            handleSave();
          }}
        >
          <div className="flex items-center gap-[9px]">
            <h2 className="font-['Noto_Sans_KR',Helvetica] text-[11.5px] font-bold text-[#365775]">
              기본 정보
            </h2>
            <span className="font-['Noto_Sans_KR',Helvetica] text-[9.5px] text-[#94a4b6]">
              필수 정보를 입력해주세요.
            </span>
          </div>
          <div className="grid gap-[11px] pt-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="text-[9.5px] text-[#657e9b]">직급명 <b className="text-[#ed5862]">*</b></span>
              <input
                required
                value={form.position_name}
                onChange={(e) => updateForm({ position_name: e.target.value })}
                className="h-[31px] rounded-[5px] border border-[#dfe7f0] px-[9px] text-[11px] text-[#395a7a] outline-none"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[9.5px] text-[#657e9b]">직급 코드 <b className="text-[#ed5862]">*</b></span>
              <input
                required
                value={form.position_code}
                onChange={(e) => updateForm({ position_code: e.target.value })}
                className="h-[31px] rounded-[5px] border border-[#dfe7f0] px-[9px] text-[11px] text-[#395a7a] outline-none"
              />
            </label>
            <label className="flex flex-col gap-1.5 sm:col-span-2">
              <span className="text-[9.5px] text-[#657e9b]">직급 단계</span>
              <input
                type="number"
                min="1"
                value={form.level}
                onChange={(e) => updateForm({ level: Number(e.target.value) })}
                className="h-[31px] w-full rounded-[5px] border border-[#dfe7f0] px-[9px] text-[11px] text-[#395a7a] outline-none"
              />
            </label>
            <label className="flex flex-col gap-1.5 sm:col-span-2">
              <span className="text-[9.5px] text-[#657e9b]">설명</span>
              <textarea
                value={form.description}
                onChange={(e) => updateForm({ description: e.target.value })}
                className="h-12 resize-none rounded-[5px] border border-[#dfe7f0] p-[9px] text-[11px] text-[#395a7a] outline-none"
              />
            </label>
          </div>

          <div className="mt-[17px] border-t border-[#edf1f5] pt-[15px]">
            <h2 className="font-bold text-[11.5px] text-[#365775]">승진 기준</h2>
            <div className="grid gap-[11px] pt-2.5 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-[9.5px] text-[#657e9b]">최소 체류기간 (개월)</span>
                <input
                  type="number"
                  min="0"
                  value={form.min_tenure_months}
                  onChange={(e) => updateForm({ min_tenure_months: Number(e.target.value) })}
                  className="h-[31px] rounded-[5px] border border-[#dfe7f0] px-[9px] text-[11px] text-[#395a7a] outline-none"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[9.5px] text-[#657e9b]">현재 인원</span>
                <input
                  type="number"
                  min="0"
                  value={form.headcount}
                  onChange={(e) => updateForm({ headcount: Number(e.target.value) })}
                  className="h-[31px] rounded-[5px] border border-[#dfe7f0] px-[9px] text-[11px] text-[#395a7a] outline-none"
                />
              </label>
            </div>
          </div>
        </form>

        <footer className="absolute bottom-0 left-0 flex h-[57px] w-full items-center justify-end gap-2 border-t border-[#e7edf4] bg-[#fbfcfe] px-5">
          <div className="flex flex-1">
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex h-[31px] items-center gap-[5px] rounded-[5px] px-[13px] text-[10.5px] text-[#e65a62] cursor-pointer"
            >
              삭제
            </button>
          </div>
          <button
            type="button"
            onClick={handleCancel}
            className="h-[31px] rounded-[5px] border border-[#dae4ee] bg-white px-[13px] text-[10.5px] text-[#647d9b] cursor-pointer"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="h-[31px] rounded-[5px] bg-[#15b9dc] px-[13px] text-[10.5px] text-white cursor-pointer"
          >
            변경사항 저장
          </button>
        </footer>
      </div>
    </section>
  );
};