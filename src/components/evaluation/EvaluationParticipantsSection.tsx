import { useMemo, useState, useEffect, type JSX } from "react";
import { 
  getStoredParticipants, 
  saveStoredParticipants 
} from "../../mocks/evaluationMock";
import { evaluationApi, type ParticipantItem } from "../../api/evaluationApi";

const USE_MOCK_DATA = true; // 백엔드 연동 시 false로 전환

type StatusFilterType = "전체 상태" | "NOT_STARTED" | "GOAL" | "SELF" | "PEER" | "LEADER" | "COMPLETED";
const statusOptions: StatusFilterType[] = ["전체 상태", "NOT_STARTED", "GOAL", "SELF", "PEER", "LEADER", "COMPLETED"];

export const EvaluationParticipantsSection = (): JSX.Element => {
  const [participants, setParticipants] = useState<ParticipantItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<StatusFilterType>("전체 상태");
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    department_name: "플랫폼 개발",
    status: "NOT_STARTED" as ParticipantItem["status"],
  });

  const fetchData = async () => {
    try {
      if (USE_MOCK_DATA) {
        setParticipants(getStoredParticipants());
      } else {
        const response = await evaluationApi.getParticipants(3, { 
          q: searchTerm, 
          status: selectedStatus === "전체 상태" ? undefined : selectedStatus 
        });
        setParticipants(response.items);
      }
    } catch (error) {
      console.error("평가 대상자 조회 실패:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedStatus]);

  const handleAddParticipant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    const newItem: ParticipantItem = {
      evaluation_id: Date.now(),
      employee_id: Math.floor(Math.random() * 1000),
      name: form.name,
      department_name: form.department_name,
      progress_rate: 0,
      grade: null,
      status: form.status,
    };

    if (USE_MOCK_DATA) {
      const updated = [newItem, ...participants];
      setParticipants(updated);
      saveStoredParticipants(updated);
      alert("평가 대상자가 추가되었습니다.");
      setIsAddModalOpen(false);
      setForm({ name: "", department_name: "플랫폼 개발", status: "NOT_STARTED" });
    }
  };

  const filteredParticipants = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    return participants.filter((item) => {
      const matchesSearch = !normalized || item.name.toLowerCase().includes(normalized) || item.department_name.toLowerCase().includes(normalized);
      const matchesStatus = selectedStatus === "전체 상태" || item.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, selectedStatus, participants]);

  return (
    <section className="pt-4 pb-0 px-0 flex flex-col items-start relative self-stretch w-full">
      <div className="flex flex-col h-fit min-h-[372px] items-start relative self-stretch w-full bg-white rounded-2xl overflow-hidden border border-[#e0e5eb]">
        <header className="flex h-[62px] items-center justify-between px-[22px] py-0 w-full border-b border-[#edf0f4]">
          <div className="inline-flex items-center gap-[9px]">
            <h2 className="text-[#121829] text-sm font-normal">평가 대상자</h2>
            <div className="px-[7px] py-1 bg-[#e9fafd] rounded-[9px]">
              <span className="font-bold text-[#0b8fa8] text-[7px]">총 {participants.length}명</span>
            </div>
          </div>
          
          <div className="inline-flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="px-3 h-[34px] bg-[#15b9dc] text-white rounded-[9px] text-[8px] font-bold cursor-pointer"
            >
              ＋ 대상자 추가
            </button>
            
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="이름 또는 부서 검색"
              className="w-[210px] h-[34px] px-[11px] rounded-[9px] border border-[#e1e6eb] text-[8px] text-[#5d687a] outline-none"
            />
            
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsStatusMenuOpen((prev) => !prev)}
                className="inline-flex h-[34px] items-center px-3 bg-white rounded-[9px] border border-[#e1e6eb] text-[8px] text-[#121829] cursor-pointer"
              >
                {selectedStatus}
              </button>
              {isStatusMenuOpen && (
                <ul className="absolute right-0 top-[38px] z-10 bg-white border border-[#e1e6eb] rounded-[9px] py-1 shadow-lg">
                  {statusOptions.map((status) => (
                    <li key={status}>
                      <button
                        type="button"
                        onClick={() => { setSelectedStatus(status); setIsStatusMenuOpen(false); }}
                        className="w-full text-left px-3 py-1 text-[8px] hover:bg-[#f5f8fa]"
                      >
                        {status}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </header>

        {/* 테이블 목록 */}
        <div className="flex flex-col items-start px-5 py-0 w-full">
          <div className="grid grid-cols-[422px_281px_338px_197px_225px] grid-rows-[35px] w-full border-b border-[#edf0f4] items-center text-[7px] font-bold text-[#9ca6b4]">
            <span>구성원</span><span>소속</span><span>진행률</span><span>평가 등급</span><span>상태</span>
          </div>
          {filteredParticipants.map((item) => (
            <div key={item.evaluation_id} className="grid grid-cols-[422px_281px_338px_197px_225px] grid-rows-[51px] w-full border-b border-[#edf0f4] items-center">
              <div className="flex items-center gap-2.5">
                <div className="grid place-items-center w-[35px] h-[35px] bg-[#e6f2fc] rounded-full border border-white">
                  <span className="text-[#66809d] text-xs">{item.name.charAt(0)}</span>
                </div>
                <span className="font-bold text-[#26364b] text-xs">{item.name}</span>
              </div>
              <span className="text-[8px] text-[#5d687a]">{item.department_name}</span>
              <div className="flex items-center gap-2">
                <div className="w-[75px] h-[5px] bg-[#edf1f4] rounded-[5px] overflow-hidden">
                  <div className="h-[5px] bg-[#0db6ce]" style={{ width: `${item.progress_rate * 100}%` }} />
                </div>
                <span className="font-bold text-[7px] text-[#5d687a]">{Math.round(item.progress_rate * 100)}%</span>
              </div>
              <span className="text-[8px] text-[#a7afba]">{item.grade ?? "-"}</span>
              <div>
                <span className="px-2 py-[5px] rounded-[10px] text-[7px] font-bold bg-[#e4f7fb] text-[#087d98]">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 등록 모달 */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[400px] shadow-xl">
            <h3 className="text-sm font-bold text-[#121829] mb-4">평가 대상자 추가</h3>
            <form onSubmit={handleAddParticipant} className="flex flex-col gap-3">
              <label className="flex flex-col text-[10px] text-[#5d687a]">
                이름 *
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-[31px] px-2 mt-1 rounded border border-[#e1e6eb] text-xs outline-none" placeholder="예: 홍길동" />
              </label>
              <label className="flex flex-col text-[10px] text-[#5d687a]">
                소속 부서
                <input required value={form.department_name} onChange={(e) => setForm({ ...form, department_name: e.target.value })} className="h-[31px] px-2 mt-1 rounded border border-[#e1e6eb] text-xs outline-none" placeholder="예: 플랫폼 개발" />
              </label>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 border border-[#e1e6eb] rounded-lg text-[10px] text-[#5d687a] cursor-pointer">취소</button>
                <button type="submit" className="px-4 py-2 bg-[#15b9dc] text-white rounded-lg text-[10px] font-bold cursor-pointer">저장하기</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};