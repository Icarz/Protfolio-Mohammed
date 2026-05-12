const STORAGE_KEY = 'portfolio_data';

const TECH_COLORS = {
  React: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20',
  JavaScript: 'text-yellow-300 bg-yellow-500/10 border-yellow-500/20',
  TypeScript: 'text-blue-300 bg-blue-500/10 border-blue-500/20',
  'Node.js': 'text-green-300 bg-green-500/10 border-green-500/20',
  Express: 'text-slate-300 bg-slate-500/10 border-slate-500/20',
  MongoDB: 'text-green-400 bg-green-500/10 border-green-500/20',
  'Tailwind CSS': 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20',
  Firebase: 'text-orange-300 bg-orange-500/10 border-orange-500/20',
  SQL: 'text-blue-300 bg-blue-500/10 border-blue-500/20',
  Git: 'text-red-300 bg-red-500/10 border-red-500/20',
  'REST APIs': 'text-purple-300 bg-purple-500/10 border-purple-500/20',
  JWT: 'text-pink-300 bg-pink-500/10 border-pink-500/20',
  Figma: 'text-orange-300 bg-orange-500/10 border-orange-500/20',
  'Socket.io': 'text-white bg-white/10 border-white/20',
  Zustand: 'text-violet-300 bg-violet-500/10 border-violet-500/20',
  'Daisy UI': 'text-teal-300 bg-teal-500/10 border-teal-500/20',
  'Puter AI': 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
  FlutterFlow: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  CSS: 'text-blue-300 bg-blue-500/10 border-blue-500/20',
  GitHub: 'text-slate-300 bg-slate-500/10 border-slate-500/20',
  Vite: 'text-purple-300 bg-purple-500/10 border-purple-500/20',
  Next: 'text-white bg-white/5 border-white/20',
  'Next.js': 'text-white bg-white/5 border-white/20',
  Python: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  Docker: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  Redux: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  GraphQL: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
};

const FALLBACK_COLORS = [
  'text-blue-300 bg-blue-500/10 border-blue-500/20',
  'text-purple-300 bg-purple-500/10 border-purple-500/20',
  'text-pink-300 bg-pink-500/10 border-pink-500/20',
  'text-teal-300 bg-teal-500/10 border-teal-500/20',
  'text-amber-300 bg-amber-500/10 border-amber-500/20',
];

export function getTechColor(name) {
  return TECH_COLORS[name] || FALLBACK_COLORS[name.charCodeAt(0) % FALLBACK_COLORS.length];
}

