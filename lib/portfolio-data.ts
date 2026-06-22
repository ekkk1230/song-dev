export const profile = {
    name: '송은경',
    nameEn: 'Song Eunkyung',
    role: '웹 퍼블리셔',
    roleLine: ['WEB', 'PUBLISHER'],
    tagline: '웹 표준과 웹 접근성을 준수한 UI를 구현하는 3년 차 퍼블리셔. 정교한 마크업에 개발의 깊이를 더합니다.',
    location: 'Anyang, KR',
    status: '리드포인트시스템 · 대리',
    email: 'ek10314@naver.com',
    socials: [
        { label: 'GitHub', href: 'https://github.com/ekkk1230' },
        { label: 'Email', href: 'mailto:eunkyung.song@example.com' },
    ]
};

export const about = {
    intro: 'HTML/CSS (SCSS) 기반의 마크업과 스타일링을 바탕으로 웹 표준과 웹 접근성을 준수한 UI를 구현합니다. 사내 단독 퍼블리셔로 다양한 이해관계자(기획자, 디자이너, 백엔드)와 원활한 협업을 통해 프로젝트 효율을 높였습니다.',
    detail: '디자인 의도를 픽셀 단위로 구현하는 퍼블리싱 전문성을 바탕으로, 로직 구현과 데이터 연동까지 기술적 영역을 꾸준히 확장하고 있습니다. 현재 Java/Spring을 학습하며 백엔드 협업 이해도를 넓히고 있습니다.',
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
  year: string
  description: string
  highlights: string[]
  stack: string[]
  variant: 'dashboard' | 'accessibility' | 'dataviz'
};

export const projects: Project[] = [
  
];

export const experience = {
  company: '리드포인트시스템',
  role: '웹 퍼블리셔 (대리)',
  period: '2022.09 ~ 현재',
  points: [
    '회사 내 단독 퍼블리셔로 전 프로젝트 참여 및 퍼블리싱 완수',
    '웹 접근성 총 13회 — 신규 8건 + 기존 서비스 재인증 5회',
    'React(Styled-components) 기반 컴포넌트 단위 UI 작업',
    '대시보드·웹사이트·앱(웹뷰/하이브리드) UI 퍼블리싱',
  ],
  projects: [
    { name: '', desc: '' },
    
  ]
};

export const skills = [
  {
    group: 'Frontend & UI',
    items: ['HTML5', 'CSS3 / SCSS', 'JavaScript', 'jQuery', 'GSAP'],
  },
  {
    group: 'Framework',
    items: ['React', 'Styled-components', 'Next.js', 'TypeScript'],
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


