import type { JSX } from "react/jsx-runtime";

const documentShortcuts = [
  {
    title: "경력증명서",
    description: "경력을 증명하는 문서",
    backgroundClass: "bg-[#f0ebff]",
    assets: ["/img/document/vector-2.svg", "/img/document/vector-3.svg"],
  },
  {
    title: "원천징수영수증",
    description: "세금 납부 내역 확인",
    backgroundClass: "bg-[#e5f8f3]",
    assets: ["/img/document/vector-4.svg", "/img/document/vector-5.svg"],
  },
  {
    title: "급여명세서",
    description: "급여 내역 확인",
    backgroundClass: "bg-[#fff2e5]",
    assets: ["/img/document/vector-6.svg", "/img/document/vector-7.svg"],
  },
  {
    title: "재직증명서",
    description: "재직 사실을 증명하는 문서",
    backgroundClass: "bg-[#e9f3ff]",
    assets: ["/img/document/vector-8.svg", "/img/document/vector-9.svg"],
  },
];

export const DocumentIssuanceShortcutsSection = (): JSX.Element => {
  return (
    <aside
      aria-labelledby="document-issuance-shortcuts-title"
      className="relative row-[1_/_2] col-[2_/_3] justify-self-start [align-self:end] w-[314px] h-[660px] flex flex-col items-start bg-white rounded-[15px] overflow-hidden border border-solid border-[#e4e9f0] shadow-[0px_10px_30px_#2239560b]"
    >
      <div className="flex flex-col w-[486px] h-[863px] items-start pt-[25px] pb-[19px] px-[19px] relative mr-[-173.00px] bg-[#fffffffa] rounded-lg border border-solid border-[#e7edf6]">
        <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
          <h2
            id="document-issuance-shortcuts-title"
            className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#172c4a] text-base tracking-[0] leading-6 whitespace-nowrap"
          >
            문서 발급 바로가기
          </h2>
        </div>
        <div className="grid grid-cols-1 grid-rows-[repeat(1,fit-content(100%))] h-fit pt-5 pb-0 px-0">
          <div
            className="grid grid-cols-1 grid-rows-[repeat(4,fit-content(100%))] w-[264px] h-fit gap-[15px] relative row-[1_/_2] col-[1_/_2] justify-self-start"
            role="list"
          >
            {documentShortcuts.map((shortcut) => (
              <button
                key={shortcut.title}
                type="button"
                aria-label={`${shortcut.title} 발급`}
                className="grid grid-cols-[56px_170.44px] grid-rows-[126px] h-32 px-[15px] py-0 relative row-auto col-[1_/_2] [align-self:start] w-full bg-white rounded-lg border border-solid border-[#dde7f3] text-left cursor-pointer transition-shadow duration-150 hover:shadow-[0px_4px_12px_#22395614] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4b75a6]"
              >
                <div
                  className={`grid grid-cols-[45px] grid-rows-[45px] w-[45px] h-[45px] relative row-[1_/_2] col-[1_/_2] justify-self-start self-center ${shortcut.backgroundClass} rounded-[22.5px]`}
                >
                  <div className="relative row-[1_/_2] col-[1_/_2] justify-self-center self-center w-[22px] h-[22px]">
                    <img
                      className="absolute w-[78.96%] h-[95.62%] top-[4.38%] left-[21.04%]"
                      alt=""
                      aria-hidden="true"
                      src={shortcut.assets[0]}
                    />
                    <img
                      className="absolute w-[66.46%] h-[95.62%] top-[4.38%] left-[33.54%]"
                      alt=""
                      aria-hidden="true"
                      src={shortcut.assets[1]}
                    />
                  </div>
                </div>
                <div className="relative row-[1_/_2] col-[2_/_3] self-center w-full h-[45px] flex flex-col items-start">
                  <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                    <span className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#213754] text-[13px] tracking-[0] leading-[19.5px] whitespace-nowrap">
                      {shortcut.title}
                    </span>
                  </div>
                  <div className="flex flex-col items-start pt-[9px] pb-0 px-0 relative self-stretch w-full flex-[0_0_auto] mb-[-0.50px]">
                    <div className="flex flex-col h-[16.5px] items-start relative self-stretch w-full">
                      <span className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#8295b0] text-[11px] tracking-[0] leading-[16.5px] whitespace-nowrap">
                        {shortcut.description}
                      </span>
                    </div>
                  </div>
                </div>
                <span
                  aria-hidden="true"
                  className="absolute top-[92px] left-[227px] w-[15px] h-[22px] flex flex-col items-start"
                >
                  <span className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#4b75a6] text-[15px] tracking-[0] leading-[22.5px] whitespace-nowrap">
                    →
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
