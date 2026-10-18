import {
  CheckCircle,
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
  Link,
  Share2,
} from "lucide-react";

export const LAST_UPDATED = "October 22, 2026";

export const COMPLETED_FEATURES = {
  id: "completed",
  title: "Completed & Achieved",
  icon: CheckCircle,
  color: "#6366F1", // Indigo
  items: [
    {
      icon: ThumbsUp,
      title: "Post Interactions & User Lists",
      description:
        "Seamless mechanism to Spark, Reshare, and Archive posts with dedicated modal inspect lists for Sparks and Reshares.",
    },
    {
      icon: Zap,
      title: "Cross-Tab State Synchronization",
      description:
        "Real-time optimistic interaction state synchronization across Images, Videos, Reshares, and Saved tabs.",
    },
    {
      icon: Link,
      title: "Profile & Post Link Sharing",
      description:
        "Instant shareable URLs for profile and post with standalone post view page and clipboard notifications.",
    },
    {
      icon: Settings,
      title: "Change Email & Password",
      description:
        "Secure & authenticated flow to change Email & Password directly from Settings with real-time validation.",
    },
    {
      icon: MessageSquare,
      title: "Contact Us & Inquiries",
      description:
        "Interactive categorized contact form and My Inquiry page to track admin responses.",
    },
  ],
};

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
          "Secure password reset and forgot password flow with email verification.",
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
        icon: Sparkles,
        title: "Spotlights",
        description:
          "A dedicated short-video feed for fast-paced, engaging content discovery.",
      },
      {
        icon: Trophy,
        title: "Leaderboards",
        description:
          "Global rankings for top posts by impressions and views, top creators, and most-viewed profiles.",
      },
      {
        icon: MessageCircle,
        title: "Comments",
        description:
          "Comment on your favorite posts to interact with fellow creators.",
      },
      {
        icon: FileText,
        title: "Text-Based Feed",
        description:
          "A streamlined feed dedicated to short-form text thoughts and discussions (similar to Twitter).",
      },

      {
        icon: Fingerprint,
        title: "Unique View Tracking",
        description:
          "Tracking 'Unique Views' exclusively once per user along with detailed insights modal showing who viewed profile or posts.",
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
        icon: Globe,
        title: "Advanced SEO",
        description:
          "Dynamic meta tags and server-side optimizations to ensure LookSphere content is easily discoverable.",
      },
    ],
  },
];
