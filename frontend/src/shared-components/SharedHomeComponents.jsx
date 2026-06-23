export function CardGlow() {
  return (
    <div
      className="card-glow absolute inset-0 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300 pointer-events-none"
      style={{
        background: "linear-gradient(135deg, var(--primary-500), transparent)",
      }}
    />
  );
}

export function WaveDivider({ flip = false, className = "" }) {
  return (
    <div
      className={`hidden md:block w-[90%] mdlg:w-full mx-auto overflow-hidden pointer-events-none select-none ${flip ? "rotate-180" : ""} ${className}`}
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
      className="absolute inset-0 overflow-hidden pointer-events-none -z-10 rounded-2xl"
      aria-hidden="true"
    >
      <div className="hero-orb-1 absolute top-[10%] left-[15%] w-48 sm:w-72 h-48 sm:h-72 rounded-full bg-blue-500/30 dark:bg-blue-500/20 blur-[80px]" />
      <div className="hero-orb-2 absolute top-[50%] right-[10%] w-56 sm:w-80 h-56 sm:h-80 rounded-full bg-purple-500/25 dark:bg-purple-500/15 blur-[100px]" />
      <div className="hero-orb-3 absolute bottom-[5%] left-[35%] w-40 sm:w-64 h-40 sm:h-64 rounded-full bg-cyan-400/25 dark:bg-cyan-400/10 blur-[80px]" />
    </div>
  );
}

export function SectionHeading({ icon: Icon, title, subtitle, badge }) {
  return (
    <div className="text-center mb-8 xsm:mb-12 3xl:mb-16">
      {Icon && (
        <div>
          <Icon
          className="w-8 h-8 xsm:w-10 xsm:h-10 sm:w-12 sm:h-12 3xl:w-14 3xl:h-14 mx-auto mb-4"
            style={{ color: "var(--primary-500)" }}
          />
        </div>
      )}
      {badge && (
        <div 
          className="inline-block px-3 py-1 mb-4 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-sm border border-blue-200 dark:border-blue-800"
        >
          {badge}
        </div>
      )}
      <div className="hero-text text-2xl xsm:text-3xl sm:text-4xl md:text-5xl 3xl:text-6xl 4xl:text-7xl font-bold mb-4">
        {title}
      </div>
      {subtitle && (
        <div className="text-sm xsm:text-base sm:text-lg md:text-xl 3xl:text-2xl text-(--text-muted) max-w-3xl 3xl:max-w-4xl mx-auto">
          {subtitle}
        </div>
      )}
    </div>
  );
}
