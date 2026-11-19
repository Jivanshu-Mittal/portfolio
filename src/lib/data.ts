export const siteConfig = {
  name: 'Jivanshu Mittal',
  title: 'Full-Stack Developer (Backend Focus)',
  description: 'Building scalable backends and performant frontends. Specialized in Node.js, TypeScript, MongoDB, and Next.js.',
  email: 'jivanshumitt1052@gmail.com',
  phone: '+91 9997171408',
  location: 'Mathura, Uttar Pradesh, India',
  github: 'https://github.com/jivanshu',
  linkedin: 'https://linkedin.com/in/jivanshu-mittal',
  twitter: 'https://twitter.com/jivanshu',
  resumeUrl: '/resume.pdf',
  ogImage: '/og-image.png',
};

export const navItems = [
  { href: '#hero', label: 'Home', number: '01' },
  { href: '#who', label: 'Who I Am', number: '02' },
  { href: '#what', label: 'What I Do', number: '03' },
  { href: '#philosophy', label: 'Philosophy', number: '04' },
  { href: '#ecosystem', label: 'Ecosystem', number: '05' },
  { href: '#work', label: 'Selected Work', number: '06' },
  { href: '#experience', label: 'Experience', number: '07' },
  { href: '#process', label: 'Process', number: '08' },
  { href: '#now', label: 'Current Focus', number: '09' },
  { href: '#why', label: 'Why Work With Me', number: '10' },
  { href: '#contact-cta', label: 'Contact', number: '11' },
];

export const heroData = {
  name: 'Jivanshu Mittal',
  role: 'Full-Stack Developer',
  subtitle: 'Backend Focus | TypeScript & Node.js Specialist',
  location: 'Mathura, Uttar Pradesh, India',
  currentRole: 'Student at GLA University',
  graduationYear: 2027,
  badges: [
    { label: 'Now: Full-Stack Developer (Backend Focus)', icon: 'pulse' },
    { label: 'GLA University — Class of 2027', icon: 'graduation' },
  ],
  cta: {
    primary: { label: 'View My Work', href: '#work' },
    secondary: { label: 'Contact Me', href: '#contact-cta' },
    tertiary: { label: 'Resume', href: '/resume.pdf', download: true },
  },
  techMarquee: [
    'TypeScript', 'JavaScript', 'Node.js', 'Express.js', 'Next.js', 'React',
    'MongoDB', 'Mongoose', 'Redis', 'JWT', 'Docker', 'Git', 'Tailwind CSS',
    'Jest', 'Supertest', 'Zod', 'Postman', 'Vercel', 'Render'
  ],
};

export const whoData = {
  headline: 'I build scalable backends and clean frontends.',
  stats: [
    { label: 'Years Coding', value: '3+' },
    { label: 'Projects Shipped', value: '5+' },
    { label: 'Tech Stack', value: '15+' },
    { label: 'Test Coverage', value: '85%+' },
  ],
  description: `I'm a final-year Computer Science student at GLA University with a passion for building robust, scalable backend systems. My journey started with frontend development, but I found my calling in solving complex backend challenges — concurrency, data integrity, and API performance.

When I'm not optimizing database queries or designing REST APIs, you'll find me contributing to open-source, reading system design papers, or experimenting with new tools. I believe in writing code that's not just functional, but maintainable and performant at scale.`,
};

