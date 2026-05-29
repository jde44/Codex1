export type PromptSecurityFlag =
  | "instruction_override"
  | "policy_exfiltration"
  | "role_forgery"
  | "encoded_payload"
  | "dense_token_packing"
  | "invisible_or_confusable_text"
  | "evidence_tampering"
  | "tool_misuse"
  | "compression_attack";

export type PromptSecurityAssessment = {
  normalized: string;
  flags: PromptSecurityFlag[];
  score: number;
  blocked: boolean;
  reasons: string[];
};

const invisibleCharacters = /[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g;
const repeatedSymbolRuns = /([^\p{L}\p{N}\s])\1{7,}/u;
const likelyBase64 = /\b(?:[A-Za-z0-9+/]{48,}={0,2})\b/;
const likelyHexBlob = /\b(?:[a-fA-F0-9]{64,})\b/;
const policyExfiltration = /\b(system prompt|hidden instruction|developer message|policy|chain of thought|secret|api key|token|credentials)\b/i;
const instructionOverride = /\b(ignore|disregard|override|bypass|jailbreak|do not follow|forget|reveal|simulate developer|act as system)\b/i;
const roleForgery = /\b(as an admin|as system|as developer|approved by compliance|human approval complete|fake approval|authorization granted)\b/i;
const evidenceTampering = /\b(fabricate|backdate|delete evidence|hide evidence|alter audit|suppress finding|mark as approved)\b/i;
const toolMisuse = /\b(run command|exfiltrate|download all|send to|post to|webhook|curl|chmod|rm -rf)\b/i;

export function normalizeForPromptSecurity(input: string) {
  return input
    .normalize("NFKC")
    .replace(invisibleCharacters, "")
    .replace(/\s+/g, " ")
    .trim();
}

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

export function assessPromptSecurity(input: string): PromptSecurityAssessment {
  const normalized = normalizeForPromptSecurity(input);
  const flags: PromptSecurityFlag[] = [];
  const reasons: string[] = [];
  const compact = normalized.replace(/\s/g, "");
  const symbolCount = Array.from(normalized).filter((char) => /[^\p{L}\p{N}\s]/u.test(char)).length;
  const symbolRatio = normalized.length === 0 ? 0 : symbolCount / normalized.length;

  if (input !== normalized || /[^\u0000-\u007F]/.test(input)) {
    flags.push("invisible_or_confusable_text");
    reasons.push("Input contains invisible, non-ASCII, or normalized characters that can hide instructions.");
  }

  if (instructionOverride.test(normalized)) {
    flags.push("instruction_override");
    reasons.push("Input appears to instruct the system to bypass or override governance instructions.");
  }

  if (policyExfiltration.test(normalized)) {
    flags.push("policy_exfiltration");
    reasons.push("Input requests hidden policy, secrets, credentials, or protected instructions.");
  }

  if (roleForgery.test(normalized)) {
    flags.push("role_forgery");
    reasons.push("Input attempts to impersonate an approval, admin, developer, or system role.");
  }

  if (evidenceTampering.test(normalized)) {
    flags.push("evidence_tampering");
    reasons.push("Input attempts to fabricate, alter, suppress, or backdate governance evidence.");
  }

  if (toolMisuse.test(normalized)) {
    flags.push("tool_misuse");
    reasons.push("Input attempts to trigger unsafe tool, command, or exfiltration behavior.");
  }

  if (likelyBase64.test(compact) || likelyHexBlob.test(compact)) {
    flags.push("encoded_payload");
    reasons.push("Input contains a dense encoded payload that should not be silently interpreted.");
  }

  if (repeatedSymbolRuns.test(normalized) || symbolRatio > 0.32) {
    flags.push("dense_token_packing");
    reasons.push("Input uses dense symbol packing that may conceal compressed instructions.");
  }

  if (flags.includes("encoded_payload") || flags.includes("dense_token_packing")) {
    flags.push("compression_attack");
    reasons.push("Input resembles a compressed or quantized prompt attack and requires explicit review.");
  }

  const distinctFlags = unique(flags);
  const score = distinctFlags.reduce((sum, flag) => {
    if (flag === "compression_attack" || flag === "evidence_tampering") return sum + 30;
    if (flag === "instruction_override" || flag === "encoded_payload") return sum + 25;
    return sum + 15;
  }, 0);

  return {
    normalized,
    flags: distinctFlags,
    score,
    blocked: score >= 40 || distinctFlags.includes("evidence_tampering") || distinctFlags.includes("compression_attack"),
    reasons: unique(reasons)
  };
}

export function sanitizeGovernanceText(input: string, maxLength = 240) {
  const assessment = assessPromptSecurity(input);
  const normalized = assessment.normalized.slice(0, maxLength);

  return {
    value: normalized,
    assessment
  };
}
