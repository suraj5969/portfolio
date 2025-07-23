import type { Skill, Experience, Project, Testimonial, SocialLink, Tool } from "@/types";
import { GitHubIcon, LinkedInIcon, XIcon, InstagramIcon } from "@/components/icons";

export const personalInfo = {
  name: "Suraj Gupta",
  title: "Full Stack Developer",
  bio: "Passionate full-stack developer with 4+ years of experience building scalable web applications. I specialize in React, Node.js, and cloud technologies, with a focus on creating exceptional user experiences.",
  email: "surajgupta6178@gmail.com",
  phone: "+91 96651 37682",
  location: "Nashik, India",
  resumeUrl: "/resume.pdf",
};

export const skills: Skill[] = [
  // Frontend
  { name: "React", level: 95, category: "frontend" },
  { name: "Next.js", level: 90, category: "frontend" },
  { name: "TypeScript", level: 90, category: "frontend" },
  { name: "JavaScript", level: 95, category: "frontend" },
  { name: "HTML5", level: 95, category: "frontend" },
  { name: "CSS3", level: 90, category: "frontend" },
  { name: "Tailwind CSS", level: 85, category: "frontend" },
  { name: "Vue.js", level: 75, category: "frontend" },

  // Backend
  { name: "Node.js", level: 90, category: "backend" },
  { name: "Express.js", level: 85, category: "backend" },
  { name: "Python", level: 80, category: "backend" },
  { name: "Django", level: 75, category: "backend" },
  { name: "RESTful APIs", level: 90, category: "backend" },
  { name: "GraphQL", level: 80, category: "backend" },

  // Database
  { name: "PostgreSQL", level: 85, category: "database" },
  { name: "MongoDB", level: 80, category: "database" },
  { name: "Redis", level: 75, category: "database" },
  { name: "MySQL", level: 80, category: "database" },

  // Tools & Others
  { name: "AWS", level: 80, category: "tools" },
  { name: "Docker", level: 85, category: "tools" },
  { name: "Git", level: 90, category: "tools" },
  { name: "CI/CD", level: 80, category: "tools" },
];

export const tools: Tool[] = [
  {
    name: "Typescript",
    logoUrl: "/images/typescript.png",
    backText: "Bcoz I dont like Java 🤮",
  },
  {
    name: "Node.js",
    logoUrl: "/images/node.png",
    backText: "It keeps me away from JVM 🏃‍♂️",
  },
  {
    name: "React",
    logoUrl: "/images/react.png",
    backText: "Rerenders faster than my mood swings ⚛️",
  },
  {
    name: "Express.js",
    logoUrl: "/images/express.png",
    backText: "Runs my code in secret environments 🤫",
  },
  {
    name: "Next.js",
    logoUrl: "/images/next.png",
    backText: "For All in one 🔮",
  },
  {
    name: "Python",
    logoUrl: "/images/python.png",
    backText: "To go with the AI train 🚆",
  },
  {
    name: "PostgreSQL",
    logoUrl: "/images/postgres.png",
    backText: "Big Elephent to query my data 🐘",
  },
  {
    name: "Redis",
    logoUrl: "/images/redis.png",
    backText: "To return data in a flash 🚀",
  },
  {
    name: "Tailwind CSS",
    logoUrl: "/images/tailwind.png",
    backText: "To make it look Beautiful 🎨",
  },
  {
    name: "Vite",
    logoUrl: "/images/vite.png",
    backText: "For blazingly fast DX ⚡",
  },
  {
    name: "AWS",
    logoUrl: "/images/aws.png",
    backText: "AWSome cloud muscle for my apps 💪",
  },
  {
    name: "Git",
    logoUrl: "/images/git.png",
    backText: "Time machine for my code 🔄",
  },
];

export const experiences: Experience[] = [
  {
    id: "1",
    title: "Senior Full-Stack Engineer / Tech Lead",
    company: "SafetyConnect",
    location: "Remote",
    duration: "Mar 2023 - Present",
    current: true,
    description: [
      "Architected and built a customizable dashboard that lets customers create and visualise safety data in real time, improving reporting and personalized insights per customer",
      "Refactored Node.js micro-services and tuned database indexes, cutting AWS spend by 30% and shrinking median API latency from 400 ms to 250 ms",
      "Implemented an automated translation pipeline to improve accessibility for global users",
      "Lead and mentor a 6-person engineering squad; introduced CI/CD, structured code reviews and sprint rituals that lowered escaped defects",
      "Managed AWS infra, including EC2, S3, RDS, and SNS; optimised costs and improved reliability through better monitoring and alerting",
      "Engineered a configurable form-builder module and optimized the underlying workflow engine, serving as a key driver in delivering the company’s new process-safety solution",
    ],
    technologies: ["React", "Vite", "TypeScript", "Node.js", "Tailwind CSS", "AWS", "OpenAPI"],
  },
  {
    id: "2",
    title: "Founding Engineer / Full-Stack Developer",
    company: "LST Consultancy",
    location: "Nashik, IN",
    duration: "Sep 2021 - Feb 2023",
    description: [
      "Solely delivered six green-field web apps for legal-tech client LexisNexis and others",
      "Designed and built TaskSprint, a project-management SaaS with Kanban boards, real-time collaboration and time-tracking features",
      "Integrated Stripe billing and built a product-usage analytics dashboard that informed pricing decisions and reduced churn by 20%",
    ],
    technologies: ["React", "Next.js", "Node.js", "Express", "Prisma", "AWS", "Stripe"],
  },
  {
    id: "3",
    title: "Frontend Developer",
    company: "Freelancer",
    location: "Remote",
    duration: "Jun 2020 - Jul 2021",
    description: [
      "Built responsive single-page websites for clients",
      "Implemented modern CSS techniques and animations",
      "Created SEO optimized and accessible websites",
      "Made some money to fund college graduated myself 😜",
    ],
    technologies: ["HTML", "CSS", "Bootstrap", "JavaScript"],
  },
];

