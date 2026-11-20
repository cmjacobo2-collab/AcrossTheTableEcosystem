/* StartWise — shell: icons, sidebar, topbar, shared bits */
const DSatt = window.AcrossTheTableDesignSystem_520822;

/* ---- Responsive: true on phones / small tablets ---- */
function useIsMobile(bp = 760) {
  const q = "(max-width:" + bp + "px)";
  const get = () => typeof window !== "undefined" && window.matchMedia ? window.matchMedia(q).matches : false;
  const [m, setM] = React.useState(get);
  React.useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia(q);
    const on = e => setM(e.matches);
    mq.addEventListener ? mq.addEventListener("change", on) : mq.addListener(on);
    setM(mq.matches);
    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", on) : mq.removeListener(on);
    };
  }, [q]);
  return m;
}

/* ---- Inline Lucide-style icon set (24x24, 2px stroke) ---- */
const ICONS = {
  dashboard: ["M3 3h7v9H3z", "M14 3h7v5h-7z", "M14 12h7v9h-7z", "M3 16h7v5H3z"],
  calendar: ["M3 4h18v18H3z", "M16 2v4", "M8 2v4", "M3 10h18", "M8 14h.01", "M12 14h.01", "M16 14h.01", "M8 18h.01", "M12 18h.01"],
  dollar: ["M12 2v20", "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"],
  chart: ["M3 3v18h18", "M18 17V9", "M13 17V5", "M8 17v-3"],
  runbook: ["M9 2h6v4H9z", "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2", "M9 12h6", "M9 16h6"],
  ledger: ["M4 3h16v18H4z", "M4 9h16", "M4 15h16", "M10 3v18"],
  briefcase: ["M2 7h20v14H2z", "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"],
  help: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3", "M12 17h.01"],
  plus: ["M5 12h14", "M12 5v14"],
  download: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M7 10l5 5 5-5", "M12 15V3"],
  x: ["M18 6 6 18", "M6 6l12 12"],
  pencil: ["M12 20h9", "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"],
  trash: ["M3 6h18", "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", "M10 11v6", "M14 11v6"],
  chevron: ["M6 9l6 6 6-6"],
  check: ["M20 6 9 17l-5-5"],
  search: ["M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z", "M21 21l-4.3-4.3"],
  arrowRight: ["M5 12h14", "M12 5l7 7-7 7"],
  logout: ["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", "M16 17l5-5-5-5", "M21 12H9"],
  printer: ["M6 9V2h12v7", "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2", "M6 14h12v8H6z"],
  file: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", "M14 2v6h6", "M16 13H8", "M16 17H8"],
  sliders: ["M4 21v-7", "M4 10V3", "M12 21v-9", "M12 8V3", "M20 21v-5", "M20 12V3", "M1 14h6", "M9 8h6", "M17 16h6"],
  sun: ["M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z", "M12 1v2", "M12 21v2", "M4.2 4.2l1.4 1.4", "M18.4 18.4l1.4 1.4", "M1 12h2", "M21 12h2", "M4.2 19.8l1.4-1.4", "M18.4 5.6l1.4-1.4"],
  lock: ["M5 11h14v10H5z", "M8 11V7a4 4 0 0 1 8 0v4"],
  bell: ["M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9", "M13.7 21a2 2 0 0 1-3.4 0"],
  flag: ["M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z", "M4 22v-7"],
  star: ["M12 2l3 7 7 .5-5.5 4.5L18 21l-6-4-6 4 1.5-7L2 9.5 9 9z"],
  user: ["M20 21a8 8 0 1 0-16 0", "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  mail: ["M4 4h16v16H4z", "M22 6l-10 7L2 6"],
  book: ["M4 19.5A2.5 2.5 0 0 1 6.5 17H20", "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"],
  sparkle: ["M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"],
  grip: ["M9 5h.01", "M9 12h.01", "M9 19h.01", "M15 5h.01", "M15 12h.01", "M15 19h.01"],
  shield: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"],
  scale: ["M12 3v18", "M5 7h14", "M7 7l-3 7h6z", "M17 7l-3 7h6z", "M8 21h8"],
  package: ["M12 2 3 7v10l9 5 9-5V7z", "M3 7l9 5 9-5", "M12 12v10"],
  trending: ["M3 17l6-6 4 4 8-8", "M21 7v6h-6"],
  wallet: ["M3 7a2 2 0 0 1 2-2h14v4", "M3 7v10a2 2 0 0 0 2 2h15V7z", "M17 13h.01"]
};
function Icon({
  name,
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  style
}) {
  const paths = ICONS[name] || [];
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: style,
    "aria-hidden": "true"
  }, paths.map((d, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: d
  })));
}

