/* StartWise — Products & Services, Pricing Simulator, AI Business Assistant */
const {
  useState: useF,
  useMemo: useFM
} = React;
const SWf = window.StartWiseData;
const BIZ = window.StartWiseBiz;

/* =========================================================== AI BUSINESS ASSISTANT ===== */
/* Reusable across finance screens. Uses the user's own AI when available; otherwise copy-to-clipboard. */
function AiAssistant({
  icon = "sparkle",
  title,
  subtitle,
  prompt,
  context
}) {
  const [open, setOpen] = useF(false);
  const [loading, setLoading] = useF(false);
  const [answer, setAnswer] = useF("");
  const [copied, setCopied] = useF(false);
  const full = context ? prompt + "\n\nMy data:\n" + context : prompt;
  const ask = async () => {
    setOpen(true);
    setAnswer("");
    setLoading(true);
    try {
      if (window.claude && window.claude.complete) {
        const raw = await window.claude.complete(full + "\n\nReply in plain English for a first-time business owner. Use short paragraphs and a few bullet points. No markdown headers.");
        setAnswer(raw.trim());
      } else {
        await new Promise(r => setTimeout(r, 200));
        setAnswer("Connect your own AI account to get a tailored analysis here. For now, use \u201CCopy prompt\u201D and paste it into your AI \u2014 your full data summary is included.");
      }
    } catch (e) {
      setAnswer("Couldn't reach your AI just now. Use \u201CCopy prompt\u201D and paste it into your own AI account instead.");
    }
    setLoading(false);
  };
  const copy = () => {
    try {
      navigator.clipboard && navigator.clipboard.writeText(full);
    } catch (e) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--navy-900)",
      borderRadius: "var(--radius-lg)",
      padding: "18px 20px",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 11,
      background: "rgba(200,150,46,0.18)",
      display: "grid",
      placeItems: "center",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 20,
    color: "var(--gold-400)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 200
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "600 9.5px var(--font-mono)",
      letterSpacing: "0.14em",
      color: "var(--gold-400)"
    }
  }, "AI BUSINESS ASSISTANT"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "700 16px var(--font-display)",
      marginTop: 3
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--text-on-dark-muted)",
      marginTop: 1
    }
  }, subtitle)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: copy,
    style: {
      ...btnGhost,
      background: "rgba(255,255,255,0.08)",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.18)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: copied ? "check" : "file",
    size: 15
  }), " ", copied ? "Copied" : "Copy prompt"), /*#__PURE__*/React.createElement("button", {
    onClick: ask,
    style: {
      ...btnPrimary,
      background: "var(--gold-500)",
      color: "var(--navy-900)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkle",
    size: 15
  }), " Analyze with my AI"))), open && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: "var(--radius-md)",
      padding: "14px 16px"
    }
  }, loading ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13,
      color: "var(--text-on-dark-muted)"
    }
  }, /*#__PURE__*/React.createElement(Spinner, null), " Analyzing your numbers\u2026") : /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: "#EFEAE0",
      lineHeight: 1.6,
      whiteSpace: "pre-wrap"
    }
  }, answer)));
}

