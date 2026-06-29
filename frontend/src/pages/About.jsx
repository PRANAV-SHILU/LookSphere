import { useEffect } from "react";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import { WaveDivider } from "../shared-components/SharedHomeComponents";
import BackButton from "../shared-components/BackButton";
import AboutHero from "../components/about/AboutHero";
import AboutJourney from "../components/about/AboutJourney";
import AboutFeatures from "../components/about/AboutFeatures";
import AboutTechStack from "../components/about/AboutTechStack";
import AboutDeveloper from "../components/about/AboutDeveloper";

export default function About() {
  useDocumentMetadata("About Us");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="relative z-0 flex flex-col items-center w-full gap-0 mt-2 xsm:mt-4 sm:mt-8 3xl:mt-12 pb-8">
      {/* Back Button */}
      <div className="w-full max-w-4xl 3xl:max-w-5xl 4xl:max-w-6xl mx-auto px-3 xsm:px-4 mb-4">
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
