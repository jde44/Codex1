import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const appPath = resolve("web-prototypes/staging-app/index.html");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

assert(existsSync(appPath), "Expected staging app at web-prototypes/staging-app/index.html");

const html = readFileSync(appPath, "utf8");

const requiredText = [
  "Targeted Application Command Center",
  "Pipeline Command Center",
  "Application Deal Desk",
  "Daily Report Board",
  "High-Fit Roles",
  "Prepared Packages",
  "Decision Needed",
  "Application Decision Gate",
  "Approval Queue",
  "Fit Score",
  "Daily Job Application Report",
  "Submit only after approval"
];

for (const text of requiredText) {
  assert(html.includes(text), `Missing required text: ${text}`);
}

const requiredTestIds = [
  "tab-command",
  "tab-deal-desk",
  "tab-report",
  "view-command",
  "view-deal-desk",
  "view-report",
  "kpi-high-fit",
  "kpi-prepared",
  "kpi-decision-needed",
  "approval-queue",
  "decision-gate",
  "daily-report"
];

for (const testId of requiredTestIds) {
  assert(html.includes(`data-testid="${testId}"`), `Missing data-testid: ${testId}`);
}

assert(/function\s+showView/.test(html), "Expected tab navigation function showView");
assert(/localStorage\.setItem\("stagingAppSelectedView"/.test(html), "Expected selected view persistence");
assert(/aria-selected="true"/.test(html), "Expected accessible selected tab state");

console.log("staging-app smoke test passed");
