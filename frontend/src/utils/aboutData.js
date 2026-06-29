import {
  Globe,
  Heart,
  Shield,
  Image as ImageIcon,
  Check,
  Code2,
  Server,
  Layers,
  Database,
  Palette,
  Zap,
  Navigation,
  Cloud,
  Upload,
  Lock,
  KeyRound,
  Send,
  Bell,
  Sparkles,
  Rocket,
  FileCheck,
  ShieldCheck,
  FileKey,
} from "lucide-react";

// ── Hero ──
export const ABOUT_HERO = {
  badge: "About Us",
  title: "The Story Behind LookSphere",
  subtitle:
    "A modern, privacy-first social media platform built with passion, powered by the MERN stack, and designed for creators everywhere.",
};

// ── Journey / Timeline ──
export const ABOUT_JOURNEY = [
  {
    step: "01",
    title: "SecureAuth",
    period: "The Beginning",
    description:
      "It all started as a simple React.js authentication practice app with a JSON-server API deployed on Render. Built to learn the fundamentals of React when first starting out.",
    accent: "from-blue-500 to-cyan-400",
  },
  {
    step: "02",
    title: "Going Full-Stack",
    period: "The Upgrade",
    description:
      "As new technologies were learned — Node.js, Express, MongoDB, Mongoose — SecureAuth was upgraded from a simple JSON-server API into a fully-fledged MERN stack web application.",
    accent: "from-purple-500 to-pink-400",
  },
  {
    step: "03",
    title: "LookSphere",
    period: "The Evolution",
    description:
      "\"Why not build something we use every day?\" That thought led to transforming the project into a full social media platform — LookSphere. Upload media, discover posts, and connect globally.",
    accent: "from-emerald-500 to-teal-400",
  },
  {
    step: "04",
    title: "The Future",
    period: "Continuously Evolving",
    description:
      "LookSphere is not a final version — it's a living project that grows with every new skill learned. Real-time chat, OAuth, leaderboards, and much more are on the horizon.",
    accent: "from-amber-500 to-orange-400",
  },
];

// ── Key Features ──
export const ABOUT_FEATURES = [
  {
    icon: Globe,
    title: "Global Community",
    description:
      "Share your passions, discover new interests, and explore a global feed of content from creators around the world.",
    color: "#3B82F6",
  },
  {
    icon: Shield,
    title: "Robust Security",
    description:
      "Passwords hashed via bcrypt (12 salt rounds), JWT stateless sessions, strict CORS policies, and server-side validation at every layer.",
    color: "#10B981",
  },
  {
    icon: ImageIcon,
    title: "Rich Media Handling",
    description:
      "Upload images and videos directly. Media is optimized and stored efficiently using Multer for uploads and Cloudinary for cloud storage.",
    color: "#8B5CF6",
  },
  {
    icon: Heart,
    title: "Advanced UI/UX",
    description:
      "Built with React 19, Tailwind CSS, and native CSS for smooth animations, with a focus on accessibility including alt texts for all media.",
    color: "#EC4899",
  },
  {
    icon: Check,
    title: "Data Integrity",
    description:
      "Strict server-side validation via express-validator and robust client-side form validation via Yup and React Hook Form ensure data quality.",
    color: "#F59E0B",
  },
  {
    icon: Zap,
    title: "Optimized Performance",
    description:
      "Engineered with image optimization, compression delivery, lazy loaded routing, and optimized component renders for lightning-fast speeds.",
    color: "#EF4444",
  },
];

// ── Tech Stack ──
export const ABOUT_TECH_FRONTEND = [
  { name: "React 19", color: "#61DAFB", icon: Code2 },
  { name: "Vite", color: "#BD34FE", icon: Zap },
  { name: "React Router", color: "#F44250", icon: Navigation },
  { name: "Tailwind CSS", color: "#06B6D4", icon: Palette },
  { name: "Axios", color: "#5A29E4", icon: Globe },
  { name: "React Hook Form", color: "#EC5990", icon: FileCheck },
  { name: "Yup", color: "#32B768", icon: Check },
  { name: "Lucide React", color: "#F56565", icon: Sparkles },
  { name: "React Toastify", color: "#FF9900", icon: Bell },
  { name: "React Spinners", color: "#36D7B7", icon: Rocket },
  { name: "HTML5", color: "#E34F26", icon: Globe },
  { name: "CSS3", color: "#1572B6", icon: Palette },
  { name: "JavaScript", color: "#F7DF1E", icon: Code2 },
];

export const ABOUT_TECH_BACKEND = [
  { name: "Node.js", color: "#68A063", icon: Server },
  { name: "Express.js", color: "#6366F1", icon: Layers },
  { name: "MongoDB", color: "#47A248", icon: Database },
  { name: "Mongoose", color: "#880000", icon: Database },
  { name: "JWT", color: "#FB015B", icon: KeyRound },
  { name: "Bcrypt", color: "#3ECF8E", icon: Lock },
  { name: "Cloudinary", color: "#3448C5", icon: Cloud },
  { name: "Multer", color: "#FF6F00", icon: Upload },
  { name: "Nodemailer", color: "#0F9DCE", icon: Send },
  { name: "Express Validator", color: "#E23237", icon: ShieldCheck },
  { name: "Dotenv", color: "#ECD53F", icon: FileKey },
  { name: "Compression", color: "#00F2FE", icon: Zap },
  { name: "CORS", color: "#1A73E8", icon: Shield },
  { name: "Nodemon", color: "#76D04B", icon: Server },
];

// ── Developer ──
export const ABOUT_DEVELOPER = {
  name: "Pranav Shilu",
  role: "Full-Stack Developer",
  bio: "A passionate full-stack developer who built LookSphere as a real-world project to apply and master modern web technologies. What started as a simple authentication exercise evolved into a feature-rich social media platform — all driven by curiosity, persistence, and a love for building things from scratch.",
  quote: "Why not build something we use every day? That's the best way to learn.",
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/PRANAV-SHILU",
      display: "@PRANAV-SHILU",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/pranavshilu/",
      display: "pranavshilu",
    },
    {
      label: "Email",
      href: "mailto:pranavshilu@zohomail.in",
      display: "pranavshilu@zohomail.in",
    },
  ],
};
