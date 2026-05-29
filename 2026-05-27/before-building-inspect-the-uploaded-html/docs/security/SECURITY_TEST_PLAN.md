# Security Test Plan

Status as of May 27, 2026.

## Current App Risk Profile

The app is currently a static/mock-data Next.js product surface. It has no live LLM API calls, no API routes, and no database writes in the current runtime. That reduces immediate exposure, but the go-live version will introduce authentication, Supabase persistence, agent execution, exports, and eventually model-provider calls. Those are the surfaces that need hardening before public production use.

## Known Advisory Response

The app now pins Next.js to `16.2.6`, matching the locally verified runtime and avoiding the older `15.3.2` line that should not be treated as a safe go-live baseline.

Current official Next.js advisory themes to track before launch:

- Middleware/proxy bypass in App Router segment-prefetch routes
- Dynamic route parameter middleware/proxy bypass
- CSP nonce XSS in App Router applications
- React Server Component cache poisoning
- Image optimization denial of service
- WebSocket upgrade SSRF

The app currently has no `middleware.ts`, `proxy.ts`, image optimization configuration, API routes, or WebSocket upgrade handling. That means several advisories are not directly reachable today, but they become relevant as auth and backend behavior are added.

## Prompt Injection And Compression-Attack Tests

Implemented in `lib/security/prompt-firewall.ts` and covered in `tests/governance-core.test.ts`.

Current test coverage:

| Attack Class | Example Pattern | Current Control |
| --- | --- | --- |
| Instruction override | “Ignore all prior instructions” | Flag and block |
| Policy exfiltration | “Reveal hidden system prompt/API key” | Flag and block |
| Role forgery | “Approved by compliance” | Flag and block |
| Evidence tampering | “Backdate evidence / mark approved” | Flag and block |
| Encoded payload | Long base64 or hex blob | Flag as encoded payload and compression attack |
| Dense token packing | Symbol-heavy packed prompt | Flag as dense token packing and compression attack |
| Invisible text | Zero-width and direction override characters | Normalize and flag |
| Agent intake contamination | Adversarial use case name | Route to Prompt and Context Risk Agent |

## Compression / Quantized Prompt Threat Model

“Quantized prompt” is treated as an adversarial-input family where attackers compress or hide instructions through:

- Encoded blobs
- Dense symbol packing
- Unicode confusables
- Invisible characters
- Direction overrides
- Abbreviated instruction tokens
- Payloads intended for a downstream model to decode or infer

The current control is intentionally conservative: do not silently decode, summarize, or reinterpret these payloads. Flag them and route to a risk review path.

## Tests To Add Before LLM Integration

| Test | Why |
| --- | --- |
| Indirect prompt injection from retrieved documents | Real risk once RAG/context is added |
| Prompt injection inside uploaded evidence | Needed before attachments go live |
| Prompt injection in CSV/PDF/HTML content | Common enterprise evidence formats |
| Tool-call injection | Needed before agents can call external tools |
| Markdown/HTML output sanitization | Needed before memo export renders untrusted content |
| Secret leakage regression tests | Ensure prompts never include API keys or service role keys |
| Human approval bypass tests | Ensure agent output cannot mark itself approved |
| Cross-tenant prompt/context leakage tests | Critical after Supabase multi-tenancy |
| Token exhaustion / model DoS tests | Required for cost governance |

## Web App Security Tests To Add Before Go-Live

| Test | Required Before Public Production? |
| --- | --- |
| Supabase RLS isolation tests | Yes |
| Route protection tests for private pages | Yes |
| Auth bypass tests with Next internal headers | Yes |
| Security header tests | Yes |
| CSRF review for mutating actions | Yes |
| XSS tests for intake, memo, evidence, and exported Markdown/PDF | Yes |
| Dependency audit with lockfile | Yes |
| Secret scanning | Yes |
| Access-control matrix tests by role | Yes |

## Day-Zero / Zero-Day Position

No application can be made “safe from day zero” in a generic sense. The defensible posture is:

1. Keep framework and dependencies pinned to patched versions.
2. Do not rely on middleware as the only authorization layer.
3. Enforce authorization in server-side data access and Supabase RLS.
4. Keep model calls least-privileged and unable to execute sensitive actions without server-side checks.
5. Treat LLM output as untrusted.
6. Add security tests for every newly introduced tool, file, export, and provider capability.
7. Maintain an incident patch path: dependency audit, rollback, and emergency deploy.

## Current Security Evidence

| Check | Result |
| --- | --- |
| Prompt firewall unit tests | Pass |
| Agent adversarial intake routing test | Pass |
| Typecheck | Pass |
| Production build | Pass |
| Security headers configured | Pass: CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, and X-Frame-Options verified on `/demo` |
| Secret-pattern scan | Pass with no credential-shaped matches; current regex produced only benign words such as `risk-controls` and package metadata |
| Dependency lockfile | Open gap: no root `package-lock.json`, `pnpm-lock.yaml`, or `yarn.lock` exists yet |
