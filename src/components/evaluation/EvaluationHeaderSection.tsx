import type { JSX } from "react/jsx-runtime";

export const EvaluationHeaderSection = (): JSX.Element => {
  return (
    <header className="flex items-end justify-around relative self-stretch w-full flex-[0_0_auto]">
      <div className="flex flex-col w-[296.91px] items-start relative">
        <div className="w-[296.91px] h-[50px] pt-2 pb-0 px-0 flex flex-col items-start relative">
          <h1 className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#101728] text-[40px] tracking-[-0.98px] leading-[42px] whitespace-nowrap">
            평가 관리
          </h1>
        </div>
        <div className="flex flex-col w-[296.91px] h-7 items-start pt-2 pb-0 px-0 relative">
          <p className="text-[#8a95a7] text-[13px] leading-[19.5px] relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-normal tracking-[0] whitespace-nowrap">
            구성원의 목표와 성과를 공정하고 투명하게 관리하세요.
          </p>
        </div>
      </div>
    </header>
  );
};
