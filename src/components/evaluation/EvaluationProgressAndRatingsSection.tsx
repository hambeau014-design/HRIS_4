import { useState, type JSX } from "react";

type ProgressStep = {
  number: number;
  title: string;
  completed: string;
  percentage: string;
  active: boolean;
  completedIcon: boolean;
};

type GradeDistribution = {
  grade: string;
  width: string;
  count: string;
  percentage: string;
};

const progressSteps: ProgressStep[] = [
  {
    number: 1,
    title: "목표 설정",
    completed: "248명 완료",
    percentage: "100%",
    active: true,
    completedIcon: true,
  },
  {
    number: 2,
    title: "자기 평가",
    completed: "212명 완료",
    percentage: "85%",
    active: true,
    completedIcon: false,
  },
  {
    number: 3,
    title: "동료 평가",
    completed: "178명 완료",
    percentage: "72%",
    active: false,
    completedIcon: false,
  },
  {
    number: 4,
    title: "리더 평가",
    completed: "96명 완료",
    percentage: "39%",
    active: false,
    completedIcon: false,
  },
];

const gradeDistributions: GradeDistribution[] = [
  {
    grade: "S",
    width: "48.62px",
    count: "18",
    percentage: "10%",
  },
  {
    grade: "A",
    width: "121.56px",
    count: "44",
    percentage: "25%",
  },
  {
    grade: "B",
    width: "218.81px",
    count: "78",
    percentage: "45%",
  },
  {
    grade: "C",
    width: "77.8px",
    count: "28",
    percentage: "16%",
  },
  {
    grade: "D",
    width: "19.44px",
    count: "8",
    percentage: "4%",
  },
];

