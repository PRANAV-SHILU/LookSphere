import { useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
  HelpCircle,
  Mail,
  MessageSquare,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import BackButton from "../shared-components/BackButton";
import { FAQ_CATEGORIES, LAST_UPDATED } from "../utils/faqData";
import { GithubIcon, LinkedinIcon } from "../shared-components/SvgIcons";

export default function FAQ() {
  useDocumentMetadata("FAQ");

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openItem, setOpenItem] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Toggle single accordion state
  const toggleAccordion = (catId, index) => {
    const key = `${catId}-${index}`;
    setOpenItem((prevKey) => (prevKey === key ? null : key));
  };

  // Filter logic based on search and selected tab category
  const filteredCategories = FAQ_CATEGORIES.map((category) => {
    // If we're filtering by category and this isn't it, skip questions
    if (activeCategory !== "all" && category.id !== activeCategory) {
      return null;
    }

    const matchedQuestions = category.questions.filter((qData) => {
      const q = qData.q.toLowerCase();
      const a = qData.a.toLowerCase();
      const query = searchQuery.toLowerCase();
      return q.includes(query) || a.includes(query);
    });

    if (matchedQuestions.length === 0) return null;

    return {
      ...category,
      questions: matchedQuestions,
    };
  }).filter(Boolean);

  const hasResults = filteredCategories.length > 0;

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl px-2 xsm:px-4 md:px-8 pt-8 pb-20">
        {/* ── Header Row ── */}
        <div className="flex items-center justify-between mb-8">
          <BackButton />
          <span
            className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400"
          >
            Help Center
          </span>
        </div>

        {/* ── Title & Intro ── */}
        <div className="text-center mb-10 flex flex-col items-center">
          <h1
            className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-center"
            style={{ color: "var(--text-primary)" }}
          >
            Frequently Asked Questions
          </h1>
          <p
            className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-center"
            style={{ color: "var(--text-secondary)" }}
          >
            Need help? Browse through our comprehensive list of guides, security
            details, and roadmap plans for LookSphere.
          </p>
          <p
            className="text-[10px] sm:text-xs font-semibold mt-3.5 uppercase tracking-wider px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400"
          >
            Last Updated: {LAST_UPDATED}
          </p>
        </div>

      {/* ── Search Bar ── */}
      <div className="relative max-w-xl mx-auto mb-10 group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-(--text-muted) group-focus-within:text-(--primary-500) transition-colors">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Search questions, keywords, or topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-12 py-3.5 rounded-2xl border text-sm font-medium transition-all focus:outline-none focus:ring-2"
          style={{
            backgroundColor: "var(--surface-input)",
            borderColor: "var(--border-normal)",
            color: "var(--text-primary)",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "var(--primary-500)";
            e.target.style.boxShadow =
              "0 0 0 3px rgba(var(--primary-500-rgb), 0.15)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "var(--border-normal)";
            e.target.style.boxShadow = "none";
          }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-(--text-muted) hover:text-(--primary-500) transition-colors cursor-pointer border-none bg-transparent"
            aria-label="Clear search"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* ── Category Pill Filters ── */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8">
        <button
          onClick={() => setActiveCategory("all")}
          className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold uppercase tracking-wider border cursor-pointer"
          style={{
            backgroundColor:
              activeCategory === "all"
                ? "var(--primary-500)"
                : "var(--surface-input)",
            borderColor:
              activeCategory === "all"
                ? "var(--primary-500)"
                : "var(--border-normal)",
            color:
              activeCategory === "all" ? "#ffffff" : "var(--text-secondary)",
          }}
        >
          All Topics
        </button>
        {FAQ_CATEGORIES.map((cat) => {
          const Icon = cat.icon || HelpCircle;
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold uppercase tracking-wider border cursor-pointer"
              style={{
                backgroundColor: isSelected
                  ? "var(--primary-500)"
                  : "var(--surface-input)",
                borderColor: isSelected
                  ? "var(--primary-500)"
                  : "var(--border-normal)",
                color: isSelected ? "#ffffff" : "var(--text-secondary)",
              }}
            >
              <Icon size={14} />
              <span>{cat.title}</span>
            </button>
          );
        })}
      </div>

      {/* ── Questions List ── */}
      {hasResults ? (
        <div className="flex flex-col gap-10">
          {filteredCategories.map((category) => {
            const CatIcon = category.icon || HelpCircle;
            return (
              <div key={category.id} className="flex flex-col gap-4">
                {/* Category Header */}
                <div className="flex items-center gap-2 px-1">
                  <CatIcon size={18} className="text-(--primary-500)" />
                  <h2
                    className="text-sm font-bold uppercase tracking-widest"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {category.title}
                  </h2>
                </div>

                {/* Accordions */}
                <div className="flex flex-col gap-3">
                  {category.questions.map((qData, qIdx) => {
                    const isOpen = openItem === `${category.id}-${qIdx}`;
                    return (
                      <div
                        key={qIdx}
                        className="rounded-2xl border transition-all duration-300"
                        style={{
                          backgroundColor: "var(--surface-input)",
                          borderColor: isOpen
                            ? "var(--primary-500)"
                            : "var(--border-light)",
                        }}
                      >
                        {/* Accordion Trigger */}
                        <button
                          onClick={() => toggleAccordion(category.id, qIdx)}
                          className="w-full text-left px-3 xsm:px-5 py-3 xsm:py-4 flex items-center justify-between gap-4 border-none bg-transparent cursor-pointer group"
                        >
                          <span
                            className="text-sm md:text-base font-semibold transition-colors duration-200 group-hover:text-(--primary-500)"
                            style={{
                              color: isOpen
                                ? "var(--primary-500)"
                                : "var(--text-primary)",
                            }}
                          >
                            {qData.q}
                          </span>
                          <ChevronDown
                            size={18}
                            className="shrink-0 transition-transform duration-300 text-(--text-muted)"
                            style={{
                              transform: isOpen
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                              color: isOpen
                                ? "var(--primary-500)"
                                : "var(--text-muted)",
                            }}
                          />
                        </button>

                        {/* Accordion Content */}
                        <div
                          className="overflow-hidden transition-all duration-300"
                          style={{
                            maxHeight: isOpen ? "300px" : "0",
                            opacity: isOpen ? "1" : "0",
                          }}
                        >
                          <div
                            className="px-3 xsm:px-5 pb-3 xsm:pb-5 pt-1 text-xs md:text-sm leading-relaxed whitespace-pre-line border-t"
                            style={{
                              color: "var(--text-secondary)",
                              borderColor: "var(--border-light)",
                            }}
                          >
                            {qData.a}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div
          className="text-center py-16 border rounded-3xl"
          style={{
            borderColor: "var(--border-light)",
            backgroundColor: "var(--surface-input)",
          }}
        >
          <p
            className="text-base font-medium mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            No matching questions found
          </p>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            Try using different keywords or resetting the topic filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("all");
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-(--primary-500) text-white border-none cursor-pointer hover:bg-(--primary-600) transition-colors"
          >
            Clear Search & Filters
          </button>
        </div>
      )}

      {/* ── Footer CTA ── */}
      <div
        className="mt-10 sm:mt-16 p-4 sm:p-8 rounded-3xl border text-center flex flex-col items-center gap-2 xsm:gap-3 sm:gap-4"
        style={{
          backgroundColor: "var(--surface-input)",
          borderColor: "var(--border-normal)",
        }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-(--primary-600)"
          style={{ backgroundColor: "var(--primary-50)" }}
        >
          <HelpCircle size={20} />
        </div>
        <div>
          <h3
            className="text-base font-bold mb-1"
            style={{ color: "var(--text-primary)" }}
          >
            Still have questions?
          </h3>
          <p
            className="text-xs md:text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            We're here to help you get the most out of LookSphere. Reach out to
            the developer directly.
          </p>
        </div>
        <div className="grid grid-cols-1 xsm:grid-cols-2 sm:flex sm:flex-row gap-1.5 xsm:gap-2 sm:gap-3 w-full justify-center">
          <Link
            to="/contact-us"
            className="w-full sm:w-auto flex items-center justify-center gap-1 xsm:gap-2 text-xs font-bold uppercase tracking-wider border border-(--border-normal) hover:border-(--primary-500) text-(--text-secondary) hover:text-(--primary-500) bg-(--surface-input) px-1 md:px-5 py-1.5 xsm:py-2.5 sm:py-3.5 rounded-xl transition-all duration-200 md:hover:shadow-md cursor-pointer md:hover:-translate-y-0.5 group"
            style={{ textDecoration: "none" }}
          >
            <MessageSquare
              size={16}
              className="shrink-0 transition-colors duration-200 group-hover:text-(--primary-500)"
            />
            <span className="transition-colors duration-200">Contact Us</span>
          </Link>
          <a
            href="mailto:pranavshilu@zohomail.in"
            className="w-full sm:w-auto flex items-center justify-center gap-1 xsm:gap-2 text-xs font-bold uppercase tracking-wider border border-(--border-normal) hover:border-(--primary-500) text-(--text-secondary) hover:text-(--primary-500) bg-(--surface-input) px-1 md:px-5 py-1.5 xsm:py-2.5 sm:py-3.5 rounded-xl transition-all duration-200 md:hover:shadow-md cursor-pointer md:hover:-translate-y-0.5 group"
            style={{ textDecoration: "none" }}
          >
            <Mail
              size={16}
              className="shrink-0 transition-colors duration-200 group-hover:text-(--primary-500)"
            />
            <span className="transition-colors duration-200">
              Email Support
            </span>
          </a>
          <a
            href="https://www.linkedin.com/in/pranavshilu/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-1 xsm:gap-2 text-xs font-bold uppercase tracking-wider border border-(--border-normal) hover:border-(--primary-500) text-(--text-secondary) hover:text-(--primary-500) bg-(--surface-input) px-1 md:px-5 py-1.5 xsm:py-2.5 sm:py-3.5 rounded-xl transition-all duration-200 md:hover:shadow-md cursor-pointer md:hover:-translate-y-0.5 group"
            style={{ textDecoration: "none" }}
          >
            <LinkedinIcon size={16} />
            <span className="transition-colors duration-200">LinkedIn</span>
          </a>
          <a
            href="https://github.com/PRANAV-SHILU"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-1 xsm:gap-2 text-xs font-bold uppercase tracking-wider border border-(--border-normal) hover:border-(--primary-500) text-(--text-secondary) hover:text-(--primary-500) bg-(--surface-input) px-1 md:px-5 py-1.5 xsm:py-2.5 sm:py-3.5 rounded-xl transition-all duration-200 md:hover:shadow-md cursor-pointer md:hover:-translate-y-0.5 group"
            style={{ textDecoration: "none" }}
          >
            <GithubIcon size={16} />
            <span className="transition-colors duration-200">GitHub</span>
          </a>
        </div>
      </div>
    </div>
  </div>
  );
}