export const whatData = {
  headline: 'What I Do',
  capabilities: [
    {
      number: '01',
      title: 'Backend Engineering',
      description: 'Design and implement RESTful APIs with Node.js/Express. Expertise in authentication systems, database design, caching strategies, and handling concurrent operations.',
      highlights: ['JWT Auth & RBAC', 'MongoDB & Mongoose', 'Redis Caching', 'Docker & Deployment'],
      details: `Built production-grade backends handling real-time inventory, concurrent order processing with optimistic locking, and role-based access control. Achieved sub-120ms API latency through strategic indexing, pagination, and query optimization.`,
    },
    {
      number: '02',
      title: 'Full-Stack Development',
      description: 'End-to-end feature delivery using Next.js, React, and TypeScript. From database schema to pixel-perfect UI, with proper testing and CI/CD pipelines.',
      highlights: ['Next.js 14+ App Router', 'TypeScript & Zod', 'Tailwind CSS', 'Jest & Supertest'],
      details: `Delivered complete e-commerce platforms with user authentication, product catalogs, cart/checkout flows, admin dashboards, and real-time updates. Enforced code quality with ESLint, Prettier, Husky, and conventional commits.`,
    },
    {
      number: '03',
      title: 'Database & Performance',
      description: 'Schema design, indexing strategies, query optimization, and migration management. Experience with both relational and document databases.',
      highlights: ['Compound Indexes', 'Query Projection', 'Data Migrations', 'Aggregation Pipelines'],
      details: `Architected MongoDB schemas with strategic compound indexes for product search and user orders. Reduced query latency from 450ms to 120ms through projection, pagination, and planned Redis caching layer. Wrote migration scripts for schema evolution.`,
    },
  ],
};

export const philosophyData = [
  {
    number: '01',
    title: 'Correctness Over Cleverness',
    description: 'Code that works reliably beats code that looks smart. I prioritize type safety, exhaustive testing, and explicit error handling over terse abstractions.',
  },
  {
    number: '02',
    title: 'Design for Failure',
    description: 'Systems fail. Networks partition. Databases lock. I build with retries, idempotency, circuit breakers, and graceful degradation from day one.',
  },
  {
    number: '03',
    title: 'Measure, Then Optimize',
    description: 'Premature optimization is the root of all evil. I instrument first, profile under load, and optimize the proven bottlenecks — not the imagined ones.',
  },
  {
    number: '04',
    title: 'Ship Incrementally',
    description: 'Big bang deployments are risky. I prefer small, reversible changes behind feature flags, with automated rollback and comprehensive observability.',
  },
];

export const ecosystemData = {
  marquee: {
    frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Headless UI', 'React Aria', 'Framer Motion'],
    backend: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Redis', 'JWT', 'bcryptjs', 'Zod', 'Docker'],
  },
  categories: [
    {
      number: '01',
      title: 'Frontend Frameworks',
      badge: 'Working Knowledge',
      description: 'Building performant, accessible UIs with modern React patterns.',
      tags: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS'],
      link: '/skills#frontend',
    },
    {
      number: '02',
      title: 'Backend & APIs',
      badge: 'Current Role',
      description: 'Designing scalable REST APIs with proper auth, validation, and error handling.',
      tags: ['Node.js', 'Express.js', 'MongoDB', 'Redis', 'JWT'],
      link: '/skills#backend',
    },
    {
      number: '03',
      title: 'Database Systems',
      badge: 'Working Knowledge',
      description: 'Schema design, indexing, query optimization, and data modeling.',
      tags: ['MongoDB', 'Mongoose', 'PostgreSQL', 'Prisma'],
      link: '/skills#database',
    },
    {
      number: '04',
      title: 'Testing & Quality',
      badge: 'Working Knowledge',
      description: 'Unit, integration, and E2E testing with modern tooling.',
      tags: ['Jest', 'Supertest', 'React Testing Library', 'Playwright'],
      link: '/skills#testing',
    },
    {
      number: '05',
      title: 'DevOps & Deployment',
      badge: 'Basic Exposure',
      description: 'Containerization, CI/CD, and cloud deployment strategies.',
      tags: ['Docker', 'GitHub Actions', 'Vercel', 'Render', 'Railway'],
      link: '/skills#devops',
    },
    {
      number: '06',
      title: 'Authentication & Security',
      badge: 'Working Knowledge',
      description: 'JWT, OAuth, RBAC, rate limiting, and secure coding practices.',
      tags: ['JWT', 'Refresh Tokens', 'HTTP-only Cookies', 'bcryptjs', 'Helmet'],
      link: '/skills#auth',
    },
    {
      number: '07',
      title: 'State Management',
      badge: 'Basic Exposure',
      description: 'Client and server state management patterns.',
      tags: ['React Context', 'TanStack Query', 'Zustand', 'Redux Toolkit'],
      link: '/skills#state',
    },
    {
      number: '08',
      title: 'Code Quality Tools',
      badge: 'Working Knowledge',
      description: 'Linting, formatting, type checking, and git workflows.',
      tags: ['ESLint', 'Prettier', 'Husky', 'TypeScript', 'Conventional Commits'],
      link: '/skills#quality',
    },
    {
      number: '09',
      title: 'API Design',
      badge: 'Working Knowledge',
      description: 'RESTful principles, pagination, versioning, and documentation.',
      tags: ['OpenAPI/Swagger', 'Pagination', 'Field Projection', 'Rate Limiting'],
      link: '/skills#api',
    },
    {
      number: '10',
      title: 'Performance Optimization',
      badge: 'Basic Exposure',
      description: 'Profiling, caching, bundle optimization, and Core Web Vitals.',
      tags: ['Redis Caching', 'Code Splitting', 'Image Optimization', 'Lighthouse'],
      link: '/skills#performance',
    },
  ],
};

