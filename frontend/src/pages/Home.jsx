import { NavLink, useRouteLoaderData } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { useState } from "react";
import { Home as HomeAnimation } from "../utils/animation";
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
  MessageCircle,
  Share2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const socialFeatures = [
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

const navLinks = [
  { to: "/feed", icon: ImageIcon, label: "Feed" },
  { to: "/explore", icon: Search, label: "Explore" },
  { to: "/users", icon: Users, label: "Users" },
];

const futurePlans = [
  {
    category: "Communication",
    items: [
      { icon: Mail, label: "Contact us page" },
      { icon: Bell, label: "Personal notification page" },
      { icon: MessageSquare, label: "Admin notes to individual user in notification" },
      { icon: Mail, label: "Mail functionality" },
    ],
  },
  {
    category: "Security & Auth",
    items: [
      { icon: KeyRound, label: "Reset and forget password" },
      { icon: Shield, label: "Google OAuth" },
      { icon: Fingerprint, label: "Two step verification" },
    ],
  },
  {
    category: "Community",
    items: [
      {
        icon: Trophy,
        label: "Leaderboard — Top Posts by Views, highest post creator, highest profile view",
      },
      { icon: ThumbsUp, label: "Like, comments, share profile & post" },
      { icon: UserPlus, label: "Follow & unfollow" },
      { icon: Bookmark, label: "Save posts — view saved posts in profile" },
      { icon: Trash2, label: "Delete post/user" },
      { icon: Sparkles, label: "SEO" },
    ],
  },
];

const howItWorks = [
  {
    icon: <User className="w-8 h-8" />,
    step: "01",
    title: "Create",
    description: "Sign up and build your profile in seconds.",
  },
  {
    icon: <MessageCircle className="w-8 h-8" />,
    step: "02",
    title: "Share",
    description: "share your thoughts, and engage with the community.",
  },
  {
    icon: <Share2 className="w-8 h-8" />,
    step: "03",
    title: "Discover",
    description: "Explore trending content and discover new interests.",
  },
];

const faqs = [
  {
    question: "Is LookSphere free to use?",
    answer: "Yes! LookSphere is completely free to use. We offer premium features for power users, but the core experience is free for everyone.",
  },
  {
    question: "How do I protect my privacy?",
    answer: "We prioritize your privacy with advanced security features. You control who sees your content, and your data is never sold to third parties.",
  },
  {
    question: "Can I use LookSphere on mobile?",
    answer: "Absolutely! LookSphere is fully responsive and works seamlessly on all devices - desktop, tablet, and mobile.",
  },
  {
    question: "How do I report inappropriate content?",
    answer: "We have robust moderation tools. Simply click the report button on any content, and our team will review it promptly.",
  },
];

const CARD_HOVER =
  "group relative isolate z-0 overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-(--primary-500) hover:shadow-[0_8px_24px_rgba(37,99,235,0.08)] dark:hover:shadow-[0_8px_24px_rgba(59,130,246,0.12)]";

const CARD_HOVER_SUBTLE =
  "group relative isolate z-0 overflow-hidden transition-all duration-300 hover:border-(--primary-500) hover:shadow-[0_8px_24px_rgba(37,99,235,0.08)] dark:hover:shadow-[0_8px_24px_rgba(59,130,246,0.12)]";

const CARD_SURFACE_STYLE = {
  backgroundColor: "var(--surface-card)",
  boxShadow: "var(--shadow-card)",
};

const BTN_LINK =
  "btn px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]";

function CardGlow() {
  return (
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 pointer-events-none blur-md"
      style={{ background: "linear-gradient(135deg, var(--primary-500), transparent)" }}
    />
  );
}

export default function Home() {
  const user = useRouteLoaderData("root");
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <Motion.section
      className="relative z-0 flex flex-col items-center w-full gap-12 sm:gap-16 mt-4 sm:mt-8 pb-8"
      {...HomeAnimation.pageTransition}
    >
      {/* Hero */}
      <Motion.div
        className={`card w-full max-w-4xl mx-auto text-center p-6 sm:p-10 md:p-12 border border-(--border-normal) ${CARD_HOVER_SUBTLE}`}
        style={CARD_SURFACE_STYLE}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <CardGlow />
        <div className="relative">
          <Motion.h1
          className="hero-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 tracking-tight"
          {...HomeAnimation.h1}
        >
          LookSphere
        </Motion.h1>
        <Motion.h2
          className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-(--text-secondary)"
          {...HomeAnimation.h2}
        >
          Connect. Share. Discover.
        </Motion.h2>
        <Motion.p
          className="text-base sm:text-lg text-(--text-muted) max-w-2xl mx-auto mb-8"
          {...HomeAnimation.p}
        >
          Welcome to the future of social networking. Experience a platform designed for
          meaningful connections, creative expression, and global community.
        </Motion.p>

        {!user && (
          <Motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <NavLink to="/register" className={`${BTN_LINK} btn-primary`}>
              Get Started Free
            </NavLink>
            <NavLink to="/login" className={`${BTN_LINK} btn-secondary`}>
              Sign In
            </NavLink>
          </Motion.div>
        )}

        <Motion.div
          className="tab-container mx-auto mt-8 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {navLinks.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `tab-btn flex items-center gap-2 py-2 px-4 sm:px-5 text-sm sm:text-base no-underline transition-all duration-200 hover:scale-[1.02] ${
                  isActive ? "active" : ""
                }`
              }
            >
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </Motion.div>
        </div>
      </Motion.div>

      {/* Why LookSphere? */}
      <div className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12">
        <Motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="hero-text">Why LookSphere?</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-(--text-muted) max-w-3xl mx-auto">
            Discover what makes our platform different and how we&apos;re revolutionizing social
            connections.
          </p>
        </Motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {socialFeatures.map((feature, index) => (
            <Motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${CARD_HOVER} flex flex-col h-full p-6 sm:p-8 rounded-2xl border border-(--border-normal)`}
              style={CARD_SURFACE_STYLE}
            >
              <CardGlow />
              <div
                className="relative mb-4 w-14 h-14 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105 border-2 border-transparent group-hover:border-(--primary-500)"
                style={{ backgroundColor: "var(--surface-input)" }}
              >
                <span
                  className="transition-colors duration-300 group-hover:text-(--primary-600)"
                  style={{ color: "var(--primary-500)" }}
                >
                  {feature.icon}
                </span>
              </div>

              <h3 className="relative text-xl sm:text-2xl font-bold mb-2 text-(--text-primary) group-hover:text-(--primary-600) transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="relative text-sm sm:text-base text-(--text-muted)">
                {feature.description}
              </p>
            </Motion.div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12">
        <Motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="hero-text">How It Works</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-(--text-muted) max-w-3xl mx-auto">
            Get started in three simple steps and join our growing community.
          </p>
        </Motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {howItWorks.map((step, index) => (
            <Motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${CARD_HOVER} flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl border border-(--border-normal)`}
              style={CARD_SURFACE_STYLE}
            >
              <CardGlow />
              <div
                className="relative mb-4 w-16 h-16 flex items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-105 border-2 border-transparent group-hover:border-(--primary-500)"
                style={{ backgroundColor: "var(--surface-input)" }}
              >
                <span
                  className="transition-colors duration-300 group-hover:text-(--primary-600)"
                  style={{ color: "var(--primary-500)" }}
                >
                  {step.icon}
                </span>
              </div>
              <span className="text-4xl font-bold mb-2 text-(--primary-500)">{step.step}</span>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-(--text-primary)">
                {step.title}
              </h3>
              <p className="text-sm sm:text-base text-(--text-muted)">
                {step.description}
              </p>
            </Motion.div>
          ))}
        </div>
      </div>

      {/* Future Plans */}
      <div className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12">
        <Motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Rocket
            className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4"
            style={{ color: "var(--primary-500)" }}
          />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="hero-text">Future Plans</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-(--text-muted) max-w-3xl mx-auto">
            We&apos;re constantly evolving. Here&apos;s what&apos;s coming next to LookSphere.
          </p>
        </Motion.div>

        <div className="flex flex-col gap-8 max-w-5xl mx-auto">
          <Motion.div
            className="card w-full p-6 sm:p-8 border border-(--border-normal)"
            style={CARD_SURFACE_STYLE}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col gap-8">
          {futurePlans.map((group, groupIndex) => (
            <Motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIndex * 0.1 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-(--text-primary)">
                {group.category}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {group.items.map((item) => (
                  <li
                    key={item.label}
                    className={`${CARD_HOVER} flex items-center gap-3 rounded-xl p-4 border border-(--border-normal) text-sm sm:text-base`}
                    style={CARD_SURFACE_STYLE}
                  >
                    <CardGlow />
                    <div
                      className="relative shrink-0 w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-105 border-2 border-transparent group-hover:border-(--primary-500)"
                      style={{ backgroundColor: "var(--surface-input)" }}
                    >
                      <item.icon
                        size={18}
                        className="transition-colors duration-300 group-hover:text-(--primary-600)"
                        style={{ color: "var(--primary-500)" }}
                      />
                    </div>
                    <span className="relative text-(--text-secondary) group-hover:text-(--primary-600) transition-colors duration-300">
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </Motion.div>
          ))}
            </div>
          </Motion.div>
        </div>
      </div>
    </Motion.section>
  );
}
