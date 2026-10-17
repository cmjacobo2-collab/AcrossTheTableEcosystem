# Media & Press page — acrossthetable.biz/media

## What lives where

| File | What it is |
|---|---|
| `media/index.html` | The page itself (built — don't edit by hand) |
| `media/media.json` | **All the words on the page.** Edit this. |
| `media/media.js` | Draws the page from `media.json`, runs the interview form |
| `media/*.pdf`, `*.jpg`, `*.png`, `*.txt` | The press-kit downloads |
| `_media/` | Build scripts and the database setup file (not published — the underscore hides it) |

## Changing the words

Open `media/media.json` on GitHub, tap the pencil, change the text, **Commit changes**.
The page picks up the change on its next load.

- To hide something without deleting it, change its `"show": true` to `"show": false`.
- Featured apps use the names and "Available / In development" status from `prices.json`,
  so they stay in step with Products & pricing automatically.

## Adding a real media appearance

Copy the example under `"_appearances_example"` into the `"appearances": [ ]` list,
fill it in, and commit. The **"Across the Table in the Media"** section appears on its own
the moment there is one real entry with a working link — and stays hidden until then.
Only add appearances that actually happened.

## Rebuilding (after big edits, so search engines see the new text right away)

    node _media/build.cjs          # rebuilds media/index.html from media.json
    python3 _media/build_assets.py # rebuilds the PDFs, bio text file and sharing image

## One-time setup: the interview form

The form saves requests into the **Across the Table Hub** Supabase project.
Until this is done, the form tells people their request was *not* sent and offers them
a pre-filled email instead — it never pretends to succeed.

1. Supabase → **Across the Table Hub** → **SQL Editor** → **New query**
2. Paste everything from `_media/supabase-media.sql` → **Run**
3. Sign in to My Business Hub as owner → **Media inquiries** tab.

New requests show a gold count on that tab. Each one can be marked
New · Under review · Responded · Scheduled · Completed · Declined · Archived,
given private notes, answered by email, and exported to a spreadsheet.

### Optional: get an email when a request arrives

Make a Zapier zap: **Webhooks by Zapier → Catch Hook** → **Email by Zapier** (send to
contact@acrossthetable.biz). Copy the hook address Zapier gives you, then run this in the
SQL Editor with your address in place of the example:

    update private.media_settings set notify_url = 'https://hooks.zapier.com/hooks/catch/XXXX/YYYY/' where id = 1;

The notification carries who asked and what about — never the message itself.
Read the full request in My Business Hub.

## What the page counts

Page visits, form submissions by type, press-kit downloads, and clicks to the newsletter,
apps and coverage — as daily totals only. No names, emails or addresses are recorded.
The totals appear at the top of the **Media inquiries** tab.
