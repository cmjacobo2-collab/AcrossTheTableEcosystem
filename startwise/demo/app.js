/* StartWise — root app: state, routing, tweaks, cross-screen flows */
const {
  useState: useApp,
  useMemo: useAppM,
  useRef,
  useEffect: useAppE
} = React;
const SWa = window.StartWiseData;
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#246049",
  "density": "comfortable"
} /*EDITMODE-END*/;
const ACCENTS = ["#246049", "#1B344F", "#C8962E", "#34597A"];
const ROUTE_TITLES = {
  dashboard: "Dashboard",
  plan: "12-Week Launch Plan",
  budget: "Budget Planner",
  products: "Products & Services",
  revenue: "Revenue Planner",
  cashflow: "Cash Flow Planner",
  reports: "Reports",
  runbook: "Vendors & RunBook",
  coa: "Chart of Accounts",
  business: "Business Info",
  knowledge: "Knowledge Center",
  legal: "Legal & Compliance"
};
function expenseToTask(e, i) {
  const wk = Math.min(12, Math.max(1, +e.week || 1));
  return {
    id: "g" + i + "_" + Math.floor(Math.random() * 9999),
    name: e.name,
    desc: e.desc || "",
    type: "Financial",
    category: e.category || "Equipment & Assets",
    priority: e.priority || "Medium",
    est: +e.est || 0,
    actual: 0,
    week: wk,
    due: SWa.due(wk),
    status: "To Do",
    gl: String(e.gl || ""),
    vendorType: e.vendorType || ""
  };
}
function makeVendor(t) {
  return {
    id: "v" + Date.now() + Math.floor(Math.random() * 999),
    taskName: t.name,
    vendorName: t.vendor || "New vendor — " + t.name,
    category: "Supplier",
    status: "Pending",
    contact: "",
    phone: "",
    email: "",
    website: t.vendorWebsite || "",
    service: t.name,
    contractStart: new Date().toISOString().slice(0, 10),
    renewal: "—",
    lastOrder: new Date().toISOString().slice(0, 10),
    nextOrder: "—",
    terms: t.vendorType || "",
    cost: +t.actual || +t.est || 0,
    rating: 0,
    gl: t.gl,
    notes: t.vendor ? "Chosen from your vendor list when this task was completed. Add contact details." : "Auto-created when this financial task was marked Done. Add the vendor details."
  };
}
function Tour({
  onClose
}) {
  const steps = [["Navigate", "Use the left sidebar to move between your dashboard, planner, budget, reports, RunBook, and accounts."], ["Dashboard", "Your live launch scorecard — tasks, spend, and budget health update as you work."], ["Account setup", "Set your business profile and funding in Business Info. Identity locks after 15 days."], ["Budget setup", "Funding sources roll up to your total startup budget and runway."], ["12-week planner", "Work week by week. Check off tasks and move them as plans change."], ["Reports & resources", "Track budget health and tap the Knowledge Center for AI prompts and the blueprint series."]];
  const [i, setI] = useApp(0);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(14,27,44,0.5)",
      zIndex: 70,
      display: "grid",
      placeItems: "center",
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: "100%",
      maxWidth: 460,
      background: "#fff",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-card-hover)",
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "600 10px var(--font-mono)",
      letterSpacing: "0.12em",
      color: "var(--gold-700)"
    }
  }, "TOUR \xB7 ", i + 1, " OF ", steps.length), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "var(--ink-400)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 18
  }))), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "800 23px var(--font-display)",
      margin: "0 0 8px",
      color: "var(--ink-900)"
    }
  }, steps[i][0]), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14.5,
      color: "var(--ink-600)",
      lineHeight: 1.55,
      margin: "0 0 22px"
    }
  }, steps[i][1]), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      marginBottom: 20
    }
  }, steps.map((_, k) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      flex: 1,
      height: 4,
      borderRadius: 999,
      background: k <= i ? "var(--forest-600)" : "var(--cream-100)"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => i === 0 ? onClose() : setI(i - 1),
    style: btnGhost
  }, i === 0 ? "Skip" : "Back"), /*#__PURE__*/React.createElement("button", {
    onClick: () => i === steps.length - 1 ? onClose() : setI(i + 1),
    style: btnPrimary
  }, i === steps.length - 1 ? "Done" : "Next", " ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrowRight",
    size: 15
  })))));
}
/* Says, quietly, that their work is kept. It only speaks up when there is
   something worth knowing - and it names where the work went, because
   "saved" alone does not tell you whether a new phone would still have it. */
