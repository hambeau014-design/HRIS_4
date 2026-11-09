import { useState } from "react";

const organizationTabs = [
  "회사 기본정보",
  "부서 관리",
  "직급 관리",
  "직책 관리",
  "직무 관리",
  "조직별 인원조회",
  "조직 정보 삭제",
] as const;

export const OrganizationSettingsTabsSection = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <nav
      aria-label="조직 설정 메뉴"
      className="flex h-[62px] items-start gap-0.5 relative self-stretch w-full bg-[#15b9dc]"
    >
      {organizationTabs.map((tab, index) => {
        const isActive = activeTab === index;

        return (
          <button
            key={tab}
            aria-selected={isActive}
            className="inline-flex flex-col items-center justify-center px-[17px] py-0 relative self-stretch flex-[0_0_auto] focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
            onClick={() => setActiveTab(index)}
            role="tab"
            tabIndex={isActive ? 0 : -1}
            type="button"
          >
            <span
              className={`relative w-fit [font-family:'Noto_Sans_KR',Helvetica] text-[13px] text-center tracking-[0] leading-[19.5px] whitespace-nowrap ${
                isActive ? "font-bold text-white" : "font-normal text-[#060b1e]"
              }`}
            >
              {tab}
            </span>
            {isActive && (
              <span
                aria-hidden="true"
                className="absolute top-[58px] left-[5px] w-[99px] h-[3px] bg-white rounded-sm"
              />
            )}
          </button>
        );
      })}
    </nav>
  );
};
