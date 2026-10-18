import { useState, Suspense, useEffect, useRef } from "react";
import { useLoaderData, Link, Await, useSearchParams } from "react-router-dom";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import { User, Eye, ArrowRight, Search, FileText, X } from "lucide-react";
import BackButton from "../shared-components/BackButton";
import CreatorsSkeleton from "../skeletons/CreatorsSkeleton";

function CreatorsContent({ creatorsList }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const [hoveredCreator, setHoveredCreator] = useState(null);
  const [isClearHovered, setIsClearHovered] = useState(false);
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    searchTimeoutRef.current = setTimeout(() => {
      const currentQuery = searchParams.get("search") || "";
      if (query.trim() !== currentQuery.trim()) {
        if (query.trim()) {
          setSearchParams({ search: query.trim() }, { replace: true });
        } else {
          setSearchParams({}, { replace: true });
        }
      }
    }, 400);

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [query, searchParams, setSearchParams]);

  return (
    <>
      {/* --- Search Bar --- */}
      <div
        className="gap-3 mb-8 px-4 py-3 rounded-xl flex items-center"
        style={{
          backgroundColor: "var(--surface-input)",
          border: "1px solid var(--border-normal)",
        }}
      >
        <Search size={18} style={{ color: "var(--text-muted)" }} />
        <input
          type="text"
          placeholder="Search creators..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent w-full text-sm outline-none"
          style={{ color: "var(--text-primary)" }}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="p-0.5 rounded-full transition-colors hover:bg-(--surface-hover)"
            style={{
              color: isClearHovered
                ? "var(--text-primary)"
                : "var(--text-muted)",
            }}
            onMouseEnter={() => setIsClearHovered(true)}
            onMouseLeave={() => setIsClearHovered(false)}
            title="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {creatorsList.length === 0 && !query ? (
        <div
          className="py-20 text-center text-lg font-medium"
          style={{ color: "var(--text-muted)" }}
        >
          No creators found. Register yourself to be the first one.
        </div>
      ) : creatorsList.length === 0 ? (
        <div
          className="py-20 text-center text-lg font-medium"
          style={{ color: "var(--text-muted)" }}
        >
          No creators match &ldquo;{query}&rdquo;.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-8">
          {creatorsList.map((creator) => (
            <div key={creator.username} className="h-full">
              <Link
                to={`/profile/${creator.username}`}
                className="flex-col p-6 h-full rounded-2xl overflow-hidden group relative flex 4xl:p-8 transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: "var(--surface-card)",
                  border: "1px solid var(--border-normal)",
                  boxShadow: "var(--shadow-card)",
                }}
                onMouseEnter={() => setHoveredCreator(creator.username)}
                onMouseLeave={() => setHoveredCreator(null)}
              >
                {/* Background Glow Effect on Hover */}
                <div
                  className="opacity-0 absolute inset-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--primary-500), transparent)",
                  }}
                />

                <div className="mb-5 z-10 flex items-start space-x-4 relative">
                  {/* Avatar */}
                  <div
                    className="w-16 h-16 rounded-full overflow-hidden justify-center border-2 shadow-sm 4xl:w-21 4xl:h-21 shrink-0 flex items-center transition-colors duration-300"
                    style={{
                      backgroundColor: "var(--surface-input)",
                      borderColor:
                        hoveredCreator === creator.username
                          ? "var(--primary-500)"
                          : "transparent",
                    }}
                  >
                    {creator.profileImage ? (
                      <img
                        src={creator.profileImage}
                        alt={creator.username}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User
                        size={32}
                        className="4xl:size-36"
                        style={{ color: "var(--text-muted)" }}
                      />
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 overflow-hidden">
                    <h2
                      className="text-xl font-bold 4xl:text-3xl truncate transition-colors"
                      style={{
                        color:
                          hoveredCreator === creator.username
                            ? "var(--primary-600)"
                            : "var(--text-primary)",
                      }}
                    >
                      {creator.username}
                    </h2>
                    <p
                      className="mt-1 text-sm 4xl:text-lg line-clamp-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {creator.tagline || "No tagline provided."}
                    </p>
                  </div>
                </div>

                <div
                  className="mt-auto pt-4 justify-between border-t z-10 flex items-center relative"
                  style={{ borderColor: "var(--border-light)" }}
                >
                  {/* View Count */}
                  <div className="gap-3 flex items-center">
                    <div
                      className="px-2.5 py-1.5 text-xs font-semibold rounded-md flex items-center space-x-1.5 4xl:text-base 4xl:py-2.5"
                      style={{
                        backgroundColor: "var(--surface-input)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      <Eye size={14} className="4xl:size-8" />
                      <span>{creator.profileViewCount || 0} Views</span>
                    </div>
                    <div
                      className="px-2.5 py-1.5 text-xs font-semibold rounded-md flex items-center space-x-1.5 4xl:text-base 4xl:py-2.5"
                      style={{
                        backgroundColor: "var(--surface-input)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      <FileText size={14} className="4xl:size-8" />
                      <span>{creator.postCount || 0} Posts</span>
                    </div>
                  </div>

                  {/* View Profile Button (Icon) */}
                  <div
                    className="justify-center w-8 h-8 rounded-full flex items-center transform group-hover:translate-x-1 transition-all duration-300"
                    style={{
                      backgroundColor: "var(--primary-50)",
                      color: "var(--primary-600)",
                    }}
                  >
                    <ArrowRight size={16} className="4xl:size-10" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default function Creators() {
  const { creatorsData } = useLoaderData();
  useDocumentMetadata(
    "Creators",
    "Discover top creators, influencers, and trending profiles on LookSphere. Explore amazing content curated on the platform built by Pranav Shilu.",
  );

  return (
    <div className="pb-12 md:pb-16">
      <div className="mb-10 mt-8 gap-4 justify-between 4xl:mt-16 flex items-start">
        <div className="text-center md:text-left">
          <h1
            className="mb-3 text-4xl text-left font-extrabold xsm:text-5xl tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Creators
          </h1>
          <p
            className="text-base text-left xsm:text-lg"
            style={{ color: "var(--text-muted)" }}
          >
            Discover and connect with other creators on LookSphere.
          </p>
        </div>
        <BackButton />
      </div>

      <Suspense fallback={<CreatorsSkeleton />}>
        <Await
          resolve={creatorsData}
          errorElement={
            <div className="py-10 text-center">
              Error loading creators data.
            </div>
          }
        >
          {(creatorsList) => <CreatorsContent creatorsList={creatorsList} />}
        </Await>
      </Suspense>
    </div>
  );
}
