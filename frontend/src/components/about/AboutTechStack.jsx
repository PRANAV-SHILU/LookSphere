import { Code2 } from "lucide-react";
import { GLASS_SHADOW } from "../../utils/styles";
import { SectionHeading } from "../../shared-components/SharedHomeComponents";
import { ABOUT_TECH_FRONTEND, ABOUT_TECH_BACKEND } from "../../utils/aboutData";

function TechPillGroup({ title, techs }) {
  return (
    <div className="flex flex-col gap-4">
      <h3
        className="text-sm font-bold uppercase tracking-widest text-center"
        style={{ color: "var(--text-muted)" }}
      >
        {title}
      </h3>
      <div className="flex flex-wrap justify-center gap-2.5 xsm:gap-3">
        {techs.map((tech) => {
          const TechIcon = tech.icon;
          return (
            <div
              key={tech.name}
              className="glass rounded-full px-4 sm:px-5 py-2.5 flex items-center gap-2 cursor-default transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-lg"
              style={GLASS_SHADOW}
            >
              <TechIcon size={18} style={{ color: tech.color }} />
              <span className="text-sm font-medium text-(--text-primary)">
                {tech.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AboutTechStack() {
  return (
    <div className="w-full py-10 xsm:py-12 sm:py-16 md:py-20 3xl:py-24 px-3 xsm:px-4 sm:px-8 md:px-12">
      <SectionHeading
        icon={Code2}
        title="Built With the Best"
        subtitle="Powered by a modern, robust technology stack — from frontend to backend."
      />

      <div className="max-w-4xl 3xl:max-w-5xl mx-auto flex flex-col gap-8 xsm:gap-10">
        <TechPillGroup title="Frontend" techs={ABOUT_TECH_FRONTEND} />
        <div
          className="h-px w-3/4 mx-auto"
          style={{ backgroundColor: "var(--border-light)" }}
        />
        <TechPillGroup title="Backend" techs={ABOUT_TECH_BACKEND} />
      </div>
    </div>
  );
}
