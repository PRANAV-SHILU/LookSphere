import React from "react";
import { useAsyncError } from "react-router-dom";
import { WifiOff, AlertTriangle, RefreshCw } from "lucide-react";

export default function DataErrorState({
  error: propError,
  title: propTitle,
  message,
  onRetry,
  skeleton: SkeletonComponent,
  compact = false,
  className = "flex-col py-12 px-4 text-center justify-center flex items-center",
}) {
  const asyncError = useAsyncError();
  const error = propError || asyncError;
  const isOnline = typeof navigator !== "undefined" ? navigator.onLine : true;
  const rawMsg = error?.message || (typeof error === "string" ? error : "") || message || "";

  const [isRetrying, setIsRetrying] = React.useState(false);

  const lowerMsg = rawMsg.toLowerCase();

  // Distinguish cases:
  // 1. Browser is completely offline (no internet at all)
  const isOffline = !isOnline || lowerMsg.includes("network disconnected") || lowerMsg.includes("offline");

  // 2. Mongoose / Database buffering timeout (backend is running, but MongoDB has no connection)
  const isDbTimeout = lowerMsg.includes("buffering timed out") || lowerMsg.includes("operation `");

  // 3. Backend server not running / connection refused
  const isServerDown =
    !isOffline &&
    (lowerMsg.includes("unable to reach server") ||
      lowerMsg.includes("network error") ||
      lowerMsg.includes("connection refused") ||
      lowerMsg.includes("failed to fetch") ||
      lowerMsg.includes("econnrefused"));

  // 4. Unauthorized / Admin permissions required
  const isAdminRestricted =
    lowerMsg.includes("admin role required") ||
    lowerMsg.includes("access denied") ||
    lowerMsg.includes("unauthorized") ||
    lowerMsg.includes("forbidden");

  let title = propTitle || "Unable to Load Data";
  let displayMsg = rawMsg;

  if (isOffline) {
    title = propTitle || "You Are Offline";
    displayMsg = "You are currently offline. Please check your internet connection.";
  } else if (isAdminRestricted) {
    title = propTitle || "Admin Access Restricted";
    displayMsg = "Administrative privileges are required to view or manage this data.";
  } else if (isServerDown) {
    title = propTitle || "Backend Server Unavailable";
    displayMsg = "Unable to connect to LookSphere servers. Please try again later.";
  } else if (isDbTimeout) {
    title = propTitle || "Database Connection Timeout";
    displayMsg = "Backend is unable to reach the database cluster. Please try again later.";
  } else if (!rawMsg) {
    displayMsg = "A system error occurred while retrieving data. Please try again.";
  }

  const isNetworkIssue = isOffline || isServerDown || isDbTimeout;

  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      await onRetry?.();
    } finally {
      // Keep skeleton briefly so user sees the reload action
      setTimeout(() => setIsRetrying(false), 500);
    }
  };

  // If retrying and a skeleton component was provided, render skeleton immediately!
  if (isRetrying && SkeletonComponent) {
    return <SkeletonComponent />;
  }

  if (compact) {
    return (
      <div
        className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl border border-dashed gap-3 flex-wrap"
        style={{
          backgroundColor: isNetworkIssue ? "rgba(239, 68, 68, 0.06)" : "rgba(245, 158, 11, 0.06)",
          borderColor: isNetworkIssue ? "rgba(239, 68, 68, 0.25)" : "rgba(245, 158, 11, 0.25)",
        }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{
              backgroundColor: isNetworkIssue ? "rgba(239, 68, 68, 0.12)" : "rgba(245, 158, 11, 0.12)",
              color: isNetworkIssue ? "var(--color-danger, #ef4444)" : "var(--color-warning, #f59e0b)",
            }}
          >
            {isNetworkIssue ? <WifiOff size={15} /> : <AlertTriangle size={15} />}
          </div>
          <span className="text-xs sm:text-sm font-medium truncate" style={{ color: "var(--text-secondary)" }}>
            {displayMsg || title}
          </span>
        </div>
        {onRetry && (
          <button
            type="button"
            onClick={handleRetry}
            disabled={isRetrying}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer hover:opacity-90 active:scale-95 transition-all inline-flex items-center gap-1.5 shrink-0"
            style={{ backgroundColor: "var(--primary-500)", color: "#fff" }}
          >
            <RefreshCw size={13} className={isRetrying ? "animate-spin" : ""} />
            <span>{isRetrying ? "Retrying..." : "Retry"}</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <div
        className="mb-4 w-14 h-14 rounded-2xl justify-center flex items-center transition-transform duration-300 hover:scale-105"
        style={{
          background: isNetworkIssue
            ? "rgba(239, 68, 68, 0.12)"
            : "rgba(245, 158, 11, 0.12)",
          color: isNetworkIssue ? "var(--color-danger, #ef4444)" : "var(--color-warning, #f59e0b)",
          border: `1px solid ${
            isNetworkIssue ? "rgba(239, 68, 68, 0.25)" : "rgba(245, 158, 11, 0.25)"
          }`,
        }}
      >
        {isNetworkIssue ? <WifiOff size={28} /> : <AlertTriangle size={28} />}
      </div>

      <h3
        className="mb-1 text-base font-semibold sm:text-lg"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h3>
      <p
        className="mb-5 text-xs max-w-md mx-auto sm:text-sm leading-relaxed"
        style={{ color: "var(--text-muted)" }}
      >
        {displayMsg}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={handleRetry}
          disabled={isRetrying}
          className="gap-2 px-4 py-2 rounded-xl text-xs font-medium shadow-sm inline-flex items-center sm:text-sm transition-all duration-200 cursor-pointer hover:opacity-90 active:scale-95 disabled:opacity-60"
          style={{
            backgroundColor: "var(--primary-500)",
            color: "#ffffff",
          }}
        >
          <RefreshCw size={14} className={isRetrying ? "animate-spin" : "animate-spin-hover"} />
          <span>{isRetrying ? "Retrying..." : "Try Again"}</span>
        </button>
      )}
    </div>
  );
}
