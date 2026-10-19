-- The Scaling Edge — website counts (Supabase project myisncufxcpeqyuohroq, "Across the Table Hub")
-- Adds one table of anonymous daily totals and one function the website calls to add 1 to them.
-- No emails, names or IP addresses are ever stored. Subscribers stay in Substack only.
-- Additive only: no existing table is touched. Safe to run more than once.

create table if not exists public.newsletter_stats (
  day    date   not null default current_date,
  event  text   not null,            -- page_view | form_view | form_engaged | click
  place  text   not null default '', -- home | footer | app | blog | page
  source text   not null default '', -- instagram, facebook, linkedin, youtube, direct ...
  n      bigint not null default 0,
  primary key (day, event, place, source)
);
alter table public.newsletter_stats enable row level security;
revoke all on public.newsletter_stats from anon, authenticated;
grant select on public.newsletter_stats to authenticated;
drop policy if exists newsletter_stats_owner_read on public.newsletter_stats;
create policy newsletter_stats_owner_read on public.newsletter_stats
  for select to authenticated using (public.is_owner());

create or replace function public.newsletter_count(p_event text, p_place text, p_source text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if p_event  is null or p_event  !~ '^(page_view|form_view|form_engaged|click)$' then return; end if;
  if p_place  is null or p_place  !~ '^(home|footer|app|blog|page)$'              then return; end if;
  if p_source is null or p_source !~ '^[a-z0-9_-]{2,24}$'                          then p_source := 'other'; end if;
  insert into public.newsletter_stats (day, event, place, source, n)
  values (current_date, p_event, p_place, p_source, 1)
  on conflict (day, event, place, source) do update set n = newsletter_stats.n + 1;
end $$;
revoke all on function public.newsletter_count(text, text, text) from public;
grant execute on function public.newsletter_count(text, text, text) to anon, authenticated;
