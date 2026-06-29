import { Scale } from "lucide-react";
import LegalDocument from "../shared-components/LegalDocument";
import {
  LAST_UPDATED,
  TNC_INTRO,
  TNC_SECTIONS,
} from "../utils/termsAndConditionsData";

export default function TermsAndConditions() {
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
