import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { ArrowUpRight, ChevronDown, Instagram, Linkedin, Menu, X } from 'lucide-react'
import { siteConfig } from './config'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'What we do', href: '#focus' },
  { label: 'Learning', href: '#learning' },
  { label: 'People', href: '/people' },
  { label: 'Moments', href: '/moments' },
]

const focusAreas = [
  { number: '01', title: 'Data → signal', text: 'Translate noisy market data into questions, features and experiments that can be tested instead of assumed.', accent: 'signal' },
  { number: '02', title: 'Model → meaning', text: 'Use probability, statistics and code to understand what a model is saying — and where it stops being useful.', accent: 'model' },
  { number: '03', title: 'Research → share', text: 'Make your work reproducible, explainable and open enough that another student can learn from it.', accent: 'share' },
]

const learning = [
  { tag: 'FOUNDATION', title: 'Basics of Quantitative Finance', text: 'Markets, Python for finance, time series, randomness and introductory portfolio and risk management.', meta: 'Beginner · 2–3 months' },
  { tag: 'PRACTITIONER', title: 'Quantitative Finance Practitioner', text: 'Stochastic calculus, derivatives, machine learning for finance and fixed-income concepts for committed learners.', meta: 'Intermediate · 1 year' },
  { tag: 'SEASONAL', title: 'Summer of Quant', text: 'A hands-on programme combining lectures, projects, paper trading and conversations with practitioners.', meta: 'Open to all · Seasonal' },
]

const moments = [
  { src: '/images/js_quant.jpg', alt: 'Quantitative finance learning session' },
  { src: '/images/js_event2.jpeg', alt: 'Quantcode club event' },
  { src: '/images/js_aiml.jpg', alt: 'Machine learning session' },
]

const notebookModes = [
  { label: 'Mean reversion', code: 'MR-04', value: '0.68', note: 'A signal that asks when price moves too far from its recent centre.', path: 'M0 172 C38 155 63 176 94 138 S145 106 174 135 S225 188 262 145 S313 105 348 121 S402 172 480 68' },
  { label: 'Factor blend', code: 'FB-12', value: '0.74', note: 'A quiet combination of momentum, value and quality features.', path: 'M0 177 C40 170 62 140 95 151 S140 126 174 112 S216 158 248 103 S298 83 330 105 S386 65 420 88 S456 63 480 35' },
  { label: 'Volatility surface', code: 'VS-08', value: '0.52', note: 'A map of how expected movement changes across strikes and time.', path: 'M0 154 C35 125 66 142 101 132 S151 169 186 115 S226 87 260 126 S304 151 335 96 S376 112 410 79 S450 105 480 54' },
]

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <div className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>{children}</div>
}

function SiteNav({ active = 'home' }: { active?: string }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll) }, [])
  const go = (href: string) => { setMenuOpen(false); if (href.startsWith('#')) document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }) }
  return <header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}><a className="brand" href="/">quantcode</a><button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button><nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">{navItems.map((item) => <a key={item.href} className={active === item.label.toLowerCase() ? 'active' : ''} href={item.href} onClick={(event) => { if (item.href.startsWith('#')) { event.preventDefault(); go(item.href) } }}>{item.label}</a>)}<a className="nav-cta" href="#join" onClick={(event) => { event.preventDefault(); go('#join') }}>Join the club <ArrowUpRight size={15} /></a></nav></header>
}

