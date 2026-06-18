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
} from "lucide-react";

export const socialFeatures = [
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Global Community",
    description:
      "Join a diverse, vibrant community of creators, thinkers, and innovators across the globe.",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Share & Discover",
    description:
      "Share your passions and discover new interests through an intuitive content discovery engine.",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Privacy First",
    description:
      "Your data belongs to you. Advanced security features keep your conversations and content safe.",
  },
];

export const navLinks = [
  { to: "/feed", icon: ImageIcon, label: "Feed" },
  { to: "/explore", icon: Search, label: "Explore" },
  { to: "/creators", icon: Users, label: "Creators" },
];

export const futurePlans = [
  {
    category: "Communication",
    items: [
      { icon: Mail, label: "Contact Us page" },
      { icon: Bell, label: "Live notification page" },
      {
        icon: MessageSquare,
        label: "Admin notes to individual users in notifications",
      },
      { icon: MessageSquare, label: "Detailed FAQ page" },
      { icon: Mail, label: "Mail functionality" },
    ],
  },
  {
    category: "Security & Auth",
    items: [
      { icon: KeyRound, label: "Reset and forgot password" },
      { icon: Shield, label: "Google OAuth" },
      { icon: Fingerprint, label: "Two-step verification" },
    ],
  },
  {
    category: "Community",
    items: [
      {
        icon: Trophy,
        label:
          "Leaderboard — Top posts by views, top creators, most viewed profiles",
      },
      { icon: ThumbsUp, label: "Like, comment, and share profiles & posts" },
      { icon: UserPlus, label: "Follow & unfollow" },
      {
        icon: Bookmark,
        label: "Save posts — view saved posts in your profile",
      },
      { icon: Zap, label: "Live Activity feed" },
      { icon: FileText, label: "Text-based posts feed (like Twitter)" },
      { icon: Trash2, label: "Delete post/user" },
    ],
  },
];

export const howItWorks = [
  {
    icon: <Lock className="w-8 h-8" />,
    step: "01",
    title: "Secure Signup",
    description:
      "Your password is encrypted with 12 salt rounds before hitting our database.",
  },
  {
    icon: <Upload className="w-8 h-8" />,
    step: "02",
    title: "Upload Media",
    description:
      "Share images or videos with custom captions and alt-text for accessibility.",
  },
  {
    icon: <Users className="w-8 h-8" />,
    step: "03",
    title: "Discover & Engage",
    description:
      "Explore the Feed, search for specific users, and see your view counts grow.",
  },
];

export const faqs = [
  {
    question: "Is LookSphere free to use?",
    answer:
      "Yes! LookSphere is completely free to use. We offer all features and a premium experience free for everyone.",
  },
  {
    question: "How do I protect my privacy?",
    answer:
      "We prioritize your privacy. LookSphere never exposes your sensitive info—our backend strictly strips out hashed passwords before sending data. We also enforce strict CORS origin policies to block unauthorized websites from accessing the API.",
  },
  {
    question: "How is my password stored?",
    answer:
      "We never store plain text passwords. We utilize bcrypt with 12 computational salt rounds to hash your password securely before it is ever saved to our database.",
  },
  {
    question: "Are my login sessions secure?",
    answer:
      "Yes! We use stateless JSON Web Tokens (JWT) configured to expire after 1 year. Your token is generated uniquely using a secret key on our server, ensuring tamper-proof authentication.",
  },
  {
    question: "Can I use LookSphere on mobile?",
    answer:
      "Absolutely! LookSphere is fully responsive and works seamlessly on all devices - desktop, tablet, and mobile.",
  },
  {
    question: "How do I report inappropriate content?",
    answer:
      "You can report to us on the contact page and we will look into it as soon as possible. You will receive an answer on the notification page.",
  },
];

export const capabilities = [
  {
    id: "post",
    label: "Post & Share",
    icon: ImageIcon,
    title: "Express Yourself",
    description:
      "Share your photos, thoughts, and moments with the community. Add captions, alt text for accessibility, and let your creativity shine.",
    features: [
      "Upload photos & media",
      "Write captions & stories",
      "Add alt text for accessibility",
      "Reach a global audience",
      "Real-time post view counts",
    ],
  },
  {
    id: "explore",
    label: "Explore & Discover",
    icon: Search,
    title: "Never Miss a Thing",
    description:
      "Browse a global feed of posts, discover new users, and Explore page for all new posts.",
    features: [
      "Global post feed",
      "Smart search & filters",
      "Discover new creators",
      "Curated recommendations",
    ],
  },
  {
    id: "connect",
    label: "Secure Profile",
    icon: Shield,
    title: "Data Protected",
    description:
      "Manage your profile image, custom tagline, and bio. Your session is protected by a 1-year expiration JWT token and strict CORS policies.",
    features: [
      "JWT stateless sessions",
      "Bcrypt password hashing",
      "Profile view tracking",
      "Express Validator inputs",
    ],
  },
];

