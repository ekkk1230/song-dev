export const profile = {
    name: '송은경',
    nameEn: 'Song Eunkyung',
    role: '웹 퍼블리셔',
    roleLine: ['WEB', 'PUBLISHER'],
    tagline: '웹 표준과 웹 접근성을 준수한 UI를 구현하는 3년 차 퍼블리셔.\n 정교한 마크업에 개발의 깊이를 더합니다.',
    location: 'Anyang, KR',
    status: '리드포인트시스템 · 대리',
    email: 'ek10314@naver.com',
    socials: [
        { label: 'GitHub', href: 'https://github.com/ekkk1230' },
        { label: 'Email', href: 'mailto:eunkyung.song@example.com' },
    ]
};

export const about = {
    intro: 'HTML/CSS 기반의 마크업과 스타일링을 바탕으로 웹 표준과 웹 접근성을 준수한 UI를 구현합니다. 사내 단독 퍼블리셔로 다양한 이해관계자 (기획자, 디자이너, 백엔드)와 원활한 협업을 통해 프로젝트 효율을 높였습니다.',
    detail: ['디자인 의도를 픽셀 단위로 구현하는 퍼블리싱 전문성을 바탕으로, 로직 구현과 데이터 연동까지 기술적 영역을', '꾸준히 확장하고 있습니다. 현재 Java/Spring을 학습하며 백엔드 협업 이해도를 넓히고 있습니다.'],
    stats: [
        { value: '3+', label: '경력 (년)' },
        { value: '23', label: '참여 프로젝트' },
        { value: '13', label: '접근성 준수 프로젝트' },
        { value: '3', label: '개인 프로젝트' },
    ]
};

export type Project = {
  id: string
  title: string
  index: string
  category: string
  description: string
  highlights: string[]
  stack: string[]
  variant: 'dashboard' | 'accessibility' | 'dataviz'
};

export const projects: Project[] = [
  {
    id: 'public-dashboard',
    title: '웹 인터페이스 시스템 설계 및 컴포넌트 최적화',
    index: '01',
    category: 'Dashboard · UI Publishing',
    description: '실무 환경의 효율적인 시스템 구축 경험과 개인 프로젝트를 통한 최신 프론트엔드 기술 역량을 결합하여 확장 가능한 UI를 개발합니다.',
    highlights: [
      '반복되는 UI를 컴포넌트 단위로 모듈화하여 개발 생산성 극대화',
      'Styled-components와 Tailwind CSS를 결합해 확장성 높은 디자인 시스템을 구축하고 코드 중복을 최소화하여 유지보수성 향상',
      '외부 공공 데이터 연동 로직을 구현하여 서비스 확장성 경험',
      'React/JS 기반 데이터 동적 상태 관리 및 인터랙티브 UI 구현',
    ],
    stack: ['React', 'Next.js', 'Tailwind CSS', 'Thymeleaf', 'TypeScript'],
    variant: 'dashboard',
  },
  {
    id: 'accessibility-cert',
    title: '웹 접근성 인증 & 사이트 유지보수',
    index: '02',
    category: 'Accessibility · WCAG',
    description:
      '전문 검수 기관의 요구사항을 반영해 다수의 공공기관 사이트 인증을 완료하고, 레거시 환경을 안정적으로 유지보수했습니다.',
    highlights: [
      '포커스 트랩, ARIA 속성 최적화 등 WCAG 가이드라인을 준수하는 스크린리더 친화적 마크업 설계',
      '대규모 공공 사이트 프로젝트의 신규/재인증(총 15회+) 과정에서 검수 피드백을 실시간 반영하며 품질 관리',
      'jQuery 기반의 레거시 시스템 구조를 정밀 분석하여 코드의 안정성을 높이고 운영 효율을 개선하는 유지보수 수행',
    ],
    stack: ['JavaScript', 'jQuery', 'ARIA', 'SCSS', 'JSP', 'Thymeleaf'],
    variant: 'accessibility',
  },
  {
    id: 'data-viz',
    title: '데이터 시각화 & 인터랙티브 UI',
    index: '03',
    category: 'Data Visualization · Motion',
    description:
      '복잡한 데이터를 직관적으로 표현하는 커스텀 차트와 동작에 반응하는 애니메이션 UX를 개발했습니다.',
    highlights: [
      'Chart.js · ECharts로 복잡한 데이터를 직관적으로 표현하는 커스텀 차트 개발',
      '데이터 필터링/리사이즈 이벤트에 대응하는 상태 관리 로직을 구현하여 동적인 반응형 인터페이스 구축',
      'GSAP을 활용한 고도화된 모션 UX 구현으로 사용자의 인터랙션 경험을 개선하고 서비스의 생동감 확보',
      'AI 페어 프로그래밍으로 복잡한 데이터 바인딩 및 인터랙션 로직의 구현 효율성 증대',
    ],
    stack: ['Chart.js', 'ECharts', 'GSAP'],
    variant: 'dataviz',
  },
];

