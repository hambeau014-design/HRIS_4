import { type FormEvent, useState, type JSX } from "react";
import { authApi } from "../../api/authApi";
import { authLogin } from "../../mocks/authMock"

//백엔드 API 연동 플래그 (true: 임시 테스트 모드, false: 실제 백엔드 API 호출)
const USE_MOCK_DATA = true;

const fields = [
  {
    id: "user-id",
    name: "username",
    label: "아이디",
    placeholder: "아이디 (사원번호)",
    type: "text",
    autoComplete: "username",
  },
  {
    id: "password",
    name: "password",
    label: "비밀번호",
    placeholder: "비밀번호",
    type: "password",
    autoComplete: "current-password",
  },
];

export const Screen = (): JSX.Element => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!formValues.username.trim() || !formValues.password.trim()) {
      setErrorMessage("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      if (USE_MOCK_DATA) {
        // Mock 데이터 환경
        const res = await authLogin({
          username: formValues.username,
          password: formValues.password,
        });

        // 💡 목 로그인 시에도 로컬스토리지에 사원 ID 및 사용자 정보 저장
        if (res?.user) {
          localStorage.setItem("employee_id", String(res.user.id));
          localStorage.setItem("hris_user_info", JSON.stringify(res.user));
        }

        alert(`${res.user.name}님 환영합니다!`);
        window.location.href = "/"; // 메인 페이지 이동
      } else {
        // 실제 API 연동 환경
        const res = await authApi.login({
          username: formValues.username,
          password: formValues.password,
        });
        localStorage.setItem("access_token", res.access_token);
        if (res?.user) {
          localStorage.setItem("employee_id", String(res.user.id));
          localStorage.setItem("hris_user_info", JSON.stringify(res.user));
        }
        window.location.href = "/";
      }
    } catch (error: any) {
      console.error("로그인 실패:", error);
      setErrorMessage(
        error.message || error.response?.data?.message || "로그인 정보가 올바르지 않습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#020618] px-5 py-12">
      {/* 배경 장식 원 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-8 h-[min(80vw,850px)] w-[min(80vw,850px)] rounded-full bg-[#00b8db] opacity-90"
      />

      <form
        className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-md flex-col justify-center gap-5 rounded-3xl bg-[#101b30]/95 p-7 shadow-2xl sm:p-10"
        noValidate
        onSubmit={handleSubmit}
        aria-label="HRIS 로그인"
      >
        {/* HRIS 타이틀을 입력창 위로 이동 */}
        <h1 className="mb-2 flex w-full flex-col items-center">
          <span className="whitespace-nowrap text-5xl font-bold tracking-tight text-white">
            HRIS
          </span>
        </h1>

        {fields.map((field) => (
          <div
            key={field.id}
            className="flex h-14 w-full items-center gap-3 rounded-xl bg-[#314158] px-4 py-3"
          >
            <label className="sr-only" htmlFor={field.id}>
              {field.label}
            </label>
            <input
              id={field.id}
              name={field.name}
              type={field.type}
              value={formValues[field.name as keyof typeof formValues]}
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              onChange={(event) =>
                setFormValues((currentValues) => ({
                  ...currentValues,
                  [field.name]: event.target.value,
                }))
              }
              className="relative min-w-0 flex-1 [font-family:'Noto_Sans_KR-Regular',Helvetica] text-2xl font-normal leading-6 tracking-[0] text-[#90a1b9] placeholder:text-[#90a1b9] focus-visible:ring-2 focus-visible:ring-[#00b8db] focus-visible:ring-offset-2 focus-visible:ring-offset-[#314158] outline-none bg-transparent"
            />
          </div>
        ))}

        {/* 에러 메시지 표시 */}
        {errorMessage && (
          <div className="w-full text-sm text-red-400">
            {errorMessage}
          </div>
        )}

        {/* 로그인 화살표 버튼 */}
        <button
          type="submit"
          disabled={isLoading}
          aria-label="로그인"
          className="flex h-14 w-full items-center justify-center rounded-xl bg-[#00b8db] text-lg font-bold text-[#020618] transition-colors hover:bg-[#00a3c2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-50"
        >
          로그인
        </button>
      </form>
    </main>
  );
};