export default function ExploreSkeleton() {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-[2px] sm:gap-[4px]">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => {
        return (
          <div
            key={i}
            className="relative overflow-hidden bg-zinc-900 animate-pulse aspect-[4/5] md:aspect-[3/4] min-h-[220px] sm:min-h-[280px] md:min-h-[350px]"
          >
            {/* Base block simulating media */}
            <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 opacity-20" />

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
  );
}
