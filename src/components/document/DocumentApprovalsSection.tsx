import { useMemo, useState, type JSX } from "react";

type ApprovalDocument = {
  id: number;
  title: string;
  author: string;
  date: string;
  badge?: string;
  customBadge?: boolean;
};

const documents: ApprovalDocument[] = [
  {
    id: 1,
    title: "휴가 신청서",
    author: "김민수 (인사팀)",
    date: "2025.06.12",
    badge: "/img/document/docbadge.svg",
  },
  {
    id: 2,
    title: "지출 결의서",
    author: "이서연 (개발팀)",
    date: "2025.06.11",
    badge: "/img/document/docbadge-1.svg",
  },
  {
    id: 3,
    title: "업무 협의 요청서",
    author: "박지훈 (기획팀)",
    date: "2025.06.10",
    badge: "/img/document/docbadge-2.svg",
  },
  {
    id: 4,
    title: "출장 신청서",
    author: "정재원 (영업팀)",
    date: "2025.06.09",
    customBadge: true,
  },
];

const tabs = ["결재하기", "결재 진행 현황", "결재 문서함"];

export const DocumentApprovalsSection = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([]);

  const allSelected = useMemo(
    () =>
      documents.length > 0 &&
      documents.every((document) => selectedDocuments.includes(document.id)),
    [selectedDocuments],
  );

  const toggleDocument = (id: number) => {
    setSelectedDocuments((current) =>
      current.includes(id)
        ? current.filter((documentId) => documentId !== id)
        : [...current, id],
    );
  };

  const toggleAllDocuments = () => {
    setSelectedDocuments(
      allSelected ? [] : documents.map((document) => document.id),
    );
  };

  const showDocumentDetails = (document: ApprovalDocument) => {
    window.alert(`${document.title}\n${document.author}\n${document.date}`);
  };

  return (
    <section
      aria-labelledby="document-approvals-title"
      className="row-[1_/_2] col-[1_/_2] h-full flex-col items-start relative w-full flex"
    >
      <header className="items-end justify-around px-0 py-[30px] self-stretch flex-[0_0_auto] relative w-full flex">
        <div className="flex flex-col w-[296.91px] items-start relative">
          <div className="flex flex-col w-[296.91px] h-[50px] items-start pt-2 pb-0 px-0 relative">
            <h1
              id="document-approvals-title"
              className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#101728] text-[40px] tracking-[-0.98px] leading-[42px] whitespace-nowrap"
            >
              문서 &amp; 결재
            </h1>
          </div>
          <div className="flex flex-col w-[296.91px] h-7 items-start pt-2 pb-0 px-0 relative">
            <p className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#8a95a7] text-[13px] tracking-[0] leading-[19.5px] whitespace-nowrap">
              간단하고 손쉽게 문서를 발급하세요.
            </p>
          </div>
        </div>
      </header>
      <div className="flex flex-col w-[905.12px] h-[709px] items-start relative bg-[#fffffffa] rounded-lg border border-solid border-[#e7edf6]">
        <nav
          aria-label="문서 결재 메뉴"
          className="flex h-[66px] items-start gap-2.5 px-[22px] py-0 relative self-stretch w-full bg-[#0db7d8] rounded-[10px] border-b [border-bottom-style:solid] border-[#e7edf6]"
        >
          {tabs.map((tab, index) => (
            <button
              key={tab}
              type="button"
              aria-current={activeTab === index ? "page" : undefined}
              onClick={() => setActiveTab(index)}
              className="all-unset box-border inline-flex flex-col items-center justify-center px-[22px] py-0 relative self-stretch flex-[0_0_auto]"
            >
              <span
                className={`relative w-fit [font-family:'Noto_Sans_KR',Helvetica] text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap ${
                  activeTab === index
                    ? "font-bold text-white"
                    : "font-normal text-[#060b1e]"
                }`}
              >
                {tab}
              </span>
              {activeTab === index && (
                <span
                  aria-hidden="true"
                  className="absolute top-16 left-[5px] w-[86px] h-0.5 bg-white"
                />
              )}
            </button>
          ))}
        </nav>
        <div className="flex h-[88px] items-center justify-between px-[26px] py-0 relative self-stretch w-full">
          <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
            <h2 className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#172c4a] text-base tracking-[0] leading-6 whitespace-nowrap">
              최근 결재 문서
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className="all-unset relative w-[56.3px] h-[27px] cursor-pointer"
            aria-label="결재 문서 전체보기"
          >
            <span className="absolute top-1 left-px [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#4b96ed] text-xs text-center tracking-[0] leading-[18px] whitespace-nowrap">
              전체보기
            </span>
            <span
              aria-hidden="true"
              className="absolute top-[-3px] left-[51px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#4b96ed] text-lg text-center tracking-[0] leading-[27px] whitespace-nowrap"
            >
              ›
            </span>
          </button>
        </div>
        <div className="flex flex-col items-start px-[25px] py-0 relative self-stretch w-full flex-[0_0_auto]">
          <div
            role="row"
            className="grid grid-cols-[36px_247.39px_170.61px_153.56px_153.56px_92px] grid-rows-[50px] min-h-[50px] h-fit bg-[#f8faff]"
          >
            <div className="relative row-[1_/_2] col-[1_/_2] justify-self-start self-center w-fit h-fit inline-flex flex-col items-start pl-3.5 pr-0 py-0">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAllDocuments}
                aria-label="모든 문서 선택"
                className="relative w-4 h-4 appearance-none bg-white rounded border border-solid border-[#c7d4e5] checked:bg-[#0db7d8] checked:border-[#0db7d8] cursor-pointer"
              />
            </div>
            {["문서 제목", "기안자", "기안일", "결재 상태", "처리"].map(
              (heading, index) => (
                <div
                  key={heading}
                  className={`relative row-[1_/_2] col-[${index + 2}_/${index + 3}] self-center w-full h-[18px] flex flex-col items-start`}
                >
                  <span className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#60799d] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                    {heading}
                  </span>
                </div>
              ),
            )}
          </div>
          {documents.map((document) => (
            <div
              key={document.id}
              role="row"
              className="grid grid-cols-[36px_247.39px_170.61px_153.56px_153.56px_92px] grid-rows-[81px] min-h-[82px] h-fit border-b [border-bottom-style:solid] border-[#edf1f6]"
            >
              <div className="relative row-[1_/_2] col-[1_/_2] justify-self-start self-center">
                <input
                  type="checkbox"
                  onChange={() => toggleDocument(document.id)}
                  aria-label={`${document.title} 선택`}
                  className="relative w-4 h-4 appearance-none bg-white rounded border border-solid border-[#c7d4e5] checked:bg-[#0db7d8] checked:border-[#0db7d8] cursor-pointer"
                />
              </div>
              <div className="relative row-[1_/_2] col-[2_/_3] self-center w-full h-fit flex items-center gap-3.5">
                {document.customBadge ? (
                  <div className="grid grid-cols-[40px] grid-rows-[40px] w-10 h-10 bg-[#f0ebff] rounded-[20px]">
                    <div className="relative row-[1_/_2] col-[1_/_2] justify-self-center self-center w-[22px] h-[22px]">
                      <img
                        className="absolute w-[78.96%] h-[95.63%] top-[4.37%] left-[21.04%]"
                        alt=""
                        src="/img/document/vector.svg"
                      />
                      <img
                        className="absolute w-[66.46%] h-[95.63%] top-[4.37%] left-[33.54%]"
                        alt=""
                        src="/img/document/vector-1.svg"
                      />
                    </div>
                  </div>
                ) : (
                  <img
                    className="grid grid-cols-[40px] grid-rows-[40px] w-10 h-10"
                    alt=""
                    src={document.badge}
                  />
                )}
                <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                  <span className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-medium text-[#263c5a] text-[13px] tracking-[0] leading-[19.5px] whitespace-nowrap">
                    {document.title}
                  </span>
                </div>
              </div>
              <div className="relative row-[1_/_2] col-[3_/_4] self-center w-full h-[18px] flex flex-col items-start">
                <span className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#617a9c] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                  {document.author}
                </span>
              </div>
              <div className="relative row-[1_/_2] col-[4_/_5] self-center w-full h-[18px] flex flex-col items-start">
                <time className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#617a9c] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                  {document.date}
                </time>
              </div>
              <div className="relative row-[1_/_2] col-[5_/_6] self-center w-full h-[30px]">
                <div className="w-[70px] h-[30px] flex bg-[#e8f8f4] rounded-[20px]">
                  <span className="mt-1 w-[47px] h-[18px] ml-[11.6px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#01a77f] text-xs text-center tracking-[0] leading-[18px] whitespace-nowrap">
                    승인 완료
                  </span>
                </div>
              </div>
              <div className="relative row-[1_/_2] col-[6_/_7] self-center w-full h-[27px]">
                <button
                  type="button"
                  onClick={() => showDocumentDetails(document)}
                  className="all-unset absolute top-[5px] left-0 cursor-pointer [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#0db7d8] text-xs tracking-[0] leading-[18px] whitespace-nowrap"
                >
                  상세보기
                </button>
                <span
                  aria-hidden="true"
                  className="absolute top-[-3px] left-[52px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#0db7d8] text-lg tracking-[0] leading-[27px] whitespace-nowrap"
                >
                  ›
                </span>
              </div>
            </div>
          ))}
        </div>
        <nav
          aria-label="문서 페이지"
          className="flex items-start justify-center gap-[11px] pt-[34px] pb-0 px-0 relative self-stretch w-full flex-[0_0_auto]"
        >
          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
            aria-label="이전 페이지"
            className="all-unset box-border grid grid-cols-[27px] grid-rows-[27px] w-[27px] h-[27px] rounded-[5px] disabled:opacity-50"
          >
            <span className="row-[1_/_2] col-[1_/_2] justify-self-center self-center w-1 h-[18px] font-normal text-[#6f89ab] text-xs leading-[18px] relative [font-family:'Noto_Sans_KR',Helvetica] text-center tracking-[0] whitespace-nowrap">
              ‹
            </span>
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              aria-current={currentPage === page ? "page" : undefined}
              className={`all-unset box-border grid grid-cols-[27px] grid-rows-[27px] w-[27px] h-[27px] rounded-[5px] ${
                currentPage === page
                  ? "bg-[#0db7d8] shadow-[0px_4px_10px_#1877f23d]"
                  : ""
              }`}
            >
              <span
                className={`relative row-[1_/_2] col-[1_/_2] justify-self-center self-center h-[18px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-xs text-center tracking-[0] leading-[18px] whitespace-nowrap ${
                  currentPage === page ? "text-white" : "text-[#6f89ab]"
                }`}
              >
                {page}
              </span>
            </button>
          ))}

          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.min(5, page + 1))}
            disabled={currentPage === 5}
            aria-label="다음 페이지"
            className="all-unset box-border grid grid-cols-[27px] grid-rows-[27px] w-[27px] h-[27px] rounded-[5px] disabled:opacity-50"
          >
            <span className="row-[1_/_2] col-[1_/_2] justify-self-center self-center w-1 h-[18px] font-normal text-[#6f89ab] text-xs leading-[18px] relative [font-family:'Noto_Sans_KR',Helvetica] text-center tracking-[0] whitespace-nowrap">
              ›
            </span>
          </button>
        </nav>
      </div>
    </section>
  );
};
