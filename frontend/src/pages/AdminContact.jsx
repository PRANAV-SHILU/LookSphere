import { Suspense, useEffect } from "react";
import { useLoaderData, Await, useSearchParams, useNavigate, useRevalidator } from "react-router-dom";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import AdminSidebar from "../components/admin/AdminSidebar";
import ContactCard from "../components/admin/ContactCard";
import { Mail, CheckCheck, Clock } from "lucide-react";
import { PageLoader } from "../shared-components/shared-components";
import DataErrorState from "../shared-components/DataErrorState";

const TABS = [
  { key: "false", label: "Pending",   icon: <Clock size={15} /> },
  { key: "true",  label: "Responded", icon: <CheckCheck size={15} /> },
];

const HEADER = {
  false: {
    icon: <Mail size={30} />,
    title: "Pending Submissions",
    subtitle: "These messages haven't been responded to yet. Reply to keep your community heard.",
  },
  true: {
    icon: <CheckCheck size={30} />,
    title: "Responded Submissions",
    subtitle: "All caught up! These messages have already received a response.",
  },
};

function ContactList({ contacts }) {
  if (!contacts?.length) {
    return (
      <div
        className="flex-col py-20 gap-3 justify-center rounded-2xl border border-dashed flex items-center"
        style={{ borderColor: "var(--border-normal)", color: "var(--text-muted)" }}
      >
        <Mail size={40} strokeWidth={1.2} />
        <p className="text-lg font-semibold">No submissions here</p>
      </div>
    );
  }

  return (
    <div className="flex-col gap-4 flex">

      {contacts.map((c) => (
        <ContactCard key={c._id} contact={c} />
      ))}
    </div>
  );
}

export default function AdminContact() {
  useDocumentMetadata("Admin Contact", "LookSphere admin contact portal. Efficiently manage, review, and respond to user inquiries and support tickets on the platform built by Pranav Shilu.", true);
  const { contactData } = useLoaderData();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isResponded = searchParams.get("isResponded") ?? "false";
  const header = HEADER[isResponded] ?? HEADER["false"];

  return (
    <div className="flex-col pb-12 gap-6 mt-6 w-full max-w-[1600px] mx-auto md:pb-16 flex md:flex-row">
      <AdminSidebar />

      <main className="flex-1 p-4 min-w-0 bg-(--surface-card) border border-(--border-normal) rounded-2xl sm:p-6 md:p-8">
        {/* Header */}
        <div className="my-6">
          <h1
            className="mb-2 gap-3 text-3xl font-extrabold md:text-4xl tracking-tight flex items-center"
            style={{ color: "var(--text-primary)" }}
          >
            <span style={{ color: "var(--primary-500)" }}>{header.icon}</span>
            {header.title}
          </h1>
          <p className="text-base" style={{ color: "var(--text-muted)" }}>
            {header.subtitle}
          </p>
        </div>

        {/* Stats */}
        <Suspense fallback={<div className="mb-8 h-37 rounded-2xl bg-(--surface-input) border border-(--border-normal) animate-pulse" />}>
          <Await
            resolve={contactData}
            errorElement={
              <div className="mb-8 md:mb-12">
                <DataErrorState
                  compact={true}
                  message="Real-time statistics unavailable. Check connection or retry."
                  onRetry={() => revalidator.revalidate()}
                />
              </div>
            }
          >
            {(data) => {
              const stats = data?.stats || { total: 0, pending: 0, responded: 0 };
              
              const STAT_CARDS = [
                {
                  title: "Total Contacts",
                  value: stats.total,
                  icon: <Mail size={24} />,
                  gradient: "linear-gradient(135deg, #3B82F6, #1E40AF)", // Blue
                },
                {
                  title: "Pending",
                  value: stats.pending,
                  icon: <Clock size={24} />,
                  gradient: "linear-gradient(135deg, #F97316, #C2410C)", // Orange
                },
                {
                  title: "Responded",
                  value: stats.responded,
                  icon: <CheckCheck size={24} />,
                  gradient: "linear-gradient(135deg, #22C55E, #15803D)", // Emerald Green
                },
              ];

              return (
                <div className="flex-wrap gap-3 mb-8 flex sm:gap-4 md:gap-6 md:mb-12">
                  {STAT_CARDS.map((card, i) => (
                    <div
                      key={i}
                      className="flex-1 p-3 min-w-30 rounded-xl overflow-hidden shadow-lg sm:min-w-50 sm:p-4 md:p-6 md:rounded-2xl relative transition-transform duration-300 hover:-translate-y-1"
                      style={{ background: card.gradient, color: "#FFFFFF" }}
                    >
                      <div className="opacity-15 text-white absolute -right-3 -bottom-3 sm:-right-5 sm:-bottom-5 scale-[1.5] sm:scale-[2.5] pointer-events-none">
                        {card.icon}
                      </div>
                      <div className="flex-col-reverse mb-2 gap-1.5 justify-between flex sm:flex-row sm:items-center sm:mb-3 md:mb-4 sm:gap-0">
                        <span className="text-[10px] font-semibold opacity-90 sm:text-xs md:text-sm uppercase tracking-wider leading-tight truncate">
                          {card.title}
                        </span>
                        <div className="p-1 bg-white/20 rounded-md w-fit sm:p-1.5 md:p-2 md:rounded-lg backdrop-blur-sm self-start sm:self-auto">
                          {/* Scale icon down on mobile */}
                          <div className="scale-75 sm:scale-100 origin-top-left sm:origin-center">
                            {card.icon}
                          </div>
                        </div>
                      </div>
                      <h3 className="text-xl font-extrabold sm:text-3xl md:text-4xl">{card.value}</h3>
                    </div>
                  ))}
                </div>
              );
            }}
          </Await>
        </Suspense>

        {/* Tabs */}
        <div className="justify-center flex">
          <div className="p-1 gap-1.5 mt-2 mb-6 w-fit tab-container flex sm:p-[0.35rem] sm:gap-2 sm:mt-2.5 sm:mb-8">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                className={`tab-btn py-1 px-3 text-sm sm:py-[0.22rem] sm:px-6 sm:text-[1.2rem] ${isResponded === tab.key ? "active" : ""}`}
                onClick={() => navigate(`/admin/contact?isResponded=${tab.key}`)}
                style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
              >
                <span className="hidden xsm:inline-flex">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <Suspense fallback={<PageLoader />}>
          <Await
            resolve={contactData}
            errorElement={
              <DataErrorState
                message="Failed to load contact submissions. Check your network or try again."
                onRetry={() => revalidator.revalidate()}
              />
            }
          >
            {(data) => <ContactList contacts={data?.contacts || []} isResponded={isResponded} />}
          </Await>
        </Suspense>
      </main>
    </div>
  );
}