export const experience = {
  company: '리드포인트시스템',
  role: '웹 퍼블리셔 (대리)',
  period: '2022.09 ~ 현재',
  points: [
    '회사 내 단독 퍼블리셔로 전 프로젝트 참여 및 퍼블리싱 완수',
    '웹 접근성 총 15회 — 신규 8건 + 기존 서비스 재인증 7회',
    'React(Styled-components) 기반 컴포넌트 단위 UI 작업',
    'React(Styled-components) 기반 컴포넌트 단위 UI 작업',
    '대시보드·웹사이트·앱(웹뷰/하이브리드) UI 퍼블리싱',
    '인터랙션·시각화: GSAP, Chart.js / ECharts 활용',
  ]
};

export type WorkItem = {
  name: string
  description: string
  stack: string[]
  preivew?: string
};


export const projectGroups: {
  personal: { label: string; sub: string; items: WorkItem[] }
  company: { label: string; sub: string; items: WorkItem[] }
} = {
  company: {
    label: '회사 프로젝트',
    sub: '리드포인트시스템 · 퍼블리셔',
    items: [
      {
        name: '국민의힘 온라인 공천 시스템',
        description: '사용자 & 관리자 페이지 신규 구축을 하며 공통 팝업 레이아웃을 컴포넌트화 하여 재사용 할 수 있도록 설계',
        stack: ['JavaScript', 'Thymeleaf'],
      },
      {
        name: '공공기관 웹 접근성 품질 인증 프로젝트 (15건+)',
        description: '서울시복지재단 포함 산하 10개 웹 프로젝트 웹 접근성 인증을 주도하며 코드 규격화로 유지보수성 30% 향상',
        stack: ['jQuery', 'JSP'],
      },{
        name: '기업용 서비스 플랫폼 리뉴얼',
        description: '기존 시스템의 기술 부채 해결을 위한 고도화 작업 및 UI/UX 리뉴얼 참여',
        stack: ['JavaScript', 'GSAP'],
      },
    ],
  },
  personal: {
    label: '개인 프로젝트',
    sub: '기획 · 디자인 · 개발',
    items: [
      {
        name: '인터랙티브 포트폴리오',
        description: 'Next.js와 GSAP을 활용해 스크롤 인터랙션과 반응형 레이아웃을 직접 설계·구현한 개인 포트폴리오 사이트',
        stack: ['Next.js', 'TypeScript', 'GSAP'],
      },
      {
        name: 'NuriAI',
        description: 'TypeScript 기반으로 AI API를 이용해 교육계획안을 생성하는 프로젝트',
        stack: ['TypeScript', 'Next.js'],
      },
      {
        name: 'Trip-Diary',
        description: '공공 데이터 API 연동하여 데이터를 기반으로 사용자의 여행 경로 지도를 생성',
        stack: ['TypeScript', 'React.js'],
      },
    ],
  },
}

export const education = [
  {
    title: '반응형 웹 & 프론트엔드 개발 실무 양성',
    org: '국비 교육 과정',
    period: '2022.03 ~ 2022.09',
  },
]

export const skills = [
  {
    group: 'Frontend & UI',
    items: ['HTML5', 'CSS3 / SCSS', 'JavaScript', 'jQuery', 'GSAP'],
  },
  {
    group: 'Framework',
    items: ['React', 'Styled-components', 'Next.js', 'TypeScript', 'Tailwind'],
  },
  {
    group: 'Visualization',
    items: ['Chart.js', 'ECharts', '웹 접근성 검수'],
  },
  {
    group: 'Tools & Backend',
    items: ['Git / SVN', 'Figma / Zeplin', 'Java / Spring', 'JPA / MySQL'],
  },
];