export const activities = [
  {
    user: "Alex",
    action: "shared a new photo",
    time: "2m ago",
    icon: ImageIcon,
  },
  {
    user: "Sarah",
    action: "joined LookSphere",
    time: "5m ago",
    icon: UserPlus,
  },
  {
    user: "James",
    action: "updated their profile",
    time: "8m ago",
    icon: User,
  },
  {
    user: "Emily",
    action: "explored trending posts",
    time: "12m ago",
    icon: Search,
  },
  {
    user: "Michael",
    action: "shared a new photo",
    time: "15m ago",
    icon: ImageIcon,
  },
  {
    user: "Sophie",
    action: "joined LookSphere",
    time: "18m ago",
    icon: UserPlus,
  },
  {
    user: "Daniel",
    action: "viewed the explore page",
    time: "22m ago",
    icon: Eye,
  },
  {
    user: "Olivia",
    action: "updated their profile",
    time: "25m ago",
    icon: User,
  },
];

export const securityFeatures = [
  {
    icon: Lock,
    name: "Bcrypt",
    purpose: "Password Hashing",
    description:
      "All user passwords are hashed with bcrypt using 12 salt rounds before storage. Plain-text passwords are never saved.",
    where: "Backend — User registration & login",
  },
  {
    icon: KeyRound,
    name: "JSON Web Tokens",
    purpose: "Authentication",
    description:
      "Stateless JWT tokens are issued on login and verified on every protected route to ensure secure, session-free authentication.",
    where: "Backend — Authentication & Authorization",
  },
  {
    icon: Shield,
    name: "CORS",
    purpose: "Cross-Origin Protection",
    description:
      "Strict CORS policies ensure only trusted origins can communicate with the API, preventing cross-site request attacks.",
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
      "Schema-based form validation ensures user input is validated before it even reaches the server, providing instant feedback.",
    where: "Frontend — Login, Register & Edit Profile forms",
  },
  {
    icon: Eye,
    name: "Dotenv",
    purpose: "Secret Management",
    description:
      "All sensitive configuration — API keys, database URIs, JWT secrets — are stored in environment variables, never in source code.",
    where: "Backend — Server configuration",
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
  { name: "Nodemailer", color: "#0F9DCE", icon: Send },
  { name: "Framer Motion", color: "#FF0055", icon: Rocket },
  { name: "React Spinners", color: "#36D7B7", icon: Rocket },
  { name: "React Toastify", color: "#FF9900", icon: Bell },
  { name: "Lucide React", color: "#F56565", icon: Sparkles },
  { name: "CORS", color: "#1A73E8", icon: Shield },
];

export const fakePosts = [
  {
    id: 1,
    author: "Alex",
    avatarColors: "from-blue-400 to-purple-500",
    mediaColors: "from-blue-500/20 to-purple-500/20",
    mediaType: "Image",
    views: "128",
    date: "Oct 24, 10:30 AM",
    caption:
      "Just captured this amazing sunset over the city skyline. The colors are incredible! 🌇✨",
    rotation: -1,
    hiddenOnMobile: false,
  },
  {
    id: 2,
    author: "Sarah",
    avatarColors: "from-emerald-400 to-cyan-500",
    mediaColors: "from-emerald-500/20 to-cyan-500/20",
    mediaType: "Video",
    views: "2,451",
    date: "Oct 24, 02:15 PM",
    caption:
      "A quick vlog from today's hiking adventure. Nature is simply the best therapy. 🌲🏔️",
    rotation: 1,
    hiddenOnMobile: false,
  },
  {
    id: 3,
    author: "Rahul",
    avatarColors: "from-orange-400 to-rose-500",
    mediaColors: "from-orange-500/20 to-rose-500/20",
    mediaType: "Video",
    views: "89",
    date: "Oct 23, 08:45 PM",
    caption:
      "First time trying out this new recipe. It turned out absolutely delicious! 🍳🥗",
    rotation: -1,
    hiddenOnMobile: true,
  },
  {
    id: 4,
    author: "Priya",
    avatarColors: "from-violet-400 to-fuchsia-500",
    mediaColors: "from-violet-500/20 to-fuchsia-500/20",
    mediaType: "Image",
    views: "512",
    date: "Oct 23, 11:12 AM",
    caption: "Coffee breaks are mandatory for survival. Who agrees? ☕💻",
    rotation: 1,
    hiddenOnMobile: true,
  },
];
