# -*- coding: utf-8 -*-
"""
Gives every app its own real web address: acrossthetable.biz/<app>/

    python3 _apps/build.py

The words, layout and look come straight from each app's page inside
index.html, so there is one place to write them. Prices, plans, flyers,
photos and videos are read from prices.json when the page opens, so a price
saved in Products & pricing shows up on these pages with no rebuild.

GitHub runs this automatically whenever index.html, prices.json or this
folder changes (see .github/workflows/build-app-pages.yml). It never edits
index.html itself.

This folder starts with an underscore, so GitHub Pages does not publish it.
"""
import base64, html, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = 'https://acrossthetable.biz'
SRC = open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()
PRICES_FILE = json.load(open(os.path.join(ROOT, 'prices.json'), encoding='utf-8'))
PRICES = PRICES_FILE.get('prices', PRICES_FILE)
SELLING = ('Available', 'Available for purchase', 'Beta')

def die(msg):
    sys.exit('build-app-pages: ' + msg)

def write(path, data, binary=False):
    full = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    old = None
    if os.path.exists(full):
        old = open(full, 'rb').read()
    new = data if binary else data.encode('utf-8')
    if old != new:
        open(full, 'wb').write(new)
        return True
    return False

def js_object(name):
    """Read a simple  window.NAME = { "key": "value", ... };  from index.html."""
    m = re.search(r'window\.' + name + r'\s*=\s*\{(.*?)\};', SRC, re.S)
    if not m:
        return {}
    body = re.sub(r'/\*.*?\*/', '', m.group(1), flags=re.S)
    return dict(re.findall(r'"([^"]+)"\s*:\s*"([^"]*)"', body))

def text(fragment):
    t = re.sub(r'<[^>]+>', ' ', fragment)
    return re.sub(r'\s+', ' ', html.unescape(t)).strip()

# ---------------------------------------------------------------- shared files
blocks = [m.group(1) for m in re.finditer(r'<style[^>]*>(.*?)</style>', SRC, re.S)]
css_parts = [b for b in blocks if '.lp-hero' in b or '.sosign' in b or '.pkgs' in b]
css_parts = [b for b in css_parts if '@font-face' not in b]          # fonts come from Google Fonts
# a loading screen's own styles (it centres the whole body) must not come along
css_parts = [b for b in css_parts if not re.search(r'(?m)^\s*body\s*\{[^}]*min-height:\s*100vh', b)]
if not css_parts:
    die('could not find the site styles in index.html')
extra = """
/* ---- standalone app pages ---- */
.reveal{opacity:1!important;transform:none!important}
.lp-bread{font:500 12px var(--mono);letter-spacing:.12em;text-transform:uppercase;color:var(--text-muted);margin:0 0 14px}
.lp-bread a{color:var(--text-muted);text-decoration:none}
.lp-bread a:hover{color:var(--text-heading)}
"""
changed = []
if write('assets/site.css', '\n'.join(css_parts) + extra):
    changed.append('assets/site.css')

# app logos, taken from the home page cards
logos = {}
for m in re.finditer(r'data-slug="([a-z0-9-]+)"[^>]*>\s*<div class="app-top">\s*<span class="app-icon"><img src="data:image/(png|jpeg|webp|svg\+xml);base64,([A-Za-z0-9+/=]+)"', SRC):
    slug, mime, b64 = m.groups()
    ext = {'png': 'png', 'jpeg': 'jpg', 'webp': 'webp', 'svg+xml': 'svg'}[mime]
    path = 'assets/logos/%s.%s' % (slug, ext)
    if write(path, base64.b64decode(b64), binary=True):
        changed.append(path)
    logos[slug] = '/' + path

# footer logo
m = re.search(r'<div class="foot-logo">\s*<img src="data:image/png;base64,([A-Za-z0-9+/=]+)"', SRC)
if m and write('assets/footer-logo.png', base64.b64decode(m.group(1)), binary=True):
    changed.append('assets/footer-logo.png')

# ---------------------------------------------------------------- header, footer
def fix_links(frag, own_ids=()):
    def href(m):
        u = m.group(1)
        if u.startswith('#'):
            return 'href="%s"' % (u if u[1:] in own_ids else '/' + u)
        if re.match(r'^(https?:|mailto:|tel:|/|data:)', u):
            return m.group(0)
        return 'href="/%s"' % u
    frag = re.sub(r'href="([^"]*)"', href, frag)
    # in-site "view" links become real links back to the main site
    frag = re.sub(r'\sdata-view="[^"]*"', '', frag)
    return frag

