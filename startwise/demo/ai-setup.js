/* StartWise — AI-powered account setup: generate a COA + expense list for a business type */
const {
  useState: useAi
} = React;
const EXP_CATS = ["Equipment & Assets", "Legal & Registration", "Sales Strategies", "Office & Operation", "Financial Planning", "Location & Infrastructure"];

/* ---- Build the prompt the user's own AI account runs ---- */
function buildPrompt(industry, businessType, stage) {
  return [`You are a small-business accountant and startup advisor.`, `For a new "${businessType}" business in the "${industry}" industry, currently at the "${stage}" stage, produce (1) a tailored QuickBooks-style Chart of Accounts and (2) a startup expense list that is SPECIFIC to a ${businessType}.`, `Tailor the expense timing, priorities, and selection to a business at the "${stage}" stage (e.g. an idea-stage owner needs validation and registration first; an operating business needs growth, hiring, and systems).`, `Return ONLY valid minified JSON — no markdown, no commentary — matching exactly:`, `{"coa":[{"num":"1000","name":"Checking Account","type":"Bank","category":"Assets","desc":"short"}],"expenses":[{"name":"...","category":"Equipment & Assets","priority":"High","est":1200,"week":3,"gl":"1500","vendorType":"...","desc":"short"}]}`, `Rules: 14-16 COA accounts spanning Bank, Accounts Receivable, Other Current Asset, Fixed Asset, Accounts Payable, Credit Card, Long Term Liability, Equity, Income, Cost of Goods Sold, Expense.`, `Use realistic GL numbers (1000s assets, 2000s liabilities, 3000s equity, 4000s income, 5000s COGS, 6000s expense).`, `Provide 10-12 expenses unmistakably specific to a ${businessType}. expense.category MUST be one of: ${EXP_CATS.join(", ")}. expense.gl MUST equal a num that exists in coa. week is 1-12, priority is High/Medium/Low.`, `Keep every "desc" under 8 words.`].join(" ");
}

