function ContactCardSkeleton() {
  return (
    <div
      className="flex-col p-3.5 gap-3.5 rounded-2xl border xsm:p-4 sm:p-5 flex animate-pulse"
      style={{
        backgroundColor: "var(--surface-input)",
        borderColor: "var(--border-normal)",
      }}
    >
      {/* Top row: Category badge + Timestamp */}
      <div className="gap-3 flex items-center">
            <div className="h-5 w-24 rounded-full sm:w-28 skeleton-box" />
        <div className="h-4 w-48 rounded sm:w-38 skeleton-box" />
      </div>

      {/* Form details box: Submitted as name · email */}
      <div
        className="gap-2 px-3 py-2.5 rounded-xl border flex items-center"
        style={{
          background: "var(--surface-card)",
          borderColor: "var(--border-light)",
        }}
      >
        <div className="w-3.5 h-3.5 rounded-full skeleton-box shrink-0" />
        <div className="h-3.5 w-42 rounded skeleton-box" />
        <div className="h-3.5 w-32 rounded skeleton-box hidden sm:block" />
      </div>

      {/* Message lines */}
      <div className="flex-col gap-2 my-0.5 flex">
        <div className="h-4 w-full rounded skeleton-box" />
        <div className="h-4 w-5/6 rounded skeleton-box" />
        <div className="h-4 w-2/3 rounded skeleton-box" />
      </div>

      {/* Attached Media preview box skeleton */}
      <div className="gap-2 mt-1 flex items-center">
        <div className="w-14 h-14 rounded-lg skeleton-box shrink-0" />
        <div className="w-14 h-14 rounded-lg skeleton-box shrink-0" />
        <div className="w-14 h-14 rounded-lg skeleton-box shrink-0" />
      </div>

      {/* Status banner (Pending or Admin reply placeholder) */}
      <div className="mt-1 h-10 w-full rounded-xl opacity-90 skeleton-box" />
    </div>
  );
}

export { ContactCardSkeleton };

export default function MyInquiriesSkeleton() {
  return (
    <div className="flex-col gap-3 flex sm:gap-4">
      {[1, 2, 3].map((i) => (
        <ContactCardSkeleton key={i} />
      ))}
    </div>
  );
}
