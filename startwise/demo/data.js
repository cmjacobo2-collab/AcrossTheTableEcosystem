/* StartWise — House Cleaning Edition sample data + helpers */
(function () {
  "use strict";

  // ---- Business profile ----
  const business = {
    accountNumber: "SW-HC-2048",
    fullName: "Dana Rivera",
    businessName: "FreshNest Cleaning Co.",
    industry: "Home Service Industry",
    businessType: "Cleaning Companies",
    edition: "House Cleaning Edition",
    email: "dana@freshnestclean.com",
    phone: "(602) 555-0148",
    dateJoined: "2026-06-01",
    setupAt: "2026-06-01T14:22:00",
    membership: "Active",
    locked: false, // becomes true after 15 days
    launchDate: "2026-08-31",
    smsReminders: true,
    smsFrequency: "Daily",
    termsAccepted: true,
    termsAcceptedAt: "2026-06-01T14:22:00",
  };

  // ---- Funding sources ----
  const funding = [
    { source: "Personal Savings", amount: 12000, on: true },
    { source: "Friends & Family", amount: 5000, on: true },
    { source: "SBA Loan", amount: 8000, on: true },
    { source: "Business Loan", amount: 0, on: false },
    { source: "Investor Funding", amount: 0, on: false },
    { source: "Grants", amount: 0, on: false },
    { source: "Credit Cards", amount: 0, on: false },
    { source: "Equipment Financing", amount: 0, on: false },
    { source: "Crowdfunding", amount: 0, on: false },
    { source: "Other", amount: 0, on: false },
  ];

  // ---- Account types ----
  const accountTypes = ["Asset", "Liability", "Equity", "Revenue", "Cost of Goods Sold", "Expense"];

  // ---- Chart of Accounts (House Cleaning specific) ----
  const coa = [
    { num: "1000", name: "Cash", type: "Asset", category: "Current Assets", desc: "Operating bank account" },
    { num: "1100", name: "Accounts Receivable", type: "Asset", category: "Current Assets", desc: "Amounts owed by clients" },
    { num: "1200", name: "Cleaning Supplies Inventory", type: "Asset", category: "Current Assets", desc: "On-hand consumable supplies" },
    { num: "1500", name: "Equipment", type: "Asset", category: "Fixed Assets", desc: "Vacuums, scrubbers, carts" },
    { num: "1510", name: "Vehicles", type: "Asset", category: "Fixed Assets", desc: "Service vehicles" },
    { num: "1600", name: "Accumulated Depreciation", type: "Asset", category: "Fixed Assets", desc: "Contra-asset for equipment & vehicles" },
    { num: "2000", name: "Accounts Payable", type: "Liability", category: "Current Liabilities", desc: "Amounts owed to vendors" },
    { num: "2100", name: "Credit Card Payable", type: "Liability", category: "Current Liabilities", desc: "Business card balance" },
    { num: "2500", name: "Loans Payable", type: "Liability", category: "Long-Term Liabilities", desc: "SBA & equipment financing" },
    { num: "3000", name: "Owner's Equity", type: "Equity", category: "Equity", desc: "Owner contributions" },
    { num: "3100", name: "Owner's Draw", type: "Equity", category: "Equity", desc: "Owner withdrawals" },
    { num: "4000", name: "Cleaning Revenue", type: "Revenue", category: "Income", desc: "Recurring residential cleans" },
    { num: "4100", name: "Deep Clean Revenue", type: "Revenue", category: "Income", desc: "One-time deep & move-out cleans" },
    { num: "5000", name: "Cost of Goods Sold", type: "Cost of Goods Sold", category: "COGS", desc: "Direct job costs" },
    { num: "5100", name: "Cleaning Supplies Expense", type: "Cost of Goods Sold", category: "COGS", desc: "Consumables used on jobs" },
    { num: "6000", name: "Operating Expenses", type: "Expense", category: "Operating", desc: "General overhead" },
    { num: "6100", name: "Insurance Expense", type: "Expense", category: "Operating", desc: "Liability & janitorial bond" },
    { num: "6200", name: "Licensing & Permits", type: "Expense", category: "Operating", desc: "Business license, registrations" },
    { num: "6300", name: "Marketing & Advertising", type: "Expense", category: "Operating", desc: "Ads, signage, branding" },
    { num: "6400", name: "Vehicle & Fuel", type: "Expense", category: "Operating", desc: "Fuel, maintenance, wraps" },
    { num: "6600", name: "Software & Subscriptions", type: "Expense", category: "Operating", desc: "Booking, scheduling, accounting" },
  ];

  // ---- Priority + status enums ----
  const PRIORITIES = ["High", "Medium", "Low"];
  const STATUSES = ["To Do", "In Progress", "Follow-Up", "Completed"];

  const weekThemes = {
    1: "Business foundation",
    2: "Legal & insurance",
    3: "Core equipment",
    4: "Digital presence",
    5: "Mobility & scheduling",
    6: "Brand & uniforms",
    7: "Systems & books",
    8: "Marketing push",
    9: "Pricing & packages",
    10: "Hiring & training",
    11: "Soft launch",
    12: "Grand opening",
  };

  // due date helper relative to joined date
  function due(week) {
    const start = new Date("2026-06-08");
    const d = new Date(start.getTime() + (week - 1) * 7 * 86400000);
    return d.toISOString().slice(0, 10);
  }

  let _id = 0;
  const tid = () => "t" + (++_id);

  // ---- Tasks (single source of truth) ----
  // type: Financial tasks carry GL info + costs (appear in Budget Planner & COA);
  // Non-Financial tasks appear in planner + reports progress only.
  const tasks = [
    // WEEK 1
    { id: tid(), name: "Register business & file LLC", desc: "Form the LLC and register the trade name with the state.", type: "Financial", category: "Legal & Registration", priority: "High", est: 250, actual: 235, week: 1, due: due(1), status: "Completed", gl: "6200", vendorType: "State / Registered Agent" },
    { id: tid(), name: "Research local cleaning competitors", desc: "Map 8–10 local cleaners: pricing, services, reviews.", type: "Non-Financial", category: "Market Research", priority: "High", est: 0, actual: 0, week: 1, due: due(1), status: "Completed" },
    { id: tid(), name: "Buy cleaning supplies starter kit", desc: "Eco-friendly all-purpose, glass, bathroom, floor cleaners.", type: "Financial", category: "Equipment & Assets", priority: "High", est: 450, actual: 420, week: 1, due: due(1), status: "Completed", gl: "1200", vendorType: "Janitorial Supplier" },

    // WEEK 2
    { id: tid(), name: "General liability insurance", desc: "$1M general liability policy for residential cleaning.", type: "Financial", category: "Legal & Registration", priority: "High", est: 600, actual: 0, week: 2, due: due(2), status: "In Progress", gl: "6100", vendorType: "Insurance Broker" },
    { id: tid(), name: "Janitorial bond", desc: "Surety bond to reassure clients on theft/damage.", type: "Financial", category: "Legal & Registration", priority: "High", est: 200, actual: 0, week: 2, due: due(2), status: "To Do", gl: "6100", vendorType: "Insurance Broker" },
    { id: tid(), name: "Business bank account & card processing", desc: "Open a business checking account and set up card payments.", type: "Financial", category: "Office & Operation", priority: "High", est: 30, actual: 0, week: 2, due: due(2), status: "To Do", gl: "6600", vendorType: "Payment Processor", vendor: "Square", vendorWebsite: "https://squareup.com" },
    { id: tid(), name: "Create brand name & logo", desc: "Finalize FreshNest identity, colors, and logo files.", type: "Non-Financial", category: "Branding Strategy", priority: "Medium", est: 0, actual: 0, week: 2, due: due(2), status: "Completed" },

    // WEEK 3
    { id: tid(), name: "Commercial vacuum cleaners (x2)", desc: "Two HEPA upright vacuums for the crew.", type: "Financial", category: "Equipment & Assets", priority: "High", est: 800, actual: 0, week: 3, due: due(3), status: "To Do", gl: "1500", vendorType: "Equipment Supplier" },
    { id: tid(), name: "Cleaning caddies & carts", desc: "Portable caddies and a rolling supply cart.", type: "Financial", category: "Equipment & Assets", priority: "Low", est: 220, actual: 0, week: 3, due: due(3), status: "To Do", gl: "1500", vendorType: "Equipment Supplier" },
    { id: tid(), name: "Identify target neighborhoods", desc: "Pick 3 zip codes with the right household income & density.", type: "Non-Financial", category: "Customer Research", priority: "Medium", est: 0, actual: 0, week: 3, due: due(3), status: "In Progress" },

    // WEEK 4
    { id: tid(), name: "Website + online booking", desc: "Build site with instant quote & booking calendar.", type: "Financial", category: "Sales Strategies", priority: "High", est: 900, actual: 880, week: 4, due: due(4), status: "Completed", gl: "6600", vendorType: "Web / Software", vendor: "Squarespace", vendorWebsite: "https://www.squarespace.com" },
    { id: tid(), name: "Set up Google Business Profile", desc: "Claim and complete the local listing with photos.", type: "Non-Financial", category: "Marketing Strategy", priority: "High", est: 0, actual: 0, week: 4, due: due(4), status: "To Do" },

    // WEEK 5
    { id: tid(), name: "Service vehicle down payment", desc: "Down payment on a reliable used cargo van.", type: "Financial", category: "Equipment & Assets", priority: "High", est: 2500, actual: 0, week: 5, due: due(5), status: "To Do", gl: "1510", vendorType: "Auto Dealer" },
    { id: tid(), name: "Scheduling software (annual)", desc: "Crew scheduling, routing, and client reminders.", type: "Financial", category: "Office & Operation", priority: "Medium", est: 360, actual: 0, week: 5, due: due(5), status: "To Do", gl: "6600", vendorType: "Web / Software" },

    // WEEK 6
    { id: tid(), name: "Vehicle wrap & signage", desc: "Branded van wrap + magnetic door signs.", type: "Financial", category: "Sales Strategies", priority: "Medium", est: 600, actual: 0, week: 6, due: due(6), status: "To Do", gl: "6300", vendorType: "Signage / Print" },
    { id: tid(), name: "Uniforms & PPE", desc: "Branded shirts, gloves, shoe covers, masks.", type: "Financial", category: "Equipment & Assets", priority: "Low", est: 300, actual: 0, week: 6, due: due(6), status: "To Do", gl: "6000", vendorType: "Apparel Supplier" },

    // WEEK 7
    { id: tid(), name: "Accounting software setup", desc: "Connect bank, set up the chart of accounts.", type: "Financial", category: "Office & Operation", priority: "Medium", est: 240, actual: 0, week: 7, due: due(7), status: "To Do", gl: "6600", vendorType: "Web / Software", vendor: "QuickBooks", vendorWebsite: "https://quickbooks.intuit.com" },
    { id: tid(), name: "CRM & client management software", desc: "Track leads, clients, and follow-ups in one place.", type: "Financial", category: "Office & Operation", priority: "Medium", est: 39, actual: 0, week: 7, due: due(7), status: "To Do", gl: "6600", vendorType: "Software Provider", vendor: "Pipedrive", vendorWebsite: "https://www.pipedrive.com" },
    { id: tid(), name: "Write cleaning checklists & SOPs", desc: "Room-by-room checklists for standard & deep cleans.", type: "Non-Financial", category: "Systems & Operations", priority: "Medium", est: 0, actual: 0, week: 7, due: due(7), status: "To Do" },

    // WEEK 8
    { id: tid(), name: "Launch intro marketing campaign", desc: "Local mailers + paid social for first-clean discount.", type: "Financial", category: "Sales Strategies", priority: "High", est: 800, actual: 0, week: 8, due: due(8), status: "To Do", gl: "6300", vendorType: "Marketing Agency" },
    { id: tid(), name: "Email marketing & newsletter tool", desc: "Send promos and recurring-client newsletters.", type: "Financial", category: "Sales Strategies", priority: "Medium", est: 25, actual: 0, week: 8, due: due(8), status: "To Do", gl: "6300", vendorType: "Marketing", vendor: "Mailchimp", vendorWebsite: "https://mailchimp.com" },

    // WEEK 9
    { id: tid(), name: "Finalize service packages & pricing", desc: "Standard, deep, move-out, and recurring plans.", type: "Non-Financial", category: "Product / Service Development", priority: "High", est: 0, actual: 0, week: 9, due: due(9), status: "To Do" },
    { id: tid(), name: "Microfiber cloths & mops (bulk)", desc: "Color-coded microfiber and flat-mop refills.", type: "Financial", category: "Equipment & Assets", priority: "Medium", est: 180, actual: 0, week: 9, due: due(9), status: "To Do", gl: "1200", vendorType: "Janitorial Supplier" },

    // WEEK 10
    { id: tid(), name: "Draft client service agreement", desc: "Terms, cancellation policy, and satisfaction guarantee.", type: "Non-Financial", category: "Legal & Compliance", priority: "Medium", est: 0, actual: 0, week: 10, due: due(10), status: "To Do" },
    { id: tid(), name: "Plan hiring & first cleaner", desc: "Job post, interview script, and onboarding checklist.", type: "Non-Financial", category: "Human Resource Strategy", priority: "Medium", est: 0, actual: 0, week: 10, due: due(10), status: "To Do" },

    // WEEK 11
    { id: tid(), name: "Soft launch with friends & family", desc: "5 discounted cleans to test the workflow and gather reviews.", type: "Non-Financial", category: "Launch Strategy", priority: "High", est: 0, actual: 0, week: 11, due: due(11), status: "To Do" },

    // WEEK 12
    { id: tid(), name: "Grand opening promotion", desc: "Announce launch, referral program, and first-month offer.", type: "Non-Financial", category: "Growth Strategy", priority: "High", est: 0, actual: 0, week: 12, due: due(12), status: "To Do" },
  ];

  // ---- Vendors / RunBook (created from completed financial tasks) ----
  const vendors = [
    {
      id: "v1", taskName: "Register business & file LLC", vendorName: "Arizona Corporation Commission",
      category: "Professional Services", status: "Active",
      contact: "Online Filing", phone: "(602) 542-3026", email: "support@azcc.gov", website: "azcc.gov",
      service: "LLC formation & trade name", contractStart: "2026-06-09", renewal: "2027-06-09",
      lastOrder: "2026-06-09", nextOrder: "2027-06-09",
      terms: "Due Upon Receipt", cost: 235, rating: 4, gl: "6200", notes: "Filed online, approved in 3 days.",
    },
    {
      id: "v2", taskName: "Buy cleaning supplies starter kit", vendorName: "GreenLeaf Janitorial Supply",
      category: "Supplier", status: "Active",
      contact: "Marcus Ortiz", phone: "(602) 555-7781", email: "orders@greenleafsupply.com", website: "greenleafsupply.com",
      service: "Eco-friendly cleaning supplies", contractStart: "2026-06-10", renewal: "—",
      lastOrder: "2026-06-22", nextOrder: "2026-07-06",
      terms: "Net 15", cost: 420, rating: 5, gl: "1200", notes: "Great bulk pricing, fast local delivery.",
    },
    {
      id: "v3", taskName: "Website + online booking", vendorName: "BrightSite Studio",
      category: "Technology Provider", status: "Active",
      contact: "Priya Nair", phone: "(480) 555-2210", email: "hello@brightsite.studio", website: "brightsite.studio",
      service: "Website + booking integration", contractStart: "2026-06-29", renewal: "2026-07-12",
      lastOrder: "2026-06-29", nextOrder: "—",
      terms: "Net 30", cost: 880, rating: 4, gl: "6600", notes: "Booking calendar synced to scheduling app.",
    },
  ];

  // ---- helpers ----
  const fmt = (n) =>
    "$" + Number(n || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmt0 = (n) => "$" + Number(n || 0).toLocaleString("en-US", { maximumFractionDigits: 0 });

  // category color palette (stable mapping)
  const catColors = {
    "Equipment & Assets": "#246049",
    "Legal & Registration": "#1B344F",
    "Sales Strategies": "#C8962E",
    "Office & Operation": "#34597A",
    "Financial Planning": "#2F7558",
    "Human Resource Strategy": "#A8392B",
    "Location & Infrastructure": "#946312",
    "Contracts": "#647281",
  };
  const palette = ["#1B344F", "#246049", "#C8962E", "#34597A", "#A8392B", "#2F7558", "#B07D1E", "#647281", "#244463"];

  // ---- Industry -> Business Type taxonomy (from list of industries.xlsx) ----
  const industries = {"Automotive Services":["Auto Detailing","Car Washes","Mobile Detailing","Vehicle Appearance Services"],"Commerce Industry":["Creative / Media","Online Services & Digital Commerce"],"Creative Services":["Photography & Videography","Graphic Design & Content Creation"],"E-Commerce Business Models":["Dropshipping","Print-on-Demand","Marketplace Platforms","Affiliate Commerce","Digital Products","Social Commerce","Subscription Box Businesses"],"Educational & Tutoring Services":["Educational Consulting","Music Instruction","Language Instruction"],"Food & Hospitality Industry":["Bar / Adult Beverage","Coffee Shop","Food Truck","Franchise Business","Restaurant — Food & Beverage","Restaurant — Food Only","Personal Chef"],"Healthcare Industry":["Chiropractic Clinics","Dental Practices","Fitness Gyms & Studios","Health & Wellness","Medical Practices","Personal Trainer"],"Home Service Industry":["Cleaning Companies","Landscaping Business","Auto Repair Shops","Construction Companies","Electrical Contracting","HVAC Companies","Plumbing Companies"],"Manufacturing & Industrial":["Logistics & Trucking","Manufacturing Companies"],"Personal Care & Grooming":["Barber Shops","Estheticians","Hair Salons","Massage Therapists","Nail Salons","Spas"],"Pet Care Services":["Pet Sitting","Pet Grooming","Dog Walking"],"Product-Based Categories":["Beauty & Cosmetics","Fine Jewelry & Accessories","Food & Beverage","Electronics","Home Goods & Furniture","Toys & Games","Apparel & Fashion","Health & Wellness Products","Pet Products","Sporting Goods"],"Professional Services":["Accounting Firm","Consulting Services","Insurance Agencies","Law Firms","Real Estate Agent","Real Estate Brokerages"],"Retail Categories":["Retail Store","Wholesale Distribution","Direct-to-Consumer (DTC)","Brick-and-Mortar Retail","Convenience Retail","Franchise Retail","Specialty Retail"],"Technology & Digital":["Amazon FBA Business","IT Services / MSP","Marketing Agency","Technology / SaaS","Shopify Store","Etsy Shop"]};

  // ---- Stage-tailored non-financial tasks (Business Stage → operational tasks) ----
  const stageTasks = {
    "Idea / Planning": [
      { name: "Validate the problem with 5 customer interviews", category: "Customer Research", priority: "High", week: 1, desc: "Confirm a real, painful problem before you build." },
      { name: "Research local competitors & pricing", category: "Market Research", priority: "High", week: 1, desc: "Map 8–10 competitors: pricing, services, reviews." },
      { name: "Write your mission & vision", category: "Entrepreneur Mindset", priority: "Medium", week: 2, desc: "Anchor every decision with a clear purpose." },
      { name: "Define your core service packages", category: "Product / Service Development", priority: "High", week: 2, desc: "What you sell, to whom, at what price." },
      { name: "Choose a business name & check availability", category: "Branding Strategy", priority: "Medium", week: 3, desc: "Name, domain, and trademark check." },
      { name: "Draft a one-page business plan", category: "Financial Planning", priority: "Medium", week: 3, desc: "Goals, costs, and revenue model on a page." },
      { name: "Decide your legal structure", category: "Legal & Compliance", priority: "High", week: 4, desc: "LLC, sole prop, or corp — pick and file." },
    ],
    "Pre-Revenue": [
      { name: "Finalize brand identity & logo", category: "Branding Strategy", priority: "High", week: 2, desc: "Colors, logo, and voice locked in." },
      { name: "Build website + booking/contact", category: "Marketing Strategy", priority: "High", week: 3, desc: "A site that turns visitors into leads." },
      { name: "Set up Google Business Profile", category: "Marketing Strategy", priority: "High", week: 4, desc: "Claim and complete your local listing." },
      { name: "Create service checklists & SOPs", category: "Systems & Operations", priority: "Medium", week: 5, desc: "Repeatable steps for consistent delivery." },
      { name: "Line up your first 3 pilot customers", category: "Sales Strategies", priority: "High", week: 6, desc: "Discounted trials to prove the model." },
      { name: "Set pricing & payment terms", category: "Product / Service Development", priority: "Medium", week: 4, desc: "Rates, deposits, and cancellation policy." },
    ],
    "Just Launched": [
      { name: "Collect first reviews & testimonials", category: "Marketing Strategy", priority: "High", week: 2, desc: "Social proof from your earliest customers." },
      { name: "Set up a CRM & follow-up system", category: "Systems & Operations", priority: "Medium", week: 3, desc: "Never let a lead slip through." },
      { name: "Launch a referral program", category: "Growth Strategy", priority: "High", week: 4, desc: "Turn happy customers into your sales team." },
      { name: "Track weekly cash flow", category: "Financial Planning", priority: "High", week: 2, desc: "Know your runway every single week." },
      { name: "Refine your service from feedback", category: "Product / Service Development", priority: "Medium", week: 5, desc: "Tighten what customers actually value." },
      { name: "Plan your first hire", category: "Human Resource Strategy", priority: "Medium", week: 6, desc: "Job description and onboarding checklist." },
    ],
    "Operating": [
      { name: "Document & systematize operations", category: "Systems & Operations", priority: "High", week: 2, desc: "Make the business run without you." },
      { name: "Hire & train team members", category: "Human Resource Strategy", priority: "High", week: 3, desc: "Recruit, onboard, and train to standard." },
      { name: "Build a 12-month growth plan", category: "Growth Strategy", priority: "High", week: 4, desc: "Targets, channels, and milestones." },
      { name: "Negotiate better vendor terms", category: "Sales Strategies", priority: "Medium", week: 5, desc: "Improve margins with volume pricing." },
      { name: "Add a new revenue stream", category: "Product / Service Development", priority: "Medium", week: 6, desc: "Upsell, subscription, or new service line." },
      { name: "Review financials & tax strategy", category: "Financial Planning", priority: "High", week: 7, desc: "Quarterly review with your advisor." },
    ],
  };

  // ---- Flat business-type list + reverse map (pick type -> industry auto-fills) ----
  const allBusinessTypes = [];
  const typeToIndustry = {};
  Object.entries(industries).forEach(([ind, types]) => types.forEach((t) => { if (!typeToIndustry[t]) { typeToIndustry[t] = ind; allBusinessTypes.push(t); } }));
  allBusinessTypes.sort();

  // ---- Affirmation of the day (daily SMS) ----
  function affirmationOfDay(offset) {
    const list = window.StartWiseAffirmations || [];
    if (!list.length) return { title: "Daily", text: "" };
    const day = Math.floor(Date.now() / 86400000) + (offset || 0);
    return list[((day % list.length) + list.length) % list.length];
  }

  window.StartWiseData = {
    business, funding, accountTypes, coa, tasks, vendors, industries, stageTasks,
    allBusinessTypes, typeToIndustry, affirmationOfDay,
    PRIORITIES, STATUSES, weekThemes, fmt, fmt0, catColors, palette, due,
  };
})();
