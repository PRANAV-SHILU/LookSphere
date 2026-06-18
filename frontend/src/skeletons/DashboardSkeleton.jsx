export default function DashboardSkeleton() {
  return (
    <div>
      {/* Header Skeleton */}
      <div className="my-6 text-center md:text-left">
        <div className="h-10 md:h-12 4xl:h-16 w-64 md:w-80 4xl:w-[400px] bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mb-3 mx-auto md:mx-0" />
        <div className="h-5 md:h-6 4xl:h-8 w-80 md:w-96 4xl:w-[500px] bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mx-auto md:mx-0 max-w-full" />
      </div>

      {/* Tabs Skeleton */}
      <div className="tab-container mx-auto p-1 gap-1.5 mt-2 mb-6 sm:p-[0.35rem] sm:gap-2 sm:mt-[10px] sm:mb-8 4xl:p-2.5 4xl:gap-4 4xl:mt-12 4xl:mb-12 flex">
        <div className="h-8 sm:h-10 4xl:h-14 w-24 sm:w-32 4xl:w-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
        <div className="h-8 sm:h-10 4xl:h-14 w-24 sm:w-32 4xl:w-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
        <div className="h-8 sm:h-10 4xl:h-14 w-24 sm:w-32 4xl:w-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
      </div>

      {/* Content Skeleton (Metrics Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 4xl:gap-6 mb-8 4xl:mb-12">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="p-6 rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse h-28 sm:h-32 4xl:h-44" style={{ backgroundColor: "var(--surface-card)" }} />
        ))}
      </div>
      
      {/* Table Skeleton */}
      <div className="w-full rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse h-64 4xl:h-[400px]" style={{ backgroundColor: "var(--surface-card)" }} />
    </div>
  );
}
