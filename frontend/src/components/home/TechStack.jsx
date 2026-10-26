import { Code2 } from "lucide-react";
import { techStack } from "../../utils/HomeStaticData";
import { GLASS_SHADOW } from "../../utils/styles";
import { SectionHeading } from "../../shared-components/SharedHomeComponents";

export default function TechStack() {
  return (
    <div className="py-10 px-3 w-full xsm:py-12 sm:py-16 md:py-20 3xl:py-24 xsm:px-4 sm:px-8 md:px-12">
      <SectionHeading
        icon={Code2}
        title="Built With the Best"
        subtitle="Powered by a modern, hardened technology stack, patched LTS runtimes, and high-performance algorithms."
      />

      <div
        className="flex-wrap gap-2.5 justify-center w-full flex xsm:gap-3"
      >
        {techStack.map((tech) => {
          const TechIcon = tech.icon;
          return (
            <div
              key={tech.name}
              className="px-4 py-2.5 gap-2 rounded-full glass sm:px-5 flex items-center cursor-default transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-lg"
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
