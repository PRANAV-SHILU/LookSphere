import { ShieldCheck } from "lucide-react";
import LegalDocument from "../shared-components/LegalDocument";
import {
  LAST_UPDATED,
  PRIVACY_INTRO,
  PRIVACY_SECTIONS,
} from "../utils/privacyPolicyData";

export default function PrivacyPolicy() {
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