export const workData = {
  projects: [
    {
      id: 'del2',
      title: 'Del2 — Full-Stack E-Commerce Platform',
      shortDesc: 'Scalable e-commerce backend with real-time inventory, concurrent order handling, and RBAC.',
      description: `Del2 solves the complexity of building a scalable, secure e-commerce backend with real-time inventory management, concurrent order handling, and role-based access control — challenges that generic templates don't address.

It provides a complete shopping experience: user authentication (JWT + refresh tokens), product catalog with categories/search, cart & checkout with optimistic locking for concurrency, order history, and an admin dashboard for inventory/order management — all via RESTful APIs consumed by a Next.js frontend.

Built for small-to-mid merchants needing a customizable, performant storefront; achieves sub-120ms API latency, 85%+ test coverage on critical paths, and a maintainable codebase ready for feature extensions (payments, notifications, analytics).`,
      tags: ['Next.js', 'Express.js', 'MongoDB', 'TypeScript', 'JWT', 'Redis', 'Docker', 'Jest', 'Tailwind CSS'],
      highlights: [
        'Optimistic locking for concurrent checkout — reduced failed orders ~40%',
        'JWT auth with access/refresh tokens, HTTP-only cookies, RBAC',
        'MongoDB compound indexes for product search & user orders',
        'API optimization: pagination, projection, caching (450ms → 120ms)',
        '85%+ test coverage on auth & order flows',
        'CI-ready git workflow with conventional commits',
      ],
      role: 'Full-Stack Developer (Backend Focus) | Team of 3',
      contributions: [
        'Designed & implemented entire REST API layer (auth, products, categories, cart, orders, admin)',
        'Architected MongoDB schemas & indexes; handled data migration scripts',
        'Built JWT authentication system from scratch (token rotation, secure cookie storage, RBAC middleware)',
        'Debugged & fixed critical race condition in concurrent checkout using optimistic locking + version fields',
        'Optimized slow queries via projection, pagination, and Redis caching layer (planned)',
        'Wrote Jest unit/integration tests for auth & order flows (85%+ coverage)',
        'Configured ESLint, Prettier, Husky pre-commit hooks; enforced conventional commits',
        'Code-reviewed teammates\' PRs (frontend components, UI integration)',
      ],
      links: {
        github: 'https://github.com/jivanshu/del2',
        demo: 'https://del2-demo.vercel.app',
        caseStudy: '/work/del2',
      },
      coverImage: '/images/del2-cover.jpg',
      period: 'Jan 2024 — Aug 2024 (actively maintained)',
    },
    {
      id: 'project-2',
      title: 'TaskFlow — Real-time Collaboration Tool',
      shortDesc: 'Team productivity app with real-time updates, WebSocket connections, and optimistic UI.',
      description: 'A real-time task management platform built with Next.js, Socket.io, and PostgreSQL. Features live collaboration, drag-and-drop boards, comments, notifications, and offline-first sync.',
      tags: ['Next.js', 'Socket.io', 'PostgreSQL', 'Prisma', 'TypeScript', 'Tailwind CSS', 'Zustand'],
      highlights: [
        'Real-time collaboration with WebSocket connections',
        'Optimistic UI updates with conflict resolution',
        'Offline-first architecture with IndexedDB sync',
        'Role-based workspaces and permissions',
      ],
      role: 'Full-Stack Developer | Solo Project',
      contributions: [
        'Built real-time engine with Socket.io and Redis adapter',
        'Implemented optimistic locking for concurrent edits',
        'Designed PostgreSQL schema with Prisma ORM',
        'Achieved 90+ Lighthouse scores',
      ],
      links: {
        github: 'https://github.com/jivanshu/taskflow',
        demo: 'https://taskflow-demo.vercel.app',
      },
      coverImage: '/images/taskflow-cover.jpg',
      period: 'Sep 2023 — Dec 2023',
    },
    {
      id: 'project-3',
      title: 'API Gateway — Rate Limited Proxy',
      shortDesc: 'High-performance API gateway with rate limiting, request transformation, and analytics.',
      description: 'A lightweight API gateway built in Go with middleware for rate limiting, authentication, request/response transformation, logging, and metrics collection. Designed for microservice architectures.',
      tags: ['Go', 'Redis', 'Docker', 'Prometheus', 'Grafana', 'OpenTelemetry'],
      highlights: [
        'Token bucket rate limiting with Redis backend',
        'Request/response transformation pipeline',
        'Distributed tracing with OpenTelemetry',
        'Horizontal scaling with health checks',
      ],
      role: 'Backend Developer | Learning Project',
      contributions: [
        'Implemented custom middleware chain',
        'Built rate limiter with sliding window algorithm',
        'Integrated Prometheus metrics and Grafana dashboards',
        'Deployed to Kubernetes with Helm charts',
      ],
      links: {
        github: 'https://github.com/jivanshu/api-gateway',
      },
      coverImage: '/images/apigateway-cover.jpg',
      period: 'Jun 2023 — Aug 2023',
    },
  ],
};

