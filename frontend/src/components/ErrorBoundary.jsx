import { useRouteError, isRouteErrorResponse, NavLink, useLocation, useRevalidator } from "react-router-dom";
import { WifiOff, AlertTriangle, RefreshCw, Home, ShieldAlert, Lock } from "lucide-react";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import Header from "./Header";

export default function ErrorBoundary() {
  useDocumentMetadata(
    "Error - LookSphere",
    "An error occurred on LookSphere. Navigate safely back to the platform developed by Pranav Shilu."
  );
  const error = useRouteError();
  const location = useLocation();
  const revalidator = useRevalidator();

  const isAdminPage = location.pathname.startsWith("/admin");
  const isOnline = typeof navigator !== "undefined" ? navigator.onLine : true;
  const rawMsg =
    error?.message ||
    (typeof error === "string" ? error : "") ||
    "";

  const lowerMsg = rawMsg.toLowerCase();

  const isNetwork =
    !isOnline ||
    lowerMsg.includes("network") ||
    lowerMsg.includes("connection") ||
    lowerMsg.includes("offline") ||
    lowerMsg.includes("failed to fetch");

  const isDbTimeout =
    lowerMsg.includes("buffering timed out") ||
    lowerMsg.includes("database") ||
    lowerMsg.includes("mongodb");

  let statusBadge = null;
  let title = "Something went wrong";
  let description = "An unexpected error occurred while loading this page. Please try again or return home.";
  let isAuth = false;

  if (isRouteErrorResponse(error)) {
    statusBadge = `Error ${error.status}`;
    if (error.status === 404) {
      title = isAdminPage ? "Admin View Not Found" : "Page Not Found";
      description = "The page you are looking for doesn't exist, has been removed, or moved to another link.";
    } else if (error.status === 401 || error.status === 403) {
      isAuth = true;
      title = isAdminPage ? "Admin Access Restricted" : "Access Restricted";
      description = isAdminPage
        ? "Administrator credentials are required to view this panel. Please sign in with an admin account."
        : "You don't have authorization or credentials to view this area.";
    } else if (error.status >= 500) {
      title = isAdminPage ? "Admin Service Unavailable" : "Internal Server Error";
      description = "Our servers encountered an unexpected condition. Please try refreshing in a moment.";
    } else {
      title = error.statusText || "Request Error";
      description = error.data?.message || description;
    }
  } else if (lowerMsg.includes("admin role required") || lowerMsg.includes("access denied")) {
    isAuth = true;
    title = "Admin Access Restricted";
    description = "Administrator credentials are required to view this panel. Please sign in with an admin account.";
  } else if (isNetwork) {
    title = "Network Disconnected";
    description = "You appear to be offline or having network connectivity issues. Check your connection and try again.";
  } else if (isDbTimeout) {
    title = "Database Connection Timeout";
    description = "Backend is unable to reach the database cluster. Please try again later.";
  } else if (error?.message) {
    description = error.message;
  }

  const handleRefresh = () => {
    try {
      revalidator.revalidate();
    } catch {
      window.location.reload();
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-80px)] px-4 py-12">
        <div
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center mb-6 shadow-sm transition-transform duration-300 hover:scale-105"
          style={{
            background: isAuth
              ? "rgba(139, 92, 246, 0.12)"
              : isNetwork
                ? "rgba(239, 68, 68, 0.12)"
                : "rgba(245, 158, 11, 0.12)",
            color: isAuth
              ? "#8b5cf6"
              : isNetwork
                ? "var(--color-danger, #ef4444)"
                : "var(--color-warning, #f59e0b)",
            border: `1px solid ${
              isAuth
                ? "rgba(139, 92, 246, 0.25)"
                : isNetwork
                  ? "rgba(239, 68, 68, 0.25)"
                  : "rgba(245, 158, 11, 0.25)"
            }`,
          }}
        >
          {isAuth ? (
            <Lock className="w-8 h-8 sm:w-10 sm:h-10" />
          ) : isNetwork ? (
            <WifiOff className="w-8 h-8 sm:w-10 sm:h-10" />
          ) : isAdminPage ? (
            <ShieldAlert className="w-8 h-8 sm:w-10 sm:h-10" />
          ) : (
            <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10" />
          )}
        </div>

        {statusBadge && (
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wider"
            style={{
              backgroundColor: "var(--surface-input)",
              color: "var(--text-muted)",
              border: "1px solid var(--border-normal)",
            }}
          >
            {statusBadge}
          </span>
        )}

        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </h1>

        <p
          className="text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          {description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer hover:opacity-90 active:scale-95 shadow-sm"
            style={{
              backgroundColor: "var(--primary-500)",
              color: "#ffffff",
            }}
          >
            <RefreshCw size={16} />
            <span>Try Again</span>
          </button>

          {isAdminPage && (
            <NavLink
              to="/admin/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 no-underline cursor-pointer hover:bg-(--surface-hover) active:scale-95"
              style={{
                backgroundColor: "var(--surface-card)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-normal)",
              }}
            >
              <ShieldAlert size={16} />
              <span>Admin Dashboard</span>
            </NavLink>
          )}

          <NavLink
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 no-underline cursor-pointer hover:bg-(--surface-hover) active:scale-95"
            style={{
              backgroundColor: "var(--surface-card)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-normal)",
            }}
          >
            <Home size={16} />
            <span>Go Home</span>
          </NavLink>
        </div>
      </div>
    </>
  );
}
