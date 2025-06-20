import type { Skill, Experience, Project, Testimonial, SocialLink } from '@/types';
import Instagram from '@/assets/icons/instagram.svg';
import Linkedin from '@/assets/icons/linkedin.svg';
import X from '@/assets/icons/x.svg';
import GitHub from '@/assets/icons/github.svg';

export const personalInfo = {
  name: 'Suraj Gupta',
  title: 'Full Stack Developer',
  bio: 'Passionate full-stack developer with 4+ years of experience building scalable web applications. I specialize in React, Node.js, and cloud technologies, with a focus on creating exceptional user experiences.',
  email: 'surajgupta6178@gmail.com',
  phone: '+91 96651 37682',
  location: 'Nashik, Maharashtra, India',
  resumeUrl: '/resume.pdf',
};

export const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 95, category: 'frontend' },
  { name: 'Next.js', level: 90, category: 'frontend' },
  { name: 'TypeScript', level: 90, category: 'frontend' },
  { name: 'JavaScript', level: 95, category: 'frontend' },
  { name: 'HTML5', level: 95, category: 'frontend' },
  { name: 'CSS3', level: 90, category: 'frontend' },
  { name: 'Tailwind CSS', level: 85, category: 'frontend' },
  { name: 'Vue.js', level: 75, category: 'frontend' },

  // Backend
  { name: 'Node.js', level: 90, category: 'backend' },
  { name: 'Express.js', level: 85, category: 'backend' },
  { name: 'Python', level: 80, category: 'backend' },
  { name: 'Django', level: 75, category: 'backend' },
  { name: 'RESTful APIs', level: 90, category: 'backend' },
  { name: 'GraphQL', level: 80, category: 'backend' },

  // Database
  { name: 'PostgreSQL', level: 85, category: 'database' },
  { name: 'MongoDB', level: 80, category: 'database' },
  { name: 'Redis', level: 75, category: 'database' },
  { name: 'MySQL', level: 80, category: 'database' },

  // Tools & Others
  { name: 'AWS', level: 80, category: 'tools' },
  { name: 'Docker', level: 85, category: 'tools' },
  { name: 'Git', level: 90, category: 'tools' },
  { name: 'CI/CD', level: 80, category: 'tools' },
];

export const experiences: Experience[] = [
  {
    id: '1',
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    duration: 'Jan 2022 - Present',
    current: true,
    description: [
      'Led development of microservices architecture serving 1M+ users',
      'Built responsive web applications using React, Next.js, and TypeScript',
      'Designed and implemented RESTful APIs with Node.js and Express',
      'Optimized database queries resulting in 40% performance improvement',
      'Mentored junior developers and conducted code reviews'
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'AWS', 'Docker']
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'Digital Innovations',
    location: 'Seattle, WA',
    duration: 'Mar 2020 - Dec 2021',
    description: [
      'Developed e-commerce platform handling $2M+ in annual transactions',
      'Implemented real-time features using WebSockets and Socket.io',
      'Created automated testing suites with 90% code coverage',
      'Collaborated with UX/UI designers to implement pixel-perfect designs',
      'Integrated third-party APIs and payment gateways'
    ],
    technologies: ['React', 'Vue.js', 'Express.js', 'MongoDB', 'Stripe API']
  },
  {
    id: '3',
    title: 'Frontend Developer',
    company: 'StartupXYZ',
    location: 'Austin, TX',
    duration: 'Jun 2019 - Feb 2020',
    description: [
      'Built responsive single-page applications with React and Redux',
      'Implemented modern CSS techniques and animations',
      'Collaborated with backend team to integrate APIs',
      'Participated in agile development process and sprint planning',
      'Contributed to company\'s design system and component library'
    ],
    technologies: ['React', 'Redux', 'JavaScript', 'CSS3', 'Sass']
  }
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory management',
    longDescription: 'A comprehensive e-commerce platform built with Next.js and Node.js, featuring real-time inventory management, secure payment processing, and an admin dashboard. The platform handles thousands of products and supports multiple payment methods.',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis', 'AWS'],
    githubUrl: 'https://github.com/johndoe/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.vercel.app',
    imageUrl: '/projects/ecommerce.jpg',
    featured: true
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Collaborative project management tool with real-time updates',
    longDescription: 'A modern task management application that enables teams to collaborate effectively. Features include real-time updates, drag-and-drop kanban boards, time tracking, and detailed analytics dashboard.',
    technologies: ['React', 'Express.js', 'MongoDB', 'Socket.io', 'Material-UI'],
    githubUrl: 'https://github.com/johndoe/task-manager',
    liveUrl: 'https://taskmanager-demo.netlify.app',
    imageUrl: '/projects/taskmanager.jpg',
    featured: true
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'Interactive weather application with location-based forecasts',
    longDescription: 'A responsive weather dashboard that provides detailed weather information, forecasts, and interactive maps. Users can search for locations, save favorites, and receive weather alerts.',
    technologies: ['Vue.js', 'TypeScript', 'Express.js', 'OpenWeather API'],
    githubUrl: 'https://github.com/johndoe/weather-dashboard',
    liveUrl: 'https://weather-app-demo.herokuapp.com',
    imageUrl: '/projects/weather.jpg',
    featured: false
  },
  {
    id: '4',
    title: 'Social Media Analytics',
    description: 'Analytics dashboard for social media performance tracking',
    longDescription: 'A comprehensive analytics platform that helps businesses track their social media performance across multiple platforms. Features include engagement metrics, audience insights, and automated reporting.',
    technologies: ['React', 'Python', 'Django', 'PostgreSQL', 'Chart.js'],
    githubUrl: 'https://github.com/johndoe/social-analytics',
    imageUrl: '/projects/analytics.jpg',
    featured: true
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Product Manager',
    company: 'TechCorp Solutions',
    content: 'John is an exceptional developer who consistently delivers high-quality code. His attention to detail and problem-solving skills make him a valuable team member.',
    avatar: '/testimonials/sarah.jpg',
    rating: 5
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'CTO',
    company: 'Digital Innovations',
    content: 'Working with John was a pleasure. He has deep technical knowledge and excellent communication skills. He delivered our project on time and exceeded expectations.',
    avatar: '/testimonials/michael.jpg',
    rating: 5
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Lead Designer',
    company: 'StartupXYZ',
    content: 'John brought our designs to life with pixel-perfect precision. His understanding of modern web technologies and user experience is impressive.',
    avatar: '/testimonials/emily.jpg',
    rating: 5
  }
];

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/johndoe',
    icon: GitHub,
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/johndoe',
    icon : Linkedin,
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/johndoe',
    icon: X,
  },
  {
    name: 'Instagram',
    url: 'mailto:john.doe@example.com',
    icon: Instagram,
  }
];
