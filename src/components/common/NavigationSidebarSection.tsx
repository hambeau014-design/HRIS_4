
import { type FormEvent, type JSX, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

type NavigationItem = {
  label: string;
  employeeLabel?: string;
  path: string;
  employeePath?: string;
  iconClassName: string;
  iconSources: string[];
  roles: string[];
};

const navigationItems: NavigationItem[] = [
  {
    label: "대시보드",
    path: "/dashboard",
    employeePath: "/employee/home",
    iconClassName: "relative w-6 h-6",
    iconSources: ["/img/dashboard/vector-3.svg"],
    roles: ["ADMIN", "USER"],
  },
  {
    label: "인사 관리",
    employeeLabel: "내 정보",
    path: "/employee",
    employeePath: "/employee/profile",
    iconClassName: "relative w-6 h-6",
    iconSources: [
      "/img/dashboard/vector-4.svg",
      "/img/dashboard/vector-5.svg",
      "/img/dashboard/vector-6.svg",
    ],
    roles: ["ADMIN", "USER"],
  },
  {
    label: "급여 관리",
    path: "/salary",
    iconClassName: "relative w-6 h-6",
    iconSources: [
      "/img/dashboard/vector-7.svg",
      "/img/dashboard/vector-8.svg",
    ],
    roles: ["ADMIN"],
  },
  {
    label: "조직 관리",
    path: "/organization",
    iconClassName: "relative w-6 h-6",
    iconSources: [
      "/img/dashboard/vector-9.svg",
      "/img/dashboard/vector-10.svg",
    ],
    roles: ["ADMIN"],
  },
  {
    label: "평가관리",
    path: "/evaluation",
    employeePath: "/employee/evaluation",
    iconClassName: "relative w-[21px] h-[21px]",
    iconSources: [
      "/img/dashboard/vector-11.svg",
      "/img/dashboard/vector-12.svg",
      "/img/dashboard/vector-13.svg",
    ],
    roles: ["ADMIN", "USER"],
  },
  {
    label: "전자 문서",
    path: "/document",
    employeePath: "/employee/documents",
    iconClassName: "relative w-6 h-6",
    iconSources: [
      "/img/dashboard/vector-14.svg",
      "/img/dashboard/vector-15.svg",
    ],
    roles: ["ADMIN", "USER"],
  },
];

const iconPositions: Record<string, string[]> = {
  "/img/dashboard/vector-3.svg": [
    "absolute w-[91.04%] h-[91.04%] top-[8.96%] left-[8.96%]",
    "absolute w-[41.04%] h-[91.04%] top-[8.96%] left-[58.96%]",
    "absolute w-[91.04%] h-[41.04%] top-[58.96%] left-[8.96%]",
    "absolute w-[41.04%] h-[41.04%] top-[58.96%] left-[58.96%]",
  ],
  "/img/dashboard/vector-4.svg": [
    "absolute w-[99.37%] h-[41.04%] top-[58.96%] left-0",
  ],
  "/img/dashboard/vector-5.svg": [
    "absolute w-[84.79%] h-[91.04%] top-[8.96%] left-[15.21%]",
  ],
  "/img/dashboard/vector-6.svg": [
    "absolute w-[32.71%] h-[91.04%] top-[8.96%] left-[67.29%]",
  ],
  "/img/dashboard/vector-7.svg": [
    "absolute w-[99.37%] h-[91.04%] top-[8.96%] left-0",
  ],
  "/img/dashboard/vector-8.svg": [
    "absolute w-[49.37%] h-[57.71%] top-[42.29%] left-[50.63%]",
  ],
  "/img/dashboard/vector-9.svg": [
    "absolute w-[86.87%] h-[95.21%] top-[4.79%] left-[13.13%]",
  ],
  "/img/dashboard/vector-10.svg": [
    "absolute w-[95.21%] h-[20.21%] top-[79.79%] left-[4.79%]",
  ],
  "/img/dashboard/vector-11.svg": [
    "absolute w-[74.58%] h-[91.25%] top-[8.75%] left-[25.42%]",
  ],
  "/img/dashboard/vector-12.svg": [
    "absolute w-[72.50%] h-[53.33%] top-[46.67%] left-[27.50%]",
  ],
  "/img/dashboard/vector-13.svg": [
    "absolute w-[60.42%] h-[75.83%] top-[24.17%] left-[39.58%]",
  ],
  "/img/dashboard/vector-14.svg": [
    "absolute w-[78.54%] h-[95.21%] top-[4.79%] left-[21.46%]",
  ],
  "/img/dashboard/vector-15.svg": [
    "absolute w-[66.04%] h-[95.21%] top-[4.79%] left-[33.96%]",
  ],
};

const renderIcon = (item: NavigationItem) => {
  return (
    <div className={item.iconClassName} aria-hidden="true">
      {item.iconSources.map((source, index) => {
        const positions = iconPositions[source];

        if (!positions) {
          console.warn("등록되지 않은 아이콘 경로:", source);
          return null;
        }

        const positionClass =
          source === "/img/dashboard/vector-3.svg"
            ? positions[index] ?? positions[0]
            : positions[0];

        return (
          <img
            key={`${source}-${index}`}
            className={positionClass}
            src={source}
            alt=""
          />
        );
      })}
    </div>
  );
};

export const NavigationSidebarSection = (): JSX.Element => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // 로그인한 사용자의 권한 확인
  const userRole = localStorage.getItem("user_role") || "USER";

  // 권한에 따른 메뉴 필터링
  const filteredNavigationItems = navigationItems.filter((item) =>
    item.roles.includes(userRole)
  );

  // AI 질문 입력 처리
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
  };

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem("hris_access_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("hris_user_info");
    localStorage.removeItem("user_role");

    navigate("/login", { replace: true });
  };

  return (
    <aside
      className="flex w-full flex-col items-start gap-4 px-4 py-5 bg-[#060b1e] lg:h-screen lg:overflow-y-auto lg:px-4 lg:py-6"
      aria-label="주요 메뉴"
    >
      {/* 로고 */}
      <header className="flex w-full items-center gap-3 px-2">
        <div
          className="relative w-[55px] h-[55px] bg-[#15b9dc] rounded-[18px] shadow-[0px_10px_28px_#15b9dc47]"
          aria-hidden="true"
        />

        <div className="flex flex-col w-[108.86px] items-start relative">
          <div className="font-bold text-white text-[25px] leading-[37.5px]">
            HRIS
          </div>

          <div className="text-[#6e7b94] text-sm leading-[21px]">
            People &amp; Culture
          </div>
        </div>
      </header>

      {/* 메뉴 제목 */}
      <div className="flex w-full items-start px-3 pt-3">
        <div className="font-bold text-[#56647d] text-[13px] tracking-[1.69px]">
          WORKSPACE
        </div>
      </div>

      {/* 메뉴 */}
      <nav
        className="flex w-full flex-col gap-1.5"
        aria-label="워크스페이스"
      >
        {filteredNavigationItems.map((item) => {
          // 관리자와 사원의 이동 경로 구분
          const targetPath =
            userRole === "USER"
              ? item.employeePath || "/employee/home"
              : item.path;

          // 사원 계정에서는 메뉴 이름 변경
          const menuLabel =
            userRole === "USER"
              ? item.employeeLabel || item.label
              : item.label;

          return (
            <NavLink
              key={item.label}
              to={targetPath}
              end
              className={({ isActive }) =>
                `flex min-h-12 w-full items-center gap-3 rounded-xl px-3 py-2 transition-colors ${
                  isActive
                    ? "bg-[#15b9dc] text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              {renderIcon(item)}

              <span className="inline-flex min-w-0 flex-col items-start text-sm font-medium leading-5 whitespace-nowrap text-inherit">
                {menuLabel}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* 구분선 */}
      <div className="flex w-full flex-col items-start py-2">
        <div className="relative self-stretch w-full h-px bg-[#20283a]" />
      </div>

      {/* HR AI 영역 */}
      <section
        className="flex w-full flex-col items-start p-3 rounded-[14px] border border-solid border-[#202a40] [background:radial-gradient(50%_50%_at_37%_71%,rgba(17,199,221,0.12)_0%,rgba(17,199,221,0)_45%),linear-gradient(0deg,rgba(17,24,43,1)_0%,rgba(17,24,43,1)_100%)]"
        aria-label="HR AI 상담"
      >
        <div className="flex items-center gap-2.5 relative self-stretch w-full">
          <div className="grid grid-cols-[32px] grid-rows-[32px] w-8 h-8 rounded-[10px] shadow-[0px_7px_16px_#0bbed52e] bg-[linear-gradient(126deg,rgba(25,209,223,1)_0%,rgba(8,169,199,1)_100%)]">
            <div className="relative row-[1_/_2] col-[1_/_2] justify-self-center self-center w-4 h-4">
              <img
                className="absolute w-[78.75%] h-[91.25%] top-[8.75%] left-[21.25%]"
                src="/img/dashboard/vector-16.svg"
                alt=""
              />
              <img
                className="absolute w-[95.42%] h-[37.08%] top-[62.92%] left-[4.58%]"
                src="/img/dashboard/vector-17.svg"
                alt=""
              />
            </div>
          </div>

          <div className="flex flex-col gap-[3px]">
            <div className="font-bold text-[#f2f6fb] text-sm">
              HR AI
            </div>

            <div className="flex items-center gap-[5px]">
              <div className="w-[5px] h-[5px] bg-[#1bd49a] rounded-full" />
              <div className="text-[#6e7a91] text-[11px]">
                AI 연결 상태 확인 필요
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start pl-1.5 pt-[11px] relative self-stretch w-full">
          <div className="flex flex-col min-h-[39px] items-start px-2.5 py-[9px] relative self-stretch w-full bg-[#1b2439] rounded-[4px_11px_11px_11px]">
            <div className="text-[#aeb8ca] text-xs">
              AI 응답 기능은 서버 API 연결 후 사용할 수 있습니다.
            </div>
          </div>
        </div>

        <form
          className="flex flex-col items-start pt-[9px] relative self-stretch w-full"
          onSubmit={handleSubmit}
        >
          <div className="flex h-10 items-center pl-[11px] pr-1 relative self-stretch w-full bg-[#0b1122] rounded-[9px] border border-solid border-[#29334a]">
            <label htmlFor="hr-ai-question" className="sr-only">
              HR AI에게 질문하기
            </label>

            <input
              id="hr-ai-question"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="flex-1 min-w-0 h-9 bg-transparent text-[#aeb8ca] text-xs outline-none"
              placeholder="AI API 연결 대기 중"
              disabled
              type="text"
              autoComplete="off"
            />

            <button
              type="submit"
              aria-label="질문 보내기"
              disabled
              className="grid grid-cols-[27px] grid-rows-[27px] w-[27px] h-[27px] bg-[#526174] rounded-[7px] cursor-not-allowed"
            >
              <span className="relative row-[1_/_2] col-[1_/_2] justify-self-center self-center w-[15px] h-[15px]">
                <img
                  className="absolute w-[82.92%] h-[74.58%] top-[25.42%] left-[17.08%]"
                  src="/img/dashboard/vector-18.svg"
                  alt=""
                />
              </span>
            </button>
          </div>
        </form>
      </section>

      {/* 로그인 사용자 정보 */}
      <div className="mt-auto flex w-full flex-col items-start justify-end">
        <button
          type="button"
          className="inline-flex min-h-[68px] w-full items-center rounded-xl border border-[#202a40] bg-[#11192d] p-3 text-left"
          aria-label="사용자 프로필"
        >
          <div className="grid grid-cols-[54px] grid-rows-[54px] w-[54px] h-[54px] bg-[#34445f] rounded-[14px]">
            <div className="relative row-[1_/_2] col-[1_/_2] justify-self-center self-center font-bold text-white text-[17px]">
              {userRole === "ADMIN" ? "AD" : "US"}
            </div>
          </div>

          <div className="flex items-start pl-4">
            <div className="flex flex-col gap-[3px]">
              <div className="font-bold text-white text-base">
                {userRole === "ADMIN" ? "HR 관리자" : "일반 사원"}
              </div>

              <div className="text-[#74829a] text-sm">
                {userRole === "ADMIN" ? "관리자 계정" : "사원 계정"}
              </div>
            </div>
          </div>

          <div className="relative w-[18px] h-[18px] ml-auto">
            <img
              className="absolute w-[66.04%] h-[78.54%] top-[21.46%] left-[33.96%]"
              src="/img/dashboard/vector-19.svg"
              alt=""
            />
          </div>
        </button>

        {/* 로그아웃 */}
        <button
          type="button"
          onClick={handleLogout}
          className="mt-2 flex min-h-11 w-full items-center gap-3 rounded-xl px-4 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <span aria-hidden="true">↪</span>
          로그아웃
        </button>
      </div>
    </aside>
  );
};
