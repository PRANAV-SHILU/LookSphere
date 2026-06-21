import { useState } from "react";
import { MessageSquare, ChevronUp, ChevronDown } from "lucide-react";
import { faqs } from "../../utils/staticData";
import { CARD_HOVER_SUBTLE, GLASS_SHADOW } from "../../utils/styles";
import { SectionHeading } from "../../shared-components/SharedHomeComponents";

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="w-full py-10 xsm:py-12 sm:py-16 md:py-20 3xl:py-24 px-3 xsm:px-4 sm:px-8 md:px-12">
      <SectionHeading
        icon={MessageSquare}
        title="Frequently Asked Questions"
        subtitle="Got questions? We've got answers."
      />

      <div className="flex flex-col gap-3 xsm:gap-4 max-w-3xl 3xl:max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`${CARD_HOVER_SUBTLE} glass rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
            style={GLASS_SHADOW}
          >
            <button
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
              className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer bg-transparent border-none"
              style={{ color: "var(--text-primary)" }}
            >
              <span className="text-base sm:text-lg font-semibold">
                {faq.question}
              </span>
              <span
                className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300"
                style={{
                  backgroundColor:
                    openFaq === index
                      ? "var(--primary-500)"
                      : "var(--surface-input)",
                  color: openFaq === index ? "#fff" : "var(--text-muted)",
                }}
              >
                {openFaq === index ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </span>
            </button>
            <div
              className="overflow-hidden transition-all duration-300"
              style={{
                maxHeight: openFaq === index ? "200px" : "0px",
                opacity: openFaq === index ? 1 : 0,
              }}
            >
              <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-(--text-muted) leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
