import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";

type CompanyForm = {
  companyName: string;
  businessNumber: string;
  representative: string;
  foundedDate: string;
  address: string;
  phone: string;
  email: string;
  homepage: string;
  industry: string;
};

type CompanyField = {
  key: keyof CompanyForm;
  label: string;
};

const initialCompany: CompanyForm = {
  companyName: "프린세스 주식회사",
  businessNumber: "123-45-67890",
  representative: "김공주",
  foundedDate: "2010-03-15",
  address: "서울특별시 강남구 테헤란로 123 (역삼동)",
  phone: "02-1234-5678",
  email: "info@hris.com",
  homepage: "www.hris.com",
  industry: "IT 서비스업",
};

const companyFields: CompanyField[] = [
  { key: "companyName", label: "회사명" },
  { key: "businessNumber", label: "사업자등록번호" },
  { key: "representative", label: "대표자명" },
  { key: "foundedDate", label: "설립일" },
  { key: "address", label: "회사주소" },
  { key: "phone", label: "연락처" },
  { key: "email", label: "이메일" },
  { key: "homepage", label: "홈페이지" },
  { key: "industry", label: "업종" },
];

const previewFields = [
  {
    label: "대표자명",
    value: (company: CompanyForm) => company.representative,
  },
  {
    label: "설립일",
    value: (company: CompanyForm) => company.foundedDate.replaceAll("-", "."),
  },
  {
    label: "사업자등록번호",
    value: (company: CompanyForm) => company.businessNumber,
  },
  { label: "주소", value: (company: CompanyForm) => company.address },
  { label: "연락처", value: (company: CompanyForm) => company.phone },
  { label: "이메일", value: (company: CompanyForm) => company.email },
  { label: "홈페이지", value: (company: CompanyForm) => company.homepage },
];

