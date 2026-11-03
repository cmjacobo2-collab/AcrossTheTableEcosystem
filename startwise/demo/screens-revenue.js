/* StartWise — Revenue Planner, Cash Flow Planner, Financial Health Score */
const {
  useState: useR,
  useMemo: useRM
} = React;
const SWr = window.StartWiseData;
const BIZr = window.StartWiseBiz;
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function monthLabels(n, start) {
  const s = start != null ? start : new Date().getMonth();
  return Array.from({
    length: n
  }, (_, i) => MONTH_NAMES[(s + i) % 12]);
}
const CHANNEL_COLORS = {
  Website: "#1B344F",
  Phone: "#246049",
  Marketplace: "#C8962E",
  "Retail Store": "#34597A",
  "Social Media": "#A8392B",
  Other: "#647281"
};

/* Build a 12-month projection from current products. Revenue grows gently; expenses grow slower. */
function buildProjection(products, startingBalance, gRev = 0.03, gExp = 0.015) {
  const agg = BIZr.aggregate(products);
  const labels = monthLabels(12);
  let bal = startingBalance;
  const rows = labels.map((m, i) => {
    const revenue = agg.revenue * Math.pow(1 + gRev, i);
    const expenses = agg.monthlyExpenses * Math.pow(1 + gExp, i);
    const profit = revenue - expenses;
    const prevRev = i === 0 ? agg.revenue : agg.revenue * Math.pow(1 + gRev, i - 1);
    const growth = i === 0 ? 0 : (revenue - prevRev) / (prevRev || 1) * 100;
    bal += profit;
    return {
      month: m,
      revenue,
      expenses,
      profit,
      growth,
      ending: bal
    };
  });
  return {
    agg,
    labels,
    rows,
    endBalance: bal
  };
}

