import {
  Shield,
  Globe,
  Heart,
  Image as ImageIcon,
  Search,
  Users,
  Rocket,
  Mail,
  Bell,
  MessageSquare,
  Trophy,
  KeyRound,
  Fingerprint,
  ThumbsUp,
  UserPlus,
  Bookmark,
  Trash2,
  Sparkles,
  User,
  Eye,
  Lock,
  Upload,
  Code2,
  Server,
  Layers,
  Database,
  Palette,
  Zap,
  Navigation,
  Cloud,
  FileCheck,
  Check,
  Send,
  ShieldCheck,
  FileKey,
  FileText,
  Compass,
  Info,
  ShieldAlert,
  HelpCircle,
  Cpu,
  Shuffle,
  RefreshCw,
  Binary,
  Sliders,
  Repeat2,
  Wifi,
  Inbox,
  Play,
  Film,
  Link as LinkIcon,
  CheckCircle2,
  LifeBuoy,
  Settings,
} from "lucide-react";

export const socialFeatures = [
  
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Global Discovery & Creators",
    description:
      "Explore curated public feeds, find creators worldwide, track your profile views, and share direct one-click links to posts and profiles.",
  },
  
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Sparks, Reshares & Archives",
    description:
      "Engage with posts using instant Sparks, broadcast favorites to your profile with Reshares, and organize private bookmarks in your personal Archive.",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Privacy First",
    description:
      "Your data belongs to you. Zero tracking cookies, encrypted credentials, and transparent data policies keep your content and account safe.",
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    title: "Dedicated Support & Inquiries",
    description:
      "Submit categorized tickets with photo or video attachments for feedback, bugs, or questions, and track admin responses live on My Inquiries.",
  },
];

export const navLinks = [
  { to: "/feed", icon: ImageIcon, label: "Feed" },
  { to: "/explore", icon: Search, label: "Explore" },
  { to: "/creators", icon: Users, label: "Creators" },
];

export const howItWorks = [
  {
    icon: <Lock className="w-8 h-8" />,
    step: "01",
    title: "Secure Onboarding",
    description:
      "Create your account in seconds with 12-round bcrypt password hashing and customize your unique profile tagline and bio.",
  },
  {
    icon: <Upload className="w-8 h-8" />,
    step: "02",
    title: "Publish Rich Media",
    description:
      "Share high-resolution images or videos with custom captions, accessibility alt-text, and zero-layout-shift rendering.",
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    step: "03",
    title: "Spark, Reshare & Engage",
    description:
      "Show appreciation with Sparks, reshare standout posts, inspect who reacted in live modals, and track views in real-time.",
  },
];

export const capabilities = [
  {
    id: "post",
    label: "Post & Share",
    icon: ImageIcon,
    title: "Express Yourself With Media",
    description:
      "Share high-resolution photos and videos with smooth playback, custom captions, and accessible alt-text for global audiences.",
    features: [
      "High-definition photo & video uploads",
      "Scroll-synchronized video autoplay",
      "Custom captions & accessibility alt text",
      "Real-time post impression counters",
    ],
  },
  {
    id: "interactions",
    label: "Sparks & Reshares",
    icon: Sparkles,
    title: "Next-Gen Engagement",
    description:
      "Engage with content on a deeper level. Spark posts to show gratitude, reshare standout work to your followers, and save bookmarks in your private archive.",
    features: [
      "Instant Sparks with private profile tab",
      "1-click Reshares directly to your profile",
      "Private bookmarks in your Archive tab",
      "'See Who Reacted' live user list modal",
      "Instant cross-tab interaction synchronization",
    ],
  },
  {
    id: "explore",
    label: "Explore & Creators",
    icon: Search,
    title: "Global Discovery Engine",
    description:
      "Discover trending posts, explore new creators worldwide, track your profile views, and share direct links to profiles and posts.",
    features: [
      "Dynamic global exploration feed",
      "Filtered Creators directory search",
      "1-click shareable profile & post URLs",
      "Unique view counting & insights",
      "Unseen-first feed prioritization",
    ],
  },
  {
    id: "support",
    label: "Support & Inquiries",
    icon: MessageSquare,
    title: "Direct Support & Ticket Tracking",
    description:
      "Submit categorized inquiries with image or video attachments and follow admin resolution notes directly on your My Inquiries dashboard.",
    features: [
      "Dynamic categorized contact form",
      "Attach screenshot or video attachments",
      "Dedicated My Inquiries tracking dashboard",
      "Pending & Responded status filter toggler",
      "Direct admin resolution notes & replies",
    ],
  },
];

export const activities = [
  {
    user: "Pranav",
    action: "sparked a travel photograph",
    time: "2m ago",
    icon: Sparkles,
  },
  {
    user: "Sara",
    action: "reshared an adventure vlog",
    time: "5m ago",
    icon: Repeat2,
  },
  {
    user: "James",
    action: "updated their profile",
    time: "8m ago",
    icon: User,
  },
  {
    user: "Alex",
    action: "added their feedback",
    time: "12m ago",
    icon: Search,
  },  
  {
    user: "John",
    action: "Joined LookSphere",
    time: "12m ago",
    icon: UserPlus,
  },
];