/* =========================================================== PRODUCT EDITOR ===== */
function ProductEditor({
  product,
  onSave,
  onClose,
  onDelete
}) {
  const {
    Input,
    Select
  } = window.AcrossTheTableDesignSystem_520822;
  const isNew = !product.id;
  const [p, setP] = useF({
    category: BIZ.productCategories[0],
    name: "",
    sku: "",
    description: "",
    type: "Service",
    vendor: "",
    cost: 0,
    retail: 0,
    wholesale: 0,
    stock: null,
    minStock: null,
    reorder: null,
    channel: "Website",
    monthlyQty: 0,
    launch: SWf.business.launchDate,
    status: "Active",
    notes: "",
    ...product
  });
  const set = patch => setP({
    ...p,
    ...patch
  });
  const physical = p.type === "Physical Product";
  const profit = BIZ.profitPerUnit(p),
    margin = BIZ.marginPct(p),
    mRev = BIZ.monthlyRevenue(p);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(14,27,44,0.45)",
      zIndex: 60,
      display: "grid",
      placeItems: "center",
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: "100%",
      maxWidth: 640,
      maxHeight: "92vh",
      overflowY: "auto",
      background: "#fff",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-card-hover)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 24px",
      borderBottom: "1px solid var(--border-default)",
      position: "sticky",
      top: 0,
      background: "#fff",
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "700 19px var(--font-display)",
      margin: 0,
      color: "var(--ink-900)"
    }
  }, isNew ? "Add a product or service" : "Edit product or service"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "var(--ink-400)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 20
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Product / service name",
    value: p.name,
    onChange: e => set({
      name: e.target.value
    }),
    placeholder: "e.g. Deep clean"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "SKU / ID",
    value: p.sku,
    onChange: e => set({
      sku: e.target.value
    }),
    hint: "Your internal product code"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Category",
    value: p.category,
    onChange: e => set({
      category: e.target.value
    })
  }, BIZ.productCategories.map(c => /*#__PURE__*/React.createElement("option", {
    key: c
  }, c))), /*#__PURE__*/React.createElement(Select, {
    label: "Product type",
    value: p.type,
    onChange: e => set({
      type: e.target.value
    })
  }, BIZ.productTypes.map(c => /*#__PURE__*/React.createElement("option", {
    key: c
  }, c)))), /*#__PURE__*/React.createElement(Input, {
    label: "Description",
    multiline: true,
    value: p.description,
    onChange: e => set({
      description: e.target.value
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--cream-50)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-md)",
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "600 10px var(--font-mono)",
      letterSpacing: "0.1em",
      color: "var(--ink-500)"
    }
  }, "PRICING \u2014 WE CALCULATE PROFIT FOR YOU"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Cost per unit ($)",
    type: "number",
    value: p.cost,
    onChange: e => set({
      cost: +e.target.value
    }),
    hint: "What it costs to deliver one"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Retail price ($)",
    type: "number",
    value: p.retail,
    onChange: e => set({
      retail: +e.target.value
    }),
    hint: "Price to customers"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Wholesale price ($)",
    type: "number",
    value: p.wholesale,
    onChange: e => set({
      wholesale: +e.target.value
    }),
    hint: "Bulk / reseller price"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      flexWrap: "wrap"
    }
  }, [["Profit per unit", SWf.fmt(profit), profit >= 0 ? "var(--forest-600)" : "var(--red-600)"], ["Profit margin", margin.toFixed(0) + "%", margin >= 40 ? "var(--forest-600)" : margin >= 20 ? "var(--gold-700)" : "var(--red-600)"], ["Monthly revenue", SWf.fmt0(mRev), "var(--navy-700)"]].map(([k, v, c]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      flex: 1,
      minWidth: 120,
      background: "#fff",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-md)",
      padding: "10px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "600 9px var(--font-mono)",
      letterSpacing: "0.08em",
      color: "var(--ink-400)"
    }
  }, k.toUpperCase()), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "800 18px var(--font-display)",
      color: c,
      marginTop: 3
    }
  }, v))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Sales channel",
    value: p.channel,
    onChange: e => set({
      channel: e.target.value
    })
  }, BIZ.salesChannels.map(c => /*#__PURE__*/React.createElement("option", {
    key: c
  }, c))), /*#__PURE__*/React.createElement(Input, {
    label: "Monthly sales quantity",
    type: "number",
    value: p.monthlyQty,
    onChange: e => set({
      monthlyQty: +e.target.value
    }),
    hint: "Units sold per month"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Primary vendor",
    value: p.vendor,
    onChange: e => set({
      vendor: e.target.value
    })
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Status",
    value: p.status,
    onChange: e => set({
      status: e.target.value
    })
  }, BIZ.productStatuses.map(c => /*#__PURE__*/React.createElement("option", {
    key: c
  }, c)))), physical && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--cream-50)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-md)",
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "600 10px var(--font-mono)",
      letterSpacing: "0.1em",
      color: "var(--ink-500)"
    }
  }, "INVENTORY (PHYSICAL PRODUCTS)"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Inventory stock",
    type: "number",
    value: p.stock ?? 0,
    onChange: e => set({
      stock: +e.target.value
    })
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Minimum stock",
    type: "number",
    value: p.minStock ?? 0,
    onChange: e => set({
      minStock: +e.target.value
    })
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Reorder quantity",
    type: "number",
    value: p.reorder ?? 0,
    onChange: e => set({
      reorder: +e.target.value
    })
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Launch date",
    type: "date",
    value: p.launch,
    onChange: e => set({
      launch: e.target.value
    })
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Notes",
    value: p.notes,
    onChange: e => set({
      notes: e.target.value
    })
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 24px",
      borderTop: "1px solid var(--border-default)",
      position: "sticky",
      bottom: 0,
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", null, !isNew && onDelete && /*#__PURE__*/React.createElement("button", {
    onClick: () => onDelete(p.id),
    style: {
      ...btnGhost,
      color: "var(--red-600)",
      border: "1px solid var(--red-100)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 15
  }), " Delete")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: btnGhost
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: () => p.name.trim() && onSave({
      ...p,
      id: p.id || "p" + Date.now()
    }),
    style: btnPrimary
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 16
  }), " ", isNew ? "Add product" : "Save changes")))));
}

