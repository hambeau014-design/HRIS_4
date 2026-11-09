
import { Outlet } from "react-router-dom";
import { NavigationSidebarSection } from "../components/common/NavigationSidebarSection";
import { SearchAndActionsSection } from "../components/common/SearchAndActionsSection";

export default function EmployeeLayout() {
  return (
    <div className="flex min-h-screen w-full bg-[#f7f8fa]">
      {/* 왼쪽 사이드바 */}
      <aside className="w-[260px] shrink-0">
        <NavigationSidebarSection />
      </aside>

      {/* 오른쪽 콘텐츠 */}
      <div className="flex min-w-0 flex-1 flex-col">
        <SearchAndActionsSection />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
