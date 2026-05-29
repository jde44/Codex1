import { memoSections } from "@/lib/mock-data/platform";

export function governanceMemoMarkdown() {
  const sections = memoSections
    .map((section) => `## ${section.title}\n\n${section.body}\n\nEvidence: ${section.evidence}`)
    .join("\n\n");

  return `# Governance Approval Memo\n\nUse case: AI-assisted regulatory reporting variance commentary\n\nStatus: Conditional approval pending evidence completion\n\n${sections}\n`;
}

export function governanceMemoHtml() {
  return `<article>${governanceMemoMarkdown()
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\n", "<br />")}</article>`;
}