/* ---- Pills ---- */
function StatusPill({
  status,
  followUp
}) {
  const map = {
    "To Do": {
      bg: "var(--ink-100)",
      fg: "var(--ink-600)"
    },
    "In Progress": {
      bg: "var(--info-bg)",
      fg: "var(--info)"
    },
    "Follow-Up": {
      bg: "var(--gold-050)",
      fg: "var(--gold-700)"
    },
    "Completed": {
      bg: "var(--success-bg)",
      fg: "var(--success)"
    }
  };
  const s = map[status] || map["To Do"];
  const label = status === "Follow-Up" && followUp ? "Follow-Up · " + followUp.slice(5) : status;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      background: s.bg,
      color: s.fg,
      fontSize: 11,
      fontWeight: 600,
      padding: "3px 10px",
      borderRadius: 999,
      whiteSpace: "nowrap"
    }
  }, label);
}
function PriorityPill({
  p
}) {
  const map = {
    High: "var(--red-600)",
    Medium: "var(--gold-700)",
    Low: "var(--ink-500)"
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      fontSize: 12,
      color: map[p],
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 999,
      background: map[p]
    }
  }), p);
}
function TypeTag({
  type
}) {
  const fin = type === "Financial";
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      padding: "2px 8px",
      borderRadius: 6,
      background: fin ? "var(--forest-050)" : "var(--navy-050)",
      color: fin ? "var(--forest-700)" : "var(--navy-600)"
    }
  }, fin ? "Financial" : "Operational");
}

/* ---- Callout (gold/cream info box) ---- */
function Callout({
  children,
  icon = "sparkle",
  title
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      background: "var(--gold-050)",
      border: "1px solid var(--gold-100)",
      borderRadius: "var(--radius-md)",
      padding: "14px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--gold-700)",
      flexShrink: 0,
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: "var(--ink-700)",
      lineHeight: 1.5
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      color: "var(--ink-900)",
      marginBottom: 2
    }
  }, title), children));
}

/* ---- Card surface ---- */
function Panel({
  title,
  subtitle,
  right,
  children,
  pad = 24,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(152deg, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.66) 46%, rgba(244,239,229,0.58) 100%)",
      backdropFilter: "blur(14px) saturate(125%)",
      WebkitBackdropFilter: "blur(14px) saturate(125%)",
      border: "1px solid rgba(255,255,255,0.65)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9), inset 0 0 0 1px rgba(224,217,203,0.35), 0 1px 2px rgba(20,40,63,0.05), 0 14px 30px -14px rgba(20,40,63,0.20)",
      ...style
    }
  }, (title || right) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 16,
      padding: `${pad}px ${pad}px 0`
    }
  }, /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "700 17px var(--font-display)",
      color: "var(--ink-900)",
      letterSpacing: "-0.01em"
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--ink-500)",
      marginTop: 3
    }
  }, subtitle)), right), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: pad
    }
  }, children));
}

