import { ShieldCheck } from "lucide-react";
import LegalDocument from "../shared-components/LegalDocument";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import {
  LAST_UPDATED,
  PRIVACY_INTRO,
  PRIVACY_SECTIONS,
} from "../utils/staticPageData";

export default function PrivacyPolicy() {
  useDocumentMetadata("Privacy Policy", "Read the LookSphere Privacy Policy. Learn how we protect your data and ensure a secure, transparent social media experience developed by Pranav Shilu.");
  return (
    <LegalDocument
      title="Privacy Policy"
      icon={ShieldCheck}
      lastUpdated={LAST_UPDATED}
      intro={PRIVACY_INTRO}
      sections={PRIVACY_SECTIONS}
    />
  );
}
