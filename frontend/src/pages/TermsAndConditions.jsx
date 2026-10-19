import { Scale } from "lucide-react";
import LegalDocument from "../shared-components/LegalDocument";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import {
  LAST_UPDATED,
  TNC_INTRO,
  TNC_SECTIONS,
} from "../utils/staticPageData";

export default function TermsAndConditions() {
  useDocumentMetadata("Terms and Conditions", "Review the Terms and Conditions for LookSphere. Understand the rules and guidelines for using the social platform created by full-stack developer Pranav Shilu.");
  return (
    <LegalDocument
      title="Terms and Conditions"
      icon={Scale}
      lastUpdated={LAST_UPDATED}
      intro={TNC_INTRO}
      sections={TNC_SECTIONS}
    />
  );
}
