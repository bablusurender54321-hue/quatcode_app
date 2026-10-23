import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { ArrowLeft, ArrowUpRight, Instagram, Linkedin, Menu, X } from 'lucide-react'
import { siteConfig } from './config'

const moments = [
  { image: '/images/js_quant.jpg', tag: '01 / LEARN', title: 'The room where a signal starts', text: 'Whiteboards, questions and the first rough sketch of an idea.' },
  { image: '/images/js_event2.jpeg', tag: '02 / MEET', title: 'Markets are more fun together', text: 'Events and conversations that make difficult topics easier to enter.' },
  { image: '/images/js_aiml.jpg', tag: '03 / BUILD', title: 'Small experiments, real lessons', text: 'Code, models and the honest moment when a backtest disagrees.' },
]

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return <div className="reveal" style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>{children}</div>
}

export default function MomentsPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: .12 })
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect() }
  }, [])
  return <div className="moments-page"><header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}><a className="brand" href="/">quantcode</a><button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button><nav className={`nav-links ${menuOpen ? 'open' : ''}`}><a href="/">Home</a><a href="/people">People</a><a className="active" href="/moments">Moments</a><a className="nav-cta" href={`mailto:${siteConfig.email}`}>Join the club <ArrowUpRight size={15} /></a></nav></header><main><section className="moments-hero section-wrap"><Reveal><a className="back-link" href="/"><ArrowLeft size={15} /> Back to quantcode</a><p className="eyebrow">MOMENTS / THE CLUB IN MOTION</p><h1>Ideas look<br /><em>better together.</em></h1><p className="people-lede">A moving scrapbook of the rooms, people and experiments that make quantitative finance feel human.</p></Reveal><div className="moments-hero-art" aria-hidden="true"><span className="hero-art-sun" /><span className="hero-art-line" /><span className="hero-art-candle">Σ</span><span className="hero-art-note">no perfect models<br /><b>just better questions</b></span></div></section><section className="moments-wall"><div className="section-wrap"><Reveal><span className="section-kicker">01 / CLUB SCRAPBOOK</span></Reveal><div className="moments-wall-grid">{moments.map((moment, index) => <Reveal key={moment.image} delay={index * 90}><article className={`moment-story moment-story-${index + 1}`}><div className="moment-photo"><img src={moment.image} alt="" /><span className="moment-sticker">{index === 0 ? 'ASK WHY' : index === 1 ? 'MEET PEOPLE' : 'TEST IT'}</span></div><div className="moment-copy"><span>{moment.tag}</span><h2>{moment.title}</h2><p>{moment.text}</p><ArrowUpRight size={18} /></div></article></Reveal>)}</div></div></section><section className="moments-cta section-wrap"><Reveal><span className="section-kicker">02 / KEEP THE CURVE MOVING</span><h2>The best club moments are the ones that leave you with a <em>new question.</em></h2><a className="button button-primary" href={`mailto:${siteConfig.email}`}>Make a moment <ArrowUpRight size={17} /></a></Reveal></section></main><footer className="site-footer"><div><a className="brand" href="/">quantcode</a><p>Student-led quantitative finance club at MNIT Jaipur.</p></div><div className="footer-links"><a href={siteConfig.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a><a href={siteConfig.instagram} target="_blank" rel="noreferrer"><Instagram size={17} /> Instagram</a></div><small>© 2026 quantcode · Built by students, for students.</small></footer></div>
}
