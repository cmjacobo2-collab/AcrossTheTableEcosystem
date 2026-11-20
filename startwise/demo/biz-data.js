/* StartWise — Products, Vendors, Revenue, Cash Flow & Finance-for-Beginners data
   (House Cleaning Edition sample data). Pure data + helpers; screens compute aggregates. */
(function () {
  "use strict";

  /* ---------- Taxonomies (plain-English options for beginners) ---------- */
  const productCategories = ["Recurring Cleaning", "Deep Cleaning", "Specialty Cleaning", "Supplies & Retail", "Subscription Plans", "Commercial Cleaning"];
  const productTypes = ["Physical Product", "Digital Product", "Service", "Subscription", "Package"];
  const salesChannels = ["Website", "Retail Store", "Marketplace", "Phone", "Social Media", "Other"];
  const productStatuses = ["Planning", "Active", "Paused", "Discontinued"];

  const vendorCategories = ["Supplier", "Manufacturer", "Distributor", "Marketing Agency", "Technology Provider", "Software Provider", "Printing Vendor", "Shipping Vendor", "Professional Services", "Other"];
  const paymentTermsOptions = ["Due Upon Receipt", "Net 15", "Net 30", "Net 60", "Monthly", "Annual"];
  const vendorStatuses = ["Active", "Pending", "Inactive"];

  /* ---------- Products & services (sample) ---------- */
  // type/inventory: only physical products track stock; services/subscriptions leave stock null.
  const products = [
    { id: "p1", category: "Recurring Cleaning", name: "Standard residential clean", sku: "SVC-STD", description: "Whole-home recurring clean, 2–3 hours.", type: "Service", vendor: "—", cost: 45, retail: 130, wholesale: 110, stock: null, minStock: null, reorder: null, channel: "Website", monthlyQty: 60, launch: "2026-08-31", status: "Active", notes: "Most popular weekly/bi-weekly plan." },
    { id: "p2", category: "Deep Cleaning", name: "Deep clean", sku: "SVC-DEEP", description: "Top-to-bottom deep clean incl. baseboards & appliances.", type: "Service", vendor: "—", cost: 70, retail: 220, wholesale: 190, stock: null, minStock: null, reorder: null, channel: "Phone", monthlyQty: 18, launch: "2026-08-31", status: "Active", notes: "Upsell from standard clean." },
    { id: "p3", category: "Specialty Cleaning", name: "Move-out clean", sku: "SVC-MOVE", description: "Empty-home turnover clean for landlords & movers.", type: "Service", vendor: "—", cost: 90, retail: 280, wholesale: 240, stock: null, minStock: null, reorder: null, channel: "Marketplace", monthlyQty: 8, launch: "2026-09-15", status: "Active", notes: "High margin, books in clusters." },
    { id: "p4", category: "Supplies & Retail", name: "Eco supply refill kit", sku: "RET-KIT", description: "Branded eco all-purpose, glass & bathroom refills.", type: "Physical Product", vendor: "GreenLeaf Janitorial Supply", cost: 14, retail: 35, wholesale: 28, stock: 12, minStock: 15, reorder: 40, channel: "Website", monthlyQty: 25, launch: "2026-09-01", status: "Active", notes: "Sold to recurring clients as add-on." },
    { id: "p5", category: "Subscription Plans", name: "FreshNest monthly plan", sku: "SUB-MO", description: "4 cleans/month auto-billed subscription.", type: "Subscription", vendor: "—", cost: 120, retail: 320, wholesale: 320, stock: null, minStock: null, reorder: null, channel: "Website", monthlyQty: 22, launch: "2026-08-31", status: "Active", notes: "Best for predictable recurring revenue." },
    { id: "p6", category: "Commercial Cleaning", name: "Small office package", sku: "PKG-OFC", description: "Weekly small-office clean, 5-visit package.", type: "Package", vendor: "—", cost: 110, retail: 300, wholesale: 270, stock: null, minStock: null, reorder: null, channel: "Phone", monthlyQty: 6, launch: "2026-10-01", status: "Planning", notes: "New commercial line, launching Q4." },
  ];

  /* ---------- Monthly operating expenses (non-COGS cash out) ---------- */
  const opexLines = [
    { name: "Crew payroll & labor", gl: "6000", amount: 6800 },
    { name: "Insurance & bond", gl: "6100", amount: 320 },
    { name: "Vehicle & fuel", gl: "6400", amount: 540 },
    { name: "Software & subscriptions", gl: "6600", amount: 210 },
    { name: "Marketing & advertising", gl: "6300", amount: 900 },
    { name: "Misc / overhead", gl: "6000", amount: 430 },
  ];

  /* ---------- Helpers (per-product calculations from spec) ---------- */
  const profitPerUnit = (p) => (+p.retail || 0) - (+p.cost || 0);
  const marginPct = (p) => (+p.retail ? (profitPerUnit(p) / +p.retail) * 100 : 0);
  const monthlyRevenue = (p) => (+p.retail || 0) * (+p.monthlyQty || 0);
  const monthlyCogs = (p) => (+p.cost || 0) * (+p.monthlyQty || 0);
  const monthlyProfit = (p) => profitPerUnit(p) * (+p.monthlyQty || 0);
  const lowStock = (p) => p.stock != null && p.minStock != null && +p.stock <= +p.minStock;
  const isSellable = (p) => p.status === "Active" || p.status === "Paused";

  // Aggregate across active/paused products
  function aggregate(list) {
    const sellable = list.filter(isSellable);
    const revenue = sellable.reduce((s, p) => s + monthlyRevenue(p), 0);
    const cogs = sellable.reduce((s, p) => s + monthlyCogs(p), 0);
    const opex = opexLines.reduce((s, l) => s + l.amount, 0);
    const grossProfit = revenue - cogs;
    const netProfit = grossProfit - opex;
    const margins = sellable.filter((p) => +p.retail).map(marginPct);
    const avgMargin = margins.length ? margins.reduce((a, b) => a + b, 0) / margins.length : 0;
    return { revenue, cogs, opex, grossProfit, netProfit, avgMargin, monthlyExpenses: cogs + opex, count: sellable.length };
  }

  /* ---------- Finance for Beginners — Knowledge Center articles ---------- */
  const financeArticles = [
    { group: "Product & pricing", icon: "briefcase", articles: [
      { t: "What is a product SKU?", d: "A SKU is your internal code to track each product or service you sell." },
      { t: "How to price your product or service", d: "Start from your cost, add the profit you need, then check it against competitors." },
      { t: "Understanding cost of goods sold", d: "COGS is what it costs to deliver one sale — supplies, labor, materials." },
      { t: "Retail vs wholesale pricing", d: "Retail is your customer price; wholesale is a lower price for bulk or resellers." },
      { t: "How to calculate profit margin", d: "Profit ÷ retail price × 100. It tells you how much of each sale you keep." },
      { t: "How to create product packages", d: "Bundle services into one price to raise your average sale and simplify buying." },
      { t: "How to analyze competitors' pricing", d: "List nearby competitors, their prices, and where you can stand apart." },
    ]},
    { group: "Inventory", icon: "ledger", articles: [
      { t: "What is inventory?", d: "Inventory is the physical product you keep on hand to sell or use on jobs." },
      { t: "Understanding minimum stock levels", d: "The lowest amount you can hold before you risk running out mid-month." },
      { t: "How reordering works", d: "When stock hits the minimum, order your reorder quantity to refill safely." },
      { t: "Avoiding overstock and shortages", d: "Too much ties up cash; too little loses sales. Aim for the middle." },
    ]},
    { group: "Revenue", icon: "chart", articles: [
      { t: "What is revenue?", d: "Revenue is all the money coming in from sales before any costs." },
      { t: "Revenue vs profit", d: "Revenue is the top line; profit is what's left after you pay your costs." },
      { t: "How sales forecasting works", d: "Estimate units sold per month to project revenue ahead of time." },
      { t: "How to set monthly sales goals", d: "Work backward from the income you need to a unit target per product." },
      { t: "How to increase customer lifetime value", d: "Recurring plans, add-ons, and great service keep customers paying longer." },
    ]},
    { group: "Vendor management", icon: "user", articles: [
      { t: "How to choose a vendor", d: "Compare price, reliability, and service — not just the lowest quote." },
      { t: "How to compare vendor pricing", d: "Line up quotes on the same terms so you're comparing apples to apples." },
      { t: "Understanding payment terms", d: "Net 30 means you pay 30 days after the invoice — it helps your cash flow." },
      { t: "How to negotiate better agreements", d: "Volume, loyalty, and prompt payment are your bargaining chips." },
      { t: "When to change vendors", d: "Switch when price, quality, or reliability stops working for your business." },
    ]},
    { group: "Cash flow", icon: "dollar", articles: [
      { t: "What is cash flow?", d: "The money moving in (revenue) and out (expenses) of your business." },
      { t: "Why profitable businesses can fail", d: "A profit on paper still fails if the cash runs out before bills are due." },
      { t: "Understanding burn rate", d: "How fast you spend cash each month when expenses exceed income." },
      { t: "How much to keep in reserve", d: "Aim for 3–6 months of expenses in cash to weather slow periods." },
      { t: "How to read a cash flow projection", d: "Follow the ending balance row — it should stay comfortably above zero." },
    ]},
  ];

  /* ---------- AI Business Assistant prompts (bring your own AI) ---------- */
  const aiAssistant = [
    { area: "Products & Services", icon: "briefcase", title: "Analyze my product pricing", subtitle: "Are my margins healthy?", prompt: "Analyze my product pricing and tell me if my margins are healthy. Here is my product list with cost per unit, retail price, profit margin, and monthly sales quantity. Flag anything underpriced, suggest a healthier price, and explain the impact on my monthly profit in plain English." },
    { area: "Revenue Planner", icon: "chart", title: "Grow my revenue", subtitle: "Suggest ways to increase sales", prompt: "Review my monthly sales projections and suggest practical ways to increase revenue. Consider raising prices, adding packages, increasing units sold, and improving customer lifetime value. Give me 5 specific, beginner-friendly actions ranked by impact." },
    { area: "Vendors", icon: "user", title: "Optimize my vendors", subtitle: "Find ways to reduce costs", prompt: "Compare my vendors and identify opportunities to reduce costs without hurting quality. Here is my vendor list with category, pricing, payment terms, and performance ratings. Recommend which to renegotiate, consolidate, or replace." },
    { area: "Cash Flow", icon: "dollar", title: "Coach my cash flow", subtitle: "Explain my projection & fix risks", prompt: "Explain why my projected cash flow gets tight and provide recommendations. Here is my 12-month projection with starting balance, monthly revenue, and monthly expenses. Tell me in plain English which months are risky and the 3 best moves to protect my cash." },
  ];

  window.StartWiseBiz = {
    productCategories, productTypes, salesChannels, productStatuses,
    vendorCategories, paymentTermsOptions, vendorStatuses,
    products, opexLines, financeArticles, aiAssistant,
    profitPerUnit, marginPct, monthlyRevenue, monthlyCogs, monthlyProfit, lowStock, isSellable, aggregate,
  };
})();
