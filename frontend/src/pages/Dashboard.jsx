import { useState, Suspense } from "react";
import { useLoaderData, Await, useRevalidator } from "react-router-dom";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import { ShieldAlert, BarChart3, Clock, ImageIcon } from "lucide-react";
import AdminSidebar from "../components/admin/AdminSidebar";
import MetricsTab from "../components/dashboard/MetricsTab";
import RecentActivityTab from "../components/dashboard/RecentActivityTab";
import LatestPostsTab from "../components/dashboard/LatestPostsTab";
import { PageLoader } from "../shared-components/shared-components";
import DataErrorState from "../shared-components/DataErrorState";

const TABS = [
  { key: "metrics", label: "Metrics", icon: <BarChart3 size={16} /> },
  {
    key: "recentActivity",
    label: "Recent Activity",
    icon: <Clock size={16} />,
  },
  { key: "latestPosts", label: "Latest Posts", icon: <ImageIcon size={16} /> },
];

function DashboardContent({ data }) {
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
  const [now] = useState(() => Date.now());

  const stats = {
    totalUsersCount,
    totalPostCount,
    totalImageCount,
    totalVideoCount,
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="my-6">
        <h1
          className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight flex items-center gap-3"
          style={{ color: "var(--text-primary)" }}
        >
          <ShieldAlert style={{ color: "var(--primary-500)" }} size={32} /> Admin Dashboard
        </h1>
        <p className="text-base" style={{ color: "var(--text-muted)" }}>
          Overview of application metrics and community users.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center">
        <div className="tab-container flex w-fit p-1 gap-1.5 mt-2 mb-6 sm:p-[0.35rem] sm:gap-2 sm:mt-2.5 sm:mb-8 4xl:p-2.5 4xl:gap-4 4xl:mt-12 4xl:mb-12">
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
      </div>

      {/* Tab Content */}
      <div className="w-full">
        {activeTab === "metrics" && <MetricsTab stats={stats} userList={userList} />}
        {activeTab === "recentActivity" && <RecentActivityTab recentUsers={recentUsers} now={now} />}
        {activeTab === "latestPosts" && <LatestPostsTab latestPosts={latestPosts} now={now} />}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { dashboardData } = useLoaderData();
  const revalidator = useRevalidator();
  useDocumentMetadata("Dashboard", "Access your LookSphere admin dashboard to manage posts, track analytics, and oversee platform activity on the social network built by Pranav Shilu.", true);

  return (
    <div className="pb-12 md:pb-16 flex flex-col md:flex-row gap-6 mt-6 w-full">
      <AdminSidebar />

      <main className="flex-1 min-w-0 bg-(--surface-card) border border-(--border-normal) rounded-2xl p-4 sm:p-6 md:p-8">
        <Suspense fallback={<PageLoader />}>
          <Await
            resolve={dashboardData}
            errorElement={
              <DataErrorState
                message="Failed to load dashboard metrics. Check your network or try again."
                onRetry={() => revalidator.revalidate()}
              />
            }
          >
            {(data) => <DashboardContent data={data} />}
          </Await>
        </Suspense>
      </main>
    </div>
  );
}
