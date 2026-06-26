'use client'
import { useEffect, useState } from 'react'

export default function Home() {
  const [text, setText] = useState('')
  const [lineIndex, setLineIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const lines = [
    'We make founders look like they mean it.',
    'Built for startups. Designed for legacy.',
    'Your brand is your first pitch.',
    'Identity that closes deals.',
    'Where vision becomes visual.',
  ]

  useEffect(() => {
    const current = lines[lineIndex]
    let timeout: ReturnType<typeof setTimeout>
    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 55)
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), 22)
    } else if (deleting && text.length === 0) {
      setDeleting(false)
      setLineIndex((prev) => (prev + 1) % lines.length)
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, lineIndex])

  const services = [
    { name: 'Brand Identity', desc: 'Full identity systems built to survive ten years of growth.' },
    { name: 'Logo Design', desc: 'Wordmarks, lettermarks, icon marks. Every format you need.' },
    { name: 'Cover Art & Visuals', desc: 'Music covers, social campaigns, event graphics.' },
    { name: 'Business Branding', desc: 'End-to-end branding for businesses entering new markets.' },
    { name: 'Brand Collateral', desc: 'Pitch decks, cards, letterheads. Every touchpoint, intentional.' },
    { name: 'Brand Audit & Refresh', desc: "Diagnose what holds you back. Rebuild with precision." },
  ]

  const works = [
    {
      client: 'African Union',
      tag: 'Graphic Design · Institutional',
      desc: "Graphics and print collateral for one of Africa's foremost continental institutions.",
      bg: '#0A0F0A',
      accent: '#2DD4BF',
      initials: 'AU',
      badge: 'Flagship',
    },
    {
      client: 'AG Worldwide',
      tag: 'Logo Design · Fintech',
      desc: 'Visual identity for a foreign exchange company. A mark built to command trust.',
      bg: '#0F0A00',
      accent: '#C9A84C',
      initials: 'AG',
      badge: null,
    },
    {
      client: 'Heroes Dream Alive',
      tag: 'Graphic Design · NGO',
      desc: 'Campaign flyers and collateral for a non-profit driving social impact.',
      bg: '#080A12',
      accent: '#2DD4BF',
      initials: 'HDA',
      badge: null,
    },
  ]

  return (
    <main>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulseGlow {
          0%,100% { box-shadow: 0 0 0 0 rgba(45,212,191,0.15); }
          50% { box-shadow: 0 0 0 8px rgba(45,212,191,0); }
        }
        @keyframes fadeSlideIn {
          from { opacity:0; transform: translateX(-8px); }
          to { opacity:1; transform: translateX(0); }
        }
        :root {
          --void: #111318;
          --card: #161A20;
          --surface: #1C2028;
          --divider: #2A2E38;
          --white: #F0EDE6;
          --muted: #7A7A8A;
          --gold: #C9A84C;
          --teal: #2DD4BF;
          --teal-dim: rgba(45,212,191,0.06);
        }
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: smooth; }
        body { background: var(--void); color: var(--white); font-family: 'Inter', sans-serif; font-weight: 300; overflow-x: hidden; }
        a { text-decoration: none; color: inherit; }
        button { cursor: pointer; font-family: inherit; }

        /* TUTORIVA SIDEBAR */
        .tutoriva-sidebar {
          position: fixed;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          z-index: 99;
          animation: fadeSlideIn 0.8s ease 1s both;
        }
        .tutoriva-pill {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
          background: var(--card);
          border: 1px solid var(--teal);
          border-left: none;
          padding: 1.2rem 0.75rem;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.25s ease;
          animation: pulseGlow 3s ease-in-out infinite;
          border-radius: 0 8px 8px 0;
        }
        .tutoriva-pill:hover {
          background: var(--teal);
          padding-right: 1.1rem;
        }
        .tutoriva-pill:hover .pill-text,
        .tutoriva-pill:hover .pill-label,
        .tutoriva-pill:hover .pill-arrow { color: var(--void); }
        .tutoriva-pill:hover .pill-dot { background: var(--void); }
        .pill-dot {
          width: 6px; height: 6px;
          background: var(--teal);
          border-radius: 50%;
          flex-shrink: 0;
        }
        .pill-label {
          font-size: 0.55rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--teal);
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          opacity: 0.7;
        }
        .pill-text {
          font-family: 'Playfair Display', serif;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--teal);
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          letter-spacing: 0.05em;
        }
        .pill-arrow {
          font-size: 0.7rem;
          color: var(--teal);
          transform: rotate(90deg);
        }

        /* NAV */
        .nav-link { color: var(--muted); font-size: 0.8rem; letter-spacing: 0.12em; text-transform: uppercase; transition: color 0.2s; }
        .nav-link:hover { color: var(--white); }
        .mobile-menu {
          display: none;
          flex-direction: column;
          gap: 0.4rem;
          background: none;
          border: none;
          padding: 0.4rem;
        }
        .mobile-menu span {
          display: block; width: 22px; height: 2px; background: var(--white); transition: all 0.2s;
        }

        /* WORK STRIP */
        .work-strip {
          display: flex; gap: 1.5rem; overflow-x: auto;
          padding-bottom: 1rem; scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }
        .work-strip::-webkit-scrollbar { height: 2px; }
        .work-strip::-webkit-scrollbar-track { background: var(--divider); }
        .work-strip::-webkit-scrollbar-thumb { background: var(--teal); }
        .work-card {
          min-width: 400px; height: 500px; position: relative;
          overflow: hidden; scroll-snap-align: start; flex-shrink: 0;
          border: 1px solid var(--divider); transition: border-color 0.2s;
        }
        .work-card:hover { border-color: rgba(45,212,191,0.3); }
        .work-card.featured { min-width: 580px; }

        /* SERVICES */
        .service-row { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid var(--divider); }
        .service-item {
          padding: 2rem; border-bottom: 1px solid var(--divider);
          border-right: 1px solid var(--divider); transition: background 0.2s;
        }
        .service-item:nth-child(even) { border-right: none; }
        .service-item:nth-last-child(-n+2) { border-bottom: none; }
        .service-item:hover { background: var(--teal-dim); }

        /* PROCESS */
        .process-grid { display: grid; grid-template-columns: repeat(4,1fr); }
        .process-card {
          padding: 2.5rem 2rem;
          border-left: 1px solid var(--divider);
        }
        .process-card:first-child { border-left: none; }

        /* TEAL LINE */
        .teal-line { width: 2.5rem; height: 3px; background: var(--teal); display: block; margin-bottom: 1.2rem; }

        /* MOBILE */
        @media (max-width: 768px) {
          .tutoriva-sidebar { display: none; }
          .tutoriva-mobile {
            display: flex !important;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            background: var(--teal-dim);
            border: 1px solid var(--teal);
            padding: 0.7rem 1.2rem;
            margin: 0 1.5rem 2rem;
            border-radius: 4px;
            color: var(--teal);
            font-size: 0.78rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            text-decoration: none;
          }
          .nav-links-desktop { display: none !important; }
          .nav-cta-desktop { display: none !important; }
          .mobile-menu { display: flex !important; }
          .hero-section { padding: 6rem 1.5rem 3rem !important; }
          .manifesto-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .service-row { grid-template-columns: 1fr !important; }
          .service-item { border-right: none !important; }
          .service-item:nth-last-child(-n+2) { border-bottom: 1px solid var(--divider) !important; }
          .service-item:last-child { border-bottom: none !important; }
          .work-card { min-width: 300px !important; height: 400px !important; }
          .work-card.featured { min-width: 320px !important; }
          .process-grid { grid-template-columns: 1fr 1fr !important; }
          .process-card { border-left: none !important; border-top: 1px solid var(--divider); }
          .process-card:nth-child(odd) { border-right: 1px solid var(--divider); }
          .section-pad { padding: 4rem 1.5rem !important; }
          .footer-inner { flex-direction: column !important; gap: 1.2rem !important; text-align: center; }
          .cta-section { padding: 5rem 1.5rem !important; }
          .nav-inner { padding: 1.2rem 1.5rem !important; }
        }

        /* MOBILE NAV MENU */
        .mobile-nav-drawer {
          display: none;
          position: fixed; top: 64px; left: 0; right: 0;
          background: var(--card); border-bottom: 1px solid var(--divider);
          flex-direction: column; z-index: 98; padding: 1.5rem;
          gap: 1.2rem;
        }
        .mobile-nav-drawer.open { display: flex; }
        .mobile-nav-drawer a {
          color: var(--muted); font-size: 0.9rem; letter-spacing: 0.1em;
          text-transform: uppercase; padding: 0.5rem 0;
          border-bottom: 1px solid var(--divider);
        }
        .mobile-nav-drawer a:last-child { border-bottom: none; }
      `}</style>

      {/* TUTORIVA SIDEBAR — desktop */}
      <div className="tutoriva-sidebar">
        <a href="https://tutoriva.com" target="_blank" rel="noopener noreferrer" className="tutoriva-pill">
          <span className="pill-label">A Brandinn Product</span>
          <div className="pill-dot" />
          <span className="pill-text">Tutoriva</span>
          <div className="pill-dot" />
          <span className="pill-arrow">→</span>
        </a>
      </div>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(17,19,24,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--divider)' }}>
        <div className="nav-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.4rem 4rem' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, letterSpacing: '0.04em' }}>
            Brandinn <span style={{ color: 'var(--teal)' }}>Atelier</span>
          </div>
          <ul className="nav-links-desktop" style={{ display: 'flex', gap: '2.5rem', listStyle: 'none' }}>
            {['Work', 'Services', 'Process', 'Contact'].map((item) => (
              <li key={item}><a href={`#${item.toLowerCase()}`} className="nav-link">{item}</a></li>
            ))}
          </ul>
          <button className="nav-cta-desktop"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ background: 'none', border: '1px solid var(--teal)', color: 'var(--teal)', padding: '0.5rem 1.4rem', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--teal)'; e.currentTarget.style.color = 'var(--void)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--teal)' }}
          >Start a Project</button>
          <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* MOBILE NAV DRAWER */}
      <div className={`mobile-nav-drawer${menuOpen ? ' open' : ''}`}>
        {['Work', 'Services', 'Process', 'Contact'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>
        ))}
        <a href="https://tutoriva.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--teal) !important' }}>
          Tutoriva After Class ↗
        </a>
      </div>

      {/* HERO */}
      <section className="hero-section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 4rem', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', right: '-2rem', top: '50%', transform: 'translateY(-50%)', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(8rem,18vw,16rem)', fontWeight: 900, color: 'rgba(45,212,191,0.025)', pointerEvents: 'none', lineHeight: 1 }}>BRAND</div>

        {/* Tutoriva mobile banner */}
        <a href="https://tutoriva.com" target="_blank" rel="noopener noreferrer" className="tutoriva-mobile" style={{ display: 'none' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--teal)', flexShrink: 0 }} />
          Tutoriva After Class — A Brandinn Product ↗
        </a>

        <div style={{ width: '3rem', height: '3px', background: 'var(--teal)', marginBottom: '2rem' }} />
        <p style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '1.5rem' }}>Creative Studio — Lagos, Nigeria</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(3.5rem,8vw,7rem)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
          Brandinn<br /><span style={{ color: 'var(--gold)' }}>Atelier.</span>
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--muted)', maxWidth: '38ch', lineHeight: 1.8, marginBottom: '1.5rem', fontWeight: 300 }}>
          We build the visual identity between a founder&apos;s vision and a market that believes it.
        </p>
        <p style={{ fontSize: '0.85rem', color: 'var(--white)', letterSpacing: '0.05em', marginBottom: '3rem', minHeight: '1.4em', fontStyle: 'italic', fontFamily: "'Playfair Display', serif" }}>
          {text}<span style={{ display: 'inline-block', width: '2px', height: '1em', background: 'var(--teal)', marginLeft: '2px', verticalAlign: 'middle', animation: 'blink 1s step-end infinite' }} />
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ background: 'var(--teal)', color: 'var(--void)', border: 'none', padding: '0.9rem 2.2rem', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            View Our Work
          </button>
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            → Start a Project
          </button>
        </div>
        <div style={{ position: 'absolute', bottom: '3rem', right: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', writingMode: 'vertical-rl' }}>Scroll</span>
          <div style={{ width: '1px', height: '4rem', background: 'linear-gradient(to bottom, var(--teal), transparent)' }} />
        </div>
      </section>

      {/* MANIFESTO */}
      <section id="about" className="section-pad" style={{ padding: '7rem 4rem', background: 'var(--card)', borderTop: '1px solid var(--divider)', borderBottom: '1px solid var(--divider)' }}>
        <div className="manifesto-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', alignItems: 'start' }}>
          <div>
            <span className="teal-line" />
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '1.5rem' }}>Our philosophy</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem,4vw,3.5rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
              Identity is<br /><em>the product.</em>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.85 }}>
              We don&apos;t design logos. We architect the first impression that decides whether a founder is taken seriously — or not.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {[
              { num: '01', title: 'Strategic before aesthetic', text: "Brand decisions made without business context are decoration. We interrogate the market, the audience, and the founder's ambition before a single concept is sketched." },
              { num: '02', title: 'Built to scale', text: 'Startups grow. Your identity must work on a pitch deck in Abuja and a billboard in London. We design systems, not just assets.' },
              { num: '03', title: 'Distinctive or irrelevant', text: 'The market is crowded. We hunt for the one visual truth that makes your brand unmistakable — and build everything around it.' },
            ].map((p) => (
              <div key={p.num} style={{ borderLeft: '2px solid var(--teal)', paddingLeft: '1.5rem' }}>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '0.4rem' }}>{p.num}</p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem' }}>{p.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.7 }}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section-pad" style={{ padding: '7rem 4rem' }}>
        <span className="teal-line" />
        <p style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '1rem' }}>What we do</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem,4vw,3.5rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '4rem' }}>Services</h2>
        <div className="service-row">
          {services.map((s, i) => (
            <div key={i} className="service-item">
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.6rem' }}>{s.name}</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.75 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="section-pad" style={{ padding: '7rem 4rem', background: 'var(--card)', borderTop: '1px solid var(--divider)' }}>
        <span className="teal-line" />
        <p style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '1rem' }}>Selected work</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem,4vw,3.5rem)', fontWeight: 700, lineHeight: 1.1 }}>Our Portfolio</h2>
          <p style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Scroll to explore →</p>
        </div>
        <div className="work-strip">
          {works.map((w, i) => (
            <div key={i} className={`work-card${i === 0 ? ' featured' : ''}`} style={{ background: w.bg }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: i === 0 ? '8rem' : '6rem', fontWeight: 900, color: `${w.accent}10`, letterSpacing: '-0.02em' }}>{w.initials}</span>
              </div>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: w.accent }} />
              {w.badge && (
                <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: w.accent, border: `1px solid ${w.accent}50`, padding: '0.25rem 0.7rem' }}>{w.badge}</div>
              )}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.15) 60%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem' }}>
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: w.accent, marginBottom: '0.6rem', display: 'block' }}>{w.tag}</span>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: i === 0 ? '1.8rem' : '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>{w.client}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.65 }}>{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="section-pad" style={{ padding: '7rem 4rem' }}>
        <span className="teal-line" />
        <p style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '1rem' }}>How we work</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem,4vw,3.5rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '4rem' }}>The Process</h2>
        <div className="process-grid">
          {[
            { num: '01', phase: 'Discovery', title: 'Interrogate the brief', text: "We dig into your market, competitors, and the gap your brand needs to own.", accent: 'var(--teal)' },
            { num: '02', phase: 'Strategy', title: 'Position before design', text: 'Brand position and visual direction agreed before a single pixel is placed.', accent: 'var(--gold)' },
            { num: '03', phase: 'Identity', title: 'Build the system', text: 'Concepts developed, refined, then systematised into a full identity.', accent: 'var(--teal)' },
            { num: '04', phase: 'Delivery', title: 'Handed over, complete', text: 'Every file. Every format. Brand guidelines your designers will thank you for.', accent: 'var(--gold)' },
          ].map((s, i) => (
            <div key={i} className="process-card" style={{ borderTop: `3px solid ${s.accent}` }}>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: s.accent, marginBottom: '0.3rem', textTransform: 'uppercase', paddingTop: '1.5rem' }}>{s.num} — {s.phase}</p>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 700, marginBottom: '0.8rem', marginTop: '0.5rem' }}>{s.title}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.7 }}>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="cta-section" style={{ textAlign: 'center', padding: '9rem 4rem', position: 'relative', overflow: 'hidden', background: 'var(--card)', borderTop: '1px solid var(--divider)' }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(6rem,16vw,14rem)', fontWeight: 900, color: 'rgba(45,212,191,0.03)', letterSpacing: '-0.04em' }}>START</span>
        </div>
        <div style={{ width: '3rem', height: '3px', background: 'var(--teal)', margin: '0 auto 2rem' }} />
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '1.5rem', display: 'block' }}>Ready to build?</span>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem,5vw,4.5rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: '1.5rem' }}>
          Your brand deserves<br />to be <em style={{ color: 'var(--gold)' }}>unmistakable.</em>
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '3rem', maxWidth: '42ch', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.8 }}>
          We work with a small number of founders at a time. If you&apos;re serious about your brand, let&apos;s talk.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={{ background: 'var(--teal)', color: 'var(--void)', border: 'none', padding: '0.9rem 2.2rem', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Start a Project
          </button>
          <button style={{ background: 'none', border: '1px solid var(--divider)', color: 'var(--muted)', padding: '0.9rem 1.8rem', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            See Pricing
          </button>
        </div>
        <span style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: '2rem', display: 'block' }}>
          Or write us at <a href="mailto:hello@brandinn.com" style={{ color: 'var(--teal)' }}>hello@brandinn.com</a>
        </span>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--divider)', padding: '2.5rem 4rem', background: 'var(--void)' }}>
        <div className="footer-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 700, letterSpacing: '0.04em' }}>
            Brandinn <span style={{ color: 'var(--teal)' }}>Atelier</span>
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--muted)', letterSpacing: '0.05em' }}>© 2025 Brandinn Atelier. All rights reserved.</p>
          <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
            {['Work', 'Services', 'Contact'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} style={{ fontSize: '0.72rem', color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{item}</a>
              </li>
            ))}
          </ul>
        </div>
      </footer>

    </main>
  )
}