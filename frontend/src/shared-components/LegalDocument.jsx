import { useEffect, useState, useRef, useMemo } from "react";
import { Mail, MessageSquare, Search, X, ArrowUp, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import BackButton from "./BackButton";
import { GithubIcon, LinkedinIcon } from "./SvgIcons";

// Icon map for contact links
const CONTACT_ICONS = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  Email: Mail,
  "Contact Us": MessageSquare,
};

// Minimal highlight helper: splits text on query and wraps matches in a mark tag
function HighlightText({ text, query }) {
  const q = query?.trim();
  if (!text || !q) return text;
  const parts = String(text).split(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <mark
        key={i}
        data-match="true"
        className="bg-amber-400/30 text-inherit underline decoration-(--primary-500) underline-offset-2 transition-colors data-[active=true]:bg-blue-500 data-[active=true]:text-white data-[active=true]:decoration-yellow-400 data-[active=true]:decoration-2"
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
}

// Table component
function DocumentTable({ table, query }) {
  return (
    <div
      className="mt-4 overflow-x-auto rounded-xl border"
      style={{ borderColor: "var(--border-normal)" }}
    >
      <table className="w-full min-w-150 text-sm border-collapse">
        <thead>
          <tr style={{ backgroundColor: "var(--surface-input)" }}>
            {table.headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left font-semibold text-xs border-b uppercase tracking-wider"
                style={{
                  color: "var(--text-muted)",
                  borderColor: "var(--border-normal)",
                }}
              >
                <HighlightText text={header} query={query} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className="transition-colors"
              style={{
                backgroundColor:
                  rowIdx % 2 === 0 ? "transparent" : "var(--surface-input)",
                borderBottom:
                  rowIdx < table.rows.length - 1
                    ? "1px solid var(--border-light)"
                    : "none",
              }}
            >
              {row.map((cell, cellIdx) => (
                <td
                  key={cellIdx}
                  className="px-4 py-3 align-top"
                  style={{
                    color:
                      cellIdx === 0
                        ? "var(--primary-500)"
                        : "var(--text-secondary)",
                    fontWeight: cellIdx === 0 ? "600" : "400",
                    fontFamily: cellIdx === 0 ? "monospace" : "inherit",
                    fontSize: cellIdx === 0 ? "0.8rem" : "inherit",
                  }}
                >
                  <HighlightText text={cell} query={query} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// List component
function DocumentList({ list, query }) {
  const badgeColors = [
    { bg: "bg-blue-500/10 border-blue-500/20", text: "text-blue-600 dark:text-blue-400" },
    { bg: "bg-emerald-500/10 border-emerald-500/20", text: "text-emerald-600 dark:text-emerald-400" },
    { bg: "bg-purple-500/10 border-purple-500/20", text: "text-purple-600 dark:text-purple-400" },
    { bg: "bg-amber-500/10 border-amber-500/20", text: "text-amber-600 dark:text-amber-400" },
    { bg: "bg-indigo-500/10 border-indigo-500/20", text: "text-indigo-600 dark:text-indigo-400" },
    { bg: "bg-cyan-500/10 border-cyan-500/20", text: "text-cyan-600 dark:text-cyan-400" },
    { bg: "bg-pink-500/10 border-pink-500/20", text: "text-pink-600 dark:text-pink-400" },
  ];

  return (
    <ul className="flex-col mt-4 gap-3 flex">
      {list.map((item, idx) => {
        const color = badgeColors[idx % badgeColors.length];
        return (
          <li
            key={idx}
            className="flex-col gap-1 p-4 rounded-xl border flex sm:flex-row sm:items-baseline sm:gap-2"
            style={{
              backgroundColor: "var(--surface-input)",
              borderColor: "var(--border-light)",
            }}
          >
            <span
              className={`shrink-0 text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md w-fit border ${color.bg} ${color.text}`}
            >
              <HighlightText text={item.label} query={query} />
            </span>
            <span
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              <HighlightText text={item.detail} query={query} />
            </span>
          </li>
        );
      })}
    </ul>
  );
}

// Contact links
function ContactLinks({ links, query }) {
  return (
    <div className="flex-col flex-wrap mt-4 gap-3 flex sm:flex-row">
      {links.map((link) => {
        const Icon = CONTACT_ICONS[link.label] || Mail;
        const isInternal = link.href.startsWith("/");
        const linkProps = {
          key: link.label,
          className: "flex items-center gap-2.5 px-4 py-3 rounded-xl border transition-all duration-200 md:hover:-translate-y-0.5 md:hover:shadow-md group",
          style: {
            backgroundColor: "var(--surface-input)",
            borderColor: "var(--border-normal)",
            color: "var(--text-secondary)",
            textDecoration: "none",
          }
        };

        const LinkContent = (
          <>
            <Icon
              size={16}
              className="shrink-0 transition-colors duration-200 group-hover:text-(--primary-500)"
              style={{ color: "var(--text-muted)" }}
            />
            <div className="flex-col flex leading-tight">
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                <HighlightText text={link.label} query={query} />
              </span>
              <span className="text-sm font-medium transition-colors duration-200 group-hover:text-(--primary-500)">
                <HighlightText text={link.display} query={query} />
              </span>
            </div>
          </>
        );

        if (isInternal) {
          return (
            <Link to={link.href} {...linkProps}>
              {LinkContent}
            </Link>
          );
        }

        return (
          <a
            href={link.href}
            target={link.label !== "Email" ? "_blank" : undefined}
            rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
            {...linkProps}
          >
            {LinkContent}
          </a>
        );
      })}
    </div>
  );
}

// Section navigator (sidebar TOC)
function TableOfContents({ sections, query }) {
  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      className="top-24 w-64 hidden xl:block sticky 4xl:top-36 self-start shrink-0"
      aria-label="Table of contents"
    >
      <p
        className="mb-3 px-3 text-xs font-bold uppercase tracking-widest"
        style={{ color: "var(--text-muted)" }}
      >
        On This Page
      </p>
      <ul className="flex-col gap-0.5 flex">
        {sections.map((section, idx) => (
          <li key={section.id}>
            <button
              onClick={() => handleClick(section.id)}
              className="px-3 py-2 gap-2 w-full text-left rounded-lg text-sm border-none bg-transparent transition-all duration-150 hover:bg-(--surface-hover) cursor-pointer flex items-center group"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--primary-500)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-muted)";
              }}
            >
              <span className="text-xs font-bold text-(--primary-500) opacity-75 tabular-nums group-hover:opacity-100 transition-opacity">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span>
                <HighlightText text={section.heading} query={query} />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Main Shared Document Layout
export default function LegalDocument({ title, icon: Icon, lastUpdated, intro, sections }) {
  useDocumentMetadata(title, `Read the ${title} for LookSphere. A secure social platform created by Pranav Shilu.`);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const docRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const totalMatches = useMemo(() => {
    const q = searchQuery.trim();
    if (!q) return 0;
    const matches = JSON.stringify({ intro, sections }).match(new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"));
    return matches ? matches.length : 0;
  }, [searchQuery, intro, sections]);

  const navigateMatch = (dir) => {
    const marks = docRef.current?.querySelectorAll("mark[data-match='true']") || [];
    if (!marks.length) return;
    const next = (activeIdx + dir + marks.length) % marks.length;
    setActiveIdx(next);
    marks.forEach((m, i) => m.setAttribute("data-active", i === next ? "true" : "false"));
    marks[next]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  useEffect(() => {
    const marks = docRef.current?.querySelectorAll("mark[data-match='true']") || [];
    marks.forEach((m, i) => m.setAttribute("data-active", i === activeIdx ? "true" : "false"));
  }, [searchQuery, activeIdx]);

  return (
    <div ref={docRef} className="px-4 pt-8 pb-20 w-full max-w-6xl mx-auto md:px-8">
      {/* ── Header ── */}
      <div className="mb-8">
        {/* Back + Last Updated row */}
        <div className="mb-6 justify-between flex items-center">
          <BackButton />
          <span
            className="px-3 py-1 text-[10px] font-semibold rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-600 sm:text-xs uppercase tracking-wider dark:text-blue-400"
          >
            Last Updated: {lastUpdated}
          </span>
        </div>

        {/* Title block */}
        <div className="flex-col gap-4 mb-5 flex sm:flex-row sm:items-center">
          <div
            className="w-12 h-12 rounded-2xl justify-center flex items-center shrink-0"
            style={{
              backgroundColor: "var(--primary-50)",
              color: "var(--primary-600)",
            }}
          >
            {Icon && <Icon size={24} />}
          </div>
          <div>
            <h1
              className="text-3xl font-extrabold md:text-4xl tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              <HighlightText text={intro.heading} query={searchQuery} />
            </h1>
          </div>
        </div>

        {/* Intro paragraph */}
        <p
          className="text-base max-w-3xl md:text-lg leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          <HighlightText text={intro.description} query={searchQuery} />
        </p>

        {/* ── Search Controls ── */}
        <div className="mt-8 gap-2 max-w-2xl flex items-center">
          <div className="flex-1 relative group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-(--text-muted) group-focus-within:text-(--primary-500) transition-colors" />
            <input
              type="text"
              placeholder={`Search within ${title.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setActiveIdx(0); }}
              onKeyDown={(e) => e.key === "Enter" && navigateMatch(e.shiftKey ? -1 : 1)}
              className="py-3 w-full rounded-2xl border text-sm font-medium pl-11 pr-24 bg-(--surface-input) border-(--border-normal) text-(--text-primary) transition-all focus:outline-none focus:border-(--primary-500) focus:ring-3 focus:ring-(--primary-500)/15"
            />
            {searchQuery && (
              <div className="gap-1.5 absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                <span className="px-1.5 py-0.5 text-xs font-semibold rounded-md text-(--text-muted) tabular-nums">
                  {totalMatches ? `${activeIdx + 1}/${totalMatches}` : "0"}
                </span>
                <button
                  onClick={() => { setSearchQuery(""); setActiveIdx(0); }}
                  className="p-1 text-(--text-muted) hover:text-(--primary-500) cursor-pointer border-none bg-transparent flex"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Divider */}
        <div
          className="mt-8 h-px w-full"
          style={{ backgroundColor: "var(--border-normal)" }}
        />
      </div>

      {/* ── Body: TOC sidebar + content (everything remains visible) ── */}
      <div className="gap-4 flex items-start">
        {/* Sidebar TOC — visible only on xl screens */}
        <TableOfContents sections={sections} query={searchQuery} />

        {/* Main content - all sections and subsections remain displayed */}
        <div className="flex-1 flex-col gap-12 min-w-0 flex">
          {sections.map((section, sectionIdx) => (
            <section key={section.id} id={section.id} className="scroll-mt-24 4xl:scroll-mt-36">
              {/* Section number + heading */}
              <div className="gap-3 mb-6 flex items-center">
                <span
                  className="text-xl font-bold md:text-2xl tabular-nums shrink-0"
                  style={{ color: "var(--primary-500)" }}
                >
                  {String(sectionIdx + 1).padStart(2, "0")}
                </span>
                <h2
                  className="text-xl font-bold md:text-2xl tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  <HighlightText text={section.heading} query={searchQuery} />
                </h2>
              </div>

              {/* Subsections */}
              <div className="flex-col gap-7 flex pl-0 sm:pl-7">
                {section.subsections.map((sub) => (
                  <div key={sub.id}>
                    {/* Subheading */}
                    {sub.subheading && (
                      <h3
                        className="mb-3 text-base font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        <HighlightText text={sub.subheading} query={searchQuery} />
                      </h3>
                    )}

                    {/* Prose content */}
                    {sub.content && (
                      <p
                        className="text-sm md:text-base leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <HighlightText text={sub.content} query={searchQuery} />
                      </p>
                    )}

                    {/* Table */}
                    {sub.table && (
                      <DocumentTable table={sub.table} query={searchQuery} />
                    )}

                    {/* List */}
                    {sub.list && (
                      <DocumentList list={sub.list} query={searchQuery} />
                    )}

                    {/* Contact links */}
                    {sub.links && (
                      <ContactLinks links={sub.links} query={searchQuery} />
                    )}
                  </div>
                ))}
              </div>

              {/* Section divider — not after last section */}
              {sectionIdx < sections.length - 1 && (
                <div
                  className="mt-12 h-px w-full"
                  style={{ backgroundColor: "var(--border-light)" }}
                />
              )}
            </section>
          ))}
        </div>
      </div>

      {/* ── Floating Match Navigator (bottom-right on mobile/tablets, top-right on desktop) ── */}
      {Boolean(totalMatches) && (
        <div className="fixed bottom-6 right-4 sm:right-6 mdlg:bottom-auto mdlg:top-24 mdlg:right-8 z-50 flex items-center gap-1.5 p-1.5 rounded-2xl border bg-(--surface-input) border-(--border-normal) shadow-xl backdrop-blur-md">
          <span className="px-2 text-xs font-bold tabular-nums text-(--text-muted)">
            {activeIdx + 1}/{totalMatches}
          </span>
          <button
            onClick={() => navigateMatch(-1)}
            className="p-2 rounded-xl text-(--text-secondary) hover:text-blue-500 hover:bg-(--surface-hover) cursor-pointer border-none bg-transparent transition-colors flex"
            title="Previous match (Shift+Enter)"
          >
            <ArrowUp size={18} />
          </button>
          <button
            onClick={() => navigateMatch(1)}
            className="p-2 rounded-xl text-(--text-secondary) hover:text-blue-500 hover:bg-(--surface-hover) cursor-pointer border-none bg-transparent transition-colors flex"
            title="Next match (Enter)"
          >
            <ArrowDown size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
