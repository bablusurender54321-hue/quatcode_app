import { useEffect, useState, type ReactNode, type CSSProperties } from 'react'
import { ArrowUpRight, ChevronDown, Instagram, Linkedin, Menu, X } from 'lucide-react'
import { siteConfig } from './config'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'What we do', href: '#focus' },
  { label: 'Learning', href: '#learning' },
  { label: 'People', href: '#people' },
  { label: 'Join', href: '#join' },
]

const focusAreas = [
  { number: '01', title: 'Learn by building', text: 'Work through market data, probability, Python and financial modelling with peers who are learning alongside you.' },
  { number: '02', title: 'Research together', text: 'Turn questions into reproducible experiments, backtests and clear research notes instead of chasing hype.' },
  { number: '03', title: 'Share the work', text: 'Present ideas, review each other\'s code and make quantitative finance feel approachable for the whole campus.' },
]

const learning = [
  { tag: 'FOUNDATION', title: 'Basics of Quantitative Finance', text: 'Markets, Python for finance, time series, randomness and introductory portfolio and risk management.', meta: 'Beginner · 2–3 months' },
  { tag: 'PRACTITIONER', title: 'Quantitative Finance Practitioner', text: 'Stochastic calculus, derivatives, machine learning for finance and fixed-income concepts for committed learners.', meta: 'Intermediate · 1 year' },
  { tag: 'SEASONAL', title: 'Summer of Quant', text: 'A hands-on programme combining lectures, projects, paper trading and conversations with practitioners.', meta: 'Open to all · Seasonal' },
]

const team = [
  { name: 'Quantitative Engineering', text: 'Mathematical modelling, derivatives pricing and risk-focused projects.', image: '/images/president.jpeg' },
  { name: 'Algorithm Design & ML', text: 'Time-series forecasting, signal processing and systematic strategy experiments.', image: '/images/shreyash.jpg' },
  { name: 'Events & Outreach', text: 'Workshops, seminars, guest sessions and the day-to-day work of a welcoming club.', image: '/images/js_event.jpg' },
]

