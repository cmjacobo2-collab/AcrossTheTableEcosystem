/* Across the Table — "Ask my AI" chat bubble.
   A round button in the bottom-right corner of every page. It opens Connie's
   HeyGen AI assistant in a new tab (HeyGen doesn't allow being shown inside
   another website). Change the address below to point it elsewhere. */
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
    + '@media print{#ai-bubble{display:none}}';

  var ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><path d="M8 9h8M8 13h5"></path></svg>';

  function start() {
    var st = document.createElement('style'); st.id = 'ai-bubble-css';
    st.textContent = css;
    document.head.appendChild(st);

    var b = document.createElement('a');
    b.id = 'ai-bubble'; b.href = URL; b.target = '_blank'; b.rel = 'noopener';
    b.setAttribute('data-ai-card', '');
    b.setAttribute('aria-label', "Talk to my AI voice assistant (AI, not Connie live). Opens in a new tab.");
    b.title = "Talk to my AI voice assistant — ask anything. It's AI, not Connie live.";
    b.innerHTML = '<span class="aib-ico">' + ICON + '</span><span class="aib-txt">Ask my AI</span>';
    document.body.appendChild(b);

    function sync() { b.hidden = HIDE_ON.indexOf(location.hash) > -1; }
    window.addEventListener('hashchange', sync); sync();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
