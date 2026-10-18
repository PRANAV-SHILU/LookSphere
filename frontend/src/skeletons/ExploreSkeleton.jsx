import { Search, RotateCw } from "lucide-react";

export default function ExploreSkeleton() {
  return (
    <>
      {/* Search Bar Skeleton matching Explore page */}
      <div
        className="gap-3 mb-4 px-4 py-3 rounded-xl flex items-center"
        style={{
          backgroundColor: "var(--surface-input)",
          border: "1px solid var(--border-normal)",
        }}
      >
        <Search size={18} style={{ color: "var(--text-muted)" }} />
        <span
          className="text-sm select-none"
          style={{ color: "var(--text-muted)" }}
        >
          Search by caption or alt text...
        </span>
      </div>

      {/* Action Row matching Explore page (Posts count + Refresh Explorer button) */}
      <div className="mb-8 justify-between text-sm flex items-center">
        <span style={{ color: "var(--text-muted)" }} />
        <div
          className="gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center select-none"
          style={{
            backgroundColor: "var(--surface-input)",
            color: "var(--text-secondary)",
            border: "1px solid var(--border-normal)",
          }}
        >
          <RotateCw size={14} />
          <span>Refresh Explorer</span>
        </div>
      </div>

      {/* Explore Grid Skeleton */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-0.5 sm:gap-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => {
          return (
            <div
              key={i}
              className="relative overflow-hidden bg-zinc-900 animate-pulse aspect-4/5 md:aspect-3/4 min-h-55 sm:min-h-70 md:min-h-87.5"
            >
              {/* Base block simulating media */}
              <div className="w-full h-full skeleton-box opacity-75" />

              {/* Simulating bottom gradient info overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-zinc-400 dark:bg-zinc-600 shrink-0" />
                  <div className="h-3 w-20 bg-zinc-400 dark:bg-zinc-600 rounded" />
                </div>
                <div className="h-3 w-full bg-zinc-400 dark:bg-zinc-600 rounded mb-1" />
                <div className="h-3 w-2/3 bg-zinc-400 dark:bg-zinc-600 rounded" />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
