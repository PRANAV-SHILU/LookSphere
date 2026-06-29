import { useRouteLoaderData } from "react-router-dom";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import { WaveDivider } from "../shared-components/SharedHomeComponents";
import HeroSection from "../components/home/HeroSection";
import WhyLookSphere from "../components/home/WhyLookSphere";
import HowItWorks from "../components/home/HowItWorks";
import SecurityPrivacy from "../components/home/SecurityPrivacy";
import WhatYouCanDo from "../components/home/WhatYouCanDo";
import AppShowcase from "../components/home/AppShowcase";
import ThemePreview from "../components/home/ThemePreview";
import ActivityFeed from "../components/home/ActivityFeed";
import ReleasesAndVision from "../components/home/ReleasesAndVision";
import SupportAndPolicies from "../components/home/SupportAndPolicies";
import TechStack from "../components/home/TechStack";
import CTASection from "../components/home/CTASection";

export default function Home() {
  const user = useRouteLoaderData("root");
  useDocumentMetadata("Home");

  return (
    <>
      <section className="relative z-0 flex flex-col items-center w-full gap-0 mt-2 xsm:mt-4 sm:mt-8 3xl:mt-12 pb-8">
        <HeroSection user={user} />

        <WhyLookSphere />
        <HowItWorks />
        <WhatYouCanDo />
        <ReleasesAndVision />
        <WaveDivider className="mt-4" />

        <AppShowcase />
        <ThemePreview />
        <ActivityFeed />
        <WaveDivider className="mt-4" />

        <TechStack />
        <SecurityPrivacy />
        <SupportAndPolicies />

        <CTASection user={user} />
      </section>
    </>
  );
}