/* =========================================================== FINANCIAL HEALTH SCORE ===== */
function scoreBusiness(products, startingBalance) {
  const agg = BIZr.aggregate(products);
  const reserveMonths = agg.monthlyExpenses > 0 ? startingBalance / agg.monthlyExpenses : 99;
  let level,
    recs = [];
  const cashPos = agg.netProfit >= 0;
  if (!cashPos || reserveMonths < 1) level = "red";else if (agg.avgMargin < 30 || reserveMonths < 3 || agg.netProfit < agg.monthlyExpenses * 0.1) level = "yellow";else level = "green";
  if (!cashPos) recs.push("Your expenses exceed revenue — raise prices or increase sales volume to turn cash-flow positive.");
  if (agg.avgMargin < 35) recs.push("Average margin is below 35% — review pricing and find lower-cost vendors.");
  if (reserveMonths < 3) recs.push("Build a cash reserve of at least 3 months of expenses to weather slow periods.");
  if (agg.netProfit > 0 && agg.netProfit < agg.monthlyExpenses * 0.15) recs.push("Profit is thin — trim unnecessary expenses or add a higher-margin product.");
  if (level === "green") recs.push("You're in good shape — keep margins strong and your reserve growing as you scale.");
  return {
    level,
    agg,
    reserveMonths,
    recs: recs.slice(0, 3)
  };
}
const HEALTH = {
  green: {
    label: "Healthy",
    color: "var(--forest-600)",
    bg: "var(--forest-050)",
    border: "var(--forest-100)",
    desc: "Positive cash flow, good margins, and a solid cash reserve."
  },
  yellow: {
    label: "Needs attention",
    color: "var(--gold-700)",
    bg: "var(--gold-050)",
    border: "var(--gold-100)",
    desc: "Some warning signs — low margins, rising costs, or a thin reserve."
  },
  red: {
    label: "Immediate action needed",
    color: "var(--red-600)",
    bg: "#FBEDEA",
    border: "var(--red-100)",
    desc: "Negative cash flow or running low on money. Act now."
  }
};
function HealthScore({
  products,
  startingBalance,
  compact
}) {
  const {
    level,
    agg,
    reserveMonths,
    recs
  } = scoreBusiness(products, startingBalance);
  const h = HEALTH[level];
  const dial = /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, ["green", "yellow", "red"].map(k => /*#__PURE__*/React.createElement("div", {
    key: k,
    title: HEALTH[k].label,
    style: {
      width: 14,
      height: 14,
      borderRadius: 999,
      background: HEALTH[k].color,
      opacity: level === k ? 1 : 0.2,
      boxShadow: level === k ? `0 0 0 4px ${h.bg}` : "none"
    }
  })));
  if (compact) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: h.bg,
        border: `1px solid ${h.border}`,
        borderRadius: "var(--radius-lg)",
        padding: "18px 20px",
        display: "flex",
        alignItems: "center",
        gap: 18,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 52,
        height: 52,
        borderRadius: 999,
        background: h.color,
        display: "grid",
        placeItems: "center",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "shield",
      size: 26,
      color: "#fff"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 180
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: "600 9.5px var(--font-mono)",
        letterSpacing: "0.12em",
        color: h.color
      }
    }, "BUSINESS FINANCIAL HEALTH"), /*#__PURE__*/React.createElement("div", {
      style: {
        font: "800 22px var(--font-display)",
        color: "var(--ink-900)",
        marginTop: 2
      }
    }, h.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12.5,
        color: "var(--ink-600)",
        marginTop: 2
      }
    }, h.desc)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 22,
        flexWrap: "wrap"
      }
    }, [["Monthly profit", SWr.fmt0(agg.netProfit)], ["Avg. margin", agg.avgMargin.toFixed(0) + "%"], ["Cash reserve", (reserveMonths > 24 ? "24+" : reserveMonths.toFixed(1)) + " mo"]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
      key: k
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: "800 18px var(--font-display)",
        color: h.color
      }
    }, v), /*#__PURE__*/React.createElement("div", {
      style: {
        font: "600 9px var(--font-mono)",
        letterSpacing: "0.08em",
        color: "var(--ink-500)"
      }
    }, k.toUpperCase())))));
  }
  return /*#__PURE__*/React.createElement(Panel, {
    title: "Business financial health score",
    subtitle: "A plain-English read on whether your business is financially healthy",
    right: dial
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "240px 1fr",
      gap: 24,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: h.bg,
      border: `1px solid ${h.border}`,
      borderRadius: "var(--radius-md)",
      padding: 20,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      borderRadius: 999,
      background: h.color,
      display: "grid",
      placeItems: "center",
      margin: "0 auto 12px"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield",
    size: 32,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "800 20px var(--font-display)",
      color: h.color
    }
  }, h.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--ink-600)",
      marginTop: 6,
      lineHeight: 1.5
    }
  }, h.desc)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 12,
      marginBottom: 18
    }
  }, [["Monthly cash flow", SWr.fmt0(agg.netProfit), agg.netProfit >= 0 ? "var(--forest-600)" : "var(--red-600)"], ["Average margin", agg.avgMargin.toFixed(0) + "%", agg.avgMargin >= 35 ? "var(--forest-600)" : "var(--gold-700)"], ["Cash reserve", (reserveMonths > 24 ? "24+" : reserveMonths.toFixed(1)) + " months", reserveMonths >= 3 ? "var(--forest-600)" : "var(--gold-700)"]].map(([k, v, c]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      background: "var(--cream-50)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-md)",
      padding: "12px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "600 9px var(--font-mono)",
      letterSpacing: "0.08em",
      color: "var(--ink-500)"
    }
  }, k.toUpperCase()), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "800 20px var(--font-display)",
      color: c,
      marginTop: 3
    }
  }, v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "600 10px var(--font-mono)",
      letterSpacing: "0.1em",
      color: "var(--ink-500)",
      marginBottom: 8
    }
  }, "RECOMMENDATIONS"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, recs.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 10,
      alignItems: "flex-start",
      fontSize: 13.5,
      color: "var(--ink-700)",
      lineHeight: 1.5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: level === "green" ? "check" : "arrowRight",
    size: 16,
    color: h.color,
    style: {
      flexShrink: 0,
      marginTop: 2
    }
  }), r))))));
}

