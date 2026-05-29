create extension if not exists "pgcrypto";

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  plan text not null default 'Enterprise',
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete cascade,
  full_name text not null,
  role text not null check (role in ('member','client_admin','governance_reviewer','risk_compliance','data_owner','business_owner','auditor','super_admin')),
  title text,
  created_at timestamptz not null default now()
);

create table if not exists public.use_cases (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  business_process text not null,
  owner text not null,
  risk_tier text not null,
  status text not null,
  monthly_budget numeric(12,2) not null default 0,
  sensitive_data boolean not null default false,
  regulatory_impact boolean not null default false,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.workflows (
  id uuid primary key default gen_random_uuid(),
  use_case_id uuid not null references public.use_cases(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  status text not null,
  current_agent text,
  evidence_completion integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.agents (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  description text not null,
  status text not null default 'Active'
);

create table if not exists public.agent_runs (
  id uuid primary key default gen_random_uuid(),
  workflow_id uuid not null references public.workflows(id) on delete cascade,
  agent_name text not null,
  model_used text,
  input_tokens integer not null default 0,
  output_tokens integer not null default 0,
  total_tokens integer generated always as (input_tokens + output_tokens) stored,
  estimated_cost numeric(12,4) not null default 0,
  result_summary text,
  json_output jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.handoffs (
  id uuid primary key default gen_random_uuid(),
  workflow_id uuid not null references public.workflows(id) on delete cascade,
  from_agent text not null,
  to_agent text not null,
  task text not null,
  context_summary text not null,
  inputs jsonb not null default '[]'::jsonb,
  constraints jsonb not null default '[]'::jsonb,
  open_questions jsonb not null default '[]'::jsonb,
  decision_log jsonb not null default '[]'::jsonb,
  evidence jsonb not null default '[]'::jsonb,
  token_budget integer not null default 0,
  model_recommendation text,
  risk_flags text[] not null default '{}',
  required_human_approval boolean not null default false,
  status text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.risks (
  id uuid primary key default gen_random_uuid(),
  use_case_id uuid not null references public.use_cases(id) on delete cascade,
  category text not null,
  description text not null,
  inherent_risk text not null,
  residual_risk text,
  status text not null
);

create table if not exists public.controls (
  id uuid primary key default gen_random_uuid(),
  risk_id uuid not null references public.risks(id) on delete cascade,
  control_name text not null,
  control_type text not null,
  owner text not null,
  evidence_required text not null,
  frequency text not null,
  status text not null,
  escalation_trigger text not null
);

create table if not exists public.model_decisions (
  id uuid primary key default gen_random_uuid(),
  workflow_id uuid not null references public.workflows(id) on delete cascade,
  workload text not null,
  risk text not null,
  complexity text not null,
  data_sensitivity text not null,
  recommended_model text not null,
  model_tier text not null,
  reason text not null,
  human_review_required boolean not null default false,
  estimated_cost numeric(12,4) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.token_usage (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  workflow_id uuid references public.workflows(id) on delete cascade,
  agent_run_id uuid references public.agent_runs(id) on delete set null,
  model text not null,
  input_tokens integer not null default 0,
  output_tokens integer not null default 0,
  total_tokens integer generated always as (input_tokens + output_tokens) stored,
  cost numeric(12,4) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.memory_items (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  workflow_id uuid references public.workflows(id) on delete cascade,
  content_summary text not null,
  sensitivity text not null,
  decision text not null,
  expiration_date date,
  approved_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  category text not null,
  version text not null,
  status text not null,
  description text not null,
  markdown_content text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.skill_change_requests (
  id uuid primary key default gen_random_uuid(),
  skill_id uuid not null references public.skills(id) on delete cascade,
  change_type text not null,
  proposed_change text not null,
  reason text not null,
  status text not null,
  approved_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.app_library_sources (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  title text not null,
  category text not null,
  source_owner text not null,
  jurisdiction text not null,
  version text not null,
  status text not null check (status in ('Draft','Under review','Approved','Retired')),
  summary text not null,
  key_expectations jsonb not null default '[]'::jsonb,
  related_controls jsonb not null default '[]'::jsonb,
  last_reviewed date,
  next_review date,
  approved_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.app_library_proposals (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  source_id uuid references public.app_library_sources(id) on delete cascade,
  proposed_by text not null,
  proposal_type text not null,
  summary text not null,
  rationale text not null,
  impacted_areas jsonb not null default '[]'::jsonb,
  required_approver text not null,
  approval_status text not null check (approval_status in ('Proposed','Needs changes','Approved','Rejected')),
  version_before text not null,
  version_after text not null,
  evidence_needed text not null,
  approved_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.evals (
  id uuid primary key default gen_random_uuid(),
  workflow_id uuid not null references public.workflows(id) on delete cascade,
  test_name text not null,
  purpose text not null,
  threshold text not null,
  result text not null,
  status text not null,
  remediation_action text,
  owner text,
  due_date date,
  created_at timestamptz not null default now()
);

create table if not exists public.ews_alerts (
  id uuid primary key default gen_random_uuid(),
  workflow_id uuid not null references public.workflows(id) on delete cascade,
  alert_type text not null,
  severity text not null,
  trigger text not null,
  status text not null,
  owner text,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists public.governance_memos (
  id uuid primary key default gen_random_uuid(),
  workflow_id uuid not null references public.workflows(id) on delete cascade,
  title text not null,
  content text not null,
  status text not null,
  approved_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  workflow_id uuid references public.workflows(id) on delete cascade,
  event_type text not null,
  actor text not null,
  description text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