const moments = [
  { src: '/images/js_quant.jpg', alt: 'Quantitative finance learning session' },
  { src: '/images/js_event2.jpeg', alt: 'Quantcode club event' },
  { src: '/images/js_aiml.jpg', alt: 'Machine learning session' },
]

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <div className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>{children}</div>
}

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('hero')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const sections = ['hero', ...navItems.map((item) => item.href.slice(1))]
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActive(visible.target.id)
    }, { rootMargin: '-25% 0px -55% 0px', threshold: [0.1, 0.3, 0.6] })
    sections.forEach((id) => { const element = document.getElementById(id); if (element) observer.observe(element) })
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div className="site-shell">
      <header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
        <a className="brand" href="#hero" onClick={(event) => { event.preventDefault(); scrollTo('#hero') }}><span>quant</span><b>σ</b>de</a>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
          {navItems.map((item) => <a key={item.href} className={active === item.href.slice(1) ? 'active' : ''} href={item.href} onClick={(event) => { event.preventDefault(); scrollTo(item.href) }}>{item.label}</a>)}
          <a className="nav-cta" href="#join" onClick={(event) => { event.preventDefault(); scrollTo('#join') }}>Join the club <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main>
        <section id="hero" className="hero section-wrap">
          <div className="hero-copy">
            <Reveal><p className="eyebrow">MNIT Jaipur · student-led quantitative finance club</p></Reveal>
            <Reveal delay={80}><h1>Curious minds.<br /><em>Quantitative</em> thinking.</h1></Reveal>
            <Reveal delay={160}><p className="hero-lede">Quantcode is where students explore markets, mathematics and code together — through learning, honest experimentation and a lot of thoughtful questions.</p></Reveal>
            <Reveal delay={240}><div className="hero-actions"><a className="button button-primary" href="#join" onClick={(event) => { event.preventDefault(); scrollTo('#join') }}>Find your entry point <ArrowUpRight size={17} /></a><a className="text-link" href="#about" onClick={(event) => { event.preventDefault(); scrollTo('#about') }}>See how we work <span>↓</span></a></div></Reveal>
          </div>
          <Reveal className="hero-visual" delay={180}><div className="hero-card"><div className="card-topline"><span>QUANTCODE / NOTEBOOK</span><span>01</span></div><div className="chart-art"><span className="chart-label">signal / noise</span><svg viewBox="0 0 480 220" role="img" aria-label="Abstract rising data line"><path className="grid-line" d="M0 44H480M0 110H480M0 176H480M80 0V220M180 0V220M280 0V220M380 0V220" /><path className="chart-fill" d="M0 190 C50 165 64 174 100 148 S150 174 188 122 S235 138 266 95 S314 120 346 75 S400 92 480 26 V220 H0Z" /><path className="chart-line" d="M0 190 C50 165 64 174 100 148 S150 174 188 122 S235 138 266 95 S314 120 346 75 S400 92 480 26" /></svg></div><div className="card-note"><span>Questions we bring to the table</span><strong>What makes a signal useful?</strong></div></div></Reveal>
          <div className="hero-note">Scroll to explore <ChevronDown size={16} /></div>
        </section>

        <section id="about" className="section-wrap intro-section">
          <Reveal className="section-kicker">01 / ABOUT THE CLUB</Reveal>
          <div className="two-col"><Reveal><h2>A club for people who want to understand <em>why</em> markets move.</h2></Reveal><Reveal delay={100}><div className="body-copy"><p>We are a student community interested in quantitative finance, algorithmic trading and the ideas underneath both. You do not need to arrive with a perfect CV or a finance background.</p><p>Bring curiosity. We will build the rest through courses, projects, reading groups, events and conversations that make difficult ideas easier to share.</p></div></Reveal></div>
          <div className="principles"><Reveal delay={60}><span>01</span><strong>Learn openly</strong><p>Explain your thinking, ask basic questions and make room for different starting points.</p></Reveal><Reveal delay={120}><span>02</span><strong>Test carefully</strong><p>Good research is reproducible, honest about limits and more than a good-looking chart.</p></Reveal><Reveal delay={180}><span>03</span><strong>Build together</strong><p>The best projects come from generous collaboration across math, code, design and communication.</p></Reveal></div>
        </section>

        <section id="focus" className="section-wrap tinted-section"><Reveal className="section-kicker">02 / WHAT WE DO</Reveal><div className="section-heading"><Reveal><h2>From first principles<br />to <em>working projects.</em></h2></Reveal><Reveal delay={100}><p>There is no single Quantcode experience. Some members join for the math, some for the systems, and many stay for the people.</p></Reveal></div><div className="focus-grid">{focusAreas.map((item, index) => <Reveal key={item.number} delay={index * 90}><article className="focus-card"><span className="number">{item.number}</span><h3>{item.title}</h3><p>{item.text}</p><ArrowUpRight className="card-arrow" size={20} /></article></Reveal>)}</div></section>

        <section id="learning" className="section-wrap"><Reveal className="section-kicker">03 / LEARNING & EVENTS</Reveal><div className="section-heading"><Reveal><h2>Structured enough<br />to keep <em>moving.</em></h2></Reveal><Reveal delay={100}><p>Existing learning pathways and seasonal programmes give members a place to start. Come for one session, stay for the questions.</p></Reveal></div><div className="learning-list">{learning.map((item, index) => <Reveal key={item.title} delay={index * 90}><article className="learning-card"><div className="learning-tag">{item.tag}</div><h3>{item.title}</h3><p>{item.text}</p><div className="learning-meta">{item.meta}<ArrowUpRight size={16} /></div></article></Reveal>)}</div></section>

        <section id="projects" className="section-wrap project-section"><Reveal className="section-kicker">04 / CLUB MOMENTS</Reveal><div className="project-intro"><Reveal><h2>Make the abstract<br /><em>feel tangible.</em></h2></Reveal><Reveal delay={100}><p>From a whiteboard full of probability to a room comparing backtests, the club is shaped by the work members do together.</p></Reveal></div><div className="moments-grid">{moments.map((moment, index) => <Reveal key={moment.src} delay={index * 80}><figure><img src={moment.src} alt={moment.alt} /><figcaption><span>Quantcode moment</span><ArrowUpRight size={16} /></figcaption></figure></Reveal>)}</div></section>

        <section id="people" className="section-wrap"><Reveal className="section-kicker">05 / PEOPLE & WINGS</Reveal><div className="section-heading"><Reveal><h2>Find the corner<br />that feels like <em>yours.</em></h2></Reveal><Reveal delay={100}><p>Our functional wings are a way to contribute, not a set of boxes. Move between them as your interests change.</p></Reveal></div><div className="team-grid">{team.map((item, index) => <Reveal key={item.name} delay={index * 90}><article className="team-card"><img src={item.image} alt="" /><div><h3>{item.name}</h3><p>{item.text}</p></div></article></Reveal>)}</div></section>

        <section id="join" className="join-section"><div className="section-wrap join-inner"><Reveal><p className="eyebrow">06 / YOUR NEXT STEP</p><h2>Bring a question.<br /><em>Leave with a project.</em></h2><p className="join-copy">If quantitative finance, algorithmic trading or simply learning with ambitious peers sounds like your kind of thing, say hello.</p><a className="button button-light" href={`mailto:${siteConfig.email}`}>Email the club <ArrowUpRight size={17} /></a></Reveal><Reveal delay={160} className="join-aside"><span>NO EXPERIENCE REQUIRED</span><p>We are a student club. Start where you are, contribute what you can and keep learning in public.</p></Reveal></div></section>
      </main>

      <footer className="site-footer"><div><a className="brand" href="#hero">quant<b>σ</b>de</a><p>Student-led quantitative finance club at MNIT Jaipur.</p></div><div className="footer-links"><a href={siteConfig.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a><a href={siteConfig.instagram} target="_blank" rel="noreferrer"><Instagram size={17} /> Instagram</a><a href={`mailto:${siteConfig.email}`}>Contact <ArrowUpRight size={15} /></a></div><small>© 2026 Quantcode · Built by students, for students.</small></footer>
    </div>
  )
}

export default HomePage