export const securityFeatures = [
    {
    icon: ShieldCheck,
    name: "Zero-Vulnerability Audited Stack",
    purpose: "Dependency Integrity",
    description:
      "End-to-end vulnerability audit across both Frontend and Backend, ensuring 0 audit vulnerabilities and strict CORS request controls.",
    where: "Full Stack — packages & API gateway",
  },
  {
    icon: Lock,
    name: "Bcrypt Hashing (12 Rounds)",
    purpose: "Credential Security",
    description:
      "All user passwords are hashed using bcrypt with 12 computational salt rounds before being stored. Plaintext passwords are never logged or stored.",
    where: "Backend — Authentication module",
  },  
  {
    icon: KeyRound,
    name: "JSON Web Tokens",
    purpose: "Stateless Authentication",
    description:
      "Cryptographically signed JWT tokens are issued and validated on protected endpoints, enabling stateless, cookie-free, and tamper-proof sessions.",
    where: "Full Stack — middlewares & API client",
  },
    {
    icon: Shield,
    name: "CORS",
    purpose: "Cross-Origin Protection",
    description:
      "Strict CORS policies ensure only trusted origins can communicate with the API, preventing cross-site attacks.",
    where: "Backend — Express middleware",
  },
  {
    icon: Check,
    name: "Express Validator",
    purpose: "Server-Side Validation",
    description:
      "All incoming request data is validated and sanitized on the server to prevent injection attacks and malformed data.",
    where: "Backend — Route handlers & middleware",
  },
  {
    icon: Fingerprint,
    name: "Yup + React Hook Form",
    purpose: "Client-Side Validation",
    description:
      "Schema-based validation ensures input is validated before it reaches the server, providing instant feedback.",
    where: "Frontend — Everywhere",
  },

];

export const techStack = [
  { name: "React", color: "#61DAFB", icon: Code2 },
  { name: "Node.js", color: "#68A063", icon: Server },
  { name: "Express", color: "#6366F1", icon: Layers },
  { name: "MongoDB", color: "#47A248", icon: Database },
  { name: "Mongoose", color: "#880000", icon: Database },
  { name: "Tailwind CSS", color: "#06B6D4", icon: Palette },
  { name: "HTML5", color: "#E34F26", icon: Globe },
  { name: "CSS3", color: "#1572B6", icon: Palette },
  { name: "JavaScript", color: "#F7DF1E", icon: Code2 },
  { name: "Vite", color: "#BD34FE", icon: Zap },
  { name: "React Router", color: "#F44250", icon: Navigation },
  { name: "JWT", color: "#FB015B", icon: KeyRound },
  { name: "Bcrypt", color: "#3ECF8E", icon: Lock },
  { name: "Axios", color: "#5A29E4", icon: Globe },
  { name: "Cloudinary", color: "#3448C5", icon: Cloud },
  { name: "Multer", color: "#FF6F00", icon: Upload },
  { name: "Yup", color: "#32B768", icon: Check },
  { name: "React Hook Form", color: "#EC5990", icon: FileCheck },
  { name: "Express Validator", color: "#E23237", icon: ShieldCheck },
  { name: "Dotenv", color: "#ECD53F", icon: FileKey },
  { name: "React Spinners", color: "#36D7B7", icon: Rocket },
  { name: "React Toastify", color: "#FF9900", icon: Bell },
  { name: "Lucide React", color: "#F56565", icon: Sparkles },
  { name: "CORS", color: "#1A73E8", icon: Shield },
  { name: "Compression", color: "#00F2FE", icon: Zap },
  { name: "Nodemon", color: "#76D04B", icon: Server },
  { name: "Brotli Compression", color: "#00F2FE", icon: Cpu },
  { name: "Fisher-Yates Shuffle", color: "#EC4899", icon: Shuffle },
  { name: "IntersectionObserver", color: "#3B82F6", icon: Eye },
  { name: "Vectorized Batch Scan", color: "#10B981", icon: Database },
  { name: "Optimistic State Sync", color: "#F59E0B", icon: RefreshCw },
  { name: "Time-Decay Debounce", color: "#8B5CF6", icon: Sliders },
  { name: "Single-Active Viewport", color: "#6366F1", icon: Layers },
  { name: "Covered B-Tree Indexes", color: "#34D399", icon: Binary },
  { name: "Micro-Batch Ingestion", color: "#38BDF8", icon: Zap },
  { name: "Offline Cache & Fallback", color: "#10B981", icon: Wifi },
  { name: "Zero-Vulnerability Audited", color: "#34D399", icon: ShieldCheck },
];

