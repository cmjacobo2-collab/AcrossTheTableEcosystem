# The Scaling Edge on acrossthetable.biz

Substack is the only home for subscribers. The website shows Substack's own
signup form and links to Substack. It never sees, stores or sends anyone's
email address, and it never signs anyone up by itself.

## Where the newsletter shows up

| Where | What visitors see | Comes from |
|---|---|---|
| Home page, above "Why it exists" | Full section: headline, Monday promise, Substack's form | `index.html` (one empty slot) + `assets/newsletter.js` |
| Every footer (except the newsletter page) | One line and a **Subscribe Free** button | `assets/newsletter.js` adds it |
| Every app page | Slim band: "Discover strategies and tools…" | `_apps/template.html` |
| `acrossthetable.biz/newsletter/` | The full newsletter page, with past issues | `newsletter/index.html` |
| `acrossthetable.biz/substack/` | Forwards to `/newsletter/` (old links keep working) | `substack/index.html` |
| Menu | **Newsletter** → `/newsletter/` | `index.html` |

There is no blog on the site yet. When there is one, put this line under each
article and the "Enjoyed this article?" band appears there:

    <section class="se-band" data-newsletter="blog"></section>

(The page also needs `/assets/newsletter.css` and `/assets/newsletter.js`, like the app pages.)

## Changing the words, the day, or the Substack address

Everything is in the settings box at the top of `assets/newsletter.js`:
`substack`, `day`, `headline`, `description`, `button` and the three `cta` lines.
Change it there, upload that one file, done. Any "Monday" written into the
newsletter page follows the `day` setting too.

## Past issues

`newsletter/index.html` shows the six newest issues, copied exactly from the
official Substack feed (title, date, picture, link). GitHub refreshes them every
four hours (**Actions → Update newsletter issues**). To refresh straight after
publishing: **Actions → Update newsletter issues → Run workflow**.
If Substack can't be reached, nothing changes. To show more or fewer, change
`SHOW = 6` in `_newsletter/update_issues.py`.

## What gets counted, and where to see it

| Number | Where |
|---|---|
| Subscribers, free/paid, opens, growth, where subscribers came from | **Substack dashboard** — the only true count of subscriptions |
| Newsletter page visits (`page_view`) | Supabase → table `newsletter_stats` |
| Signup form actually seen on screen (`form_view`) | same |
| Someone clicked into the form (`form_engaged`) — *interest, not a subscription* | same |
| **Subscribe Free** button clicks (`click`) — *interest, not a subscription* | same |

Each row is a daily total by `place` (home, footer, app, blog, page) and
`source` (instagram, facebook, linkedin, youtube, google, direct …, from the
link's `utm_source` or where the visitor came from). No emails, names or IP
addresses. Run `supabase-newsletter.sql` once to create the table; until then,
button clicks still go into the existing "Newsletter clicks" count.

Nothing on the website can confirm a subscription — only Substack knows. So
the site never reports one.
