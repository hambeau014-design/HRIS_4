export type JobMock = {
  job_id: number;
  job_code: string;
  job_name: string;
  job_family: string;
  job_category: string;
  description: string;
  is_active: boolean;
  headcount: number;
};

const STORAGE_KEY = "hris_jobs_mock_v1";

const initialJobs: JobMock[] = [
  {
    job_id: 1,
    job_code: "JOB-DEV-01",
    job_name: "프론트엔드 개발",
    job_family: "개발",
    job_category: "서비스개발",
    description: "웹 기반 사용자 인터페이스를 설계하고 개발합니다.",
    is_active: true,
    headcount: 13,
  },
  {
    job_id: 2,
    job_code: "JOB-DEV-02",
    job_name: "백엔드 개발",
    job_family: "개발",
    job_category: "서비스개발",
    description: "서버와 데이터베이스를 설계하고 개발합니다.",
    is_active: true,
    headcount: 16,
  },
  {
    job_id: 3,
    job_code: "JOB-DES-01",
    job_name: "프로덕트 디자인",
    job_family: "디자인",
    job_category: "UX/UI",
    description: "사용자 경험과 제품 인터페이스를 설계합니다.",
    is_active: true,
    headcount: 7,
  },
  {
    job_id: 4,
    job_code: "JOB-PLAN-01",
    job_name: "서비스 기획",
    job_family: "기획",
    job_category: "서비스전략",
    description: "서비스 전략과 제품 요구사항을 기획합니다.",
    is_active: true,
    headcount: 9,
  },
  {
    job_id: 5,
    job_code: "JOB-HR-01",
    job_name: "HR 매니지먼트",
    job_family: "경영지원",
    job_category: "인사",
    description: "조직과 구성원의 인사 운영을 관리합니다.",
    is_active: true,
    headcount: 6,
  },
];

export const getStoredJobs = (): JobMock[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialJobs));
    return initialJobs;
  }
  try {
    return JSON.parse(data);
  } catch {
    return initialJobs;
  }
};

export const saveStoredJobs = (jobs: JobMock[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
};