/* =========================================================== REVENUE PLANNER ===== */
function Revenue({
  products,
  startingBalance
}) {
  const proj = useRM(() => buildProjection(products, startingBalance), [products, startingBalance]);
  const {
    agg,
    rows
  } = proj;
  const sellable = products.filter(BIZr.isSellable);
  const byChannel = {};
  sellable.forEach(p => {
    byChannel[p.channel] = (byChannel[p.channel] || 0) + BIZr.monthlyRevenue(p);
  });
  const channelData = Object.entries(byChannel).sort((a, b) => b[1] - a[1]).map(([label, value]) => ({
    label,
    value,
    display: SWr.fmt0(value),
    color: CHANNEL_COLORS[label] || "#647281"
  }));
  const prodData = sellable.map((p, i) => ({
    label: p.name,
    short: p.name.split(" ")[0],
    value: BIZr.monthlyRevenue(p),
    display: SWr.fmt0(BIZr.monthlyRevenue(p)),
    color: SWr.palette[i % SWr.palette.length]
  }));
  const topProducts = [...sellable].sort((a, b) => BIZr.monthlyRevenue(b) - BIZr.monthlyRevenue(a)).slice(0, 5);
  const marginRows = [...sellable].sort((a, b) => BIZr.marginPct(b) - BIZr.marginPct(a)).map(p => ({
    label: p.name,
    meta: BIZr.marginPct(p).toFixed(0) + "%",
    bars: [{
      value: BIZr.marginPct(p),
      color: BIZr.marginPct(p) >= 40 ? "var(--forest-600)" : BIZr.marginPct(p) >= 20 ? "var(--gold-500)" : "var(--red-600)"
    }]
  }));
  const ctx = "Monthly revenue " + SWr.fmt0(agg.revenue) + ", monthly expenses " + SWr.fmt0(agg.monthlyExpenses) + ", avg margin " + agg.avgMargin.toFixed(0) + "%.\nProducts:\n" + sellable.map(p => `- ${p.name}: ${p.monthlyQty}/mo at ${SWr.fmt0(p.retail)} = ${SWr.fmt0(BIZr.monthlyRevenue(p))}/mo`).join("\n");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Callout, {
    icon: "chart",
    title: "Plan your revenue with confidence."
  }, "These numbers come straight from your products & services. As you adjust pricing or sales, your revenue forecast, profit, and annual projection update automatically."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Kpi, {
    label: "Monthly revenue",
    value: SWr.fmt0(agg.revenue),
    tone: "good",
    sub: "from all active products"
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "Monthly profit",
    value: SWr.fmt0(agg.netProfit),
    tone: agg.netProfit >= 0 ? "good" : "warn",
    sub: "revenue \u2212 expenses"
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "Average profit margin",
    value: agg.avgMargin.toFixed(0) + "%"
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "Annual revenue projection",
    value: SWr.fmt0(rows.reduce((s, r) => s + r.revenue, 0)),
    sub: "next 12 months"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.4fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "Monthly revenue trend",
    subtitle: "Projected revenue, expenses & profit over 12 months"
  }, /*#__PURE__*/React.createElement(LineChart, {
    labels: proj.labels,
    series: [{
      label: "Revenue",
      color: "var(--forest-600)",
      fill: true,
      data: rows.map(r => Math.round(r.revenue))
    }, {
      label: "Expenses",
      color: "var(--red-600)",
      data: rows.map(r => Math.round(r.expenses))
    }, {
      label: "Profit",
      color: "var(--navy-600)",
      data: rows.map(r => Math.round(r.profit))
    }]
  })), /*#__PURE__*/React.createElement(Panel, {
    title: "Revenue by sales channel",
    subtitle: "Where your monthly revenue comes from"
  }, /*#__PURE__*/React.createElement(Donut, {
    data: channelData,
    centerTop: SWr.fmt0(agg.revenue),
    centerBottom: "Per month",
    size: 190,
    thickness: 26
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "Product revenue breakdown",
    subtitle: "Monthly revenue contribution by product"
  }, /*#__PURE__*/React.createElement(Donut, {
    data: prodData,
    centerTop: SWr.fmt0(agg.revenue),
    centerBottom: "Total",
    size: 190,
    thickness: 26
  })), /*#__PURE__*/React.createElement(Panel, {
    title: "Profit margin by product",
    subtitle: "Higher is better \u2014 aim above 40%"
  }, /*#__PURE__*/React.createElement(HBar, {
    rows: marginRows,
    money: false
  }))), /*#__PURE__*/React.createElement(Panel, {
    title: "Revenue projection",
    subtitle: "12-month forecast with gentle growth \u2014 revenue, expenses, profit & growth"
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
  }, ["Month", "Revenue", "Expenses", "Profit", "Growth %"].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      font: "600 10px var(--font-mono)",
      letterSpacing: "0.08em",
      color: "var(--ink-500)",
      padding: "0 12px 10px",
      textAlign: i === 0 ? "left" : "right"
    }
  }, h.toUpperCase())))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    style: {
      borderTop: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 12px",
      fontWeight: 600,
      color: "var(--ink-900)"
    }
  }, r.month), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 12px",
      textAlign: "right",
      fontFamily: "var(--font-mono)"
    }
  }, SWr.fmt0(r.revenue)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 12px",
      textAlign: "right",
      fontFamily: "var(--font-mono)",
      color: "var(--ink-500)"
    }
  }, SWr.fmt0(r.expenses)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 12px",
      textAlign: "right",
      fontFamily: "var(--font-mono)",
      fontWeight: 600,
      color: r.profit >= 0 ? "var(--forest-600)" : "var(--red-600)"
    }
  }, SWr.fmt0(r.profit)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 12px",
      textAlign: "right",
      fontFamily: "var(--font-mono)",
      color: "var(--ink-500)"
    }
  }, i === 0 ? "—" : "+" + r.growth.toFixed(1) + "%"))))))), /*#__PURE__*/React.createElement(Panel, {
    title: "Top performing products",
    subtitle: "Your biggest revenue drivers this month"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, topProducts.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "12px 14px",
      background: "var(--cream-50)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-md)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 999,
      background: "var(--navy-050)",
      color: "var(--navy-700)",
      display: "grid",
      placeItems: "center",
      font: "700 12px var(--font-mono)"
    }
  }, i + 1), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      color: "var(--ink-900)"
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--ink-500)"
    }
  }, p.monthlyQty, " units/mo \xB7 ", BIZr.marginPct(p).toFixed(0), "% margin")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "800 18px var(--font-display)",
      color: "var(--forest-600)"
    }
  }, SWr.fmt0(BIZr.monthlyRevenue(p))))))), /*#__PURE__*/React.createElement(AiAssistant, {
    icon: "chart",
    title: "Grow my revenue",
    subtitle: "Ask your AI for ways to increase sales",
    prompt: BIZr.aiAssistant[1].prompt,
    context: ctx
  }));
}

