import type { JSX } from "react/jsx-runtime";

const organizationTabs = [
  "회사 기본정보",
  "부서 관리",
  "직급 관리",
  "직책 관리",
  "직무 관리",
  "조직별 인원조회",
  "조직 정보 삭제",
] as const;

type Props = {
  activeTab: number;
  onChange: (index: number) => void;
};

export const OrganizationSettingsTabsSection = ({ activeTab, onChange }: Props): JSX.Element => (
  <nav aria-label="조직 설정 메뉴" role="tablist" className="flex min-h-[62px] flex-wrap items-stretch gap-0.5 rounded-t-lg bg-[#15b9dc]">
    {organizationTabs.map((tab, index) => {
      const isActive = activeTab === index;
      return (
        <button key={tab} type="button" role="tab" aria-selected={isActive} aria-controls="organization-tab-panel" tabIndex={isActive ? 0 : -1}
          className={`relative inline-flex min-h-[62px] items-center justify-center px-4 text-[13px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white ${isActive ? "font-bold text-white" : "text-[#060b1e]"}`}
          onClick={() => onChange(index)}>
          {tab}
          {isActive && <span aria-hidden="true" className="absolute bottom-0 left-3 right-3 h-[3px] rounded-sm bg-white" />}
        </button>
      );
    })}
  </nav>
);
