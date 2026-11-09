import type { JSX } from "react/jsx-runtime";

type MetricIcon = {
  src: string;
  className: string;
};

type EvaluationMetric = {
  label: string;
  value: string;
  unit: string;
  unitClassName: string;
  note: string;
  noteClassName: string;
  iconBackgroundClassName: string;
  iconImages: MetricIcon[];
  cardClassName: string;
};

const evaluationMetrics: EvaluationMetric[] = [
  {
    label: "평가 대상자",
    value: "248",
    unit: "명",
    unitClassName:
      "absolute top-3 left-[45px] [font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#68748a] text-[10px] tracking-[-1.00px] leading-[10px] whitespace-nowrap",
    note: "전체 구성원",
    noteClassName:
      "flex flex-col w-[327.5px] h-[22px] items-start pt-2.5 pb-0 px-0 relative mr-[-78.50px]",
    iconBackgroundClassName: "bg-[#e9fbfd]",
    iconImages: [
      {
        src: "/img/evaluation/vector.svg",
        className: "absolute w-[95.42%] h-[41.25%] top-[58.75%] left-[4.58%]",
      },
      {
        src: "/img/evaluation/vector-1.svg",
        className: "absolute w-[82.92%] h-[91.25%] top-[8.75%] left-[17.08%]",
      },
      {
        src: "/img/evaluation/vector-2.svg",
        className: "absolute w-[37.08%] h-[90.71%] top-[9.29%] left-[62.92%]",
      },
    ],
    cardClassName: "col-[1_/_2]",
  },
  {
    label: "평가 진행률",
    value: "72",
    unit: "%",
    unitClassName:
      "absolute top-3 left-8 [font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#68748a] text-[10px] tracking-[-1.00px] leading-[10px] whitespace-nowrap",
    note: "지난주 대비",
    noteClassName:
      "self-stretch w-full flex-[0_0_auto] flex flex-col items-start pt-2.5 pb-0 px-0 relative",
    iconBackgroundClassName: "bg-[#f0efff]",
    iconImages: [
      {
        src: "/img/evaluation/vector-3.svg",
        className: "absolute w-[91.25%] h-[91.25%] top-[8.75%] left-[8.75%]",
      },
      {
        src: "/img/evaluation/vector-4.svg",
        className: "absolute w-[74.58%] h-[74.58%] top-[25.42%] left-[25.42%]",
      },
    ],
    cardClassName: "col-[2_/_3]",
  },
  {
    label: "평가 완료",
    value: "178",
    unit: "명",
    unitClassName:
      "absolute top-3 left-[45px] [font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#68748a] text-[10px] tracking-[-1.00px] leading-[10px] whitespace-nowrap",
    note: "마감까지 12일",
    noteClassName:
      "w-[327.5px] h-[22px] flex flex-col items-start pt-2.5 pb-0 px-0 relative",
    iconBackgroundClassName: "bg-[#eafaf5]",
    iconImages: [
      {
        src: "/img/evaluation/vector-5.svg",
        className: "absolute w-[82.92%] h-[78.75%] top-[21.25%] left-[17.08%]",
      },
    ],
    cardClassName: "col-[3_/_4]",
  },
  {
    label: "미제출",
    value: "70",
    unit: "명",
    unitClassName:
      "absolute top-3 left-8 [font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#68748a] text-[10px] tracking-[-1.00px] leading-[10px] whitespace-nowrap",
    note: "리마인드 필요",
    noteClassName:
      "w-[327.5px] h-[22px] flex flex-col items-start pt-2.5 pb-0 px-0 relative",
    iconBackgroundClassName: "bg-[#fff7e8]",
    iconImages: [
      {
        src: "/img/evaluation/vector-6.svg",
        className: "absolute w-[91.25%] h-[91.25%] top-[8.75%] left-[8.75%]",
      },
      {
        src: "/img/evaluation/vector-7.svg",
        className: "absolute w-[53.75%] h-[74.58%] top-[25.42%] left-[46.25%]",
      },
    ],
    cardClassName: "col-[4_/_5] justify-self-start",
  },
];

export const EvaluationMetricsSection = (): JSX.Element => {
  return (
    <section
      aria-label="평가 지표"
      className="pt-5 pb-0 px-0 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]"
    >
      <ul className="grid grid-cols-[290px_369.50px_369.50px_369.50px] grid-rows-[118px] w-[1453px] h-[116px] gap-[18px] list-none m-0 p-0">
        {evaluationMetrics.map((metric) => (
          <li
            key={metric.label}
            className={`${metric.cardClassName} w-full min-h-[118px] h-full px-5 py-4 rounded-[15px] relative row-[1_/_2] flex flex-col items-start bg-white border border-solid border-[#e0e5eb]`}
          >
            <div className="flex flex-col w-[327.5px] h-[19px] items-start pt-0.5 pb-0 px-0 relative">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#68748a] text-[11px] tracking-[0] leading-[16.5px] whitespace-nowrap">
                {metric.label}
              </div>
            </div>
            <div className="flex flex-col items-start pt-[13px] pb-0 px-0 flex-[0_0_auto] relative self-stretch w-full">
              <div className="h-[25px] relative self-stretch w-full">
                <div className="absolute -top-1 left-0 font-bold text-[#121829] text-[25px] tracking-[-1.00px] leading-[25px] [font-family:'Noto_Sans_KR',Helvetica] whitespace-nowrap">
                  {metric.value}
                </div>
                <div className={metric.unitClassName}>{metric.unit}</div>
              </div>
            </div>
            <div className={metric.noteClassName}>
              {metric.label === "평가 진행률" ? (
                <div className="relative self-stretch w-full h-3">
                  <span className="absolute -top-px left-0 [font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#08a877] text-[8px] tracking-[0] leading-3 whitespace-nowrap">
                    +12%
                  </span>
                  <span className="absolute -top-px left-[26px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#a0a9b6] text-[8px] tracking-[0] leading-3 whitespace-nowrap">
                    {" "}
                    {metric.note}
                  </span>
                </div>
              ) : (
                <div className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#a0a9b6] text-[8px] tracking-[0] leading-3 whitespace-nowrap">
                  {metric.note}
                </div>
              )}
            </div>
            <div
              className={`grid grid-cols-[38px] grid-rows-[38px] w-[38px] h-[38px] ${metric.iconBackgroundClassName} rounded-[11px]`}
              aria-hidden="true"
            >
              <div className="relative row-[1_/_2] col-[1_/_2] justify-self-center self-center w-5 h-5">
                {metric.iconImages.map((icon) => (
                  <img
                    key={icon.src}
                    className={icon.className}
                    src={icon.src}
                    alt=""
                  />
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
