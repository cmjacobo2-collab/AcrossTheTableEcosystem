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

## Safe points

Versions known to be working are tagged. `git tag` lists them, or look under
**Releases → Tags** on GitHub. A tag is just a name pinned to a version, so you
can recognise a good one later instead of guessing from a list of dates.
