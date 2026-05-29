import type { UserRole } from "@/lib/types";

export const roleCapabilities: Record<UserRole, string[]> = {
  public_visitor: ["view_marketing"],
  demo_viewer: ["view_read_only_demo"],
  member: ["view_workspace"],
  client_admin: ["view_workspace", "manage_org_users", "manage_settings"],
  governance_reviewer: ["approve_memos", "approve_memory", "approve_skills"],
  risk_compliance: ["review_risks", "review_controls", "approve_memos"],
  data_owner: ["approve_lineage", "review_sensitive_data", "approve_memory"],
  business_owner: ["submit_use_cases", "approve_business_decisions"],
  auditor: ["view_evidence", "view_audit_trail"],
  super_admin: ["manage_all_organizations"]
};

export function can(role: UserRole, capability: string) {
  return roleCapabilities[role]?.includes(capability) || role === "super_admin";
}
