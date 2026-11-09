import type { JSX } from "react/jsx-runtime";

export const SearchAndActionsSection = (): JSX.Element => {
  return (
    <header
      className="flex min-h-[76px] items-center justify-between gap-3 px-4 py-3 sm:px-5 xl:px-6 relative self-stretch w-full bg-white [border-top-style:none] [border-right-style:none] border-b [border-bottom-style:solid] [border-left-style:none] border-[#e7ebf2]"
      aria-label="검색 및 작업"
    >
      <form
        className="flex h-12 min-w-0 max-w-[600px] flex-1 items-center gap-3 rounded-xl bg-[#f1f4f9] px-4"
        role="search"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="relative w-[18.73px] h-5" aria-hidden="true">
          <img
            className="absolute w-[86.87%] h-[84.54%] top-[15.46%] left-[13.13%]"
            src="/img/dashboard/vector-20.svg"
            alt=""
          />
          <img
            className="absolute w-[36.87%] h-[37.71%] top-[62.29%] left-[63.13%]"
            src="/img/dashboard/vector-21.svg"
            alt=""
          />
        </div>
        <div className="flex min-w-0 flex-1 items-center">
          <label htmlFor="global-search" className="sr-only">
            구성원, 문서, 메뉴 검색
          </label>
          <input
            id="global-search"
            name="search"
            type="search"
            placeholder="검색 기능 준비 중"
            autoComplete="off"
            className="h-8 w-full min-w-0 bg-transparent text-sm text-[#334155] outline-none placeholder:text-[#94a5ba]" disabled aria-disabled="true"
          />
        </div>
      </form>
      <div className="inline-flex shrink-0 items-center gap-2 sm:gap-3">
        <button
          type="button"
          disabled className="grid h-11 w-11 cursor-not-allowed place-items-center rounded-xl border border-[#dfe5ee] opacity-60"
          aria-label="알림"
        >
          <div
            className="relative row-[1_/_2] col-[1_/_2] justify-self-center self-center w-[23px] h-[23px]"
            aria-hidden="true"
          >
            <img
              className="absolute w-[91.04%] h-[95.21%] top-[4.79%] left-[8.96%]"
              src="/img/dashboard/vector-22.svg"
              alt=""
            />
          </div>
          <span
            className="absolute top-[13px] left-9 w-1.5 h-1.5 bg-[#20a5ff] rounded-[3px]"
            aria-label="새 알림"
          />
        </button>
        <button
          type="button"
          disabled
          title="구성원 초대 기능은 아직 연결되지 않았습니다."
          className="hidden h-11 cursor-not-allowed items-center gap-2 rounded-xl bg-[#070b1e] px-4 text-sm text-white opacity-50 sm:inline-flex"
          aria-label="구성원 초대 기능 준비 중"
        >
          <div className="relative w-[22px] h-[22px]" aria-hidden="true">
            <img
              className="absolute w-[99.37%] h-[41.04%] top-[58.96%] left-0"
              src="/img/dashboard/vector-23.svg"
              alt=""
            />
            <img
              className="absolute w-[84.79%] h-[91.04%] top-[8.96%] left-[15.21%]"
              src="/img/dashboard/vector-24.svg"
              alt=""
            />
            <img
              className="absolute w-[32.71%] h-[91.04%] top-[8.96%] left-[67.29%]"
              src="/img/dashboard/vector-25.svg"
              alt=""
            />
          </div>
          <span className="inline-flex flex-col items-start relative flex-[0_0_auto]">
            <span className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-white text-sm tracking-[0] leading-[20px] whitespace-nowrap">
              초대 준비 중
            </span>
          </span>
        </button>
      </div>
    </header>
  );
};
