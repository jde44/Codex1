# Go-Live Decision Framework

## Go-Live Definition

The app is ready to share publicly when it can support a polished external demo without caveats that weaken credibility.

## Public Demo Go-Live

Minimum bar:

- Deployed public URL
- Polished home and demo page
- One coherent demo workflow
- No obvious placeholder copy
- No broken nav
- Screenshot QA across desktop and mobile
- Request access form or clear CTA
- Clear “demo data” language where needed

## Private Member Demo Go-Live

Minimum bar:

- Auth works
- Private routes are protected
- Intake persists
- Memo export works
- Evidence library exists
- Audit events are created for key actions
- Role permissions are enforced
- Supabase RLS is tested

## Production SaaS Go-Live

Minimum bar:

- Multi-tenant isolation tested
- CI/CD in place
- Staging and production environments separated
- Monitoring and error reporting live
- Security review complete
- Legal/privacy retention rules documented
- Backup and rollback plan defined

## Recommended Next Sprint

1. Reduce dashboard noise.
2. Make `/demo` a guided single-story walkthrough.
3. Make `/data-governance` the strongest differentiator, but simplify the tables.
4. Build real Supabase auth and route protection.
5. Persist intake and generate a real workflow record.
6. Add memo export.
7. Deploy to Vercel.

