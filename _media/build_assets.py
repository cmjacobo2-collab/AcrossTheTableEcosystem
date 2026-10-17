# -*- coding: utf-8 -*-
"""Builds the downloadable press files in /media from media/media.json:
   connie-ramirez-media-profile.pdf, across-the-table-fact-sheet.pdf,
   connie-ramirez-bio.txt, og-media.jpg (the social-sharing image).
       python3 _media/build_assets.py
"""
import json, os, textwrap
from PIL import Image, ImageDraw, ImageFont
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import simpleSplit, ImageReader

HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE); OUT = os.path.join(ROOT, 'media')
D = json.load(open(os.path.join(OUT, 'media.json'), encoding='utf-8'))
P = json.load(open(os.path.join(ROOT, 'prices.json'), encoding='utf-8'))['prices']
F, C, CT = D['founder'], D['company'], D['contact']
NAME = F['name'] + (', ' + F['credentials'] if F.get('credentials') else '')
pdfmetrics.registerFont(TTFont('WS', os.path.join(HERE, 'fonts', 'WorkSans-Regular.ttf')))
pdfmetrics.registerFont(TTFont('WSB', os.path.join(HERE, 'fonts', 'WorkSans-Bold.ttf')))
NAVY, GOLD, INK, MUTED, LINE = HexColor('#083A66'), HexColor('#E0A03A'), HexColor('#0B1726'), HexColor('#5B6675'), HexColor('#E5E1D8')
shown = lambda l: [x for x in (l or []) if x.get('show', True)]
W, H = letter; M = 50

def para(c, text, x, y, w, font='WS', size=10, lead=14.2, color=INK):
    c.setFont(font, size); c.setFillColor(color)
    for line in simpleSplit(text, font, size, w):
        c.drawString(x, y, line); y -= lead
    return y

def label(c, text, x, y):
    c.setFillColor(GOLD); c.rect(x, y + 2.5, 14, 1.6, stroke=0, fill=1)
    c.setFont('WSB', 7.6); c.setFillColor(HexColor('#8A5A0B')); c.drawString(x + 20, y, text.upper()); return y - 15

def header(c, title):
    c.setFillColor(NAVY); c.rect(0, H - 92, W, 92, stroke=0, fill=1)
    c.setFillColor(GOLD); c.rect(0, H - 95, W, 3, stroke=0, fill=1)
    c.setFont('WSB', 8); c.setFillColor(HexColor('#F3C77C')); c.drawString(M, H - 34, title.upper())
    c.setFont('WSB', 22); c.setFillColor(HexColor('#FFFFFF')); c.drawString(M, H - 62, NAME if 'PROFILE' in title.upper() else C['name'])
    c.setFont('WS', 9.5); c.setFillColor(HexColor('#C9D8E8'))
    c.drawString(M, H - 79, (F['title'] + ' | ' + F['subtitle']) if 'PROFILE' in title.upper() else C['description'][:0] + 'Business technology and education · ' + C['headquarters'])
    logo = os.path.join(OUT, 'across-the-table-logo.png')
    c.setFillColor(HexColor('#FFFFFF')); c.roundRect(W - M - 88, H - 80, 88, 60, 8, stroke=0, fill=1)
    c.drawImage(ImageReader(logo), W - M - 82, H - 77, 76, 54, mask='auto', preserveAspectRatio=True)

def footer(c):
    c.setStrokeColor(LINE); c.line(M, 52, W - M, 52)
    c.setFont('WS', 7.8); c.setFillColor(MUTED)
    c.drawString(M, 38, 'Media contact: ' + CT['email'] + '   ·   ' + C['website'].replace('https://', '') + '/media')
    c.drawRightString(W - M, 38, C['legal_name'])

def apps_list():
    out = []
    for a in shown(C['featured_apps']):
        p = P.get(a['slug'], {}); st = p.get('status', '')
        tag = 'Beta' if 'beta' in st.lower() else ('Available' if 'available' in st.lower() else 'In development')
        out.append((p.get('name', a['slug']), a['line'], tag))
    return out

# ---------- one-page founder media profile ----------
def profile():
    c = canvas.Canvas(os.path.join(OUT, 'connie-ramirez-media-profile.pdf'), pagesize=letter)
    c.setTitle('Connie Ramirez, MBA — Media Profile'); c.setAuthor(C['name']); c.setSubject('Founder media profile')
    header(c, 'Founder media profile')
    # photo column
    ph = os.path.join(OUT, F['photo']); im = Image.open(ph)
    cw = 150; crop = im.crop((60, 40, 640, 40 + int(580 * 1.18)))
    ch = cw * crop.height / crop.width
    top = H - 118
    c.drawImage(ImageReader(crop), M, top - ch, cw, ch)
    y = top - ch - 22
    y = label(c, 'Education', M, y)
    for e in F.get('education', []): y = para(c, e, M, y, cw, size=8.8, lead=12) - 3
    y -= 6; y = label(c, 'Based in', M, y); y = para(c, F['location'], M, y, cw, size=8.8, lead=12) - 9
    y = label(c, 'Contact', M, y)
    y = para(c, CT['email'], M, y, cw, size=8.8, lead=12)
    y = para(c, C['website'].replace('https://', ''), M, y, cw, size=8.8, lead=12) - 4
    for l in CT['links']: y = para(c, l['label'] + ': ' + l['url'].replace('https://www.', '').replace('https://', '').rstrip('/'), M, y, cw, size=7.6, lead=10.5, color=MUTED) - 1
    # text column
    x = M + cw + 28; w = W - M - x; y = top - 6
    y = label(c, 'Biography', x, y)
    for p in F['bio_full']: y = para(c, p, x, y, w, size=9.6, lead=13.6) - 6
    y -= 4; y = label(c, 'About ' + C['name'], x, y)
    y = para(c, C['description'], x, y, w, size=9.6, lead=13.6) - 8
    y = label(c, 'Areas of expertise', x, y)
    ex = shown(D['expertise']); colw = (w - 14) / 2
    for i in range(0, len(ex), 2):
        yy = y
        for j, t in enumerate(ex[i:i+2]):
            xx = x + j * (colw + 14)
            c.setFillColor(GOLD); c.rect(xx, yy - 1, 2, 9, stroke=0, fill=1)
            y1 = para(c, t['title'], xx + 8, yy, colw - 8, font='WSB', size=8.8, lead=11.5)
            y1 = para(c, t['text'], xx + 8, y1, colw - 8, size=8, lead=10.6, color=MUTED)
            yy2 = y1 if j == 0 else min(yy2, y1)
            if j == 0: yy2 = y1
        y = yy2 - 7
    footer(c); c.showPage(); c.save()
    return y

