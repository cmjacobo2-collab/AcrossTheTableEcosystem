# Across the Table — website

The whole of **acrossthetable.biz** is one file: `index.html`.
Prices, store links, tickets and settings live alongside it in `prices.json`.

Published by GitHub Pages from this repository, with the domain pointed here from GoDaddy.

---

## Publishing a new version

1. Make your changes in the Hub, or have them made for you.
2. Run the file through `lock-my-hub.html` — it gives you back `index.html`.
3. **Add file → Upload files** here, drag in that `index.html`, **Commit changes**.
4. Wait about a minute, then check acrossthetable.biz **in a private window**.
   A normal window shows you the cached old copy and makes you think nothing happened.

Prices on their own don't need step 2 — the **Save** button in Products & pricing
updates `prices.json` here directly.

---

## If a new version breaks the site

Every version ever uploaded is kept. To go back to the one before:

**Actions** → **Restore previous website version** → **Run workflow** → **Run workflow**

That's it. It puts back the previous `index.html` and tells you which version it used.

- Nothing is erased. The version it replaced stays in the history.
- Gone back too far? Run it again to keep stepping back, or step forward by
  restoring and re-uploading the file you want.
- To go back further in one go, type a bigger number in the box — `2` is two
  versions back, `3` is three.

Give it a minute after it finishes, then check the site in a private window.

---

## Marking a version you know works

Every upload is recorded as "Add files via upload", which tells you nothing
when you are looking for a good one to go back to. So when a version is
working well, give it a name:

**Releases → Tags → Create a new tag** → pick the version, name it something
like `known-good-30-sep`, and save.

Then you are choosing from names you recognise instead of guessing from a list
of identical messages and timestamps.

Known good as of 30 September 2026: the version uploaded at **00:30**, with the
assessment cards, all five admin panes, the support page, the ticketing
dashboard and the fix log. Hub encrypted, no card fields, all site checks pass.