/* =========================================================== PRICING SIMULATOR ===== */
function PricingSimulator({
  products
}) {
  const sellable = products.filter(BIZ.isSellable);
  const [id, setId] = useF((sellable[0] || products[0] || {}).id);
  const base = products.find(p => p.id === id) || products[0];
  const [newPrice, setNewPrice] = useF(base ? base.retail : 0);
  React.useEffect(() => {
    if (base) setNewPrice(base.retail);
  }, [id]);
  if (!base) return null;
  const qty = +base.monthlyQty || 0,
    cost = +base.cost || 0;
  const cur = {
    price: base.retail,
    rev: base.retail * qty,
    perSale: base.retail - cost,
    mProfit: (base.retail - cost) * qty,
    margin: base.retail ? (base.retail - cost) / base.retail * 100 : 0
  };
  const proj = {
    price: newPrice,
    rev: newPrice * qty,
    perSale: newPrice - cost,
    mProfit: (newPrice - cost) * qty,
    margin: newPrice ? (newPrice - cost) / newPrice * 100 : 0
  };
  const breakeven = newPrice - cost > 0 ? Math.ceil(BIZ.opexLines.reduce((s, l) => s + l.amount, 0) / (newPrice - cost)) : "—";
  const sel = {
    padding: "8px 12px",
    border: "1px solid var(--border-default)",
    borderRadius: "var(--radius-md)",
    fontSize: 13,
    background: "#fff",
    color: "var(--ink-700)"
  };
  const Row = ({
    label,
    a,
    b,
    money = true,
    pct = false
  }) => {
    const fa = pct ? a.toFixed(0) + "%" : money ? SWf.fmt0(a) : a;
    const fb = pct ? b.toFixed(0) + "%" : money ? SWf.fmt0(b) : b;
    const up = b >= a;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1.3fr 1fr 1fr",
        gap: 8,
        padding: "11px 0",
        borderTop: "1px solid var(--border-subtle)",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: "var(--ink-600)"
      }
    }, label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 13.5,
        color: "var(--ink-500)",
        textAlign: "right"
      }
    }, fa), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 14,
        fontWeight: 700,
        color: up ? "var(--forest-600)" : "var(--red-600)",
        textAlign: "right"
      }
    }, fb));
  };
  return /*#__PURE__*/React.createElement(Panel, {
    title: "Pricing simulator",
    subtitle: "Test a new price and see the impact before you change it",
    right: /*#__PURE__*/React.createElement("select", {
      value: id,
      onChange: e => setId(e.target.value),
      style: sel
    }, products.map(p => /*#__PURE__*/React.createElement("option", {
      key: p.id,
      value: p.id
    }, p.name)))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "300px 1fr",
      gap: 24,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--cream-50)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-md)",
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "600 9.5px var(--font-mono)",
      letterSpacing: "0.1em",
      color: "var(--ink-500)"
    }
  }, "CURRENT PRICE"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "800 30px var(--font-display)",
      color: "var(--ink-900)",
      marginTop: 4
    }
  }, SWf.fmt0(base.retail)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      font: "600 9.5px var(--font-mono)",
      letterSpacing: "0.1em",
      color: "var(--gold-700)"
    }
  }, "TEST A NEW PRICE"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink-400)",
      fontSize: 18
    }
  }, "$"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: newPrice,
    onChange: e => setNewPrice(+e.target.value),
    style: {
      flex: 1,
      padding: "10px 12px",
      border: "1px solid var(--border-strong)",
      borderRadius: "var(--radius-md)",
      fontSize: 20,
      fontFamily: "var(--font-mono)",
      fontWeight: 700,
      color: "var(--navy-700)"
    }
  })), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: Math.max(1, Math.round(cost)),
    max: Math.round(base.retail * 2.5) || 100,
    value: newPrice,
    onChange: e => setNewPrice(+e.target.value),
    style: {
      width: "100%",
      marginTop: 12,
      accentColor: "var(--gold-600)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--ink-500)",
      marginTop: 12,
      lineHeight: 1.5
    }
  }, "Based on ", /*#__PURE__*/React.createElement("strong", null, qty, " units/month"), " at ", /*#__PURE__*/React.createElement("strong", null, SWf.fmt0(cost)), " cost per unit.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.3fr 1fr 1fr",
      gap: 8,
      paddingBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "600 9.5px var(--font-mono)",
      letterSpacing: "0.08em",
      color: "var(--ink-400)",
      textAlign: "right"
    }
  }, "CURRENT"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "600 9.5px var(--font-mono)",
      letterSpacing: "0.08em",
      color: "var(--gold-700)",
      textAlign: "right"
    }
  }, "PROJECTED")), /*#__PURE__*/React.createElement(Row, {
    label: "Profit per sale",
    a: cur.perSale,
    b: proj.perSale
  }), /*#__PURE__*/React.createElement(Row, {
    label: "Profit margin",
    a: cur.margin,
    b: proj.margin,
    pct: true
  }), /*#__PURE__*/React.createElement(Row, {
    label: "Monthly revenue",
    a: cur.rev,
    b: proj.rev
  }), /*#__PURE__*/React.createElement(Row, {
    label: "Monthly profit",
    a: cur.mProfit,
    b: proj.mProfit
  }), /*#__PURE__*/React.createElement(Row, {
    label: "Annual profit",
    a: cur.mProfit * 12,
    b: proj.mProfit * 12
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 14,
      padding: "12px 16px",
      background: "var(--gold-050)",
      border: "1px solid var(--gold-100)",
      borderRadius: "var(--radius-md)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--ink-700)"
    }
  }, "Break-even units / month at this price"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "800 20px var(--font-display)",
      color: "var(--gold-700)"
    }
  }, breakeven)))));
}