function SiteFooter() { return <footer className="site-footer"><div><a className="brand" href="/">quantcode</a><p>Student-led quantitative finance club at MNIT Jaipur.</p></div><div className="footer-links"><a href={siteConfig.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a><a href={siteConfig.instagram} target="_blank" rel="noreferrer"><Instagram size={17} /> Instagram</a><a href={`mailto:${siteConfig.email}`}>Contact <ArrowUpRight size={15} /></a></div><small>© 2026 quantcode · Built by students, for students.</small></footer> }

function Notebook() {
  const [mode, setMode] = useState(0)
  const [chartPoint, setChartPoint] = useState({ x: 72, y: 42 })
  const current = notebookModes[mode]
  const updateChartPoint = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setChartPoint({
      x: Math.max(4, Math.min(96, ((event.clientX - rect.left) / rect.width) * 100)),
      y: Math.max(8, Math.min(92, ((event.clientY - rect.top) / rect.height) * 100)),
    })
  }

  return <Reveal className="hero-visual" delay={180}><div className="hero-card notebook-card"><div className="card-topline"><span>QUANTCODE / NOTEBOOK</span><span>{current.code}</span></div><div className="notebook-tabs">{notebookModes.map((item, index) => <button key={item.code} className={mode === index ? 'selected' : ''} onClick={() => setMode(index)}>{item.label}</button>)}</div><div className="chart-art" onPointerMove={updateChartPoint} onPointerLeave={() => setChartPoint({ x: 72, y: 42 })}><span className="chart-label">move across the trace</span><svg viewBox="0 0 480 220" role="img" aria-label={`${current.label} signal chart`}><path className="grid-line" d="M0 44H480M0 110H480M0 176H480M80 0V220M180 0V220M280 0V220M380 0V220" /><path className="chart-fill" d={`${current.path} V220 H0Z`} /><path className="chart-line" d={current.path} /><line className="chart-crosshair" x1={`${chartPoint.x}%`} x2={`${chartPoint.x}%`} y1="0" y2="100%" /><line className="chart-crosshair chart-crosshair-horizontal" x1="0" x2="100%" y1={`${chartPoint.y}%`} y2={`${chartPoint.y}%`} /><circle className="chart-marker" cx={`${chartPoint.x}%`} cy={`${chartPoint.y}%`} r="5" /></svg><div className="chart-readout" style={{ left: `${chartPoint.x}%`, top: `${chartPoint.y}%` }}>x {Math.round(chartPoint.x)} · y {Math.round(100 - chartPoint.y)}</div></div><div className="card-note"><span>{current.note}</span><strong>{current.value}<small> confidence</small></strong></div><div className="notebook-footer"><span>pointer = inspect</span><span>tabs = compare</span></div></div></Reveal>
}

function CartoonMarketWorld() {
  return <div className="cartoon-world" aria-hidden="true"><div className="world-sun" /><div className="world-cloud cloud-one" /><div className="world-cloud cloud-two" /><div className="world-graph"><span className="graph-line" /><span className="graph-dot dot-a" /><span className="graph-dot dot-b" /><span className="graph-dot dot-c" /><span className="graph-arrow">↗</span></div><div className="world-ticker"><span>QUANTCODE</span><b>+ curiosity</b></div><div className="world-character"><span className="character-wick" /><span className="character-body"><i /><i /></span><span className="character-face"><i /><i /><b /></span><span className="character-arm left" /><span className="character-arm right" /><span className="character-leg left" /><span className="character-leg right" /></div><div className="world-coin coin-one">∑</div><div className="world-coin coin-two">σ</div><div className="world-coin coin-three">?</div><div className="world-ground" /></div>
}