function SaveNotice({
  state
}) {
  const wording = {
    pending: "Saving\u2026",
    saving: "Saving\u2026",
    saved: "Saved to your account",
    offline: "Saved on this device \u2014 will sync when you're back online"
  };
  const text = wording[state];
  if (!text) return null;
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    "aria-live": "polite",
    style: {
      marginTop: 28,
      fontSize: 12.5,
      color: state === "offline" ? "#8A6D1F" : "#6B7A88",
      display: "flex",
      alignItems: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: state === "saved" ? "#2F7558" : state === "offline" ? "#C8962E" : "#9AA8B4",
      flex: "none"
    }
  }), text);
}
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [phase, setPhase] = useApp(window.SW_DEMO ? "app" : "login"); // login | onboarding | app
  const [route, setRoute] = useApp("dashboard");
  const [tasks, setTasks] = useApp(SWa.tasks);
  const [coa, setCoa] = useApp(window.StartWiseSource && window.StartWiseSource.coaMaster || SWa.coa);
  const [vendors, setVendors] = useApp(SWa.vendors);
  const [products, setProducts] = useApp(window.StartWiseBiz && window.StartWiseBiz.products || []);
  const [editingProduct, setEditingProduct] = useApp(null);
  const [business, setBusiness] = useApp(SWa.business);
  const [funding, setFunding] = useApp(SWa.funding);
  const [user, setUser] = useApp({
    name: window.SW_DEMO ? "Dana Rivera" : "",
    role: "Admin"
  });
  const [editing, setEditing] = useApp(null);
  const [library, setLibrary] = useApp(false);
  const [tour, setTour] = useApp(false);
  const mobile = useIsMobile();
  const [navOpen, setNavOpen] = useApp(false);

  const [saveState, setSaveState] = useApp("idle"); // idle | pending | saving | saved | offline
  const loaded = useRef(false);

  // Stage 2: if a real Supabase session already exists, sign in automatically on load.
  useAppE(() => {
    if (!window.SW || !window.SW.ready) return;
    window.SW.getSession().then(function (res) {
      var session = res && res.data && res.data.session;
      if (session) {
        var em = session.user && session.user.email;
        if (em) setUser({
          name: em,
          role: "Admin"
        });
        setPhase("app");
      }
    }).catch(function () {});
  }, []);

  // Bring back whatever this person saved before - from their account, or
  // from this browser if that is the more recent of the two.
  useAppE(() => {
    if (phase !== "app" || loaded.current || !window.SWStore) return;
    loaded.current = true;
    window.SWStore.load().then(function (found) {
      if (!found || !found.state) return;
      var st = found.state;
      if (st.tasks) setTasks(st.tasks);
      if (st.coa) setCoa(st.coa);
      if (st.vendors) setVendors(st.vendors);
      if (st.products) setProducts(st.products);
      if (st.business) setBusiness(st.business);
      if (st.funding) setFunding(st.funding);
      setSaveState("saved");
    }).catch(function () {});
  }, [phase]);

  // Keep it saved as they work. Nothing is written until their own data has
  // been loaded, so an empty first render can never overwrite real work.
  useAppE(() => {
    if (phase !== "app" || !loaded.current || !window.SWStore) return;
    window.SWStore.save({
      tasks: tasks,
      coa: coa,
      vendors: vendors,
      products: products,
      business: business,
      funding: funding
    });
  }, [phase, tasks, coa, vendors, products, business, funding]);

  useAppE(() => {
    if (!window.SWStore) return;
    return window.SWStore.onStatus(function (status) {
      setSaveState(status);
    });
  }, []);
  const totalBudget = useAppM(() => funding.filter(f => f.on).reduce((s, f) => s + (+f.amount || 0), 0), [funding]);
  const actualSpend = useAppM(() => tasks.filter(x => x.type === "Financial").reduce((s, x) => s + (+x.actual || 0), 0), [tasks]);
  const startingBalance = Math.max(0, totalBudget - actualSpend);
  const saveProduct = p => {
    setProducts(prev => prev.some(x => x.id === p.id) ? prev.map(x => x.id === p.id ? p : x) : [...prev, p]);
    setEditingProduct(null);
  };
  const deleteProduct = id => {
    setProducts(prev => prev.filter(x => x.id !== id));
    setEditingProduct(null);
  };
  const joined = new Date(business.dateJoined);
  const daysLeft = Math.max(0, 15 - Math.floor((Date.now() - joined.getTime()) / 86400000));
  const setupAt = new Date(business.setupAt || business.dateJoined);
  const hoursLeft = Math.max(0, 48 - (Date.now() - setupAt.getTime()) / 3600000);

  // rebuild COA + expenses for a (new) business type within the 48-hour window
  const rebuildPlan = (plan, patch) => {
    setCoa(plan.coa);
    setTasks(prev => {
      const nonFin = prev.filter(x => x.type === "Non-Financial");
      const fin = plan.expenses.map(expenseToTask);
      return [...fin, ...nonFin];
    });
    setVendors([]);
    if (patch) setBusiness(b => ({
      ...b,
      ...patch
    }));
  };

  // cross-screen: completing a financial task spins up a RunBook vendor record
  const applyTasks = next => {
    setTasks(prev => {
      const arr = typeof next === "function" ? next(prev) : next;
      const toAdd = [];
      arr.forEach(x => {
        const was = prev.find(p => p.id === x.id);
        if (x.type === "Financial" && x.status === "Completed" && (!was || was.status !== "Completed")) {
          setVendors(vs => vs.some(v => v.taskName === x.name) ? vs : [...vs, makeVendor(x)]);
        }
      });
      return arr;
    });
  };
  const saveTask = task => {
    if (task.id) applyTasks(tasks.map(x => x.id === task.id ? task : x));else applyTasks([...tasks, {
      ...task,
      id: "t" + Date.now()
    }]);
    setEditing(null);
  };
  const deleteTask = id => {
    applyTasks(tasks.filter(x => x.id !== id));
    setEditing(null);
  };
  const exportCSV = () => {
    const rows = [["Task", "Type", "Category", "Priority", "Status", "Week", "Estimated", "Actual", "GL", "Due"]];
    tasks.forEach(x => rows.push([x.name, x.type, x.category, x.priority, x.status, x.week, x.est, x.actual, x.gl || "", x.due]));
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], {
      type: "text/csv"
    }));
    a.download = "startwise-tasks.csv";
    a.click();
  };
  if (phase === "login") return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Login, {
    onLogin: auth => {
      if (auth && auth.email) setUser({
        name: auth.email,
        role: "Admin"
      });
      setPhase("app");
    },
    onStart: () => setPhase("onboarding")
  }), /*#__PURE__*/React.createElement(AppTweaks, {
    t: t,
    setTweak: setTweak
  }));
  if (phase === "onboarding") return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Onboarding, {
    onCancel: () => setPhase("login"),
    onDone: data => {
      setBusiness({
        ...business,
        businessName: data.biz.businessName,
        fullName: data.biz.fullName,
        industry: data.biz.industry,
        businessType: data.biz.businessType,
        stage: data.biz.stage,
        launchDate: data.biz.launchDate,
        smsReminders: data.sms,
        dateJoined: new Date().toISOString().slice(0, 10),
        setupAt: new Date().toISOString()
      });
      setFunding(SWa.funding.map(f => {
        const m = data.funds.find(d => d.source === f.source);
        return m ? {
          ...f,
          on: m.on,
          amount: +m.amount || 0
        } : f;
      }));
      setUser({
        name: data.biz.fullName || "",
        role: "Admin"
      });
      if (data.plan) {
        setCoa(data.plan.coa);
        const finTasks = data.plan.expenses.map(expenseToTask);
        const stageT = (SWa.stageTasks[data.biz.stage] || SWa.stageTasks["Pre-Revenue"]).map((x, i) => ({
          id: "n" + i,
          name: x.name,
          desc: x.desc,
          type: "Non-Financial",
          category: x.category,
          priority: x.priority,
          est: 0,
          actual: 0,
          week: x.week,
          due: SWa.due(x.week),
          status: "To Do"
        }));
        setTasks([...finTasks, ...stageT]);
        setVendors([]);
      }
      setPhase("app");
      setRoute("dashboard");
    }
  }), /*#__PURE__*/React.createElement(AppTweaks, {
    t: t,
    setTweak: setTweak
  }));
  let screen = null;
  if (route === "dashboard") screen = /*#__PURE__*/React.createElement(Dashboard, {
    tasks: tasks,
    totalBudget: totalBudget,
    affirmation: SWa.affirmationOfDay(),
    smsOn: business.smsReminders,
    products: products,
    startingBalance: startingBalance
  });else if (route === "plan") screen = /*#__PURE__*/React.createElement(Plan, {
    tasks: tasks,
    setTasks: applyTasks,
    openEdit: setEditing
  });else if (route === "budget") screen = /*#__PURE__*/React.createElement(Budget, {
    tasks: tasks,
    setTasks: applyTasks,
    openEdit: setEditing,
    role: user.role
  });else if (route === "products") screen = /*#__PURE__*/React.createElement(Products, {
    products: products,
    setProducts: setProducts,
    openEdit: setEditingProduct,
    role: user.role
  });else if (route === "revenue") screen = /*#__PURE__*/React.createElement(Revenue, {
    products: products,
    startingBalance: startingBalance
  });else if (route === "cashflow") screen = /*#__PURE__*/React.createElement(CashFlow, {
    products: products,
    startingBalance: startingBalance
  });else if (route === "reports") screen = /*#__PURE__*/React.createElement(Reports, {
    tasks: tasks
  });else if (route === "runbook") screen = /*#__PURE__*/React.createElement(RunBook, {
    vendors: vendors,
    setVendors: setVendors,
    products: products
  });else if (route === "coa") screen = /*#__PURE__*/React.createElement(COA, {
    tasks: tasks,
    coa: coa,
    business: business
  });else if (route === "business") screen = /*#__PURE__*/React.createElement(BusinessInfo, {
    business: business,
    setBusiness: setBusiness,
    funding: funding,
    setFunding: setFunding,
    totalBudget: totalBudget,
    actualSpend: actualSpend,
    hoursLeft: hoursLeft,
    coa: coa,
    onRebuild: rebuildPlan
  });else if (route === "knowledge") screen = /*#__PURE__*/React.createElement(Knowledge, {
    onTour: () => setTour(true)
  });else if (route === "legal") screen = /*#__PURE__*/React.createElement(Legal, {
    business: business,
    setBusiness: setBusiness
  });
  return /*#__PURE__*/React.createElement("div", {
    "data-density": t.density,
    style: {
      display: "flex",
      minHeight: "100vh",
      background: "var(--cream-50)"
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    route: route,
    setRoute: setRoute,
    accent: t.accent,
    business: business,
    edition: business.businessType,
    mobile: mobile,
    open: navOpen,
    onClose: () => setNavOpen(false)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    title: ROUTE_TITLES[route],
    user: user,
    onAddTask: () => setEditing({}),
    onLibrary: () => setLibrary(true),
    onExport: exportCSV,
    onSignOut: async () => {
      if (window.SW_DEMO) { location.reload(); return; }
      if (window.SWStore) {
        try {
          await window.SWStore.flush();
          await window.SWStore.forgetThisDevice();
        } catch (e) {}
      }
      if (window.SW && window.SW.ready) {
        try {
          await window.SW.signOut();
        } catch (e) {}
      }
      loaded.current = false;
      setPhase("login");
    },
    onMenu: () => setNavOpen(true),
    mobile: mobile
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      padding: "26px 28px 48px",
      maxWidth: 1320,
      width: "100%",
      margin: "0 auto"
    }
  }, screen, /*#__PURE__*/React.createElement(SaveNotice, {
    state: saveState
  }))), editing && /*#__PURE__*/React.createElement(TaskEditor, {
    task: editing,
    coa: coa,
    onSave: saveTask,
    onClose: () => setEditing(null),
    onDelete: editing.id && user.role === "Admin" ? deleteTask : null
  }), library && /*#__PURE__*/React.createElement(TaskLibrary, {
    tasks: tasks,
    coa: coa,
    onAdd: task => applyTasks(prev => [...prev, task]),
    onClose: () => setLibrary(false)
  }), editingProduct && /*#__PURE__*/React.createElement(ProductEditor, {
    product: editingProduct,
    onSave: saveProduct,
    onClose: () => setEditingProduct(null),
    onDelete: editingProduct.id && user.role === "Admin" ? deleteProduct : null
  }), tour && /*#__PURE__*/React.createElement(Tour, {
    onClose: () => setTour(false)
  }), /*#__PURE__*/React.createElement(AppTweaks, {
    t: t,
    setTweak: setTweak,
    user: user,
    setUser: setUser
  }));
}
function AppTweaks({
  t,
  setTweak,
  user,
  setUser
}) {
  return /*#__PURE__*/React.createElement(TweaksPanel, {
    title: "Tweaks"
  }, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Theme"
  }), /*#__PURE__*/React.createElement(TweakColor, {
    label: "Sidebar accent",
    value: t.accent,
    options: ACCENTS,
    onChange: v => setTweak("accent", v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Layout"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Table density",
    value: t.density,
    options: ["compact", "comfortable"],
    onChange: v => setTweak("density", v)
  }), user && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Demo"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Acting as",
    value: user.role,
    options: ["Admin", "Member"],
    onChange: v => setUser({
      ...user,
      role: v
    })
  })));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));