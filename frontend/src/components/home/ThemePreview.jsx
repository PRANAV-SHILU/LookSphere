import { Sun, Moon } from "lucide-react";
import { SectionHeading } from "../../shared-components/SharedHomeComponents";

export default function ThemePreview() {
  return (
    <div className="py-10 px-2 w-full xsm:py-12 sm:py-16 md:py-20 3xl:py-24 xsm:px-4 sm:px-8 md:px-12">
      <SectionHeading
        title="Beautiful in Any Light"
        subtitle="Seamlessly switch between dark and light themes. Your eyes, your choice."
      />

      <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto sm:grid-cols-2 xsm:gap-6">
        {/* Dark Mode Card */}
        <div
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("theme-changed", { detail: "dark" }),
            )
          }
          className="p-6 rounded-2xl border overflow-hidden transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-lg cursor-pointer"
          style={{
            background: "#18181B",
            borderColor: "#27272A",
            color: "#F8FAFC",
          }}
        >
          <div className="gap-2 mb-5 flex items-center">
            <div
              className="w-8 h-8 rounded-lg justify-center flex items-center"
              style={{ backgroundColor: "#1E1B4B" }}
            >
              <Moon size={18} style={{ color: "#8B5CF6" }} />
            </div>
            <span
              className="font-semibold text-sm"
              style={{ color: "#F8FAFC" }}
            >
              Dark Mode
            </span>
          </div>
          {/* Mini mockup */}
          <div
            className="p-3 rounded-xl space-y-3"
            style={{ background: "#27272A" }}
          >
            <div className="gap-2 flex items-center">
              <div
                className="w-6 h-6 rounded-full animate-buzzer"
                style={{
                  background: "linear-gradient(135deg, #3B82F6, #7C3AED)",
                }}
              />
              <div
                className="w-20 h-2.5 rounded-full"
                style={{ background: "#3F3F46" }}
              />
            </div>
            <div
              className="w-full h-16 rounded-lg"
              style={{
                background: "linear-gradient(135deg, #1E1B4B, #312E81)",
              }}
            />
            <div className="gap-2 pt-1 border-t border-white/5 flex items-center">
              <div
                className="w-10 h-3 rounded-md bg-amber-500/20 border border-amber-500/30"
              />
              <div
                className="w-10 h-3 rounded-md bg-blue-500/20 border border-blue-500/30"
              />
              <div
                className="w-10 h-3 rounded-md bg-emerald-500/20 border border-emerald-500/30 ml-auto"
              />
            </div>
          </div>
        </div>

        {/* Light Mode Card */}
        <div
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("theme-changed", { detail: "light" }),
            )
          }
          className="p-6 rounded-2xl border overflow-hidden transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-lg cursor-pointer"
          style={{
            background: "#FFFFFF",
            borderColor: "#E2E8F0",
            color: "#0F172A",
          }}
        >
          <div className="gap-2 mb-5 flex items-center">
            <div
              className="w-8 h-8 rounded-lg justify-center flex items-center"
              style={{ backgroundColor: "#FEF3C7" }}
            >
              <Sun size={18} style={{ color: "#F59E0B" }} />
            </div>
            <span
              className="font-semibold text-sm"
              style={{ color: "#0F172A" }}
            >
              Light Mode
            </span>
          </div>
          {/* Mini mockup */}
          <div
            className="p-3 rounded-xl space-y-3"
            style={{ background: "#F8FAFC" }}
          >
            <div className="gap-2 flex items-center">
              <div
                className="w-6 h-6 rounded-full animate-buzzer"
                style={{
                  background: "linear-gradient(135deg, #3B82F6, #7C3AED)",
                }}
              />
              <div
                className="w-20 h-2.5 rounded-full"
                style={{ background: "#CBD5E1" }}
              />
            </div>
            <div
              className="w-full h-16 rounded-lg"
              style={{
                background: "linear-gradient(135deg, #EFF6FF, #DBEAFE)",
              }}
            />
            <div className="gap-2 pt-1 border-t border-slate-200 flex items-center">
              <div
                className="w-10 h-3 rounded-md bg-amber-400/25 border border-amber-400/40"
              />
              <div
                className="w-10 h-3 rounded-md bg-blue-400/25 border border-blue-400/40"
              />
              <div
                className="w-10 h-3 rounded-md bg-emerald-400/25 border border-emerald-400/40 ml-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