/* =========================================================== CASH FLOW PLANNER ===== */
function CashFlow({
  products,
  startingBalance
}) {
  const proj = useRM(() => buildProjection(products, startingBalance), [products, startingBalance]);
  const {
    agg,
    rows,
    endBalance
  } = proj;
  const lowestBal = Math.min(...rows.map(r => r.ending));
  const ctx = "Starting balance " + SWr.fmt0(startingBalance) + ", monthly revenue " + SWr.fmt0(agg.revenue) + ", monthly expenses " + SWr.fmt0(agg.monthlyExpenses) + ", monthly net " + SWr.fmt0(agg.netProfit) + ". Projected 12-month ending balance " + SWr.fmt0(endBalance) + ", lowest point " + SWr.fmt0(lowestBal) + ".";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Callout, {
    icon: "dollar",
    title: "Cash flow is the lifeblood of your business."
  }, "Cash flow shows the money coming into your business (revenue) and the money leaving it (expenses). A profitable business can still fail if it runs out of cash \u2014 so watch your ending balance closely."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Kpi, {
    label: "Starting balance",
    value: SWr.fmt0(startingBalance),
    sub: "cash on hand today"
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "Monthly revenue",
    value: SWr.fmt0(agg.revenue),
    tone: "good"
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "Monthly expenses",
    value: SWr.fmt0(agg.monthlyExpenses),
    tone: "warn"
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "Monthly profit / loss",
    value: SWr.fmt0(agg.netProfit),
    tone: agg.netProfit >= 0 ? "good" : "warn"
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "12-month balance",
    value: SWr.fmt0(endBalance),
    tone: endBalance >= startingBalance ? "good" : "warn",
    sub: "projected"
  })), /*#__PURE__*/React.createElement(HealthScore, {
    products: products,
    startingBalance: startingBalance
  }), /*#__PURE__*/React.createElement(Panel, {
    title: "12-month cash flow projection",
    subtitle: "Your projected cash balance, revenue & expenses month by month"
  }, /*#__PURE__*/React.createElement(LineChart, {
    labels: proj.labels,
    series: [{
      label: "Cash balance",
      color: "var(--navy-600)",
      fill: true,
      data: rows.map(r => Math.round(r.ending))
    }, {
      label: "Revenue",
      color: "var(--forest-600)",
      data: rows.map(r => Math.round(r.revenue))
    }, {
      label: "Expenses",
      color: "var(--red-600)",
      data: rows.map(r => Math.round(r.expenses))
    }]
  }), lowestBal < agg.monthlyExpenses && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(Callout, {
    icon: "bell",
    title: "Watch your cash reserve"
  }, "Your projected balance dips to ", SWr.fmt0(lowestBal), " \u2014 less than one month of expenses. Build a bigger reserve or raise revenue before then."))), /*#__PURE__*/React.createElement(Panel, {
    title: "Monthly burn rate",
    subtitle: "Ending balance = starting balance + revenue \u2212 expenses, rolled forward each month"
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
  }, ["Month", "Revenue", "Expenses", "Net cash flow", "Ending balance"].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      font: "600 10px var(--font-mono)",
      letterSpacing: "0.08em",
      color: "var(--ink-500)",
      padding: "0 12px 10px",
      textAlign: i === 0 ? "left" : "right"
    }
  }, h.toUpperCase())))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    style: {
      borderTop: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 12px",
      fontWeight: 600,
      color: "var(--ink-900)"
    }
  }, r.month), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 12px",
      textAlign: "right",
      fontFamily: "var(--font-mono)"
    }
  }, SWr.fmt0(r.revenue)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 12px",
      textAlign: "right",
      fontFamily: "var(--font-mono)",
      color: "var(--ink-500)"
    }
  }, SWr.fmt0(r.expenses)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 12px",
      textAlign: "right",
      fontFamily: "var(--font-mono)",
      fontWeight: 600,
      color: r.profit >= 0 ? "var(--forest-600)" : "var(--red-600)"
    }
  }, r.profit >= 0 ? "+" : "", SWr.fmt0(r.profit)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 12px",
      textAlign: "right",
      fontFamily: "var(--font-mono)",
      fontWeight: 700,
      color: r.ending >= 0 ? "var(--ink-900)" : "var(--red-600)"
    }
  }, SWr.fmt0(r.ending)))))))), /*#__PURE__*/React.createElement(AiAssistant, {
    icon: "dollar",
    title: "Coach my cash flow",
    subtitle: "Ask your AI to explain risks and fixes",
    prompt: BIZr.aiAssistant[3].prompt,
    context: ctx
  }));
}
Object.assign(window, {
  Revenue,
  CashFlow,
  HealthScore,
  scoreBusiness,
  buildProjection
});