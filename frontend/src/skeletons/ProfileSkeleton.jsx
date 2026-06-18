export default function ProfileSkeleton() {
  return (
    <div className="w-full mx-auto pt-8 pb-16 px-4 md:px-8">
      {/* Header */}
      <section className="max-w-[600px] 4xl:max-w-[1000px] mx-auto flex flex-col items-start gap-3 sm:gap-6 justify-center">
        <div className="flex w-full justify-between items-center sm:my-2">
          <div className="hidden sm:block h-8 md:h-9 4xl:h-12 w-40 md:w-48 4xl:w-64 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
          <div className="h-10 4xl:h-12 w-24 4xl:w-32 bg-zinc-200 dark:bg-zinc-800 rounded-full animate-pulse ml-auto" />
        </div>

        <div className="flex flex-row items-start sm:items-start w-full mb-2 4xl:mb-6">
          {/* Avatar */}
          <div className="shrink-0 sm:w-[150px] sm:h-[150px] 4xl:w-[220px] 4xl:h-[220px] w-[90px] h-[90px] sm:mr-7 mr-4 4xl:mr-12 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />

          {/* Info */}
          <div className="flex flex-col items-start gap-2 mt-1.5 w-full max-w-sm 4xl:max-w-xl">
            <div className="sm:hidden block h-6 w-32 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mb-1" />
            <div className="h-6 4xl:h-8 w-48 4xl:w-72 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mb-2" />
            
            {/* Stats */}
            <div className="hidden sm:flex my-4 4xl:my-6 gap-4 md:gap-6 4xl:gap-10 w-full">
              <div className="h-5 4xl:h-8 w-20 4xl:w-28 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-5 4xl:h-8 w-24 4xl:w-32 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-5 4xl:h-8 w-24 4xl:w-32 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
            </div>

            {/* Bio */}
            <div className="hidden sm:flex flex-col gap-2 4xl:gap-4 w-full mt-2 4xl:mt-4">
              <div className="h-4 4xl:h-6 w-full bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-4 4xl:h-6 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-4 4xl:h-6 w-4/6 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Mobile Stats & Bio */}
        <div className="sm:hidden w-full flex justify-center gap-4 mb-1">
           <div className="h-10 w-16 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
           <div className="h-10 w-16 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
           <div className="h-10 w-16 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
        </div>
        <div className="sm:hidden flex flex-col gap-2 w-full mt-2">
           <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
           <div className="h-3 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
        </div>
      </section>

      <hr className="mt-8 border-(--border-strong)" />

      {/* Tabs */}
      <section className="mx-auto mt-3 sm:mt-5 mb-6 sm:mb-8 flex justify-center gap-2 sm:gap-4 4xl:gap-6">
         <div className="h-10 sm:h-12 4xl:h-16 w-24 sm:w-32 4xl:w-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
         <div className="h-10 sm:h-12 4xl:h-16 w-24 sm:w-32 4xl:w-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
      </section>

      {/* Grid */}
      <section className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 4xl:gap-2">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="aspect-square bg-zinc-200 dark:bg-zinc-800 animate-pulse" style={{ borderRadius: "var(--radius-sm)" }} />
          ))}
        </div>
      </section>
    </div>
  );
}
