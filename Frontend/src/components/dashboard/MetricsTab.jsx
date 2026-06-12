import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import {
  Users, FileText, Image, Video, Calendar, Eye,
  User, ArrowUp, ArrowDown,
} from "lucide-react";
import { Dashboard as DashboardAnimation } from "../../utils/animation";

const STAT_CARDS = [
  {
    key: "totalUsersCount",
    title: "Total Users",
    icon: <Users size={24} />,
    gradient: "linear-gradient(135deg, #3B82F6, #1D4ED8)",
  },
  {
    key: "totalPostCount",
    title: "Total Posts",
    icon: <FileText size={24} />,
    gradient: "linear-gradient(135deg, #8B5CF6, #6D28D9)",
  },
  {
    key: "totalImageCount",
    title: "Image Posts",
    icon: <Image size={24} />,
    gradient: "linear-gradient(135deg, #10B981, #047857)",
  },
  {
    key: "totalVideoCount",
    title: "Video Posts",
    icon: <Video size={24} />,
    gradient: "linear-gradient(135deg, #F59E0B, #B45309)",
  },
];

function formatDate(dateString) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function MetricsTab({ stats, userList }) {
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const handleSort = (key) => {
    let direction = "desc"; // Default to desc when clicking a new column
    if (sortConfig.key === key) {
      // If clicking the same column, toggle between asc and desc
      direction = sortConfig.direction === "asc" ? "desc" : "asc";
    }
    setSortConfig({ key, direction });
  };

  const getSortedUsers = () => {
    if (!sortConfig.key || !sortConfig.direction) return userList;
    return [...userList].sort((a, b) => {
      let valA = a[sortConfig.key];
      let valB = b[sortConfig.key];
      if (valA === undefined || valA === null) valA = 0;
      if (valB === undefined || valB === null) valB = 0;
      if (sortConfig.key === "createdAt") {
        valA = new Date(valA).getTime();
        valB = new Date(valB).getTime();
      }
      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const sortedUsers = getSortedUsers();

  const renderSortArrows = (key) => {
    const isActive = sortConfig.key === key;
    return (
      <span className="inline-flex flex-col ml-1.5 align-middle select-none">
        <ArrowUp
          size={10}
          className={`transition-colors ${
            isActive && sortConfig.direction === "asc"
              ? "text-[var(--primary-500)]"
              : "text-gray-400 dark:text-zinc-600"
          }`}
        />
        <ArrowDown
          size={10}
          className={`transition-colors mt-[2px] ${
            isActive && sortConfig.direction === "desc"
              ? "text-[var(--primary-500)]"
              : "text-gray-400 dark:text-zinc-600"
          }`}
        />
      </span>
    );
  };

  return (
    <>
      {/* Stats Grid */}
      <Motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        variants={DashboardAnimation.containerVariants}
        initial="hidden"
        animate="show"
      >
        {STAT_CARDS.map((card, i) => (
          <Motion.div
            key={i}
            variants={DashboardAnimation.itemVariants}
            className="p-6 rounded-2xl relative overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1"
            style={{ background: card.gradient, color: "#FFFFFF" }}
          >
            <div className="absolute right-[-20px] bottom-[-20px] opacity-15 text-white scale-[2.5] pointer-events-none">
              {card.icon}
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold uppercase tracking-wider opacity-80">
                {card.title}
              </span>
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                {card.icon}
              </div>
            </div>
            <h3 className="text-4xl font-extrabold">{stats[card.key] || 0}</h3>
          </Motion.div>
        ))}
      </Motion.div>

      {/* Users Table */}
      <div
        className="rounded-2xl p-6 md:p-8 overflow-hidden shadow-lg border"
        style={{
          backgroundColor: "var(--surface-card)",
          borderColor: "var(--border-normal)",
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Community Users ({userList.length})
          </h2>
          {/* Show reset button if any sorting is active */}
          {sortConfig.key !== null && (
            <button
              onClick={() => setSortConfig({ key: null, direction: null })}
              className="text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
              style={{
                backgroundColor: "var(--surface-input)",
                color: "var(--text-muted)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--text-primary)";
                e.currentTarget.style.backgroundColor = "var(--surface-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-muted)";
                e.currentTarget.style.backgroundColor = "var(--surface-input)";
              }}
            >
              Reset Sort
            </button>
          )}
        </div>

        {userList.length === 0 ? (
          <div className="text-center py-12 text-lg font-medium" style={{ color: "var(--text-muted)" }}>
            No registered users found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left border-collapse">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--border-light)" }}>
                  <th className="pb-4 font-semibold text-sm" style={{ color: "var(--text-muted)" }}>User</th>
                  <th className="pb-4 font-semibold text-sm" style={{ color: "var(--text-muted)" }}>Email</th>
                  <th
                    className="pb-4 font-semibold text-sm cursor-pointer hover:text-[var(--primary-500)] transition-colors select-none"
                    onClick={() => handleSort("createdAt")}
                    style={{ color: sortConfig.key === "createdAt" ? "var(--primary-500)" : "var(--text-muted)" }}
                  >
                    <span className="flex items-center">Joined Date {renderSortArrows("createdAt")}</span>
                  </th>
                  <th
                    className="pb-4 font-semibold text-sm cursor-pointer hover:text-[var(--primary-500)] transition-colors text-center select-none"
                    onClick={() => handleSort("profileViewCount")}
                    style={{ color: sortConfig.key === "profileViewCount" ? "var(--primary-500)" : "var(--text-muted)" }}
                  >
                    <span className="flex items-center justify-center">Profile Views {renderSortArrows("profileViewCount")}</span>
                  </th>
                  <th
                    className="pb-4 font-semibold text-sm cursor-pointer hover:text-[var(--primary-500)] transition-colors text-center select-none"
                    onClick={() => handleSort("postCount")}
                    style={{ color: sortConfig.key === "postCount" ? "var(--primary-500)" : "var(--text-muted)" }}
                  >
                    <span className="flex items-center justify-center">Posts {renderSortArrows("postCount")}</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "var(--border-light)" }}>
                {sortedUsers.map((userItem, idx) => (
                  <tr
                    key={idx}
                    onClick={() => navigate(`/profile/${userItem.username}`)}
                    className="group hover:bg-[var(--surface-hover)] transition-colors cursor-pointer"
                  >
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center shrink-0 border"
                          style={{ backgroundColor: "var(--surface-input)", borderColor: "var(--border-light)" }}
                        >
                          {userItem.avatar ? (
                            <img src={userItem.avatar} alt={userItem.username} className="w-full h-full object-cover" />
                          ) : (
                            <User size={20} style={{ color: "var(--text-muted)" }} />
                          )}
                        </div>
                        <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                          {userItem.username}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                        {userItem.email}
                      </span>
                    </td>
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-muted)" }}>
                        <Calendar size={14} />
                        {formatDate(userItem.createdAt)}
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-center">
                      <div className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded bg-[var(--surface-input)]" style={{ color: "var(--text-secondary)" }}>
                        <Eye size={12} />
                        {userItem.profileViewCount || 0}
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-center">
                      <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                        {userItem.postCount || 0}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