// sequelize-with-spalite, chrome extension, tasksprint, process afety, driver safety, custom dashboard,
export const projects: Project[] = [
  {
    id: "1",
    title: "Npm Package: Sequelize with Spatialite",
    description:
      "Added spatialite support to Sequelize ORM to use with SQLite, enabling advanced geospatial queries and operations in Node.js applications. This integration allows developers to have support for spatial queries in Sequelize with SQLite databases, making it easier to work with geospatial data.",
    technologies: ["SQLite", "Spatialite", "Sequelize", "ORM"],
    githubUrl: "https://github.com/suraj5969/sequelize-with-spatialite",
    liveUrl: "https://www.npmjs.com/package/sequelize-with-spatialite",
    imageUrl: "/images/npm.png",
  },
  {
    id: "2",
    title: "Disable autogain control",
    description: "Chrome Extension for disabling auto-gain control in web audio streams",
    technologies: ["JavaScript", "Chrome Extension", "Web Audio API"],
    githubUrl: "https://github.com/suraj5969/disable-autogain-control-extension/manager",
    // liveUrl: "https://github.com/suraj5969/disable-autogain-control-extension/",
    imageUrl: "/images/extension.png",
  },
  {
    id: "3",
    title: "TaskSprint",
    description:
      "A modern project management application that enables teams to collaborate effectively. Features include real-time updates, drag-and-drop kanban boards, time tracking, and detailed analytics dashboard.",
    technologies: ["React", "Next.js", "Postgres", "Material-UI"],
    // githubUrl: "https://github.com/johndoe/weather-dashboard",
    liveUrl: "https://tasksprint.app/",
    imageUrl: "/images/tasksprint.png",
  },
  {
    id: "4",
    title: "Process Safety",
    description:
      "A comprehensive process safety management system that helps organizations comply with safety regulations. Features include incident reporting, risk assessment, and compliance tracking.",
    technologies: ["React", "Typescript", "Express.js", "PostgreSQL", "AWS"],
    liveUrl: "https:/ps.safetyconnect.io/",
    imageUrl: "/images/process-safety.png",
  },
  {
    id: "5",
    title: "Driver Safety",
    description:
      "A driver safety application that monitors driving behavior and provides real-time feedback to improve safety. Features include GPS tracking, speed monitoring, and incident reporting.",
    technologies: ["React", "Typescript", "Redis", "WebHooks", "AWS"],
    liveUrl: "https://driver-safety.safetyconnect.io/",
    imageUrl: "/images/driver-safety.png",
  },
  {
    id: "6",
    title: "Custom Dashboard",
    description:
      "A customizable dashboard application that allows users to create personalized dashboards according to their needs. Features include drag-and-drop widget placement, data visualization, and multiple graph types.",
    technologies: ["React", "Apex Charts", "D3.js", "Tailwind CSS"],
    imageUrl: "/images/custom-dash.png",
    // githubUrl: "
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp Solutions",
    content:
      "John is an exceptional developer who consistently delivers high-quality code. His attention to detail and problem-solving skills make him a valuable team member.",
    avatar: "/testimonials/sarah.jpg",
    rating: 5,
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "CTO",
    company: "Digital Innovations",
    content:
      "Working with John was a pleasure. He has deep technical knowledge and excellent communication skills. He delivered our project on time and exceeded expectations.",
    avatar: "/testimonials/michael.jpg",
    rating: 5,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Lead Designer",
    company: "StartupXYZ",
    content:
      "John brought our designs to life with pixel-perfect precision. His understanding of modern web technologies and user experience is impressive.",
    avatar: "/testimonials/emily.jpg",
    rating: 5,
  },
];

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/suraj5969",
    icon: GitHubIcon,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/suraj-gupta-50a9ba193/",
    icon: LinkedInIcon,
  },
  {
    name: "Twitter",
    url: "https://x.com/surajgupta_59",
    icon: XIcon,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/suraj.gupta.59/",
    icon: InstagramIcon,
  },
];
