/* StartWise — SVG chart primitives (brand palette) */
const {
  useState: useStateChart
} = React;

/* Donut chart with center label. data: [{label, value, color}] */
function Donut({
  data,
  size = 220,
  thickness = 30,
  centerTop,
  centerBottom
}) {
  const total = data.reduce((s, d) => s + (d.value || 0), 0) || 1;
  const r = (size - thickness) / 2;
  const c = size / 2;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  const [hover, setHover] = useStateChart(null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 24,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`,
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: c,
    cy: c,
    r: r,
    fill: "none",
    stroke: "#F4EFE5",
    strokeWidth: thickness
  }), data.map((d, i) => {
    const frac = (d.value || 0) / total;
    const len = frac * circ;
    const seg = /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: c,
      cy: c,
      r: r,
      fill: "none",
      stroke: d.color,
      strokeWidth: hover === i ? thickness + 4 : thickness,
      strokeDasharray: `${len} ${circ - len}`,
      strokeDashoffset: -offset,
      transform: `rotate(-90 ${c} ${c})`,
      style: {
        transition: "stroke-width .15s",
        cursor: "pointer"
      },
      onMouseEnter: () => setHover(i),
      onMouseLeave: () => setHover(null)
    });
    offset += len;
    return seg;
  }), /*#__PURE__*/React.createElement("text", {
    x: c,
    y: c - 4,
    textAnchor: "middle",
    style: {
      font: "700 22px var(--font-display)",
      fill: "var(--ink-900)"
    }
  }, hover != null ? data[hover].short || data[hover].label : centerTop), /*#__PURE__*/React.createElement("text", {
    x: c,
    y: c + 16,
    textAnchor: "middle",
    style: {
      font: "500 11px var(--font-mono)",
      fill: "var(--ink-500)",
      letterSpacing: ".06em",
      textTransform: "uppercase"
    }
  }, hover != null ? `${Math.round(data[hover].value / total * 100)}%` : centerBottom)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      minWidth: 140
    }
  }, data.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    onMouseEnter: () => setHover(i),
    onMouseLeave: () => setHover(null),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontSize: 13,
      color: "var(--ink-700)",
      cursor: "pointer",
      opacity: hover == null || hover === i ? 1 : 0.45,
      transition: "opacity .15s"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: 3,
      background: d.color,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, d.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      color: "var(--ink-500)",
      fontSize: 12
    }
  }, d.display != null ? d.display : d.value)))));
}

/* Grouped/single vertical bar chart. groups: [{label, bars:[{value,color}]}] */
function BarChart({
  groups,
  height = 230,
  money = true,
  legend
}) {
  const max = Math.max(1, ...groups.flatMap(g => g.bars.map(b => b.value)));
  const ticks = 4;
  const fmtAxis = v => money ? v >= 1000 ? "$" + (v / 1000).toFixed(v % 1000 === 0 ? 0 : 1) + "K" : "$" + Math.round(v) : Math.round(v);
  return /*#__PURE__*/React.createElement("div", null, legend && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      justifyContent: "center",
      marginBottom: 12
    }
  }, legend.map((l, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 12,
      color: "var(--ink-600)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: 3,
      background: l.color
    }
  }), l.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height,
      paddingBottom: 22,
      fontSize: 10,
      fontFamily: "var(--font-mono)",
      color: "var(--ink-400)",
      textAlign: "right",
      minWidth: 34
    }
  }, Array.from({
    length: ticks + 1
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, fmtAxis(max * (ticks - i) / ticks)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      bottom: 22,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }
  }, Array.from({
    length: ticks + 1
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      borderTop: "1px solid var(--border-subtle)",
      height: 0
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-around",
      paddingBottom: 22
    }
  }, groups.map((g, gi) => /*#__PURE__*/React.createElement("div", {
    key: gi,
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6,
      flex: 1,
      height: "100%",
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 4,
      height: "100%"
    }
  }, g.bars.map((b, bi) => /*#__PURE__*/React.createElement("div", {
    key: bi,
    title: fmtAxis(b.value),
    style: {
      width: g.bars.length > 1 ? 26 : 46,
      height: `${b.value / max * (height - 22)}px`,
      minHeight: b.value > 0 ? 3 : 0,
      background: b.color,
      borderRadius: "4px 4px 0 0",
      transition: "height .4s ease",
      alignSelf: "flex-end"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 0,
      fontSize: 11,
      color: "var(--ink-500)",
      textAlign: "center",
      maxWidth: 110,
      lineHeight: 1.1
    }
  }, g.label)))))));
}

/* Horizontal labelled bar (for budget health / category breakdown) */
function HBar({
  rows,
  money = true
}) {
  const max = Math.max(1, ...rows.flatMap(r => r.bars.map(b => b.value)));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 13,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink-800)",
      fontWeight: 500
    }
  }, r.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      color: "var(--ink-500)",
      fontSize: 12
    }
  }, r.meta)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, r.bars.map((b, bi) => /*#__PURE__*/React.createElement("div", {
    key: bi,
    style: {
      height: 8,
      background: "var(--cream-100)",
      borderRadius: 999,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${Math.min(100, b.value / max * 100)}%`,
      height: "100%",
      background: b.color,
      borderRadius: 999,
      transition: "width .4s ease"
    }
  })))))));
}

/* Multi-series line chart with optional filled area on the first series.
   series: [{label, color, fill, data:[numbers]}]  labels: [x labels] */