/* ---- Sidebar ---- */
const NAV = [{
  group: "Overview",
  items: [{
    id: "dashboard",
    label: "Dashboard",
    icon: "dashboard"
  }, {
    id: "plan",
    label: "12-Week Plan",
    icon: "calendar"
  }]
}, {
  group: "Financials",
  items: [{
    id: "budget",
    label: "Budget Planner",
    icon: "dollar"
  }, {
    id: "products",
    label: "Products & Services",
    icon: "package"
  }, {
    id: "revenue",
    label: "Revenue Planner",
    icon: "trending"
  }, {
    id: "cashflow",
    label: "Cash Flow",
    icon: "wallet"
  }, {
    id: "reports",
    label: "Reports",
    icon: "chart"
  }, {
    id: "coa",
    label: "Chart of Accounts",
    icon: "ledger"
  }]
}, {
  group: "Operations",
  items: [{
    id: "runbook",
    label: "Vendors & RunBook",
    icon: "runbook"
  }]
}, {
  group: "Settings",
  items: [{
    id: "business",
    label: "Business Info",
    icon: "briefcase"
  }, {
    id: "legal",
    label: "Legal & Compliance",
    icon: "scale"
  }]
}, {
  group: "Learn",
  items: [{
    id: "knowledge",
    label: "Knowledge Center",
    icon: "help"
  }]
}];
function Sidebar({
  route,
  setRoute,
  accent,
  business,
  edition,
  mobile,
  open,
  onClose
}) {
  const pos = mobile ? {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 80,
    transform: open ? "translateX(0)" : "translateX(-110%)",
    transition: "transform .25s var(--ease-out)",
    boxShadow: open ? "0 24px 56px rgba(11,22,35,0.45)" : "none"
  } : {
    position: "sticky",
    top: 0
  };
  const go = id => {
    setRoute(id);
    if (mobile && onClose) onClose();
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, mobile && open && /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(9,29,48,0.5)",
      zIndex: 75
    },
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 248,
      flexShrink: 0,
      background: "var(--navy-900)",
      color: "var(--text-on-dark)",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      ...pos
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 18px 16px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12,
      borderBottom: "1px solid var(--border-dark)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      background: "#fff",
      borderRadius: 12,
      padding: "12px 16px",
      display: "grid",
      placeItems: "center",
      boxShadow: "0 1px 3px rgba(0,0,0,0.18)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.logo || "logo.png",
    alt: "Across the Table",
    style: {
      width: "100%",
      maxWidth: 150,
      display: "block"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "800 21px var(--font-display)",
      letterSpacing: "-0.02em"
    }
  }, "StartWise"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 9.5px var(--font-mono)",
      letterSpacing: "0.14em",
      color: "var(--text-on-dark-muted)",
      marginTop: 3
    }
  }, "STARTUP LAUNCH PLANNER"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "var(--gold-400)",
      marginTop: 4
    }
  }, edition))), /*#__PURE__*/React.createElement("nav", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "14px 12px"
    }
  }, NAV.map(sec => /*#__PURE__*/React.createElement("div", {
    key: sec.group,
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "600 9.5px var(--font-mono)",
      letterSpacing: "0.14em",
      color: "var(--text-on-dark-muted)",
      padding: "0 10px 7px"
    }
  }, sec.group.toUpperCase()), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, sec.items.map(it => {
    const active = route === it.id;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      onClick: () => go(it.id),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 11,
        padding: "9px 10px",
        borderRadius: "var(--radius-md)",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        font: "500 14px var(--font-sans)",
        background: active ? accent : "transparent",
        color: active ? "#fff" : "var(--text-on-dark)",
        transition: "background .13s, color .13s"
      },
      onMouseEnter: e => {
        if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.07)";
      },
      onMouseLeave: e => {
        if (!active) e.currentTarget.style.background = "transparent";
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: it.icon,
      size: 18,
      color: active ? "#fff" : "var(--gold-400)"
    }), it.label);
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-dark)",
      padding: "14px 18px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700
    }
  }, business.businessName), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--text-on-dark-muted)"
    }
  }, business.businessType), /*#__PURE__*/React.createElement("a", {
    href: "mailto:info@acrossthetable.biz",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      marginTop: 12,
      fontSize: 11.5,
      color: "var(--gold-400)",
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail",
    size: 14
  }), " acrossthetable.biz"))));
}

