import { Suspense, useEffect } from "react";
import { useLoaderData, Await, Link, useSearchParams, useNavigate, useNavigation, useRevalidator } from "react-router-dom";
import { MessageSquareText, Mail, Clock, CheckCheck, ArrowRight, Loader2 } from "lucide-react";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import { BackButton } from "../shared-components/shared-components";
import DataErrorState from "../shared-components/DataErrorState";
import ContactCard from "../components/admin/ContactCard";
import { ContactCardSkeleton } from "../skeletons/MyInquiriesSkeleton";
import { clearInquiriesCache } from "../loaders/myInquiriesLoader.jsx";

const TABS = [
  { key: "false", label: "Pending",   icon: <Clock size={15} /> },
  { key: "true",  label: "Responded", icon: <CheckCheck size={15} /> },
];

function InquiryList({ contacts, isAdmin }) {
  if (!contacts?.length) {
    return (
      <div
        className="flex-col py-12 gap-3 px-4 justify-center rounded-xl border border-dashed flex items-center sm:py-20 sm:rounded-2xl sm:gap-4"
        style={{ borderColor: "var(--border-normal)", color: "var(--text-muted)", backgroundColor: "var(--surface-input)" }}
      >
        <Mail size={40} className="sm:hidden" strokeWidth={1.2} style={{ color: "var(--primary-400)" }} />
        <Mail size={48} className="hidden sm:block" strokeWidth={1.2} style={{ color: "var(--primary-400)" }} />
        <div className="text-center">
          <p className="mb-1 text-lg font-bold sm:text-xl" style={{ color: "var(--text-primary)" }}>No inquiries yet</p>
          <p className="text-xs max-w-xs mx-auto sm:text-sm">Need help or want to share feedback? We'd love to hear from you.</p>
        </div>
        <Link 
          to="/contact-us"
          className="mt-1 sm:mt-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all hover:opacity-90 hover:scale-105 active:scale-95 no-underline"
          style={{ backgroundColor: "var(--primary-500)", color: "#fff" }}
        >
          Contact Support
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {contacts.map((c) => (
        <ContactCard key={c._id} contact={c} isAdmin={isAdmin} />
      ))}
    </div>
  );
}



function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {[1, 2, 3].map((i) => (
        <ContactCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default function MyInquiries() {
  useDocumentMetadata("My Inquiries", "Track the status of your support tickets and inquiries on LookSphere. Get fast, reliable assistance on the social platform developed by Pranav Shilu.", true);
  const { contactData, isAdmin } = useLoaderData();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const revalidator = useRevalidator();

  const isResponded = searchParams.get("isResponded") ?? "false";
  const isNavigating = navigation.state === "loading";
  const navigatingTo = navigation.location ? (new URLSearchParams(navigation.location.search).get("isResponded") ?? "false") : null;

  // Clear inquiries cache when leaving the page so that returning to My Inquiries gets fresh data
  useEffect(() => {
    return () => {
      clearInquiriesCache();
    };
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-3xl lg:max-w-4xl 2xl:max-w-5xl px-3 xsm:px-4 sm:px-6 md:px-8 pt-5 sm:pt-8 pb-12 sm:pb-20">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-5 sm:mb-8">
          <BackButton />
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-400">
            Inquiries
          </span>
        </div>

        {/* Title */}
        <div className="text-center mb-6 sm:mb-10 flex flex-col items-center">
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4"
            style={{ backgroundColor: "var(--primary-50)", color: "var(--primary-600)" }}
          >
            <MessageSquareText size={20} className="sm:hidden" />
            <MessageSquareText size={24} className="hidden sm:block" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-1.5 sm:mb-3" style={{ color: "var(--text-primary)" }}>
            My Inquiries
          </h1>
          <p className="text-xs sm:text-sm md:text-lg max-w-70 sm:max-w-xl mx-auto leading-relaxed mb-3 sm:mb-4" style={{ color: "var(--text-secondary)" }}>
            Track all your contact submissions and view responses from our team.
          </p>
          <div
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm px-3.5 py-1.5 rounded-full border transition-all"
            style={{ backgroundColor: "var(--surface-input)", borderColor: "var(--border-normal)", color: "var(--text-secondary)" }}
          >
            <span>Have any query or question?</span>
            <Link
              to="/contact-us"
              className="font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 underline underline-offset-2 transition-colors inline-flex items-center gap-1"
            >
              <span>Contact Us here</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center">
          <div className="tab-container flex w-fit p-1 gap-1.5 mt-2 mb-6 sm:p-[0.35rem] sm:gap-2 sm:mt-2.5 sm:mb-8">
            {TABS.map((tab) => {
              const isCurrent = isResponded === tab.key;
              const isTargetLoading = isNavigating && navigatingTo === tab.key;
              return (
                <button
                  key={tab.key}
                  className={`tab-btn py-1 px-3 text-xs xsm:text-sm sm:py-[0.22rem] sm:px-6 sm:text-[1.2rem] ${isCurrent ? "active" : ""}`}
                  onClick={() => navigate(`/my-inquiries?isResponded=${tab.key}`)}
                  style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
                >
                  <span className="hidden xsm:inline-flex">
                    {isTargetLoading ? <Loader2 size={15} className="animate-spin" /> : tab.icon}
                  </span>
                  {tab.label}
                  {isTargetLoading && <Loader2 size={13} className="animate-spin xsm:hidden" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <Suspense key={isResponded} fallback={<LoadingSkeleton />}>
          <Await
            key={isResponded}
            resolve={contactData}
            errorElement={
              <DataErrorState
                skeleton={LoadingSkeleton}
                message="Failed to load your inquiries. Check your network or try again."
                onRetry={() => {
                  clearInquiriesCache();
                  revalidator.revalidate();
                }}
              />
            }
          >
            {(data) => <InquiryList contacts={data?.contacts || []} isAdmin={isAdmin} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}
