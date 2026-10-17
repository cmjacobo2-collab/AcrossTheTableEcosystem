# App pages — acrossthetable.biz/<app>/

Every app has its own real web address, so each one can be found in search:

    acrossthetable.biz/startwise/     acrossthetable.biz/tabletap/     …and the rest

## Where things come from

| What | Comes from | Updates |
|---|---|---|
| Words, layout, sections | The app's page inside `index.html` | Rebuilt automatically when a new `index.html` is uploaded |
| Prices, plans, Stan Store links | `prices.json` | Straight away — the page reads it every time it opens |
| Flyer, photos, video | `prices.json` (set in Products & pricing) | Straight away |
| Search title, description, sharing image | Built from the app's headline and description | Rebuilt automatically |

You keep editing exactly as before. Nothing new to maintain.

## How the automatic rebuild works

`.github/workflows/build-app-pages.yml` runs `python3 _apps/build.py` whenever
`index.html`, `prices.json` or this folder changes, and saves the result as a
commit called "Rebuild app pages". It never touches `index.html`, so
**Restore previous website version** works exactly as before.

To run it by hand: **Actions → Rebuild app pages → Run workflow**.

## Old links

A link that opens straight onto an app inside the main page
(`acrossthetable.biz/#app-startwise`) is sent to the app's own page.
The app cards on the home page link to the new pages too.

## Adding a new app

Add its page to `index.html` the usual way and upload. The rebuild creates its
page and adds it to the sitemap. To make old `#app-` links for the new app
redirect too, add its name to the `APP_PAGES` list near the top of `index.html`.
