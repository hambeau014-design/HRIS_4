import { useState, type JSX } from "react";

type SummaryCard = {
  title: string;
  value: string;
  unit: string;
  change: string;
  description: string;
  background: string;
  icons: string[];
};

type Schedule = {
  day: string;
  title: string;
  detail: string;
  color: string;
};

type Activity = {
  title: string;
  detail: string;
  background: string;
  icons: string[];
  arrow: string;
};

const summaryCards: SummaryCard[] = [
  {
    title: "전체 구성원",
    value: "248",
    unit: "명",
    change: "+4.2%",
    description: "지난달 대비",
    background: "#e9fbfd",
    icons: ["/img/dashboard/vector-26.svg", "/img/dashboard/vector-27.svg", "/img/dashboard/vector-28.svg"],
  },
  {
    title: "오늘 출근",
    value: "231",
    unit: "명",
    change: "93.1%",
    description: "전체 구성원",
    background: "#f0efff",
    icons: ["/img/dashboard/vector-29.svg", "/img/dashboard/vector-30.svg"],
  },
  {
    title: "휴가 중",
    value: "8",
    unit: "명",
    change: "오늘",
    description: "휴가 사용",
    background: "#fff7e8",
    icons: ["/img/dashboard/vector-31.svg", "/img/dashboard/vector-32.svg"],
  },
  {
    title: "승인 대기",
    value: "12",
    unit: "건",
    change: "확인 필요",
    description: "결재 요청",
    background: "#fff0f3",
    icons: ["/img/dashboard/vector-33.svg", "/img/dashboard/vector-34.svg"],
  },
];

const chartData = [
  { month: "1월", height: "113.91px" },
  { month: "2월", height: "124.59px" },
  { month: "3월", height: "119.25px" },
  { month: "4월", height: "138.83px" },
  { month: "5월", height: "149.52px" },
  { month: "6월", height: "161.97px" },
];

const schedules: Schedule[] = [
  {
    day: "18",
    title: "신규 입사자 온보딩",
    detail: "오전 10:00 · 라운지",
    color: "#00abc5",
  },
  {
    day: "21",
    title: "상반기 리더 워크숍",
    detail: "오후 2:00 · 회의실 A",
    color: "#6659f4",
  },
  {
    day: "28",
    title: "6월 급여 지급일",
    detail: "전체 구성원",
    color: "#0db984",
  },
];

const activities: Activity[] = [
  {
    title: "신규 구성원 3명이 합류했어요",
    detail: "직원 관리 · 12분 전",
    background: "#e9fbfd",
    icons: ["/img/dashboard/vector-39.svg", "/img/dashboard/vector-40.svg", "/img/dashboard/vector-41.svg"],
    arrow: "/img/dashboard/vector-44.svg",
  },
  {
    title: "휴가 신청 5건이 승인되었어요",
    detail: "인사 관리 · 34분 전",
    background: "#eafaf5",
    icons: ["/img/dashboard/vector-43.svg"],
    arrow: "/img/dashboard/vector-44.svg",
  },
  {
    title: "6월 급여 명세서가 생성되었어요",
    detail: "급여 관리 · 1시간 전",
    background: "#f0efff",
    icons: ["/img/dashboard/vector-45.svg", "/img/dashboard/vector-46.svg"],
    arrow: "/img/dashboard/vector-47.svg",
  },
];

const iconPositions = [
  [
    "w-[95.42%] h-[41.25%] top-[58.75%] left-[4.58%]",
    "w-[82.92%] h-[91.25%] top-[8.75%] left-[17.08%]",
    "w-[37.08%] h-[90.71%] top-[9.29%] left-[62.92%]",
  ],
  [
    "w-[91.25%] h-[91.25%] top-[8.75%] left-[8.75%]",
    "w-[53.75%] h-[74.58%] top-[25.42%] left-[46.25%]",
  ],
  [
    "w-[91.25%] h-[82.92%] top-[17.08%] left-[8.75%]",
    "w-[91.25%] h-[91.25%] top-[8.75%] left-[8.75%]",
  ],
  [
    "w-[87.08%] h-[95.42%] top-[4.58%] left-[12.92%]",
    "w-[70.42%] h-[95.42%] top-[4.58%] left-[29.58%]",
  ],
];

