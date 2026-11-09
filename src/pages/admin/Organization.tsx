import { useState, type JSX } from "react";

import { OrganizationSettingsTabsSection } from "../../components/organization/OrganizationSettingsTabsSection";

import { CompanyInformationSection } from "../../components/organization/CompanyInformationSection";

import { ManagementPage } from "../../components/organization/ManagementPage/ManagementPage";

const tabs = [
  "회사 기본정보",
  "부서 관리",
  "직급 관리",
  "직책 관리",
  "직무 관리",
  "조직별 인원조회",
  "조직 정보 삭제",
];

export default function Organization(): JSX.Element {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="space-y-6">
      <OrganizationSettingsTabsSection
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <div
        id="organization-tab-panel"
        role="tabpanel"
        aria-label={tabs[activeTab]}
      >
        {activeTab === 0 && (
          <CompanyInformationSection />
        )}

        {activeTab >= 1 && activeTab <= 4 && (
          <ManagementPage activeTab={activeTab} />
        )}

        {activeTab >= 5 && (
          <section className="flex min-h-64 flex-col items-center justify-center gap-2 rounded-b-xl border border-t-0 border-[#e2e8f0] bg-white p-8 text-center">
            <h2 className="text-base font-semibold text-[#172136]">{tabs[activeTab]}</h2>
            <p className="text-sm text-[#64748b]">해당 기능은 현재 개발 준비 중입니다. 구현이 완료되면 이 화면에서 이용할 수 있습니다.</p>
            <span className="mt-2 rounded-full bg-[#fff7e6] px-3 py-1 text-xs font-medium text-[#a16207]">개발 예정</span>
          </section>
        )}
      </div>
    </div>
  );
}