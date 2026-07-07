// ============================================================
// QUANTΣODE Site Configuration
// ============================================================

export const siteConfig = {
  brandName: "QUANT\u03A3ODE",
  brandNamePlain: "QUANTΣODE",
  tagline: "// SYSTEMATIC TRADING LAB",
  subtitle: "MNIT JAIPUR | EST. 2026",
  email: "2025UCH1743@mnit.ac.in",
  linkedin: "https://www.linkedin.com/company/quant%CF%83ode/",
  instagram: "https://www.instagram.com/quantcode_nitjaipur/",
  github: "#",
  summerOfQuantForm: "https://forms.gle/fZvGefem33yqwk9Q8",
  copyright: "\u00A9 2026 QUANT\u03A3ODE. All rights reserved.",
};

// ============================================================
// Navigation
// ============================================================

export const navigationConfig = {
  links: [
    { label: "Our Edge", href: "#alpha-pipeline" },
    { label: "Focus", href: "#core-focus" },
    { label: "Teams", href: "#teams" },
    { label: "Courses & Events", href: "#courses-events" },
    { label: "Contact", href: "#contact" },
  ],
  ctaText: "[JOIN US]",
  ctaHref: "#contact",
};

// ============================================================
// Hero
// ============================================================

export const heroConfig = {
  eyebrow: "MNIT JAIPUR  \u00B7  QUANTITATIVE FINANCE CLUB",
  title: "QUANT\u03A3ODE",
  typewriterPrefix: "Building",
  typewriterTexts: [
    "Systematic Trading Systems.",
    "Statistical Arbitrage Models.",
    "Alpha Research Pipelines.",
    "Market Microstructure Tools.",
  ],
  body: "Building systematic strategies, publishing alpha research, and creating a direct pipeline to quantitative careers.",
  ctaPrimary: "Join the Lab",
  ctaSecondary: "Learn More \u2192",
  ctaSecondaryHref: "#alpha-pipeline",
  pills: [
    "Systematic Trading",
    "Alpha Research",
    "Market Microstructure",
    "HFT Pipeline",
    "Options Pricing",
    "Statistical Arbitrage",
    "Backtesting",
  ],
};

// ============================================================
// Stats Bar
// ============================================================

export const statsConfig = [
  { value: 30, suffix: "+", label: "Club Members" },
  { value: 2, suffix: "", label: "Courses offered" },
  { value: 1, suffix: "", label: "Seasonal Events" },
  { value: 4, suffix: "", label: "Functional Wings" },
];

// ============================================================
// Summer of Quant
// ============================================================

export const coursesEventsConfig = {
  eyebrow: "LEARNING PATHWAYS",
  heading: "Courses & Events",
  sub: "Structured programmes designed to take you from foundational concepts to practitioner-level quantitative finance skills.",
  offerings: [
    {
      tag: "FOUNDATION COURSE",
      title: "Basics of Quantitative Finance",
      description:
        "A foundational course covering how markets work, Python for financial mathematics, time series analysis, randomness in markets, and basic portfolio and risk management.",
      highlights: ["Market Structure", "Python for Finance", "Time Series Analysis", "Portfolio & Risk Mgmt"],
      duration: "2-3 Months",
      level: "Beginner",
      ctaText: "Learn More \u2192",
      ctaHref: "#contact",
    },
    {
      tag: "ADVANCED COURSE",
      title: "Quantitative Finance Practitioner",
      description:
        "A one-year practitioner-level programme covering stochastic calculus, quantitative risk and return, derivatives pricing, machine learning for finance, and fixed income and credit risk.",
      highlights: ["Stochastic Calculus", "Derivatives Pricing", "ML for Finance", "Fixed Income & Credit Risk"],
      duration: "1 Year",
      level: "Intermediate",
      ctaText: "Learn More \u2192",
      ctaHref: "#contact",
    },
    {
      tag: "SEASONAL EVENT",
      title: "Summer of Quant",
      description:
        "Our flagship annual summer programme. An immersive experience combining lectures, hands-on projects, paper trading competitions, and mentorship from industry professionals.",
      highlights: ["Live Projects", "Paper Trading", "Industry Mentorship", "Certificates"],
      duration: "Summer",
      level: "Open to All",
      ctaText: "Register Interest \u2192",
      ctaHref: "#contact",
    },
  ],
};

// ============================================================
// Alpha Pipeline
// ============================================================

