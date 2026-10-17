-- Media & Press — Across the Table Hub (Supabase project myisncufxcpeqyuohroq)
-- Adds: media inquiries (private, owners only), aggregate media counts (no personal data),
-- and an optional notification hook. Additive only: no existing table is touched.

create schema if not exists private;

-- 1. Inquiries -------------------------------------------------------------
create table if not exists public.media_inquiries (
  id               bigint generated always as identity primary key,
  ref              text not null unique,
  name             text not null,
  email            text not null,
  organization     text not null,
  inquiry_type     text not null,
  topic            text not null,
  message          text not null,
  phone            text,
  website          text,
  preferred_date   date,
  preferred_format text,
  deadline         date,
  status           text not null default 'new'
                   check (status in ('new','under_review','responded','scheduled','completed','declined','archived')),
  notes            text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
create index if not exists media_inquiries_created_idx on public.media_inquiries (created_at desc);
create index if not exists media_inquiries_email_idx   on public.media_inquiries (email, created_at desc);

alter table public.media_inquiries enable row level security;
revoke all on public.media_inquiries from anon;
revoke all on public.media_inquiries from authenticated;
grant select, update on public.media_inquiries to authenticated;

drop policy if exists media_inquiries_owner_read   on public.media_inquiries;
drop policy if exists media_inquiries_owner_update on public.media_inquiries;
create policy media_inquiries_owner_read   on public.media_inquiries for select to authenticated using (public.is_owner());
create policy media_inquiries_owner_update on public.media_inquiries for update to authenticated using (public.is_owner()) with check (public.is_owner());

-- Owners may only change status / notes; everything the sender wrote stays as sent.
create or replace function private.media_inquiry_guard()
returns trigger language plpgsql set search_path = public as $$
begin
  new.id := old.id; new.ref := old.ref; new.name := old.name; new.email := old.email;
  new.organization := old.organization; new.inquiry_type := old.inquiry_type; new.topic := old.topic;
  new.message := old.message; new.phone := old.phone; new.website := old.website;
  new.preferred_date := old.preferred_date; new.preferred_format := old.preferred_format;
  new.deadline := old.deadline; new.created_at := old.created_at;
  new.notes := left(new.notes, 5000);
  new.updated_at := now();
  return new;
end $$;
drop trigger if exists media_inquiry_guard on public.media_inquiries;
create trigger media_inquiry_guard before update on public.media_inquiries
  for each row execute function private.media_inquiry_guard();

-- Change history for owner edits (audit log)
create table if not exists private.media_audit (
  id bigint generated always as identity primary key,
  inquiry_id bigint, actor text, old_status text, new_status text,
  notes_changed boolean, at timestamptz not null default now()
);
create or replace function private.media_inquiry_audit()
returns trigger language plpgsql security definer set search_path = public, private as $$
begin
  insert into private.media_audit (inquiry_id, actor, old_status, new_status, notes_changed)
  values (new.id, coalesce(auth.email(), 'system'), old.status, new.status,
          coalesce(old.notes,'') is distinct from coalesce(new.notes,''));
  return new;
end $$;
drop trigger if exists media_inquiry_audit on public.media_inquiries;
create trigger media_inquiry_audit after update on public.media_inquiries
  for each row execute function private.media_inquiry_audit();

-- 2. Optional notification hook (e.g. a Zapier "Catch Hook" that emails you) --
create table if not exists private.media_settings (
  id int primary key default 1 check (id = 1),
  notify_url text
);
insert into private.media_settings (id) values (1) on conflict do nothing;

-- 3. The public form calls this. Nothing else can write inquiries. -----------
create or replace function public.submit_media_inquiry(
  p_name text, p_email text, p_organization text, p_inquiry_type text, p_topic text, p_message text,
  p_phone text default null, p_website text default null, p_preferred_date text default null,
  p_preferred_format text default null, p_deadline text default null,
  p_trap text default null, p_elapsed_ms int default 0)
returns json language plpgsql security definer set search_path = public, private as $$
declare
  v_email text := lower(trim(coalesce(p_email,'')));
  v_ref   text;
  v_url   text;
  v_types text[] := array['Podcast Interview','Journalist Interview','Article or Publication','Television or Radio','Speaking Engagement','Business Collaboration','Other Media Inquiry'];
  v_fmts  text[] := array['Virtual Video Interview','Phone Interview','Written Q&A','In-Person Interview','Flexible'];
  v_pd date; v_dl date;
begin
  -- spam: the hidden field must be empty and the form must not be submitted instantly
  if coalesce(p_trap,'') <> '' or coalesce(p_elapsed_ms,0) < 2500 then
    return json_build_object('ok', false, 'error', 'Please try again.');
  end if;
  if length(trim(coalesce(p_name,''))) not between 2 and 120 then raise exception 'Please enter your full name.'; end if;
  if v_email !~ '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$' or length(v_email) > 200 then raise exception 'Please enter a valid email address.'; end if;
  if length(trim(coalesce(p_organization,''))) not between 2 and 160 then raise exception 'Please enter your organization, publication or podcast.'; end if;
  if not (p_inquiry_type = any(v_types)) then raise exception 'Please choose an inquiry type.'; end if;
  if length(trim(coalesce(p_topic,''))) not between 3 and 200 then raise exception 'Please add the topic or reason for contact.'; end if;
  if length(trim(coalesce(p_message,''))) not between 10 and 5000 then raise exception 'Please write a message (at least a sentence).'; end if;
  if p_preferred_format is not null and p_preferred_format <> '' and not (p_preferred_format = any(v_fmts)) then raise exception 'Please choose an interview format.'; end if;
  begin v_pd := nullif(p_preferred_date,'')::date; v_dl := nullif(p_deadline,'')::date;
  exception when others then raise exception 'Please check the dates.'; end;

  -- rate limits: 3 per sender per hour, 40 per hour overall
  if (select count(*) from public.media_inquiries where email = v_email and created_at > now() - interval '1 hour') >= 3
     or (select count(*) from public.media_inquiries where created_at > now() - interval '1 hour') >= 40 then
    raise exception 'We have received several requests in a short time. Please try again later or email contact@acrossthetable.biz.';
  end if;

  v_ref := 'MED-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,6));
  insert into public.media_inquiries (ref, name, email, organization, inquiry_type, topic, message, phone, website,
    preferred_date, preferred_format, deadline)
  values (v_ref, trim(p_name), v_email, trim(p_organization), p_inquiry_type, trim(p_topic), trim(p_message),
    nullif(left(trim(coalesce(p_phone,'')),40),''), nullif(left(trim(coalesce(p_website,'')),300),''),
    v_pd, nullif(p_preferred_format,''), v_dl);

  -- optional notification: who and what kind, never the message itself
  select notify_url into v_url from private.media_settings where id = 1;
  if coalesce(v_url,'') <> '' then
    begin
      perform net.http_post(url := v_url, headers := '{"Content-Type":"application/json"}'::jsonb,
        body := jsonb_build_object('ref', v_ref, 'name', trim(p_name), 'email', v_email,
          'organization', trim(p_organization), 'inquiry_type', p_inquiry_type, 'topic', trim(p_topic),
          'deadline', v_dl, 'hub', 'https://acrossthetable.biz/#hub'));
    exception when others then null; -- the inquiry is saved either way
    end;
  end if;
  return json_build_object('ok', true, 'ref', v_ref);
end $$;
revoke all on function public.submit_media_inquiry(text,text,text,text,text,text,text,text,text,text,text,text,int) from public;
grant execute on function public.submit_media_inquiry(text,text,text,text,text,text,text,text,text,text,text,text,int) to anon, authenticated;

-- 4. Aggregate counts: page views, downloads, clicks. No names, emails or IPs. --
create table if not exists public.media_stats (
  day   date not null default current_date,
  event text not null,
  n     bigint not null default 0,
  primary key (day, event)
);
alter table public.media_stats enable row level security;
revoke all on public.media_stats from anon, authenticated;
grant select on public.media_stats to authenticated;
drop policy if exists media_stats_owner_read on public.media_stats;
create policy media_stats_owner_read on public.media_stats for select to authenticated using (public.is_owner());

create or replace function public.media_count(p_event text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if p_event is null or p_event !~ '^(view|form_submit|substack_click|app_click|appearance_click|dl_[a-z_]{2,30}|inq_[a-z_]{2,40})$' then return; end if;
  insert into public.media_stats (day, event, n) values (current_date, p_event, 1)
  on conflict (day, event) do update set n = media_stats.n + 1;
end $$;
revoke all on function public.media_count(text) from public;
grant execute on function public.media_count(text) to anon, authenticated;
