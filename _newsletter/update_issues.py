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
import datetime, email.utils, html, json, os, re, sys, urllib.parse, urllib.request
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = 'https://acrossthetablebiz.substack.com'
FEED = PUB + '/feed'
JSON_PATH = os.path.join(ROOT, 'assets', 'newsletter', 'issues.json')
PAGE_PATH = os.path.join(ROOT, 'newsletter', 'index.html')
SHOW = 9                                   # how many issues the page shows
PHOENIX = datetime.timezone(datetime.timedelta(hours=-7))   # Arizona: no daylight saving
IMG_OK = ('https://substackcdn.com/', 'https://substack-post-media.s3.amazonaws.com/')


def clean(s):
    s = re.sub(r'<[^>]+>', ' ', s or '')
    return re.sub(r'\s+', ' ', html.unescape(s)).strip()


UA = 'Mozilla/5.0 (compatible; AcrossTheTableFeed/1.0; +https://acrossthetable.biz/newsletter/)'
# Substack refuses requests from GitHub's servers (403), so if the direct read
# fails the same official feed is read through feed relays instead. Only posts
# at the publication's own address are kept, whichever route delivers them.
RELAYS = [
    'https://api.rss2json.com/v1/api.json?rss_url=' + urllib.parse.quote(FEED, safe=''),
    'https://api.allorigins.win/raw?url=' + urllib.parse.quote(FEED, safe=''),
]


def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': UA,
        'Accept': 'application/rss+xml, application/xml;q=0.9, application/json;q=0.8, */*;q=0.5'})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()


def items_from_xml(raw):
    root = ET.fromstring(raw)
    for it in root.iter('item'):
        enc = it.find('enclosure')
        yield (it.findtext('link'), it.findtext('title'), it.findtext('description'),
               email.utils.parsedate_to_datetime(it.findtext('pubDate')),
               enc.get('url', '') if enc is not None else '')


def items_from_json(raw):
    data = json.loads(raw)
    if data.get('status') != 'ok':
        raise ValueError('relay said: %s' % data.get('message', data.get('status')))
    for it in data.get('items', []):
        when = datetime.datetime.strptime(it['pubDate'], '%Y-%m-%d %H:%M:%S').replace(tzinfo=datetime.timezone.utc)
        enc = it.get('enclosure') or {}
        yield (it.get('link'), it.get('title'), it.get('description'), when,
               enc.get('link', '') or it.get('thumbnail', ''))


def fetch():
    errors = []
    for url in [FEED] + RELAYS:
        try:
            raw = get(url)
            rows = list(items_from_json(raw) if raw.lstrip()[:1] == b'{' else items_from_xml(raw))
            if url != FEED:
                say('update-issues: read the Substack feed through a relay (%s)' % url.split('/')[2])
            break
        except Exception as ex:
            errors.append('%s: %s' % (url.split('/')[2], ex))
    else:
        raise RuntimeError('; '.join(errors))
    out = []
    for link, title, desc, when, img in rows:
        link = (link or '').strip()
        if not link.startswith(PUB + '/p/'):
            continue
        img = img or ''
        out.append({
            'title': clean(title),
            'subtitle': clean(desc),
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
    pic = ('<span class="nl-issue-ph" aria-hidden="true"><img src="/assets/newsletter/scaling-edge-logo.jpg" alt="" '
           'loading="lazy" decoding="async" width="320" height="320"></span>')
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


INBOX = os.path.join(ROOT, '_newsletter', 'inbox')


def merge_inbox(issues):
    """Add issues that Zapier dropped into _newsletter/inbox/ (one small JSON
    file per new Substack post). Zapier reads the feed from its own servers,
    which Substack does not block. Only posts at the publication's address
    are accepted; one already listed is left as it is."""
    have = {i['url'] for i in issues}
    if not os.path.isdir(INBOX):
        return issues
    for name in sorted(os.listdir(INBOX)):
        if not name.endswith('.json'):
            continue
        try:
            raw = json.load(open(os.path.join(INBOX, name), encoding='utf-8'))
            url = (raw.get('url') or '').split('?')[0].strip()
            if not url.startswith(PUB + '/p/') or url in have:
                continue
            when = email.utils.parsedate_to_datetime(raw['date']) if ',' in (raw.get('date') or '') \
                else datetime.datetime.fromisoformat(raw['date'].replace('Z', '+00:00'))
            if when.tzinfo is None:
                when = when.replace(tzinfo=datetime.timezone.utc)
            img = (raw.get('image') or '').strip()
            issues.append({
                'title': clean(raw.get('title')),
                'subtitle': clean(raw.get('subtitle')),
                'date': when.astimezone(PHOENIX).date().isoformat(),
                'url': url,
                'image': img if img.startswith(IMG_OK) else '',
            })
            have.add(url)
            say('update-issues: added "%s" from Zapier' % clean(raw.get('title')))
        except Exception as ex:
            say('update-issues: skipped %s (%s)' % (name, ex), 'warning')
    issues.sort(key=lambda x: x['date'], reverse=True)
    return issues


def main():
    if '--render' in sys.argv:
        issues = json.load(open(JSON_PATH, encoding='utf-8'))['issues']
    else:
        old = json.load(open(JSON_PATH, encoding='utf-8')).get('issues') if os.path.exists(JSON_PATH) else None
        try:
            issues = fetch()
        except Exception as ex:                      # Substack blocks GitHub's servers: fall back to what Zapier delivered
            say('update-issues: could not read the Substack feed (%s) — using issues delivered by Zapier' % ex, 'warning')
            issues = [dict(i) for i in (old or [])]
        issues = merge_inbox(issues)
        if not issues:
            say('update-issues: no issues found — nothing changed', 'warning')
            return
        kept = {i['url']: i['image'] for i in (old or []) if i.get('image')}
        for i in issues:                              # a picture added by hand stays if the feed has none
            if not i['image'] and i['url'] in kept:
                i['image'] = kept[i['url']]
        if issues != old:
            os.makedirs(os.path.dirname(JSON_PATH), exist_ok=True)
            json.dump({'source': FEED, 'issues': issues}, open(JSON_PATH, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
            open(JSON_PATH, 'a', encoding='utf-8').write('\n')
    changed = render(issues)
    say('update-issues: %d issues, page %s' % (len(issues), 'updated' if changed else 'already up to date'))


if __name__ == '__main__':
    main()