export const DEFAULT_DATA = {
  hero: {
    name: 'Mohammed Rerhaye',
    role: 'Full Stack Developer',
    bio: 'Building clean, responsive, and user-friendly web applications. Specializing in the MERN stack — from pixel-perfect UIs to scalable backend APIs.',
    photo: '/profile.jpg',
    available: true,
    experienceStat: '3+ Years',
    projectsStat: '10+ Built',
    github: 'https://github.com/Icarz',
    linkedin: 'https://www.linkedin.com/in/mohammed-rerhaye-356197125/',
    email: 'mr.rghay@gmail.com',
  },
  about: {
    bio1: 'Frontend-focused full-stack developer with expertise in JavaScript, React, and Node.js. Transitioning from a background in industrial automation, I bring strong problem-solving, project management, and client communication skills to every project I take on.',
    bio2: 'Experienced in building and scaling responsive applications, integrating REST APIs, and delivering real-world products through professional roles and intensive bootcamps in the MERN stack.',
    role: 'Full Stack Developer',
    location: 'Casablanca, Morocco',
    experience: '3+ Years',
    email: 'mr.rghay@gmail.com',
  },
  projects: [
    {
      id: 1,
      title: 'GreenVille E-Commerce',
      description: 'A modern e-commerce platform with full product management, cart, authentication, and responsive mobile design.',
      image: '/greenVille.png',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
      category: 'Full Stack',
      featured: true,
      github: 'https://github.com/shadowofleaf96/GreenVille',
      live: 'https://greenville-frontend.vercel.app',
    },
    {
      id: 2,
      title: 'Book Cave',
      description: 'A platform where book lovers can browse, review, and track their favorite books with a clean reading experience.',
      image: '/bookCave.png',
      technologies: ['React', 'Node.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
      category: 'Full Stack',
      featured: false,
      github: 'https://github.com/Icarz/BooksCaveApp',
      live: 'https://book-cave-app.vercel.app/',
    },
    {
      id: 3,
      title: 'AI Resume Analyzer',
      description: 'An AI-powered ATS resume analyzer that helps improve job applications based on specific job requirements.',
      image: '/ATS%20analyzer.png',
      technologies: ['React', 'Tailwind CSS', 'Puter AI'],
      category: 'Frontend',
      featured: false,
      github: 'https://github.com/Icarz/ai-resume-analyze',
      live: 'https://resume-analyzer-36-nsl7i.puter.site/',
    },
    {
      id: 4,
      title: 'Skill Swap',
      description: 'A community platform that connects people who want to exchange skills — learn something new by teaching what you know.',
      image: '/skillSwap.png',
      technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'JWT'],
      category: 'Full Stack',
      featured: false,
      github: 'https://github.com/Icarz/SkillSwap',
      live: 'https://theskillswap.vercel.app',
    },
    {
      id: 5,
      title: 'ChatApp',
      description: 'A modern real-time chat application built with the MERN stack and Socket.io, featuring JWT authentication, online presence tracking, and global state management with Zustand.',
      image: '/ChattApp.png',
      technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Zustand', 'Daisy UI'],
      category: 'Full Stack',
      featured: false,
      github: 'https://github.com/Icarz/ChatWebApp',
      live: 'https://icarus-chatapp.vercel.app/',
    },
    {
      id: 6,
      title: 'Château Blanc Chocolat',
      description: 'A elegant landing page for a premium chocolate brand, featuring a refined visual identity, smooth animations, and a fully responsive design.',
      image: '/chateau_blanc.png',
      technologies: ['React', 'Tailwind CSS', 'Vite'],
      category: 'Frontend',
      featured: false,
      github: 'https://github.com/Icarz/chateauBlanc_chocolat',
      live: 'https://chateaublanc.vercel.app/#hero',
    },
    {
      id: 7,
      title: 'Alta Immobilier',
      description: 'A full-stack real estate web application that enables administrators to list and manage properties — including apartments, villas, and homes — available for sale or rent. The platform features a comprehensive admin panel and dashboard, giving administrators full control over property listings, visibility, and status updates.',
      image: '/alta_ommobilier.png',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
      category: 'Full Stack',
      featured: true,
      github: 'https://github.com/Icarz/altaimmobilier',
      live: 'https://altaimmobilier.vercel.app/',
    },
  ],
  skills: {
    proficiency: [
      { name: 'Frontend Development', level: 85 },
      { name: 'Backend Development', level: 75 },
      { name: 'Database Design', level: 70 },
      { name: 'UI / UX Implementation', level: 68 },
      { name: 'DevOps & Tooling', level: 60 },
    ],
    techStack: [
      'React', 'JavaScript', 'Node.js', 'Express', 'MongoDB',
      'Tailwind CSS', 'Firebase', 'SQL', 'Git', 'REST APIs', 'JWT', 'Figma',
    ],
  },
  experience: [
    {
      id: 1,
      company: 'Qualiziom',
      position: 'Frontend Developer',
      period: 'December 2024 – June 2025',
      location: 'Casablanca, Morocco',
      description: 'Maintained and improved a web application, implementing UI updates based on user stories and product requirements.',
      achievements: [
        'Refactored component architecture to improve reusability',
        'Delivered UI updates aligned to user stories and sprint goals',
      ],
      skills: ['React', 'JavaScript', 'SQL', 'CSS'],
    },
    {
      id: 2,
      company: 'Sand Technologies',
      position: 'Full Stack Developer',
      period: 'June 2024 – October 2024',
      location: 'Casablanca, Morocco',
      description: 'Collaborated on building an MVP application and responsive web platform from the ground up.',
      achievements: [
        'Built a responsive cross-platform app with FlutterFlow',
        'Integrated Firebase for real-time data and authentication',
      ],
      skills: ['FlutterFlow', 'JavaScript', 'Firebase', 'Figma'],
    },
    {
      id: 3,
      company: 'ARK X Experience',
      position: 'Junior Full Stack Developer',
      period: 'August 2023 – March 2024',
      location: 'Casablanca, Morocco',
      description: 'Worked on web platforms and mobile-friendly applications using React, Node.js, and MongoDB.',
      achievements: [
        'Improved application performance and load times',
        'Enhanced responsiveness across mobile and desktop devices',
      ],
      skills: ['React', 'JavaScript', 'MongoDB', 'Tailwind CSS', 'GitHub', 'CSS'],
    },
  ],
};

export function getPortfolioData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const p = JSON.parse(stored);
      return {
        hero: { ...DEFAULT_DATA.hero, ...p.hero },
        about: { ...DEFAULT_DATA.about, ...p.about },
        projects: p.projects ?? DEFAULT_DATA.projects,
        skills: {
          proficiency: p.skills?.proficiency ?? DEFAULT_DATA.skills.proficiency,
          techStack: p.skills?.techStack ?? DEFAULT_DATA.skills.techStack,
        },
        experience: p.experience ?? DEFAULT_DATA.experience,
      };
    }
  } catch (e) {
    console.error('Failed to load portfolio data:', e);
  }
  return DEFAULT_DATA;
}

export function savePortfolioData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save portfolio data:', e);
    throw new Error('Storage limit reached. Try using an image URL instead of uploading.');
  }
}

export function resetPortfolioData() {
  localStorage.removeItem(STORAGE_KEY);
}
