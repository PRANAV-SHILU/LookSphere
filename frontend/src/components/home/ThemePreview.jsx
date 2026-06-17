import { motion as Motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { HomeAnimation } from "../../utils/animation";
import { SectionHeading } from "./Shared";

export default function ThemePreview() {
  return (
    <div className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12">
      <SectionHeading
        title="Beautiful in Any Light"
        subtitle="Seamlessly switch between dark and light themes. Your eyes, your choice."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* Light Mode Card */}
        <Motion.div
          className="rounded-2xl p-6 border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          style={{
            background: "#FFFFFF",
            borderColor: "#E2E8F0",
            color: "#0F172A",
          }}
          {...HomeAnimation.slideInLeft}
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
                className="w-6 h-6 rounded-full"
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
        </Motion.div>

        {/* Dark Mode Card */}
        <Motion.div
          className="rounded-2xl p-6 border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          style={{
            background: "#18181B",
            borderColor: "#27272A",
            color: "#F8FAFC",
          }}
          {...HomeAnimation.slideInRight}
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
                className="w-6 h-6 rounded-full"
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
        </Motion.div>
      </div>
    </div>
  );
}
