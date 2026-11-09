import { DocumentApprovalsSection } from "../../components/document/DocumentApprovalsSection";
import { DocumentIssuanceShortcutsSection } from "../../components/document/DocumentIssuanceShortcutsSection";

function Document() {
  return (
    <div className="grid grid-cols-[1fr_400px] gap-6 w-full items-start">
      <DocumentApprovalsSection />
      <DocumentIssuanceShortcutsSection />
    </div>
  );
}

export default Document;