const CardIcon = ({
  icons,
  background,
  size = "w-[21px] h-[21px]",
  positions = iconPositions[0],
}: {
  icons: string[];
  background: string;
  size?: string;
  positions?: string[];
}) => (
  <div
    className="grid grid-cols-[38px] grid-rows-[38px] w-[38px] h-[38px] rounded-[11px]"
    style={{ backgroundColor: background }}
    aria-hidden="true"
  >
    <div
      className={`relative row-[1_/_2] col-[1_/_2] justify-self-center self-center ${size}`}
    >
      {icons.map((icon, index) => (
        <img
          key={icon}
          className={`absolute ${positions[index] ?? "w-[66.25%] h-[78.75%] top-[21.25%] left-[33.75%]"}`}
          alt=""
          src={icon}
        />
      ))}
    </div>
  </div>
);

const PanelHeader = ({
  title,
  subtitle,
  action,
  onAction,
}: {
  title: string;
  subtitle: string;
  action: string;
  onAction: () => void;
}) => (
  <div className="flex h-[78px] items-start justify-between px-[23px] py-5 relative self-stretch w-full border-b [border-bottom-style:solid] border-[#edf0f4]">
    <div className="flex flex-col items-start relative mb-[-4px]">
      <h2 className="[font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#121829] text-sm tracking-[-0.21px] leading-[21px] whitespace-nowrap">
        {title}
      </h2>
      <p className="pt-1.5 [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#a0a9b7] text-[10px] leading-[15px] whitespace-nowrap">
        {subtitle}
      </p>
    </div>
    <button
      type="button"
      onClick={onAction}
      className="all-unset box-border inline-flex items-center gap-[5px] px-0 py-[3px] relative flex-[0_0_auto] cursor-pointer"
    >
      <span className="[font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#5c687a] text-[11px] text-center leading-[16.5px] whitespace-nowrap">
        {action}
      </span>
      {action === "상세보기" && (
        <span className="relative w-[15px] h-[15px]">
          <img
            className="absolute w-[82.92%] h-[74.58%] top-[25.42%] left-[17.08%]"
            alt=""
            src="/img/dashboard/vector-35.svg"
          />
        </span>
      )}
    </button>
  </div>
);

