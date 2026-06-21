import { Sun, Moon } from "lucide-react";
import { SectionHeading } from "../../shared-components/SharedHomeComponents";

export default function ThemePreview() {
  return (
    <div className="w-full py-10 xsm:py-12 sm:py-16 md:py-20 3xl:py-24 px-3 xsm:px-4 sm:px-8 md:px-12">
      <SectionHeading
        title="Beautiful in Any Light"
        subtitle="Seamlessly switch between dark and light themes. Your eyes, your choice."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xsm:gap-6 max-w-3xl 3xl:max-w-4xl mx-auto">
        {/* Dark Mode Card */}
        <div
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("theme-changed", { detail: "dark" }),
            )
          }
          className="rounded-2xl p-6 border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
          style={{
            background: "#18181B",
            borderColor: "#27272A",
            color: "#F8FAFC",
          }}
        >
          <div className="flex items-center gap-2 mb-5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
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
            className="rounded-xl p-3 space-y-3"
            style={{ background: "#27272A" }}
          >
            <div className="flex items-center gap-2">
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
            <div className="flex gap-3">
              <div
                className="w-8 h-2 rounded-full"
                style={{ background: "#3F3F46" }}
              />
              <div
                className="w-8 h-2 rounded-full"
                style={{ background: "#3F3F46" }}
              />
              <div
                className="w-8 h-2 rounded-full"
                style={{ background: "#3F3F46" }}
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
          className="rounded-2xl p-6 border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
          style={{
            background: "#FFFFFF",
            borderColor: "#E2E8F0",
            color: "#0F172A",
          }}
        >
          <div className="flex items-center gap-2 mb-5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
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
            className="rounded-xl p-3 space-y-3"
            style={{ background: "#F8FAFC" }}
          >
            <div className="flex items-center gap-2">
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
            <div className="flex gap-3">
              <div
                className="w-8 h-2 rounded-full"
                style={{ background: "#CBD5E1" }}
              />
              <div
                className="w-8 h-2 rounded-full"
                style={{ background: "#CBD5E1" }}
              />
              <div
                className="w-8 h-2 rounded-full"
                style={{ background: "#CBD5E1" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