function LineChart({
  series,
  labels,
  height = 240,
  money = true
}) {
  const [hover, setHover] = useStateChart(null);
  const all = series.flatMap(s => s.data);
  const rawMax = Math.max(1, ...all);
  const rawMin = Math.min(0, ...all);
  const max = rawMax * 1.08;
  const min = rawMin < 0 ? rawMin * 1.08 : 0;
  const W = 760,
    H = height,
    padL = 52,
    padB = 28,
    padT = 12,
    padR = 12;
  const iw = W - padL - padR,
    ih = H - padT - padB;
  const n = labels.length;
  const x = i => padL + (n <= 1 ? iw / 2 : i / (n - 1) * iw);
  const y = v => padT + ih - (v - min) / (max - min || 1) * ih;
  const ticks = 4;
  const fmtAxis = v => money ? Math.abs(v) >= 1000 ? "$" + (v / 1000).toFixed(Math.abs(v) % 1000 === 0 ? 0 : 1) + "K" : "$" + Math.round(v) : Math.round(v);
  const path = data => data.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const areaPath = data => `${path(data)} L${x(n - 1).toFixed(1)} ${y(min).toFixed(1)} L${x(0).toFixed(1)} ${y(min).toFixed(1)} Z`;
  return /*#__PURE__*/React.createElement("div", null, series.length > 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      justifyContent: "center",
      marginBottom: 10,
      flexWrap: "wrap"
    }
  }, series.map((s, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 12,
      color: "var(--ink-600)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 3,
      borderRadius: 999,
      background: s.color
    }
  }), s.label))), /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H}`,
    width: "100%",
    style: {
      display: "block",
      overflow: "visible"
    },
    onMouseLeave: () => setHover(null)
  }, Array.from({
    length: ticks + 1
  }).map((_, i) => {
    const v = min + (max - min) * (ticks - i) / ticks;
    const yy = y(v);
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("line", {
      x1: padL,
      y1: yy,
      x2: W - padR,
      y2: yy,
      stroke: "var(--border-subtle)"
    }), /*#__PURE__*/React.createElement("text", {
      x: padL - 8,
      y: yy + 3,
      textAnchor: "end",
      style: {
        font: "10px var(--font-mono)",
        fill: "var(--ink-400)"
      }
    }, fmtAxis(v)));
  }), min < 0 && /*#__PURE__*/React.createElement("line", {
    x1: padL,
    y1: y(0),
    x2: W - padR,
    y2: y(0),
    stroke: "var(--ink-300)",
    strokeDasharray: "3 3"
  }), series.map((s, si) => s.fill ? /*#__PURE__*/React.createElement("path", {
    key: "a" + si,
    d: areaPath(s.data),
    fill: s.color,
    opacity: "0.1"
  }) : null), series.map((s, si) => /*#__PURE__*/React.createElement("path", {
    key: "l" + si,
    d: path(s.data),
    fill: "none",
    stroke: s.color,
    strokeWidth: "2.5",
    strokeLinejoin: "round",
    strokeLinecap: "round"
  })), series.map((s, si) => s.data.map((v, i) => /*#__PURE__*/React.createElement("circle", {
    key: si + "-" + i,
    cx: x(i),
    cy: y(v),
    r: hover === i ? 4.5 : 3,
    fill: "#fff",
    stroke: s.color,
    strokeWidth: "2"
  }))), labels.map((l, i) => /*#__PURE__*/React.createElement("text", {
    key: i,
    x: x(i),
    y: H - 8,
    textAnchor: "middle",
    style: {
      font: "10px var(--font-mono)",
      fill: "var(--ink-500)"
    }
  }, l)), labels.map((l, i) => /*#__PURE__*/React.createElement("rect", {
    key: "h" + i,
    x: x(i) - iw / (2 * (n - 1 || 1)),
    y: padT,
    width: iw / (n - 1 || 1),
    height: ih,
    fill: "transparent",
    onMouseEnter: () => setHover(i)
  })), hover != null && /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("line", {
    x1: x(hover),
    y1: padT,
    x2: x(hover),
    y2: padT + ih,
    stroke: "var(--ink-300)",
    strokeDasharray: "3 3"
  }))), hover != null && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      justifyContent: "center",
      marginTop: 6,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "600 11px var(--font-mono)",
      color: "var(--ink-500)",
      letterSpacing: ".06em"
    }
  }, labels[hover].toUpperCase()), series.map((s, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 12,
      color: "var(--ink-700)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: 3,
      background: s.color
    }
  }), s.label, ": ", /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, fmtAxis(s.data[hover]))))));
}
function ProgressBar({
  value,
  color = "var(--forest-600)",
  height = 8
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height,
      background: "var(--cream-100)",
      borderRadius: 999,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${Math.max(0, Math.min(100, value))}%`,
      height: "100%",
      background: color,
      borderRadius: 999,
      transition: "width .4s ease"
    }
  }));
}
function Stars({
  value,
  onChange,
  size = 16
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      gap: 2
    }
  }, [1, 2, 3, 4, 5].map(n => /*#__PURE__*/React.createElement("span", {
    key: n,
    onClick: onChange ? () => onChange(n) : undefined,
    style: {
      cursor: onChange ? "pointer" : "default",
      color: n <= value ? "var(--gold-500)" : "var(--ink-200)",
      fontSize: size,
      lineHeight: 1
    }
  }, "\u2605")));
}
Object.assign(window, {
  Donut,
  BarChart,
  HBar,
  LineChart,
  ProgressBar,
  Stars
});