# ---------- company fact sheet ----------
def factsheet():
    c = canvas.Canvas(os.path.join(OUT, 'across-the-table-fact-sheet.pdf'), pagesize=letter)
    c.setTitle('Across the Table — Company Fact Sheet'); c.setAuthor(C['name'])
    header(c, 'Company fact sheet')
    y = H - 128; x = M; w = W - 2 * M
    rows = [('Business name', C['name']), ('Registered as', C['legal_name']), ('Founder', NAME + ', ' + F['title']),
            ('Headquarters', C['headquarters']), ('Website', C['website']), ('Media contact', CT['email'])]
    for k, v in rows:
        c.setFont('WSB', 8); c.setFillColor(MUTED); c.drawString(x, y, k.upper())
        para(c, v, x + 130, y, w - 130, size=10.4)
        c.setStrokeColor(LINE); c.line(x, y - 8, x + w, y - 8); y -= 25
    y -= 10; y = label(c, 'What we do', x, y)
    y = para(c, C['description'], x, y, w, size=10.2, lead=14.6) - 4
    y = para(c, C['vision'], x, y, w, size=10.2, lead=14.6) - 14
    y = label(c, 'Products and frameworks', x, y)
    for n, line, tag in apps_list():
        c.setFont('WSB', 10.4); c.setFillColor(INK); c.drawString(x, y, n)
        c.setFont('WS', 10); c.setFillColor(MUTED); c.drawString(x + 150, y, line)
        c.setFont('WSB', 7.6); c.setFillColor(HexColor('#1F7A4D') if tag != 'In development' else MUTED)
        c.drawRightString(x + w, y, tag.upper())
        c.setStrokeColor(LINE); c.line(x, y - 8, x + w, y - 8); y -= 24
    y -= 12; y = label(c, 'Founder', x, y)
    y = para(c, F['bio_short'], x, y, w, size=10.2, lead=14.6) - 14
    nl = D.get('newsletter') or {}
    if nl.get('show', True) and nl.get('url'):
        y = label(c, 'Newsletter', x, y)
        y = para(c, nl['name'] + ' — ' + nl['url'], x, y, w, font='WSB', size=10) - 2
        y = para(c, nl['description'], x, y, w, size=9.6, lead=13.6, color=MUTED)
    footer(c); c.showPage(); c.save()
    return y

# ---------- bio text ----------
def bio_txt():
    t = NAME + '\n' + F['title'] + ', ' + C['name'] + '\n' + F['location'] + '\n\n'
    t += 'SHORT BIOGRAPHY\n\n' + F['bio_short'] + '\n\nFULL BIOGRAPHY\n\n' + '\n\n'.join(F['bio_full'])
    t += '\n\nMedia contact: ' + CT['email'] + '\n' + C['website'] + '/media\n\n' + D['usage_statement'] + '\n'
    open(os.path.join(OUT, 'connie-ramirez-bio.txt'), 'w', encoding='utf-8', newline='\r\n').write(t)

# ---------- social sharing image 1200x630 ----------
def og():
    img = Image.new('RGB', (1200, 630), '#083A66'); d = ImageDraw.Draw(img)
    for i in range(630):  # gentle vertical gradient
        d.line([(0, i), (1200, i)], fill=(8, int(58 - i * 0.03), int(102 - i * 0.05)))
    ph = Image.open(os.path.join(OUT, F['photo'])).convert('RGB')
    crop = ph.crop((70, 40, 630, 40 + 560 * 630 // 470)).resize((470, 630))
    img.paste(crop, (730, 0))
    d.rectangle([60, 120, 104, 124], fill='#E0A03A')
    b = lambda s: ImageFont.truetype(os.path.join(HERE, 'fonts', 'WorkSans-Bold.ttf'), s)
    r = lambda s: ImageFont.truetype(os.path.join(HERE, 'fonts', 'WorkSans-Regular.ttf'), s)
    d.text((118, 108), 'MEDIA & PRESS', font=b(22), fill='#F3C77C')
    d.text((60, 170), 'Connie Ramirez, MBA', font=b(62), fill='#FFFFFF')
    d.text((60, 252), 'Founder & CEO, Across the Table', font=r(34), fill='#DCE7F2')
    for i, ln in enumerate(textwrap.wrap(F['subtitle'], 52)):
        d.text((60, 330 + i * 40), ln, font=r(27), fill='#9FB6CE')
    d.text((60, 520), 'acrossthetable.biz/media', font=b(28), fill='#E0A03A')
    img.save(os.path.join(OUT, 'og-media.jpg'), quality=88, optimize=True, progressive=True)

profile(); factsheet(); bio_txt(); og()
print('built press files')
