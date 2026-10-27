export function CardGlow() {
  return (
    <div
      className="card-glow opacity-0 absolute inset-0 group-hover:opacity-[0.06] transition-opacity duration-300 pointer-events-none"
      style={{
        background: "linear-gradient(135deg, var(--primary-500), transparent)",
      }}
    />
  );
}

export function WaveDivider({ flip = false, className = "" }) {
  return (
    <div
      className={`hidden md:block max-w-5xl mx-auto overflow-hidden pointer-events-none select-none ${flip ? "rotate-180" : ""} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="w-full h-10 sm:h-14 md:h-18 block"
      >
        <path
          d="M0,40 C320,80 640,0 960,40 C1120,60 1320,50 1440,40 L1440,100 L0,100 Z"
          style={{ fill: "var(--surface-card)" }}
          opacity="0.35"
        />
        <path
          d="M0,55 C360,85 720,25 1080,55 C1280,70 1400,60 1440,55 L1440,100 L0,100 Z"
          style={{ fill: "var(--surface-card)" }}
          opacity="0.18"
        />
      </svg>
    </div>
  );
}

export function HeroBackground() {
  return (
    <div
      className="overflow-hidden rounded-2xl absolute inset-0 pointer-events-none -z-10"
      aria-hidden="true"
    >
      <div className="top-[10%] w-48 h-48 rounded-full bg-blue-500/30 hero-orb-1 absolute left-[15%] sm:w-72 sm:h-72 dark:bg-blue-500/20 blur-[80px]" />
      <div className="top-[50%] w-56 h-56 rounded-full bg-purple-500/25 hero-orb-2 absolute right-[10%] sm:w-80 sm:h-80 dark:bg-purple-500/15 blur-[100px]" />
      <div className="bottom-[5%] w-40 h-40 rounded-full bg-cyan-400/25 hero-orb-3 absolute left-[35%] sm:w-64 sm:h-64 dark:bg-cyan-400/10 blur-[80px]" />
    </div>
  );
}

export function SectionHeading({ icon: Icon, title, subtitle, badge }) {
  return (
    <div className="mb-8 text-center xsm:mb-12 3xl:mb-16">
      {Icon && (
        <div>
          <Icon
          className="mb-2 w-8 h-8 mx-auto xsm:mb-4 sm: xsm:w-10 xsm:h-10 sm:w-12 sm:h-12 3xl:w-14 3xl:h-14"
            style={{ color: "var(--primary-500)" }}
          />
        </div>
      )}
      {badge && (
        <div 
          className="px-3 py-1 mb-4 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold shadow-sm border border-blue-200 inline-block dark:bg-blue-900/30 dark:text-blue-400 sm:text-sm tracking-wide uppercase dark:border-blue-800"
        >
          {badge}
        </div>
      )}
      <div className="mb-4 text-2xl font-bold hero-text xsm:text-3xl sm:text-4xl md:text-5xl 3xl:text-6xl 4xl:text-7xl">
        {title}
      </div>
      {subtitle && (
        <div className="text-sm text-(--text-muted) max-w-3xl mx-auto xsm:text-base sm:text-lg md:text-xl 3xl:text-2xl 3xl:max-w-4xl">
          {subtitle}
        </div>
      )}
    </div>
  );
}
