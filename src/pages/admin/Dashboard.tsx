import { DashboardWelcomeSection } from
  "../../components/dashboard/DashboardWelcomeSection";

import { WorkforceDashboardSection } from
  "../../components/dashboard/WorkforceDashboardSection";

function Dashboard() {
  return (
    <div>
      <DashboardWelcomeSection />
      <WorkforceDashboardSection />
    </div>
  );
}

export default Dashboard;