function SectionScene({ kind }: { kind: 'about' | 'signal' | 'learn' | 'build' | 'join' }) {
  const scene = {
    about: { label: 'ASK WHY', note: 'assumptions first', code: 'P(data)', path: 'M0 76 C30 65 42 80 67 59 S110 47 133 62 S178 88 204 51' },
    signal: { label: 'BUILD SIGNAL', note: 'test the edge', code: 'α = 0.42', path: 'M0 83 C30 77 48 38 78 55 S116 87 143 42 S181 31 204 20' },
    learn: { label: 'PAPER TRADE', note: 'learn by doing', code: 'risk / return', path: 'M0 54 C29 24 48 78 75 50 S109 36 132 65 S166 79 204 36' },
    build: { label: 'SHIP A PROJECT', note: 'share the work', code: 'backtest', path: 'M0 78 C28 72 40 46 67 62 S103 84 128 48 S163 19 204 33' },
    join: { label: 'YOUR MOVE', note: 'bring a question', code: 'hello, quant', path: 'M0 72 C32 86 55 44 84 57 S117 81 145 39 S177 45 204 22' },
  }[kind]
  return <div className={`section-scene scene-${kind}`} aria-hidden="true"><div className="scene-head"><b>{scene.label}</b><span>{scene.code}</span></div>{kind === 'about' && <div className="scene-orbit"><span className="orbit-question">?</span><i /><i /><i /><b>P(data)</b></div>}{kind === 'signal' && <div className="scene-pencil"><span className="pencil-tip" /><span className="pencil-body" /><span className="pencil-line" /></div>}{kind === 'learn' && <div className="scene-notebook"><span>β</span><i /><i /><b>learn / test / repeat</b></div>}{kind === 'build' && <div className="scene-blocks"><i /><i /><i /><b>BACKTEST</b></div>}{kind === 'join' && <div className="scene-plane"><span>Σ</span><i /><b>YOUR MOVE</b></div>}<div className="scene-foot"><span>{scene.note}</span><em>{kind === 'about' ? 'follow the question' : kind === 'signal' ? 'draw the edge' : kind === 'learn' ? 'turn the page' : kind === 'build' ? 'stack the proof' : 'send it'}</em></div><span className="scene-sticker">{kind === 'about' ? 'START HERE' : kind === 'signal' ? 'NO MAGIC' : kind === 'learn' ? 'PRACTICE' : kind === 'build' ? 'MAKE IT REAL' : 'COME IN'}</span></div>
}