export const alphaPipelineConfig = {
  sectionLabel: "Our Edge",
  heading: "The Alpha Pipeline",
  body: "We don't rely on gut feelings or discretionary stock picking. We build mathematically rigorous, automated trading systems designed to exploit market inefficiencies at scale.",
  steps: [
    {
      number: "01",
      title: "Data Ingestion",
      description: "Processing high-frequency limit order book (LOB) data, alternative datasets, and macroeconomic indicators with microsecond precision.",
    },
    {
      number: "02",
      title: "Signal Generation",
      description: "Deploying statistical arbitrage models, machine learning forecasts, and time-series analysis to discover predictive alpha.",
    },
    {
      number: "03",
      title: "Risk Management",
      description: "Dynamic portfolio optimization, beta-hedging, and strict Value-at-Risk (VaR) parameters to protect capital against market shocks.",
    },
    {
      number: "04",
      title: "Algo Execution",
      description: "Low-latency order routing, smart execution algorithms (VWAP, TWAP), and slippage minimization in live markets.",
    },
  ],
};

// ============================================================
// Core Focus
// ============================================================

export const coreFocusConfig = {
  sectionLabel: "Core Focus",
  heading: "What We Build",
  sub: "Systematic trading infrastructure and published quant research",
  cards: [
    {
      icon: "\uD83D\uDCCA",
      title: "Quantitative Research",
      bullets: [
        "Paper replication (Fama-French, Carhart, AQR)",
        "Alpha research notes & strategy teardowns",
        "Working paper publication pipeline",
        "Factor research & backtesting",
      ],
      detailChips: ["Fama-French replication", "AQR factor teardowns", "Backtesting in Python"],
    },
    {
      icon: "\u26A1",
      title: "Algorithmic Trading",
      bullets: [
        "Low-latency backtesting frameworks",
        "Order flow & market microstructure",
        "Statistical arbitrage & pairs trading",
        "HFT simulations",
      ],
      detailChips: ["Zipline backtests", "Orderbook replay", "Latency profiling"],
    },
    {
      icon: "\uD83D\uDCC8",
      title: "Derivatives & Risk",
      bullets: [
        "Options pricing (Black-Scholes, Greeks)",
        "Volatility surface modeling",
        "Stochastic calculus applications",
        "Portfolio risk management",
      ],
      detailChips: ["Black-Scholes PDE solver", "Greeks calculator", "VaR backtesting"],
    },
    {
      icon: "\uD83E\uDD16",
      title: "ML for Finance",
      bullets: [
        "Time series forecasting using ML models",
        "Signal processing for alpha discovery",
        "Reinforcement learning for trading",
        "NLP for sentiment analysis",
      ],
      detailChips: ["PyTorch models", "Feature engineering", "Walk-forward validation"],
    },
    {
      icon: "\uD83D\uDCBC",
      title: "Placement Pipeline",
      bullets: [
        "HFT firm interview preparation",
        "Mental math & probability drills",
        "C++ for low-latency systems",
        "Industry networking & mentorship",
      ],
      detailChips: ["Greenhill mock interviews", "Brain teaser prep", "Resume review"],
    },
    {
      icon: "\uD83D\uDD2C",
      title: "Systematic Lab",
      bullets: [
        "Live paper trading competitions",
        "Open-source quantitative library",
        "Weekly research seminars",
        "Collaborative strategy development",
      ],
      detailChips: ["Paper trading engine", "GitHub open source", "Seminar schedule"],
    },
  ],
};

// ============================================================
// Strategy Chart
// ============================================================

export const liveMarketConfig = {
  sectionLabel: "MARKET INTELLIGENCE \u00B7 LIVE",
  heading: "Global Markets Overview",
  sub: "Real-time market data tracking major global indices, commodities, and currencies. Data refreshes every few seconds to keep you connected to market movements.",
};

// ============================================================
// Terminal
// ============================================================

export const terminalConfig = {
  filename: "system_status.sh",
  lines: [
    { text: "$ ./system_status.sh", delay: 0, color: "default" },
    { text: "> Initializing strategy environment...", delay: 400, color: "default" },
    { text: "\u2713 Environment READY", delay: 900, color: "green" },
    { text: "> Backtesting engine: ONLINE", delay: 1400, color: "default" },
    { text: "> Loading historical tick data (2015\u20132026)...", delay: 2100, color: "default" },
    { text: "\u2713 14.2 GB LOADED", delay: 2700, color: "cyan" },
    { text: "> Sharpe Ratio target: > 2.0", delay: 3300, color: "default", highlight: "> 2.0", highlightColor: "gold" },
    { text: "> Max Drawdown limit: < 10%", delay: 3900, color: "default", highlight: "< 10%", highlightColor: "gold" },
    { text: "> All systems: OPERATIONAL", delay: 4500, color: "green" },
  ],
};

