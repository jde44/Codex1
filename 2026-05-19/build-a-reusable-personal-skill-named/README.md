# targeted-job-application-resume

A reusable personal Codex skill for Javon Edwards to turn a job URL or pasted job description into a targeted application package.

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

## How To Use

Paste a job URL, job description, or both and ask Codex to use `targeted-job-application-resume`.

Example:

```text
Use targeted-job-application-resume for this role:
https://example.com/jobs/risk-advisory-manager

Please produce the resume, cover letter, recruiter message, gap analysis, and interview prep notes.
```

If the URL cannot be accessed, paste the job description directly.

## Operating Principles

- No fabrication
- Client confidentiality by default
- Evidence-based resume bullets
- ATS-friendly formatting
- Clear, warm, direct tone
- Professional development is not mislabeled as formal certification

## File Map

- `SKILL.md`: Core workflow and behavior
- `templates/master_profile.yaml`: Javon's base profile
- `templates/grill_me_intake.md`: Critical intake questions
- `templates/resume_template.md`: Resume structure
- `templates/cover_letter_template.md`: Cover letter structure
- `templates/linkedin_message_template.md`: Recruiter message structure
- `examples/example_input.md`: Sample job input prompt
- `examples/example_output_resume.md`: Sample targeted resume output
- `checklists/ats_quality_check.md`: ATS and formatting gate
- `checklists/no_fabrication_check.md`: Evidence and confidentiality gate