export const CompanyInformationSection = (): JSX.Element => {
  const [company, setCompany] = useState<CompanyForm>(initialCompany);
  const [savedCompany, setSavedCompany] = useState<CompanyForm>(initialCompany);
  const [isAddressMessageVisible, setIsAddressMessageVisible] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayCompany = useMemo(() => company, [company]);

  const updateField = (key: keyof CompanyForm, value: string) => {
    setCompany((current) => ({ ...current, [key]: value }));
  };

  const handleChange =
    (key: keyof CompanyForm) => (event: ChangeEvent<HTMLInputElement>) => {
      updateField(key, event.target.value);
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSavedCompany(company);
  };

  const handleCancel = () => {
    setCompany(savedCompany);
  };

  const handleAddressSearch = () => {
    setIsAddressMessageVisible(true);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setIsAddressMessageVisible(false);
    }
  };

  return (
    <div className="grid grid-cols-[970.14px_495.84px] grid-rows-[503px] h-fit gap-[18px] pt-[18px] pb-0 px-0">
      <form
        aria-label="회사 기본정보"
        onSubmit={handleSubmit}
        className="relative row-[1_/_2] col-[1_/_2] w-full min-h-[478px] h-full flex flex-col items-start pt-0 pb-[58px] px-[22px] bg-white rounded-lg border border-solid border-[#e5ebf3]"
      >
        <div className="flex h-[54px] items-center gap-[13px] relative self-stretch w-full border-b [border-bottom-style:solid] border-[#e8edf4]">
          <div className="relative w-6 h-6" aria-hidden="true">
            <img
              className="absolute w-[95.42%] h-[82.92%] top-[17.08%] left-[4.58%]"
              alt=""
              src="/img/vector.svg"
            />
          </div>
          <h2 className="relative w-fit [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#17335a] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
            회사 기본정보
          </h2>
        </div>
        <div className="flex flex-col items-start pt-[9px] pb-0 px-0 relative self-stretch w-full flex-[0_0_auto]">
          {companyFields.map((field) => (
            <div
              key={field.key}
              className={`grid grid-cols-[155px_769.14px] min-h-9 h-fit ${
                field.key === "foundedDate" || field.key === "address" ? "" : ""
              }`}
            >
              <div className="relative row-[1_/_2] col-[1_/_2] self-center w-full h-[18px] flex flex-col items-start pl-2 pr-0 py-0">
                <label
                  htmlFor={`company-${field.key}`}
                  className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#607a9b] text-xs tracking-[0] leading-[18px] whitespace-nowrap"
                >
                  {field.label}
                </label>
              </div>
              <div className="relative row-[1_/_2] col-[2_/_3] self-center w-full h-[30px]">
                {field.key === "foundedDate" && (
                  <div className="relative self-stretch w-full h-[30px]">
                    <input
                      id="company-foundedDate"
                      type="date"
                      value={company.foundedDate}
                      onChange={handleChange("foundedDate")}
                      className="flex flex-col w-[769px] h-[30px] items-start justify-center px-2.5 py-0 absolute top-0 left-0 bg-white rounded overflow-hidden border border-solid border-[#e5ebf3] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#345477] text-xs tracking-[0] leading-[18px]"
                    />
                    <div
                      className="absolute top-[7px] left-[744px] w-4 h-4 pointer-events-none"
                      aria-hidden="true"
                    >
                      <img
                        className="absolute w-[91.25%] h-[82.92%] top-[17.08%] left-[8.75%]"
                        alt=""
                        src="/img/vector-1.svg"
                      />
                      <img
                        className="absolute w-[91.25%] h-[91.25%] top-[8.75%] left-[8.75%]"
                        alt=""
                        src="/img/vector-2.svg"
                      />
                    </div>
                  </div>
                )}

                {field.key === "address" && (
                  <div className="grid grid-cols-[656.14px_105px] grid-rows-[30px] h-fit gap-2">
                    <input
                      id="company-address"
                      type="text"
                      value={company.address}
                      onChange={handleChange("address")}
                      className="relative row-[1_/_2] col-[1_/_2] justify-self-start [align-self:start] w-[656.14px] h-[30px] flex flex-col items-start justify-center px-2.5 py-0 bg-white rounded overflow-hidden border border-solid border-[#e5ebf3] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#345477] text-xs tracking-[0] leading-[18px]"
                    />
                    <button
                      type="button"
                      onClick={handleAddressSearch}
                      className="all-unset box-border row-[1_/_2] col-[2_/_3] w-full h-full flex justify-center gap-1 bg-white rounded-[5px] border-[#dae4ef] relative items-center border border-solid"
                    >
                      <span
                        className="relative w-[15px] h-[15px]"
                        aria-hidden="true"
                      >
                        <img
                          className="absolute w-[87.08%] h-[95.42%] top-[4.58%] left-[12.92%]"
                          alt=""
                          src="/img/vector-3.svg"
                        />
                        <img
                          className="absolute w-[64.17%] h-[72.50%] top-[27.50%] left-[35.83%]"
                          alt=""
                          src="/img/vector-4.svg"
                        />
                      </span>
                      <span className="[font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#527398] text-[11px] text-center tracking-[0] leading-[16.5px] whitespace-nowrap">
                        주소 검색
                      </span>
                    </button>
                  </div>
                )}

                {field.key === "industry" && (
                  <div className="relative w-60 h-[30px] bg-white rounded overflow-hidden border border-solid border-[#e5ebf3]">
                    <select
                      id="company-industry"
                      value={company.industry}
                      onChange={(event) =>
                        updateField("industry", event.target.value)
                      }
                      className="w-full h-full pl-[15px] pr-8 bg-transparent [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#345477] text-xs tracking-[0] leading-[18px]"
                    >
                      <option>IT 서비스업</option>
                      <option>제조업</option>
                      <option>금융업</option>
                      <option>교육 서비스업</option>
                    </select>
                    <div
                      className="absolute top-[9px] right-3 w-2.5 h-1.5 pointer-events-none"
                      aria-hidden="true"
                    >
                      <img
                        className="absolute w-[97.50%] h-[95.83%] top-[4.17%] left-[2.50%]"
                        alt=""
                        src="/img/vector-5.svg"
                      />
                    </div>
                  </div>
                )}

                {field.key !== "foundedDate" &&
                  field.key !== "address" &&
                  field.key !== "industry" && (
                    <input
                      id={`company-${field.key}`}
                      type={field.key === "email" ? "email" : "text"}
                      value={company[field.key]}
                      className="flex flex-col w-[769px] h-[30px] items-start justify-center px-2.5 py-0 relative bg-white rounded overflow-hidden border border-solid border-[#e5ebf3] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#345477] text-xs tracking-[0] leading-[18px]"
                    />
                  )}
              </div>
            </div>
          ))}

          <div className="grid-rows-[56px] grid grid-cols-[155px_769.14px] min-h-9 h-fit">
            <div className="relative row-[1_/_2] col-[1_/_2] self-center w-full h-[18px] flex flex-col items-start pl-2 pr-0 py-0">
              <span className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#607a9b] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                회사 로고
              </span>
            </div>
            <div className="relative row-[1_/_2] col-[2_/_3] self-center w-full h-14 flex items-center gap-3 pt-1 pb-0 px-0">
              <div className="grid grid-cols-[50px] grid-rows-[50px] w-[52px] h-[52px] rounded-[5px] border border-solid border-[#e4ebf3]">
                <div className="row-[1_/_2] col-[1_/_2] justify-self-center self-center w-fit h-fit relative inline-flex items-center gap-3">
                  <div className="relative w-8 h-[34px]">
                    <img
                      className="absolute w-[95.83%] h-[93.14%] top-[6.86%] left-[4.17%]"
                      alt=""
                      src="/img/vector-6.svg"
                    />
                  </div>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="sr-only"
                aria-label="회사 로고 이미지 선택"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="all-unset box-border inline-flex flex-col h-[30px] justify-center px-3 py-0 flex-[0_0_auto] bg-white rounded-[5px] border-[#dae4ef] relative items-center border border-solid"
              >
                <span className="[font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#527398] text-[11px] text-center tracking-[0] leading-[16.5px] whitespace-nowrap">
                  이미지 변경
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="inline-flex items-center gap-2.5 absolute top-[448px] left-[765px]">
          <button
            type="button"
            onClick={handleCancel}
            className="all-unset box-border flex flex-col w-[86px] h-9 justify-center bg-white rounded-md border-[#dbe5f0] relative items-center border border-solid"
          >
            <span className="[font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#607a9d] text-xs text-center tracking-[0] leading-[18px] whitespace-nowrap">
              취소
            </span>
          </button>
          <button
            type="submit"
            className="all-unset box-border flex flex-col w-[86px] h-9 justify-center bg-[#15b9dc] rounded-md shadow-[0px_3px_8px_#2576e838] relative items-center border border-solid"
          >
            <span className="[font-family:'Noto_Sans_KR',Helvetica] font-normal text-white text-xs text-center tracking-[0] leading-[18px] whitespace-nowrap">
              저장
            </span>
          </button>
        </div>
      </form>
      <aside className="relative row-[1_/_2] col-[2_/_3] w-full h-full flex flex-col items-start gap-3.5">
        <div className="flex flex-col min-h-[381px] items-start pt-0 pb-[18px] px-5 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-lg border border-solid border-[#e5ebf3]">
          <div className="flex w-[453.84px] h-[53px] items-center justify-between relative">
            <h2 className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#17335a] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
              회사 정보 미리보기
            </h2>
            <button
              type="button"
              onClick={() =>
                document.getElementById("company-companyName")?.focus()
              }
              className="all-unset box-border inline-flex h-[29px] gap-[5px] px-2.5 py-0 flex-[0_0_auto] bg-white rounded-[5px] border-[#dae4ef] relative items-center border border-solid"
            >
              <span className="relative w-3.5 h-3.5" aria-hidden="true">
                <img
                  className="absolute w-[87.08%] h-[80.83%] top-[19.17%] left-[12.92%]"
                  alt=""
                  src="/img/vector-7.svg"
                />
              </span>
              <span className="[font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#527398] text-[11px] text-center tracking-[0] leading-[16.5px] whitespace-nowrap">
                수정하기
              </span>
            </button>
          </div>
          <div className="flex w-[453.84px] h-20 items-center gap-4 px-[18px] py-0 relative rounded-[7px_7px_0px_0px] border-t [border-top-style:solid] border-r [border-right-style:solid] border-l [border-left-style:solid] border-[#e5ebf3]">
            <div className="flex-[0_0_auto] relative inline-flex items-center gap-3">
              <div className="relative w-[43px] h-[43px]">
                <img
                  className="absolute w-[95.83%] h-[95.83%] top-[4.17%] left-[4.17%]"
                  alt=""
                  src="/img/vector-8.svg"
                />
              </div>
            </div>
            <div className="flex flex-col w-[92.81px] items-start relative">
              <strong className="relative w-fit mt-[-1.00px] mr-[-29.19px] [font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#17335a] text-base tracking-[0] leading-6 whitespace-nowrap">
                {displayCompany.companyName}
              </strong>
              <span className="relative w-fit mt-1 [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#7b90aa] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                Princess Co., Ltd.
              </span>
            </div>
          </div>
          <div className="grid grid-cols-[105px_310.84px] grid-rows-[17.81px_17.81px_17.81px_35.62px_17.81px_17.81px_17.81px] h-fit gap-[11px_0px] pt-3.5 pb-2.5 px-[18px] rounded-[0px_0px_7px_7px] border-r [border-right-style:solid] border-b [border-bottom-style:solid] border-l [border-left-style:solid] border-[#e5ebf3]">
            {previewFields.map((field, index) => (
              <div
                key={field.label}
                className={`relative row-[${index + 1}_/_${
                  index + 2
                }] col-[1_/_2] w-full h-full flex flex-col items-start`}
              >
                <span className="[font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#7287a4] text-[11.5px] tracking-[0] leading-[17.8px] whitespace-nowrap">
                  {field.label}
                </span>
                <span
                  className={`absolute left-[105px] top-0 w-[310px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#365474] text-[11.5px] tracking-[0] leading-[17.8px] ${
                    field.label === "주소" ? "" : "whitespace-nowrap"
                  }`}
                >
                  {field.label === "주소" ? (
                    <>
                      서울특별시 강남구 테헤란로 123
                      <br />
                      (역삼동)
                    </>
                  ) : (
                    field.value(displayCompany)
                  )}
                </span>
              </div>
            ))}
          </div>
          {isAddressMessageVisible && (
            <p
              role="status"
              className="absolute bottom-[-30px] left-5 [font-family:'Noto_Sans_KR',Helvetica] text-[11px] text-[#527398]"
            >
              주소 검색 기능을 실행했습니다.
            </p>
          )}
        </div>
      </aside>
    </div>
  );
};