/* ---- Templated fallback when no AI account is connected / call fails ---- */
function fallbackPlan(industry, businessType, stage) {
  const t = businessType.replace(/\s*\(.*\)/, "");
  const operating = /operat|launched/i.test(stage || "");
  const coa = [{
    num: "1000",
    name: "Checking Account",
    type: "Bank",
    category: "Assets",
    desc: "Primary operating account"
  }, {
    num: "1010",
    name: "Savings / Reserve",
    type: "Bank",
    category: "Assets",
    desc: "Cash reserve"
  }, {
    num: "1100",
    name: "Accounts Receivable",
    type: "Accounts Receivable",
    category: "Assets",
    desc: "Owed by customers"
  }, {
    num: "1200",
    name: t + " Supplies Inventory",
    type: "Other Current Asset",
    category: "Assets",
    desc: "Consumable supplies on hand"
  }, {
    num: "1500",
    name: t + " Equipment",
    type: "Fixed Asset",
    category: "Assets",
    desc: "Tools & machinery"
  }, {
    num: "1510",
    name: "Vehicles",
    type: "Fixed Asset",
    category: "Assets",
    desc: "Service vehicles"
  }, {
    num: "2000",
    name: "Accounts Payable",
    type: "Accounts Payable",
    category: "Liabilities",
    desc: "Owed to vendors"
  }, {
    num: "2100",
    name: "Credit Card Payable",
    type: "Credit Card",
    category: "Liabilities",
    desc: "Business card balance"
  }, {
    num: "2500",
    name: "Loans Payable",
    type: "Long Term Liability",
    category: "Liabilities",
    desc: "Startup & equipment financing"
  }, {
    num: "3000",
    name: "Owner's Equity",
    type: "Equity",
    category: "Equity",
    desc: "Owner contributions"
  }, {
    num: "4000",
    name: t + " Revenue",
    type: "Income",
    category: "Income",
    desc: "Primary service income"
  }, {
    num: "5000",
    name: "Cost of Goods Sold",
    type: "Cost of Goods Sold",
    category: "COGS",
    desc: "Direct job costs"
  }, {
    num: "6100",
    name: "Insurance Expense",
    type: "Expense",
    category: "Operating",
    desc: "Liability & coverage"
  }, {
    num: "6200",
    name: "Licensing & Permits",
    type: "Expense",
    category: "Operating",
    desc: "Registrations & permits"
  }, {
    num: "6300",
    name: "Marketing & Advertising",
    type: "Expense",
    category: "Operating",
    desc: "Ads & promotion"
  }, {
    num: "6600",
    name: "Software & Subscriptions",
    type: "Expense",
    category: "Operating",
    desc: "Booking & accounting tools"
  }];
  const expenses = [{
    name: "Business license & registration",
    category: "Legal & Registration",
    priority: "High",
    est: 250,
    week: 1,
    gl: "6200",
    vendorType: "State / Registrar",
    desc: "Form the entity, register name"
  }, {
    name: "General liability insurance",
    category: "Legal & Registration",
    priority: "High",
    est: 600,
    week: 2,
    gl: "6100",
    vendorType: "Insurance Broker",
    desc: "Core coverage policy"
  }, {
    name: t + " core equipment",
    category: "Equipment & Assets",
    priority: "High",
    est: 1800,
    week: 3,
    gl: "1500",
    vendorType: "Equipment Supplier",
    desc: "Primary tools for the trade"
  }, {
    name: t + " starter supplies",
    category: "Equipment & Assets",
    priority: "High",
    est: 450,
    week: 1,
    gl: "1200",
    vendorType: "Supplier",
    desc: "Initial consumable supplies"
  }, {
    name: "Service vehicle down payment",
    category: "Equipment & Assets",
    priority: "Medium",
    est: 2500,
    week: 5,
    gl: "1510",
    vendorType: "Auto Dealer",
    desc: "Reliable work vehicle"
  }, {
    name: "Website + online booking",
    category: "Sales Strategies",
    priority: "High",
    est: 900,
    week: 4,
    gl: "6600",
    vendorType: "Web / Software",
    desc: "Site with booking"
  }, {
    name: "Scheduling software (annual)",
    category: "Office & Operation",
    priority: "Medium",
    est: 360,
    week: 5,
    gl: "6600",
    vendorType: "Web / Software",
    desc: "Jobs & reminders"
  }, {
    name: "Vehicle wrap & signage",
    category: "Sales Strategies",
    priority: "Medium",
    est: 600,
    week: 6,
    gl: "6300",
    vendorType: "Signage / Print",
    desc: "Branded vehicle & signs"
  }, {
    name: "Launch marketing campaign",
    category: "Sales Strategies",
    priority: "High",
    est: 800,
    week: 8,
    gl: "6300",
    vendorType: "Marketing",
    desc: "Local ads & promos"
  }, {
    name: "Accounting software setup",
    category: "Office & Operation",
    priority: "Medium",
    est: 240,
    week: 7,
    gl: "6600",
    vendorType: "Web / Software",
    desc: "Books & invoicing"
  }, {
    name: "Business bank account & card processing",
    category: "Office & Operation",
    priority: "High",
    est: 30,
    week: 2,
    gl: "6600",
    vendorType: "Payment Processor",
    desc: "Checking account & card payments"
  }, {
    name: "CRM & client management software",
    category: "Office & Operation",
    priority: "Medium",
    est: 39,
    week: 7,
    gl: "6600",
    vendorType: "Software Provider",
    desc: "Track leads & customers"
  }, {
    name: "Email marketing & newsletter tool",
    category: "Sales Strategies",
    priority: "Medium",
    est: 25,
    week: 8,
    gl: "6300",
    vendorType: "Marketing",
    desc: "Promos & customer newsletters"
  }, {
    name: "Uniforms & branded apparel",
    category: "Equipment & Assets",
    priority: "Low",
    est: 300,
    week: 6,
    gl: "6600",
    vendorType: "Apparel",
    desc: "Crew uniforms & PPE"
  }];
  // Stage tailoring: an operating business has already registered & insured
  const filtered = operating ? expenses.filter(e => !/license|registration|insurance/i.test(e.name)) : expenses;
  if (operating) {
    filtered.push({
      name: "Hire & onboard first employee",
      category: "Office & Operation",
      priority: "High",
      est: 1200,
      week: 4,
      gl: "6500",
      vendorType: "Payroll / HR",
      desc: "Payroll setup & onboarding"
    });
    filtered.push({
      name: "Growth marketing retainer",
      category: "Sales Strategies",
      priority: "High",
      est: 1500,
      week: 6,
      gl: "6300",
      vendorType: "Marketing",
      desc: "Scale customer acquisition"
    });
  }
  return {
    coa,
    expenses: filtered
  };
}
function parsePlan(raw) {
  const s = raw.indexOf("{"),
    e = raw.lastIndexOf("}");
  if (s < 0 || e < 0) throw new Error("no json");
  const obj = JSON.parse(raw.slice(s, e + 1));
  if (!Array.isArray(obj.coa) || !Array.isArray(obj.expenses) || !obj.coa.length) throw new Error("bad shape");
  return obj;
}
function AiGenerate({
  industry,
  businessType,
  stage,
  plan,
  onPlan
}) {
  const [connected, setConnected] = useAi(false);
  const [loading, setLoading] = useAi(false);
  const [src, setSrc] = useAi(""); // 'ai' | 'template'

  const run = async useAiAccount => {
    setLoading(true);
    try {
      if (useAiAccount && window.claude && window.claude.complete) {
        const raw = await window.claude.complete(buildPrompt(industry, businessType, stage));
        onPlan(parsePlan(raw));
        setSrc("ai");
      } else {
        await new Promise(r => setTimeout(r, 650));
        onPlan(fallbackPlan(industry, businessType, stage));
        setSrc("template");
      }
    } catch (e) {
      onPlan(fallbackPlan(industry, businessType, stage));
      setSrc("template");
    }
    setLoading(false);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "700 19px var(--font-display)",
      margin: "0 0 4px",
      color: "var(--ink-900)"
    }
  }, "Build your books with AI"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13.5,
      color: "var(--ink-500)",
      margin: 0
    }
  }, "StartWise uses ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--ink-800)"
    }
  }, "your own AI account"), " to generate a Chart of Accounts and startup expense list tailored to a ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--ink-800)"
    }
  }, businessType), ".")), !plan ? !connected ? /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px dashed var(--border-strong)",
      borderRadius: "var(--radius-lg)",
      padding: 24,
      textAlign: "center",
      background: "var(--cream-50)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: 14,
      background: "var(--navy-050)",
      display: "grid",
      placeItems: "center",
      margin: "0 auto 14px"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkle",
    size: 24,
    color: "var(--navy-700)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "700 16px var(--font-display)",
      color: "var(--ink-900)"
    }
  }, "Connect your AI account"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: "var(--ink-500)",
      maxWidth: 380,
      margin: "6px auto 16px",
      lineHeight: 1.5
    }
  }, "Your prompts run through your connected AI service. StartWise never bills for AI usage \u2014 your history and usage stay yours."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      justifyContent: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setConnected(true),
    style: btnPrimary
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkle",
    size: 16
  }), " Connect AI account"), /*#__PURE__*/React.createElement("button", {
    onClick: () => run(false),
    style: btnGhost
  }, "Use a starter template instead"))) : /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      padding: 24,
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: 999,
      background: "var(--forest-600)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--ink-700)"
    }
  }, "AI account connected \xB7 ready to generate for ", /*#__PURE__*/React.createElement("strong", null, businessType))), /*#__PURE__*/React.createElement("button", {
    disabled: loading,
    onClick: () => run(true),
    style: {
      ...btnPrimary,
      width: "100%",
      justifyContent: "center",
      padding: "13px",
      opacity: loading ? 0.7 : 1
    }
  }, loading ? /*#__PURE__*/React.createElement(Spinner, null) : /*#__PURE__*/React.createElement(Icon, {
    name: "sparkle",
    size: 17
  }), " ", loading ? "Generating your Chart of Accounts & expenses…" : "Generate with my AI")) : /*#__PURE__*/React.createElement(PlanPreview, {
    plan: plan,
    src: src,
    onRegenerate: () => onPlan(null),
    businessType: businessType
  }), !plan && /*#__PURE__*/React.createElement(Callout, {
    icon: "help"
  }, /*#__PURE__*/React.createElement("strong", null, "Why your own AI?"), " Every business type needs a different Chart of Accounts. Generating it from your AI keeps StartWise affordable and the results yours to keep."));
}
function Spinner() {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      border: "2px solid rgba(255,255,255,0.4)",
      borderTopColor: "#fff",
      borderRadius: 999,
      display: "inline-block",
      animation: "sw-spin 0.7s linear infinite"
    }
  });
}
function PlanPreview({
  plan,
  src,
  onRegenerate,
  businessType
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 18px",
      borderBottom: "1px solid var(--border-default)",
      background: "var(--forest-050)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 17,
    color: "var(--forest-600)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      fontWeight: 600,
      color: "var(--forest-700)"
    }
  }, src === "ai" ? "Generated by your AI" : "Starter template", " \xB7 ", plan.coa.length, " accounts, ", plan.expenses.length, " expenses")), /*#__PURE__*/React.createElement("button", {
    onClick: onRegenerate,
    style: {
      ...btnGhost,
      padding: "6px 12px",
      fontSize: 12.5
    }
  }, "Regenerate")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRight: "1px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "600 10px var(--font-mono)",
      letterSpacing: "0.1em",
      color: "var(--ink-500)",
      padding: "12px 16px 8px"
    }
  }, "CHART OF ACCOUNTS"), /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: 220,
      overflowY: "auto",
      padding: "0 16px 14px"
    }
  }, plan.coa.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 10,
      padding: "6px 0",
      borderTop: i ? "1px solid var(--border-subtle)" : "none",
      fontSize: 12.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      color: "var(--navy-700)",
      fontWeight: 600,
      width: 42
    }
  }, a.num), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      color: "var(--ink-800)"
    }
  }, a.name), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink-400)",
      fontSize: 11
    }
  }, a.type))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "600 10px var(--font-mono)",
      letterSpacing: "0.1em",
      color: "var(--ink-500)",
      padding: "12px 16px 8px"
    }
  }, "STARTUP EXPENSES"), /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: 220,
      overflowY: "auto",
      padding: "0 16px 14px"
    }
  }, plan.expenses.map((e, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 10,
      padding: "6px 0",
      borderTop: i ? "1px solid var(--border-subtle)" : "none",
      fontSize: 12.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      color: "var(--ink-800)"
    }
  }, e.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      color: "var(--ink-600)"
    }
  }, StartWiseData.fmt0(e.est))))))));
}
Object.assign(window, {
  AiGenerate,
  fallbackPlan
});