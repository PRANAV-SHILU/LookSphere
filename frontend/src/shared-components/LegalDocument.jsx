import { useEffect } from "react";
import { Mail } from "lucide-react";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import BackButton from "./BackButton";

function LinkedinIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GithubIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

// Icon map for contact links
const CONTACT_ICONS = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  Email: Mail,
};

// Table component
function DocumentTable({ table }) {
  return (
    <div
      className="overflow-x-auto mt-4 rounded-xl border"
      style={{ borderColor: "var(--border-normal)" }}
    >
      <table className="w-full min-w-[600px] text-sm border-collapse">
        <thead>
          <tr style={{ backgroundColor: "var(--surface-input)" }}>
            {table.headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider border-b"
                style={{
                  color: "var(--text-muted)",
                  borderColor: "var(--border-normal)",
                }}
              >
                {header}
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
                  {cell}
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
function DocumentList({ list }) {
  const badgeColors = [
    { bg: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-600 dark:text-blue-400" },
    { bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-600 dark:text-emerald-400" },
    { bg: "bg-purple-50 dark:bg-purple-950/30", text: "text-purple-600 dark:text-purple-400" },
    { bg: "bg-amber-50 dark:bg-amber-950/30", text: "text-amber-600 dark:text-amber-400" },
    { bg: "bg-indigo-50 dark:bg-indigo-950/30", text: "text-indigo-600 dark:text-indigo-400" },
    { bg: "bg-cyan-50 dark:bg-cyan-950/30", text: "text-cyan-600 dark:text-cyan-400" },
    { bg: "bg-pink-50 dark:bg-pink-950/30", text: "text-pink-600 dark:text-pink-400" },
  ];

  return (
    <ul className="mt-4 flex flex-col gap-3">
      {list.map((item, idx) => {
        const color = badgeColors[idx % badgeColors.length];
        return (
          <li
            key={idx}
            className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 p-4 rounded-xl border"
            style={{
              backgroundColor: "var(--surface-input)",
              borderColor: "var(--border-light)",
            }}
          >
            <span
              className={`shrink-0 text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md w-fit ${color.bg} ${color.text}`}
            >
              {item.label}
            </span>
            <span
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {item.detail}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

// Contact links
function ContactLinks({ links }) {
  return (
    <div className="mt-4 flex flex-col sm:flex-row gap-3 flex-wrap">
      {links.map((link) => {
        const Icon = CONTACT_ICONS[link.label] || Mail;
        return (
          <a
            key={link.label}
            href={link.href}
            target={link.label !== "Email" ? "_blank" : undefined}
            rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
            className="flex items-center gap-2.5 px-4 py-3 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md group"
            style={{
              backgroundColor: "var(--surface-input)",
              borderColor: "var(--border-normal)",
              color: "var(--text-secondary)",
              textDecoration: "none",
            }}
          >
            <Icon
              size={16}
              className="shrink-0 transition-colors duration-200 group-hover:text-(--primary-500)"
              style={{ color: "var(--text-muted)" }}
            />
            <div className="flex flex-col leading-tight">
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                {link.label}
              </span>
              <span className="text-sm font-medium transition-colors duration-200 group-hover:text-(--primary-500)">
                {link.display}
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
}

// Section navigator (sidebar TOC)
function TableOfContents({ sections }) {
  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      className="hidden xl:block sticky top-24 4xl:top-36 self-start w-64 shrink-0"
      aria-label="Table of contents"
    >
      <p
        className="text-xs font-bold uppercase tracking-widest mb-3 px-3"
        style={{ color: "var(--text-muted)" }}
      >
        On This Page
      </p>
      <ul className="flex flex-col gap-0.5">
        {sections.map((section, idx) => (
          <li key={section.id}>
            <button
              onClick={() => handleClick(section.id)}
              className="w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-150 hover:bg-(--surface-hover) border-none bg-transparent cursor-pointer flex items-center gap-2 group"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--primary-500)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-muted)";
              }}
            >
              <span className="text-xs font-bold tabular-nums text-(--primary-500) opacity-75 group-hover:opacity-100 transition-opacity">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span>{section.heading}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Main Shared Document Layout
export default function LegalDocument({ title, icon: Icon, lastUpdated, intro, sections }) {
  useDocumentMetadata(title);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 pt-8 pb-20">
      {/* ── Header ── */}
      <div className="mb-10">
        {/* Back + Last Updated row */}
        <div className="flex items-center justify-between mb-6">
          <BackButton />
          <span
            className="text-xs font-medium"
            style={{ color: "var(--text-muted)" }}
          >
            Last Updated: {lastUpdated}
          </span>
        </div>

        {/* Title block */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
            style={{
              backgroundColor: "var(--primary-50)",
              color: "var(--primary-600)",
            }}
          >
            {Icon && <Icon size={24} />}
          </div>
          <div>
            <h1
              className="text-3xl md:text-4xl font-extrabold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {intro.heading}
            </h1>
          </div>
        </div>

        {/* Intro paragraph */}
        <p
          className="text-base md:text-lg leading-relaxed max-w-3xl"
          style={{ color: "var(--text-secondary)" }}
        >
          {intro.description}
        </p>

        {/* Divider */}
        <div
          className="mt-8 h-px w-full"
          style={{ backgroundColor: "var(--border-normal)" }}
        />
      </div>

      {/* ── Body: TOC sidebar + content ── */}
      <div className="flex gap-4 items-start">
        {/* Sidebar TOC — visible only on xl screens */}
        <TableOfContents sections={sections} />

        {/* Main content */}
        <div className="flex-1 min-w-0 flex flex-col gap-12">
          {sections.map((section, sectionIdx) => (
            <section key={section.id} id={section.id} className="scroll-mt-24 4xl:scroll-mt-36">
              {/* Section number + heading */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="text-xl md:text-2xl font-bold tabular-nums shrink-0"
                  style={{ color: "var(--primary-500)" }}
                >
                  {String(sectionIdx + 1).padStart(2, "0")}
                </span>
                <h2
                  className="text-xl md:text-2xl font-bold tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {section.heading}
                </h2>
              </div>

              {/* Subsections */}
              <div className="flex flex-col gap-7 pl-0 sm:pl-7">
                {section.subsections.map((sub) => (
                  <div key={sub.id}>
                    {/* Subheading */}
                    {sub.subheading && (
                      <h3
                        className="text-base font-semibold mb-3"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {sub.subheading}
                      </h3>
                    )}

                    {/* Prose content */}
                    {sub.content && (
                      <p
                        className="text-sm md:text-base leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {sub.content}
                      </p>
                    )}

                    {/* Table */}
                    {sub.table && <DocumentTable table={sub.table} />}

                    {/* List */}
                    {sub.list && <DocumentList list={sub.list} />}

                    {/* Contact links */}
                    {sub.links && <ContactLinks links={sub.links} />}
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
    </div>
  );
}
