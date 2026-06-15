import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { ShieldAlert, BarChart3, Clock, ImageIcon } from "lucide-react";
import { Dashboard as DashboardAnimation } from "../utils/animation";
import MetricsTab from "../components/dashboard/MetricsTab";
import RecentActivityTab from "../components/dashboard/RecentActivityTab";
import LatestPostsTab from "../components/dashboard/LatestPostsTab";

const TABS = [
  { key: "metrics", label: "Metrics", icon: <BarChart3 size={16} /> },
  { key: "recentActivity", label: "Recent Activity", icon: <Clock size={16} /> },
  { key: "latestPosts", label: "Latest Posts", icon: <ImageIcon size={16} /> },
];

export default function Dashboard() {
  const data = useLoaderData();

  const {
    totalUsersCount = 0,
    totalPostCount = 0,
    totalImageCount = 0,
    totalVideoCount = 0,
    userList = [],
    recentUsers = [],
    latestPosts = [],
  } = data || {};

  const [activeTab, setActiveTab] = useState("metrics");

  // Capture current time once on mount (useState initializer is exempt from purity rules)
  const [now] = useState(() => Date.now());

  const stats = { totalUsersCount, totalPostCount, totalImageCount, totalVideoCount };

  return (
    <Motion.div
      {...DashboardAnimation.pageTransition}
    >
      {/* Header */}
      <div className="my-6 text-center md:text-left">
        <h1
          className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight flex items-center justify-center md:justify-start gap-3"
          style={{ color: "var(--text-primary)" }}
        >
          <ShieldAlert style={{ color: "var(--primary-500)" }} size={40} /> Admin Dashboard
        </h1>
        <p className="text-lg" style={{ color: "var(--text-muted)" }}>
          Overview of application metrics and community users.
        </p>
      </div>

      {/* Tabs */}
      <div className="tab-container mx-auto p-1 gap-1.5 mt-2 mb-6 sm:p-[0.35rem] sm:gap-2 sm:mt-[10px] sm:mb-8 4xl:p-2.5 4xl:gap-4 4xl:mt-12 4xl:mb-12">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`tab-btn py-1 px-3 text-sm sm:py-[0.22rem] sm:px-6 sm:text-[1.2rem] 4xl:py-3.5 4xl:px-10 4xl:text-2xl ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
            style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
          >
            <span className="hidden xsm:inline-flex">{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "metrics" && <MetricsTab stats={stats} userList={userList} />}
      {activeTab === "recentActivity" && <RecentActivityTab recentUsers={recentUsers} now={now} />}
      {activeTab === "latestPosts" && <LatestPostsTab latestPosts={latestPosts} now={now} />}
    </Motion.div>
  );
}
