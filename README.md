# HRIS – 인사관리시스템

**HRIS(Human Resource Information System)**는 기업의 인사 업무를 효율적으로 관리하기 위한 웹 기반 인사관리시스템입니다.

관리자와 일반 직원의 권한을 구분하고, 사원 정보, 급여, 조직, 평가, 문서 등의 기능을 제공합니다.

## 📌 주요 기능

| 구분 | 주요 기능 |
|---|---|
| 대시보드 | 인사 관련 주요 현황 확인 |
| 사원 관리 | 사원 목록 조회 및 상세 정보 관리 |
| 급여 관리 | 급여 정보 및 변경 이력 조회 |
| 조직 관리 | 부서 및 직급 관리 |
| 평가 관리 | 인사 평가 현황 및 평가 대상 관리 |
| 문서 관리 | 인사 관련 문서 관리 |
| 직원 페이지 | 내 정보, 평가, 문서 확인 |

## 🛠️ 기술 스택

- **Frontend:** React, TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **Version Control:** Git, GitHub

## 📁 프로젝트 파일 구조

```text
HRIS_4/
│
├── public/
│   └── img/                    # 이미지 및 아이콘 리소스
│
├── src/
│   │
│   ├── api/                    # 백엔드 API 통신
│   │   ├── client.ts           # 공통 API 요청 처리
│   │   ├── employeeApi.ts      # 사원 관련 API
│   │   ├── salaryApi.ts        # 급여 관련 API
│   │   └── evaluationApi.ts    # 평가 관련 API
│   │
│   ├── components/             # 재사용 가능한 UI 컴포넌트
│   │   ├── common/             # 공통 UI
│   │   ├── employee/           # 사원 관리 컴포넌트
│   │   ├── salary/             # 급여 관리 컴포넌트
│   │   ├── organization/       # 조직 관리 컴포넌트
│   │   ├── evaluation/         # 평가 관리 컴포넌트
│   │   └── document/           # 문서 관리 컴포넌트
│   │
│   ├── layouts/                # 페이지 공통 레이아웃
│   │   ├── MainLayout.tsx      # 관리자 레이아웃
│   │   └── EmployeeLayout.tsx  # 직원 레이아웃
│   │
│   ├── pages/                  # 페이지 단위 화면
│   │   ├── admin/              # 관리자 페이지
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Employee.tsx
│   │   │   ├── Salary.tsx
│   │   │   ├── Organization.tsx
│   │   │   ├── Evaluation.tsx
│   │   │   └── Document.tsx
│   │   │
│   │   └── employee/           # 직원 페이지
│   │       ├── MyInfo.tsx
│   │       ├── Evaluation.tsx
│   │       └── Document_e.tsx
│   │
│   ├── mocks/                  # 테스트용 임시 데이터
│   ├── App.tsx                 # 라우팅 및 페이지 연결
│   ├── main.tsx                # 애플리케이션 진입점
│   └── index.css               # 전역 스타일
│
├── package.json                # 프로젝트 의존성 및 명령어
├── tsconfig.json               # TypeScript 설정
├── vite.config.ts              # Vite 설정
└── README.md                   # 프로젝트 문서
```

## 🗂️ 폴더별 역할

### 1. `pages/`
관리자와 직원이 사용하는 페이지를 구분하여 관리합니다.

### 2. `components/`
페이지 내부에 들어가는 기능별 UI 요소를 컴포넌트 단위로 분리하여 재사용성을 높입니다.

### 3. `layouts/`
각 사용자 유형에 맞는 공통 화면 구조를 제공합니다.

- `MainLayout`: 관리자 화면
- `EmployeeLayout`: 직원 화면

### 4. `api/`
백엔드 서버와 통신하는 기능을 담당합니다. 공통 요청 처리와 기능별 API를 분리하여 관리합니다.

### 5. `mocks/`
백엔드 연동 전 또는 테스트 과정에서 사용할 임시 데이터를 관리합니다.

### 6. `public/`
로고, SVG 아이콘, 이미지 등 정적 리소스를 관리합니다.

## 🔄 애플리케이션 동작 구조

```text
사용자 접속
    │
    ▼
  App.tsx
    │
    ├── 관리자
    │     └── MainLayout
    │            └── Admin Pages
    │
    └── 직원
          └── EmployeeLayout
                 └── Employee Pages

각 페이지
    │
    ▼
Components
    │
    ▼
API Client
    │
    ▼
Backend Server
```

## 🚀 실행 방법

프로젝트를 내려받은 후 터미널에서 다음 명령어를 실행합니다.

```bash
npm install
npm run dev
```

개발 서버가 실행되면 터미널에 표시되는 로컬 주소로 접속합니다.

## 👥 사용자 권한

| 구분 | 접근 기능 |
|---|---|
| 관리자 (ADMIN) | 대시보드, 사원, 급여, 조직, 평가, 문서 관리 |
| 직원 (USER) | 내 정보, 평가, 개인 문서 확인 |

---

**HRIS – Human Resource Information System**  
인사 업무의 효율적인 관리와 사용자별 맞춤형 정보 제공을 위한 웹 프로젝트