h0 = SRC.index('<header class="topbar">'); h1 = SRC.index('</header>', h0) + len('</header>')
HEADER = fix_links(SRC[h0:h1]).replace('href="/#top"', 'href="/"')

f0 = SRC.index('<footer class="foot">'); f1 = SRC.index('</footer>', f0) + len('</footer>')
FOOTER = SRC[f0:f1]
FOOTER = re.sub(r'<img src="data:image/png;base64,[A-Za-z0-9+/=]+"', '<img src="/assets/footer-logo.png"', FOOTER, count=1)
FOOTER = fix_links(FOOTER)
s0 = SRC.index('window.SOCIAL_LINKS', f1)
s0 = SRC.rindex('<script>', 0, s0); s1 = SRC.index('</script>', s0) + len('</script>')
SOCIAL_SCRIPT = SRC[s0:s1]

# ---------------------------------------------------------------- the store settings the page needs
STORE = {
    'storeFront': (re.search(r'window\.STORE_FRONT\s*=\s*"([^"]*)"', SRC) or [None, ''])[1],
    'storeLinks': js_object('STORE_LINKS'),
    'appLinks': js_object('APP_LINKS'),
    'appleLinks': js_object('APPLE_LINKS'),
    'appButton': js_object('APP_BUTTON'),
}
if isinstance(PRICES_FILE.get('storeLinks'), dict):
    STORE['storeLinks'].update(PRICES_FILE['storeLinks'])

LEGAL_APPS = [d for d in os.listdir(os.path.join(ROOT, 'legal')) if os.path.isdir(os.path.join(ROOT, 'legal', d))]

# ---------------------------------------------------------------- one page per app
TEMPLATE = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'template.html'), encoding='utf-8').read()

