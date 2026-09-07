import { useState } from "react";
import { useRouteLoaderData, useNavigate, Form, useNavigation } from "react-router-dom";
import { Mail, Eye, EyeOff, Lock, Check, ArrowRight, Loader2, AtSign, User } from "lucide-react";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import BackButton from "../shared-components/BackButton";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

export default function ChangeEmail() {
  useDocumentMetadata("Change Email", "Securely update your LookSphere account email address. We prioritize your security on this social media platform developed by Pranav Shilu.", true);
  const user = useRouteLoaderData("root");
  const navigate = useNavigate();
  const navigation = useNavigation();

  const submitting = navigation.state === "submitting";

  const [form, setForm] = useState({
    newEmail: "",
    confirmEmail: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [touched, setTouched] = useState({});
  const [imgError, setImgError] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  // ── Validation ──
  const emailValid = isValidEmail(form.newEmail);
  const emailsMatch = form.newEmail === form.confirmEmail && form.confirmEmail.length > 0;
  const isSameAsCurrentEmail = user?.email && form.newEmail.toLowerCase() === user.email.toLowerCase();

  const canSubmit =
    emailValid &&
    emailsMatch &&
    form.password.length > 0 &&
    !isSameAsCurrentEmail &&
    !submitting;

  if (!user) {
    navigate("/login");
    return null;
  }

  // ── Helpers ──
  const inputStyle = (hasError) => ({
    backgroundColor: "var(--surface-card)",
    borderColor: hasError ? "#ef4444" : "var(--border-normal)",
    color: "var(--text-primary)",
  });

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-xl px-3 xsm:px-4 sm:px-6 md:px-8 pt-5 sm:pt-8 pb-12 sm:pb-20">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-5 sm:mb-8">
          <BackButton />
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400">
            Security
          </span>
        </div>

        {/* Title */}
        <div className="text-center mb-6 sm:mb-10 flex flex-col items-center">
          <div
            className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4"
            style={{
              background: "linear-gradient(135deg, var(--primary-500), #8b5cf6)",
            }}
          >
            <Mail size={22} className="text-white sm:hidden" />
            <Mail size={28} className="text-white hidden sm:block" />
          </div>
          <h1
            className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight mb-1.5 sm:mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Change Email
          </h1>
          <p
            className="text-xs sm:text-sm md:text-base max-w-xs sm:max-w-md mx-auto leading-relaxed px-2"
            style={{ color: "var(--text-secondary)" }}
          >
            Update the email address associated with your account. You'll need to verify your password.
          </p>
        </div>

        {/* Current Email Display */}
        <div
          className="rounded-lg sm:rounded-xl border p-3 sm:p-4 mb-4 sm:mb-6 flex items-center gap-3"
          style={{
            backgroundColor: "var(--surface-card)",
            borderColor: "var(--border-normal)",
          }}
        >
          {user?.profileImage && !imgError ? (
            <img
              src={user.profileImage}
              alt={user.username || "Profile"}
              onError={() => setImgError(true)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover shrink-0 border"
              style={{ borderColor: "var(--border-normal)" }}
            />
          ) : (
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-xs sm:text-sm"
              style={{
                backgroundColor: "rgba(59, 130, 246, 0.12)",
                color: "var(--primary-500)",
                border: "1px solid rgba(59, 130, 246, 0.25)",
              }}
            >
              {user?.username ? user.username.charAt(0).toUpperCase() : <User size={18} />}
            </div>
          )}
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                Current Email
              </span>
              {user?.username && (
                <span className="text-[10px] sm:text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                  • @{user.username}
                </span>
              )}
            </div>
            <span className="text-xs sm:text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>
              {user?.email || "Not set"}
            </span>
          </div>
        </div>

        {/* Form Card */}
        <Form
          method="post"
          className="rounded-xl sm:rounded-2xl border p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6"
          style={{
            backgroundColor: "var(--surface-card)",
            borderColor: "var(--border-normal)",
          }}
        >
          {/* New Email Field */}
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <label
              htmlFor="newEmail"
              className="text-xs sm:text-sm font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              New Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <Mail size={16} style={{ color: "var(--text-disabled)" }} />
              </div>
              <input
                id="newEmail"
                name="newEmail"
                type="email"
                value={form.newEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your new email address"
                autoComplete="email"
                className="w-full pl-9 sm:pl-11 pr-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border text-sm transition-colors outline-none focus:border-(--primary-500) focus:ring-1 focus:ring-(--primary-500)"
                style={inputStyle(
                  touched.newEmail && form.newEmail.length > 0 && !emailValid
                )}
              />
            </div>
            {/* Inline validation messages */}
            {touched.newEmail && form.newEmail.length > 0 && !emailValid && (
              <p className="text-xs" style={{ color: "#ef4444" }}>
                Please enter a valid email address
              </p>
            )}
            {form.newEmail.length > 0 && isSameAsCurrentEmail && (
              <p className="text-xs" style={{ color: "#f97316" }}>
                This is already your current email address
              </p>
            )}
          </div>

          {/* Confirm Email Field */}
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <label
              htmlFor="confirmEmail"
              className="text-xs sm:text-sm font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Confirm New Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <Mail size={16} style={{ color: "var(--text-disabled)" }} />
              </div>
              <input
                id="confirmEmail"
                name="confirmEmail"
                type="email"
                value={form.confirmEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Re-enter your new email address"
                autoComplete="email"
                className="w-full pl-9 sm:pl-11 pr-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border text-sm transition-colors outline-none focus:border-(--primary-500) focus:ring-1 focus:ring-(--primary-500)"
                style={inputStyle(
                  touched.confirmEmail && form.confirmEmail.length > 0 && !emailsMatch
                )}
              />
            </div>
            {touched.confirmEmail && form.confirmEmail.length > 0 && !emailsMatch && (
              <p className="text-xs" style={{ color: "#ef4444" }}>
                Email addresses do not match
              </p>
            )}
          </div>

          {/* Email match indicator */}
          {form.confirmEmail.length > 0 && emailsMatch && (
            <div className="flex items-center gap-1.5 sm:gap-2 -mt-2 sm:-mt-4">
              <Check size={14} style={{ color: "#10b981" }} />
              <span className="text-[11px] sm:text-xs" style={{ color: "#10b981" }}>
                Email addresses match
              </span>
            </div>
          )}

          {/* Password Verification Field */}
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <label
              htmlFor="password"
              className="text-xs sm:text-sm font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Verify Password
            </label>
            <p
              className="text-[10px] sm:text-xs leading-relaxed -mt-0.5"
              style={{ color: "var(--text-muted)" }}
            >
              Enter your current password to confirm this change
            </p>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <Lock size={16} style={{ color: "var(--text-disabled)" }} />
              </div>
              <input
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your current password"
                autoComplete="current-password"
                className="w-full pl-9 sm:pl-11 pr-10 sm:pr-12 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border text-sm transition-colors outline-none focus:border-(--primary-500) focus:ring-1 focus:ring-(--primary-500)"
                style={inputStyle(false)}
              />
              <button
                type="button"
                onClick={() => setPasswordVisible((v) => !v)}
                className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center cursor-pointer"
                tabIndex={-1}
              >
                {passwordVisible ? (
                  <EyeOff size={16} style={{ color: "var(--text-muted)" }} />
                ) : (
                  <Eye size={16} style={{ color: "var(--text-muted)" }} />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold text-white transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: canSubmit
                ? "linear-gradient(135deg, var(--primary-500), #8b5cf6)"
                : "var(--text-disabled)",
            }}
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin sm:hidden" />
                <Loader2 size={18} className="animate-spin hidden sm:block" />
                Updating…
              </>
            ) : (
              <>
                Update Email
                <ArrowRight size={16} className="sm:hidden" />
                <ArrowRight size={18} className="hidden sm:block" />
              </>
            )}
          </button>
        </Form>
      </div>
    </div>
  );
}
