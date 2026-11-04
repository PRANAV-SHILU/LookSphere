export default function ProfileSkeleton() {
  return (
    <div className="pt-8 pb-16 px-4 w-full mx-auto md:px-8">
      {/* Header */}
      <section className="flex-col gap-3 max-w-150 mx-auto justify-center 4xl:max-w-250 flex items-start sm:gap-6">
        <div className="w-full justify-between flex items-center sm:my-2">
          <div className="h-8 w-40 rounded hidden sm:block md:h-9 4xl:h-12 md:w-48 4xl:w-64 skeleton-box animate-pulse" />
          <div className="h-10 w-24 rounded-full 4xl:h-12 4xl:w-32 skeleton-box animate-pulse ml-auto" />
        </div>

        <div className="flex-row mb-2 w-full flex items-start sm:items-start 4xl:mb-6">
          {/* Avatar */}
          <div className="w-22.5 h-22.5 rounded-full shrink-0 sm:w-37.5 sm:h-37.5 4xl:w-55 4xl:h-55 sm:mr-7 mr-4 4xl:mr-12 skeleton-box animate-pulse" />

          {/* Info */}
          <div className="flex-col gap-2 mt-1.5 w-full max-w-sm flex items-start 4xl:max-w-xl">
            <div className="mb-1 h-6 w-32 rounded sm:hidden block skeleton-box animate-pulse" />
            <div className="mb-2 h-6 w-48 rounded 4xl:h-8 4xl:w-72 skeleton-box animate-pulse" />
            
            {/* Stats */}
            <div className="my-4 gap-4 w-full hidden sm:flex 4xl:my-6 md:gap-6 4xl:gap-10">
              <div className="h-5 w-20 rounded 4xl:h-8 4xl:w-28 skeleton-box animate-pulse" />
              <div className="h-5 w-24 rounded 4xl:h-8 4xl:w-32 skeleton-box animate-pulse" />
              <div className="h-5 w-24 rounded 4xl:h-8 4xl:w-32 skeleton-box animate-pulse" />
            </div>

            {/* Bio */}
            <div className="flex-col gap-2 mt-2 w-full hidden sm:flex 4xl:gap-4 4xl:mt-4">
              <div className="h-4 w-full rounded 4xl:h-6 skeleton-box animate-pulse" />
              <div className="h-4 w-5/6 rounded 4xl:h-6 skeleton-box animate-pulse" />
              <div className="h-4 w-4/6 rounded 4xl:h-6 skeleton-box animate-pulse" />
            </div>
          </div>
        </div>

        {/* Mobile Stats & Bio */}
        <div className="gap-4 mb-1 w-full justify-center sm:hidden flex">
           <div className="h-10 w-16 rounded skeleton-box animate-pulse" />
           <div className="h-10 w-16 rounded skeleton-box animate-pulse" />
           <div className="h-10 w-16 rounded skeleton-box animate-pulse" />
        </div>
        <div className="flex-col gap-2 mt-2 w-full sm:hidden flex">
           <div className="h-3 w-full rounded skeleton-box animate-pulse" />
           <div className="h-3 w-5/6 rounded skeleton-box animate-pulse" />
        </div>
      </section>

      <hr className="mt-8 border-(--border-strong)" />

      {/* Feed Tabs Toggler */}
      <section className="px-1 py-0.5 mt-3 mb-6 mx-auto tab-container sm:p-2 sm:mt-5 sm:mb-8 4xl:p-2 4xl:gap-3 4xl:mt-8 4xl:mb-12">
        {["Images", "Videos", "Reshare"].map((label) => (
          <div
            key={label}
            className="py-0.5 px-3 text-sm text-transparent tab-btn sm:py-1.5 sm:px-6 xsm:text-base sm:text-xl 4xl:px-10 4xl:py-4 4xl:text-3xl skeleton-box animate-pulse select-none pointer-events-none"
          >
            {label}
          </div>
        ))}
      </section>

      {/* Grid */}
      <section className="w-full">
        <div className="grid grid-cols-2 gap-1 md:grid-cols-3 4xl:gap-2">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="aspect-square skeleton-box animate-pulse" style={{ borderRadius: "var(--radius-sm)" }} />
          ))}
        </div>
      </section>
    </div>
  );
}