export const WorkforceDashboardSection = (): JSX.Element => {
  const [lastAction, setLastAction] = useState("");

  const handleAction = (label: string) => {
    setLastAction(label);
  };

  return (
    <section
      aria-label="워크포스 대시보드"
      className="flex flex-col min-h-[996px] items-start pt-[34px] pb-[38px] px-12 relative self-stretch w-full flex-[0_0_auto]"
    >
      <div className="flex flex-col items-start pt-7 pb-0 px-0 relative self-stretch w-full flex-[0_0_auto]">
        <div className="grid grid-cols-[369.5px_369.5px_369.5px_369.5px] grid-rows-[146px] h-fit gap-[18px]">
          {summaryCards.map((card, index) => (
            <article
              key={card.title}
              className="min-h-[146px] h-full px-[22px] py-5 bg-white border-[#e0e5eb] shadow-[0px_2px_5px_#14203404] relative w-full flex flex-col items-start rounded-2xl border border-solid"
            >
              <div className="flex items-start justify-between relative self-stretch w-full">
                <h2 className="[font-family:'Noto_Sans_KR',Helvetica] font-medium text-[#667289] text-xs leading-[18px] whitespace-nowrap">
                  {card.title}
                </h2>
                <CardIcon
                  icons={card.icons}
                  background={card.background}
                  positions={iconPositions[index]}
                />
              </div>
              <div className="relative self-stretch w-full h-6">
                <strong className="absolute -top-2.5 left-0 [font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#111727] text-3xl tracking-[-1.2px] leading-[30px]">
                  {card.value}
                </strong>
                <span className="absolute top-2.5 left-[54px] [font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#5d687b] text-[11px] leading-[11px]">
                  {card.unit}
                </span>
              </div>
              <div className="w-[323.5px] h-[30px] items-center gap-[7px] pt-[15px] flex relative">
                <strong className="[font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#04a977] text-[10px] leading-[15px]">
                  {card.change}
                </strong>
                <span className="[font-family:'Noto_Sans_KR',Helvetica] text-[#a2abba] text-[10px] leading-[15px]">
                  {card.description}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start pt-5 pb-0 px-0 relative self-stretch w-full flex-[0_0_auto]">
        <div className="grid grid-cols-[963.28px_548.72px] grid-rows-[380px_246px] h-fit gap-5">
          <article className="row-[1_/_2] col-[1_/_2] h-[380px] bg-white overflow-hidden border-[#e0e5eb] shadow-[0px_2px_5px_#14203404] relative w-full rounded-2xl border border-solid">
            <PanelHeader
              title="구성원 현황"
              subtitle="최근 6개월 구성원 증감 추이"
              action="상세보기"
              onAction={() => handleAction("상세보기")}
            />
            <div className="flex items-center gap-2 pt-[18px] px-6">
              <strong className="[font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#121829] text-[23px] leading-[34.5px]">
                248
              </strong>
              <span className="[font-family:'Noto_Sans_KR',Helvetica] text-[#9ba5b5] text-[10px]">
                현재 인원
              </span>
              <span className="ml-[7px] px-[9px] py-1 bg-[#eafaf5] rounded-md [font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#08a877] text-[9px]">
                +12명
              </span>
            </div>
            <div className="flex flex-col items-start px-6">
              <div className="relative self-stretch w-full h-[226px] border-b border-[#e8edf1]">
                {[63, 115, 166].map((top) => (
                  <div
                    key={top}
                    className={`absolute top-[${top}px] left-0 w-[913px] h-px bg-[#f1f3f6]`}
                  />
                ))}
                <div className="flex items-end justify-between absolute top-[23px] left-0 right-0 h-[178px]">
                  {chartData.map((item) => (
                    <div
                      key={item.month}
                      className="flex flex-col w-[114px] h-[178px] items-center justify-end relative"
                    >
                      <div
                        className="w-[72px] rounded-[9px_9px_2px_2px] shadow-[inset_0px_1px_0px_#ffffff73] bg-[linear-gradient(180deg,rgba(32,206,224,1)_0%,rgba(11,180,208,1)_100%)]"
                        style={{ height: item.height }}
                      />
                      <span className="absolute top-[184px] [font-family:'Noto_Sans_KR',Helvetica] text-[#9ba5b5] text-[9px]">
                        {item.month}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
          <article className="row-[1_/_2] col-[2_/_3] h-[380px] bg-white overflow-hidden border-[#e0e5eb] shadow-[0px_2px_5px_#14203404] relative w-full rounded-2xl border border-solid">
            <PanelHeader
              title="오늘의 일정"
              subtitle="예정된 주요 인사 일정"
              action="전체 보기"
              onAction={() => handleAction("전체 보기")}
            />
            <div className="flex flex-col items-start px-[22px]">
              {schedules.map((schedule, index) => (
                <div
                  key={schedule.day}
                  className={`inline-flex h-[92px] items-center relative self-stretch ${index < schedules.length - 1 ? "border-b border-[#eef1f4]" : ""}`}
                >
                  <div className="w-[47px]">
                    <strong className="block [font-family:'Noto_Sans_KR',Helvetica] text-lg text-[#121829] leading-[18px]">
                      {schedule.day}
                    </strong>
                    <span className="[font-family:'Noto_Sans_KR',Helvetica] text-[#a5aebb] text-[9px]">
                      6월
                    </span>
                  </div>
                  <div className="pr-4">
                    <div
                      className="w-1 h-[39px] rounded"
                      style={{ backgroundColor: schedule.color }}
                    />
                  </div>
                  <div className="flex-1">
                    <strong className="[font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#121829] text-[11px]">
                      {schedule.title}
                    </strong>
                    <p className="[font-family:'Noto_Sans_KR',Helvetica] text-[#9ba5b3] text-[9px]">
                      {schedule.detail}
                    </p>
                  </div>
                  <span className="relative w-4 h-4">
                    <img
                      className="absolute w-[66.25%] h-[78.75%] top-[21.25%] left-[33.75%]"
                      alt=""
                      src="/img/dashboard/vector-38.svg"
                    />
                  </span>
                </div>
              ))}
            </div>
          </article>
          <article className="row-[2_/_3] col-[1_/_2] h-[246px] bg-white overflow-hidden border-[#e0e5eb] shadow-[0px_2px_5px_#14203404] relative w-full rounded-2xl border border-solid">
            <PanelHeader
              title="최근 활동"
              subtitle="구성원 요청 및 문서 처리 현황"
              action="모두 확인"
              onAction={() => handleAction("모두 확인")}
            />
            <div className="grid grid-cols-[305.75px_305.77px_305.75px] grid-rows-[132px] h-[166px] px-[22px] py-[17px]">
              {activities.map((activity, index) => (
                <div
                  key={activity.title}
                  className={`relative w-full h-full flex items-center gap-3 py-0 ${index === 0 ? "pr-[18px]" : index === 1 ? "px-[18px]" : "pl-[18px]"} ${index < 2 ? "border-r border-[#eef1f4]" : ""}`}
                >
                  <CardIcon
                    icons={activity.icons}
                    background={activity.background}
                    size="w-[19px] h-[19px]"
                    positions={
                      index === 0
                        ? iconPositions[0]
                        : index === 1
                          ? ["w-[82.92%] h-[78.75%] top-[21.25%] left-[17.08%]"]
                          : iconPositions[3]
                    }
                  />
                  <div className="min-w-0 flex-1">
                    <strong className="block [font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#121829] text-[10px] leading-[15px] whitespace-nowrap">
                      {activity.title}
                    </strong>
                    <p className="[font-family:'Noto_Sans_KR',Helvetica] text-[#a0a9b7] text-[8px] leading-3 whitespace-nowrap">
                      {activity.detail}
                    </p>
                  </div>
                  <img
                    className="relative w-4 h-4 object-contain"
                    alt=""
                    src={activity.arrow}
                  />
                </div>
              ))}
            </div>
          </article>
          <article className="row-[2_/_3] col-[2_/_3] h-[246px] px-6 py-[22px] overflow-hidden border-[#bdeef2] bg-[linear-gradient(117deg,rgba(239,253,255,1)_0%,rgba(255,255,255,1)_46%,rgba(213,247,250,1)_100%)] relative w-full rounded-2xl border border-solid">
            <div className="grid grid-cols-[41px] grid-rows-[41px] w-[41px] h-[41px] bg-[#10bdd2] rounded-[11px] shadow-[0px_9px_20px_#10bdd233]">
              <div className="relative row-[1_/_2] col-[1_/_2] justify-self-center self-center w-6 h-6">
                <img
                  className="absolute w-[91.25%] h-[74.58%] top-[25.42%] left-[8.75%]"
                  alt=""
                  src="/img/dashboard/vector-48.svg"
                />
                <img
                  className="absolute w-[91.25%] h-[91.25%] top-[8.75%] left-[8.75%]"
                  alt=""
                  src="/img/dashboard/vector-49.svg"
                />
              </div>
            </div>
            <div className="pt-[15px] [font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#13a7b9] text-[9px]">
              이번 달 인사 요약
            </div>
            <p className="pt-[5px] [font-family:'Noto_Sans_KR',Helvetica] text-[#121829] text-[17px] leading-[24.6px] tracking-[-0.43px]">
              우리 팀은 꾸준히
              <br />
              성장하고 있어요.
            </p>
            <div className="absolute top-[105px] left-[383px] w-[210px] h-[210px] rounded-full border-[30px] border-solid border-[#14c7d912]" />
            <div className="grid grid-cols-3 w-fit mt-5">
              {[
                ["12", "신규 입사"],
                ["4", "부서 이동"],
                ["98%", "출근율"],
              ].map(([value, label], index) => (
                <div
                  key={label}
                  className={`w-[166.91px] text-center ${index < 2 ? "border-r border-[#d7edf0]" : ""}`}
                >
                  <strong className="block [font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#121829] text-[15px] leading-[22.5px]">
                    {value}
                  </strong>
                  <span className="[font-family:'Noto_Sans_KR',Helvetica] text-[#77909a] text-[8px]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
      <span className="sr-only" aria-live="polite">
        {lastAction ? `${lastAction} 버튼을 선택했습니다.` : ""}
      </span>
    </section>
  );
};
