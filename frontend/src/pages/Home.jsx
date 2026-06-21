import { useRouteLoaderData } from "react-router-dom";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import {
  motion as Motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";
import { HomeAnimation } from "../utils/animation";

import { WaveDivider } from "../shared-components/SharedHomeComponents";
import HeroSection from "../components/home/HeroSection";
import WhyLookSphere from "../components/home/WhyLookSphere";
import HowItWorks from "../components/home/HowItWorks";
import SecurityPrivacy from "../components/home/SecurityPrivacy";
import WhatYouCanDo from "../components/home/WhatYouCanDo";
import AppShowcase from "../components/home/AppShowcase";
import ThemePreview from "../components/home/ThemePreview";
import ActivityFeed from "../components/home/ActivityFeed";
import TechStack from "../components/home/TechStack";
import FAQSection from "../components/home/FAQSection";
import FuturePlans from "../components/home/FuturePlans";
import CTASection from "../components/home/CTASection";
import ThankYouSection from "../components/home/ThankYouSection";

function DesktopParallaxBackground() {
  const { scrollYProgress } = useScroll();
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const parallaxY3 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none -z-10"
      aria-hidden="true"
    >
      <Motion.div
        className="absolute top-[15%] left-[5%] w-32 sm:w-48 h-32 sm:h-48 rounded-full bg-blue-500/10 dark:bg-blue-500/3 blur-3xl"
        style={{ y: parallaxY1 }}
      />
      <Motion.div
        className="absolute top-[45%] right-[8%] w-40 sm:w-56 h-40 sm:h-56 rounded-full bg-purple-500/10 dark:bg-purple-500/4 blur-3xl"
        style={{ y: parallaxY2 }}
      />
      <Motion.div
        className="absolute top-[75%] left-[45%] w-36 sm:w-52 h-36 sm:h-52 rounded-full bg-cyan-500/10 dark:bg-cyan-500/3 blur-3xl"
        style={{ y: parallaxY3 }}
      />
    </div>
  );
}

export default function Home() {
  const user = useRouteLoaderData("root");
  useDocumentMetadata("Home");

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem("hasVisitedHome");
  });

  useEffect(() => {
    if (!isLoading) return;
    const delay = isMobile ? 2400 : 1200;
    // Artificial delay for the cool loading animation
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("hasVisitedHome", "true");
    }, delay);
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <Motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-(--bg-primary) liquid-glass"
            {...HomeAnimation.loadingScreen}
          >
            <PropagateLoader
              color="var(--primary-500)"
              size={15}
              speedMultiplier={1.5}
            />
            <Motion.p
              className="mt-12 text-(--primary-500) font-semibold tracking-widest uppercase text-sm"
              {...HomeAnimation.loadingText}
            >
              Loading LookSphere
            </Motion.p>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* PARALLAX BACKGROUND */}
      {!isMobile && <DesktopParallaxBackground />}

      <Motion.section
        className="relative z-0 flex flex-col items-center w-full gap-0 mt-2 xsm:mt-4 sm:mt-8 3xl:mt-12 pb-8"
        {...HomeAnimation.pageTransition}
      >
        <HeroSection user={user} />

        <WhyLookSphere />
        <HowItWorks />
        <WhatYouCanDo />
        <WaveDivider className="mt-4" />

        <AppShowcase />
        <ThemePreview />
        <ActivityFeed />
        <WaveDivider className="mt-4" />

        <TechStack />
        <SecurityPrivacy />
        <FAQSection />
        <WaveDivider className="mt-4" />

        <FuturePlans />
        <CTASection user={user} />
        <ThankYouSection />
      </Motion.section>
    </>
  );
}
