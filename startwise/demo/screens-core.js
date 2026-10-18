/* StartWise — core screens: Dashboard, 12-Week Plan, Budget Planner */
const {
  useState: useS,
  useMemo: useM
} = React;
const SW = window.StartWiseData;
const DScore = window.AcrossTheTableDesignSystem_520822;

/* ---------- shared KPI card ---------- */
function Kpi({
  label,
  value,
  accent,
  sub,
  tone
}) {
  const col = tone === "good" ? "var(--forest-600)" : tone === "warn" ? "var(--gold-700)" : "var(--ink-900)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-sm)",
      padding: "16px 18px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "600 9.5px var(--font-mono)",
      letterSpacing: "0.1em",
      color: "var(--ink-500)"
    }
  }, label.toUpperCase()), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "800 27px var(--font-display)",
      color: col,
      marginTop: 8,
      letterSpacing: "-0.02em"
    }
  }, value), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "var(--ink-400)",
      marginTop: 2
    }
  }, sub));
}

/* =========================================================== DASHBOARD */
function Dashboard({
  tasks,
  totalBudget,
  affirmation,
  smsOn,
  products = [],
  startingBalance = 0
}) {
  const m = useM(() => {
    const fin = tasks.filter(t => t.type === "Financial");
    const done = tasks.filter(t => t.status === "Completed").length;
    const prog = tasks.filter(t => t.status === "In Progress").length;
    const todo = tasks.filter(t => t.status === "To Do").length;
    const est = fin.reduce((s, t) => s + (+t.est || 0), 0);
    const act = fin.reduce((s, t) => s + (+t.actual || 0), 0);
    const byCat = {};
    fin.forEach(t => {
      byCat[t.category] = (byCat[t.category] || 0) + (+t.est || 0);
    });
    const cats = Object.entries(byCat).sort((a, b) => b[1] - a[1]);
    const phases = [[1, 3], [4, 6], [7, 9], [10, 12]];
    const timeline = phases.map(([a, b], i) => ({
      label: `Wk ${a}\u2013${b}`,
      bars: [{
        value: fin.filter(t => t.week >= a && t.week <= b).reduce((s, t) => s + (+t.est || 0), 0),
        color: "var(--navy-600)"
      }, {
        value: fin.filter(t => t.week >= a && t.week <= b).reduce((s, t) => s + (+t.actual || 0), 0),
        color: "var(--gold-500)"
      }]
    }));
    const prio = ["High", "Medium", "Low"].map((p, i) => ({
      label: p,
      bars: [{
        value: fin.filter(t => t.priority === p).reduce((s, t) => s + (+t.est || 0), 0),
        color: ["var(--red-600)", "var(--gold-500)", "var(--forest-500)"][i]
      }]
    }));
    return {
      fin,
      done,
      prog,
      todo,
      est,
      act,
      cats,
      timeline,
      prio
    };
  }, [tasks]);
  const remaining = totalBudget - m.act;
  const pctUsed = totalBudget ? Math.round(m.act / totalBudget * 100) : 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Callout, {
    icon: "flag",
    title: "You're 2 weeks into your launch."
  }, "Keep marking tasks done \u2014 every completed financial task posts its actual cost here and into your Chart of Accounts automatically."), products.length > 0 && /*#__PURE__*/React.createElement(HealthScore, {
    products: products,
    startingBalance: startingBalance,
    compact: true
  }), affirmation && affirmation.text && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      alignItems: "flex-start",
      background: "var(--navy-900)",
      borderRadius: "var(--radius-lg)",
      padding: "18px 22px",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkle",
    size: 20,
    color: "var(--gold-400)",
    style: {
      flexShrink: 0,
      marginTop: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "600 9.5px var(--font-mono)",
      letterSpacing: "0.12em",
      color: "var(--gold-400)"
    }
  }, "TODAY'S AFFIRMATION \xB7 ", (affirmation.title || "").toUpperCase()), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "600 17px var(--font-display)",
      marginTop: 6,
      lineHeight: 1.4
    }
  }, affirmation.text), smsOn && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-on-dark-muted)",
      marginTop: 8,
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 13
  }), " Sent to your phone with today's daily SMS reminder"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Kpi, {
    label: "Total tasks",
    value: tasks.length
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "Completed",
    value: m.done,
    tone: "good",
    sub: `${m.prog} in progress · ${m.todo} to do`
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "Estimated spend",
    value: SW.fmt0(m.est)
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "Actual spend",
    value: SW.fmt0(m.act),
    tone: "warn"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Kpi, {
    label: "Total budget",
    value: SW.fmt0(totalBudget)
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "Remaining budget",
    value: SW.fmt0(remaining),
    tone: "good"
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "% budget used",
    value: pctUsed + "%",
    sub: `${SW.fmt0(m.act)} of ${SW.fmt0(totalBudget)}`
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "Budget allocation",
    subtitle: "Estimated spend by category"
  }, /*#__PURE__*/React.createElement(Donut, {
    data: m.cats.map(([label, value], i) => ({
      label,
      short: label.split(" ")[0],
      value,
      display: SW.fmt0(value),
      color: SW.catColors[label] || SW.palette[i % SW.palette.length]
    })),
    centerTop: SW.fmt0(m.est),
    centerBottom: "Est. spend"
  })), /*#__PURE__*/React.createElement(Panel, {
    title: "Spend timeline",
    subtitle: "Planned vs actual by phase"
  }, /*#__PURE__*/React.createElement(BarChart, {
    groups: m.timeline,
    legend: [{
      label: "Planned",
      color: "var(--navy-600)"
    }, {
      label: "Actual",
      color: "var(--gold-500)"
    }]
  })), /*#__PURE__*/React.createElement(Panel, {
    title: "Spending by priority",
    subtitle: "Estimated cost grouped by priority"
  }, /*#__PURE__*/React.createElement(BarChart, {
    groups: m.prio
  })), /*#__PURE__*/React.createElement(Panel, {
    title: "Task completion",
    subtitle: "Status breakdown across all tasks"
  }, /*#__PURE__*/React.createElement(Donut, {
    data: [{
      label: "Completed",
      value: m.done,
      color: "var(--forest-600)"
    }, {
      label: "In progress",
      value: m.prog,
      color: "var(--navy-500)"
    }, {
      label: "To do",
      value: m.todo,
      color: "var(--ink-200)"
    }],
    centerTop: `${Math.round(m.done / tasks.length * 100)}%`,
    centerBottom: "Complete"
  }))));
}

