import { useState, useEffect, type JSX } from "react";
import type { Employee } from "./EmployeeDirectorySection";
import { updateEmployee, deleteEmployee } from "../../api/employeeApi";

type Detail = {
  label: string;
  key: keyof EditFormState;
  value: string;
};

type EditFormState = {
  phone: string;
  email: string;
  department: string;
  position: string;
  joinedAt: string;
  education: string;
  address: string;
};

type HistoryItem = {
  date: string;
  title: string;
  description: string;
  active?: boolean;
};

const history: HistoryItem[] = [
  {
    date: "2024.03.01",
    title: "직급 변경 (사원 → 대리)",
    description: "인사팀",
    active: true,
  },
  {
    date: "2022.07.01",
    title: "부서 이동 (개발팀 → 인사팀)",
    description: "인사팀",
  },
  {
    date: "2021.03.15",
    title: "입사",
    description: "신입사원",
  },
];

type EmployeeDetailsSectionProps = {
  employee: Employee | null;
  onEmployeeUpdated?: () => void;
};

export const EmployeeDetailsSection = ({
  employee,
  onEmployeeUpdated,
}: EmployeeDetailsSectionProps): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  // 수정용 입력 폼 상태 관리
  const [editForm, setEditForm] = useState<EditFormState>({
    phone: "",
    email: "",
    department: "",
    position: "",
    joinedAt: "",
    education: "",
    address: "",
  });

  useEffect(() => {
    setIsEditing(false);
    setIsDeleted(false);
    setNotice("");
    if (employee) {
      setEditForm({
        phone: "010-1234-5678",
        email: "minsu@hris.com",
        department: employee.department || "",
        position: employee.position || "",
        joinedAt: employee.joinedAt || "",
        education: "○○대학교 경영학과 (2015.02)",
        address: "서울특별시 강남구 테헤란로 123",
      });
    }
  }, [employee]);

  const detailsList: Detail[] = employee
    ? [
        { label: "연락처", key: "phone", value: editForm.phone },
        { label: "이메일", key: "email", value: editForm.email },
        { label: "부서", key: "department", value: editForm.department },
        { label: "직급", key: "position", value: editForm.position },
        { label: "입사일", key: "joinedAt", value: editForm.joinedAt },
        { label: "최종 학력", key: "education", value: editForm.education },
        { label: "주소", key: "address", value: editForm.address },
      ]
    : [];

  // EMP-04: 사원 정보 수정 API 연동 (PATCH /api/v1/employees/{employee_id})
  const handleSaveEdit = async (): Promise<void> => {
    if (!employee) return;
    try {
      setLoading(true);
      await updateEmployee(employee.id, {
        department: editForm.department,
        position: editForm.position,
        phone: editForm.phone,
        email: editForm.email,
        address: editForm.address,
      });
      setIsEditing(false);
      setNotice("사원 정보가 성공적으로 수정되었습니다.");
      if (onEmployeeUpdated) onEmployeeUpdated();
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "정보 수정에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // EMP-08: 오등록 사원 삭제 API 연동 (DELETE /api/v1/employees/{employee_id})
  const handleDelete = async (): Promise<void> => {
    if (!employee) return;
    
    if (window.confirm(`${employee.name}을 삭제하시겠습니까?`)) {
      try {
        setLoading(true);
        await deleteEmployee(employee.id);
        setIsDeleted(true);
        setNotice("직원 정보가 삭제되었습니다.");
        if (onEmployeeUpdated) onEmployeeUpdated();
      } catch (err) {
        setNotice(err instanceof Error ? err.message : "삭제 처리에 실패했습니다.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleTransfer = (): void => {
    setNotice("인사발령(퇴사) 모달 기능을 준비 중입니다.");
  };

  const handleMore = (): void => {
    setNotice("추가 메뉴를 선택해주세요.");
  };

  const handleInputChange = (key: keyof EditFormState, value: string) => {
    setEditForm((prev) => ({ ...prev, [key]: value }));
  };

  if (!employee) {
    return (
      <section className="relative w-full h-[864px] flex items-center justify-center bg-white rounded-[15px] border border-solid border-[#e4e9f0]">
        <p className="text-sm text-[#8091a7]">
          직원을 선택하면 상세 정보가 표시됩니다.
        </p>
      </section>
    );
  }

  if (isDeleted) {
    return (
      <section
        aria-live="polite"
        className="relative w-full h-[864px] flex flex-col items-center justify-center bg-white rounded-[15px] overflow-hidden border border-solid border-[#e4e9f0] shadow-[0px_10px_30px_#2239560b]"
      >
        <p className="[font-family:'Noto_Sans_KR',Helvetica] text-sm text-[#50667f]">
          {notice}
        </p>
      </section>
    );
  }

  return (
    <section className="relative w-full h-[864px] flex flex-col items-start bg-white rounded-[15px] overflow-hidden border border-solid border-[#e4e9f0] shadow-[0px_10px_30px_#2239560b]">
      <header className="flex flex-col items-start pt-[31px] pb-[21px] px-[23px] relative self-stretch w-full flex-[0_0_auto] border-b border-solid border-[#e9edf2]">
        <div className="flex items-center gap-[17px] relative self-stretch w-full flex-[0_0_auto]">
          <div
            aria-label="온라인 상태"
            className="relative grid grid-cols-[68px] grid-rows-[68px] w-[68px] h-[68px] bg-[#e7f3fe] rounded-[34px] shadow-[inset_0px_0px_0px_4px_#eff7ff]"
          >
            <div className="relative row-[1_/_2] col-[1_/_2] justify-self-center self-center w-[22px] h-[35px] [font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#4071ac] text-[23px] tracking-[0] leading-[34.5px] whitespace-nowrap">
              {employee.initial || employee.name[0]}
            </div>
            <span className="absolute top-[54px] left-[57px] w-[9px] h-[9px] bg-[#21c887] rounded-[4.5px] border-2 border-solid border-white" />
          </div>
          <div className="flex flex-col w-[137.03px] items-start relative">
            <div className="relative self-stretch w-full h-[31.5px]">
              <h1 className="absolute top-[-3px] left-0 [font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#172136] text-[21px] tracking-[0] leading-[31.5px] whitespace-nowrap">
                {employee.name}
              </h1>
              <span className="absolute top-1.5 left-[72px] w-10 h-[25px] flex items-center justify-center bg-[#dcf8eb] rounded-[10px]">
                <span className="[font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#13a970] text-[10px] tracking-[0] leading-[15px] whitespace-nowrap">
                  {employee.status || "재직"}
                </span>
              </span>
            </div>
            <div className="pt-2 pb-0 px-0 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative self-stretch w-full h-[15px]">
                <span className="absolute -top-0.5 left-0 [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#8392a6] text-[10px] tracking-[0.20px] leading-[15px] whitespace-nowrap">
                  {employee.employeeNo || employee.id}
                </span>
                <span className="absolute top-1 left-[51px] w-px h-2.5 bg-[#d9dfe7]" />
                <span className="absolute -top-0.5 left-[62px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#8392a6] text-[10px] tracking-[0.20px] leading-[15px] whitespace-nowrap">
                  {employee.department}
                </span>
                <span className="absolute top-1 left-[105px] w-px h-2.5 bg-[#d9dfe7]" />
                <span className="absolute -top-0.5 left-[116px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#8392a6] text-[10px] tracking-[0.20px] leading-[15px] whitespace-nowrap">
                  {employee.position}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 상단 액션 버튼 그룹 */}
        <div className="pt-4 pb-0 px-0 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
          <div className="grid grid-cols-[176.03px_149.95px_48px] grid-rows-[46px] h-fit gap-2">
            {isEditing ? (
              <button
                type="button"
                disabled={loading}
                onClick={handleSaveEdit}
                className="all-unset box-border relative row-[1_/_2] col-[1_/_2] w-full h-[46px] flex items-center justify-center gap-[9px] bg-[#10b981] rounded-lg border border-solid border-[#059669] cursor-pointer text-white font-bold text-xs"
              >
                {loading ? "저장 중..." : "저장 완료"}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="all-unset box-border relative row-[1_/_2] col-[1_/_2] w-full h-[46px] flex items-center justify-center gap-[9px] bg-[#0db7d8] rounded-lg border border-solid border-[#1976ed] cursor-pointer"
              >
                <span className="[font-family:'Noto_Sans_KR',Helvetica] font-bold text-white text-xs">
                  정보 수정
                </span>
              </button>
            )}

            <button
              type="button"
              onClick={handleTransfer}
              className="all-unset box-border relative row-[1_/_2] col-[2_/_3] w-full h-[46px] flex items-center justify-center gap-[9px] rounded-lg border border-solid border-[#dce3ec] cursor-pointer"
            >
              <span className="[font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#26364a] text-xs">
                인사발령
              </span>
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={handleDelete}
              aria-label="직원 삭제"
              className="all-unset box-border relative row-[1_/_2] col-[3_/_4] w-full h-[46px] flex items-center justify-center gap-[9px] rounded-lg border border-solid border-[#ffd5dc] cursor-pointer bg-[#fff5f5]"
            >
              <span className="text-red-500 font-bold text-xs">삭제</span>
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleMore}
          className="absolute top-5 right-6 [font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#8093a9] text-base cursor-pointer"
        >
          •••
        </button>
      </header>

      {/* 상세 정보 폼 영역 */}
      <section className="flex flex-col items-start pt-[21px] pb-[18px] px-[23px] relative self-stretch w-full flex-[0_0_auto] border-b border-solid border-[#e9edf2]">
        <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
          <h2 className="[font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#202b3e] text-[15px]">
            상세 정보
          </h2>
        </div>
        <div className="flex flex-col items-start pt-[18px] pb-0 px-0 relative self-stretch w-full flex-[0_0_auto]">
          <dl className="grid grid-cols-[82px_308px] h-fit gap-[10px_0px]">
            {detailsList.map((detail) => (
              <div key={detail.label} className="contents">
                <dt className="relative w-full h-full flex items-center [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#8998aa] text-[11px]">
                  {detail.label}
                </dt>
                <dd className="relative w-full h-full flex items-center text-[#465a72] text-[11px] [font-family:'Noto_Sans_KR',Helvetica]">
                  {isEditing ? (
                    <input
                      type="text"
                      aria-label={detail.label}
                      value={detail.value}
                      onChange={(e) => handleInputChange(detail.key, e.target.value)}
                      className="w-full text-[#465a72] text-[11px] border-b border-[#0db7d8] outline-none px-1 py-0.5 bg-[#f0fdfa]"
                    />
                  ) : (
                    detail.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 최근 인사 이력 영역 */}
      <section className="flex flex-col items-start px-[23px] py-5 relative self-stretch w-full flex-[0_0_auto]">
        <h2 className="[font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#202b3e] text-[15px] mb-3">
          최근 인사 이력
        </h2>
        <div className="relative self-stretch w-full h-48">
          {history.map((item) => (
            <div
              key={`${item.date}-${item.title}`}
              className="flex items-start gap-4 mb-3"
            >
              <span className="text-xs text-[#8091a7] w-20">{item.date}</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#405268]">
                  {item.title}
                </span>
                <span className="text-[10px] text-[#8190a4]">
                  {item.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {notice && (
        <p
          aria-live="polite"
          className="absolute bottom-3 left-6 [font-family:'Noto_Sans_KR',Helvetica] text-xs font-medium text-[#0db7d8]"
        >
          {notice}
        </p>
      )}
    </section>
  );
};