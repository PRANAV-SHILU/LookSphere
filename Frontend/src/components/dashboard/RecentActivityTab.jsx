import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

function formatTimeAgo(dateString, now) {
  if (!dateString) return "";
  const diff = now - new Date(dateString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function RecentActivityTab({ recentUsers, now }) {
  const navigate = useNavigate();

  return (
    <div
      className="rounded-2xl p-6 md:p-8 overflow-hidden shadow-lg border"
      style={{
        backgroundColor: "var(--surface-card)",
        borderColor: "var(--border-normal)",
      }}
    >
      <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
        New Users — Last 7 Days
      </h2>
      <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
        {recentUsers.length} user{recentUsers.length !== 1 ? "s" : ""} joined recently
      </p>

      {recentUsers.length === 0 ? (
        <div className="text-center py-16 text-lg font-medium" style={{ color: "var(--text-muted)" }}>
          No new users in the last 7 days.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentUsers.map((userItem, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/profile/${userItem.username}`)}
              className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
              style={{
                backgroundColor: "var(--surface-input)",
                border: "1px solid var(--border-light)",
              }}
            >
              {/* Avatar */}
              <div
                className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shrink-0 border"
                style={{ backgroundColor: "var(--surface-card)", borderColor: "var(--border-light)" }}
              >
                {userItem.avatar ? (
                  <img src={userItem.avatar} alt={userItem.username} className="w-full h-full object-cover" />
                ) : (
                  <User size={22} style={{ color: "var(--text-muted)" }} />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate" style={{ color: "var(--text-primary)" }}>
                  {userItem.username}
                </p>
                <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
                  {userItem.email}
                </p>
              </div>

              {/* Time ago badge */}
              <div
                className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 whitespace-nowrap"
                style={{
                  backgroundColor: "var(--primary-50)",
                  color: "var(--primary-600)",
                }}
              >
                {formatTimeAgo(userItem.createdAt, now)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