export const experienceData = [
  {
    id: 'current',
    company: 'GLA University',
    role: 'B.Tech Computer Science & Engineering',
    period: '2023 — 2027',
    location: 'Mathura, Uttar Pradesh, India',
    current: true,
    description: `Final-year undergraduate specializing in full-stack development and backend engineering. Relevant coursework: Data Structures & Algorithms, Database Management Systems, Computer Networks, Operating Systems, Software Engineering.

Key Achievements:
• Built Del2 — production-grade e-commerce platform (85%+ test coverage, sub-120ms API latency)
• Implemented optimistic locking for concurrent order processing, reducing failed orders by ~40%
• Architected MongoDB schemas with compound indexes, achieving 450ms → 120ms query improvement
• Maintain 8.5+ CGPA; active in coding clubs and hackathons`,
    technologies: ['TypeScript', 'Node.js', 'MongoDB', 'Next.js', 'React', 'Docker', 'Git'],
  },
  {
    id: 'internship',
    company: 'TechStart Solutions',
    role: 'Backend Developer Intern',
    period: 'Jun 2023 — Aug 2023',
    location: 'Remote',
    current: false,
    description: `Contributed to a SaaS platform serving 10k+ users. Worked on API development, database optimization, and third-party integrations.

Key Contributions:
• Developed REST APIs for user management, billing, and notifications using Node.js/Express
• Optimized slow MongoDB queries using aggregation pipelines and compound indexes (60% latency reduction)
• Implemented JWT-based authentication with refresh token rotation
• Wrote integration tests achieving 80%+ coverage on critical paths
• Participated in code reviews and sprint planning ceremonies`,
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Redis', 'Jest', 'Docker', 'AWS'],
  },
  {
    id: 'freelance',
    company: 'Freelance Projects',
    role: 'Full-Stack Developer',
    period: '2022 — Present',
    location: 'Remote',
    current: true,
    description: `Delivered custom web applications for small businesses and startups. Projects range from e-commerce stores to internal tools and dashboards.

Selected Work:
• E-commerce store for local retailer (Next.js + Stripe + Sanity CMS)
• Inventory management dashboard for logistics company (React + Node.js + PostgreSQL)
• Appointment booking system for healthcare clinic (Next.js + Prisma + Twilio)
• Multiple landing pages and marketing sites with CMS integration`,
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Stripe', 'Vercel'],
  },
];

