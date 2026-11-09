
import { DepartmentManagementSection } from "./sections/DepartmentManagementSection/DepartmentManagementSection";
import { DepartmentPageHeaderSection } from "./sections/DepartmentPageHeaderSection/DepartmentPageHeaderSection";

import { JobGradeHeaderSection } from "./sections/JobGradeHeaderSection/JobGradeHeaderSection";
import { JobGradeManagementSection } from "./sections/JobGradeManagementSection/JobGradeManagementSection";

import { JobListHeaderSection } from "./sections/JobListHeaderSection/JobListHeaderSection";
import { JobManagementSection } from "./sections/JobManagementSection/JobManagementSection";

type ManagementPageProps = {
  activeTab: number;
};

export function ManagementPage({ activeTab }: ManagementPageProps) {
  return (
    <div className="space-y-6">
      {activeTab === 1 && (
        <>
          <DepartmentPageHeaderSection />
          <DepartmentManagementSection />
        </>
      )}

      {activeTab === 2 && (
        <>
          <JobGradeHeaderSection />
          <JobGradeManagementSection />
        </>
      )}

      {activeTab === 4 && (
        <>
          <JobListHeaderSection />
          <JobManagementSection />
        </>
      )}
    </div>
  );
}
