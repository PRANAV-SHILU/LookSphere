// Animation variants grouped by page name namespaces

const isMobileDevice = typeof window !== "undefined" && window.innerWidth < 768;
const m = isMobileDevice ? 0.4 : 1.0;

export const Creators = {
  pageTransition: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4 * m },
  },
  containerVariants: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 * m },
    },
  },
  itemVariants: {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 0.9,
      y: 0,
      transition: { type: "spring", stiffness: isMobileDevice ? 600 : 300, damping: isMobileDevice ? 30 : 24 },
    },
  }
};

export const Dashboard = {
  pageTransition: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4 * m },
  },
  containerVariants: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 * m },
    },
  },
  itemVariants: {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: isMobileDevice ? 600 : 300, damping: isMobileDevice ? 30 : 24 },
    },
  }
};

export const Feed = {
  pageTransition: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4 * m },
  },
  containerVariants: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 * m,
      },
    },
  },
  cardVariants: {
    hidden: { opacity: 0, y: -80 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: isMobileDevice ? 560 : 280,
        damping: isMobileDevice ? 30 : 24,
      },
    },
    exit: {
      opacity: 0,
      y: 60,
      transition: {
        duration: 0.2 * m,
      },
    },
  },
  spinnerActive: { rotate: 360 },
  spinnerInactive: { rotate: 0 },
  spinnerTransitionActive: { repeat: Infinity, duration: 1, ease: "linear" },
  spinnerTransitionInactive: { duration: 0.2, ease: "easeOut" },
  scrollTopButton: {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: 20 },
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
  },
};

export const Explore = {
  pageTransition: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4 * m },
  },
  containerVariants: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 * m },
    },
  },
  itemVariants: {
    hidden: { opacity: 0, y: -60, scale: 0.94 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: isMobileDevice ? 600 : 300, damping: isMobileDevice ? 30 : 25 },
    },
    exit: {
      opacity: 0,
      y: 60,
      scale: 0.94,
      transition: { duration: 0.2 * m },
    },
  },
  spinnerActive: { rotate: 360 },
  spinnerInactive: { rotate: 0 },
  spinnerTransitionActive: { repeat: Infinity, duration: 1, ease: "linear" },
  spinnerTransitionInactive: { duration: 0.2, ease: "easeOut" },
};

