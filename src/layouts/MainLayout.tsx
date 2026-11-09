import { Outlet } from "react-router-dom";
import { NavigationSidebarSection } from "../components/common/NavigationSidebarSection";
import { SearchAndActionsSection } from "../components/common/SearchAndActionsSection";

export default function MainLayout() {
  return (
    <div className="min-h-screen w-full bg-[#f8fafc] lg:flex">
      <aside className="z-30 w-full shrink-0 bg-[#060b1e] lg:fixed lg:inset-y-0 lg:left-0 lg:w-[260px]">
        <NavigationSidebarSection />
      </aside>

      <div className="flex min-h-screen min-w-0 flex-1 flex-col lg:ml-[260px]">
        <div className="sticky top-0 z-20 bg-white">
          <SearchAndActionsSection />
        </div>
        <main className="min-w-0 flex-1 p-4 sm:p-5 xl:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
