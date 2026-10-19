/* ============================================================
   The Scaling Edge — newsletter signup, used across the site
   ------------------------------------------------------------
   Substack is the only place subscribers live. This file never
   sees, stores or sends anyone's email address: the email box is
   Substack's own official form, shown in a frame. All it counts is
   anonymous totals ("the footer button was clicked 3 times today").

   TO CHANGE THE WORDING OR THE DAY: edit the settings just below,
   then upload this file. Every page picks it up.
   ============================================================ */
(function () {
  'use strict';

  var NEWSLETTER = {
    name:        'The Scaling Edge',
    substack:    'https://acrossthetablebiz.substack.com',   // the publication's real address
    day:         'Monday',                                    // the day a new issue goes out
    headline:    'The Scaling Edge — Business Strategies Worth Knowing',
    description: 'Every Monday, get practical business strategies, AI insights, technology updates, and real-world lessons to help you build, grow, and scale your business.',
    button:      'Subscribe Free',
    privacyPage: '/legal/privacy.html',
    pagePath:    '/newsletter/',
    cta: {
      home: 'Business insights delivered every Monday. Join The Scaling Edge.',
      blog: 'Enjoyed this article? Get more practical business insights in The Scaling Edge.',
      app:  'Discover strategies and tools to help your business grow. Subscribe to The Scaling Edge.'
    }
  };
  // keep the day in every sentence in step with the setting above
  function dayed(s) { return String(s).replace(/\bMonday\b/g, NEWSLETTER.day); }
  var SUPPORT = 'One newsletter every ' + NEWSLETTER.day + '. Unsubscribe anytime.';

  /* ---------------- anonymous counts (no emails, no names, no IPs) ---------------- */
  var HUB_URL = 'https://myisncufxcpeqyuohroq.supabase.co';
  var HUB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15aXNuY3VmeGNwZXF5dW9ocm9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwNzA4NTksImV4cCI6MjEwNjY0Njg1OX0.XrQ4SX3K4Cyxc80s9PECENqJ5R-x7jTxP-2HYPD4bjY';
  var SOURCES = /^(instagram|facebook|linkedin|youtube|tiktok|x|google|bing|substack|email|direct|other|[a-z0-9_-]{2,24})$/;

  function source() {
    var s = '';
    try { s = sessionStorage.getItem('se_src') || ''; } catch (e) {}
    if (s) return s;
    try {
      var p = new URLSearchParams(location.search).get('utm_source');
      if (p) s = p.toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 24);
    } catch (e) {}
    if (!s) {
      var r = '';
      try { r = document.referrer ? new URL(document.referrer).hostname : ''; } catch (e) {}
      if (!r) s = 'direct';
      else if (/(^|\.)acrossthetable\.biz$/.test(r)) s = 'direct';
      else if (/instagram\./.test(r)) s = 'instagram';
      else if (/facebook\.|fb\.com/.test(r)) s = 'facebook';
      else if (/linkedin\.|lnkd\.in/.test(r)) s = 'linkedin';
      else if (/youtube\.|youtu\.be/.test(r)) s = 'youtube';
      else if (/tiktok\./.test(r)) s = 'tiktok';
      else if (/(^|\.)t\.co$|twitter\.|(^|\.)x\.com$/.test(r)) s = 'x';
      else if (/google\./.test(r)) s = 'google';
      else if (/bing\./.test(r)) s = 'bing';
      else if (/substack\./.test(r)) s = 'substack';
      else s = 'other';
    }
    if (!SOURCES.test(s)) s = 'other';
    try { sessionStorage.setItem('se_src', s); } catch (e) {}
    return s;
  }

  function rpc(fn, body) {
    return fetch(HUB_URL + '/rest/v1/rpc/' + fn, {
      method: 'POST', keepalive: true,
      headers: { 'Content-Type': 'application/json', apikey: HUB_KEY, Authorization: 'Bearer ' + HUB_KEY },
      body: JSON.stringify(body)
    });
  }
  /* event: page_view | form_view | form_engaged | click
     place: home | footer | app | blog | page
     These are interest signals only. A real subscription is only ever
     counted by Substack, in its own dashboard. */
  function count(event, place) {
    var src = source();
    try {
      rpc('newsletter_count', { p_event: event, p_place: place, p_source: src })
        .then(function (r) {
          // newsletter counter not set up yet: still record clicks in the existing counter
          if (!r.ok && event === 'click') rpc('media_count', { p_event: 'substack_click' }).catch(function () {});
        })
        .catch(function () {});
    } catch (e) {}
    try { if (window.gtag) window.gtag('event', 'newsletter_' + event, { newsletter_place: place, newsletter_source: src }); } catch (e) {}
  }
  var once = {};
  function countOnce(event, place) { var k = event + ':' + place; if (once[k]) return; once[k] = 1; count(event, place); }

  /* ---------------- markup ---------------- */
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function subscribeUrl(place) {
    return NEWSLETTER.substack + '/subscribe?utm_source=acrossthetable.biz&utm_medium=website&utm_campaign=scaling-edge&utm_content=' + encodeURIComponent(place);
  }
  var ARROW = '<svg class="se-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var OUT = '<svg class="se-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:15px;height:15px"><path d="M7 17 17 7M8 7h9v9"/></svg>';

  function fine() {
    return '<p class="se-fine">By subscribing you agree to receive ' + esc(NEWSLETTER.name) + ' by email. ' +
      'Your subscription is managed by Substack under its <a href="https://substack.com/privacy" target="_blank" rel="noopener">privacy policy</a>; ' +
      'see also <a href="' + esc(NEWSLETTER.privacyPage) + '">ours</a>. Unsubscribe anytime from the link in any issue.</p>';
  }
  function button(place, label) {
    return '<a class="btn se-gold" href="' + esc(subscribeUrl(place)) + '" target="_blank" rel="noopener" data-se-click="' + place + '">' +
      esc(label || NEWSLETTER.button) + ARROW + '</a>';
  }
  function card(place, title) {
    return '<div class="se-card" data-se-card="' + place + '">' +
      '<h3>' + esc(title || NEWSLETTER.headline) + '</h3>' +
      '<p>' + esc(SUPPORT) + '</p>' +
      '<div class="se-frame" data-se-frame="' + place + '"><div class="se-frame-wait">Loading the signup form…</div></div>' +
      '<a class="se-alt" href="' + esc(subscribeUrl(place)) + '" target="_blank" rel="noopener" data-se-click="' + place + '">Form not showing? ' + esc(NEWSLETTER.button) + ' on Substack' + OUT + '</a>' +
      fine() + '</div>';
  }

  var RENDER = {
    // full section for the home page
    home: function () {
      return '<div class="wrap se-home-grid">' +
        '<div>' +
          '<p class="se-eyebrow">' + esc(NEWSLETTER.name) + ' &middot; free newsletter</p>' +
          '<h2>' + esc(dayed(NEWSLETTER.cta.home)).replace(esc(NEWSLETTER.name), '<em>' + esc(NEWSLETTER.name) + '</em>') + '</h2>' +
          '<p class="se-home-lede">' + esc(dayed(NEWSLETTER.description)) + '</p>' +
          '<span class="se-day">Published every ' + esc(NEWSLETTER.day) + '</span>' +
          '<div class="se-home-row">' + button('home') +
            '<a class="btn btn-secondary" href="' + esc(NEWSLETTER.pagePath) + '#issues">See past issues</a></div>' +
        '</div>' +
        card('home') +
      '</div>';
    },
    // the signup card on its own (the /newsletter/ page)
    page: function () { return card('page', 'Get every issue in your inbox'); },
    // slim band for app pages and articles
    app: function () { return band('app'); },
    blog: function () { return band('blog'); }
  };
  function band(place) {
    return '<div class="wrap"><div class="se-band-in">' +
      '<div><h2>' + esc(dayed(NEWSLETTER.cta[place])) + '</h2><p>' + esc(SUPPORT) + ' Free, on Substack.</p></div>' +
      '<div class="se-band-act">' + button(place) +
        '<a class="btn btn-secondary" href="' + esc(NEWSLETTER.pagePath) + '">What’s inside</a></div>' +
    '</div></div>';
  }
  function footerStrip() {
    return '<div><b>' + esc(NEWSLETTER.name) + '</b><span>' + esc(dayed(NEWSLETTER.cta.home)) + ' ' + esc(SUPPORT.split('. ')[1] || '') + '</span></div>' +
      button('footer');
  }

  /* ---------------- the official Substack form, loaded only when it is about to be seen ---------------- */
  function frame(box) {
    if (box.querySelector('iframe')) return;
    var f = document.createElement('iframe');
    f.src = NEWSLETTER.substack + '/embed';
    f.title = 'Subscribe to ' + NEWSLETTER.name + ' on Substack';
    f.setAttribute('scrolling', 'no');
    f.setAttribute('frameborder', '0');
    f.setAttribute('loading', 'lazy');
    f.addEventListener('load', function () { var w = box.querySelector('.se-frame-wait'); if (w) w.remove(); });
    box.appendChild(f);
  }

  var seen = ('IntersectionObserver' in window) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var el = e.target;
      if (el.hasAttribute('data-se-frame')) {
        if (e.isIntersecting) { frame(el); }
        if (e.intersectionRatio >= 0.5) { countOnce('form_view', el.getAttribute('data-se-frame')); }
      }
    });
  }, { rootMargin: '400px 0px', threshold: [0, 0.5] }) : null;

  function wire(root) {
    Array.prototype.forEach.call(root.querySelectorAll('[data-se-frame]'), function (b) {
      if (seen) seen.observe(b); else frame(b);
    });
  }

  // Typing into Substack's form happens inside its frame, which (rightly) tells us nothing.
  // When focus moves into one of our frames we count "engaged" — never "subscribed".
  window.addEventListener('blur', function () {
    setTimeout(function () {
      var a = document.activeElement;
      if (a && a.tagName === 'IFRAME' && a.parentNode && a.parentNode.hasAttribute('data-se-frame')) {
        countOnce('form_engaged', a.parentNode.getAttribute('data-se-frame'));
      }
    }, 0);
  });
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('[data-se-click]') : null;
    if (a) count('click', a.getAttribute('data-se-click'));
  }, true);

  /* ---------------- put the pieces on the page ---------------- */
  function mount() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-newsletter]'), function (slot) {
      var kind = slot.getAttribute('data-newsletter');
      if (!RENDER[kind] || slot.getAttribute('data-se-done')) return;
      slot.innerHTML = RENDER[kind]();
      slot.setAttribute('data-se-done', '1');
      wire(slot);
    });

    // compact strip at the top of every footer — except on the newsletter page itself
    if (!document.querySelector('[data-newsletter="page"]')) {
      Array.prototype.forEach.call(document.querySelectorAll('footer.foot > .wrap'), function (w) {
        if (w.querySelector('.se-foot')) return;
        var d = document.createElement('div');
        d.className = 'se-foot';
        d.innerHTML = footerStrip();
        w.insertBefore(d, w.firstChild);
      });
    }

    // any "Monday" written into a page follows the setting at the top of this file
    Array.prototype.forEach.call(document.querySelectorAll('[data-se-day]'), function (el) { el.textContent = NEWSLETTER.day; });

    if (document.body && document.body.hasAttribute('data-newsletter-page')) countOnce('page_view', 'page');
    source();
  }

  window.ScalingEdge = { settings: NEWSLETTER, mount: mount, count: count };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
