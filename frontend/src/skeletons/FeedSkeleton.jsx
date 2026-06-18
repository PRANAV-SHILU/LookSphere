export default function FeedSkeleton() {
  return (
    <div className="flex flex-col gap-6 md:gap-8 max-w-2xl 4xl:max-w-4xl mx-auto mt-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="card w-full p-4 sm:p-5 flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3 w-full">
              <div className="w-10 h-10 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
              <div className="flex-1 max-w-[200px]">
                <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mb-1.5" />
                <div className="h-3 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
              </div>
            </div>
            <div className="hidden sm:block h-3 w-16 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
          </div>

          {/* Media */}
          <div className="w-full aspect-4/3 rounded-lg bg-zinc-200 dark:bg-zinc-800 animate-pulse" />

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-2 gap-4">
            <div className="w-full">
                <div className="h-4 w-full max-w-[80%] bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mb-2" />
                <div className="h-4 w-full max-w-[60%] bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
            </div>
            <div className="shrink-0 flex gap-2 w-full sm:w-auto justify-end">
                <div className="h-9 w-24 rounded-md bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                <div className="h-9 w-24 rounded-md bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