/* =========================================================== PRODUCTS & SERVICES ===== */
function Products({
  products,
  setProducts,
  openEdit,
  role
}) {
  const [cat, setCat] = useF("All");
  const [q, setQ] = useF("");
  const cats = ["All", ...BIZ.productCategories];
  const rows = products.filter(p => (cat === "All" || p.category === cat) && p.name.toLowerCase().includes(q.toLowerCase()));
  const lowItems = products.filter(BIZ.lowStock);
  const agg = BIZ.aggregate(products);
  const del = id => setProducts(products.filter(p => p.id !== id));
  const exportCSV = () => {
    const head = ["Name", "SKU", "Category", "Type", "Cost", "Retail", "Wholesale", "Profit/unit", "Margin%", "Stock", "Units/mo", "Monthly revenue", "Channel", "Status"];
    const data = products.map(p => [p.name, p.sku, p.category, p.type, p.cost, p.retail, p.wholesale, BIZ.profitPerUnit(p), BIZ.marginPct(p).toFixed(0), p.stock ?? "", p.monthlyQty, BIZ.monthlyRevenue(p), p.channel, p.status]);
    const csv = [head, ...data].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], {
      type: "text/csv"
    }));
    a.download = "startwise-products.csv";
    a.click();
  };
  const sel = {
    padding: "8px 12px",
    border: "1px solid var(--border-default)",
    borderRadius: "var(--radius-md)",
    fontSize: 13,
    background: "#fff",
    color: "var(--ink-700)"
  };
  const ctx = "Products (cost / retail / margin% / monthly units):\n" + products.filter(BIZ.isSellable).map(p => `- ${p.name}: cost ${SWf.fmt0(p.cost)}, retail ${SWf.fmt0(p.retail)}, margin ${BIZ.marginPct(p).toFixed(0)}%, ${p.monthlyQty}/mo`).join("\n");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Callout, {
    icon: "briefcase",
    title: "Define what you sell \u2014 we do the math."
  }, "Add every product or service you offer. StartWise automatically calculates your profit per unit, profit margin, and monthly revenue so you can price with confidence."), lowItems.length > 0 && /*#__PURE__*/React.createElement(Callout, {
    icon: "bell",
    title: "Your inventory is running low"
  }, lowItems.map(p => p.name).join(", "), " ", lowItems.length === 1 ? "is" : "are", " at or below the minimum stock level. Consider ordering more from your vendor."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Kpi, {
    label: "Active products",
    value: agg.count
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "Monthly revenue",
    value: SWf.fmt0(agg.revenue),
    tone: "good"
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "Monthly profit",
    value: SWf.fmt0(agg.netProfit),
    tone: agg.netProfit >= 0 ? "good" : "warn",
    sub: "after all expenses"
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "Avg. profit margin",
    value: agg.avgMargin.toFixed(0) + "%"
  })), /*#__PURE__*/React.createElement(Panel, {
    title: "Products & services",
    subtitle: `${products.length} items · profit and revenue calculated automatically`,
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
      placeholder: "Search",
      style: {
        border: "none",
        outline: "none",
        fontSize: 13,
        padding: "8px 0",
        width: 110,
        background: "transparent"
      }
    })), /*#__PURE__*/React.createElement("select", {
      value: cat,
      onChange: e => setCat(e.target.value),
      style: sel
    }, cats.map(c => /*#__PURE__*/React.createElement("option", {
      key: c
    }, c === "All" ? "All categories" : c))), /*#__PURE__*/React.createElement("button", {
      onClick: exportCSV,
      style: btnGhost
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      size: 15
    }), " Export CSV"), /*#__PURE__*/React.createElement("button", {
      onClick: () => openEdit({}),
      style: btnPrimary
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 15
    }), " Add product"))
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
  }, ["Product / service", "Type", "Cost", "Retail", "Profit/unit", "Margin", "Stock", "Units/mo", "Monthly rev.", "Status", ""].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: h + i,
    style: {
      font: "600 10px var(--font-mono)",
      letterSpacing: "0.06em",
      color: "var(--ink-500)",
      padding: "0 10px 10px",
      textAlign: i >= 2 && i <= 8 ? "right" : "left",
      whiteSpace: "nowrap"
    }
  }, h.toUpperCase())))), /*#__PURE__*/React.createElement("tbody", null, rows.map(p => {
    const profit = BIZ.profitPerUnit(p),
      margin = BIZ.marginPct(p),
      low = BIZ.lowStock(p);
    return /*#__PURE__*/React.createElement("tr", {
      key: p.id,
      style: {
        borderTop: "1px solid var(--border-subtle)"
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "12px 10px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        color: "var(--ink-900)"
      }
    }, p.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: "var(--ink-400)",
        fontFamily: "var(--font-mono)"
      }
    }, p.sku, " \xB7 ", p.category)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "12px 10px",
        color: "var(--ink-600)",
        whiteSpace: "nowrap"
      }
    }, p.type), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "12px 10px",
        textAlign: "right",
        fontFamily: "var(--font-mono)"
      }
    }, SWf.fmt0(p.cost)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "12px 10px",
        textAlign: "right",
        fontFamily: "var(--font-mono)",
        fontWeight: 600
      }
    }, SWf.fmt0(p.retail)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "12px 10px",
        textAlign: "right",
        fontFamily: "var(--font-mono)",
        color: "var(--forest-600)"
      }
    }, SWf.fmt0(profit)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "12px 10px",
        textAlign: "right"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontWeight: 600,
        color: margin >= 40 ? "var(--forest-600)" : margin >= 20 ? "var(--gold-700)" : "var(--red-600)"
      }
    }, margin.toFixed(0), "%")), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "12px 10px",
        textAlign: "right",
        fontFamily: "var(--font-mono)",
        color: low ? "var(--red-600)" : "var(--ink-600)",
        fontWeight: low ? 700 : 400
      }
    }, p.stock == null ? "—" : p.stock + (low ? " ⚠" : "")), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "12px 10px",
        textAlign: "right",
        fontFamily: "var(--font-mono)"
      }
    }, p.monthlyQty), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "12px 10px",
        textAlign: "right",
        fontFamily: "var(--font-mono)",
        fontWeight: 600
      }
    }, SWf.fmt0(BIZ.monthlyRevenue(p))), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "12px 10px"
      }
    }, /*#__PURE__*/React.createElement(ProductStatusPill, {
      status: p.status
    })), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "12px 10px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 4,
        justifyContent: "flex-end"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => openEdit(p),
      title: "Edit",
      style: iconBtnF
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "pencil",
      size: 15
    })), role === "Admin" && /*#__PURE__*/React.createElement("button", {
      onClick: () => del(p.id),
      title: "Delete",
      style: {
        ...iconBtnF,
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
    colSpan: 8,
    style: {
      padding: "13px 10px",
      fontWeight: 700,
      color: "var(--ink-900)"
    }
  }, "Total monthly revenue (active)"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "13px 10px",
      textAlign: "right",
      fontFamily: "var(--font-mono)",
      fontWeight: 700
    }
  }, SWf.fmt0(agg.revenue)), /*#__PURE__*/React.createElement("td", {
    colSpan: 2
  })))))), /*#__PURE__*/React.createElement(PricingSimulator, {
    products: products
  }), /*#__PURE__*/React.createElement(AiAssistant, {
    icon: "briefcase",
    title: "Analyze my product pricing",
    subtitle: "Ask your AI whether your margins are healthy",
    prompt: BIZ.aiAssistant[0].prompt,
    context: ctx
  }));
}
function ProductStatusPill({
  status
}) {
  const map = {
    Active: {
      bg: "var(--success-bg)",
      fg: "var(--success)"
    },
    Planning: {
      bg: "var(--info-bg)",
      fg: "var(--info)"
    },
    Paused: {
      bg: "var(--gold-050)",
      fg: "var(--gold-700)"
    },
    Discontinued: {
      bg: "var(--ink-100)",
      fg: "var(--ink-500)"
    }
  };
  const s = map[status] || map.Active;
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
  }, status);
}
const iconBtnF = {
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
  Products,
  ProductEditor,
  PricingSimulator,
  AiAssistant,
  ProductStatusPill
});