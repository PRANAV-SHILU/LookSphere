// Animation variants grouped by page name namespaces

export const Users = {
  pageTransition: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4 },
  },
  containerVariants: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  },
  itemVariants: {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }
};

export const Dashboard = {
  pageTransition: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4 },
  },
  containerVariants: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  },
  itemVariants: {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }
};

export const Feed = {
  pageTransition: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4 },
  },
  containerVariants: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        stiffness: 280,
        damping: 24,
      },
    },
    exit: {
      opacity: 0,
      y: 60,
      transition: {
        duration: 0.2,
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
    transition: { duration: 0.4 },
  },
  containerVariants: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  },
  itemVariants: {
    hidden: { opacity: 0, y: -60, scale: 0.94 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
    exit: {
      opacity: 0,
      y: 60,
      scale: 0.94,
      transition: { duration: 0.2 },
    },
  },
  spinnerActive: { rotate: 360 },
  spinnerInactive: { rotate: 0 },
  spinnerTransitionActive: { repeat: Infinity, duration: 1, ease: "linear" },
  spinnerTransitionInactive: { duration: 0.2, ease: "easeOut" },
};

export const Home = {
  pageTransition: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.3 },
  },
  h1: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  h2: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: {
      duration: 0.5,
      delay: 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  p: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: {
      duration: 0.5,
      delay: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  cardAnimation: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    viewport: { once: false, amount: 0.2 },
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  bottomAnimation: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    viewport: { once: false, amount: 0.1 },
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }
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
  themeToggleHover: { scale: 1.1 },
  themeToggleTap: { scale: 0.9 },
  themeIconTransition: {
    initial: { rotate: -90, opacity: 0, scale: 0.5 },
    animate: { rotate: 0, opacity: 1, scale: 1 },
    exit: { rotate: 90, opacity: 0, scale: 0.5 },
    transition: { duration: 0.2, ease: "easeOut" },
  },
  avatarHover: { scale: 1.05 },
  avatarTap: { scale: 0.95 },
  dropdownTransition: {
    initial: { opacity: 0, y: -6, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -6, scale: 0.96 },
    transition: { duration: 0.15, ease: "easeOut" },
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



