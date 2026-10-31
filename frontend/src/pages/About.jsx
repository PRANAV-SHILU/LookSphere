import { useEffect } from "react";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import { WaveDivider } from "../shared-components/SharedHomeComponents";
import { BackButton } from "../shared-components/shared-components";
import AboutHero from "../components/about/AboutHero";
import AboutJourney from "../components/about/AboutJourney";
import AboutFeatures from "../components/about/AboutFeatures";
import AboutTechStack from "../components/about/AboutTechStack";
import AboutDeveloper from "../components/about/AboutDeveloper";

export default function About() {
  useDocumentMetadata("About Us", "Learn about LookSphere and the story behind its creation. Discover the mission of this modern social media platform built from scratch by Pranav Shilu.");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="flex-col gap-0 pb-8 mt-8 z-0 w-full relative flex items-center 3xl:mt-12">
      {/* Back Button */}
      <div className="px-3 mb-4 w-full max-w-4xl mx-auto 3xl:max-w-5xl 4xl:max-w-6xl xsm:px-4">
        <BackButton />
      </div>

      <AboutHero />

      <AboutJourney />
      <AboutFeatures />
      <WaveDivider className="mt-4" />

      <AboutTechStack />
      <AboutDeveloper />
    </section>
  );
}
