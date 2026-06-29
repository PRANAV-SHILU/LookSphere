import {
  Shield,
  KeyRound,
  Fingerprint,
  Mail,
  Bell,
  MessageSquare,
  MessageCircle,
  Sparkles,
  Trophy,
  ThumbsUp,
  UserPlus,
  Bookmark,
  Zap,
  FileText,
  Trash2,
  Database,
  BarChart3,
  Search,
  Globe,
  Settings,
} from "lucide-react";

export const ROADMAP_CATEGORIES = [
  {
    id: "security",
    title: "Security & Authentication",
    icon: Shield,
    color: "#10B981", // Emerald
    items: [
      {
        icon: KeyRound,
        title: "Password Recovery",
        description:
          "Secure password reset and forgot password flow utilizing Nodemailer for email verification.",
      },
      {
        icon: Globe,
        title: "Google OAuth",
        description:
          "Seamless one-click sign-up and login via Google integration.",
      },
      {
        icon: Fingerprint,
        title: "Two-Step Verification",
        description:
          "Enhanced account security through 2FA/MFA implementation.",
      },
    ],
  },
  {
    id: "communication",
    title: "Communication & Support",
    icon: MessageCircle,
    color: "#3B82F6", // Blue
    items: [
      {
        icon: MessageSquare,
        title: "Real-time Chat",
        description:
          "Instant messaging between users powered by WebSockets for a seamless experience.",
      },
      {
        icon: Bell,
        title: "Advanced Notifications",
        description:
          "A dedicated live notification page and modal with read/unread states, including direct admin notes/responses.",
      },
      {
        icon: Mail,
        title: "Email Integrations",
        description:
          "General mail sending functionality for updates, reports, and administrative alerts.",
      },
      {
        icon: MessageCircle,
        title: "Dynamic Contact Forms",
        description:
          "New modal-based contact forms with categorized dropdowns (support, suggestions) synced to the admin panel.",
      },
    ],
  },
  {
    id: "community",
    title: "Community & Engagement",
    icon: Sparkles,
    color: "#8B5CF6", // Violet
    items: [
      {
        icon: UserPlus,
        title: "Follow System",
        description:
          "Build your network by following favorite creators and curating your personalized feed.",
      },
      {
        icon: ThumbsUp,
        title: "Post Interactions",
        description:
          "Comprehensive mechanics to like, comment, and seamlessly share profiles and posts using next-share integration.",
      },
      {
        icon: Sparkles,
        title: "Spotlights",
        description:
          "A dedicated short-video feed for fast-paced, engaging content discovery.",
      },
      {
        icon: Trophy,
        title: "Leaderboards",
        description:
          "Global rankings for top posts by views, top creators, and most-viewed profiles.",
      },
      {
        icon: Bookmark,
        title: "Saved Posts",
        description:
          "Save your favorite posts and organize them in a private collection on your profile.",
      },
      {
        icon: FileText,
        title: "Text-Based Feed",
        description:
          "A streamlined feed dedicated to short-form text thoughts and discussions (similar to Twitter).",
      },
      {
        icon: Search,
        title: "Who Viewed Modal",
        description:
          "Detailed insights modal showing exactly which users viewed your profile or posts.",
      },
    ],
  },
  {
    id: "performance",
    title: "Performance & Core",
    icon: Zap,
    color: "#F59E0B", // Amber
    items: [
      {
        icon: Zap,
        title: "Optimistic UI",
        description:
          "Background operations for media uploads and post edits, ensuring the UI never blocks your workflow.",
      },
      {
        icon: Database,
        title: "Data Management",
        description:
          "Complete cascading deletion functionality for posts and accounts across the database and Cloudinary.",
      },
      {
        icon: Globe,
        title: "Advanced SEO",
        description:
          "Dynamic meta tags and server-side optimizations to ensure LookSphere content is easily discoverable.",
      },
      {
        icon: BarChart3,
        title: "Admin Dashboard",
        description:
          "Comprehensive metrics, ticket management, and user analytics visualized with react-charts.",
      },
      {
        icon: Settings,
        title: "Feed Optimization",
        description:
          "Infinite scrolling and optimized post fetching in profiles, aligning with Explore and Feed logic.",
      },
      {
        icon: Fingerprint,
        title: "Unique View Tracking",
        description:
          "Transitioning from basic impression counts to tracking unique 'Original Views' exclusively once per user.",
      },
    ],
  },
];
