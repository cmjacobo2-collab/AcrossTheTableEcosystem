/* Across the Table — "Ask my AI" chat bubble.
   A round button in the bottom-right corner of every page. It opens Connie's
   HeyGen AI assistant in a window on top of the page (or a new tab if the
   browser can't show the window). Change the address below to point it elsewhere. */
(function () {
  var URL = 'https://app.heygen.com/card/connie';
  var HIDE_ON = ['#hub', '#set-hub-password']; // owner-only screens: no bubble

  if (document.getElementById('ai-bubble')) return;

  var css = ''
    + '#ai-bubble{position:fixed;right:20px;bottom:20px;z-index:2147483000;display:flex;align-items:center;gap:10px;'
    + 'padding:0 18px 0 6px;height:58px;border-radius:999px;background:#E0A03A;color:#083A66;text-decoration:none;'
    + 'font:700 15px/1 "Hanken Grotesk",system-ui,-apple-system,"Segoe UI",sans-serif;'
    + 'box-shadow:0 10px 28px rgba(0,0,0,.35),0 0 0 3px rgba(224,160,58,.25);transition:transform .2s,box-shadow .2s}'
    + '#ai-bubble:hover{transform:translateY(-2px);box-shadow:0 14px 32px rgba(0,0,0,.4),0 0 0 4px rgba(224,160,58,.35)}'
    + '#ai-bubble:focus-visible{outline:3px solid #fff;outline-offset:3px}'
    + '#ai-bubble .aib-ico{display:grid;place-items:center;width:46px;height:46px;border-radius:50%;background:#083A66;color:#E0A03A}'
    + '#ai-bubble .aib-ico svg{width:24px;height:24px}'
    + '#ai-bubble[hidden]{display:none}'
    + '@media (max-width:600px){#ai-bubble{right:16px;bottom:16px;padding:0;width:58px;justify-content:center}'
    + '#ai-bubble .aib-txt{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}}'
    + '@media (prefers-reduced-motion:reduce){#ai-bubble{transition:none}}'
    + '@media print{#ai-bubble{display:none}}'
    /* window used on pages that don't already have one */
    + '#ai-dlg{border:0;padding:0;width:min(960px,94vw);height:min(720px,88vh);border-radius:18px;background:#061a2e;color:#EAF4FF;overflow:hidden}'
    + '#ai-dlg::backdrop{background:rgba(2,10,20,.78)}'
    + '#ai-dlg .ai-bar{display:flex;align-items:center;gap:12px;justify-content:space-between;padding:10px 14px;border-bottom:1px solid rgba(255,255,255,.12);font:14px/1.4 system-ui,sans-serif}'
    + '#ai-dlg .ai-bar a{color:#F2B84B}'
    + '#ai-dlg .ai-x{background:none;border:1px solid rgba(255,255,255,.3);color:#fff;border-radius:10px;width:36px;height:36px;font-size:20px;cursor:pointer}'
    + '#ai-dlg iframe{width:100%;height:calc(100% - 57px);border:0;background:#061a2e}'
    + '@media (max-width:600px){#ai-dlg{width:100vw;height:100dvh;max-width:100vw;max-height:100dvh;border-radius:0}}';

  var ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><path d="M8 9h8M8 13h5"></path></svg>';

  function start() {
    var st = document.createElement('style'); st.id = 'ai-bubble-css';
    // the home page already styles its own window; only add the bubble rules there
    st.textContent = document.getElementById('ai-dlg') ? css.slice(0, css.indexOf('#ai-dlg{')) : css;
    document.head.appendChild(st);

    var b = document.createElement('a');
    b.id = 'ai-bubble'; b.href = URL; b.target = '_blank'; b.rel = 'noopener';
    b.setAttribute('data-ai-card', '');
    b.setAttribute('aria-label', "Ask my AI assistant (AI, not Connie live)");
    b.title = "Ask my AI assistant — it's AI, not Connie live";
    b.innerHTML = '<span class="aib-ico">' + ICON + '</span><span class="aib-txt">Ask my AI</span>';
    document.body.appendChild(b);

    // Pages without the home page's window get their own.
    if (!document.getElementById('ai-dlg')) {
      var d = document.createElement('dialog');
      d.id = 'ai-dlg'; d.setAttribute('aria-label', "Connie's AI assistant");
      d.innerHTML = '<div class="ai-bar"><span><b>Connie’s AI assistant</b> &middot; Not loading? '
        + '<a href="' + URL + '" target="_blank" rel="noopener" data-ai-newtab>Open it in a new tab</a></span>'
        + '<button class="ai-x" type="button" aria-label="Close">&times;</button></div>'
        + '<iframe title="Connie’s AI assistant" allow="camera; microphone; autoplay; fullscreen; clipboard-write" referrerpolicy="strict-origin-when-cross-origin"></iframe>';
      document.body.appendChild(d);
      if (typeof d.showModal === 'function') {
        var f = d.querySelector('iframe');
        var close = function () { try { d.close(); } catch (e) {} f.removeAttribute('src'); };
        document.addEventListener('click', function (e) {
          var a = e.target.closest && e.target.closest('[data-ai-card]'); if (!a) return;
          e.preventDefault(); f.src = a.href; d.showModal();
        });
        d.querySelector('.ai-x').addEventListener('click', close);
        d.querySelector('[data-ai-newtab]').addEventListener('click', close);
        d.addEventListener('click', function (e) { if (e.target === d) close(); });
        d.addEventListener('close', function () { f.removeAttribute('src'); });
      }
    }

    function sync() { b.hidden = HIDE_ON.indexOf(location.hash) > -1; }
    window.addEventListener('hashchange', sync); sync();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
