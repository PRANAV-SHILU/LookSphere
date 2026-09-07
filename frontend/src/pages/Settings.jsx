import { useState } from "react";
import { useRouteLoaderData, useNavigate, Navigate } from "react-router-dom";
import {
  Settings as SettingsIcon,
  User,
  Shield,
  Palette,
  Lock,
  Mail,
  Trash2,
  Download,
  Eye,
  Sun,
  UserX,
  Search,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import BackButton from "../shared-components/BackButton";

const SETTINGS_SECTIONS = [
  {
    key: "account",
    label: "Account",
    showBadge: true,
    description: "Manage your email, password, and account data",
    icon: User,
    color: "var(--primary-500)",
    bg: "var(--primary-50)",
    subItems: [
      {
        key: "update-email",
        label: "Update Email",
        showBadge: true,
        description: "Change the email linked to your account",
        icon: Mail,
      },
      {
        key: "change-password",
        label: "Change Password",
        showBadge: true,
        description: "Update your current password",
        icon: Lock,
      },
    ],
  },
  {
    key: "privacy",
    label: "Privacy & Security",
    description: "Control who can see your content and data",
    icon: Shield,
    color: "#8b5cf6",
    bg: "#f5f3ff",
    subItems: [
      {
        key: "profile-visibility",
        label: "Profile Visibility",
        description: "Set your profile to public or private",
        icon: Eye,
      },
    ],
  },
  {
    key: "appearance",
    label: "Appearance",
    description: "Customize theme, layout, and display",
    icon: Palette,
    color: "#ec4899",
    bg: "#fdf2f8",
    subItems: [
      {
        key: "theme-selection",
        label: "Theme Selection",
        description: "Switch between light and dark mode",
        icon: Sun,
      },
    ],
  },
  {
    key: "danger",
    label: "Account Deactivation",
    description: "Deactivate or permanently delete your account",
    icon: Trash2,
    color: "#ef4444",
    bg: "#fef2f2",
    subItems: [
      {
        key: "deactivate-account",
        label: "Deactivate Account",
        description: "Temporarily deactivate your account for a period of time",
        icon: UserX,
        isDestructive: true,
      },
      {
        key: "delete-account",
        label: "Delete Account",
        description: "Permanently delete your account and all data",
        icon: Trash2,
        isDestructive: true,
      },
    ],
  },
];

export default function Settings() {
  useDocumentMetadata("Settings", "Manage your LookSphere account settings. Change your email, update your password, adjust privacy controls, and customize application preferences for a tailored social experience built by Pranav Shilu.", true);
  const user = useRouteLoaderData("root");
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const toggleSection = (key) => {
    setExpandedSection((prev) => (prev === key ? null : key));
  };

  const filteredSections = SETTINGS_SECTIONS.map((section) => {
    const query = searchQuery.toLowerCase();
    const matchesSection =
      section.label.toLowerCase().includes(query) ||
      section.description.toLowerCase().includes(query);

    if (matchesSection) return section;

    const matchedSubItems =
      section.subItems?.filter(
        (sub) =>
          sub.label.toLowerCase().includes(query) ||
          sub.description.toLowerCase().includes(query)
      ) || [];

    if (matchedSubItems.length > 0) {
      return { ...section, subItems: matchedSubItems };
    }
    return null;
  }).filter(Boolean);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-3xl lg:max-w-4xl 2xl:max-w-5xl px-3 xsm:px-4 md:px-8 pt-8 pb-20">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-8">
          <BackButton />
          <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400">
            Settings
          </span>
        </div>

        {/* Title */}
        <div className="text-center mb-10 flex flex-col items-center">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
            style={{
              backgroundColor: "var(--primary-50)",
              color: "var(--primary-600)",
            }}
          >
            <SettingsIcon size={24} />
          </div>
          <h1
            className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            Settings
          </h1>
          <p
            className="text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Manage your account preferences, privacy, and personalization.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-md mx-auto mt-8 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} style={{ color: "var(--text-disabled)" }} />
            </div>
            <input
              type="text"
              placeholder="Search settings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border text-sm transition-colors outline-none focus:border-(--primary-500) focus:ring-1 focus:ring-(--primary-500)"
              style={{
                backgroundColor: "var(--surface-card)",
                borderColor: "var(--border-normal)",
                color: "var(--text-primary)",
              }}
            />
          </div>
        </div>

        {/* Settings Sections */}
        <div className="flex flex-col gap-3">
          {filteredSections.length === 0 ? (
            <div className="text-center py-10">
              <p style={{ color: "var(--text-muted)" }}>No settings found matching "{searchQuery}"</p>
            </div>
          ) : (
            filteredSections.map((section) => {
              const Icon = section.icon;
            const hasSubItems = section.subItems?.length > 0;
            const isExpanded = searchQuery.trim() !== "" || expandedSection === section.key;

            return (
              <div key={section.key}>
                <button
                  onClick={hasSubItems ? () => toggleSection(section.key) : undefined}
                  disabled={!hasSubItems}
                  className={`w-full flex items-center gap-4 p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 bg-(--surface-card) hover:bg-(--surface-hover) ${
                    hasSubItems
                      ? "cursor-pointer hover:border-(--border-strong) hover:-translate-y-0.5 hover:shadow-md"
                      : "opacity-60 cursor-not-allowed"
                  } ${isExpanded ? "border-(--border-strong) shadow-sm" : ""}`}
                  style={{
                    borderColor: isExpanded ? "var(--border-strong)" : "var(--border-normal)",
                  }}
                >
                  <div
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: section.bg,
                      color: section.color,
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-semibold text-sm sm:text-base flex items-center gap-2"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {section.label}
                      {section.showBadge && <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse inline-block shrink-0"></span>}
                    </p>
                    <p
                      className="text-xs sm:text-sm mt-0.5 truncate"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {section.description}
                    </p>
                  </div>
                  {hasSubItems ? (
                    <ChevronDown
                      size={18}
                      className={`shrink-0 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                      style={{ color: "var(--text-muted)" }}
                    />
                  ) : (
                    <ChevronRight
                      size={18}
                      className="shrink-0"
                      style={{ color: "var(--text-disabled)" }}
                    />
                  )}
                </button>

                {/* Sub-items — animated expand/collapse */}
                {hasSubItems && (
                  <div
                    className="ml-6 sm:ml-8 pl-4 border-l-2 overflow-hidden"
                    style={{
                      borderColor: isExpanded ? section.color : "transparent",
                      maxHeight: isExpanded ? `${section.subItems.length * 6}rem` : "0",
                      opacity: isExpanded ? 1 : 0,
                      marginTop: isExpanded ? "0.5rem" : "0",
                      transition: "max-height 0.35s ease, opacity 0.3s ease, margin-top 0.3s ease, border-color 0.3s ease",
                    }}
                  >
                    <div className="flex flex-col gap-2 py-1">
                      {section.subItems.map((sub) => {
                        const SubIcon = sub.icon;
                        const isImplemented = sub.key === "change-password" || sub.key === "update-email";
                        return (
                          <button
                            key={sub.key}
                            onClick={() => {
                              if (sub.key === "change-password") navigate("/settings/change-password");
                              if (sub.key === "update-email") navigate("/settings/change-email");
                            }}
                            disabled={!isImplemented}
                            className={`w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-(--border-normal) text-left transition-all duration-300 bg-(--surface-card) ${
                              isImplemented
                                ? "cursor-pointer hover:bg-(--surface-hover) hover:border-(--border-strong) hover:-translate-y-px hover:shadow-sm"
                                : "opacity-60 cursor-not-allowed"
                            }`}
                          >
                            <SubIcon
                              size={18}
                              className="shrink-0"
                              style={{ color: section.color }}
                            />
                            <div className="flex-1 min-w-0">
                              <p
                                className="font-medium text-sm flex items-center gap-2"
                                style={{ 
                                  color: sub.isDestructive ? section.color : "var(--text-primary)" 
                                }}
                              >
                                {sub.label}
                                {sub.showBadge && <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse inline-block shrink-0"></span>}
                              </p>
                              <p
                                className="text-xs mt-0.5 truncate"
                                style={{ 
                                  color: sub.isDestructive ? section.color : "var(--text-muted)",
                                  opacity: sub.isDestructive ? 0.8 : 1
                                }}
                              >
                                {sub.description}
                              </p>
                            </div>
                            <ChevronRight
                              size={16}
                              className="shrink-0"
                              style={{ 
                                color: sub.isDestructive ? section.color : "var(--text-disabled)",
                                opacity: sub.isDestructive ? 0.5 : 1
                              }}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
            })
          )}
        </div>
      </div>
    </div>
  );
}
