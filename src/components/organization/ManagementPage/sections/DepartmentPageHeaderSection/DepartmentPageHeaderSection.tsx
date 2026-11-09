import type { JSX } from "react/jsx-runtime";

export const DepartmentPageHeaderSection = (): JSX.Element => {
  return (
    <header
      className="flex w-[1050px] h-[88px] items-start justify-between pt-0 pb-5 px-1 relative mr-[-1.00px] bg-transparent"
      aria-labelledby="department-page-title"
    >
      <div className="flex flex-col w-[266.39px] items-start relative">
        <div className="w-[266.39px] h-[34px] pt-[5px] pb-0 px-0 flex flex-col items-start relative">
          <h1
            id="department-page-title"
            className="relative w-fit mt-[-1.00px] text-[#19395f] text-[19px] tracking-[-0.30px] leading-[28.5px] [font-family:'Noto_Sans_KR',Helvetica] font-normal whitespace-nowrap"
          >
            부서 목록
          </h1>
        </div>
        <div className="flex flex-col w-[266.39px] h-[22px] items-start pt-1 pb-0 px-0 relative">
          <p className="text-[#7a8fa9] text-xs leading-[18px] relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-normal tracking-[0] whitespace-nowrap">
            회사의 조직 구조에 따라 부서를 생성하고 관리합니다.
          </p>
        </div>
      </div>
      <button
        type="button"
        className="relative w-[105.53px] h-[38px] bg-[#15b9dc] rounded-md shadow-[0px_3px_9px_#2377e82e] cursor-pointer"
        aria-label="부서 추가"
      >
        <span
          aria-hidden="true"
          className="absolute top-[3px] left-[17px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-white text-[17px] text-center tracking-[0] leading-[25.5px] whitespace-nowrap"
        >
          ＋
        </span>
        <span className="absolute top-2.5 left-[42px] [font-family:'Noto_Sans_KR',Helvetica] font-bold text-white text-xs text-center tracking-[0] leading-[18px] whitespace-nowrap">
          부서 추가
        </span>
      </button>
    </header>
  );
};
