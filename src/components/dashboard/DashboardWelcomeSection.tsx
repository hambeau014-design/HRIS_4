import type { JSX } from "react/jsx-runtime";

export const DashboardWelcomeSection = (): JSX.Element => {
  return (
    <section
      aria-labelledby="dashboard-welcome-heading"
      className="flex items-end justify-around relative self-stretch w-full flex-[0_0_auto]"
    >
      <div className="flex flex-col w-[296.91px] items-start px-0 py-2.5 relative">
        <div className="w-[296.91px] h-[50px] pt-2 pb-0 px-0 flex flex-col items-start relative">
          <h1
            id="dashboard-welcome-heading"
            className="relative w-fit mt-[-1.00px] mr-[-43.09px] [font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#101728] text-[40px] tracking-[-0.98px] leading-[42px] whitespace-nowrap"
          >
            좋은 하루를 보내세요
          </h1>
        </div>
        <div className="flex-col w-[296.91px] h-7 items-start pt-2 pb-0 px-0 flex relative">
          <p className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#8a95a7] text-[13px] tracking-[0] leading-[19.5px] whitespace-nowrap">
            오늘의 조직현황과 일정을 한눈에 확인하세요.
          </p>
        </div>
      </div>
    </section>
  );
};
