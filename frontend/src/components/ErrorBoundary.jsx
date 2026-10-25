import { useRouteError, isRouteErrorResponse, NavLink } from "react-router-dom";
import { WifiOff, AlertTriangle, RefreshCw, Home } from "lucide-react";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import Header from "./Header";

export default function ErrorBoundary() {
  useDocumentMetadata(
    "Error - LookSphere",
    "An error occurred on LookSphere. Navigate safely back to the platform developed by Pranav Shilu."
  );
  const error = useRouteError();

  const isOnline = typeof navigator !== "undefined" ? navigator.onLine : true;
  const rawMsg =
    error?.message ||
    (typeof error === "string" ? error : "") ||
    "";

  const isNetwork =
    !isOnline ||
    rawMsg.toLowerCase().includes("network") ||
    rawMsg.toLowerCase().includes("connection") ||
    rawMsg.toLowerCase().includes("offline") ||
    rawMsg.toLowerCase().includes("failed to fetch");

  let statusBadge = null;
  let title = "Something went wrong";
  let description = "An unexpected error occurred while loading this page. Please try again or return home.";

  if (isRouteErrorResponse(error)) {
    statusBadge = `Error ${error.status}`;
    if (error.status === 404) {
      title = "Page Not Found";
      description = "The page you are looking for doesn't exist, has been removed, or moved to another link.";
    } else if (error.status === 401 || error.status === 403) {
      title = "Access Restricted";
      description = "You don't have authorization or credentials to view this area.";
    } else if (error.status >= 500) {
      title = "Internal Server Error";
      description = "Our servers encountered an unexpected condition. Please try refreshing in a moment.";
    } else {
      title = error.statusText || "Request Error";
      description = error.data?.message || description;
    }
  } else if (isNetwork) {
    title = "Network Disconnected";
    description = "You appear to be offline or having network connectivity issues. Check your connection and try again.";
  } else if (error?.message) {
    description = error.message;
  }

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-80px)] px-4 py-12">
        <div
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center mb-6 shadow-sm transition-transform duration-300 hover:scale-105"
          style={{
            background: isNetwork
              ? "rgba(239, 68, 68, 0.12)"
              : "rgba(245, 158, 11, 0.12)",
            color: isNetwork ? "var(--color-danger, #ef4444)" : "var(--color-warning, #f59e0b)",
            border: `1px solid ${
              isNetwork ? "rgba(239, 68, 68, 0.25)" : "rgba(245, 158, 11, 0.25)"
            }`,
          }}
        >
          {isNetwork ? (
            <WifiOff className="w-8 h-8 sm:w-10 sm:h-10" />
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
