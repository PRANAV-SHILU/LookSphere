export default function CreatorsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 2xl:gap-8">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div
          key={i}
          className="flex flex-col h-full p-6 4xl:p-8 rounded-2xl"
          style={{
            backgroundColor: "var(--surface-card)",
            border: "1px solid var(--border-normal)",
          }}
        >
          <div className="flex items-start space-x-4 mb-5">
            {/* Avatar Skeleton */}
            <div className="w-16 h-16 4xl:w-[84px] 4xl:h-[84px] shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
            
            {/* Creator Info Skeleton */}
            <div className="flex-1 mt-1 4xl:mt-3">
              <div className="h-6 4xl:h-8 w-3/4 max-w-[150px] bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mb-3" />
              <div className="h-4 4xl:h-5 w-full max-w-[200px] bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
            </div>
          </div>

          <div
            className="flex items-center justify-between mt-auto pt-4 border-t"
            style={{ borderColor: "var(--border-light)" }}
          >
            {/* Stats Skeleton */}
            <div className="flex gap-3">
              <div className="h-7 w-20 4xl:h-10 4xl:w-28 bg-zinc-200 dark:bg-zinc-800 rounded-md animate-pulse" />
              <div className="h-7 w-20 4xl:h-10 4xl:w-28 bg-zinc-200 dark:bg-zinc-800 rounded-md animate-pulse" />
            </div>
            
            {/* Button Skeleton */}
            <div className="w-8 h-8 4xl:w-11 4xl:h-11 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