/* ---- TopBar ---- */
const iconBtnTop = {
  display: "grid",
  placeItems: "center",
  width: 38,
  height: 38,
  background: "var(--surface-card)",
  color: "var(--ink-700)",
  border: "1px solid var(--border-default)",
  borderRadius: "var(--radius-md)",
  cursor: "pointer",
  flexShrink: 0
};
function TopBar({
  title,
  user,
  onAddTask,
  onLibrary,
  onExport,
  onSignOut,
  onTweaks,
  onMenu,
  mobile
}) {
  const {
    Avatar
  } = DSatt;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: mobile ? 8 : 16,
      padding: "14px 28px",
      background: "rgba(251,248,242,0.86)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      borderBottom: "1px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      minWidth: 0
    }
  }, mobile && /*#__PURE__*/React.createElement("button", {
    onClick: onMenu,
    title: "Menu",
    "aria-label": "Open menu",
    style: iconBtnTop
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "grip",
    size: 18
  })), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: (mobile ? "700 17px" : "700 22px") + " var(--font-display)",
      color: "var(--ink-900)",
      letterSpacing: "-0.02em",
      margin: 0,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, title)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: mobile ? 6 : 10,
      flexShrink: 0
    }
  }, !mobile && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      padding: "5px 12px 5px 6px",
      background: "var(--surface-card)",
      border: "1px solid var(--border-default)",
      borderRadius: 999
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: user.name,
    size: "sm"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1.15
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "var(--ink-900)"
    }
  }, user.name)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9.5,
      fontWeight: 700,
      letterSpacing: "0.08em",
      color: "var(--gold-700)",
      background: "var(--gold-050)",
      padding: "2px 7px",
      borderRadius: 999
    }
  }, user.role.toUpperCase()), /*#__PURE__*/React.createElement("button", {
    onClick: onSignOut,
    title: "Sign out",
    style: {
      display: "flex",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "var(--ink-400)",
      padding: 2
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "logout",
    size: 16
  }))), !mobile && /*#__PURE__*/React.createElement("button", {
    onClick: onExport,
    style: btnGhost
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    size: 16
  }), " Export CSV"), !mobile && onLibrary && /*#__PURE__*/React.createElement("button", {
    onClick: onLibrary,
    style: btnGhost
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "book",
    size: 16
  }), " Task library"), !mobile && /*#__PURE__*/React.createElement("button", {
    onClick: onAddTask,
    style: btnPrimary
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 16
  }), " Add Task"), mobile && /*#__PURE__*/React.createElement("button", {
    onClick: onExport,
    title: "Export CSV",
    "aria-label": "Export CSV",
    style: iconBtnTop
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    size: 17
  })), mobile && onLibrary && /*#__PURE__*/React.createElement("button", {
    onClick: onLibrary,
    title: "Task library",
    "aria-label": "Task library",
    style: iconBtnTop
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "book",
    size: 17
  })), mobile && /*#__PURE__*/React.createElement("button", {
    onClick: onAddTask,
    title: "Add task",
    "aria-label": "Add task",
    style: {
      ...btnPrimary,
      padding: "10px 12px"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 17
  })), mobile && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "4px 6px 4px 4px",
      background: "var(--surface-card)",
      border: "1px solid var(--border-default)",
      borderRadius: 999
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: user.name,
    size: "sm"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: onSignOut,
    title: "Sign out",
    "aria-label": "Sign out",
    style: {
      display: "flex",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "var(--ink-400)",
      padding: 2
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "logout",
    size: 16
  })))));
}
const btnPrimary = {
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  padding: "9px 16px",
  background: "var(--forest-600)",
  color: "#fff",
  border: "none",
  borderRadius: "var(--radius-md)",
  font: "600 13.5px var(--font-sans)",
  cursor: "pointer",
  transition: "background .13s"
};
const btnGhost = {
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  padding: "9px 14px",
  background: "var(--surface-card)",
  color: "var(--ink-700)",
  border: "1px solid var(--border-default)",
  borderRadius: "var(--radius-md)",
  font: "600 13.5px var(--font-sans)",
  cursor: "pointer",
  transition: "background .13s"
};
const btnOutline = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "7px 13px",
  background: "transparent",
  color: "var(--navy-700)",
  border: "1px solid var(--border-strong)",
  borderRadius: "var(--radius-md)",
  font: "600 12.5px var(--font-sans)",
  cursor: "pointer"
};
Object.assign(window, {
  Icon,
  StatusPill,
  PriorityPill,
  TypeTag,
  Callout,
  Panel,
  Sidebar,
  TopBar,
  btnPrimary,
  btnGhost,
  btnOutline,
  iconBtnTop,
  NAV,
  useIsMobile
});