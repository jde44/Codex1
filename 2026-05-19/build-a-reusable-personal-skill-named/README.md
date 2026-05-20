# jobpilot

A reusable personal Codex skill for Javon Edwards to turn a job URL or pasted job description into a targeted application package. It also supports governed job searching across trusted boards and company career sites, fit scoring, application preparation, approval queues, and daily reporting.

## What It Produces

- Resume strategy before drafting
- ATS-friendly targeted resume
- Gap analysis
- Cover letter
- Recruiter or hiring manager message
- 400-character "why fit" response
- STAR stories
- Interview prep notes
- Quality gate checklist results
- Job search shortlist and fit scoring
- Prepared application queue
- Daily report of applied, prepared, skipped, and conflict roles
- Three UX/UI web application prototypes for dashboard, deal-desk, and daily-report workflows

## How To Use

Paste a job URL, job description, or both and ask Codex to use `jobpilot`.

Example:

```text
Use jobpilot for this role:
https://example.com/jobs/risk-advisory-manager

Please produce the resume, cover letter, recruiter message, gap analysis, and interview prep notes.
```

If the URL cannot be accessed, paste the job description directly.

For job search:

```text
Use jobpilot to search LinkedIn, Indeed, company career pages, and trusted risk/compliance job boards for high-fit roles.

Target: risk advisory, regulatory remediation, cyber governance, AI governance, and financial services transformation roles.

Prepare application materials for high-fit roles, ask me before submitting anything with a conflict or missing answer, and create a daily report.
```

## Operating Principles

- No fabrication
- Client confidentiality by default
- Evidence-based resume bullets
- ATS-friendly formatting
- Clear, warm, direct tone
- Professional development is not mislabeled as formal certification
- Applications are not submitted unless Javon approves the role/application package or has explicitly enabled a narrow approved auto-submit mode
- Conflicts, confidentiality issues, legal attestations, sensitive demographic questions, references, and assessments are escalated to Javon

## File Map

- `SKILL.md`: Core workflow and behavior
- `templates/master_profile.yaml`: Javon's base profile
- `templates/grill_me_intake.md`: Critical intake questions
- `templates/resume_template.md`: Resume structure
- `templates/cover_letter_template.md`: Cover letter structure
- `templates/linkedin_message_template.md`: Recruiter message structure
- `templates/job_search_criteria.yaml`: Job search sources, scoring, and conflict rules
- `templates/daily_application_report_template.md`: Daily application report structure
- `examples/example_input.md`: Sample job input prompt
- `examples/example_output_resume.md`: Sample targeted resume output
- `checklists/ats_quality_check.md`: ATS and formatting gate
- `checklists/no_fabrication_check.md`: Evidence and confidentiality gate
- `checklists/application_decision_check.md`: Role-fit, conflict, approval, and submission gate
- `web-prototypes/`: Static web app prototypes for enabling the skill's workflow