pages = []
for m in re.finditer(r'<article class="lp" id="app-([a-z0-9-]+)"', SRC):
    slug = m.group(1)
    a0 = m.start(); a1 = SRC.index('</article>', a0) + len('</article>')
    art = SRC[a0:a1]
    ids = set(re.findall(r'\sid="([^"]+)"', art))

    name = text(re.search(r'<h2 class="lp-name">(.*?)</h2>', art, re.S).group(1))
    h1 = text(re.search(r'<h1>(.*?)</h1>', art, re.S).group(1))
    lede_m = re.search(r'<p class="lp-lede">(.*?)</p>', art, re.S)
    lede = text(lede_m.group(1)) if lede_m else h1
    d = PRICES.get(slug, {})
    status = d.get('status', '')

    # make the article a page of its own
    art = art.replace(' hidden aria-hidden="true"', '', 1)
    art = re.sub(r'<button class="back" type="button" data-home>(.*?)</button>',
                 r'<a class="back" href="/#system">\1</a>', art, flags=re.S)
    art = re.sub(r'<button class="btn btn-secondary" type="button" data-home>(.*?)</button>',
                 r'<a class="btn btn-secondary" href="/#system">\1</a>', art, flags=re.S)
    art = re.sub(r'<(button|a)([^>]*?)\sdata-home([^>]*)>', r'<\1\2\3 data-home-link>', art)
    art = fix_links(art, ids)
    art = re.sub(r'data-goto="#([^"]+)"', lambda g: 'data-goto="#%s"' % g.group(1) if g.group(1) in ids else 'href="/#%s"' % g.group(1), art)
    if slug in logos:
        art = art.replace('<img data-logo="%s"' % slug, '<img data-logo="%s" src="%s"' % (slug, logos[slug]))
    # the page's main heading stays an h1; the app name above it is the h2 it already is

    blurb = text(d.get('blurb', '')).rstrip('.')
    tries = ['%s — %s | Across the Table' % (name, h1.rstrip('.')), '%s — %s' % (name, h1.rstrip('.')),
             '%s — %s' % (name, blurb) if blurb else '', '%s | Across the Table' % name]
    title = next(t for t in tries if t and len(t) <= 66) if any(t and len(t) <= 66 for t in tries) else name
    desc = lede if len(lede) <= 160 else lede[:157].rsplit(' ', 1)[0] + '…'
    url = '%s/%s/' % (SITE, slug)
    flyer = d.get('flyer') or ((d.get('flyers') or [None])[0])
    image = '%s/%s' % (SITE, flyer) if flyer else (SITE + logos[slug] if slug in logos else SITE + '/media/og-media.jpg')

    # structured data: the app itself, with real prices only
    offers = []
    for p in d.get('plans', []):
        if p.get('key') == 'trial' or not p.get('amount'):
            continue
        offers.append({'@type': 'Offer', 'name': p.get('label', ''), 'price': '%.2f' % float(p['amount']),
                       'priceCurrency': 'USD', 'url': url,
                       'availability': 'https://schema.org/InStock' if status in SELLING else 'https://schema.org/PreOrder'})
    app_ld = {'@type': 'SoftwareApplication', 'name': name, 'description': lede, 'url': url,
              'applicationCategory': 'BusinessApplication', 'operatingSystem': 'Web, Android',
              'image': image, 'publisher': {'@id': SITE + '/#org'}}
    if offers:
        app_ld['offers'] = offers
    ld = {'@context': 'https://schema.org', '@graph': [
        {'@type': 'WebPage', '@id': url, 'url': url, 'name': title, 'description': desc,
         'isPartOf': {'@id': SITE + '/#website'}, 'about': {'@id': url + '#app'},
         'breadcrumb': {'@type': 'BreadcrumbList', 'itemListElement': [
             {'@type': 'ListItem', 'position': 1, 'name': 'Across the Table', 'item': SITE + '/'},
             {'@type': 'ListItem', 'position': 2, 'name': 'Apps', 'item': SITE + '/#system'},
             {'@type': 'ListItem', 'position': 3, 'name': name, 'item': url}]}},
        dict(app_ld, **{'@id': url + '#app'}),
        {'@type': 'Organization', '@id': SITE + '/#org', 'name': 'Across the Table',
         'legalName': 'Bold and Beautiful Beauties', 'url': SITE + '/',
         'logo': SITE + '/media/across-the-table-logo.png'}]}

    page_cfg = {'slug': slug, 'store': {k: (v.get(slug, '') if isinstance(v, dict) else v) for k, v in STORE.items()},
                'legal': slug in LEGAL_APPS, 'prices': {slug: d} if d else {}}

    out = TEMPLATE
    for k, v in {
        'TITLE': html.escape(title), 'DESC': html.escape(desc, quote=True), 'URL': url,
        'IMAGE': image, 'NAME': html.escape(name), 'APPCOLOR': (re.search(r'--app:(#[0-9A-Fa-f]{3,8})', art) or [None, '#2BA8FF'])[1],
        'JSONLD': json.dumps(ld, ensure_ascii=False).replace('</', '<\\/'),
        'CONFIG': json.dumps(page_cfg, ensure_ascii=False).replace('</', '<\\/'),
        'HEADER': HEADER, 'ARTICLE': art, 'FOOTER': FOOTER, 'SOCIAL': SOCIAL_SCRIPT,
    }.items():
        out = out.replace('{{%s}}' % k, v)
    if re.search(r'\{\{[A-Z]+\}\}', out):
        die('unfilled placeholder in ' + slug)
    if write('%s/index.html' % slug, out):
        changed.append(slug + '/index.html')
    pages.append(slug)

if len(pages) < 10:
    die('found only %d app pages in index.html — stopping so nothing is broken' % len(pages))

# ---------------------------------------------------------------- sitemap
urls = [(SITE + '/', '1.0'), (SITE + '/media/', '0.8'), (SITE + '/substack/', '0.8')] + [('%s/%s/' % (SITE, s), '0.9') for s in pages]
legal = [(SITE + '/legal/', '0.3'), (SITE + '/legal/terms.html', '0.3'), (SITE + '/legal/privacy.html', '0.3')]
for dname in sorted(LEGAL_APPS):
    for f in sorted(os.listdir(os.path.join(ROOT, 'legal', dname))):
        if f.endswith('.html'):
            legal.append(('%s/legal/%s/%s' % (SITE, dname, f.replace('index.html', '')), '0.3'))
sm = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
sm += ''.join('  <url><loc>%s</loc><priority>%s</priority></url>\n' % u for u in urls + legal)
sm += '</urlset>\n'
if write('sitemap.xml', sm):
    changed.append('sitemap.xml')

# the list the main page uses to send old #app- links to the new pages
if write('assets/app-pages.json', json.dumps(sorted(pages)) + '\n'):
    changed.append('assets/app-pages.json')

print('%d app pages: %s' % (len(pages), ', '.join(pages)))
print('changed: ' + (', '.join(changed) if changed else 'nothing'))
