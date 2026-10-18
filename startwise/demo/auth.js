/* StartWise — Auth: login + onboarding */
const {
  useState: useAuthState
} = React;
const DSauth = window.AcrossTheTableDesignSystem_520822;
function AuthShell({
  children,
  wide
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      display: "grid",
      gridTemplateColumns: "1fr",
      placeItems: "center",
      background: "var(--cream-50)",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: wide ? 720 : 440
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.logo || "logo.png",
    alt: "Across the Table",
    style: {
      width: 190,
      display: "block"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "800 24px var(--font-display)",
      letterSpacing: "-0.02em",
      color: "var(--navy-700)",
      marginTop: 8
    }
  }, "StartWise"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 10px var(--font-mono)",
      letterSpacing: "0.16em",
      color: "var(--ink-500)",
      marginTop: 4
    }
  }, "YOUR 12-WEEK BUSINESS LAUNCH PLANNER")), children, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 20,
      fontSize: 12,
      color: "var(--ink-400)"
    }
  }, "Across the Table \xB7 acrossthetable.biz")));
}
function Login({
  onLogin,
  onStart
}) {
  const {
    Input,
    Button
  } = DSauth;
  const [mode, setMode] = useAuthState("signin"); // signin | signup
  const [email, setEmail] = useAuthState("");
  const [password, setPassword] = useAuthState("");
  const [error, setError] = useAuthState("");
  const [notice, setNotice] = useAuthState("");
  const [loading, setLoading] = useAuthState(false);
  const submit = async e => {
    e.preventDefault();
    setError("");
    setNotice("");
    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }
    setLoading(true);
    // Supabase loads in the background — wait up to 6s for it before giving up.
    let ready = !!(window.SW && window.SW.ready);
    if (!ready) {
      const start = Date.now();
      while (Date.now() - start < 6000) {
        await new Promise(r => setTimeout(r, 150));
        if (window.SW && window.SW.ready) {
          ready = true;
          break;
        }
      }
    }
    if (!ready) {
      setError("Couldn't reach the server. Check your connection and try again.");
      setLoading(false);
      return;
    }
    try {
      if (mode === "signup") {
        const {
          data,
          error: err
        } = await window.SW.signUp(email, password);
        if (err) setError(err.message);else if (data && data.session) onLogin({
          session: data.session,
          email: email.trim()
        });else {
          setNotice("Account created. Check your email to confirm, then sign in.");
          setMode("signin");
          setPassword("");
        }
      } else {
        const {
          data,
          error: err
        } = await window.SW.signIn(email, password);
        if (err) setError(err.message);else onLogin({
          session: data.session,
          email: email.trim()
        });
      }
    } catch (ex) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };
  const signupMode = mode === "signup";
  return /*#__PURE__*/React.createElement(AuthShell, null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-sm)",
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "700 20px var(--font-display)",
      color: "var(--ink-900)",
      margin: "0 0 4px"
    }
  }, signupMode ? "Create your account" : "Welcome back"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13.5,
      color: "var(--ink-500)",
      margin: "0 0 20px"
    }
  }, signupMode ? "Set up your sign-in for StartWise." : "Sign in to pick up your launch plan where you left off."), /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
    value: email,
    onChange: e => {
      setEmail(e.target.value);
      setError("");
    }
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Password",
    type: "password",
    placeholder: signupMode ? "At least 6 characters" : "Your password",
    value: password,
    onChange: e => {
      setPassword(e.target.value);
      setError("");
    }
  }), error && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--red-600)",
      marginTop: -2
    }
  }, error), notice && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--forest-700)",
      marginTop: -2
    }
  }, notice), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    type: "submit",
    disabled: loading,
    style: {
      marginTop: 4,
      opacity: loading ? 0.7 : 1
    }
  }, loading ? "Please wait\u2026" : signupMode ? "Create account" : "Sign in")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginTop: 16,
      fontSize: 13,
      color: "var(--ink-500)"
    }
  }, signupMode ? /*#__PURE__*/React.createElement("span", null, "Already have an account? ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      setMode("signin");
      setError("");
      setNotice("");
    },
    style: {
      color: "var(--navy-600)"
    }
  }, "Sign in")) : /*#__PURE__*/React.createElement("span", null, "New to StartWise? ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      setMode("signup");
      setError("");
      setNotice("");
    },
    style: {
      color: "var(--navy-600)"
    }
  }, "Create an account")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      margin: "22px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: "var(--border-default)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "var(--ink-400)",
      letterSpacing: "0.08em"
    }
  }, "NEW HERE?"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: "var(--border-default)"
    }
  })), /*#__PURE__*/React.createElement("button", {
    onClick: onStart,
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      padding: "13px",
      background: "#fff",
      border: "1px solid var(--border-strong)",
      borderRadius: "var(--radius-md)",
      font: "600 14px var(--font-sans)",
      color: "var(--navy-700)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkle",
    size: 16,
    color: "var(--gold-600)"
  }), " Start a new business"));
}
const INDUSTRIES = ["House Cleaning", "Landscaping", "HVAC", "Hair Salon", "Mobile Detailing", "Other"];
const STAGES = ["Idea / Planning", "Pre-Revenue", "Just Launched", "Operating"];
const FUND_OPTS = ["Personal Savings", "Friends & Family", "SBA Loan", "Business Loan", "Investor Funding", "Grants", "Credit Cards", "Equipment Financing", "Crowdfunding", "Other"];
function Onboarding({
  onDone,
  onCancel
}) {
  const {
    Input,
    Select,
    Checkbox,
    Switch,
    Button
  } = DSauth;
  const [step, setStep] = useAuthState(0);
  const [biz, setBiz] = useAuthState({
    businessName: "",
    fullName: "",
    industry: "Home Service Industry",
    businessType: "Cleaning Companies",
    stage: "Idea / Planning",
    launchDate: ""
  });
  const [funds, setFunds] = useAuthState(FUND_OPTS.map((s, i) => ({
    source: s,
    on: i < 2,
    amount: i === 0 ? 12000 : i === 1 ? 5000 : 0
  })));
  const [sms, setSms] = useAuthState(true);
  const [terms, setTerms] = useAuthState(false);
  const [legalDoc, setLegalDoc] = useAuthState(null);
  const [plan, setPlan] = useAuthState(null);
  const total = funds.filter(f => f.on).reduce((s, f) => s + (+f.amount || 0), 0);
  const steps = ["Business", "AI plan", "Funding", "Launch & terms"];
  const setFund = (i, patch) => setFunds(funds.map((f, j) => j === i ? {
    ...f,
    ...patch
  } : f));
  const canNext = step === 0 ? biz.businessName.trim() && biz.fullName.trim() : step === 1 ? !!plan : step === 3 ? terms : true;
  return /*#__PURE__*/React.createElement(AuthShell, {
    wide: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-sm)",
      padding: 30
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 24
    }
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s,
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 4,
      borderRadius: 999,
      background: i <= step ? "var(--forest-600)" : "var(--cream-100)",
      transition: "background .2s"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: i <= step ? "var(--forest-700)" : "var(--ink-400)"
    }
  }, i + 1, ". ", s)))), step === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "700 19px var(--font-display)",
      margin: 0,
      color: "var(--ink-900)"
    }
  }, "Tell us about your business"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Your name",
    placeholder: "e.g. Maria Gonzalez",
    value: biz.fullName,
    onChange: e => setBiz({
      ...biz,
      fullName: e.target.value
    })
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Business name",
    placeholder: "e.g. Sunrise Cleaning Co.",
    value: biz.businessName,
    onChange: e => setBiz({
      ...biz,
      businessName: e.target.value
    })
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Business type",
    value: biz.businessType,
    onChange: e => {
      const bt = e.target.value;
      setBiz({
        ...biz,
        businessType: bt,
        industry: StartWiseData.typeToIndustry[bt] || biz.industry
      });
      setPlan(null);
    }
  }, StartWiseData.allBusinessTypes.map(x => /*#__PURE__*/React.createElement("option", {
    key: x
  }, x))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      font: "600 12px var(--font-sans)",
      color: "var(--ink-700)"
    }
  }, "Industry ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink-400)",
      fontWeight: 400
    }
  }, "\xB7 auto-filled")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 12px",
      height: "var(--control-md)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-md)",
      fontSize: 14,
      background: "var(--cream-100)",
      color: "var(--ink-700)",
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "briefcase",
    size: 15,
    color: "var(--ink-400)"
  }), biz.industry))), /*#__PURE__*/React.createElement(Select, {
    label: "Business stage",
    value: biz.stage,
    onChange: e => setBiz({
      ...biz,
      stage: e.target.value
    })
  }, STAGES.map(x => /*#__PURE__*/React.createElement("option", {
    key: x
  }, x))), /*#__PURE__*/React.createElement(Callout, {
    icon: "lock"
  }, /*#__PURE__*/React.createElement("strong", null, "Heads up:"), " after 15 days your business name, industry, and type lock to your license. Next, AI builds a Chart of Accounts tailored to a ", biz.businessType, ".")), step === 1 && /*#__PURE__*/React.createElement(AiGenerate, {
    industry: biz.industry,
    businessType: biz.businessType,
    stage: biz.stage,
    plan: plan,
    onPlan: setPlan
  }), step === 2 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "700 19px var(--font-display)",
      margin: 0,
      color: "var(--ink-900)"
    }
  }, "How are you funding the launch?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: "var(--ink-500)",
      margin: 0
    }
  }, "Check every source you'll use and enter an amount. We'll total your startup budget."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10
    }
  }, funds.map((f, i) => /*#__PURE__*/React.createElement("label", {
    key: f.source,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 12px",
      border: `1px solid ${f.on ? "var(--forest-500)" : "var(--border-default)"}`,
      background: f.on ? "var(--forest-050)" : "#fff",
      borderRadius: "var(--radius-md)",
      cursor: "pointer",
      transition: "all .13s"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: f.on,
    onChange: e => setFund(i, {
      on: e.target.checked
    }),
    style: {
      accentColor: "var(--forest-600)",
      width: 16,
      height: 16
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 13.5,
      color: "var(--ink-800)",
      fontWeight: 500
    }
  }, f.source), f.on && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink-400)",
      fontSize: 13
    }
  }, "$"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: f.amount,
    onChange: e => setFund(i, {
      amount: e.target.value
    }),
    onClick: e => e.preventDefault(),
    style: {
      width: 78,
      padding: "5px 7px",
      border: "1px solid var(--border-default)",
      borderRadius: 6,
      fontSize: 13,
      fontFamily: "var(--font-mono)"
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 18px",
      background: "var(--navy-900)",
      borderRadius: "var(--radius-md)",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--text-on-dark-muted)"
    }
  }, "Total startup budget"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "800 24px var(--font-display)"
    }
  }, StartWiseData.fmt0(total)))), step === 3 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "700 19px var(--font-display)",
      margin: 0,
      color: "var(--ink-900)"
    }
  }, "When do you want to launch?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 14,
      alignItems: "end"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Target launch date",
    type: "date",
    value: biz.launchDate,
    onChange: e => setBiz({
      ...biz,
      launchDate: e.target.value
    }),
    hint: "We'll build your 12-week plan backward from here."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Switch, {
    label: "Daily SMS reminders",
    checked: sms,
    onChange: e => setSms(e.target.checked)
  }))), sms && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      background: "var(--navy-900)",
      borderRadius: "var(--radius-md)",
      padding: "14px 16px",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkle",
    size: 18,
    color: "var(--gold-400)",
    style: {
      flexShrink: 0,
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "600 9px var(--font-mono)",
      letterSpacing: "0.12em",
      color: "var(--gold-400)"
    }
  }, "EVERY DAILY SMS INCLUDES AN AFFIRMATION"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      marginTop: 4,
      lineHeight: 1.45
    }
  }, "\u201C", (StartWiseData.affirmationOfDay() || {}).text, "\u201D"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--cream-100)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-md)",
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "600 9.5px var(--font-mono)",
      letterSpacing: "0.12em",
      color: "var(--ink-500)",
      marginBottom: 10
    }
  }, "BEFORE YOU START"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      fontSize: 13,
      color: "var(--ink-600)",
      marginBottom: 14
    }
  }, (window.LEGAL_DOCS || []).map(d => /*#__PURE__*/React.createElement("a", {
    key: d.id,
    href: "#",
    onClick: e => {
      e.preventDefault();
      setLegalDoc(d);
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      color: "var(--navy-600)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "file",
    size: 15
  }), " ", d.title))), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "flex-start",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: terms,
    onChange: e => setTerms(e.target.checked),
    style: {
      accentColor: "var(--forest-600)",
      width: 17,
      height: 17,
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--ink-700)"
    }
  }, "I've reviewed and accept the Terms, Privacy Policy, and License Agreement. ", terms && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink-400)"
    }
  }, "\xB7 accepted ", new Date().toLocaleDateString()))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 26
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => step === 0 ? onCancel() : setStep(step - 1),
    style: {
      ...btnGhost,
      background: "transparent",
      border: "none",
      color: "var(--ink-500)"
    }
  }, step === 0 ? "Cancel" : "Back"), step < 3 ? /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    disabled: !canNext,
    onClick: () => canNext && setStep(step + 1),
    rightIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "arrowRight",
      size: 16
    })
  }, "Continue") : /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    disabled: !terms,
    onClick: () => onDone({
      biz,
      funds,
      sms,
      terms,
      total,
      plan
    }),
    rightIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 16
    })
  }, "Launch my plan"))), legalDoc && /*#__PURE__*/React.createElement(LegalModal, {
    doc: legalDoc,
    onClose: () => setLegalDoc(null)
  }));
}
Object.assign(window, {
  Login,
  Onboarding
});