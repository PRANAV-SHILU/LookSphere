import { useRouteLoaderData } from "react-router-dom";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import { useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";

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


export default function Home() {
  const user = useRouteLoaderData("root");
  useDocumentMetadata("Home");

  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem("hasVisitedHome");
  });

  useEffect(() => {
    if (!isLoading) return;
    const delay = 1200;
    // Artificial delay for the cool loading animation
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("hasVisitedHome", "true");
    }, delay);
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-(--bg-primary) liquid-glass">
          <PropagateLoader
            color="var(--primary-500)"
            size={15}
            speedMultiplier={1.5}
          />
          <p className="mt-12 text-(--primary-500) font-semibold tracking-widest uppercase text-sm">
            Loading LookSphere
          </p>
        </div>
      )}

      <section className="relative z-0 flex flex-col items-center w-full gap-0 mt-2 xsm:mt-4 sm:mt-8 3xl:mt-12 pb-8">
        <div className="homepage-section w-full"><HeroSection user={user} /></div>

        <div className="homepage-section w-full"><WhyLookSphere /></div>
        <div className="homepage-section w-full"><HowItWorks /></div>
        <div className="homepage-section w-full"><WhatYouCanDo /></div>
        <WaveDivider className="mt-4" />

        <div className="homepage-section w-full"><AppShowcase /></div>
        <div className="homepage-section w-full"><ThemePreview /></div>
        <div className="homepage-section w-full"><ActivityFeed /></div>
        <WaveDivider className="mt-4" />

        <div className="homepage-section w-full"><TechStack /></div>
        <div className="homepage-section w-full"><SecurityPrivacy /></div>
        <div className="homepage-section w-full"><FAQSection /></div>
        <WaveDivider className="mt-4" />

        <div className="homepage-section w-full"><FuturePlans /></div>
        <div className="homepage-section w-full"><CTASection user={user} /></div>
        <div className="homepage-section w-full"><ThankYouSection /></div>
      </section>
    </>
  );
}