export const fakePosts = [
  {
    id: 1,
    author: "Alex Rivers",
    avatarColors: "from-blue-400 to-purple-500",
    mediaColors: "from-blue-500/20 to-purple-500/20",
    mediaType: "Image",
    impressions: "1,248",
    sparks: "142",
    reshares: "28",
    isSparked: true,
    isReshared: true,
    isArchived: true,
    date: "Just now",
    caption:
      "Golden hour overlooking the skyline. LookSphere's new zero-layout-shift feed makes browsing visuals so fluid! 🌇✨",
    rotation: -1,
    hiddenOnMobile: false,
  },
  {
    id: 2,
    author: "Sarah Chen",
    avatarColors: "from-emerald-400 to-cyan-500",
    mediaColors: "from-emerald-500/20 to-cyan-500/20",
    mediaType: "Video",
    impressions: "3,890",
    sparks: "419",
    reshares: "85",
    isSparked: true,
    isReshared: true,
    isArchived: false,
    date: "12m ago",
    caption:
      "Quick cinematic vlog from today's mountain trek. Single-active scroll autoplay works like a charm! 🌲🏔️",
    rotation: 1,
    hiddenOnMobile: false,
  },
  {
    id: 3,
    author: "Rahul Patel",
    avatarColors: "from-orange-400 to-rose-500",
    mediaColors: "from-orange-500/20 to-rose-500/20",
    mediaType: "Video",
    impressions: "945",
    sparks: "98",
    reshares: "14",
    isSparked: false,
    isReshared: false,
    isArchived: false,
    date: "1h ago",
    caption:
      "Testing the new support desk for a feature suggestion. The admin reply arrived on My Inquiries super fast! ☕💻",
    rotation: -1,
    hiddenOnMobile: true,
  },
  {
    id: 4,
    author: "Priya Sharma",
    avatarColors: "from-violet-400 to-fuchsia-500",
    mediaColors: "from-violet-500/20 to-fuchsia-500/20",
    mediaType: "Image",
    impressions: "2,104",
    sparks: "263",
    reshares: "51",
    isSparked: true,
    isReshared: false,
    isArchived: true,
    date: "3h ago",
    caption:
      "Tapped the sparks count to see who reacted to my previous post — loving the interactive user list modal! 🎨💖",
    rotation: 1,
    hiddenOnMobile: true,
  },
];

export const releasesAndVisionData = [
  {
    title: "What's New in LookSphere",
    description:
      "Explore the latest features: Sparks, Reshares, Support & Inquiry Desk, and our Nov 2026 Offline Resilience release.",
    link: "/whats-new",
    icon: Sparkles,
    color: "#f59e0b",
    badge: "Latest Release",
  },
  {
    title: "Platform Roadmap",
    description:
      "Get a live look at completed milestones and upcoming developments like real-time messaging, Spotlights, and Google OAuth.",
    link: "/roadmap",
    icon: Compass,
    color: "#3b82f6",
    badge: "Milestones",
  },
  {
    title: "About Us & Story",
    description:
      "Discover our mission, architecture, and the story of how developer Pranav Shilu built LookSphere from the ground up.",
    link: "/about-us",
    icon: Info,
    color: "#a855f7",
    badge: "Our Story",
  },
];

export const supportAndPoliciesData = [
  {
    title: "Contact Us",
    description: "Get in touch with us for support, inquiries, feature suggestions, or direct feedback.",
    link: "/contact-us",
    icon: MessageSquare,
    color: "#06b6d4",
    badge: "Support Desk",
    actionText: "Click to Contact Us",
  },
  {
    title: "My Inquiries",
    description:
      "Track your submitted inquiry tickets and view direct admin replies in real time.",
    link: "/my-inquiries",
    icon: Inbox,
    color: "#8b5cf6",
    badge: "Ticket Portal",
    actionText: "Track Inquiries",
  },
  {
    title: "Help & FAQ",
    description:
      "Browse our comprehensive FAQ for quick answers regarding accounts, security, and privacy.",
    link: "/faq",
    icon: HelpCircle,
    color: "#10b981",
    badge: "Knowledge Base",
    actionText: "Browse FAQs",
  },
  {
    title: "Privacy Policy",
    description:
      "Learn how we protect your information, uphold a strict no-tracking policy, and secure media.",
    link: "/privacy-policy",
    icon: ShieldAlert,
    color: "#f43f5e",
    badge: "Data Privacy",
    actionText: "Read Privacy Policy",
  },
  {
    title: "Terms & Conditions",
    description:
      "Review community rules, policies, and legal guidelines governing your use of LookSphere.",
    link: "/terms-and-conditions",
    icon: FileText,
    color: "#6366f1",
    badge: "Terms of Use",
    actionText: "Read Terms & Conditions",
  },
  {
    title: "Account Settings",
    description:
      "Manage credentials, update account email & password, and control your active sessions.",
    link: "/settings",
    icon: Settings,
    color: "#ec4899",
    badge: "Account Hub",
    actionText: "Manage Account Settings",
  },
];
