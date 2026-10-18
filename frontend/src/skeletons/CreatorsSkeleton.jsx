import { Search } from "lucide-react";

export default function CreatorsSkeleton() {
  return (
    <>
      {/* Search Bar matching Creators page */}
      <div
        className="gap-3 mb-8 px-4 py-3 rounded-xl flex items-center"
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
          Search creators...
        </span>
      </div>

      {/* Creators Grid Skeleton */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="flex-col p-6 h-full rounded-2xl flex 4xl:p-8"
            style={{
              backgroundColor: "var(--surface-card)",
              border: "1px solid var(--border-normal)",
            }}
          >
            <div className="mb-5 flex items-start space-x-4">
              {/* Avatar Skeleton */}
              <div className="w-16 h-16 rounded-full 4xl:w-21 4xl:h-21 shrink-0 skeleton-box animate-pulse" />

              {/* Creator Info Skeleton */}
              <div className="flex-1 mt-1 4xl:mt-3">
                <div className="mb-3 h-6 w-3/4 max-w-37.5 rounded 4xl:h-8 skeleton-box animate-pulse" />
                <div className="h-4 w-full max-w-50 rounded 4xl:h-5 skeleton-box animate-pulse" />
              </div>
            </div>

            <div
              className="mt-auto pt-4 justify-between border-t flex items-center"
              style={{ borderColor: "var(--border-light)" }}
            >
              {/* Stats Skeleton */}
              <div className="gap-3 flex">
                <div className="h-7 w-20 rounded-md 4xl:h-10 4xl:w-28 skeleton-box animate-pulse" />
                <div className="h-7 w-20 rounded-md 4xl:h-10 4xl:w-28 skeleton-box animate-pulse" />
              </div>

              {/* Button Skeleton */}
              <div className="w-8 h-8 rounded-full 4xl:w-11 4xl:h-11 skeleton-box animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
