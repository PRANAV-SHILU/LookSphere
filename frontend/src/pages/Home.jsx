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
import TechStack from "../components/home/TechStack";
import FAQSection from "../components/home/FAQSection";
import FuturePlans from "../components/home/FuturePlans";
import CTASection from "../components/home/CTASection";
import ThankYouSection from "../components/home/ThankYouSection";

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
      </section>
    </>
  );
}