// ============================================================
// Teams
// ============================================================

export const teamsConfig = {
  sectionLabel: "Functional Wings",
  heading: "Specialized Teams",
  sub: "Four wings driving research, development, and operations",
  teams: [
    {
      icon: "\uD83E\uDDEE",
      title: "Quantitative Engineering & Mathematical Modeling",
      description: "Studies stochastic processes, derivatives pricing, and risk modeling, and applies them through backtesting projects and quant research within the club.",
      category: "QUANT ENG",
    },
    {
      icon: "\uD83E\uDD16",
      title: "Algorithm Design & Machine Learning",
      description: "Explores algorithmic trading concepts and ML applications in finance, working on time series forecasting and signal processing as part of club projects.",
      category: "ALGO & ML",
    },
    {
      icon: "\uD83C\uDFAA",
      title: "Events, Logistics & PR",
      description: "Organizes seminars, trading competitions, workshops, and guest sessions. Handles day-to-day club operations and keeps activities running smoothly.",
      category: "EVENTS",
    },
    {
      icon: "\uD83E\uDD1D",
      title: "Outreach & Industrial Relations",
      description: "Connects the club with industry professionals and alumni, organizes mentorship sessions and guest talks, and builds external visibility for the club.",
      category: "OUTREACH",
    },
  ],
};

// ============================================================
// Leadership
// ============================================================



// ============================================================
// Contact
// ============================================================

export const contactConfig = {
  sectionLabel: "Get Involved",
  heading: "Join QUANT\u03A3ODE",
  body: "Whether you're interested in derivatives pricing, algorithmic trading, or machine learning for finance, QUANT\u03A3ODE offers the perfect environment to develop cutting-edge quantitative skills.",
  ctaText: "Contact Us",
  ctaHref: "mailto:2025UCH1743@mnit.ac.in",
};

// ============================================================
// Footer
// ============================================================

export const footerConfig = {
  heading: "QUANT\u03A3ODE // Systematic Trading Lab",
  body: "Building systematic trading strategies and publishing quant research. A student-led initiative focused on quantitative finance and algorithmic trading.",
  columns: [
    {
      title: "Navigation",
      links: [
        { label: "Our Edge", href: "#alpha-pipeline" },
        { label: "Focus Areas", href: "#core-focus" },
        { label: "Teams", href: "#teams" },
        
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Research Papers", href: "#" },
        { label: "Code Repository", href: "#" },
        { label: "Event Calendar", href: "#" },
        { label: "Join Discord", href: "#" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "LinkedIn", href: "https://www.linkedin.com/company/quant%CF%83ode/" },
        { label: "GitHub", href: "#" },
        { label: "Instagram", href: "https://www.instagram.com/quantcode_nitjaipur/" },
        { label: "Contact", href: "mailto:2025UCH1743@mnit.ac.in" },
      ],
    },
  ],
  copyright: "\u00A9 2026 QUANT\u03A3ODE. All rights reserved.",
  bottomLinks: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/quant%CF%83ode/" },
    { label: "GitHub", href: "#" },
    { label: "Instagram", href: "https://www.instagram.com/quantcode_nitjaipur/" },
  ],
};

// ============================================================
// Market Ticker
// ============================================================

export const marketTickerConfig = {
  symbols: [
    { name: "NIFTY 50", yahooSymbol: "^NSEI", price: 24547.2, decimals: 2 },
    { name: "BANK NIFTY", yahooSymbol: "^NSEBANK", price: 52384.6, decimals: 2 },
    { name: "SENSEX", yahooSymbol: "^BSESN", price: 80586.2, decimals: 2 },
    { name: "GOLD", yahooSymbol: "GC=F", price: 2685.3, decimals: 2 },
    { name: "BTC/USD", yahooSymbol: "BTC-USD", price: 67234.5, decimals: 2 },
    { name: "ETH/USD", yahooSymbol: "ETH-USD", price: 3485.2, decimals: 2 },
    { name: "USD/INR", yahooSymbol: "INR=X", price: 83.45, decimals: 2 },
    { name: "INDIA VIX", yahooSymbol: "^INDIAVIX", price: 12.34, decimals: 2 },
    { name: "NIFTY IT", yahooSymbol: "^CNXIT", price: 38456.3, decimals: 2 },
    { name: "CRUDE OIL", yahooSymbol: "CL=F", price: 78.45, decimals: 2 },
  ],
};