export const EvaluationProgressAndRatingsSection = (): JSX.Element => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <section
      aria-label="평가 진행률 및 예상 등급 분포"
      className="pt-4 pb-0 px-0 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]"
    >
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <article className="col-[1_/_2] [align-self:start] w-full min-w-0 min-h-[274px] rounded-2xl overflow-hidden relative row-[1_/_2] flex flex-col items-start bg-white border border-solid border-[#e0e5eb]">
          <header className="flex h-[66px] items-start justify-between px-[22px] py-4 relative self-stretch w-full border-b [border-bottom-style:solid] border-[#edf0f4]">
            <div className="flex flex-col w-[132.22px] items-start relative mb-[-7.00px]">
              <div className="self-stretch w-full flex-[0_0_auto] flex flex-col items-start relative">
                <h2 className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#121829] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                  2025 상반기 성과 평가
                </h2>
              </div>
              <div className="flex flex-col w-[132.22px] h-5 items-start pt-1.5 pb-0 px-0 relative">
                <p className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#a0a9b7] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                  2025.06.01 — 2025.06.30
                </p>
              </div>
            </div>
            <div
              aria-label="평가 진행 중"
              className="inline-flex items-center gap-1.5 px-[9px] py-1.5 relative flex-[0_0_auto] bg-[#e8faf4] rounded-xl"
            >
              <span className="relative w-[5px] h-[5px] bg-[#0db984] rounded-[2.5px]" />
              <span className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#078a69] text-[11px] tracking-[0] leading-4 whitespace-nowrap">
                진행 중
              </span>
            </div>
          </header>
          <div className="grid grid-cols-[minmax(112px,150px)_minmax(0,1fr)] gap-3 px-4 py-3 sm:px-6">
            <div
              role="img"
              aria-label="전체 진행률 72%"
              className="relative row-[1_/_2] col-[1_/_2] justify-self-center self-center w-32 h-32"
            >
              <div className="relative w-32 h-32 rounded-[64px] border-[15px] border-solid border-[#e8f7fa] rotate-[20.00deg]">
                <div className="absolute left-1/2 top-[43%] flex -translate-x-1/2 -translate-y-1/2 rotate-[-20deg] flex-col items-center">
                  <div className="font-bold text-[#121829] text-[25px] leading-[37.5px] relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] tracking-[0] whitespace-nowrap">
                    72%
                  </div>
                </div>
                <div className="absolute left-1/2 top-[65%] flex -translate-x-1/2 -translate-y-1/2 rotate-[-20deg] flex-col items-center">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#98a2b2] text-[10px] tracking-[0] leading-4 whitespace-nowrap">
                    전체 진행률
                  </div>
                </div>
              </div>
            </div>
            <div className="grid min-w-0 grid-cols-1 grid-rows-4 gap-[5px] relative row-[1_/_2] col-[2_/_3] self-center w-full">
              {progressSteps.map((step) => (
                <div
                  key={step.number}
                  className="relative w-full min-h-[38px] h-full flex items-center"
                >
                  <div className="inline-flex items-start pl-0 pr-2.5 py-0 relative flex-[0_0_auto]">
                    <div
                      className={`grid grid-cols-[23px] grid-rows-[23px] w-[25px] h-[25px] rounded-[12.5px] border border-solid ${
                        step.active
                          ? step.number === 1
                            ? "bg-[#0db98a]"
                            : "bg-[#0db8d0]"
                          : "border-[#dce2e8]"
                      }`}
                    >
                      {step.completedIcon ? (
                        <div className="relative row-[1_/_2] col-[1_/_2] justify-self-center self-center w-[13px] h-[13px]">
                          <img
                            className="absolute w-[82.92%] h-[78.75%] top-[21.25%] left-[17.08%]"
                            alt=""
                            src="/img/evaluation/vector-8.svg"
                          />
                        </div>
                      ) : (
                        <span
                          className={`relative row-[1_/_2] col-[1_/_2] justify-self-center self-center w-[5px] h-3 font-normal text-[8px] tracking-[0] leading-3 [font-family:'Noto_Sans_KR',Helvetica] whitespace-nowrap ${
                            step.active ? "text-white" : "text-[#9ca6b5]"
                          }`}
                        >
                          {step.number}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="grid min-w-0 flex-1 grid-cols-1 grid-rows-[auto_auto] gap-1">
                    <div className="relative row-[1_/_2] col-[1_/_2] w-full h-full flex flex-col items-start">
                      <span className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#121829] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                        {step.title}
                      </span>
                    </div>
                    <div className="relative row-[2_/_3] col-[1_/_2] w-full h-full flex flex-col items-start">
                      <span className="text-[#9da7b5] text-[11px] leading-4 relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-normal tracking-[0] whitespace-nowrap">
                        {step.completed}
                      </span>
                    </div>
                  </div>
                  <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                    <span className="font-bold text-[#667287] text-xs leading-4 relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] tracking-[0] whitespace-nowrap">
                      {step.percentage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>
        <article className="col-[2_/_3] min-w-0 w-full [align-self:start] min-h-[274px] rounded-2xl overflow-hidden relative row-[1_/_2] flex flex-col items-start bg-white border border-solid border-[#e0e5eb]">
          <header className="flex h-[66px] items-start justify-between px-[22px] py-4 relative self-stretch w-full border-b [border-bottom-style:solid] border-[#edf0f4]">
            <div className="flex flex-col w-[85.12px] items-start relative mb-[-7.00px]">
              <div className="self-stretch w-full flex-[0_0_auto] flex flex-col items-start relative">
                <h2 className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#121829] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                  예상 등급 분포
                </h2>
              </div>
              <div className="flex flex-col w-[85.12px] h-5 items-start pt-1.5 pb-0 px-0 relative">
                <p className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#a0a9b7] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                  현재 완료된 평가 기준
                </p>
              </div>
            </div>
            <button
              type="button"
              aria-label="예상 등급 분포 상세보기"
              aria-expanded={detailsOpen}
              onClick={() => setDetailsOpen((open) => !open)}
              className="all-unset box-border inline-flex items-center gap-[5px] px-0 py-0.5 relative flex-[0_0_auto] cursor-pointer"
            >
              <span className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#647085] text-[9px] text-center tracking-[0] leading-[13.5px] whitespace-nowrap">
                상세보기
              </span>
              <span className="relative w-3.5 h-3.5">
                <img
                  className="absolute w-[82.92%] h-[74.58%] top-[25.42%] left-[17.08%]"
                  alt=""
                  src="/img/evaluation/vector-9.svg"
                />
              </span>
            </button>
          </header>
          <div className="grid w-full grid-cols-1 grid-rows-5 gap-2.5 pt-[17px] pb-[11px] px-[22px]">
            {gradeDistributions.map((distribution) => (
              <div
                key={distribution.grade}
                className="grid grid-cols-[22px_minmax(0,1fr)_35px_28px] grid-rows-[auto] items-center gap-2 relative w-full"
              >
                <div className="relative self-center w-full h-[15px] flex flex-col items-start">
                  <span className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#121829] text-[10px] tracking-[0] leading-[15px] whitespace-nowrap">
                    {distribution.grade}
                  </span>
                </div>
                <div className="relative self-center w-full h-[7px] flex flex-col items-start bg-[#edf1f5] rounded-md overflow-hidden">
                  <div
                    className="relative h-[7px] rounded-md bg-[linear-gradient(90deg,rgba(23,199,218,1)_0%,rgba(11,151,190,1)_100%)]"
                    style={{ width: distribution.width }}
                  />
                </div>
                <div className="relative self-center w-full h-[13.5px]">
                  <span className="absolute -top-px left-0 font-bold text-[#121829] text-[9px] tracking-[0] leading-[13.5px] [font-family:'Noto_Sans_KR',Helvetica] whitespace-nowrap">
                    {distribution.count}
                  </span>
                  <span className="absolute top-px left-[13px] [font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#8f99a8] text-[11px] tracking-[0] leading-4 whitespace-nowrap">
                    명
                  </span>
                </div>
                <div className="relative self-center w-full h-3 flex flex-col items-start">
                  <span className="font-normal text-[#8f99a8] text-xs leading-4 relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] tracking-[0] whitespace-nowrap">
                    {distribution.percentage}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center pt-[3px] pb-0 px-[22px] relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex items-center gap-[7px] px-3 py-2.5 relative self-stretch w-full flex-[0_0_auto] bg-[#f2f8fa] rounded-[9px]">
              <div className="relative w-[15px] h-[15px]">
                <img
                  className="absolute w-[78.75%] h-[91.25%] top-[8.75%] left-[21.25%]"
                  alt=""
                  src="/img/evaluation/vector-10.svg"
                />
                <img
                  className="absolute w-[95.42%] h-[37.08%] top-[62.92%] left-[4.58%]"
                  alt=""
                  src="/img/evaluation/vector-11.svg"
                />
              </div>
              <p className="relative w-fit [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#718094] text-[11px] tracking-[0] leading-4 whitespace-nowrap">
                등급 분포는 평가 완료 현황에 따라 자동으로 업데이트됩니다.
              </p>
            </div>
          </div>
          {detailsOpen && (
            <div className="sr-only" role="status" aria-live="polite">
              예상 등급 분포 상세 정보가 선택되었습니다.
            </div>
          )}
        </article>
      </div>
    </section>
  );
};