export const processData = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understand requirements, constraints, and success metrics. Map user journeys and define API contracts before writing code.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Architect data models, choose technologies, and plan infrastructure. Document decisions in ADRs for future reference.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Implement in vertical slices with tests first. Enforce types, linting, and conventional commits. Small PRs, frequent merges.',
  },
  {
    number: '04',
    title: 'Validate',
    description: 'Load test, chaos test, and verify observability. Check error budgets, latency percentiles, and failure recovery paths.',
  },
  {
    number: '05',
    title: 'Ship & Learn',
    description: 'Deploy behind feature flags. Monitor real-user metrics. Iterate based on data, not assumptions. Post-mortem every incident.',
  },
];

export const nowData = {
  headline: 'Currently focused on <span class="text-brand-400">ASP.NET Core</span> and cloud-native architectures.',
  stats: [
    { label: 'Role', value: 'Full-Stack Developer (Backend Focus)' },
    { label: 'Since', value: 'January 2024' },
    { label: 'Location', value: 'Mathura, Uttar Pradesh, India' },
  ],
  description: `Deepening expertise in the .NET ecosystem — building microservices with ASP.NET Core, exploring gRPC for service communication, and learning Kubernetes orchestration patterns. Simultaneously advancing system design knowledge through distributed systems literature and practical projects.`,
  cta: {
    label: 'See Where I\'ve Been',
    href: '#experience',
  },
};

export const whyData = [
  {
    number: '01',
    title: 'Production Mindset',
    description: 'I don\'t just write code that works locally. I think about deployments, rollbacks, observability, and failure modes from the first commit.',
  },
  {
    number: '02',
    title: 'Backend Depth, Full-Stack Range',
    description: 'Strong foundation in API design, databases, caching, and concurrency — paired with modern frontend skills (Next.js, React, TypeScript) to deliver complete features independently.',
  },
  {
    number: '03',
    title: 'Quality as Default',
    description: 'Tests, types, linting, and CI aren\'t afterthoughts. They\'re how I work. 85%+ coverage on critical paths, conventional commits, and documented architecture decisions.',
  },
  {
    number: '04',
    title: 'Clear Communication',
    description: 'Technical decisions documented in ADRs. PR descriptions explain the why, not just the what. Regular async updates. No surprises for stakeholders.',
  },
];

export const contactData = {
  headline: 'Let\'s Build Something Together',
  description: 'Open to full-time roles, internships, and interesting freelance projects. Currently seeking opportunities starting mid-2025.',
  buttons: [
    { label: 'Start a Conversation', href: 'mailto:jivanshumitt1052@gmail.com', variant: 'primary' },
    { label: 'jivanshumitt1052@gmail.com', href: 'mailto:jivanshumitt1052@gmail.com', variant: 'secondary' },
    { label: 'Download Resume', href: '/resume.pdf', variant: 'tertiary', download: true },
  ],
  social: [
    { label: 'GitHub', href: 'https://github.com/jivanshu', icon: 'github' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/jivanshu-mittal', icon: 'linkedin' },
    { label: 'Twitter', href: 'https://twitter.com/jivanshu', icon: 'twitter' },
    { label: 'Phone', href: 'tel:+919997171408', icon: 'phone' },
  ],
};