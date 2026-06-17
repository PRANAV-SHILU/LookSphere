export const CARD_HOVER =
  "group relative isolate z-0 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(37,99,235,0.12)] dark:hover:shadow-[0_12px_28px_rgba(59,130,246,0.15)]";

export const CARD_HOVER_SUBTLE =
  "group relative isolate z-0 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_24px_rgba(37,99,235,0.08)] dark:hover:shadow-[0_8px_24px_rgba(59,130,246,0.12)]";

export const GLASS_SHADOW = { boxShadow: "var(--shadow-card)" };

export const BTN_LINK =
  "btn px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]";

export const desktopNavLinkClass = ({ isActive }) =>
  `relative text-sm 3xl:text-base 4xl:text-lg font-medium flex items-center gap-1.5 transition-all duration-300 group ` +
  `hover:text-(--primary-500) hover:-translate-y-[2px] hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] ` +
  `after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:bg-(--primary-500) after:transition-all after:duration-300 after:rounded-full ` +
  (isActive ? "text-(--primary-500) after:w-full" : "text-(--text-secondary) after:w-0 hover:after:w-full");

export const mobileNavLinkClass = ({ isActive }) =>
  `relative text-sm font-medium flex items-center gap-3 p-3.5 no-underline rounded-xl transition-all duration-300 ` +
  `hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 hover:-translate-y-0.5 hover:shadow-md ` +
  (isActive ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 shadow-sm" : "text-(--text-secondary)");
