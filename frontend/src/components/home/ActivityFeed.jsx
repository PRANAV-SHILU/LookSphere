import { Zap } from "lucide-react";
import { activities } from "../../utils/HomeStaticData";
import { GLASS_SHADOW } from "../../utils/styles";
import { SectionHeading } from "../../shared-components/SharedHomeComponents";

export default function ActivityFeed() {
  return (
    <div className="py-10 px-2 w-full xsm:py-12 sm:py-16 md:py-20 3xl:py-24 xsm:px-4 sm:px-8 md:px-12">
      <SectionHeading
        icon={Zap}
        title="Live Activity"
        subtitle="See what's happening across the platform right now."
      />

      <div
        className="max-w-lg mx-auto h-88 overflow-hidden rounded-2xl border border-(--border-normal) 3xl:max-w-lg relative liquid-glass"
        style={GLASS_SHADOW}
      >
        {/* Live Stream Badge */}
        <div className="px-2.5 py-1 gap-1.5 top-3 z-30 rounded-full bg-blue-500/10 text-blue-600 text-xs font-bold border-none shadow-sm absolute right-3 dark:text-blue-400 uppercase tracking-wider md:border md:border-blue-500/20 flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />{" "}
          Live Stream (Very Soon)
        </div>

        {/* Fade masks */}
        <div
          className="top-0 h-16 z-10 absolute left-0 right-0 pointer-events-none hidden md:block"
          style={{
            background:
              "linear-gradient(to bottom, var(--bg-primary), transparent)",
          }}
        />
        <div
          className="bottom-0 h-16 z-10 absolute left-0 right-0 pointer-events-none hidden md:block"
          style={{
            background:
              "linear-gradient(to top, var(--bg-primary), transparent)",
          }}
        />

        {/* Activity list */}
        <div className="px-2 pt-4 xsm:px-4">
          {activities.map((activity, i) => {
            const ActIcon = activity.icon;
            return (
              <div
                key={i}
                className="gap-2 px-2 py-3 mb-3 rounded-xl xsm:px-4 xsm:gap-3 glass flex items-center transition-all duration-200"
              >
                <div
                  className="w-8 h-8 justify-center rounded-lg shrink-0 flex items-center"
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
