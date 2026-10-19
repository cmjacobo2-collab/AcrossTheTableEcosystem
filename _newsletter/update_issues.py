# -*- coding: utf-8 -*-
"""
Keeps the "Previous issues" list on acrossthetable.biz/newsletter/ in step
with what is actually published on Substack.

    python3 _newsletter/update_issues.py            # read Substack's feed, update the page
    python3 _newsletter/update_issues.py --render   # just redraw the page from issues.json

It reads the publication's official RSS feed, keeps only real posts from the
publication's own address, and writes:

    assets/newsletter/issues.json     the list, for anything else that wants it
    newsletter/index.html             the cards between <!-- issues --> and <!-- /issues -->

Titles, dates and pictures are copied from Substack exactly. Nothing is made up.
If Substack can't be reached, or the feed comes back empty, nothing is changed.

GitHub runs this by itself every few hours (.github/workflows/update-newsletter-issues.yml).
This folder starts with an underscore, so GitHub Pages does not publish it.
"""
import datetime, email.utils, html, json, os, re, sys, urllib.request
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = 'https://acrossthetablebiz.substack.com'
FEED = PUB + '/feed'
JSON_PATH = os.path.join(ROOT, 'assets', 'newsletter', 'issues.json')
PAGE_PATH = os.path.join(ROOT, 'newsletter', 'index.html')
SHOW = 6                                   # how many issues the page shows
PHOENIX = datetime.timezone(datetime.timedelta(hours=-7))   # Arizona: no daylight saving
IMG_OK = ('https://substackcdn.com/', 'https://substack-post-media.s3.amazonaws.com/')


def clean(s):
    s = re.sub(r'<[^>]+>', ' ', s or '')
    return re.sub(r'\s+', ' ', html.unescape(s)).strip()


def fetch():
    req = urllib.request.Request(FEED, headers={
        'User-Agent': 'Mozilla/5.0 (compatible; AcrossTheTableFeed/1.0; +https://acrossthetable.biz/newsletter/)',
        'Accept': 'application/rss+xml, application/xml;q=0.9, */*;q=0.8'})
    with urllib.request.urlopen(req, timeout=30) as r:
        root = ET.fromstring(r.read())
    out = []
    for it in root.iter('item'):
        link = (it.findtext('link') or '').strip()
        if not link.startswith(PUB + '/p/'):
            continue
        when = email.utils.parsedate_to_datetime(it.findtext('pubDate'))
        enc = it.find('enclosure')
        img = enc.get('url', '') if enc is not None else ''
        out.append({
            'title': clean(it.findtext('title')),
            'subtitle': clean(it.findtext('description')),
            'date': when.astimezone(PHOENIX).date().isoformat(),
            'url': link.split('?')[0],
            'image': img if img.startswith(IMG_OK) else '',
        })
    out.sort(key=lambda x: x['date'], reverse=True)
    return out


def card(i):
    e = lambda s: html.escape(s, quote=True)
    d = datetime.date.fromisoformat(i['date'])
    nice = d.strftime('%b ') + str(d.day) + d.strftime(', %Y')
    heading = i['subtitle'] or i['title']
    label = i['title'] if i['subtitle'] else ''
    # the title card sits underneath; Substack's cover picture covers it, or is dropped if it fails to load
    pic = '<span class="nl-issue-ph" aria-hidden="true">The Scaling Edge</span>'
    if i['image']:
        pic += ('<img src="%s" alt="" loading="lazy" decoding="async" width="600" height="400" onerror="this.remove()">' % e(i['image']))
    return ('<li class="nl-issue"><a href="%s" target="_blank" rel="noopener">'
            '<div class="nl-issue-pic">%s</div>'
            '<div class="nl-issue-body">%s<time datetime="%s">%s</time><h3>%s</h3>'
            '<span class="nl-issue-go">Read issue <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
            'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg></span>'
            '</div></a></li>') % (e(i['url']), pic,
                                   ('<span class="nl-issue-label">%s</span>' % e(label)) if label else '',
                                   e(i['date']), e(nice), e(heading))


def render(issues):
    page = open(PAGE_PATH, encoding='utf-8').read()
    m = re.search(r'(<!-- issues -->)(.*?)(<!-- /issues -->)', page, re.S)
    if not m:
        sys.exit('update-issues: the <!-- issues --> markers are missing from newsletter/index.html')
    body = '\n<ul class="nl-issues">\n' + '\n'.join(card(i) for i in issues[:SHOW]) + '\n</ul>\n'
    new = page[:m.end(1)] + body + page[m.start(3):]
    if new != page:
        open(PAGE_PATH, 'w', encoding='utf-8').write(new)
        return True
    return False


def say(msg, level='notice'):
    # printed normally, and shown on the run's page in GitHub Actions
    print(msg)
    if os.environ.get('GITHUB_ACTIONS'):
        print('::%s::%s' % (level, msg))


def main():
    if '--render' in sys.argv:
        issues = json.load(open(JSON_PATH, encoding='utf-8'))['issues']
    else:
        try:
            issues = fetch()
        except Exception as ex:                      # Substack down or unreachable: leave everything as it is
            say('update-issues: could not read the Substack feed (%s) — nothing changed' % ex, 'warning')
            return
        if not issues:
            say('update-issues: the feed had no posts — nothing changed', 'warning')
            return
        old = json.load(open(JSON_PATH, encoding='utf-8')).get('issues') if os.path.exists(JSON_PATH) else None
        if issues != old:
            os.makedirs(os.path.dirname(JSON_PATH), exist_ok=True)
            json.dump({'source': FEED, 'issues': issues}, open(JSON_PATH, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
            open(JSON_PATH, 'a', encoding='utf-8').write('\n')
    changed = render(issues)
    say('update-issues: %d issues, page %s' % (len(issues), 'updated' if changed else 'already up to date'))


if __name__ == '__main__':
    main()
