# HRIS 인사 관리 시스템 구현 중

피그마로 구현된 와이어프레임을 일일히 코딩하기 힘들다고 판단하여
피그마 플러그인을 사용하여 빠르게 react와 css를 출력했습니다.

교수님이 해당 부분을 질문하시는 경우, 플러그인과 AI를 일정 부분 사용했다고 인정해야 될 것 같습니다....

((데이터연동이 중요한거니 괜찮다고 믿고 싶습니다))

## 프론트엔드 구조

HRIS_4/
│
├── public/
│   └── img/
│       └── 아이콘 및 이미지 파일
│
├── src/
│   │
│   ├── api/
│   │   ├── client.ts 공통 API 요청 처리
│   │   ├── employeeApi.ts 사원 관련 API
│   │   ├── salaryApi.ts 급여 관련 API
│   │   └── evaluationApi.ts 평가 관련 API
│   │
│   ├── components/ 화면 구성 요소
│   │   ├── common/
│   │   │   ├── NavigationSidebarSection/ 네비게이션 바
│   │   │   └── SearchAndActionsSection/ 검색창
│   │   │
│   │   ├── employee/
│   │   ├── salary/
│   │   ├── organization/
│   │   ├── evaluation/
│   │   └── document/
│   │
│   ├── layouts/
│   │   ├── MainLayout.tsx 관리자 화면의 공통 틀
│   │   └── EmployeeLayout.tsx 직원 화면의 공통 틀
│   │
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Employee.tsx
│   │   │   ├── Salary.tsx
│   │   │   ├── Organization.tsx
│   │   │   ├── Evaluation.tsx
│   │   │   └── Document.tsx
│   │   │
│   │   └── employee/
│   │       ├── MyInfo.tsx
│   │       ├── Evaluation.tsx
│   │       └── Document_e.tsx
│   │
│   ├── mocks/ 테스트용 임시 데이터(백엔드 전 사용)
│   │   ├── employee.ts
│   │   ├── salary.ts
│   │   └── evaluation.ts
│   │
│   ├── App.tsx 페이지 연결
│   ├── main.tsx
│   └── index.css
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md



## 관리자/사원 구분
사이드바에서 선택 메뉴를 다르게 배치함으로써 차이 지정
다른 메뉴도 막혀있긴 하나 추후 수정할 예정

--------임시데이터------------

관리자 계정
id : admin
passwd : 12345

사원 계정
id : user
passwd : 12345


## src/api 폴더

각 사이드바 메뉴에 따른 api를 설계했습니다(잘 설계된거지 모르겠네요)

평가관리 부분이랑 문서 결재 부분이 약간 비뚤게 출력됩니다.흠.제가 시간이 된다면 최대한 수정해보겠습니다.

