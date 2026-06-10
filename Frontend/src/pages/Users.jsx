import { useLoaderData, Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { User, Eye, ArrowRight } from "lucide-react";

export default function Users() {
  const usersList = useLoaderData();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <Motion.div
      className="max-w-6xl mx-auto p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-10 text-center md:text-left">
        <h1
          className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Community
        </h1>
        <p className="text-lg" style={{ color: "var(--text-muted)" }}>
          Discover and connect with other users on SecureAuth.
        </p>
      </div>

      {usersList.length === 0 ? (
        <div
          className="text-center py-20 text-lg font-medium"
          style={{ color: "var(--text-muted)" }}
        >
          No users found. Register yourself to be the first one.
        </div>
      ) : (
        <Motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {usersList.map((user) => (
            <Motion.div
              key={user.username}
              variants={itemVariants}
              className="h-full"
            >
              <Link
                to={`/profile/${user.username}`}
                className="group relative flex flex-col h-full p-6 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: "var(--surface-card)",
                  border: "1px solid var(--border-normal)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                {/* Background Glow Effect on Hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--primary-500), transparent)",
                  }}
                />

                <div className="flex items-start space-x-4 mb-5 relative z-10">
                  {/* Avatar */}
                  <div
                    className="w-16 h-16 shrink-0 rounded-full overflow-hidden flex items-center justify-center border-2 border-transparent group-hover:border-[var(--primary-500)] transition-colors duration-300 shadow-sm"
                    style={{ backgroundColor: "var(--surface-input)" }}
                  >
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.username}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={32} style={{ color: "var(--text-muted)" }} />
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 overflow-hidden">
                    <h2
                      className="text-xl font-bold truncate group-hover:text-[var(--primary-600)] transition-colors"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {user.username}
                    </h2>
                    <p
                      className="text-sm line-clamp-2 mt-1"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {user.tagline || "No tagline provided."}
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center justify-between mt-auto pt-4 border-t relative z-10"
                  style={{ borderColor: "var(--border-light)" }}
                >
                  {/* View Count */}
                  <div
                    className="flex items-center space-x-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-md"
                    style={{
                      backgroundColor: "var(--surface-input)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    <Eye size={14} />
                    <span>{user.profileViewCount || 0} Views</span>
                  </div>

                  {/* View Profile Button (Icon) */}
                  <div
                    className="flex items-center justify-center w-8 h-8 rounded-full transform group-hover:translate-x-1 transition-all duration-300"
                    style={{
                      backgroundColor: "var(--primary-50)",
                      color: "var(--primary-600)",
                    }}
                  >
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </Motion.div>
          ))}
        </Motion.div>
      )}
    </Motion.div>
  );
}
