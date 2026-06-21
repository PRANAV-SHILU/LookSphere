export default function ExploreSkeleton() {
  return (
    <div className="columns-3 sm:columns-3 lg:columns-3 xl:columns-4 gap-2 sm:gap-4 space-y-2 sm:space-y-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
        // Randomize the height to simulate masonry look
        const randomHeight = ["h-48", "h-64", "h-80", "h-96"][i % 4];

        return (
          <div
            key={i}
            className={`break-inside-avoid relative rounded-xl overflow-hidden bg-zinc-900 border animate-pulse ${randomHeight}`}
            style={{ borderColor: "var(--border-normal)" }}
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