export const HomeAnimation = isMobileDevice ? {
  pageTransition: {},
  h1: {},
  h2: {},
  p: {},
  cardAnimation: {},
  bottomAnimation: {},
  fadeInUp: {},
  fadeInUpSmall: {},
  fadeInUpBasic: {},
  scaleUpHover: {},
  featureCard: {},
  featureIcon: {},
  stepCard: {},
  stepIcon: {},
  tabContainer: {},
  tabContent: {},
  featureItem: {},
  showcaseApp: {},
  activityFeed: {},
  buttonEntrance: {},
  popIn: {},
  sparklesIcon: {},
  sectionHeadingIcon: {},
  heroTextChild: {},
  getAnimatedTextContainer: () => ({}),
  getAnimatedTextChild: () => ({}),
  heartPulse: {},
  techStackContainer: {},
  techStackItem: {},
  faqCard: {},
  futurePlanCard: {},
  futurePlanGroup: {},
  ctaCard: {},
  ctaIcon: {},
  thankYouContainer: {},
  thankYouHeart: {},
  scaleUp: {},
  slideInLeft: {},
  slideInRight: {},
  staggerContainer: {},
  loadingScreen: {},
  loadingText: {},
} : {
  pageTransition: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.3 * m },
  },
  h1: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 * m, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  h2: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: {
      duration: 0.5 * m,
      delay: 0.1 * m,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  p: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: {
      duration: 0.5 * m,
      delay: 0.2 * m,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  cardAnimation: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    viewport: { once: false, amount: 0.2 },
    transition: { duration: 0.5 * m, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  bottomAnimation: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    viewport: { once: false, amount: 0.1 },
    transition: { duration: 0.5 * m, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  // --- Reusable variants for Homepage ---
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6 * m, type: "spring", stiffness: isMobileDevice ? 250 : 100 },
  },
  fadeInUpSmall: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.5 * m },
  },
  fadeInUpBasic: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  scaleUpHover: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  },
  featureCard: {
    initial: { opacity: 0, y: 30, scale: 0.9 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: "-50px" },
    whileHover: { y: -10 },
  },
  featureIcon: {
    initial: { rotate: -180, opacity: 0 },
    whileInView: { rotate: 0, opacity: 1 },
    viewport: { once: true },
  },
  stepCard: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    whileHover: { scale: 1.03, y: -5 },
  },
  stepIcon: {
    whileHover: { rotate: 10, scale: 1.1 },
  },
  tabContainer: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  },
  tabContent: {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.98 },
    transition: { duration: 0.3 * m },
  },
  featureItem: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
  },
  showcaseApp: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 * m },
  },

  activityFeed: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 * m },
  },
  
  // --- Hero & CTA Icons ---
  buttonEntrance: {
    initial: { opacity: 0, scale: 0.9, y: 15 },
    whileInView: { opacity: 1, scale: 1, y: 0 },
    viewport: { once: true },
    transition: { type: "spring", stiffness: isMobileDevice ? 600 : 300, damping: isMobileDevice ? 30 : 20 },
  },
  popIn: {
    initial: { opacity: 0, scale: 0 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, margin: "-20px" },
    transition: { type: "spring", stiffness: isMobileDevice ? 800 : 500, damping: isMobileDevice ? 20 : 12, delay: 0.8 * m },
  },
  sparklesIcon: {
    initial: { scale: 0.8, opacity: 0, rotate: -10 },
    whileInView: { scale: 1, opacity: 1, rotate: 0 },
    viewport: { once: true },
    transition: { type: "spring", stiffness: isMobileDevice ? 400 : 200, damping: isMobileDevice ? 20 : 15 },
  },
  
  // --- Section Headings ---
  sectionHeadingIcon: {
    initial: { opacity: 0, scale: 0, y: 20 },
    whileInView: { opacity: 1, scale: 1, y: 0 },
    viewport: { once: true, margin: "-10px" },
    transition: { type: "spring", stiffness: isMobileDevice ? 250 : 120, damping: isMobileDevice ? 20 : 14, delay: 0.2 * m },
  },
  
  heroTextChild: {
    variants: {
      hidden: { opacity: 0, y: 50, rotateX: -90 },
      visible: { opacity: 1, y: 0, rotateX: 0 },
    },
    transition: { type: "spring", damping: isMobileDevice ? 18 : 12, stiffness: isMobileDevice ? 300 : 200 },
  },

  getAnimatedTextContainer: (stagger, delay) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: stagger * m, delayChildren: delay * m },
    },
  }),
  
  getAnimatedTextChild: (yOffset) => ({
    variants: {
      hidden: { opacity: 0, y: yOffset, rotateX: -90 },
      visible: { opacity: 1, y: 0, rotateX: 0 },
    },
    transition: { type: "spring", damping: isMobileDevice ? 22 : 15, stiffness: isMobileDevice ? 450 : 300 },
  }),

  heartPulse: {
    animate: { scale: [1, 1.2, 1] },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },

  techStackContainer: {
    variants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 * m },
      },
    },
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-50px" },
  },
  techStackItem: {
    variants: {
      hidden: { opacity: 0, scale: 0.8, y: 20 },
      visible: { opacity: 1, scale: 1, y: 0 },
    },
    transition: { type: "spring", stiffness: isMobileDevice ? 400 : 200, damping: isMobileDevice ? 20 : 15 },
    whileHover: { scale: 1.1, rotate: [-2, 2, -2, 0] },
  },
  faqCard: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  },
  futurePlanCard: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  },
  futurePlanGroup: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  },
  ctaCard: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 * m },
  },
  ctaIcon: {
    initial: { scale: 0.8, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    viewport: { once: true },
    transition: {
      delay: 0.2 * m,
      type: "spring",
      stiffness: isMobileDevice ? 400 : 200,
    },
  },
  thankYouContainer: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 * m },
  },
  thankYouHeart: {
    initial: { scale: 0 },
    whileInView: { scale: 1 },
    viewport: { once: true },
    transition: {
      delay: 0.2 * m,
      type: "spring",
      stiffness: isMobileDevice ? 400 : 200,
      damping: isMobileDevice ? 20 : 15,
    },
  },
  scaleUp: {
    initial: { opacity: 0, scale: 0.8 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true },
    transition: { type: "spring", stiffness: isMobileDevice ? 400 : 200, damping: isMobileDevice ? 20 : 15, delay: 0.1 * m },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -30 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6 * m },
  },
  slideInRight: {
    initial: { opacity: 0, x: 30 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6 * m },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 * m, delayChildren: 0.2 * m },
    },
  },
  loadingScreen: {
    initial: { opacity: 1 },
    exit: { opacity: 0, y: -50 },
    transition: { duration: 0.6 * m, ease: "easeInOut" },
  },
  loadingText: {
    animate: { opacity: [0.5, 1, 0.5] },
    transition: { repeat: Infinity, duration: 1.5 },
  },
};