function HomePage() {
  const [active, setActive] = useState('hero')
  useEffect(() => { const sections = ['hero', 'about', 'focus', 'learning', 'project', 'join']; const observer = new IntersectionObserver((entries) => { const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]; if (visible) setActive(visible.target.id) }, { rootMargin: '-25% 0px -55% 0px', threshold: [0.1, 0.3, 0.6] }); sections.forEach((id) => { const element = document.getElementById(id); if (element) observer.observe(element) }); const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.12 }); document.querySelectorAll('.reveal').forEach((element) => reveal.observe(element)); return () => { observer.disconnect(); reveal.disconnect() } }, [])
  const scrollTo = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  return <div className="site-shell"><SiteNav active={active === 'hero' ? 'home' : active === 'focus' ? 'what we do' : active} /><main><section id="hero" className="hero section-wrap"><CartoonMarketWorld /><div className="hero-copy"><Reveal><p className="eyebrow hero-eyebrow"><span>Student-led quantitative finance club</span><span>MNIT Jaipur</span></p></Reveal><Reveal delay={80}><h1>Curious minds.<br /><em>Quantitative</em> thinking.</h1></Reveal><Reveal delay={160}><p className="hero-lede">Quantcode is where students explore markets, mathematics and code together — through learning, honest experimentation and a lot of thoughtful questions.</p></Reveal><Reveal delay={240}><div className="hero-actions"><a className="button button-primary" href="#join" onClick={(event) => { event.preventDefault(); scrollTo('#join') }}>Find your entry point <ArrowUpRight size={17} /></a><a className="text-link" href="#about" onClick={(event) => { event.preventDefault(); scrollTo('#about') }}>See how we work <span>↓</span></a></div></Reveal></div><Notebook /><div className="hero-note">Scroll to explore <ChevronDown size={16} /></div></section><section id="about" className="section-wrap intro-section"><SectionScene kind="about" /><Reveal className="section-kicker">01 / ABOUT THE CLUB</Reveal><div className="two-col"><Reveal><h2>A club for people who want to understand <em>why</em> markets move.</h2></Reveal><Reveal delay={100}><div className="body-copy"><p>We are a student community interested in quantitative finance, algorithmic trading and the ideas underneath both. You do not need to arrive with a perfect CV or a finance background.</p><p>Bring curiosity. We will build the rest through courses, projects, reading groups, events and conversations that make difficult ideas easier to share.</p></div></Reveal></div><div className="quant-orbit-wrap"><div className="quant-orbit"><span className="orbit-core">q</span><span className="orbit-label label-one">P(data)</span><span className="orbit-label label-two">σ² risk</span><span className="orbit-label label-three">∂ signal</span><span className="orbit-ring ring-one" /><span className="orbit-ring ring-two" /><span className="orbit-dot dot-one" /><span className="orbit-dot dot-two" /><span className="orbit-dot dot-three" /></div><div className="orbit-copy"><span>THE QUANT WAY</span><p>Ask a precise question. Build a simple model. Test it. Explain what changed when reality disagreed.</p></div></div></section><section id="focus" className="section-wrap focus-section"><SectionScene kind="signal" /><Reveal className="section-kicker">02 / WHAT WE DO</Reveal><div className="section-heading"><Reveal><h2>Think in systems.<br /><em>Stay human.</em></h2></Reveal><Reveal delay={100}><p>Our work starts with quant tools, but the point is understanding: how assumptions become models, and how models become better questions.</p></Reveal></div><div className="focus-grid">{focusAreas.map((item, index) => <Reveal key={item.number} delay={index * 90}><article className={`focus-card focus-${item.accent}`}><span className="number">{item.number}</span><div className="focus-glyph" aria-hidden="true"><i /><i /><i /></div><h3>{item.title}</h3><p>{item.text}</p><ArrowUpRight className="card-arrow" size={20} /></article></Reveal>)}</div></section><section id="learning" className="section-wrap learning-section"><SectionScene kind="learn" /><Reveal className="section-kicker">03 / LEARNING & EVENTS</Reveal><div className="section-heading"><Reveal><h2>Structured enough<br />to keep <em>moving.</em></h2></Reveal><Reveal delay={100}><p>Existing learning pathways and seasonal programmes give members a place to start. Come for one session, stay for the questions.</p></Reveal></div><div className="learning-list">{learning.map((item, index) => <Reveal key={item.title} delay={index * 90}><article className="learning-card"><div className="learning-tag">{item.tag}</div><h3>{item.title}</h3><p>{item.text}</p><div className="learning-meta">{item.meta}<ArrowUpRight size={16} /></div></article></Reveal>)}</div></section><section id="project" className="section-wrap project-section"><SectionScene kind="build" /><Reveal className="section-kicker">04 / CLUB MOMENTS</Reveal><div className="project-intro"><Reveal><h2>Make the abstract<br /><em>feel tangible.</em></h2></Reveal><Reveal delay={100}><p>From a whiteboard full of probability to a room comparing backtests, the club is shaped by the work members do together.</p></Reveal></div><a className="moments-page-link" href="/moments">Open the full club scrapbook <ArrowUpRight size={17} /></a><div className="moments-grid">{moments.map((moment, index) => <Reveal key={moment.src} delay={index * 80}><figure><img src={moment.src} alt={moment.alt} /><figcaption><span>Quantcode moment</span><ArrowUpRight size={16} /></figcaption></figure></Reveal>)}</div></section><section id="join" className="join-section"><SectionScene kind="join" /><div className="section-wrap join-inner"><Reveal><p className="eyebrow">05 / YOUR NEXT STEP</p><h2>Bring a question.<br /><em>Leave with a project.</em></h2><p className="join-copy">If quantitative finance, algorithmic trading or simply learning with ambitious peers sounds like your kind of thing, say hello.</p><a className="button button-light" href={`mailto:${siteConfig.email}`}>Email the club <ArrowUpRight size={17} /></a></Reveal><Reveal delay={160} className="join-aside"><span>NO EXPERIENCE REQUIRED</span><p>We are a student club. Start where you are, contribute what you can and keep learning in public.</p></Reveal></div></section></main><SiteFooter /></div>
}

export default HomePage
