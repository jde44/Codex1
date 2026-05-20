---
name: targeted-job-application-resume
description: Use when Javon Edwards wants to paste a job URL or job description and receive a targeted resume, cover letter, recruiter message, gap analysis, 400-character fit response, STAR stories, and interview prep notes based on his master profile without fabricating experience or exposing confidential client details. Also use when Javon wants to search trusted job boards such as LinkedIn, Indeed, company career sites, Built In, Wellfound, Otta/Welcome to the Jungle, Dice, eFinancialCareers, risk/compliance boards, and consulting or financial services career pages; rank roles by fit; prepare applications; request approval for conflicts; and create a daily application report.
---

# Targeted Job Application Resume

Use this skill to turn a job URL or pasted job description into a focused application package for Javon Edwards. It can also run a governed job-search workflow across trusted job boards and company career sites.

Primary inputs:
- Job URL, pasted job description, or both
- Optional target resume length, role level, preferred output set, and any company/client names Javon has approved for use
- Optional job search criteria: target titles, locations, remote/hybrid preference, compensation floor, excluded companies, and application approval mode

Primary outputs:
- Resume strategy before drafting
- ATS-friendly targeted resume
- Gap analysis
- Optional cover letter, recruiter message, 400-character why-fit response, STAR stories, and interview prep notes
- Optional job search shortlist, fit scoring, prepared applications, submission log, and daily application report

## Required Resources

Load these only as needed:
- `templates/master_profile.yaml`: Javon's base profile, strengths, constraints, and approved positioning
- `templates/grill_me_intake.md`: critical questions to ask only when needed
- `templates/resume_template.md`: targeted resume structure
- `templates/cover_letter_template.md`: cover letter structure
- `templates/linkedin_message_template.md`: recruiter message structure
- `templates/job_search_criteria.yaml`: default job-search sources, scoring, and conflict rules
- `templates/daily_application_report_template.md`: daily applied/prepared/skipped report format
- `checklists/ats_quality_check.md`: ATS and formatting quality gate
- `checklists/no_fabrication_check.md`: evidence and confidentiality quality gate
- `checklists/application_decision_check.md`: role-fit, conflict, approval, and submission quality gate

## Workflow

1. **Collect the job input**
   - Accept a URL, pasted job description, or both.
   - If a URL is provided and browsing is available, retrieve the posting. If it cannot be retrieved, ask Javon to paste the job description.
   - If the pasted description is incomplete, continue with visible evidence and ask only for missing details that materially affect accuracy.

2. **Parse the role**
   Extract:
   - Company, role title, location, remote/hybrid expectations
   - Responsibilities and business problems
   - Required and preferred qualifications
   - Keywords, regulations, frameworks, tools, domains, and industry signals
   - Seniority, leadership scope, stakeholder level, and likely hiring priorities

3. **Compare against Javon's profile**
   - Use `templates/master_profile.yaml` as the source of truth.
   - Map job requirements to evidence from Javon's experience, strengths, and recent training.
   - Mark evidence as strong, partial, adjacent, or not evidenced.
   - Never invent employers, degrees, certifications, metrics, tools, client names, or delivery outcomes.

4. **Create resume strategy before drafting**
   Include:
   - Target positioning headline
   - 5-8 priority keywords/themes
   - Most relevant experience to emphasize
   - Experience to compress or omit
   - Gap/risk handling approach
   - Confidentiality approach
   - Suggested resume length

5. **Ask only critical missing questions**
   Ask questions only when the answer changes the output materially. Good reasons include:
   - The job requires a certification, clearance, tool, degree, relocation status, or salary range not in the profile.
   - A specific client/company name would strengthen the resume but is confidential unless Javon approves it.
   - A metric is needed and cannot be inferred safely.
   If not critical, proceed and label assumptions.

6. **Draft the application package**
   Default package:
   - Resume strategy
   - Targeted resume
   - Gap analysis
   - Interview prep notes
   Include optional pieces when requested or obviously useful:
   - Cover letter
   - Recruiter or hiring manager message
   - 400-character why-fit response
   - STAR stories

7. **Run quality gates**
   Before finalizing, check:
   - ATS keyword alignment
   - Evidence check
   - Confidentiality check
   - Seniority alignment
   - Formatting check
   - Tone check

## Output Component Formats

### Resume Strategy

```markdown
## Resume Strategy
- Target positioning: [headline/angle]
- Hiring priorities: [5-8 themes from the posting]
- Strongest evidence: [profile-backed matches]
- Emphasize: [roles, bullets, skills]
- Compress or omit: [less relevant material]
- Gap handling: [how to address partial/not-evidenced items]
- Confidentiality approach: [anonymized language or approved names]
- Resume length: [recommended length]
```

### Gap Analysis

Use a compact table only in the analysis output, not inside the resume:

```markdown
| Job Requirement | Evidence From Javon | Strength | Resume Treatment |
|---|---|---|---|
| [requirement] | [supported evidence] | Strong / Partial / Adjacent / Not evidenced | [include, downplay, ask, or omit] |
```

### STAR Stories

Create 3-5 interview-ready stories tied to the role:

```markdown
## STAR Story: [Theme]
- Situation: [context, anonymized if client-related]
- Task: [responsibility]
- Action: [specific actions Javon can credibly discuss]
- Result: [verified result, conservative outcome, or non-metric impact]
- Best for questions about: [question types]
```

### Interview Prep Notes

