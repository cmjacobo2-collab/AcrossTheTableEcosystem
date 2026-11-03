/* @ds-bundle: {"format":3,"namespace":"AcrossTheTableDesignSystem_520822","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Stat","sourcePath":"components/core/Stat.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"assets/icons.jsx":"ed33b9d7d2df","components/core/Avatar.jsx":"937aa691cf6f","components/core/Badge.jsx":"64a955b18397","components/core/Button.jsx":"6cf3eb36e98c","components/core/Card.jsx":"f91c837b68ca","components/core/IconButton.jsx":"9994d0f76d72","components/core/Stat.jsx":"9c79e512f324","components/core/Tag.jsx":"67eed3cfbc2f","components/feedback/Alert.jsx":"6580b388cd46","components/forms/Checkbox.jsx":"35e4098fdc78","components/forms/Input.jsx":"03ed8928016a","components/forms/Select.jsx":"807eac259ae5","components/forms/Switch.jsx":"eafc8fdf9e19","components/navigation/Tabs.jsx":"e8ea0539e7b5","ui_kits/portal/portal.jsx":"b05546f6ae96","ui_kits/website/site.jsx":"068a59bacb5f"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AcrossTheTableDesignSystem_520822 = window.AcrossTheTableDesignSystem_520822 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// assets/icons.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Across the Table — inline Lucide icon set (outline, 2px stroke, rounded caps).
// Exposes window.Icon and window.PhotoFrame for the UI kits.
const ATT_ICONS = {
  'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  'arrow-up-right': '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  'check': '<path d="M20 6 9 17l-5-5"/>',
  'circle-check': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  'menu': '<line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>',
  'x': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  'phone': '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  'calendar': '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  'calculator': '<rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>',
  'trending-up': '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  'file-text': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',
  'shield-check': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  'users': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  'building': '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>',
  'star': '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  'mail': '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  'map-pin': '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  'layout-dashboard': '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
  'folder': '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
  'bell': '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',
  'search': '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  'settings': '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  'log-out': '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>',
  'plus': '<path d="M5 12h14"/><path d="M12 5v14"/>',
  'clock': '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  'download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
  'receipt': '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/>',
  'circle-dollar-sign': '<circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/>',
  'more-horizontal': '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  'upload': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>'
};
function Icon({
  name,
  size = 20,
  stroke = 2,
  fillStar = false,
  style,
  ...rest
}) {
  const isFill = fillStar && name === 'star';
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: isFill ? 'currentColor' : 'none',
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: 'block',
      flex: 'none',
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: ATT_ICONS[name] || ''
    }
  }, rest));
}

// A branded photo placeholder: warm navy/forest wash with the table mark watermark.
function PhotoFrame({
  label = 'Photography',
  radius = 14,
  ratio,
  style,
  children
}) {
  const box = {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: radius,
    background: 'linear-gradient(135deg, var(--navy-800), var(--forest-700))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...(ratio ? {
      aspectRatio: ratio
    } : {}),
    ...style
  };
  return /*#__PURE__*/React.createElement("div", {
    style: box
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0.10,
      backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
      backgroundSize: '22px 22px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      color: 'rgba(255,255,255,.75)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "42",
    height: "42",
    viewBox: "0 0 48 48",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "13",
    y: "21.5",
    width: "22",
    height: "5",
    rx: "2.5",
    fill: "#DCB04F"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "10.5",
    cy: "24",
    r: "4.2",
    fill: "#FBF8F2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "37.5",
    cy: "24",
    r: "4.2",
    fill: "#FBF8F2"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '.14em',
      textTransform: 'uppercase'
    }
  }, label)), children);
}
Object.assign(window, {
  Icon,
  PhotoFrame
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/icons.jsx", error: String((e && e.message) || e) }); }

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const _CSS = "\n.att-avatar{display:inline-flex;align-items:center;justify-content:center;overflow:hidden;\n  font-family:var(--font-display);font-weight:var(--fw-semibold);color:var(--white);\n  background:var(--navy-600);border-radius:50%;flex:none;line-height:1;}\n.att-avatar img{width:100%;height:100%;object-fit:cover;display:block;}\n.att-avatar--sm{width:32px;height:32px;font-size:.75rem;}\n.att-avatar--md{width:42px;height:42px;font-size:.95rem;}\n.att-avatar--lg{width:56px;height:56px;font-size:1.25rem;}\n.att-avatar--square{border-radius:var(--radius-md);}\n";
if (typeof document !== 'undefined' && !document.getElementById("att-avatar-css")) {
  const s = document.createElement('style');
  s.id = "att-avatar-css";
  s.textContent = _CSS;
  document.head.appendChild(s);
}
const _tones = ['var(--navy-600)', 'var(--forest-600)', 'var(--gold-600)', 'var(--navy-800)'];
function Avatar({
  src,
  name = '',
  size = 'md',
  square = false,
  ...rest
}) {
  const initials = name.split(' ').map(p => p[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
  const bg = _tones[(name.charCodeAt(0) || 0) % _tones.length];
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ['att-avatar', 'att-avatar--' + size, square && 'att-avatar--square'].filter(Boolean).join(' '),
    style: !src ? {
      background: bg
    } : undefined
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name
  }) : initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const _CSS = "\n.att-badge{display:inline-flex;align-items:center;gap:.35em;font-family:var(--font-sans);\n  font-weight:var(--fw-semibold);font-size:var(--text-xs);line-height:1;padding:.3em .6em;\n  border-radius:var(--radius-sm);border:1px solid transparent;white-space:nowrap;}\n.att-badge--dot::before{content:\"\";width:.45em;height:.45em;border-radius:50%;background:currentColor;}\n.att-badge--neutral{background:var(--cream-100);color:var(--ink-700);border-color:var(--border-default);}\n.att-badge--primary{background:var(--navy-050);color:var(--navy-700);border-color:var(--navy-100);}\n.att-badge--success{background:var(--success-bg);color:var(--success);border-color:var(--success-border);}\n.att-badge--warning{background:var(--warning-bg);color:var(--gold-700);border-color:var(--warning-border);}\n.att-badge--danger{background:var(--danger-bg);color:var(--danger);border-color:var(--danger-border);}\n.att-badge--accent{background:var(--gold-050);color:var(--gold-700);border-color:var(--gold-100);}\n";
if (typeof document !== 'undefined' && !document.getElementById("att-badge-css")) {
  const s = document.createElement('style');
  s.id = "att-badge-css";
  s.textContent = _CSS;
  document.head.appendChild(s);
}
function Badge({
  tone = 'neutral',
  dot = false,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ['att-badge', 'att-badge--' + tone, dot && 'att-badge--dot'].filter(Boolean).join(' ')
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const _CSS = "\n.att-btn{display:inline-flex;align-items:center;justify-content:center;gap:.55em;\n  font-family:var(--font-sans);font-weight:var(--fw-semibold);line-height:1;cursor:pointer;\n  border:1px solid transparent;border-radius:var(--radius-md);white-space:nowrap;\n  transition:background var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out),\n  box-shadow var(--dur-fast) var(--ease-out),transform var(--dur-fast) var(--ease-out);\n  text-decoration:none;}\n.att-btn:focus-visible{outline:none;box-shadow:var(--shadow-focus);}\n.att-btn:active{transform:translateY(1px);}\n.att-btn:disabled{opacity:.45;cursor:not-allowed;transform:none;box-shadow:none;}\n.att-btn--sm{height:var(--control-sm);padding:0 .85rem;font-size:var(--text-sm);}\n.att-btn--md{height:var(--control-md);padding:0 1.15rem;font-size:var(--text-base);}\n.att-btn--lg{height:var(--control-lg);padding:0 1.6rem;font-size:var(--text-md);}\n.att-btn--block{width:100%;}\n.att-btn__i{display:inline-flex;align-items:center;}\n.att-btn__i svg{width:1.15em;height:1.15em;display:block;}\n.att-btn--primary{background:var(--brand-primary);color:var(--white);}\n.att-btn--primary:hover:not(:disabled){background:var(--brand-primary-hover);}\n.att-btn--secondary{background:var(--brand-secondary);color:var(--white);}\n.att-btn--secondary:hover:not(:disabled){background:var(--brand-secondary-hover);}\n.att-btn--accent{background:var(--brand-accent);color:var(--navy-900);}\n.att-btn--accent:hover:not(:disabled){background:var(--brand-accent-hover);color:var(--white);}\n.att-btn--outline{background:transparent;color:var(--brand-primary);border-color:var(--border-strong);}\n.att-btn--outline:hover:not(:disabled){background:var(--cream-100);border-color:var(--navy-600);}\n.att-btn--ghost{background:transparent;color:var(--brand-primary);}\n.att-btn--ghost:hover:not(:disabled){background:var(--cream-100);}\n.att-btn--danger{background:var(--danger);color:var(--white);}\n.att-btn--danger:hover:not(:disabled){background:#922f23;}\n";
if (typeof document !== 'undefined' && !document.getElementById("att-btn-css")) {
  const s = document.createElement('style');
  s.id = "att-btn-css";
  s.textContent = _CSS;
  document.head.appendChild(s);
}
function Button({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled = false,
  children,
  ...rest
}) {
  const cls = ['att-btn', 'att-btn--' + variant, 'att-btn--' + size, fullWidth && 'att-btn--block'].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    disabled: disabled
  }, rest), leftIcon && /*#__PURE__*/React.createElement("span", {
    className: "att-btn__i"
  }, leftIcon), children, rightIcon && /*#__PURE__*/React.createElement("span", {
    className: "att-btn__i"
  }, rightIcon));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const _CSS = "\n.att-card{background:var(--surface-card);border:1px solid var(--border-default);border-radius:var(--radius-lg);\n  box-shadow:var(--shadow-sm);overflow:hidden;transition:box-shadow var(--dur-base) var(--ease-out),transform var(--dur-base) var(--ease-out),border-color var(--dur-base);}\n.att-card--pad{padding:var(--space-5);}\n.att-card--hover{cursor:pointer;}\n.att-card--hover:hover{box-shadow:var(--shadow-card-hover);transform:translateY(-2px);border-color:var(--border-strong);}\n.att-card--flat{box-shadow:none;}\n.att-card--dark{background:var(--navy-900);border-color:var(--border-dark);color:var(--text-on-dark);}\n.att-card__eyebrow{font-size:var(--text-xs);font-weight:var(--fw-bold);letter-spacing:var(--tracking-caps);\n  text-transform:uppercase;color:var(--gold-700);margin:0 0 var(--space-2);}\n.att-card__title{font-family:var(--font-display);font-weight:var(--fw-bold);font-size:var(--text-lg);\n  color:var(--text-strong);margin:0 0 var(--space-2);letter-spacing:var(--tracking-snug);}\n.att-card--dark .att-card__title{color:var(--white);}\n.att-card__body{font-size:var(--text-base);line-height:var(--leading-normal);color:var(--text-body);margin:0;}\n.att-card--dark .att-card__body{color:var(--text-on-dark-muted);}\n";
if (typeof document !== 'undefined' && !document.getElementById("att-card-css")) {
  const s = document.createElement('style');
  s.id = "att-card-css";
  s.textContent = _CSS;
  document.head.appendChild(s);
}
function Card({
  pad = true,
  hover = false,
  flat = false,
  dark = false,
  eyebrow,
  title,
  children,
  ...rest
}) {
  const cls = ['att-card', pad && 'att-card--pad', hover && 'att-card--hover', flat && 'att-card--flat', dark && 'att-card--dark'].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), eyebrow && /*#__PURE__*/React.createElement("p", {
    className: "att-card__eyebrow"
  }, eyebrow), title && /*#__PURE__*/React.createElement("h3", {
    className: "att-card__title"
  }, title), title || eyebrow ? /*#__PURE__*/React.createElement("div", {
    className: "att-card__body"
  }, children) : children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const _CSS = "\n.att-iconbtn{display:inline-flex;align-items:center;justify-content:center;cursor:pointer;\n  border:1px solid transparent;border-radius:var(--radius-md);color:var(--text-body);background:transparent;\n  transition:background var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out),border-color var(--dur-fast);}\n.att-iconbtn:focus-visible{outline:none;box-shadow:var(--shadow-focus);}\n.att-iconbtn:disabled{opacity:.4;cursor:not-allowed;}\n.att-iconbtn svg{width:1.25rem;height:1.25rem;display:block;}\n.att-iconbtn--sm{width:var(--control-sm);height:var(--control-sm);}\n.att-iconbtn--md{width:var(--control-md);height:var(--control-md);}\n.att-iconbtn--lg{width:var(--control-lg);height:var(--control-lg);}\n.att-iconbtn--ghost:hover:not(:disabled){background:var(--cream-100);color:var(--text-strong);}\n.att-iconbtn--outline{border-color:var(--border-strong);}\n.att-iconbtn--outline:hover:not(:disabled){background:var(--cream-100);border-color:var(--navy-600);}\n.att-iconbtn--solid{background:var(--brand-primary);color:var(--white);}\n.att-iconbtn--solid:hover:not(:disabled){background:var(--brand-primary-hover);}\n";
if (typeof document !== 'undefined' && !document.getElementById("att-iconbtn-css")) {
  const s = document.createElement('style');
  s.id = "att-iconbtn-css";
  s.textContent = _CSS;
  document.head.appendChild(s);
}
function IconButton({
  variant = 'ghost',
  size = 'md',
  label,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    className: ['att-iconbtn', 'att-iconbtn--' + variant, 'att-iconbtn--' + size].join(' '),
    "aria-label": label,
    title: label
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Stat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const _CSS = "\n.att-stat{display:flex;flex-direction:column;gap:.25rem;}\n.att-stat__value{font-family:var(--font-display);font-weight:var(--fw-extrabold);font-size:var(--text-2xl);\n  line-height:1;letter-spacing:var(--tracking-tight);color:var(--text-strong);}\n.att-stat--accent .att-stat__value{color:var(--brand-secondary);}\n.att-stat--gold .att-stat__value{color:var(--gold-700);}\n.att-stat__label{font-size:var(--text-sm);color:var(--text-muted);font-weight:var(--fw-medium);}\n.att-stat__delta{display:inline-flex;align-items:center;gap:.25em;font-size:var(--text-sm);font-weight:var(--fw-semibold);}\n.att-stat__delta--up{color:var(--success);}\n.att-stat__delta--down{color:var(--danger);}\n";
if (typeof document !== 'undefined' && !document.getElementById("att-stat-css")) {
  const s = document.createElement('style');
  s.id = "att-stat-css";
  s.textContent = _CSS;
  document.head.appendChild(s);
}
function Stat({
  value,
  label,
  delta,
  deltaDir = 'up',
  tone = 'default',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['att-stat', tone !== 'default' && 'att-stat--' + tone].filter(Boolean).join(' ')
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "att-stat__value"
  }, value), label && /*#__PURE__*/React.createElement("span", {
    className: "att-stat__label"
  }, label), delta && /*#__PURE__*/React.createElement("span", {
    className: 'att-stat__delta att-stat__delta--' + deltaDir
  }, deltaDir === 'up' ? '▲' : '▼', " ", delta));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Stat.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const _CSS = "\n.att-tag{display:inline-flex;align-items:center;gap:.4em;font-family:var(--font-sans);\n  font-weight:var(--fw-medium);font-size:var(--text-sm);line-height:1;padding:.4em .75em;\n  border-radius:var(--radius-pill);background:var(--cream-100);color:var(--ink-700);\n  border:1px solid var(--border-default);}\n.att-tag--active{background:var(--navy-700);color:var(--white);border-color:var(--navy-700);}\n.att-tag__x{display:inline-flex;cursor:pointer;opacity:.6;}\n.att-tag__x:hover{opacity:1;}\n.att-tag__x svg{width:.85em;height:.85em;}\n";
if (typeof document !== 'undefined' && !document.getElementById("att-tag-css")) {
  const s = document.createElement('style');
  s.id = "att-tag-css";
  s.textContent = _CSS;
  document.head.appendChild(s);
}
function Tag({
  active = false,
  onRemove,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ['att-tag', active && 'att-tag--active'].filter(Boolean).join(' ')
  }, rest), children, onRemove && /*#__PURE__*/React.createElement("span", {
    className: "att-tag__x",
    role: "button",
    "aria-label": "Remove",
    onClick: onRemove
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const _CSS = "\n.att-alert{display:flex;gap:.75rem;padding:var(--space-4);border-radius:var(--radius-md);\n  border:1px solid var(--border-default);background:var(--surface-card);font-family:var(--font-sans);}\n.att-alert__icon{flex:none;width:1.25rem;height:1.25rem;margin-top:.1rem;}\n.att-alert__icon svg{width:100%;height:100%;display:block;}\n.att-alert__body{font-size:var(--text-sm);line-height:var(--leading-normal);color:var(--text-body);}\n.att-alert__title{font-weight:var(--fw-semibold);color:var(--text-strong);margin:0 0 .15rem;}\n.att-alert--info{background:var(--info-bg);border-color:var(--info-border);}\n.att-alert--info .att-alert__icon{color:var(--info);}\n.att-alert--success{background:var(--success-bg);border-color:var(--success-border);}\n.att-alert--success .att-alert__icon{color:var(--success);}\n.att-alert--warning{background:var(--warning-bg);border-color:var(--warning-border);}\n.att-alert--warning .att-alert__icon{color:var(--gold-700);}\n.att-alert--danger{background:var(--danger-bg);border-color:var(--danger-border);}\n.att-alert--danger .att-alert__icon{color:var(--danger);}\n";
if (typeof document !== 'undefined' && !document.getElementById("att-alert-css")) {
  const s = document.createElement('style');
  s.id = "att-alert-css";
  s.textContent = _CSS;
  document.head.appendChild(s);
}
function Alert({
  tone = 'info',
  title,
  icon,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: 'att-alert att-alert--' + tone,
    role: "status"
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    className: "att-alert__icon"
  }, icon), /*#__PURE__*/React.createElement("div", {
    className: "att-alert__body"
  }, title && /*#__PURE__*/React.createElement("p", {
    className: "att-alert__title"
  }, title), children));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const _CSS = "\n.att-check{display:inline-flex;align-items:flex-start;gap:.6rem;font-family:var(--font-sans);\n  font-size:var(--text-base);color:var(--text-body);cursor:pointer;line-height:1.4;}\n.att-check input{position:absolute;opacity:0;width:0;height:0;}\n.att-check__box{flex:none;width:1.2rem;height:1.2rem;margin-top:.08rem;border:1.5px solid var(--border-strong);\n  border-radius:var(--radius-xs);background:var(--white);display:inline-flex;align-items:center;justify-content:center;\n  transition:background var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out);}\n.att-check__box svg{width:.8rem;height:.8rem;color:#fff;opacity:0;transform:scale(.6);transition:opacity var(--dur-fast),transform var(--dur-fast) var(--ease-out);}\n.att-check input:checked + .att-check__box{background:var(--brand-primary);border-color:var(--brand-primary);}\n.att-check input:checked + .att-check__box svg{opacity:1;transform:scale(1);}\n.att-check input:focus-visible + .att-check__box{box-shadow:var(--shadow-focus);}\n.att-check input:disabled ~ *{opacity:.5;}\n";
if (typeof document !== 'undefined' && !document.getElementById("att-check-css")) {
  const s = document.createElement('style');
  s.id = "att-check-css";
  s.textContent = _CSS;
  document.head.appendChild(s);
}
function Checkbox({
  label,
  checked,
  defaultChecked,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: "att-check"
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: checked,
    defaultChecked: defaultChecked
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "att-check__box"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 8.5l3.2 3.2L13 5",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const _CSS = "\n.att-field{display:flex;flex-direction:column;gap:.4rem;font-family:var(--font-sans);}\n.att-field__label{font-size:var(--text-sm);font-weight:var(--fw-semibold);color:var(--text-strong);}\n.att-field__hint{font-size:var(--text-xs);color:var(--text-muted);}\n.att-field__err{font-size:var(--text-xs);color:var(--danger);font-weight:var(--fw-medium);}\n.att-input,.att-select{width:100%;height:var(--control-md);padding:0 .85rem;font-family:var(--font-sans);\n  font-size:var(--text-base);color:var(--text-strong);background:var(--white);\n  border:1px solid var(--border-strong);border-radius:var(--radius-md);\n  transition:border-color var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast) var(--ease-out);}\ntextarea.att-input{height:auto;min-height:96px;padding:.65rem .85rem;line-height:var(--leading-normal);resize:vertical;}\n.att-input::placeholder{color:var(--text-faint);}\n.att-input:hover,.att-select:hover{border-color:var(--navy-500);}\n.att-input:focus,.att-select:focus{outline:none;border-color:var(--navy-700);box-shadow:var(--shadow-focus);}\n.att-input:disabled,.att-select:disabled{background:var(--cream-100);opacity:.7;cursor:not-allowed;}\n.att-input--error,.att-select--error{border-color:var(--danger);}\n.att-input--error:focus{box-shadow:0 0 0 3px var(--danger-border);}\n.att-select-wrap{position:relative;}\n.att-select{appearance:none;padding-right:2.25rem;cursor:pointer;}\n.att-select-wrap::after{content:\"\";position:absolute;right:.9rem;top:50%;width:.5rem;height:.5rem;\n  border-right:2px solid var(--ink-500);border-bottom:2px solid var(--ink-500);\n  transform:translateY(-65%) rotate(45deg);pointer-events:none;}\n";
if (typeof document !== 'undefined' && !document.getElementById("att-field-css")) {
  const s = document.createElement('style');
  s.id = "att-field-css";
  s.textContent = _CSS;
  document.head.appendChild(s);
}
function Input({
  label,
  hint,
  error,
  multiline = false,
  id,
  ...rest
}) {
  const fid = id || (label ? 'f-' + label.replace(/\s+/g, '-').toLowerCase() : undefined);
  const cls = ['att-input', error && 'att-input--error'].filter(Boolean).join(' ');
  const control = multiline ? /*#__PURE__*/React.createElement("textarea", _extends({
    id: fid,
    className: cls,
    "aria-invalid": !!error
  }, rest)) : /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    className: cls,
    "aria-invalid": !!error
  }, rest));
  return /*#__PURE__*/React.createElement("div", {
    className: "att-field"
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "att-field__label",
    htmlFor: fid
  }, label), control, error ? /*#__PURE__*/React.createElement("span", {
    className: "att-field__err"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "att-field__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const _CSS = "\n.att-field{display:flex;flex-direction:column;gap:.4rem;font-family:var(--font-sans);}\n.att-field__label{font-size:var(--text-sm);font-weight:var(--fw-semibold);color:var(--text-strong);}\n.att-field__hint{font-size:var(--text-xs);color:var(--text-muted);}\n.att-field__err{font-size:var(--text-xs);color:var(--danger);font-weight:var(--fw-medium);}\n.att-input,.att-select{width:100%;height:var(--control-md);padding:0 .85rem;font-family:var(--font-sans);\n  font-size:var(--text-base);color:var(--text-strong);background:var(--white);\n  border:1px solid var(--border-strong);border-radius:var(--radius-md);\n  transition:border-color var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast) var(--ease-out);}\ntextarea.att-input{height:auto;min-height:96px;padding:.65rem .85rem;line-height:var(--leading-normal);resize:vertical;}\n.att-input::placeholder{color:var(--text-faint);}\n.att-input:hover,.att-select:hover{border-color:var(--navy-500);}\n.att-input:focus,.att-select:focus{outline:none;border-color:var(--navy-700);box-shadow:var(--shadow-focus);}\n.att-input:disabled,.att-select:disabled{background:var(--cream-100);opacity:.7;cursor:not-allowed;}\n.att-input--error,.att-select--error{border-color:var(--danger);}\n.att-input--error:focus{box-shadow:0 0 0 3px var(--danger-border);}\n.att-select-wrap{position:relative;}\n.att-select{appearance:none;padding-right:2.25rem;cursor:pointer;}\n.att-select-wrap::after{content:\"\";position:absolute;right:.9rem;top:50%;width:.5rem;height:.5rem;\n  border-right:2px solid var(--ink-500);border-bottom:2px solid var(--ink-500);\n  transform:translateY(-65%) rotate(45deg);pointer-events:none;}\n";
if (typeof document !== 'undefined' && !document.getElementById("att-field-css")) {
  const s = document.createElement('style');
  s.id = "att-field-css";
  s.textContent = _CSS;
  document.head.appendChild(s);
}
function Select({
  label,
  hint,
  error,
  id,
  children,
  ...rest
}) {
  const fid = id || (label ? 's-' + label.replace(/\s+/g, '-').toLowerCase() : undefined);
  return /*#__PURE__*/React.createElement("div", {
    className: "att-field"
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "att-field__label",
    htmlFor: fid
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "att-select-wrap"
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fid,
    className: ['att-select', error && 'att-select--error'].filter(Boolean).join(' ')
  }, rest), children)), error ? /*#__PURE__*/React.createElement("span", {
    className: "att-field__err"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "att-field__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const _CSS = "\n.att-switch{display:inline-flex;align-items:center;gap:.65rem;font-family:var(--font-sans);\n  font-size:var(--text-base);color:var(--text-body);cursor:pointer;}\n.att-switch input{position:absolute;opacity:0;width:0;height:0;}\n.att-switch__track{position:relative;width:42px;height:24px;border-radius:var(--radius-pill);\n  background:var(--ink-300);transition:background var(--dur-base) var(--ease-out);flex:none;}\n.att-switch__thumb{position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;\n  background:#fff;box-shadow:var(--shadow-sm);transition:transform var(--dur-base) var(--ease-out);}\n.att-switch input:checked + .att-switch__track{background:var(--brand-secondary);}\n.att-switch input:checked + .att-switch__track .att-switch__thumb{transform:translateX(18px);}\n.att-switch input:focus-visible + .att-switch__track{box-shadow:var(--shadow-focus);}\n.att-switch input:disabled + .att-switch__track{opacity:.5;}\n";
if (typeof document !== 'undefined' && !document.getElementById("att-switch-css")) {
  const s = document.createElement('style');
  s.id = "att-switch-css";
  s.textContent = _CSS;
  document.head.appendChild(s);
}
function Switch({
  label,
  checked,
  defaultChecked,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: "att-switch"
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    checked: checked,
    defaultChecked: defaultChecked
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "att-switch__track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "att-switch__thumb"
  })), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
const _CSS = "\n.att-tabs{display:flex;gap:.25rem;border-bottom:1px solid var(--border-default);font-family:var(--font-sans);}\n.att-tab{appearance:none;background:none;border:none;cursor:pointer;padding:.7rem 1rem;\n  font-size:var(--text-base);font-weight:var(--fw-semibold);color:var(--text-muted);\n  border-bottom:2px solid transparent;margin-bottom:-1px;\n  transition:color var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out);}\n.att-tab:hover{color:var(--text-strong);}\n.att-tab--active{color:var(--brand-primary);border-bottom-color:var(--brand-accent);}\n.att-tab__count{margin-left:.45em;font-size:var(--text-xs);font-weight:var(--fw-bold);\n  background:var(--cream-100);color:var(--text-muted);padding:.1em .5em;border-radius:var(--radius-pill);}\n.att-tab--active .att-tab__count{background:var(--gold-050);color:var(--gold-700);}\n";
if (typeof document !== 'undefined' && !document.getElementById("att-tabs-css")) {
  const s = document.createElement('style');
  s.id = "att-tabs-css";
  s.textContent = _CSS;
  document.head.appendChild(s);
}
function Tabs({
  items = [],
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "att-tabs",
    role: "tablist"
  }, items.map(it => {
    const v = it.value ?? it.label;
    const active = v === value;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      role: "tab",
      "aria-selected": active,
      className: ['att-tab', active && 'att-tab--active'].filter(Boolean).join(' '),
      onClick: () => onChange && onChange(v)
    }, it.label, it.count != null && /*#__PURE__*/React.createElement("span", {
      className: "att-tab__count"
    }, it.count));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/portal.jsx
try { (() => {
// Across the Table — Client portal (web app) surfaces
const {
  Button,
  Badge,
  Card,
  Stat,
  Input,
  Tabs,
  Avatar,
  Alert
} = window.AcrossTheTableDesignSystem_520822;
// Icon, PhotoFrame are globals from assets/icons.jsx

const NAV = [{
  id: 'dashboard',
  label: 'Dashboard',
  icon: 'layout-dashboard'
}, {
  id: 'documents',
  label: 'Documents',
  icon: 'folder'
}, {
  id: 'invoices',
  label: 'Invoices',
  icon: 'receipt'
}, {
  id: 'tasks',
  label: 'Tasks',
  icon: 'circle-check'
}, {
  id: 'messages',
  label: 'Messages',
  icon: 'mail'
}];
function Sidebar({
  active,
  onNav
}) {
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 248,
      flex: 'none',
      background: 'var(--navy-900)',
      color: 'var(--text-on-dark)',
      display: 'flex',
      flexDirection: 'column',
      padding: '22px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '4px 8px 22px'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "34",
    height: "34",
    viewBox: "0 0 48 48"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "13",
    y: "21.5",
    width: "22",
    height: "5",
    rx: "2.5",
    fill: "#C8962E"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "10.5",
    cy: "24",
    r: "4.2",
    fill: "#FBF8F2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "37.5",
    cy: "24",
    r: "4.2",
    fill: "#FBF8F2"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 15,
      color: '#fff',
      letterSpacing: '-.01em'
    }
  }, "Across the Table"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 8,
      fontWeight: 600,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--gold-400)',
      marginTop: 3
    }
  }, "Client Portal"))), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, NAV.map(n => {
    const on = active === n.id;
    return /*#__PURE__*/React.createElement("button", {
      key: n.id,
      onClick: () => onNav(n.id),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 12px',
        borderRadius: 10,
        cursor: 'pointer',
        border: 'none',
        textAlign: 'left',
        font: 'inherit',
        fontSize: 14.5,
        fontWeight: 600,
        background: on ? 'rgba(255,255,255,.08)' : 'transparent',
        color: on ? '#fff' : 'var(--text-on-dark-muted)',
        boxShadow: on ? 'inset 3px 0 0 var(--gold-500)' : 'none'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: n.icon,
      size: 19
    }), " ", n.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      padding: '12px 8px',
      borderTop: '1px solid var(--border-dark)'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Marisol Reyes",
    size: "sm"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1.3,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 600,
      color: '#fff',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, "Marisol Reyes"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-on-dark-muted)'
    }
  }, "Reyes Bakery")), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      color: 'var(--text-on-dark-muted)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "settings",
    size: 18
  }))));
}
function Topbar({
  title
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      height: 68,
      flex: 'none',
      borderBottom: '1px solid var(--border-default)',
      background: 'var(--surface-card)',
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      padding: '0 28px'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 22,
      letterSpacing: '-.01em',
      color: 'var(--text-strong)',
      margin: 0
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 12,
      color: 'var(--text-faint)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 17
  })), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search",
    style: {
      height: 38,
      width: 200,
      padding: '0 12px 0 36px',
      border: '1px solid var(--border-strong)',
      borderRadius: 10,
      font: 'inherit',
      fontSize: 14,
      background: 'var(--cream-50)',
      color: 'var(--text-strong)'
    }
  })), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Notifications",
    style: {
      position: 'relative',
      width: 38,
      height: 38,
      borderRadius: 10,
      border: '1px solid var(--border-default)',
      background: 'var(--surface-card)',
      cursor: 'pointer',
      color: 'var(--text-body)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 18
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 8,
      right: 9,
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--gold-500)',
      border: '1.5px solid #fff'
    }
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    leftIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 16
    })
  }, "Upload")));
}
function MiniBars() {
  const data = [42, 55, 38, 61, 70, 64, 78, 72, 85, 80, 92, 88];
  const max = 100;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 7,
      height: 120
    }
  }, data.map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      height: v / max * 100 + '%',
      borderRadius: '5px 5px 0 0',
      background: i >= data.length - 2 ? 'var(--gold-500)' : 'var(--forest-500)',
      opacity: i >= data.length - 2 ? 1 : 0.55 + i * 0.03
    },
    title: '$' + v * 120
  })));
}
function Dashboard() {
  const tasks = [{
    t: 'Upload March receipts',
    due: 'Due tomorrow',
    tone: 'warning',
    done: false
  }, {
    t: 'Approve Q1 cash-flow plan',
    due: 'Due in 3 days',
    tone: 'neutral',
    done: false
  }, {
    t: 'Sign engagement letter',
    due: 'Completed',
    tone: 'success',
    done: true
  }];
  const docs = [{
    name: 'Q1-2026 Cash Flow Plan.pdf',
    meta: 'Shared 2 days ago · 1.2 MB',
    icon: 'trending-up'
  }, {
    name: 'February Bookkeeping.xlsx',
    meta: 'Updated Mar 3 · 480 KB',
    icon: 'calculator'
  }, {
    name: 'Engagement Letter.pdf',
    meta: 'Signed Feb 28 · 220 KB',
    icon: 'file-text'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement(Alert, {
    tone: "info",
    title: "Your March check-in is booked",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "calendar",
      size: 20
    })
  }, "Thursday, March 14 at 10:00 AM with Dana, your advisor. We'll review last month and set this month's targets."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Stat, {
    value: "$128,400",
    label: "Cash on hand",
    delta: "6.2%",
    deltaDir: "up"
  })), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Stat, {
    value: "$41,900",
    label: "Revenue this month",
    tone: "accent",
    delta: "4.0%",
    deltaDir: "up"
  })), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Stat, {
    value: "$9,250",
    label: "Owed to you"
  })), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Stat, {
    value: "11 wks",
    label: "Runway",
    tone: "gold"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Revenue \u2014 last 12 weeks"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(MiniBars, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 12,
      fontSize: 12.5,
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Dec"), /*#__PURE__*/React.createElement("span", null, "Jan"), /*#__PURE__*/React.createElement("span", null, "Feb"), /*#__PURE__*/React.createElement("span", null, "Mar"))), /*#__PURE__*/React.createElement(Card, {
    title: "Tasks"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      marginTop: 6
    }
  }, tasks.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.t,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 12px',
      background: 'var(--cream-50)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.done ? 'var(--forest-600)' : 'var(--ink-300)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "circle-check",
    size: 20,
    fillStar: false
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 14,
      fontWeight: 600,
      color: t.done ? 'var(--text-muted)' : 'var(--text-strong)',
      textDecoration: t.done ? 'line-through' : 'none'
    }
  }, t.t), /*#__PURE__*/React.createElement(Badge, {
    tone: t.tone
  }, t.due)))))), /*#__PURE__*/React.createElement(Card, {
    title: "Recent documents"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: 4
    }
  }, docs.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: d.name,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '14px 4px',
      borderTop: i ? '1px solid var(--border-subtle)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 9,
      background: 'var(--navy-050)',
      color: 'var(--navy-700)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: d.icon,
    size: 19
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, d.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, d.meta)), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    leftIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      size: 16
    })
  }, "Download"))))));
}
function Documents() {
  const [tab, setTab] = React.useState('All');
  const rows = [{
    name: 'Q1-2026 Cash Flow Plan.pdf',
    cat: 'Plans',
    date: 'Mar 12, 2026',
    size: '1.2 MB',
    tone: 'primary'
  }, {
    name: 'February Bookkeeping.xlsx',
    cat: 'Books',
    date: 'Mar 3, 2026',
    size: '480 KB',
    tone: 'success'
  }, {
    name: 'February P&L Statement.pdf',
    cat: 'Reports',
    date: 'Mar 3, 2026',
    size: '210 KB',
    tone: 'neutral'
  }, {
    name: 'Engagement Letter.pdf',
    cat: 'Legal',
    date: 'Feb 28, 2026',
    size: '220 KB',
    tone: 'accent'
  }, {
    name: 'January Bookkeeping.xlsx',
    cat: 'Books',
    date: 'Feb 2, 2026',
    size: '465 KB',
    tone: 'success'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28
    }
  }, /*#__PURE__*/React.createElement(Card, {
    pad: false
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 20px 0'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    items: [{
      label: 'All',
      count: 5
    }, {
      label: 'Plans'
    }, {
      label: 'Books',
      count: 2
    }, {
      label: 'Reports'
    }, {
      label: 'Legal'
    }]
  })), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 14.5
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      textAlign: 'left',
      color: 'var(--text-muted)',
      fontSize: 12.5,
      textTransform: 'uppercase',
      letterSpacing: '.05em'
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '14px 20px',
      fontWeight: 700
    }
  }, "Name"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '14px 12px',
      fontWeight: 700
    }
  }, "Category"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '14px 12px',
      fontWeight: 700
    }
  }, "Date"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '14px 12px',
      fontWeight: 700
    }
  }, "Size"), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: r.name,
    style: {
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 20px',
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--navy-600)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "file-text",
    size: 18
  })), r.name)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 12px'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: r.tone
  }, r.cat)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 12px',
      color: 'var(--text-body)'
    }
  }, r.date), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 12px',
      color: 'var(--text-muted)'
    }
  }, r.size), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 16px',
      textAlign: 'right',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "more-horizontal",
    size: 20
  }))))))));
}
function Placeholder({
  title
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '40px 0',
      textAlign: 'center',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      marginBottom: 12,
      color: 'var(--ink-300)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "folder",
    size: 40
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 16
    }
  }, title, " is empty for now."))));
}
function Portal() {
  const [view, setView] = React.useState('dashboard');
  const titles = {
    dashboard: 'Good morning, Marisol',
    documents: 'Documents',
    invoices: 'Invoices',
    tasks: 'Tasks',
    messages: 'Messages'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      background: 'var(--bg-page)'
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    active: view,
    onNav: setView
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(Topbar, {
    title: titles[view]
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      overflowY: 'auto'
    }
  }, view === 'dashboard' && /*#__PURE__*/React.createElement(Dashboard, null), view === 'documents' && /*#__PURE__*/React.createElement(Documents, null), ['invoices', 'tasks', 'messages'].includes(view) && /*#__PURE__*/React.createElement(Placeholder, {
    title: titles[view]
  }))));
}
window.Portal = Portal;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/portal.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/site.jsx
try { (() => {
// Across the Table — Marketing website surfaces
const {
  Button,
  Badge,
  Card,
  Stat,
  Input,
  Select
} = window.AcrossTheTableDesignSystem_520822;
// Icon and PhotoFrame are global functions from assets/icons.jsx

const Wordmark = ({
  light
}) => /*#__PURE__*/React.createElement("a", {
  href: "#top",
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 11,
    textDecoration: 'none'
  }
}, /*#__PURE__*/React.createElement("svg", {
  width: "38",
  height: "38",
  viewBox: "0 0 48 48",
  "aria-label": "Across the Table"
}, /*#__PURE__*/React.createElement("rect", {
  x: "13",
  y: "21.5",
  width: "22",
  height: "5",
  rx: "2.5",
  fill: "#C8962E"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "10.5",
  cy: "24",
  r: "4.2",
  fill: light ? '#FBF8F2' : '#1B344F'
}), /*#__PURE__*/React.createElement("circle", {
  cx: "37.5",
  cy: "24",
  r: "4.2",
  fill: light ? '#FBF8F2' : '#1B344F'
})), /*#__PURE__*/React.createElement("span", {
  style: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1
  }
}, /*#__PURE__*/React.createElement("b", {
  style: {
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    letterSpacing: '-.02em',
    fontSize: 18,
    color: light ? '#fff' : 'var(--text-strong)'
  }
}, "Across the Table"), /*#__PURE__*/React.createElement("span", {
  style: {
    fontFamily: 'var(--font-mono)',
    fontSize: 8.5,
    fontWeight: 600,
    letterSpacing: '.16em',
    textTransform: 'uppercase',
    color: light ? 'var(--gold-400)' : 'var(--gold-700)',
    marginTop: 3
  }
}, "Small Business Consulting")));
function Header({
  onBook
}) {
  const [open, setOpen] = React.useState(false);
  const links = ['Services', 'Approach', 'Proof', 'Pricing'];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 30,
      background: 'rgba(251,248,242,.82)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border-default)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '14px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Wordmark, null), /*#__PURE__*/React.createElement("nav", {
    className: "att-desk-nav",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 30
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: '#' + l.toLowerCase(),
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--text-body)',
      textDecoration: 'none'
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "md",
    leftIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "phone",
      size: 17
    }),
    onClick: onBook
  }, "Book a free call"))));
}
function Hero({
  onBook
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '72px 32px 56px',
      display: 'grid',
      gridTemplateColumns: '1.05fr .95fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Badge, {
    tone: "accent",
    style: {
      marginBottom: 20
    }
  }, "Trusted by 120+ local businesses"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'clamp(38px, 5vw, 60px)',
      lineHeight: 1.04,
      letterSpacing: '-.025em',
      color: 'var(--text-strong)',
      margin: '0 0 20px'
    }
  }, "Sit across the table from an advisor who gets small business."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 19,
      lineHeight: 1.6,
      color: 'var(--text-body)',
      margin: '0 0 32px',
      maxWidth: 520
    }
  }, "Clear books, honest advice, and a plan you can actually follow \u2014 for owners who'd rather run their business than wrangle spreadsheets."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    rightIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 19
    }),
    onClick: onBook
  }, "Book a free call"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "lg",
    href: "#services",
    onClick: () => {}
  }, "See our services")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 26,
      color: 'var(--text-muted)',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 2,
      color: 'var(--gold-500)'
    }
  }, [0, 1, 2, 3, 4].map(i => /*#__PURE__*/React.createElement(Icon, {
    key: i,
    name: "star",
    size: 16,
    fillStar: true
  }))), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-strong)'
    }
  }, "4.9"), " from 80+ owner reviews"))), /*#__PURE__*/React.createElement(PhotoFrame, {
    label: "Owner at the table",
    style: {
      height: 440,
      boxShadow: 'var(--shadow-lg)'
    },
    radius: 18
  }));
}
const SERVICES = [{
  icon: 'calculator',
  eyebrow: 'Bookkeeping',
  title: 'Clean, current books',
  body: "Monthly bookkeeping done right, reconciled and explained — so you always know where you stand."
}, {
  icon: 'trending-up',
  eyebrow: 'Cash flow',
  title: '13-week cash planning',
  body: "We map cash flow weeks ahead so payroll, rent, and taxes are never a surprise."
}, {
  icon: 'shield-check',
  eyebrow: 'Tax & compliance',
  title: 'Filed on time, every time',
  body: "Quarterly estimates and year-end filings handled, with no last-minute scramble."
}, {
  icon: 'circle-dollar-sign',
  eyebrow: 'Advisory',
  title: 'A plan to grow',
  body: "Pricing, hiring, and reinvestment decisions made with someone who's seen it before."
}];
function Services() {
  return /*#__PURE__*/React.createElement("section", {
    id: "services",
    style: {
      background: 'var(--cream-100)',
      borderTop: '1px solid var(--border-default)',
      borderBottom: '1px solid var(--border-default)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '72px 32px'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      color: 'var(--gold-700)',
      margin: '0 0 12px'
    }
  }, "Our services"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 38,
      letterSpacing: '-.02em',
      color: 'var(--text-strong)',
      margin: '0 0 40px',
      maxWidth: 620
    }
  }, "Everything a small business needs to stay on top of its money."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 20
    }
  }, SERVICES.map(s => /*#__PURE__*/React.createElement(Card, {
    key: s.title,
    hover: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 46,
      height: 46,
      borderRadius: 12,
      background: 'var(--navy-050)',
      color: 'var(--navy-700)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: 24
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--gold-700)',
      margin: '0 0 6px'
    }
  }, s.eyebrow), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 19,
      color: 'var(--text-strong)',
      margin: '0 0 8px',
      letterSpacing: '-.01em'
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      lineHeight: 1.55,
      color: 'var(--text-body)',
      margin: 0
    }
  }, s.body))))));
}
const STEPS = [{
  n: '01',
  title: 'Sit down',
  body: 'A free call where we listen first — your business, your worries, your goals.'
}, {
  n: '02',
  title: 'Make a plan',
  body: 'A clear, written plan with the few moves that matter most this quarter.'
}, {
  n: '03',
  title: 'Stay on track',
  body: 'Monthly check-ins keep the numbers honest and the plan moving.'
}];
function Approach() {
  return /*#__PURE__*/React.createElement("section", {
    id: "approach",
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '76px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '.9fr 1.1fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      color: 'var(--gold-700)',
      margin: '0 0 12px'
    }
  }, "How it works"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 38,
      letterSpacing: '-.02em',
      color: 'var(--text-strong)',
      margin: '0 0 16px'
    }
  }, "No jargon. No surprises. Just a seat at the table."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.6,
      color: 'var(--text-body)',
      margin: 0,
      maxWidth: 440
    }
  }, "We keep it simple on purpose. You get a real person who knows your numbers and tells you the truth.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, STEPS.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.n,
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'flex-start',
      padding: '20px 24px',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: 14,
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 28,
      color: 'var(--gold-500)',
      lineHeight: 1,
      minWidth: 44
    }
  }, s.n), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 19,
      color: 'var(--text-strong)',
      margin: '0 0 4px'
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      lineHeight: 1.55,
      color: 'var(--text-body)',
      margin: 0
    }
  }, s.body)))))));
}
function ProofBand() {
  return /*#__PURE__*/React.createElement("section", {
    id: "proof",
    style: {
      background: 'var(--navy-900)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '64px 32px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1.4fr',
      gap: 40,
      alignItems: 'center'
    }
  }, [['$48M', 'Cash flow advised'], ['120+', 'Businesses served'], ['98%', 'Client retention']].map(([v, l]) => /*#__PURE__*/React.createElement("div", {
    key: l
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 46,
      letterSpacing: '-.02em',
      color: '#fff',
      lineHeight: 1
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: 'var(--text-on-dark-muted)',
      marginTop: 8
    }
  }, l))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.6,
      color: 'var(--text-on-dark)',
      margin: 0,
      borderLeft: '2px solid var(--gold-500)',
      paddingLeft: 22
    }
  }, "Real results for real owners \u2014 bakeries, contractors, clinics, and shops across the region.")));
}
function Testimonial() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '76px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.2fr',
      gap: 48,
      alignItems: 'center',
      background: 'var(--cream-100)',
      border: '1px solid var(--border-default)',
      borderRadius: 20,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(PhotoFrame, {
    label: "Client portrait",
    style: {
      height: 360
    },
    radius: 0
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 48px 12px 8px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 60,
      lineHeight: 0.6,
      color: 'var(--gold-500)',
      height: 36
    }
  }, "\u201C"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 25,
      lineHeight: 1.4,
      letterSpacing: '-.01em',
      color: 'var(--text-strong)',
      margin: '0 0 24px'
    }
  }, "For the first time in nine years, I know exactly what my bakery makes every week. They gave me my evenings back."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 48,
      height: 48,
      borderRadius: '50%',
      background: 'var(--forest-600)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-display)',
      fontWeight: 700
    }
  }, "MR"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, "Marisol Reyes"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--text-muted)'
    }
  }, "Owner, Reyes Family Bakery"))))));
}
function CTABand({
  onBook
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "pricing",
    style: {
      background: 'linear-gradient(135deg, var(--forest-700), var(--forest-600))'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 900,
      margin: '0 auto',
      padding: '72px 32px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 42,
      letterSpacing: '-.02em',
      color: '#fff',
      margin: '0 0 16px'
    }
  }, "Ready to get your numbers straight?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      lineHeight: 1.6,
      color: 'rgba(255,255,255,.85)',
      margin: '0 0 32px',
      maxWidth: 560,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }, "Book a free 30-minute call. No pitch, no pressure \u2014 just a clear next step for your business."), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    rightIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 19
    }),
    onClick: onBook
  }, "Book a free call")));
}
function Footer() {
  const cols = [['Services', ['Bookkeeping', 'Cash flow planning', 'Tax & compliance', 'Growth advisory']], ['Company', ['About us', 'Our approach', 'Careers', 'Contact']], ['Resources', ['Pricing', 'Client portal', 'Guides', 'FAQ']]];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--navy-950)',
      color: 'var(--text-on-dark)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '56px 32px 40px',
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Wordmark, {
    light: true
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: 1.6,
      color: 'var(--text-on-dark-muted)',
      margin: '18px 0 0',
      maxWidth: 260
    }
  }, "Plain-spoken financial advice for the businesses that hold our towns together.")), cols.map(([h, items]) => /*#__PURE__*/React.createElement("div", {
    key: h
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: '.04em',
      textTransform: 'uppercase',
      color: 'var(--gold-400)',
      margin: '0 0 16px'
    }
  }, h), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, items.map(i => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontSize: 14,
      color: 'var(--text-on-dark-muted)',
      textDecoration: 'none'
    }
  }, i))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-dark)',
      maxWidth: 1180,
      margin: '0 auto',
      padding: '20px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 13,
      color: 'var(--text-on-dark-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Across the Table Consulting LLC"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'inherit',
      textDecoration: 'none'
    }
  }, "Privacy"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'inherit',
      textDecoration: 'none'
    }
  }, "Terms"))));
}
function BookingModal({
  open,
  onClose
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      background: 'rgba(11,22,35,.55)',
      backdropFilter: 'blur(3px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: 'min(460px, 100%)',
      background: 'var(--surface-card)',
      borderRadius: 18,
      boxShadow: 'var(--shadow-xl)',
      padding: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 24,
      letterSpacing: '-.01em',
      color: 'var(--text-strong)',
      margin: 0
    }
  }, "Book a free call"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-muted)',
      padding: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 22
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      color: 'var(--text-muted)',
      margin: '0 0 22px'
    }
  }, "30 minutes, no pressure. We'll call you."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Your name",
    placeholder: "e.g. Marisol Reyes"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Business name",
    placeholder: "e.g. Reyes Family Bakery"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "What do you need help with?"
  }, /*#__PURE__*/React.createElement("option", null, "Bookkeeping"), /*#__PURE__*/React.createElement("option", null, "Cash flow planning"), /*#__PURE__*/React.createElement("option", null, "Tax & compliance"), /*#__PURE__*/React.createElement("option", null, "Growth advisory")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    rightIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 19
    }),
    onClick: onClose
  }, "Request my call"))));
}
function Site() {
  const [booking, setBooking] = React.useState(false);
  const open = () => setBooking(true);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-page)'
    }
  }, /*#__PURE__*/React.createElement(Header, {
    onBook: open
  }), /*#__PURE__*/React.createElement(Hero, {
    onBook: open
  }), /*#__PURE__*/React.createElement(Services, null), /*#__PURE__*/React.createElement(Approach, null), /*#__PURE__*/React.createElement(ProofBand, null), /*#__PURE__*/React.createElement(Testimonial, null), /*#__PURE__*/React.createElement(CTABand, {
    onBook: open
  }), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(BookingModal, {
    open: booking,
    onClose: () => setBooking(false)
  }));
}
window.Site = Site;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/site.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
