import { useRouteLoaderData } from "react-router-dom";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import { WaveDivider } from "../shared-components/SharedHomeComponents";
import { ScrollToTopButton } from "../shared-components/shared-components";
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
  useDocumentMetadata("Home", "Welcome to LookSphere, a next-generation social media platform by Pranav Shilu. Spark posts, reshare creations, track support inquiries, and discover and connect with global creators.");

  return (
    <>
      <section className="flex-col gap-0 mt-2 pb-8 z-0 w-full max-w-5xl mx-auto relative flex items-center xsm:mt-4 sm:mt-8 3xl:mt-12">
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

      <ScrollToTopButton />
    </>
  );
}
