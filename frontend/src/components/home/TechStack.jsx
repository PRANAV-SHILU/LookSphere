import { Code2 } from "lucide-react";
import { techStack } from "../../utils/staticData";
import { GLASS_SHADOW } from "../../utils/styles";
import { SectionHeading } from "../../shared-components/SharedHomeComponents";

export default function TechStack() {
  return (
    <div className="w-full py-10 xsm:py-12 sm:py-16 md:py-20 3xl:py-24 px-3 xsm:px-4 sm:px-8 md:px-12">
      <SectionHeading
        icon={Code2}
        title="Built With the Best"
        subtitle="Powered by a modern, robust technology stack."
      />

      <div
        className="flex flex-wrap justify-center gap-2.5 xsm:gap-3 sm:gap-4 max-w-4xl 3xl:max-w-5xl mx-auto"
      >
        {techStack.map((tech) => {
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
