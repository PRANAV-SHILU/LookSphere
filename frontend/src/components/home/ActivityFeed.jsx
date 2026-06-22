import { Zap } from "lucide-react";
import { activities } from "../../utils/staticData";
import { GLASS_SHADOW } from "../../utils/styles";
import { SectionHeading } from "../../shared-components/SharedHomeComponents";

export default function ActivityFeed() {
  return (
    <div className="w-full py-10 xsm:py-12 sm:py-16 md:py-20 3xl:py-24 px-3 xsm:px-4 sm:px-8 md:px-12">
      <SectionHeading
        icon={Zap}
        title="Live Activity"
        subtitle="See what's happening across the platform right now."
      />

      <div
        className="max-w-md 3xl:max-w-lg mx-auto h-72 overflow-hidden relative rounded-2xl liquid-glass border border-(--border-normal)"
        style={GLASS_SHADOW}
      >
        {/* Very Soon Badge */}
        <div className="absolute top-3 right-3 z-30 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-blue-500/20 shadow-sm flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />{" "}
          Very Soon
        </div>

        {/* Fade masks */}
        <div
          className="absolute top-0 left-0 right-0 h-16 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, var(--bg-primary), transparent)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-16 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, var(--bg-primary), transparent)",
          }}
        />

        {/* Activity list */}
        <div className="px-4 pt-4">
          {activities.map((activity, i) => {
            const ActIcon = activity.icon;
            return (
              <div
                key={i}
                className="glass flex items-center gap-3 rounded-xl px-4 py-3 mb-3 transition-all duration-200"
              >
                <div
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg"
                  style={{ backgroundColor: "var(--surface-input)" }}
                >
                  <ActIcon size={16} style={{ color: "var(--primary-500)" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-(--text-primary) font-medium">
                    {activity.user}
                  </span>{" "}
                  <span className="text-sm text-(--text-muted)">
                    {activity.action}
                  </span>
                </div>
                <span className="text-xs text-(--text-muted) shrink-0">
                  {activity.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