/* =========================================================== 12-WEEK PLAN */
function Plan({
  tasks,
  setTasks,
  openEdit
}) {
  const [open, setOpen] = useS(() => new Set([1, 2]));
  const toggle = w => {
    const n = new Set(open);
    n.has(w) ? n.delete(w) : n.add(w);
    setOpen(n);
  };
  const done = tasks.filter(t => t.status === "Completed").length;
  const prog = tasks.filter(t => t.status === "In Progress").length;
  const todo = tasks.filter(t => t.status === "To Do").length;
  const pct = Math.round(done / tasks.length * 100);
  const cycle = t => {
    const order = ["To Do", "In Progress", "Completed"];
    const next = order[(order.indexOf(t.status) + 1) % 3];
    setTasks(tasks.map(x => x.id === t.id ? {
      ...x,
      status: next
    } : x));
  };
  const moveWeek = (t, w) => setTasks(tasks.map(x => x.id === t.id ? {
    ...x,
    week: +w,
    due: SW.due(+w)
  } : x));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    pad: 22
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "600 10px var(--font-mono)",
      letterSpacing: "0.12em",
      color: "var(--ink-500)"
    }
  }, "OVERALL LAUNCH PROGRESS"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--ink-500)",
      marginTop: 4
    }
  }, "Your complete 12-week roadmap, backward from ", SW.business.launchDate, ". Click a week to expand.")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "800 34px var(--font-display)",
      color: "var(--forest-600)"
    }
  }, pct, "%")), /*#__PURE__*/React.createElement(ProgressBar, {
    value: pct,
    height: 10
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 28,
      marginTop: 16
    }
  }, [["Completed", done, "var(--forest-600)"], ["In progress", prog, "var(--navy-500)"], ["To do", todo, "var(--ink-500)"], ["Total tasks", tasks.length, "var(--ink-900)"]].map(([l, v, c]) => /*#__PURE__*/React.createElement("div", {
    key: l
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "800 22px var(--font-display)",
      color: c
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "600 9.5px var(--font-mono)",
      letterSpacing: "0.1em",
      color: "var(--ink-500)"
    }
  }, l.toUpperCase()))))), Array.from({
    length: 12
  }, (_, i) => i + 1).map(w => {
    const wt = tasks.filter(t => t.week === w);
    const wd = wt.filter(t => t.status === "Completed").length;
    const isOpen = open.has(w);
    return /*#__PURE__*/React.createElement("div", {
      key: w,
      style: {
        background: "#fff",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-sm)",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => toggle(w),
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "16px 22px",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        textAlign: "left"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 38,
        height: 38,
        borderRadius: 10,
        background: wd === wt.length && wt.length ? "var(--forest-050)" : "var(--cream-100)",
        display: "grid",
        placeItems: "center",
        font: "800 14px var(--font-display)",
        color: wd === wt.length && wt.length ? "var(--forest-600)" : "var(--navy-700)",
        flexShrink: 0
      }
    }, w), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: "600 10px var(--font-mono)",
        letterSpacing: "0.1em",
        color: "var(--gold-700)"
      }
    }, "WEEK ", w), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "700 15.5px var(--font-display)",
        color: "var(--ink-900)"
      }
    }, SW.weekThemes[w])), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12.5,
        color: "var(--ink-500)",
        marginTop: 2
      }
    }, wt.length ? `${wd}/${wt.length} done` : "No tasks scheduled")), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 90
      }
    }, /*#__PURE__*/React.createElement(ProgressBar, {
      value: wt.length ? wd / wt.length * 100 : 0
    })), /*#__PURE__*/React.createElement(Icon, {
      name: "chevron",
      size: 18,
      color: "var(--ink-400)",
      style: {
        transform: isOpen ? "rotate(180deg)" : "none",
        transition: "transform .2s"
      }
    })), isOpen && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 22px 18px",
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, wt.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "var(--ink-400)",
        padding: "8px 0"
      }
    }, "Nothing here yet \u2014 add a task to this week."), wt.map(t => /*#__PURE__*/React.createElement("div", {
      key: t.id,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "11px 14px",
        background: "var(--cream-50)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-md)"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => cycle(t),
      title: "Toggle status",
      style: {
        width: 22,
        height: 22,
        borderRadius: 6,
        border: `2px solid ${t.status === "Completed" ? "var(--forest-600)" : t.status === "In Progress" ? "var(--navy-500)" : "var(--ink-300)"}`,
        background: t.status === "Completed" ? "var(--forest-600)" : "transparent",
        cursor: "pointer",
        display: "grid",
        placeItems: "center",
        flexShrink: 0
      }
    }, t.status === "Completed" && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 13,
      color: "#fff"
    }), t.status === "In Progress" && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: 999,
        background: "var(--navy-500)"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: "var(--ink-900)",
        textDecoration: t.status === "Completed" ? "line-through" : "none",
        textDecorationColor: "var(--ink-300)"
      }
    }, t.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "var(--ink-500)",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, t.desc)), /*#__PURE__*/React.createElement(TypeTag, {
      type: t.type
    }), /*#__PURE__*/React.createElement(PriorityPill, {
      p: t.priority
    }), t.type === "Financial" && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 12.5,
        color: "var(--ink-600)",
        minWidth: 64,
        textAlign: "right"
      }
    }, SW.fmt0(t.est)), /*#__PURE__*/React.createElement("select", {
      value: t.week,
      onChange: e => moveWeek(t, e.target.value),
      title: "Move to week",
      style: {
        fontSize: 12,
        padding: "4px 6px",
        border: "1px solid var(--border-default)",
        borderRadius: 6,
        background: "#fff",
        color: "var(--ink-600)"
      }
    }, Array.from({
      length: 12
    }, (_, k) => k + 1).map(k => /*#__PURE__*/React.createElement("option", {
      key: k,
      value: k
    }, "Wk ", k))), /*#__PURE__*/React.createElement("button", {
      onClick: () => openEdit(t),
      style: {
        border: "none",
        background: "transparent",
        cursor: "pointer",
        color: "var(--ink-400)",
        padding: 4
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "pencil",
      size: 15
    }))))));
  }));
}

