import { motion as Motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { HomeAnimation } from "../../utils/animation";
import { futurePlans } from "../../utils/staticData";
import { CARD_HOVER, GLASS_SHADOW } from "../../utils/styles";
import {
  SectionHeading,
  CardGlow,
} from "../../shared-components/SharedHomeComponents";

export default function FuturePlans() {
  return (
    <div className="w-full py-10 xsm:py-12 sm:py-16 md:py-20 3xl:py-24 px-3 xsm:px-4 sm:px-8 md:px-12">
      <SectionHeading
        icon={Rocket}
        title="Future Plans"
        subtitle="We're constantly evolving. Here's what's coming next to LookSphere."
      />

      <div className="flex flex-col gap-6 xsm:gap-8 max-w-5xl 3xl:max-w-6xl mx-auto">
        <Motion.div
          className="glass w-full p-6 sm:p-8 rounded-2xl"
          style={GLASS_SHADOW}
          {...HomeAnimation.futurePlanCard}
        >
          <div className="flex flex-col gap-8">
            {futurePlans.map((group, groupIndex) => (
              <Motion.div
                key={group.category}
                {...HomeAnimation.futurePlanGroup}
                transition={{ delay: groupIndex * 0.1 }}
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-4 text-(--text-primary)">
                  {group.category}
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {group.items.map((item) => (
                    <li
                      key={item.label}
                      className={`${CARD_HOVER} glass flex items-center gap-3 rounded-xl p-4 text-sm sm:text-base`}
                      style={GLASS_SHADOW}
                    >
                      <CardGlow />
                      <div
                        className="relative shrink-0 w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-105 border-2 border-transparent group-hover:border-(--primary-500)"
                        style={{ backgroundColor: "var(--surface-input)" }}
                      >
                        <item.icon
                          size={18}
                          className="transition-colors duration-300 group-hover:text-(--primary-600)"
                          style={{ color: "var(--primary-500)" }}
                        />
                      </div>
                      <span className="relative text-(--text-secondary) group-hover:text-(--primary-600) transition-colors duration-300">
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </Motion.div>
            ))}
          </div>
        </Motion.div>
      </div>
    </div>
  );
}
