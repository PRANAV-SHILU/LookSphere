import { useState, useMemo } from "react";
import { useRouteLoaderData, useNavigate, Form, useNavigation } from "react-router-dom";
import { Lock, Eye, EyeOff, Check, X, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import { BackButton } from "../shared-components/shared-components";

const PASSWORD_RULES = [
  { key: "length", label: "At least 8 characters", test: (p) => p.length >= 8 },
  { key: "upper", label: "One uppercase letter (A–Z)", test: (p) => /[A-Z]/.test(p) },
  { key: "lower", label: "One lowercase letter (a–z)", test: (p) => /[a-z]/.test(p) },
  { key: "digit", label: "One digit (0–9)", test: (p) => /\d/.test(p) },
  { key: "special", label: "One special character (!@#$%…)", test: (p) => /[^A-Za-z0-9]/.test(p) },
];

export default function ChangePassword() {
  useDocumentMetadata("Change Password", "Securely update and change your LookSphere account password. We prioritize your security on this social media platform developed by Pranav Shilu.", true);
  const user = useRouteLoaderData("root");
  const navigate = useNavigate();
  const navigation = useNavigation();


  const submitting = navigation.state === "submitting";

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [visibility, setVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [touched, setTouched] = useState({});



  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const toggleVisibility = (field) => {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // ── Validation ──
  const ruleResults = useMemo(
    () => PASSWORD_RULES.map((r) => ({ ...r, passed: r.test(form.newPassword) })),
    [form.newPassword]
  );

  const allRulesPassed = ruleResults.every((r) => r.passed);
  const passwordsMatch = form.newPassword === form.confirmPassword && form.confirmPassword.length > 0;

  const strengthPercent = useMemo(() => {
    const passed = ruleResults.filter((r) => r.passed).length;
    return Math.round((passed / ruleResults.length) * 100);
  }, [ruleResults]);

  if (!user) {
    navigate("/login");
    return null;
  }

  const strengthColor =
    strengthPercent <= 20
      ? "#ef4444"
      : strengthPercent <= 40
        ? "#f97316"
        : strengthPercent <= 60
          ? "#eab308"
          : strengthPercent <= 80
            ? "#22c55e"
            : "#10b981";

  const strengthLabel =
    strengthPercent <= 20
      ? "Very Weak"
      : strengthPercent <= 40
        ? "Weak"
        : strengthPercent <= 60
          ? "Fair"
          : strengthPercent <= 80
            ? "Strong"
            : "Very Strong";

  const canSubmit =
    form.oldPassword.length > 0 && allRulesPassed && passwordsMatch && !submitting;

  // ── Helpers ──
  const inputStyle = (hasError) => ({
    backgroundColor: "var(--surface-card)",
    borderColor: hasError ? "#ef4444" : "var(--border-normal)",
    color: "var(--text-primary)",
  });

  const renderField = (name, label, placeholder) => {
    const value = form[name];
    const isVisible = visibility[name];
    const isTouched = touched[name];

    let hasError = false;
    if (name === "confirmPassword" && isTouched && value.length > 0 && !passwordsMatch) {
      hasError = true;
    }

    return (
      <div className="flex flex-col gap-1.5 sm:gap-2">
        <label
          htmlFor={name}
          className="text-xs sm:text-sm font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          {label}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
            <Lock size={16} style={{ color: "var(--text-disabled)" }} />
          </div>
          <input
            id={name}
            name={name}
            type={isVisible ? "text" : "password"}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            autoComplete={name === "oldPassword" ? "current-password" : "new-password"}
            className="w-full pl-9 sm:pl-11 pr-10 sm:pr-12 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border text-sm transition-colors outline-none focus:border-(--primary-500) focus:ring-1 focus:ring-(--primary-500)"
            style={inputStyle(hasError)}
          />
          <button
            type="button"
            onClick={() => toggleVisibility(name)}
            className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center cursor-pointer"
            tabIndex={-1}
          >
            {isVisible ? (
              <EyeOff size={16} style={{ color: "var(--text-muted)" }} />
            ) : (
              <Eye size={16} style={{ color: "var(--text-muted)" }} />
            )}
          </button>
        </div>
        {name === "confirmPassword" && isTouched && value.length > 0 && !passwordsMatch && (
          <p className="text-xs" style={{ color: "#ef4444" }}>
            Passwords do not match
          </p>
        )}
      </div>
    );
  };

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
            <ShieldCheck size={22} className="text-white sm:hidden" />
            <ShieldCheck size={28} className="text-white hidden sm:block" />
          </div>
          <h1
            className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight mb-1.5 sm:mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Change Password
          </h1>
          <p
            className="text-xs sm:text-sm md:text-base max-w-xs sm:max-w-md mx-auto leading-relaxed px-2"
            style={{ color: "var(--text-secondary)" }}
          >
            Keep your account secure by updating your password regularly.
          </p>
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
          {renderField("oldPassword", "Current Password", "Enter your current password")}
          {renderField("newPassword", "New Password", "Create a strong new password")}

          {/* Password Strength Bar */}
          {form.newPassword.length > 0 && (
            <div className="flex flex-col gap-1.5 sm:gap-2 -mt-1 sm:-mt-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] sm:text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                  Password Strength
                </span>
                <span className="text-[11px] sm:text-xs font-bold" style={{ color: strengthColor }}>
                  {strengthLabel}
                </span>
              </div>
              <div
                className="w-full h-1 sm:h-1.5 rounded-full overflow-hidden"
                style={{ backgroundColor: "var(--border-normal)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${strengthPercent}%`,
                    backgroundColor: strengthColor,
                    transition: "width 0.4s ease, background-color 0.4s ease",
                  }}
                />
              </div>

              {/* Rule Checklist */}
              <div className="flex flex-col gap-1 sm:gap-1.5 mt-0.5 sm:mt-1">
                {ruleResults.map((rule) => (
                  <div key={rule.key} className="flex items-center gap-1.5 sm:gap-2">
                    {rule.passed ? (
                      <Check size={12} className="sm:hidden shrink-0" style={{ color: "#10b981" }} />
                    ) : (
                      <X size={12} className="sm:hidden shrink-0" style={{ color: "var(--text-disabled)" }} />
                    )}
                    {rule.passed ? (
                      <Check size={14} className="hidden sm:block shrink-0" style={{ color: "#10b981" }} />
                    ) : (
                      <X size={14} className="hidden sm:block shrink-0" style={{ color: "var(--text-disabled)" }} />
                    )}
                    <span
                      className="text-[11px] sm:text-xs"
                      style={{
                        color: rule.passed ? "#10b981" : "var(--text-muted)",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {rule.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {renderField("confirmPassword", "Confirm New Password", "Re-enter your new password")}

          {/* Match indicator */}
          {form.confirmPassword.length > 0 && passwordsMatch && (
            <div className="flex items-center gap-1.5 sm:gap-2 -mt-2 sm:-mt-4">
              <Check size={14} style={{ color: "#10b981" }} />
              <span className="text-[11px] sm:text-xs" style={{ color: "#10b981" }}>
                Passwords match
              </span>
            </div>
          )}

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
                Update Password
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
