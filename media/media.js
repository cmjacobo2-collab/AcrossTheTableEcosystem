/* Across the Table — Media & Press page.
   One renderer, used twice: _media/build.mjs bakes the page so search engines and
   no-JavaScript readers get everything, and the browser re-draws from media.json on
   load so edits to media.json show up as soon as they are saved. */
(function (root) {
  'use strict';

  var SITE = 'https://acrossthetable.biz';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function shown(list) { return (list || []).filter(function (x) { return x && x.show !== false; }); }
  function safeUrl(u) { u = String(u || '').trim(); return /^(https?:|mailto:)/i.test(u) ? u : ''; }
  function fmtDate(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || ''); if (!m) return esc(iso || '');
    var mo = ['January','February','March','April','May','June','July','August','September','October','November','December'][+m[2] - 1];
    return mo + ' ' + (+m[3]) + ', ' + m[1];
  }
  function fullName(f) { return f.name + (f.credentials ? ', ' + f.credentials : ''); }

  var ICON = {
    mic: '<path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z"/><path d="M19 11a7 7 0 0 1-14 0M12 18v3"/>',
    down: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    out: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 0 1 1-1h10"/>'
  };
  function icon(n, cls) {
    return '<svg class="' + (cls || 'ic') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICON[n] + '</svg>';
  }

  /* ---------- sections ---------- */
  var S = {};

  S.hero = function (d) {
    var f = d.founder;
    return '' +
      '<div class="wrap hero-grid">' +
        '<div class="hero-text">' +
          '<p class="eyebrow">Media &amp; Press</p>' +
          '<h1>Meet the Founder Behind Across the Table</h1>' +
          '<p class="hero-name">' + esc(fullName(f)) + '</p>' +
          '<p class="hero-role">' + esc(f.title) + ' <span aria-hidden="true">|</span> ' + esc(f.subtitle) + '</p>' +
          '<p class="hero-intro">' + esc(f.intro) + '</p>' +
          '<div class="hero-cta">' +
            '<a class="btn btn-primary" href="#request">' + icon('mic') + 'Request an Interview</a>' +
            (shown(d.resources).some(function (r) { return r.key === 'kit'; })
              ? '<a class="btn btn-ghost" href="' + esc(shown(d.resources).filter(function (r) { return r.key === 'kit'; })[0].file) + '" download data-count="dl_kit">' + icon('down') + 'Download Media Kit</a>'
              : '') +
          '</div>' +
        '</div>' +
        '<figure class="hero-photo">' +
          (f.photo
            ? '<img src="' + esc(f.photo) + '" alt="' + esc(f.photo_alt || fullName(f)) + '" width="700" height="1000" fetchpriority="high">'
            : '<div class="photo-pending" role="img" aria-label="Founder photo coming soon"></div>') +
        '</figure>' +
      '</div>';
  };

  S.bio = function (d) {
    var f = d.founder;
    return '' +
      '<div class="wrap two">' +
        '<div><p class="eyebrow">Founder biography</p><h2>About ' + esc(f.name) + '</h2>' +
          (f.education && f.education.length
            ? '<ul class="facts">' + f.education.map(function (e) { return '<li>' + esc(e) + '</li>'; }).join('') + '<li>' + esc(f.location) + '</li></ul>'
            : '') +
        '</div>' +
        '<div class="bio">' +
          '<p class="bio-short">' + esc(f.bio_short) + '</p>' +
          '<div class="bio-full" id="bio-full" hidden>' + (f.bio_full || []).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div>' +
          '<div class="row">' +
            '<button class="linkbtn" type="button" data-toggle-bio aria-expanded="false" aria-controls="bio-full">Read the full biography</button>' +
            '<button class="linkbtn" type="button" data-copy-bio="short">' + icon('copy', 'ic sm') + 'Copy short bio</button>' +
            '<button class="linkbtn" type="button" data-copy-bio="full">' + icon('copy', 'ic sm') + 'Copy full bio</button>' +
            '<span class="copied" role="status" aria-live="polite"></span>' +
          '</div>' +
        '</div>' +
      '</div>';
  };

  S.company = function (d, prices) {
    var c = d.company, P = prices || {};
    var apps = shown(c.featured_apps).map(function (a) {
      var p = P[a.slug] || {};
      var name = p.name || a.name || a.slug;
      var st = String(p.status || '');
      var live = /available|beta/i.test(st);
      var label = /beta/i.test(st) ? 'Beta' : live ? 'Available now' : 'In development';
      return '<a class="app" href="../#app-' + esc(a.slug) + '" data-count="app_click">' +
        '<span class="app-top"><b>' + esc(name) + '</b><span class="tag ' + (live ? 'tag-live' : 'tag-dev') + '">' + label + '</span></span>' +
        '<span class="app-line">' + esc(a.line || p.blurb || '') + '</span></a>';
    }).join('');
    return '' +
      '<div class="wrap">' +
        '<div class="two">' +
          '<div><p class="eyebrow">The company</p><h2>About ' + esc(c.name) + '</h2></div>' +
          '<div><p>' + esc(c.description) + '</p><p>' + esc(c.vision) + '</p></div>' +
        '</div>' +
        (apps ? '<h3 class="sub">Featured solutions</h3><div class="apps">' + apps + '</div>' : '') +
      '</div>';
  };

  S.expertise = function (d) {
    var items = shown(d.expertise);
    if (!items.length) return '';
    return '' +
      '<div class="wrap">' +
        '<p class="eyebrow">Areas of expertise</p><h2>Topics Connie Can Speak About</h2>' +
        '<div class="cards">' + items.map(function (t, i) {
          return '<div class="card"><span class="num">' + (i < 9 ? '0' : '') + (i + 1) + '</span><h3>' + esc(t.title) + '</h3><p>' + esc(t.text) + '</p></div>';
        }).join('') + '</div>' +
      '</div>';
  };

  S.topics = function (d) {
    var items = shown(d.interview_topics);
    if (!items.length) return '';
    return '' +
      '<div class="wrap two">' +
        '<div><p class="eyebrow">For hosts and producers</p><h2>Interview and Podcast Discussion Ideas</h2>' +
          '<p class="muted">Suggested angles. Happy to shape a conversation around your audience.</p>' +
          '<a class="btn btn-primary" href="#request">' + icon('mic') + 'Request an Interview</a></div>' +
        '<ol class="topics">' + items.map(function (t) { return '<li>' + esc(t.title) + '</li>'; }).join('') + '</ol>' +
      '</div>';
  };

  S.appearances = function (d) {
    var items = shown(d.appearances).filter(function (a) { return a.outlet && a.title && safeUrl(a.url); });
    if (!items.length) return '';   /* nothing real yet: the whole section stays hidden */
    items.sort(function (a, b) { return String(b.date || '').localeCompare(String(a.date || '')); });
    return '' +
      '<div class="wrap">' +
        '<p class="eyebrow">Coverage</p><h2>Across the Table in the Media</h2>' +
        '<div class="press">' + items.map(function (a) {
          return '<a class="pcard" href="' + esc(safeUrl(a.url)) + '" target="_blank" rel="noopener" data-count="appearance_click">' +
            (a.image ? '<img src="' + esc(a.image) + '" alt="" loading="lazy">' : '') +
            '<span class="ptype">' + esc(a.type || 'Feature') + (a.date ? ' · ' + fmtDate(a.date) : '') + '</span>' +
            '<b>' + esc(a.title) + '</b><span class="pout">' + esc(a.outlet) + '</span>' +
            (a.description ? '<span class="pdesc">' + esc(a.description) + '</span>' : '') +
            '<span class="pmore">Read or listen ' + icon('out', 'ic sm') + '</span></a>';
        }).join('') + '</div>' +
      '</div>';
  };

  S.resources = function (d) {
    var items = shown(d.resources);
    if (!items.length) return '';
    return '' +
      '<div class="wrap">' +
        '<p class="eyebrow">Press kit</p><h2>Media Resources</h2>' +
        '<div class="res">' + items.map(function (r) {
          return '<a class="rcard" href="' + esc(r.file) + '" download data-count="dl_' + esc(r.key) + '">' +
            '<span><b>' + esc(r.name) + '</b><span class="muted">' + esc(r.detail) + '</span></span>' + icon('down') + '</a>';
        }).join('') + '</div>' +
        '<p class="usage">' + esc(d.usage_statement) + '</p>' +
      '</div>';
  };

  S.newsletter = function (d) {
    var n = d.newsletter;
    if (!n || n.show === false || !safeUrl(n.url)) return '';
    return '' +
      '<div class="wrap"><div class="news">' +
        '<div><p class="eyebrow">Newsletter</p><h2>Insights From ' + esc(n.name) + '</h2><p>' + esc(n.description) + '</p></div>' +
        '<div class="news-act">' +
          '<a class="btn btn-gold" href="' + esc(safeUrl(n.url)) + '" target="_blank" rel="noopener" data-count="substack_click">Read ' + esc(n.name) + icon('out') + '</a>' +
          (n.featured_title && safeUrl(n.featured_url)
            ? '<a class="featured" href="' + esc(safeUrl(n.featured_url)) + '" target="_blank" rel="noopener" data-count="substack_click"><span class="muted">Featured article</span>' + esc(n.featured_title) + '</a>'
            : '') +
        '</div>' +
      '</div></div>';
  };

  S.contact = function (d) {
    var f = d.founder, c = d.contact;
    return '' +
      '<div class="wrap two">' +
        '<div><p class="eyebrow">Media contact</p><h2>' + esc(fullName(f)) + '</h2>' +
          '<p class="contact-lines">' + esc(f.title) + ', ' + esc(d.company.name) + '<br>' + esc(f.location) + '</p></div>' +
        '<div class="contact-box">' +
          '<a class="cline" href="mailto:' + esc(c.email) + '">' + icon('mail') + '<span><span class="muted">Email</span>' + esc(c.email) + '</span></a>' +
          '<a class="cline" href="' + esc(d.company.website) + '">' + icon('arrow') + '<span><span class="muted">Website</span>' + esc(d.company.website.replace(/^https?:\/\//, '')) + '</span></a>' +
          '<div class="socials">' + (c.links || []).filter(function (l) { return safeUrl(l.url); }).map(function (l) {
            return '<a href="' + esc(safeUrl(l.url)) + '" target="_blank" rel="noopener me">' + esc(l.label) + '</a>';
          }).join('') + '</div>' +
        '</div>' +
      '</div>';
  };

  /* Schema.org: WebPage + Person + Organization, and NewsArticle only for real, published coverage. */
  function jsonLd(d) {
    var f = d.founder, c = d.company, url = SITE + '/media/';
    var graph = [
      { '@type': 'WebPage', '@id': url, url: url, name: 'Media & Press — ' + c.name,
        description: 'Media and press information about ' + fullName(f) + ', founder of ' + c.name + '.',
        about: { '@id': url + '#connie' }, isPartOf: { '@id': SITE + '/#org' },
        primaryImageOfPage: f.photo ? SITE + '/media/' + f.photo : undefined },
      { '@type': 'Person', '@id': url + '#connie', name: f.name, honorificSuffix: f.credentials || undefined,
        jobTitle: f.title, worksFor: { '@id': SITE + '/#org' }, founder: undefined,
        image: f.photo ? SITE + '/media/' + f.photo : undefined, description: f.bio_short,
        address: { '@type': 'PostalAddress', addressLocality: 'Phoenix', addressRegion: 'AZ', addressCountry: 'US' },
        alumniOf: [{ '@type': 'CollegeOrUniversity', name: 'Arizona State University' }, { '@type': 'CollegeOrUniversity', name: 'University of Phoenix' }],
        knowsAbout: shown(d.expertise).map(function (t) { return t.title; }),
        sameAs: (d.contact.links || []).map(function (l) { return safeUrl(l.url); }).filter(Boolean) },
      { '@type': 'Organization', '@id': SITE + '/#org', name: c.name, legalName: 'Bold and Beautiful Beauties',
        url: SITE, logo: SITE + '/media/across-the-table-logo.png', description: c.description,
        founder: { '@id': url + '#connie' },
        address: { '@type': 'PostalAddress', streetAddress: '101 N First Ave, Suite 2325-1495', addressLocality: 'Phoenix', addressRegion: 'AZ', postalCode: '85003', addressCountry: 'US' },
        contactPoint: { '@type': 'ContactPoint', contactType: 'media relations', email: d.contact.email } }
    ];
    shown(d.appearances).filter(function (a) { return a.outlet && a.title && safeUrl(a.url); }).forEach(function (a) {
      graph.push({ '@type': 'NewsArticle', headline: a.title, url: safeUrl(a.url), datePublished: a.date || undefined,
        publisher: { '@type': 'Organization', name: a.outlet }, about: { '@id': url + '#connie' } });
    });
    return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  }

  var ORDER = ['hero', 'bio', 'company', 'expertise', 'topics', 'appearances', 'resources', 'newsletter', 'contact'];
  function render(d, prices) {
    var out = {};
    ORDER.forEach(function (k) { out[k] = S[k](d, prices); });
    out.jsonld = jsonLd(d);
    return out;
  }

  var api = { render: render, ORDER: ORDER, esc: esc };
  if (typeof module !== 'undefined' && module.exports) { module.exports = api; return; }
  root.MediaPage = api;

  /* ================= browser only ================= */
  var HUB_URL = 'https://myisncufxcpeqyuohroq.supabase.co';
  var HUB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15aXNuY3VmeGNwZXF5dW9ocm9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwNzA4NTksImV4cCI6MjEwNjY0Njg1OX0.XrQ4SX3K4Cyxc80s9PECENqJ5R-x7jTxP-2HYPD4bjY';
  var data = null;

  function rpc(fn, body) {
    return fetch(HUB_URL + '/rest/v1/rpc/' + fn, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: HUB_KEY, Authorization: 'Bearer ' + HUB_KEY },
      body: JSON.stringify(body || {})
    });
  }
  /* aggregate counts only: no names, emails or addresses are sent */
  function count(ev) {
    try { rpc('media_count', { p_event: ev }).catch(function () {}); } catch (e) {}
    try { if (window.gtag) window.gtag('event', ev, { page: 'media' }); } catch (e) {}
  }

  function paint(d, prices) {
    var out = render(d, prices);
    ORDER.forEach(function (k) {
      var el = document.getElementById('s-' + k); if (!el) return;
      if (el.innerHTML !== out[k]) el.innerHTML = out[k];
      el.hidden = !out[k];
    });
    var ld = document.getElementById('jsonld'); if (ld) ld.textContent = out.jsonld;
  }

  function refresh() {
    Promise.all([
      fetch('media.json', { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : null; }),
      fetch('../prices.json', { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; })
    ]).then(function (res) {
      if (!res[0]) return;
      data = res[0];
      paint(data, res[1] && res[1].prices);
    }).catch(function () { /* the baked page stays as it is */ });
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-toggle-bio],[data-copy-bio],[data-count]');
    if (!t) return;
    if (t.hasAttribute('data-count')) count(t.getAttribute('data-count'));
    if (t.hasAttribute('data-toggle-bio')) {
      var full = document.getElementById('bio-full'), open = full.hidden;
      full.hidden = !open; t.setAttribute('aria-expanded', String(open));
      t.textContent = open ? 'Show less' : 'Read the full biography';
      var sh = document.querySelector('.bio-short'); if (sh) sh.hidden = open;
    }
    if (t.hasAttribute('data-copy-bio')) {
      var which = t.getAttribute('data-copy-bio');
      var txt = which === 'full'
        ? Array.prototype.map.call(document.querySelectorAll('#bio-full p'), function (p) { return p.textContent; }).join('\n\n')
        : (document.querySelector('.bio-short') || {}).textContent || '';
      var note = document.querySelector('.copied');
      var done = function () { if (note) { note.textContent = (which === 'full' ? 'Full' : 'Short') + ' bio copied.'; setTimeout(function () { note.textContent = ''; }, 2500); } };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, function () { fallbackCopy(txt); done(); });
      else { fallbackCopy(txt); done(); }
      count('dl_bio');
    }
  });
  function fallbackCopy(txt) {
    var ta = document.createElement('textarea'); ta.value = txt; ta.setAttribute('readonly', '');
    ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) {} document.body.removeChild(ta);
  }

  /* ---------- the inquiry form ---------- */
  function initForm() {
    var form = document.getElementById('inq'); if (!form) return;
    var opened = Date.now(), busy = false;
    var msg = document.getElementById('inq-msg');
    var btn = form.querySelector('button[type=submit]');
    var REQ = ['name', 'email', 'organization', 'inquiry_type', 'topic', 'message'];
    var NAMES = { name: 'your full name', email: 'a valid email address', organization: 'your organization, publication or podcast',
      inquiry_type: 'an inquiry type', topic: 'the topic or reason for contact', message: 'a message' };

    function setErr(field, text) {
      var el = form.elements[field], err = document.getElementById('err-' + field);
      if (!el) return;
      el.setAttribute('aria-invalid', text ? 'true' : 'false');
      if (err) err.textContent = text || '';
    }
    function say(html, cls) { msg.className = 'form-msg' + (cls ? ' ' + cls : ''); msg.innerHTML = html; }
    function val(n) { var el = form.elements[n]; return el ? String(el.value || '').trim() : ''; }

    function validate() {
      var first = null;
      REQ.forEach(function (n) {
        var v = val(n), bad = !v;
        if (n === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) bad = true;
        if (n === 'message' && v && v.length < 10) bad = true;
        setErr(n, bad ? 'Please enter ' + NAMES[n] + '.' : '');
        if (bad && !first) first = n;
      });
      var site = val('website');
      setErr('website', site && !/^https?:\/\/\S+\.\S+/i.test(site) ? 'Please enter a full link starting with https://' : '');
      if (!first && form.elements.website.getAttribute('aria-invalid') === 'true') first = 'website';
      return first;
    }
    /* Clear a field's error as soon as it is fixed, while typing. (Re-checking on blur
       would move the button mid-click when an error line disappears.) */
    REQ.concat(['website']).forEach(function (n) {
      var el = form.elements[n]; if (!el) return;
      var ev = el.tagName === 'SELECT' ? 'change' : 'input';
      el.addEventListener(ev, function () {
        if (el.getAttribute('aria-invalid') !== 'true') return;
        var v = val(n), ok = n === 'website' ? (!v || /^https?:\/\/\S+\.\S+/i.test(v))
          : n === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
          : n === 'message' ? v.length >= 10 : !!v;
        if (ok) setErr(n, '');
      });
    });

    function mailtoBody() {
      var lines = [
        'Name: ' + val('name'), 'Email: ' + val('email'), 'Organization: ' + val('organization'),
        'Inquiry type: ' + val('inquiry_type'), 'Topic: ' + val('topic'),
        val('phone') && 'Phone: ' + val('phone'), val('website') && 'Website: ' + val('website'),
        val('preferred_date') && 'Preferred date: ' + val('preferred_date'),
        val('preferred_format') && 'Format: ' + val('preferred_format'),
        val('deadline') && 'Deadline for response: ' + val('deadline'), '', val('message')
      ].filter(function (x) { return x !== '' && x !== false; });
      return 'mailto:' + (data && data.contact ? data.contact.email : 'contact@acrossthetable.biz') +
        '?subject=' + encodeURIComponent('Media inquiry: ' + val('inquiry_type') + ' — ' + val('organization')) +
        '&body=' + encodeURIComponent(lines.join('\n'));
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (busy) return;
      var bad = validate();
      if (bad) { say('Please fix the highlighted fields.', 'err'); form.elements[bad].focus(); return; }
      busy = true; btn.disabled = true; btn.textContent = 'Sending…'; say('');
      rpc('submit_media_inquiry', {
        p_name: val('name'), p_email: val('email'), p_organization: val('organization'),
        p_inquiry_type: val('inquiry_type'), p_topic: val('topic'), p_message: val('message'),
        p_phone: val('phone') || null, p_website: val('website') || null,
        p_preferred_date: val('preferred_date') || null, p_preferred_format: val('preferred_format') || null,
        p_deadline: val('deadline') || null, p_trap: val('company_url'), p_elapsed_ms: Date.now() - opened
      }).then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, status: r.status, j: j }; });
      }).then(function (res) {
        if (res.ok && res.j && res.j.ok) {
          count('form_submit'); count('inq_' + val('inquiry_type').toLowerCase().replace(/[^a-z]+/g, '_').replace(/^_|_$/g, ''));
          form.hidden = true;
          var done = document.getElementById('inq-done');
          done.hidden = false;
          var ref = document.getElementById('inq-ref'); if (ref) ref.textContent = res.j.ref ? 'Reference: ' + res.j.ref : '';
          done.focus();
          return;
        }
        var why = (res.j && (res.j.message || res.j.error)) || '';
        var known = /^(Please|We have received)/.test(why);
        say((known ? MediaPage.esc(why) + ' ' : 'Your request was <b>not</b> sent — something went wrong on our side. ') +
          'You can also <a href="' + MediaPage.esc(mailtoBody()) + '">send it by email instead</a>; your answers will be filled in for you.', 'err');
        busy = false; btn.disabled = false; btn.textContent = 'Send request';
      }).catch(function () {
        say('Your request was <b>not</b> sent — we couldn’t reach our server. Check your connection and try again, or <a href="' + MediaPage.esc(mailtoBody()) + '">send it by email instead</a>.', 'err');
        busy = false; btn.disabled = false; btn.textContent = 'Send request';
      });
    });
  }

  function start() {
    initForm();
    refresh();
    count('view');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})(typeof window !== 'undefined' ? window : globalThis);