export const Register = {
  pageTransition: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.3 },
  },
  cardTransition: {
    initial: { opacity: 0, y: 40, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  buttonHover: { scale: 1.01 },
  buttonTap: { scale: 0.98 },
};

export const Login = {
  pageTransition: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.3 },
  },
  cardTransition: {
    initial: { opacity: 0, y: 40, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  buttonHover: { scale: 1.01 },
  buttonTap: { scale: 0.98 },
};

export const Profile = {
  pageTransition: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.3 },
  },
  backdropTransition: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  dialogTransition: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
    transition: { delay: 0.1, type: "spring", stiffness: 300, damping: 25 },
  },
  spinnerTransition: {
    animate: { rotate: 360 },
    transition: { repeat: Infinity, duration: 0.8, ease: "linear" },
  },
};

export const EditProfile = {
  pageTransition: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.3 },
  },
  backdropTransition: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  dialogTransition: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
    transition: { delay: 0.1, type: "spring", stiffness: 300, damping: 25 },
  },
  spinnerTransition: {
    animate: { rotate: 360 },
    transition: { repeat: Infinity, duration: 0.8, ease: "linear" },
  },
  cancelButtonHover: { scale: 1.01, opacity: 0.75 },
  saveButtonHover: { scale: 1.01, opacity: 0.85 },
  buttonTap: { scale: 0.98 },
  buttonTransition: { duration: 0.15 },
};

export const ConfirmationModal = {
  backdropTransition: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  dialogTransition: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
  },
};

export const PostDetailModal = {
  backdropTransition: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },
  dialogTransition: {
    initial: { scale: 0.92, opacity: 0, y: 20 },
    animate: { scale: 1, opacity: 1, y: 0 },
    exit: { scale: 0.92, opacity: 0, y: 20 },
    transition: { type: "spring", stiffness: 350, damping: 30 },
  },
  dropdownTransition: {
    initial: { opacity: 0, scale: 0.95, y: -10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -10 },
    transition: { duration: 0.15 },
  },
};

export const UploadMediaModal = {
  backdropTransition: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  dialogTransition: {
    initial: { scale: 0.95, y: 15, opacity: 0 },
    animate: { scale: 1, y: 0, opacity: 1 },
    exit: { scale: 0.95, y: 15, opacity: 0 },
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
};

export const Header = {
  headerTransition: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  logoTransition: {
    initial: { opacity: 0, x: -16 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4, delay: 0.1 },
  },
  navTransition: {
    initial: { opacity: 0, x: 16 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4, delay: 0.15 },
  },
  thankYouHeart: {
    initial: { scale: 0 },
    whileInView: { scale: 1 },
    viewport: { once: true },
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
  scaleUp: {
    initial: { opacity: 0, scale: 0.8 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true },
    transition: { type: "spring", stiffness: 200, damping: 15, delay: 0.1 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -30 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 30 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6 },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  },
  loadingScreen: {
    initial: { opacity: 1 },
    exit: { opacity: 0, y: -50 },
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  loadingText: {
    animate: { opacity: [0.5, 1, 0.5] },
    transition: { repeat: Infinity, duration: 1.5 },
  },
};
export const PageNotFound = {
  pageTransition: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  h1: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { delay: 0.1, duration: 0.45, type: "spring", stiffness: 200 },
  },
  h2: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.2, duration: 0.4 },
  },
  p: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.3, duration: 0.4 },
  },
  buttonWrapper: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.4, duration: 0.4 },
  },
};

export const ErrorBoundary = {
  containerTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const ModalAnimation = {
  spinner: {
    animate: { rotate: 360 },
    transition: { repeat: Infinity, duration: 0.8, ease: "linear" },
  },
};