/* =========================================================== BUDGET PLANNER */
function Budget({
  tasks,
  setTasks,
  openEdit,
  role
}) {
  const [cat, setCat] = useS("All");
  const [stat, setStat] = useS("All");
  const [q, setQ] = useS("");
  const fin = tasks.filter(t => t.type === "Financial");
  const cats = ["All", ...Array.from(new Set(fin.map(t => t.category)))];
  const rows = fin.filter(t => (cat === "All" || t.category === cat) && (stat === "All" || t.status === stat) && t.name.toLowerCase().includes(q.toLowerCase()));
  const totEst = rows.reduce((s, t) => s + (+t.est || 0), 0);
  const totAct = rows.reduce((s, t) => s + (+t.actual || 0), 0);
  const del = id => setTasks(tasks.filter(t => t.id !== id));
  const sel = {
    padding: "8px 12px",
    border: "1px solid var(--border-default)",
    borderRadius: "var(--radius-md)",
    fontSize: 13,
    background: "#fff",
    color: "var(--ink-700)"
  };
  return /*#__PURE__*/React.createElement(Panel, {
    title: "All expenses",
    subtitle: `${rows.length} financial tasks linked to your Chart of Accounts`,
    right: /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "0 10px",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-md)",
        background: "#fff"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 15,
      color: "var(--ink-400)"
    }), /*#__PURE__*/React.createElement("input", {
      value: q,
      onChange: e => setQ(e.target.value),
      placeholder: "Search expenses",
      style: {
        border: "none",
        outline: "none",
        fontSize: 13,
        padding: "8px 0",
        width: 130,
        background: "transparent"
      }
    })), /*#__PURE__*/React.createElement("select", {
      value: cat,
      onChange: e => setCat(e.target.value),
      style: sel
    }, cats.map(c => /*#__PURE__*/React.createElement("option", {
      key: c
    }, c === "All" ? "All categories" : c))), /*#__PURE__*/React.createElement("select", {
      value: stat,
      onChange: e => setStat(e.target.value),
      style: sel
    }, ["All", ...SW.STATUSES].map(s => /*#__PURE__*/React.createElement("option", {
      key: s
    }, s === "All" ? "All statuses" : s))))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13.5
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      textAlign: "left"
    }
  }, ["Expense", "Category", "Priority", "Status", "Est. cost", "Actual", "Difference", "Due", ""].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: h + i,
    style: {
      font: "600 10px var(--font-mono)",
      letterSpacing: "0.08em",
      color: "var(--ink-500)",
      padding: "0 12px 10px",
      textAlign: i >= 4 && i <= 6 ? "right" : "left",
      whiteSpace: "nowrap"
    }
  }, h.toUpperCase())))), /*#__PURE__*/React.createElement("tbody", null, rows.map(t => {
    const diff = (+t.actual || 0) - (+t.est || 0);
    return /*#__PURE__*/React.createElement("tr", {
      key: t.id,
      style: {
        borderTop: "1px solid var(--border-subtle)"
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "13px 12px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        color: "var(--ink-900)"
      }
    }, t.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: "var(--ink-400)",
        fontFamily: "var(--font-mono)"
      }
    }, "GL ", t.gl, " \xB7 Wk ", t.week)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "13px 12px",
        color: "var(--ink-600)"
      }
    }, t.category), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "13px 12px"
      }
    }, /*#__PURE__*/React.createElement(PriorityPill, {
      p: t.priority
    })), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "13px 12px"
      }
    }, /*#__PURE__*/React.createElement(StatusPill, {
      status: t.status,
      followUp: t.followUp
    })), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "13px 12px",
        textAlign: "right",
        fontFamily: "var(--font-mono)"
      }
    }, SW.fmt(t.est)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "13px 12px",
        textAlign: "right",
        fontFamily: "var(--font-mono)",
        color: t.actual ? "var(--ink-900)" : "var(--ink-300)"
      }
    }, SW.fmt(t.actual)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "13px 12px",
        textAlign: "right",
        fontFamily: "var(--font-mono)",
        color: diff > 0 ? "var(--red-600)" : diff < 0 ? "var(--forest-600)" : "var(--ink-300)"
      }
    }, t.actual ? (diff > 0 ? "+" : "") + SW.fmt(diff) : "—"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "13px 12px",
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: "var(--ink-500)",
        whiteSpace: "nowrap"
      }
    }, t.due || "—"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "13px 12px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 4,
        justifyContent: "flex-end"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => openEdit(t),
      title: "Edit",
      style: iconBtn
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "pencil",
      size: 15
    })), role === "Admin" && /*#__PURE__*/React.createElement("button", {
      onClick: () => del(t.id),
      title: "Delete",
      style: {
        ...iconBtn,
        color: "var(--red-600)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      size: 15
    })))));
  })), /*#__PURE__*/React.createElement("tfoot", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      borderTop: "2px solid var(--border-strong)"
    }
  }, /*#__PURE__*/React.createElement("td", {
    colSpan: 4,
    style: {
      padding: "14px 12px",
      fontWeight: 700,
      color: "var(--ink-900)"
    }
  }, "Total (financial tasks)"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "14px 12px",
      textAlign: "right",
      fontFamily: "var(--font-mono)",
      fontWeight: 700
    }
  }, SW.fmt(totEst)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "14px 12px",
      textAlign: "right",
      fontFamily: "var(--font-mono)",
      fontWeight: 700
    }
  }, SW.fmt(totAct)), /*#__PURE__*/React.createElement("td", {
    colSpan: 3
  }))))), role !== "Admin" && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(Callout, {
    icon: "lock"
  }, "As a team member you can add and edit expenses, but only the admin can delete them.")));
}
const iconBtn = {
  display: "grid",
  placeItems: "center",
  width: 30,
  height: 30,
  border: "1px solid var(--border-default)",
  borderRadius: 8,
  background: "#fff",
  cursor: "pointer",
  color: "var(--ink-600)"
};
Object.assign(window, {
  Dashboard,
  Plan,
  Budget,
  Kpi
});