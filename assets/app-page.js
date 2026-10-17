/* Across the Table — standalone app pages (acrossthetable.biz/<app>/).
   The plan box, store button, flyer, photos and video work the same way as on
   the app pages inside the main site. Prices come from /prices.json, so a price
   saved in Products & pricing shows here straight away. */
(function () {
  'use strict';
  var CFG = window.ATT_APP || {};
  var SLUG = CFG.slug;
  var STORE = CFG.store || {};
  var PRICES = CFG.prices || {};
  var SELLING = ['Available', 'Available for purchase', 'Beta'];

  function sells(status) { return SELLING.indexOf(status) >= 0; }
  function usd(n) { var v = Number(n); if (!isFinite(v)) v = 0; return '$' + v.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function ok(u) { return typeof u === 'string' && /^https:\/\//.test(u) ? u : ''; }
  function buttonWord(status) {
    if (status === 'Coming soon') return 'Coming Soon';
    if (status === 'In development') return 'In Development';
    if (status === 'Concept') return 'Concept';
    return status || 'Not available';
  }

  /* ---------- plans (same rules as the main site) ---------- */
  function planOf(d, key) { for (var i = 0; i < (d.plans || []).length; i++) if (d.plans[i].key === key) return d.plans[i]; return null; }
  function refreshTrial(d) {
    var t = planOf(d, 'trial'); if (!t) return;
    var m = planOf(d, 'monthly'), amt = m ? m.amount : 0;
    t.sub = d.trial + ' days free, then ' + usd(amt) + '/month'; t.per = 'then ' + usd(amt) + '/mo'; t.amount = 0;
  }
  function refreshAnnual(d) {
    var a = planOf(d, 'annual'); if (!a) return;
    var m = planOf(d, 'monthly'), sub = String(a.sub || '');
    if (sub && !/save\s*\d+\s*%/i.test(sub) && sub !== 'Billed once a year') return;
    var full = m ? m.amount * 12 : 0;
    var pct = (full > 0 && a.amount > 0) ? Math.floor((1 - a.amount / full) * 100) : 0;
    a.sub = pct >= 1 ? ('Billed yearly — save ' + pct + '%') : 'Billed once a year';
  }
  function isRecurring(key) { return key === 'monthly' || key === 'annual'; }
  function shownPlans(d) { return (d.plans || []).filter(function (p) { return p.key !== 'trial'; }); }
  function trialDays(d) { return (d.trial > 0 && shownPlans(d).some(function (p) { return isRecurring(p.key); })) ? d.trial : 0; }
  function planLinkFor(d, key) {
    var L = (d && d.links) || {};
    return ok(L[key]) || ok(STORE.storeLinks) || ok(L.monthly) || ok(L.annual) || ok(L.onetime) || ok(STORE.storeFront) || '';
  }
  function planSub(d, p) {
    var t = trialDays(d);
    if (!t || !isRecurring(p.key)) return p.sub || '';
    if (p.key === 'monthly') return 'First ' + t + ' days free, then billed monthly';
    var save = String(p.sub || '').match(/save\s*\d+\s*%/i);
    return 'First ' + t + ' days free, then billed yearly' + (save ? ' — ' + save[0] : '');
  }

  function legalLine(card, d, key, withTrial) {
    var line = card.querySelector('[data-sub-legal]');
    if (!CFG.legal || !sells(d.status)) { if (line) line.hidden = true; return; }
    if (!line) {
      line = el('p', 'sub-legal'); line.setAttribute('data-sub-legal', '');
      var after = card.querySelector('[data-sub-foot]') || card.querySelector('[data-sub-btn]');
      if (after && after.parentNode) after.parentNode.insertBefore(line, after.nextSibling); else card.appendChild(line);
    }
    line.hidden = false;
    while (line.firstChild) line.removeChild(line.firstChild);
    function a(href, t) { var x = el('a', null, t); x.href = href; x.target = '_blank'; x.rel = 'noopener'; return x; }
    var name = d.name || SLUG;
    line.appendChild(document.createTextNode(withTrial ? 'By starting your free trial, you agree to the ' + name + ' ' : 'By continuing, you agree to the ' + name + ' '));
    line.appendChild(a('/legal/' + SLUG + '/terms.html', 'Terms of Service'));
    line.appendChild(document.createTextNode(' and '));
    line.appendChild(a('/legal/' + SLUG + '/privacy.html', 'Privacy Policy'));
    line.appendChild(document.createTextNode(withTrial
      ? ', and to automatic ' + (key === 'annual' ? 'yearly' : 'monthly') + ' charges after the trial unless you cancel before it ends.' : '.'));
  }

  function fillBuyBox(card, d, key) {
    var plans = shownPlans(d), plan = null;
    plans.forEach(function (x) { if (x.key === key) plan = x; });
    if (!plan) plan = plans[0];
    if (!plan) return;
    key = plan.key;
    var t = trialDays(d), withTrial = t > 0 && isRecurring(key), per = key === 'annual' ? 'year' : 'month';
    Array.prototype.forEach.call(card.querySelectorAll('[data-plans] [data-plan]'), function (x) {
      x.setAttribute('aria-checked', String(x.getAttribute('data-plan') === key));
    });
    var tot = card.querySelector('[data-sub-total]'); if (tot) tot.textContent = usd(withTrial ? 0 : plan.amount);
    var renew = card.querySelector('[data-sub-renew]');
    if (renew) renew.textContent = plan.note ||
      (key === 'onetime' ? 'One-time payment of ' + usd(plan.amount) + '. No recurring charge.'
        : withTrial ? ('Nothing is charged today. Your ' + t + '-day free trial starts now, then ' + usd(plan.amount) + ' per ' + per + ' until you cancel. Cancel before day ' + t + ' and you pay nothing.')
          : ('Renews automatically at ' + usd(plan.amount) + ' per ' + per + ' until you cancel.'));
    var btn = card.querySelector('[data-sub-btn]');
    if (btn) {
      btn.setAttribute('data-plan-key', key);
      if (sells(d.status)) {
        btn.textContent = plan.cta || (withTrial ? 'Start my ' + t + '-day free trial' : key === 'onetime' ? 'Buy now on Stan Store' : 'Get it on Stan Store');
        btn.removeAttribute('aria-disabled'); btn.classList.remove('is-soon'); btn.disabled = false;
      } else {
        btn.textContent = buttonWord(d.status); btn.setAttribute('aria-disabled', 'true'); btn.classList.add('is-soon'); btn.disabled = true;
      }
    }
    try { legalLine(card, d, key, withTrial); } catch (e) {}
    var foot = card.querySelector('[data-sub-foot]');
    if (foot) foot.textContent = !sells(d.status)
      ? 'Not open for purchase yet. Tell me you want it and I’ll let you know the day it opens.'
      : (plan.foot || (key === 'onetime' ? 'Bought through my Stan Store. One-time purchase — nothing to cancel.'
        : 'Bought through my Stan Store. Cancel anytime — access continues to the end of the paid period.'));
  }

  function renderSubcard(d) {
    var card = document.querySelector('[data-subcard="' + SLUG + '"]');
    if (!card || !d || !d.plans) return;
    refreshTrial(d); refreshAnnual(d);
    var group = card.querySelector('[data-plans]'); if (!group) return;
    while (group.firstChild) group.removeChild(group.firstChild);
    var plans = shownPlans(d);
    plans.forEach(function (p) {
      var b = el('button', 'plan compact'); b.type = 'button'; b.setAttribute('role', 'radio');
      b.setAttribute('data-plan', p.key); b.setAttribute('aria-checked', 'false');
      var dot = el('span', 'radio'); dot.setAttribute('aria-hidden', 'true');
      var pn = el('span', 'pn'); pn.appendChild(el('b', null, p.label || '')); pn.appendChild(el('span', null, planSub(d, p)));
      var pr = el('span', 'pr'), was = Number(p.was);
      if (was > Number(p.amount)) {
        var line = el('b', 'pr-now');
        line.appendChild(el('s', 'pr-was', usd(was))); line.appendChild(document.createTextNode(' ')); line.appendChild(el('span', 'pr-amt', usd(p.amount)));
        line.setAttribute('aria-label', usd(p.amount) + ', was ' + usd(was));
        pr.appendChild(line); b.classList.add('on-sale');
      } else pr.appendChild(el('b', null, usd(p.amount)));
      pr.appendChild(el('span', null, p.per || ''));
      b.appendChild(dot); b.appendChild(pn); b.appendChild(pr);
      group.appendChild(b);
    });
    var kindEl = card.querySelector('.datum'); if (kindEl && d.kind) kindEl.textContent = d.kind;
    var t = trialDays(d), pill = card.querySelector('.trial-pill');
    if (t && !pill) { pill = el('div', 'trial-pill'); var h3 = card.querySelector('h3'); if (h3 && h3.parentNode) h3.parentNode.insertBefore(pill, h3.nextSibling); }
    if (pill && !t && !/trial/i.test(pill.textContent)) pill = null;
    if (pill) {
      var both = plans.some(function (p) { return p.key === 'monthly'; }) && plans.some(function (p) { return p.key === 'annual'; });
      pill.textContent = t ? (t + '-day free trial included' + (both ? ' with monthly & annual' : '')) : '';
      pill.hidden = !t;
    }
    var start = plans.some(function (p) { return p.key === 'monthly'; }) ? 'monthly' : (plans[0] && plans[0].key);
    fillBuyBox(card, d, start);
  }

  /* ---------- the store button under the headline ---------- */
  var ICON_PLAY = '<path d="M4 3.2v17.6a1 1 0 0 0 1.5.87l14-8.8a1 1 0 0 0 0-1.74l-14-8.8A1 1 0 0 0 4 3.2Z"></path><path d="M4.6 3.4 15 12 4.6 20.6"></path>';
  var ICON_APPLE = '<path d="M16.5 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.9-3-.8a4.5 4.5 0 0 0-3.8 2.3c-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-1.1 2.8-2.3c.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.5-1-2.5-3.8Z"></path><path d="M14.3 5.6c.6-.8 1.1-1.8 1-2.9-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.7-1 2.8 1 .1 2.1-.5 2.7-1.3Z"></path>';
  var ICON_BAG = '<path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8Z"></path><path d="M9 8V6.5a3 3 0 0 1 6 0V8"></path>';
  var VISITOR = (function () {
    var ua = navigator.userAgent || '';
    if (/iPhone|iPad|iPod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return 'apple';
    if (/Android/i.test(ua)) return 'play';
    return '';
  })();
  function storeChoice(d) {
    var pick = String(STORE.appButton || '').trim().toLowerCase();
    if (/^(app store|appstore|ios|iphone)$/.test(pick)) pick = 'apple';
    var play = (STORE.appLinks || '').trim(), apple = (STORE.appleLinks || '').trim();
    if (pick === 'stan' || pick === 'play' || pick === 'apple') return pick;
    if (VISITOR === 'apple' && apple) return 'apple';
    if (VISITOR === 'play' && play) return 'play';
    if (play) return 'play';
    if (apple) return 'apple';
    return (!d || sells(d.status)) ? 'stan' : 'play';
  }
  function applyStoreButton(d) {
    var mode = storeChoice(d);
    var canSell = !d || sells(d.status);
    var url = mode === 'play' ? ok((STORE.appLinks || '').trim()) : mode === 'apple' ? ok((STORE.appleLinks || '').trim())
      : (canSell && document.querySelector('[data-subcard="' + SLUG + '"]') ? '#plans' : '');
    var word = mode === 'play' ? (url ? 'Get it on Google Play' : 'Coming soon to Google Play')
      : mode === 'apple' ? (url ? 'Download on the App Store' : 'Coming soon to the App Store')
        : (url ? 'Buy from my Stan Store' : 'Coming soon to my Stan Store');
    Array.prototype.forEach.call(document.querySelectorAll('[data-play="' + SLUG + '"]'), function (b) {
      var label = b.querySelector('[data-play-label]'), icon = b.querySelector('svg');
      if (icon) icon.innerHTML = mode === 'play' ? ICON_PLAY : mode === 'apple' ? ICON_APPLE : ICON_BAG;
      var datum = b.querySelector('.datum'); if (datum) datum.textContent = mode === 'play' ? 'Android app' : mode === 'apple' ? 'iPhone app' : 'Stan Store';
      if (url === '#plans') { b.setAttribute('href', '#'); b.removeAttribute('target'); b.removeAttribute('aria-disabled'); b.setAttribute('data-to-plans', ''); }
      else if (url) { b.removeAttribute('data-to-plans'); b.setAttribute('href', url); b.setAttribute('target', '_blank'); b.setAttribute('rel', 'noopener'); b.removeAttribute('aria-disabled'); }
      else { b.removeAttribute('data-to-plans'); b.setAttribute('href', '#' + SLUG + '-who'); b.removeAttribute('target'); b.setAttribute('aria-disabled', 'true'); }
      if (label) label.textContent = word;
    });
  }

  /* ---------- flyer, photos, video ---------- */
  function flyerOf(d) { if (!d) return ''; if (d.flyer) return d.flyer; if (!d.photos && d.flyers && d.flyers.length) return d.flyers[0]; return ''; }
  function photosOf(d) {
    if (!d) return [];
    if (d.photos && d.photos.length !== undefined) return d.photos.filter(Boolean);
    if (d.flyers && d.flyers.length) return d.flyers.slice(d.flyer ? 0 : 1);
    return [];
  }
  function abs(p) { return /^(https?:|data:|\/)/.test(p) ? p : '/' + p; }
  function renderFlyer(d) {
    var fig = document.querySelector('[data-flyer="' + SLUG + '"]'); if (!fig) return;
    var p = flyerOf(d);
    while (fig.firstChild) fig.removeChild(fig.firstChild);
    fig.hidden = true;
    if (!p) return;
    var a = el('a'); a.href = abs(p); a.target = '_blank'; a.rel = 'noopener';
    a.setAttribute('aria-label', 'Open the ' + (d.name || SLUG) + ' flyer full size');
    var img = el('img'); img.alt = (d.name || SLUG) + ' flyer'; img.decoding = 'async';
    img.onload = function () { fig.hidden = false; }; img.onerror = function () { fig.hidden = true; };
    img.src = abs(p); a.appendChild(img); fig.appendChild(a);
  }
  function ytInfo(u) {
    u = String(u || '').trim(); if (!u) return null;
    var m = u.match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    var l = /youtu(?:be(?:-nocookie)?\.com|\.be)\//i.test(u) ? u.match(/[?&]list=([A-Za-z0-9_-]{10,})/) : null;
    if (!m && !l) return null;
    return { id: m ? m[1] : '', list: l ? l[1] : '', tall: !!m && /\/shorts\//.test(u) };
  }
  function ytEmbed(v) {
    var q = 'rel=0&modestbranding=1';
    if (v.list && !v.id) return 'https://www.youtube-nocookie.com/embed/videoseries?list=' + v.list + '&' + q;
    return 'https://www.youtube-nocookie.com/embed/' + v.id + '?' + (v.list ? 'list=' + v.list + '&' : '') + q;
  }
  function renderGallery(d) {
    var sec = document.querySelector('[data-gallery="' + SLUG + '"]'); if (!sec) return;
    var host = sec.querySelector('[data-gal]'); if (!host) return;
    var row = host.parentNode;
    if (!row.classList.contains('gal-row')) { row = el('div', 'gal-row'); host.parentNode.insertBefore(row, host); row.appendChild(host); }
    var fig = row.querySelector('[data-video]');
    if (!fig) { fig = el('figure', 'lp-video'); fig.setAttribute('data-video', ''); fig.hidden = true; row.appendChild(fig); }
    var name = d.name || SLUG, hasPhotos = false, v = ytInfo(d.video), sync = function () {};
    function show() {
      host.hidden = !hasPhotos; fig.hidden = !v;
      row.classList.toggle('solo', !(hasPhotos && v));
      sec.hidden = !(hasPhotos || v);
      requestAnimationFrame(sync);
    }
    while (fig.firstChild) fig.removeChild(fig.firstChild);
    if (v) {
      fig.classList.toggle('tall', !!v.tall);
      var fr = el('div', 'lp-video-frame'), ifr = el('iframe');
      ifr.src = ytEmbed(v); ifr.title = name + (v.list ? ' video playlist' : ' video'); ifr.loading = 'lazy';
      ifr.referrerPolicy = 'strict-origin-when-cross-origin';
      ifr.allow = 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      ifr.setAttribute('allowfullscreen', '');
      fr.appendChild(ifr); fig.appendChild(fr);
      fig.appendChild(el('figcaption', null, v.list ? 'Watch the ' + name + ' video playlist' : 'Watch ' + name + ' in action'));
    }
    while (host.firstChild) host.removeChild(host.firstChild);
    var list = photosOf(d);
    if (list.length) {
      function arrow(dir) {
        var b = el('button', 'gal-nav ' + (dir < 0 ? 'gal-prev' : 'gal-next')); b.type = 'button';
        b.setAttribute('aria-label', dir < 0 ? 'Previous photo' : 'Next photo');
        b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + (dir < 0 ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6') + '"></path></svg>';
        return b;
      }
      var track = el('div', 'gal-track'), bPrev = arrow(-1), bNext = arrow(1), dots = el('div', 'gal-dots');
      track.setAttribute('aria-label', name + ' photos'); track.tabIndex = 0;
      host.appendChild(track); host.appendChild(bPrev); host.appendChild(bNext); host.appendChild(dots);
      var slides = function () { return Array.prototype.slice.call(track.children); };
      var step = function () { var s = slides(); return s.length > 1 ? (s[1].offsetLeft - s[0].offsetLeft) : (track.clientWidth || 1); };
      var maxIdx = function () { return Math.max(0, slides().length - 1); };
      var current = function () { var st = step(); return st > 1 ? Math.max(0, Math.min(maxIdx(), Math.round(track.scrollLeft / st))) : 0; };
      var go = function (i) { track.scrollTo({ left: Math.max(0, Math.min(maxIdx(), i)) * step(), behavior: 'smooth' }); };
      sync = function () {
        var last = maxIdx(), fits = last < 1, i = current();
        host.classList.toggle('fits', fits); bPrev.disabled = i <= 0; bNext.disabled = i >= last;
        while (dots.firstChild) dots.removeChild(dots.firstChild);
        if (fits) return;
        for (var k = 0; k <= last; k++) (function (k) {
          var dt = el('button', 'gal-dot'); dt.type = 'button';
          dt.setAttribute('aria-label', 'Go to photo ' + (k + 1) + ' of ' + (last + 1));
          dt.setAttribute('aria-current', String(k === i));
          dt.addEventListener('click', function () { go(k); });
          dots.appendChild(dt);
        })(k);
      };
      bPrev.addEventListener('click', function () { go(current() - 1); });
      bNext.addEventListener('click', function () { go(current() + 1); });
      track.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(current() - 1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); go(current() + 1); }
      });
      var tm = null;
      track.addEventListener('scroll', function () { clearTimeout(tm); tm = setTimeout(sync, 60); }, { passive: true });
      window.addEventListener('resize', function () { clearTimeout(tm); tm = setTimeout(sync, 120); });
      list.forEach(function (p, k) {
        var a = el('a', 'gal-slide'); a.href = abs(p); a.target = '_blank'; a.rel = 'noopener';
        a.setAttribute('aria-label', 'Open ' + name + ' photo ' + (k + 1) + ' full size');
        var img = el('img'); img.alt = name + ' photo ' + (k + 1); img.decoding = 'async'; img.loading = 'lazy';
        img.onload = function () { if (!hasPhotos) { hasPhotos = true; show(); } sync(); };
        img.onerror = function () { if (a.parentNode) a.parentNode.removeChild(a); if (!slides().length) { hasPhotos = false; show(); } sync(); };
        img.src = abs(p); a.appendChild(img); track.appendChild(a);
      });
    }
    show();
  }

  /* ---------- clicks ---------- */
  document.addEventListener('click', function (e) {
    var pb = e.target.closest('[data-plans] [data-plan]');
    if (pb) { var card = pb.closest('[data-subcard]'); if (card && PRICES[SLUG]) fillBuyBox(card, PRICES[SLUG], pb.getAttribute('data-plan')); return; }
    var buy = e.target.closest('[data-buy]');
    if (buy) {
      e.preventDefault();
      if (buy.getAttribute('aria-disabled') === 'true') return;
      var d = PRICES[SLUG]; if (d && !sells(d.status)) return;
      var key = buy.getAttribute('data-plan-key') || '';
      var url = planLinkFor(d, key);
      if (!/^https:\/\//.test(url)) return;
      var w = window.open(url, '_blank', 'noopener,noreferrer');
      if (!w) location.href = url;
      return;
    }
    var tp = e.target.closest('[data-to-plans]');
    if (tp) {
      e.preventDefault();
      var sc = document.querySelector('[data-subcard="' + SLUG + '"]');
      if (sc) { sc.scrollIntoView({ behavior: 'smooth', block: 'center' }); var first = sc.querySelector('[aria-checked="true"]') || sc.querySelector('[data-plan]'); if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, 400); }
      return;
    }
    var dis = e.target.closest('[data-play][aria-disabled="true"]');
    if (dis) { e.preventDefault(); var who = document.getElementById(SLUG + '-who'); if (who) who.scrollIntoView({ behavior: 'smooth' }); return; }
    var home = e.target.closest('[data-home-link]');
    if (home) { e.preventDefault(); location.href = '/#system'; return; }
    var go = e.target.closest('[data-goto]');
    if (go) { var t = document.querySelector(go.getAttribute('data-goto')); if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); } }
  });

  /* mobile menu */
  var toggle = document.getElementById('navtoggle'), nav = document.getElementById('nav');
  if (toggle && nav) toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open'); toggle.setAttribute('aria-expanded', String(open));
  });

  function apply(d) {
    if (!d) return;
    try { renderSubcard(d); } catch (e) {}
    try { applyStoreButton(d); } catch (e) {}
    try { renderFlyer(d); } catch (e) {}
    try { renderGallery(d); } catch (e) {}
  }
  function start() {
    apply(PRICES[SLUG]);            /* the prices the page was built with */
    fetch('/prices.json?v=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (!data) return;
        var all = data.prices || data;
        if (data.storeLinks && typeof data.storeLinks === 'object' && data.storeLinks[SLUG] != null) STORE.storeLinks = data.storeLinks[SLUG];
        if (data.appButton && data.appButton[SLUG] != null) STORE.appButton = data.appButton[SLUG];
        if (data.appleLinks && data.appleLinks[SLUG] != null) STORE.appleLinks = data.appleLinks[SLUG];
        if (all && all[SLUG]) { PRICES[SLUG] = all[SLUG]; apply(all[SLUG]); }
      })
      .catch(function () {});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
