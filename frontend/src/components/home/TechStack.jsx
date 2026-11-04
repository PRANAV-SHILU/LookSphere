import { Code2 } from "lucide-react";
import { techStack } from "../../utils/HomeStaticData";
import { GLASS_SHADOW } from "../../utils/styles";
import { SectionHeading } from "../../shared-components/SharedHomeComponents";

export default function TechStack() {
  return (
    <div className="py-10 w-full xsm:py-12 sm:py-16 md:py-20 3xl:py-24 xsm:px-4 sm:px-8 md:px-12">
      <SectionHeading
        icon={Code2}
        title="Built With the Best"
        subtitle="Powered by a modern, hardened technology stack, patched LTS runtimes, and high-performance algorithms."
      />

      <div
        className="flex-wrap gap-1.5 justify-center w-full mdlg:gap-3 flex"
      >
        {techStack.map((tech) => {
          const TechIcon = tech.icon;
          return (
            <div
              key={tech.name}
              className="px-3 py-2.5 gap-1 rounded-full mdlg:px-5 mdlg:gap-2 glass flex items-center cursor-default transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-lg"
              style={GLASS_SHADOW}
            >
              <TechIcon className="w-3.5 h-3.5 mdlg:w-4.5 mdlg:h-4.5 shrink-0" style={{ color: tech.color }} />
              <span className="text-xs font-medium text-(--text-primary) mdlg:text-sm">
                {tech.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
