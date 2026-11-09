import { useMemo, useState, useEffect, type JSX } from "react";
import { 
  getStoredJobs, 
  saveStoredJobs, 
  type JobMock 
} from "../../../../../mocks/jobsMock";
import { jobApi } from "../../../../../api/jobApi";

//백엔드 연동 플래그 (true: 임시 스토리지 모드, false: 실제 API 호출 모드)
const USE_MOCK_DATA = true;

export const JobManagementSection = (): JSX.Element => {
  const [jobs, setJobs] = useState<JobMock[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 폼 입력 상태
  const [jobName, setJobName] = useState("");
  const [jobCode, setJobCode] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [group, setGroup] = useState("");
  const [headcount, setHeadcount] = useState("0");

  // 데이터 불러오기 함수
  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      if (USE_MOCK_DATA) {
        const loaded = getStoredJobs();
        setJobs(loaded);
        if (loaded.length > 0 && selectedId === null) {
          selectJob(loaded[0]);
        }
      } else {
        const response = await jobApi.getJobs({ q: search, active_only: showActiveOnly });
        const mapped: JobMock[] = response.items.map((item) => ({
          job_id: item.job_id,
          job_code: item.job_code,
          job_name: item.job_name,
          job_family: item.job_family,
          job_category: item.job_category,
          description: item.description ?? "",
          is_active: item.is_active,
          headcount: item.headcount,
        }));
        setJobs(mapped);
        if (mapped.length > 0 && selectedId === null) {
          selectJob(mapped[0]);
        }
      }
    } catch (error) {
      console.error("직무 목록 조회 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [showActiveOnly]);

  const selectedJob =
    jobs.find((job) => job.job_id === selectedId) ?? jobs[0];

  const selectJob = (job: JobMock) => {
    setSelectedId(job.job_id);
    setJobName(job.job_name);
    setJobCode(job.job_code);
    setCategory(job.job_category);
    setDescription(job.description);
    setGroup(job.job_family);
    setHeadcount(String(job.headcount));
  };

  const filteredJobs = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        job.job_name.toLowerCase().includes(normalizedSearch) ||
        job.job_code.toLowerCase().includes(normalizedSearch);

      const matchesActive = !showActiveOnly || job.is_active;

      return matchesSearch && matchesActive;
    });
  }, [search, showActiveOnly, jobs]);

  const resetForm = () => {
    if (selectedJob) {
      selectJob(selectedJob);
    }
  };

  // 저장 처리 (Mock vs API)
  const saveChanges = async () => {
    if (!selectedJob) return;

    try {
      if (USE_MOCK_DATA) {
        const updated = jobs.map((job) =>
          job.job_id === selectedJob.job_id
            ? {
                ...job,
                job_name: jobName,
                job_code: jobCode,
                job_family: group,
                job_category: category,
                description,
                headcount: Number(headcount) || 0,
              }
            : job
        );
        setJobs(updated);
        saveStoredJobs(updated);
        alert("직무 정보가 임시 저장되었습니다.");
      } else {
        await jobApi.updateJob(selectedJob.job_id, {
          job_name: jobName,
          job_code: jobCode,
          job_family: group,
          job_category: category,
          description,
        });
        alert("백엔드 API로 직무 수정이 완료되었습니다.");
        fetchJobs();
      }
    } catch (error) {
      console.error("직무 저장 실패:", error);
    }
  };

  // 삭제 처리 (Mock vs API)
  const handleDelete = async () => {
    if (!selectedJob) return;
    if (jobs.length <= 1) {
      alert("최소 1개 이상의 직무가 존재해야 합니다.");
      return;
    }

    if (window.confirm(`"${selectedJob.job_name}" 직무를 삭제(사용 중지)하시겠습니까?`)) {
      try {
        if (USE_MOCK_DATA) {
          const remaining = jobs.filter((job) => job.job_id !== selectedJob.job_id);
          setJobs(remaining);
          saveStoredJobs(remaining);
          if (remaining.length > 0) {
            selectJob(remaining[0]);
          }
        } else {
          await jobApi.deleteJob(selectedJob.job_id);
          fetchJobs();
        }
      } catch (error) {
        console.error("직무 삭제 실패:", error);
      }
    }
  };

  return (
    <div className="grid grid-cols-[385px_650px] grid-rows-[505.50px] min-h-[438px] h-fit gap-4">
      {/* 좌측 직무 목록 영역 */}
      <section
        aria-label="직무 목록"
        className="col-[1_/_2] relative row-[1_/_2] w-full h-full flex flex-col items-start bg-white rounded-lg overflow-hidden border border-solid border-[#e1e9f2]"
      >
        <div className="flex h-[58px] items-start gap-2 px-[13px] py-[11px] relative self-stretch w-full border-b border-[#edf1f6]">
          <label className="flex items-center gap-2 px-[11px] py-0 bg-[#fafcff] rounded-[5px] border border-[#dfe7f0] flex-1">
            <input
              aria-label="직무명 또는 코드 검색"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="직무명 또는 코드 검색"
              className="w-full bg-transparent font-['Noto_Sans_KR',Helvetica] text-[11.5px] text-[#395a7a] outline-none placeholder:text-[#97a7ba]"
            />
          </label>
        </div>

        <div className="flex h-[38px] items-center justify-between px-3.5 w-full bg-[#f8fafd]">
          <span className="text-[#7890ad] text-[10.5px]">
            전체 {filteredJobs.length}개 {isLoading && "(로딩 중...)"}
          </span>
          <button
            type="button"
            aria-pressed={showActiveOnly}
            onClick={() => setShowActiveOnly((value) => !value)}
            className="text-[#56789f] text-[10.5px] cursor-pointer"
          >
          </button>
        </div>

        <div className="flex flex-col items-start px-[7px] py-[5px] w-full overflow-y-auto max-h-[360px]">
          {filteredJobs.map((job, index) => {
            const isSelected = selectedJob?.job_id === job.job_id;
            return (
              <button
                type="button"
                key={job.job_id}
                onClick={() => selectJob(job)}
                aria-current={isSelected ? "true" : undefined}
                className={`flex w-[369px] h-[58px] items-center gap-2.5 px-2.5 py-2 relative cursor-pointer ${
                  isSelected
                    ? "bg-[#cff7ff] rounded-md border-transparent"
                    : "bg-white border-b border-[#edf1f5]"
                }`}
              >
                <span className={`grid place-items-center w-[27px] h-[27px] rounded-md ${isSelected ? "bg-[#dbeaff] text-[#1973e8]" : "bg-[#f0f4f8] text-[#7d93ad]"}`}>
                  {index + 1}
                </span>
                <span className="flex flex-col items-start text-left">
                  <span className="font-bold text-[#294968] text-xs">{job.job_name}</span>
                  <span className="text-[#8799ae] text-[9.5px]">{job.job_code} · {job.job_family} · {job.job_category}</span>
                </span>
                <span className="relative ml-auto font-bold text-xs text-[#365c85]">
                  {job.headcount}명
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 우측 직무 상세/수정 폼 영역 */}
      <section
        aria-label="직무 상세 정보"
        className="col-[2_/_3] pt-0 pb-[58px] px-0 relative row-[1_/_2] w-full h-full flex flex-col items-start bg-white rounded-lg overflow-hidden border border-[#e1e9f2]"
      >
        <header className="flex h-[78px] items-center gap-[13px] px-5 w-full border-b border-[#e8edf3]">
          <div className="grid w-[42px] h-[42px] bg-[#e5f8f5] rounded-[9px] place-items-center">
            <span>🏢</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#7e93ad] text-[9px] tracking-[0.36px]">{selectedJob?.job_code}</span>
            <span className="text-[#193a61] text-base pt-1">{selectedJob?.job_name}</span>
          </div>
        </header>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            saveChanges();
          }}
          className="flex flex-col items-start pt-[17px] pb-3 px-5 w-full"
        >
          <div className="flex items-center gap-[9px] w-full">
            <h2 className="font-bold text-[#365775] text-[11.5px]">기본 정보</h2>
            <span className="text-[#94a4b6] text-[9.5px]">필수 정보를 입력해주세요.</span>
          </div>

          <div className="grid grid-cols-[297.50px_297.50px] gap-[11px_13px] pt-3 w-full">
            <label className="flex flex-col items-start">
              <span className="pb-1.5 text-[9.5px] text-[#657e9b]">직무명 <strong className="text-[#ed5862]">*</strong></span>
              <input
                required
                value={jobName}
                onChange={(event) => setJobName(event.target.value)}
                className="w-[297.5px] h-[31px] px-[9px] bg-white rounded-[5px] border border-[#dfe7f0] text-[11px] text-[#395a7a] outline-none"
              />
            </label>
            <label className="flex flex-col items-start">
              <span className="pb-1.5 text-[9.5px] text-[#657e9b]">직무 코드 <strong className="text-[#ed5862]">*</strong></span>
              <input
                required
                value={jobCode}
                onChange={(event) => setJobCode(event.target.value)}
                className="w-[297.5px] h-[31px] px-[9px] bg-white rounded-[5px] border border-[#dfe7f0] text-[11px] text-[#395a7a] outline-none"
              />
            </label>
            <label className="col-[1_/_3] flex flex-col items-start">
              <span className="pb-1.5 text-[9.5px] text-[#657e9b]">직무 분류</span>
              <input
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full h-[31px] px-3.5 bg-white rounded-[5px] border border-[#dfe7f0] text-[11px] text-[#395a7a] outline-none"
              />
            </label>
            <label className="col-[1_/_3] flex flex-col items-start">
              <span className="pb-1.5 text-[9.5px] text-[#657e9b]">설명</span>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="w-[608px] h-12 p-[9px] bg-white rounded-[5px] border border-[#dfe7f0] text-[11px] text-[#395a7a] resize-none outline-none"
              />
            </label>
          </div>

          <div className="flex items-center gap-[9px] pt-[17px] mt-[15px] border-t border-[#edf1f5] w-full">
            <h2 className="font-bold text-[#365775] text-[11.5px]">직무 정보</h2>
            <span className="text-[#94a4b6] text-[9.5px]">직무 운영에 필요한 추가 설정입니다.</span>
          </div>

          <div className="grid grid-cols-[297.50px_297.50px] gap-[11px_13px] pt-2.5 w-full">
            <label className="flex flex-col items-start">
              <span className="pb-1.5 text-[9.5px] text-[#657e9b]">직군 (Job Family)</span>
              <input
                value={group}
                onChange={(event) => setGroup(event.target.value)}
                className="w-[297.5px] h-[31px] px-[9px] bg-white rounded-[5px] border border-[#dfe7f0] text-[11px] text-[#395a7a] outline-none"
              />
            </label>
            <label className="flex flex-col items-start">
              <span className="pb-1.5 text-[9.5px] text-[#657e9b]">현재 인원</span>
              <div className="relative w-full">
                <input
                  type="number"
                  min="0"
                  value={headcount}
                  onChange={(event) => setHeadcount(event.target.value)}
                  className="w-[298px] h-[31px] pl-[9px] pr-[30px] bg-white rounded-[5px] border border-[#dfe7f0] text-[11px] text-[#395a7a] outline-none"
                />
                <span className="absolute top-[9px] right-[9px] text-[9px] text-[#8497ae]">명</span>
              </div>
            </label>
          </div>
        </form>

        <footer className="flex w-[648px] h-[57px] items-center justify-end gap-2 px-5 absolute top-[448px] left-px bg-[#fbfcfe] border-t border-[#e7edf4]">
          <div className="flex items-start relative flex-1 grow">
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex h-[31px] items-center gap-[5px] px-[13px] rounded-[5px] text-[#e65a62] text-[10.5px] cursor-pointer"
            >
              삭제
            </button>
          </div>
          <button
            type="button"
            onClick={resetForm}
            className="inline-flex h-[31px] items-center justify-center px-[13px] bg-white rounded-[5px] border border-[#dae4ee] text-[#647d9b] text-[10.5px] cursor-pointer"
          >
            취소
          </button>
          <button
            type="button"
            onClick={saveChanges}
            className="inline-flex h-[31px] items-center justify-center px-[13px] bg-[#15b9dc] rounded-[5px] text-white text-[10.5px] cursor-pointer"
          >
            변경사항 저장
          </button>
        </footer>
      </section>
    </div>
  );
};