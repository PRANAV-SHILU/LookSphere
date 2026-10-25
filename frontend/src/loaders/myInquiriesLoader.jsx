import { redirect } from "react-router-dom";
import { contactService } from "../services/contactService";

const inquiriesCache = {};

/** Wipe the in-memory inquiries cache (call when leaving the page or on logout). */
export function clearInquiriesCache() {
  for (const key of Object.keys(inquiriesCache)) {
    delete inquiriesCache[key];
  }
}

export function myInquiriesLoader({ request }) {
  const stored = localStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;

  if (!user) return redirect("/login");

  const url = new URL(request.url);
  const isResponded = url.searchParams.get("isResponded") ?? "false";

  if (!inquiriesCache[isResponded]) {
    inquiriesCache[isResponded] = contactService
      .getMyContacts(isResponded)
      .then((r) => r.data ?? r)
      .catch((err) => {
        delete inquiriesCache[isResponded];
        console.error("myInquiriesLoader error:", err);
        throw err;
      });
  }

  return {
    contactData: inquiriesCache[isResponded],
    isAdmin: user.role === "admin",
  };
}
