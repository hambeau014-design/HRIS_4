
import type { JSX } from "react";


export const JobGradeHeaderSection = (): JSX.Element => {
  return (
    <header className="relative mr-[-1px] flex h-[107px] w-full items-start justify-between bg-transparent px-1 pb-5 pt-0">
      <div className="relative flex w-[255.36px] flex-col items-start">
        <div className="relative flex h-[34px] w-full flex-col items-start px-0 pb-0 pt-[5px]">
          <h1 className="text-[19px] font-normal leading-[28.5px] tracking-[-0.30px] text-[#19395f]">
            직급 체계
          </h1>
        </div>
        <div className="relative flex h-[22px] w-full flex-col items-start px-0 pb-0 pt-1">
          <p className="text-xs font-normal leading-[18px] text-[#7a8fa9]">
            승진과 보상의 기준이 되는 직급 체계를 관리합니다.
          </p>
        </div>
      </div>

      <button
        type="button"
        className="relative h-[38px] w-[105.53px] cursor-pointer rounded-md bg-[#15b9dc] shadow-[0px_3px_9px_#2377e82e]"
      >
        <span className="absolute left-[17px] top-[3px] text-[17px] text-white">
          ＋
        </span>
        <span className="absolute left-[42px] top-2.5 text-xs font-bold text-white">
          직급 추가
        </span>
      </button>
    </header>
  );
};