Include:
- Likely interview themes
- Questions Javon should be ready for
- Suggested talking points
- Gaps to address directly
- Questions Javon can ask the interviewer

### Quality Gate Results

Always include pass/revise notes for:
- ATS keyword alignment
- Evidence check
- Confidentiality check
- Seniority alignment
- Formatting check
- Tone check

## Javon's Voice

Write like Javon:
- Professional, direct, clear, warm
- Specific without being dense
- Confident without sounding inflated
- Not buzzword-heavy
- Not over-polished or obviously AI-written

Avoid:
- Generic claims like "dynamic leader" or "proven track record"
- Inflated technical depth that is not evidenced
- Formal certification labels for LinkedIn Learning or training courses
- Client names unless Javon explicitly confirms they can be used

Use labels such as:
- `Recent AI, Cloud & Technical Training`
- `Professional Development`

Do not label LinkedIn Learning courses as certifications unless Javon explicitly verifies certification status.

## Confidentiality Rules

Default to anonymized client descriptions:
- `global banking client`
- `SIFI banking client`
- `large financial institution`
- `wealth management organization`
- `mortgage lender`
- `healthcare organization`

Use named clients only when:
- They are Javon's direct employers already in the master profile, or
- Javon explicitly approves the name for this application

When in doubt, preserve confidentiality and write around the client name.

## Evidence Rules

Allowed:
- Reframe known experience to match the job's language
- Emphasize relevant strengths from the master profile
- Use training as training or professional development
- State adjacent exposure when the evidence is partial

Not allowed:
- Claim hands-on tool ownership not provided
- Claim certifications not verified
- Invent metrics, budgets, team sizes beyond the profile, client names, awards, degrees, or job titles
- Convert advisory exposure into direct operating ownership unless supported

## Output Order

When providing a full package, use this order:

1. Resume Strategy
2. Critical Questions, if any
3. Targeted Resume
4. Gap Analysis
5. Cover Letter
6. Recruiter Message
7. 400-Character Why Fit
8. STAR Stories
9. Interview Prep Notes
10. Quality Gate Results

If critical questions block accurate drafting, ask them first and explain briefly why they matter. Otherwise proceed.

## Job Search and Application Workflow

Use this workflow when Javon asks to search job boards, find relevant roles, prepare applications, apply to high-fit jobs, or create a daily report.

### Search Sources

Preferred sources:
- LinkedIn Jobs
- Indeed
- Company career pages
- Built In
- Wellfound
- Otta / Welcome to the Jungle
- Dice
- eFinancialCareers
- Risk, compliance, cyber, and consulting job boards
- Financial services, banking, fintech, consulting, and regtech career pages

Rules:
- Use current browsing/search when available; job postings change frequently.
- Prefer official company career pages for final application submission when available.
- Do not bypass captchas, paywalls, login restrictions, rate limits, or job-board terms.
- Do not use Javon's accounts or saved profile data unless he has authorized the session and action.
- If a job URL cannot be accessed, keep the role in the report as `Needs manual review` and ask Javon to paste the posting or open the page.

### Search Criteria

Start from `templates/job_search_criteria.yaml`, then adjust based on Javon's request.

Default target roles include:
- Risk Advisory Manager / Senior Manager
- Regulatory Remediation Manager / Senior Manager
- Enterprise Risk Manager
- Cyber Risk Governance Manager
- AI Governance / Responsible AI Risk Manager
- Controls, Issue Management, Audit Remediation, or Governance roles
- Financial Services Transformation roles aligned to risk, compliance, cyber, or regulatory change

### Fit Scoring

Score each role from 0-100 using:
- Role alignment: 25 points
- Evidence strength from Javon's profile: 25 points
- Seniority and scope match: 15 points
- Industry/domain match: 15 points
- Location/remote/travel fit: 10 points
- Application practicality: 10 points

Suggested decisions:
- `85-100`: High-fit; prepare application and recommend applying.
- `70-84`: Good-fit; prepare if there are no major conflicts.
- `55-69`: Watchlist or ask Javon before investing time.
- `<55`: Skip unless Javon specifically wants it.

### Conflict and Approval Rules

Always ask Javon before applying when there is:
- Current employer, prior employer, client, vendor, or independence conflict risk
- Compensation, location, travel, clearance, sponsorship, or relocation uncertainty
- Requirement for an unverified certification, degree, or hands-on technical skill
- Need to disclose confidential client or regulatory details
- Ambiguity about whether the role is too junior, too senior, sales-heavy, or implementation-heavy
- Any question that affects Javon's reputation or current employment

Even for high-fit roles, default behavior is:
- Prepare the tailored resume, cover letter, recruiter message, and application answers.
- Present a concise approval queue.
- Submit only after Javon approves the specific role/application package in the current workflow.

If Javon explicitly enables a narrow "approved auto-submit" mode, it must still exclude conflicts, missing required answers, salary disclosures, EEO/disability/veteran questions, assessments, references, and anything requiring a signature or legal attestation.

### Application Submission Log

Track every role considered with:
- Date
- Source
- Company
- Role title
- URL
- Fit score
- Decision: Applied / Prepared pending approval / Asked Javon / Skipped / Needs manual review
- Materials created
- Submission status
- Follow-up date
- Notes and blockers

### Daily Report

Use `templates/daily_application_report_template.md` for the report. Include:
- Jobs applied to
- Jobs prepared and awaiting Javon's approval
- Jobs skipped and why
- Conflicts or issues needing a decision
- Recommended next actions
- Follow-up reminders
