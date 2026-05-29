alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.use_cases enable row level security;
alter table public.workflows enable row level security;
alter table public.agent_runs enable row level security;
alter table public.handoffs enable row level security;
alter table public.risks enable row level security;
alter table public.controls enable row level security;
alter table public.model_decisions enable row level security;
alter table public.token_usage enable row level security;
alter table public.memory_items enable row level security;
alter table public.skills enable row level security;
alter table public.skill_change_requests enable row level security;
alter table public.app_library_sources enable row level security;
alter table public.app_library_proposals enable row level security;
alter table public.evals enable row level security;
alter table public.ews_alerts enable row level security;
alter table public.governance_memos enable row level security;
alter table public.audit_events enable row level security;

create or replace function public.current_profile()
returns public.profiles
language sql
security definer
set search_path = public
stable
as $$
  select * from public.profiles where user_id = auth.uid() limit 1
$$;

create or replace function public.is_super_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists(select 1 from public.profiles where user_id = auth.uid() and role = 'super_admin')
$$;

create or replace function public.current_org_id()
returns uuid
language sql
security definer
set search_path = public
stable
as $$
  select organization_id from public.profiles where user_id = auth.uid() limit 1
$$;

create policy "profiles read own org" on public.profiles
for select using (public.is_super_admin() or organization_id = public.current_org_id() or user_id = auth.uid());

create policy "organizations read own" on public.organizations
for select using (public.is_super_admin() or id = public.current_org_id());

create policy "org scoped use cases" on public.use_cases
for all using (public.is_super_admin() or organization_id = public.current_org_id())
with check (public.is_super_admin() or organization_id = public.current_org_id());

create policy "org scoped workflows" on public.workflows
for all using (public.is_super_admin() or organization_id = public.current_org_id())
with check (public.is_super_admin() or organization_id = public.current_org_id());

create policy "org scoped token usage" on public.token_usage
for all using (public.is_super_admin() or organization_id = public.current_org_id())
with check (public.is_super_admin() or organization_id = public.current_org_id());

create policy "org scoped memory items" on public.memory_items
for all using (public.is_super_admin() or organization_id = public.current_org_id())
with check (public.is_super_admin() or organization_id = public.current_org_id());

create policy "org scoped skills" on public.skills
for all using (public.is_super_admin() or organization_id = public.current_org_id())
with check (public.is_super_admin() or organization_id = public.current_org_id());

create policy "org scoped app library sources" on public.app_library_sources
for all using (public.is_super_admin() or organization_id = public.current_org_id())
with check (public.is_super_admin() or organization_id = public.current_org_id());

create policy "org scoped app library proposals" on public.app_library_proposals
for all using (public.is_super_admin() or organization_id = public.current_org_id())
with check (public.is_super_admin() or organization_id = public.current_org_id());

create policy "org scoped audit events" on public.audit_events
for select using (public.is_super_admin() or organization_id = public.current_org_id());

create policy "workflow child read by org" on public.agent_runs
for all using (
  public.is_super_admin() or exists (
    select 1 from public.workflows w where w.id = workflow_id and w.organization_id = public.current_org_id()
  )
);

create policy "handoffs read by org" on public.handoffs
for all using (
  public.is_super_admin() or exists (
    select 1 from public.workflows w where w.id = workflow_id and w.organization_id = public.current_org_id()
  )
);

create policy "model decisions read by org" on public.model_decisions
for all using (
  public.is_super_admin() or exists (
    select 1 from public.workflows w where w.id = workflow_id and w.organization_id = public.current_org_id()
  )
);

create policy "evals read by org" on public.evals
for all using (
  public.is_super_admin() or exists (
    select 1 from public.workflows w where w.id = workflow_id and w.organization_id = public.current_org_id()
  )
);

create policy "ews read by org" on public.ews_alerts
for all using (
  public.is_super_admin() or exists (
    select 1 from public.workflows w where w.id = workflow_id and w.organization_id = public.current_org_id()
  )
);

create policy "memos read by org" on public.governance_memos
for all using (
  public.is_super_admin() or exists (
    select 1 from public.workflows w where w.id = workflow_id and w.organization_id = public.current_org_id()
  )
);

-- Reviewers can approve memos, memory updates, and skills in server-side application logic.
-- Auditors should be granted select-only access through service-layer role checks.
