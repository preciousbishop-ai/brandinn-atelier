'use client'
import { useEffect, useState } from 'react'

export default function Home() {
  const [text, setText] = useState('')
  const [lineIndex, setLineIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const lines = [
    'The branding partner for companies ready to lead.',
    'We make founders impossible to ignore.',
    'Your brand is your first pitch.',
    'Identity that closes deals.',
    'Built for startups. Designed for legacy.',
  ]

  useEffect(() => {
    const current = lines[lineIndex]
    let timeout: ReturnType<typeof setTimeout>
    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 50)
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2400)
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), 20)
    } else if (deleting && text.length === 0) {
      setDeleting(false)
      setLineIndex((prev) => (prev + 1) % lines.length)
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, lineIndex])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const dot = document.getElementById('cursorDot')
    const ring = document.getElementById('cursorRing')
    let mx = 0, my = 0, rx = 0, ry = 0
    let rafId: number
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (dot) { dot.style.left = mx + 'px'; dot.style.top = my + 'px' }
    }
    const animRing = () => {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12
      if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px' }
      rafId = requestAnimationFrame(animRing)
    }
    document.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(animRing)
    const els = document.querySelectorAll('a, button')
    const enter = () => { if (ring) { ring.style.width = '48px'; ring.style.height = '48px'; ring.style.borderColor = 'rgba(45,212,191,0.6)' } }
    const leave = () => { if (ring) { ring.style.width = '32px'; ring.style.height = '32px'; ring.style.borderColor = 'rgba(45,212,191,0.4)' } }
    els.forEach(el => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave) })
    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      els.forEach(el => { el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave) })
    }
  }, [])

  const stats = [
    { num: '25+', label: 'Projects Delivered' },
    { num: '6', label: 'Industries Served' },
    { num: '3+', label: 'Countries' },
    { num: '100%', label: 'Client Satisfaction' },
  ]

  const works = [
    { client: 'African Union', tag: 'Institutional · Graphic Design', desc: "Graphics and print collateral for one of Africa's foremost continental institutions. Designed to communicate authority across multiple formats.", bg: '#0A0F0A', accent: '#2DD4BF', initials: 'AU', badge: 'Flagship', industry: 'Govt & NGO' },
    { client: 'AG Worldwide', tag: 'Fintech · Brand Identity', desc: 'Logo and visual identity for a foreign exchange and financial services company. A mark built to command trust in a high-stakes industry.', bg: '#0F0A00', accent: '#C9A84C', initials: 'AG', badge: null, industry: 'Fintech' },
    { client: 'Heroes Dream Alive', tag: 'NGO · Campaign Design', desc: 'Campaign flyers and print collateral for a non-profit driving social impact. Design built to inspire action and community trust.', bg: '#080A12', accent: '#2DD4BF', initials: 'HDA', badge: null, industry: 'Non-Profit' },
  ]

  const capabilities = [
    { title: 'Brand Identity Systems', desc: 'Identity systems that help companies charge more. Logo, colour, typography, guidelines — built to survive ten years of growth.', outcome: 'Outcome: Instant recognition. Premium perception.' },
    { title: 'Logo & Mark Design', desc: 'Marks that make people stop. Wordmarks, lettermarks, icon marks — crafted for memorability, not decoration.', outcome: 'Outcome: A mark that owns its category.' },
    { title: 'Business Branding', desc: 'End-to-end brand strategy for businesses entering new markets. We make your company look like it belongs at the top.', outcome: 'Outcome: Market authority from day one.' },
    { title: 'Cover Art & Visual Campaigns', desc: 'Music covers, event graphics, social campaigns. Visual storytelling that moves product, builds culture, and converts.', outcome: 'Outcome: Content people share without being asked.' },
    { title: 'Brand Collateral', desc: 'Pitch decks, business cards, letterheads, packaging. Every touchpoint designed with the same strategic intention.', outcome: 'Outcome: Consistency that compounds credibility.' },
    { title: 'Brand Audit & Refresh', desc: "For businesses that have outgrown their look. We diagnose what's holding you back and rebuild from a position of strength.", outcome: "Outcome: A brand that reflects where you're going." },
  ]

  const process = [
    { num: '01', phase: 'Discovery', title: 'Interrogate the brief', text: "We don't accept the surface brief. We dig into your market, competitors, ambition, and the gap your brand needs to own.", accent: 'var(--teal)' },
    { num: '02', phase: 'Strategy', title: 'Position before design', text: 'Brand position, voice, and visual direction locked before a single pixel is placed. No surprises at concept stage.', accent: 'var(--gold)' },
    { num: '03', phase: 'Identity', title: 'Build the system', text: 'Concepts developed, refined through feedback, then systematised into a full identity your team can actually use.', accent: 'var(--teal)' },
    { num: '04', phase: 'Delivery', title: 'Handed over, complete', text: 'Every file. Every format. A brand guidelines document your future designers will thank you for.', accent: 'var(--gold)' },
  ]

  const industries = ['Financial Services', 'Government & NGO', 'Education & EdTech', 'Fashion & Lifestyle', 'Technology & SaaS', 'Real Estate', 'Healthcare', 'Entertainment & Music']

  return (
    <main>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulseGlow { 0%,100%{box-shadow:0 0 0 0 rgba(45,212,191,0.2);} 50%{box-shadow:0 0 0 10px rgba(45,212,191,0);} }
        @keyframes fadeSlideIn { from{opacity:0;transform:translateX(-10px);} to{opacity:1;transform:translateX(0);} }
        :root {
          --void:#0E1014; --card:#13161C; --surface:#191D24; --divider:#2E3240;
          --white:#F5F2EB; --soft:#C8C4BC; --muted:#8A8D9A;
          --gold:#D4A843; --teal:#1FC8B4;
          --teal-dim:rgba(31,200,180,0.06); --gold-dim:rgba(212,168,67,0.06);
        }
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        body{background:var(--void);color:var(--white);font-family:'Inter',sans-serif;font-weight:300;overflow-x:hidden;cursor:none;}
        a{text-decoration:none;color:inherit;}
        button{cursor:none;font-family:inherit;}

        .cursor-dot{position:fixed;width:8px;height:8px;background:var(--teal);border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);}
        .cursor-ring{position:fixed;width:32px;height:32px;border:1px solid rgba(31,200,180,0.4);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:width 0.2s,height 0.2s,border-color 0.2s;}

        .reveal{opacity:0;transform:translateY(18px);transition:opacity 0.65s ease,transform 0.65s ease;}
        .reveal.visible{opacity:1;transform:translateY(0);}
        .rd1{transition-delay:0.1s;} .rd2{transition-delay:0.2s;} .rd3{transition-delay:0.3s;} .rd4{transition-delay:0.4s;}

        .tutoriva-sidebar{position:fixed;left:0;top:50%;transform:translateY(-50%);z-index:99;animation:fadeSlideIn 0.8s ease 1.2s both;}
        .tutoriva-pill{display:flex;flex-direction:column;align-items:center;gap:0.5rem;background:rgba(19,22,28,0.97);border:1px solid rgba(31,200,180,0.35);border-left:none;padding:1.2rem 0.75rem;transition:all 0.3s ease;border-radius:0 8px 8px 0;animation:pulseGlow 4s ease-in-out infinite;backdrop-filter:blur(16px);}
        .tutoriva-pill:hover{background:var(--teal);padding-right:1.1rem;}
        .tutoriva-pill:hover .pt,.tutoriva-pill:hover .ps,.tutoriva-pill:hover .pa{color:#0E1014!important;}
        .tutoriva-pill:hover .pd{background:#0E1014;}
        .pd{width:5px;height:5px;background:var(--teal);border-radius:50%;flex-shrink:0;}
        .ps{font-size:0.48rem;letter-spacing:0.14em;text-transform:uppercase;color:rgba(31,200,180,0.65);writing-mode:vertical-rl;transform:rotate(180deg);}
        .pt{font-family:'Playfair Display',serif;font-size:0.75rem;font-weight:700;color:var(--teal);writing-mode:vertical-rl;transform:rotate(180deg);letter-spacing:0.04em;}
        .pa{font-size:0.7rem;color:var(--teal);transform:rotate(90deg);font-weight:600;}

        .nav-link{color:var(--soft);font-size:0.75rem;letter-spacing:0.12em;text-transform:uppercase;transition:color 0.2s;}
        .nav-link:hover{color:var(--white);}
        .mobile-menu{display:none;flex-direction:column;gap:5px;background:none;border:none;padding:4px;}
        .mobile-menu span{display:block;width:24px;height:1.5px;background:var(--white);border-radius:2px;}

        .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);}
        .stat-item{padding:3rem 2rem;border-right:1px solid var(--divider);text-align:center;}
        .stat-item:last-child{border-right:none;}

        .work-strip{display:flex;gap:1.5rem;overflow-x:auto;padding-bottom:1.5rem;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;}
        .work-strip::-webkit-scrollbar{height:1px;}
        .work-strip::-webkit-scrollbar-track{background:var(--divider);}
        .work-strip::-webkit-scrollbar-thumb{background:var(--teal);}
        .work-card{min-width:420px;height:540px;position:relative;overflow:hidden;scroll-snap-align:start;flex-shrink:0;border:1px solid var(--divider);transition:border-color 0.3s,transform 0.3s;}
        .work-card:hover{border-color:rgba(31,200,180,0.3);transform:translateY(-4px);}
        .work-card.featured{min-width:620px;}

        .cap-grid{display:grid;grid-template-columns:1fr 1fr;border:1px solid var(--divider);}
        .cap-item{padding:2.5rem;border-bottom:1px solid var(--divider);border-right:1px solid var(--divider);transition:background 0.25s;position:relative;overflow:hidden;}
        .cap-item:nth-child(even){border-right:none;}
        .cap-item:nth-last-child(-n+2){border-bottom:none;}
        .cap-item:hover{background:var(--teal-dim);}
        .cap-item::before{content:'';position:absolute;top:0;left:0;width:0;height:2px;background:var(--teal);transition:width 0.3s;}
        .cap-item:hover::before{width:100%;}

        .industry-grid{display:flex;flex-wrap:wrap;gap:0.75rem;margin-top:2rem;}
        .industry-tag{border:1px solid var(--divider);padding:0.6rem 1.2rem;font-size:0.72rem;letter-spacing:0.08em;color:var(--soft);text-transform:uppercase;transition:all 0.2s;}
        .industry-tag:hover{border-color:var(--teal);color:var(--teal);}

        .process-grid{display:grid;grid-template-columns:repeat(4,1fr);}
        .process-card{padding:2.5rem 2rem;border-left:1px solid var(--divider);}
        .process-card:first-child{border-left:none;}

        .why-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--divider);margin-top:4rem;}
        .why-item{background:var(--card);padding:2.5rem;transition:background 0.2s;}
        .why-item:hover{background:var(--surface);}

        .tl{width:2.5rem;height:2px;background:var(--teal);display:block;margin-bottom:1rem;}
        .gl{width:2.5rem;height:2px;background:var(--gold);display:block;margin-bottom:1rem;}

        .mob-drawer{display:none;position:fixed;top:64px;left:0;right:0;background:var(--card);border-bottom:1px solid var(--divider);flex-direction:column;z-index:98;padding:1.5rem;gap:0;}
        .mob-drawer.open{display:flex;}
        .mob-drawer a{color:var(--soft);font-size:0.9rem;letter-spacing:0.1em;text-transform:uppercase;padding:1rem 0;border-bottom:1px solid var(--divider);}
        .mob-drawer a:last-child{border-bottom:none;color:var(--teal);}

        .tut-mobile{display:none;align-items:center;justify-content:space-between;background:var(--teal-dim);border:1px solid rgba(31,200,180,0.25);padding:0.85rem 1rem;margin-bottom:2rem;border-radius:4px;}
        .tut-mobile span{font-size:0.72rem;color:var(--teal);letter-spacing:0.06em;text-transform:uppercase;line-height:1.4;}
        .tut-mobile a{font-size:0.72rem;color:var(--teal);font-weight:600;white-space:nowrap;padding-left:1rem;}

        .ext-link::after{content:' →';font-size:0.8em;}

        @media(max-width:768px){
          body{cursor:auto;}
          .cursor-dot,.cursor-ring,.tutoriva-sidebar{display:none;}
          .nd,.nc{display:none!important;}
          .mobile-menu{display:flex!important;}
          .hero-pad{padding:5.5rem 1.25rem 3rem!important;min-height:auto!important;}
          .sp{padding:3.5rem 1.25rem!important;}
          .cta-pad{padding:4rem 1.25rem!important;}
          .footer-pad{padding:2.5rem 1.25rem!important;}
          .stats-grid{grid-template-columns:1fr 1fr!important;}
          .stat-item{padding:2rem 1rem!important;}
          .stat-item:nth-child(2){border-right:none!important;}
          .stat-item:nth-child(3){border-right:1px solid var(--divider)!important;}
          .cap-grid{grid-template-columns:1fr!important;}
          .cap-item{border-right:none!important;}
          .cap-item:nth-last-child(-n+2){border-bottom:1px solid var(--divider)!important;}
          .cap-item:last-child{border-bottom:none!important;}
          .process-grid{grid-template-columns:1fr 1fr!important;}
          .process-card{border-left:none!important;border-top:1px solid var(--divider)!important;padding:1.5rem 0.75rem!important;}
          .process-card:nth-child(odd){border-right:1px solid var(--divider)!important;}
          .why-grid{grid-template-columns:1fr!important;}
          .work-card{min-width:290px!important;height:400px!important;}
          .work-card.featured{min-width:310px!important;}
          .fi{flex-direction:column!important;gap:1.5rem!important;}
          .tut-mobile{display:flex!important;}
          .cap-intro{grid-template-columns:1fr!important;gap:1.5rem!important;}
          .nav-inner{padding:1.1rem 1.25rem!important;}
          .why-item{padding:1.75rem!important;}
        }
      `}</style>

      <div className="cursor-dot" id="cursorDot" />
      <div className="cursor-ring" id="cursorRing" />

      {/* TUTORIVA SIDEBAR — desktop only */}
      <div className="tutoriva-sidebar">
        <a href="https://tutoriva.com" target="_blank" rel="noopener noreferrer" className="tutoriva-pill">
          <span className="ps">A Brandinn Product</span>
          <div className="pd" />
          <span className="pt">Tutoriva</span>
          <div className="pd" />
          <span className="pa">›</span>
        </a>
      </div>

      {/* NAV */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, background: scrolled ? 'rgba(14,16,20,0.97)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid var(--divider)' : 'none', transition:'all 0.3s ease' }}>
        <div className="nav-inner" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1.4rem 4rem' }}>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.2rem', fontWeight:700, letterSpacing:'0.04em' }}>
            Brandinn <span style={{ color:'var(--teal)' }}>Atelier</span>
          </div>
          <ul className="nd" style={{ display:'flex', gap:'2.5rem', listStyle:'none' }}>
            {['Work','Services','Process','Contact'].map((item) => (
              <li key={item}><a href={`#${item.toLowerCase()}`} className="nav-link">{item}</a></li>
            ))}
          </ul>
          <button className="nc"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior:'smooth' })}
            style={{ background:'none', border:'1px solid var(--teal)', color:'var(--teal)', padding:'0.5rem 1.4rem', fontSize:'0.72rem', letterSpacing:'0.1em', textTransform:'uppercase', transition:'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background='var(--teal)'; e.currentTarget.style.color='#0E1014' }}
            onMouseLeave={e => { e.currentTarget.style.background='none'; e.currentTarget.style.color='var(--teal)' }}>
            Start a Project
          </button>
          <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mob-drawer${menuOpen ? ' open' : ''}`}>
        {['Work','Services','Process','Contact'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>
        ))}
        <a href="https://tutoriva.com" target="_blank" rel="noopener noreferrer">Tutoriva After Class</a>
      </div>

      {/* HERO */}
      <section className="hero-pad" style={{ minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 4rem', position:'relative', overflow:'hidden' }}>
        <div aria-hidden style={{ position:'absolute', right:'-4rem', top:'50%', transform:'translateY(-50%)', fontFamily:"'Playfair Display',serif", fontSize:'clamp(8rem,20vw,18rem)', fontWeight:900, color:'rgba(31,200,180,0.02)', pointerEvents:'none', lineHeight:1, userSelect:'none' }}>BRAND</div>

        {/* Mobile Tutoriva bar */}
        <div className="tut-mobile">
          <span>Tutoriva After Class — A Brandinn Product</span>
          <a href="https://tutoriva.com" target="_blank" rel="noopener noreferrer">Visit</a>
        </div>

        <div className="reveal">
          <div style={{ width:'3rem', height:'2px', background:'var(--teal)', marginBottom:'2rem' }} />
          <p style={{ fontSize:'0.68rem', letterSpacing:'0.28em', textTransform:'uppercase', color:'var(--teal)', marginBottom:'1.5rem' }}>Creative Studio — Lagos, Nigeria</p>
        </div>

        <h1 className="reveal rd1" style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(3.5rem,8vw,7rem)', fontWeight:900, lineHeight:1.0, letterSpacing:'-0.02em', marginBottom:'2rem', color:'var(--white)' }}>
          Brandinn<br /><span style={{ color:'var(--gold)' }}>Atelier.</span>
        </h1>

        <p className="reveal rd2" style={{ fontSize:'1.05rem', color:'var(--soft)', maxWidth:'44ch', lineHeight:1.9, marginBottom:'1.5rem', fontWeight:300 }}>
          The branding partner for companies ready to lead their industry. We don&apos;t make things beautiful — we make businesses impossible to ignore.
        </p>

        <p className="reveal rd3" style={{ fontSize:'0.88rem', color:'var(--white)', marginBottom:'3rem', minHeight:'1.5em', fontStyle:'italic', fontFamily:"'Playfair Display',serif" }}>
          {text}<span style={{ display:'inline-block', width:'2px', height:'1em', background:'var(--teal)', marginLeft:'2px', verticalAlign:'middle', animation:'blink 1s step-end infinite' }} />
        </p>

        <div className="reveal rd4" style={{ display:'flex', gap:'1.5rem', alignItems:'center', flexWrap:'wrap' }}>
          <button onClick={() => document.getElementById('work')?.scrollIntoView({ behavior:'smooth' })}
            style={{ background:'var(--teal)', color:'#0E1014', border:'none', padding:'0.9rem 2.4rem', fontSize:'0.78rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase' }}
            onMouseEnter={e => e.currentTarget.style.opacity='0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity='1'}>
            View Our Work
          </button>
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior:'smooth' })}
            style={{ background:'none', border:'none', color:'var(--soft)', fontSize:'0.78rem', letterSpacing:'0.1em', textTransform:'uppercase' }}
            onMouseEnter={e => e.currentTarget.style.color='var(--white)'}
            onMouseLeave={e => e.currentTarget.style.color='var(--soft)'}>
            Start a Project
          </button>
        </div>

        <div style={{ position:'absolute', bottom:'3rem', right:'4rem', display:'flex', flexDirection:'column', alignItems:'center', gap:'0.8rem' }}>
          <span style={{ fontSize:'0.58rem', letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--muted)', writingMode:'vertical-rl' }}>Scroll</span>
          <div style={{ width:'1px', height:'4rem', background:'linear-gradient(to bottom,var(--teal),transparent)' }} />
        </div>
      </section>

      {/* STATS */}
      <div style={{ background:'var(--card)', borderTop:'1px solid var(--divider)', borderBottom:'1px solid var(--divider)' }}>
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-item reveal">
              <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2rem,4vw,3rem)', fontWeight:900, color: i % 2 === 0 ? 'var(--teal)' : 'var(--gold)', lineHeight:1, marginBottom:'0.5rem' }}>{s.num}</p>
              <p style={{ fontSize:'0.7rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--soft)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* WORK */}
      <section id="work" className="sp" style={{ padding:'7rem 4rem' }}>
        <span className="tl reveal" />
        <div className="reveal" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'3rem', flexWrap:'wrap', gap:'1rem' }}>
          <div>
            <p style={{ fontSize:'0.68rem', letterSpacing:'0.25em', textTransform:'uppercase', color:'var(--teal)', marginBottom:'0.8rem' }}>Selected Work</p>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2rem,4vw,3.5rem)', fontWeight:700, lineHeight:1.05, color:'var(--white)' }}>Work that moves<br /><em>markets.</em></h2>
          </div>
          <p style={{ fontSize:'0.82rem', color:'var(--soft)', maxWidth:'32ch', lineHeight:1.75 }}>Every project starts with a business problem. Design is how we solve it.</p>
        </div>
        <div className="work-strip reveal">
          {works.map((w, i) => (
            <div key={i} className={`work-card${i === 0 ? ' featured' : ''}`} style={{ background:w.bg }}>
              <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontFamily:"'Playfair Display',serif", fontSize: i===0?'9rem':'7rem', fontWeight:900, color:`${w.accent}10`, letterSpacing:'-0.02em' }}>{w.initials}</span>
              </div>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:w.accent }} />
              {w.badge && <div style={{ position:'absolute', top:'1.5rem', left:'1.5rem', fontSize:'0.58rem', letterSpacing:'0.18em', textTransform:'uppercase', color:w.accent, border:`1px solid ${w.accent}50`, padding:'0.25rem 0.7rem' }}>{w.badge}</div>}
              <div style={{ position:'absolute', top:'1.5rem', right:'1.5rem', fontSize:'0.58rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--soft)', border:'1px solid var(--divider)', padding:'0.25rem 0.7rem' }}>{w.industry}</div>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(8,8,10,0.97) 0%,rgba(8,8,10,0.1) 55%)' }} />
              <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'2rem' }}>
                <span style={{ fontSize:'0.62rem', letterSpacing:'0.15em', textTransform:'uppercase', color:w.accent, marginBottom:'0.6rem', display:'block' }}>{w.tag}</span>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize: i===0?'1.9rem':'1.4rem', fontWeight:700, marginBottom:'0.5rem', color:'var(--white)' }}>{w.client}</h3>
                <p style={{ fontSize:'0.8rem', color:'var(--soft)', lineHeight:1.7, maxWidth:'42ch' }}>{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CAPABILITIES */}
      <section id="services" className="sp" style={{ padding:'7rem 4rem', background:'var(--card)', borderTop:'1px solid var(--divider)' }}>
        <span className="tl reveal" />
        <div className="cap-intro reveal" style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:'4rem', alignItems:'start', marginBottom:'4rem' }}>
          <div>
            <p style={{ fontSize:'0.68rem', letterSpacing:'0.25em', textTransform:'uppercase', color:'var(--teal)', marginBottom:'0.8rem' }}>What We Do</p>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2rem,4vw,3.5rem)', fontWeight:700, lineHeight:1.05, color:'var(--white)' }}>Capabilities</h2>
          </div>
          <p style={{ fontSize:'0.92rem', color:'var(--soft)', lineHeight:1.9, maxWidth:'52ch', alignSelf:'flex-end' }}>
            We don&apos;t sell design. We sell transformation. Every service exists to move your business forward — not just look good doing it.
          </p>
        </div>
        <div className="cap-grid reveal">
          {capabilities.map((c, i) => (
            <div key={i} className="cap-item">
              <p style={{ fontSize:'0.6rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--teal)', marginBottom:'1rem' }}>0{i+1}</p>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.1rem', fontWeight:700, marginBottom:'0.75rem', color:'var(--white)' }}>{c.title}</h3>
              <p style={{ fontSize:'0.84rem', color:'var(--soft)', lineHeight:1.8, marginBottom:'1rem' }}>{c.desc}</p>
              <p style={{ fontSize:'0.74rem', color:'var(--teal)', letterSpacing:'0.03em', fontStyle:'italic' }}>{c.outcome}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop:'5rem' }} className="reveal">
          <span className="gl" />
          <p style={{ fontSize:'0.68rem', letterSpacing:'0.25em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'1rem' }}>Industries We Serve</p>
          <div className="industry-grid">
            {industries.map((ind, i) => <span key={i} className="industry-tag">{ind}</span>)}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="sp" style={{ padding:'7rem 4rem' }}>
        <span className="tl reveal" />
        <div className="reveal" style={{ marginBottom:'4rem' }}>
          <p style={{ fontSize:'0.68rem', letterSpacing:'0.25em', textTransform:'uppercase', color:'var(--teal)', marginBottom:'0.8rem' }}>How We Work</p>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2rem,4vw,3.5rem)', fontWeight:700, lineHeight:1.05, color:'var(--white)' }}>
            Position before<br /><em style={{ color:'var(--gold)' }}>design. Always.</em>
          </h2>
        </div>
        <div className="process-grid reveal">
          {process.map((s, i) => (
            <div key={i} className="process-card" style={{ borderTop:`2px solid ${s.accent}` }}>
              <p style={{ fontSize:'0.62rem', letterSpacing:'0.2em', color:s.accent, textTransform:'uppercase', paddingTop:'1.5rem', marginBottom:'0.5rem' }}>{s.num} — {s.phase}</p>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1rem', fontWeight:700, marginBottom:'0.8rem', marginTop:'0.3rem', color:'var(--white)' }}>{s.title}</h3>
              <p style={{ fontSize:'0.82rem', color:'var(--soft)', lineHeight:1.8 }}>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY BRANDINN */}
      <section className="sp" style={{ padding:'7rem 4rem', background:'var(--card)', borderTop:'1px solid var(--divider)' }}>
        <span className="gl reveal" />
        <div className="reveal">
          <p style={{ fontSize:'0.68rem', letterSpacing:'0.25em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'0.8rem' }}>Why Brandinn Atelier</p>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2rem,4vw,3.5rem)', fontWeight:700, lineHeight:1.05, color:'var(--white)' }}>
            We think like<br /><em>consultants.</em>
          </h2>
        </div>
        <div className="why-grid reveal">
          {[
            { title:'Strategy first.', text:'Every brand decision is anchored in your market position, your audience, and your competitive landscape. Design without strategy is decoration.' },
            { title:'Built to scale.', text:'We design systems, not just assets. Your identity will work on a business card in Lagos and a billboard in London.' },
            { title:'We own the outcomes.', text:"We don't deliver files and disappear. We stay until your brand is working — measured by your results, not our aesthetics." },
            { title:'Distinctive or nothing.', text:'The goal is never to look good. The goal is to be unmistakable. We hunt for the one truth that makes your brand impossible to replicate.' },
          ].map((w, i) => (
            <div key={i} className="why-item">
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.15rem', fontWeight:700, marginBottom:'0.8rem', color:'var(--gold)' }}>{w.title}</h3>
              <p style={{ fontSize:'0.86rem', color:'var(--soft)', lineHeight:1.85 }}>{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="cta-pad" style={{ textAlign:'center', padding:'9rem 4rem', position:'relative', overflow:'hidden', borderTop:'1px solid var(--divider)' }}>
        <div aria-hidden style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', pointerEvents:'none' }}>
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(5rem,14vw,13rem)', fontWeight:900, color:'rgba(31,200,180,0.025)', letterSpacing:'-0.04em' }}>START</span>
        </div>
        <div style={{ width:'3rem', height:'2px', background:'var(--teal)', margin:'0 auto 2rem' }} className="reveal" />
        <div className="reveal">
          <span style={{ fontSize:'0.68rem', letterSpacing:'0.28em', textTransform:'uppercase', color:'var(--teal)', marginBottom:'1.5rem', display:'block' }}>Ready to build?</span>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2.2rem,5vw,4.5rem)', fontWeight:900, lineHeight:1.08, marginBottom:'1.5rem', color:'var(--white)' }}>
            Your brand should make<br />competitors <em style={{ color:'var(--gold)' }}>uncomfortable.</em>
          </h2>
          <p style={{ fontSize:'0.92rem', color:'var(--soft)', marginBottom:'3rem', maxWidth:'44ch', marginLeft:'auto', marginRight:'auto', lineHeight:1.9 }}>
            We work with a small number of founders at a time. We choose clients who are serious about their market position. If that&apos;s you — let&apos;s talk.
          </p>
          <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
            <button style={{ background:'var(--teal)', color:'#0E1014', border:'none', padding:'1rem 2.4rem', fontSize:'0.78rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase' }}>
              Start a Project
            </button>
            <button style={{ background:'none', border:'1px solid var(--divider)', color:'var(--soft)', padding:'1rem 2rem', fontSize:'0.78rem', letterSpacing:'0.1em', textTransform:'uppercase' }}>
              See Our Services
            </button>
          </div>
          <span style={{ fontSize:'0.84rem', color:'var(--muted)', marginTop:'2.5rem', display:'block' }}>
            Or write directly — <a href="mailto:hello@brandinn.com" style={{ color:'var(--teal)', fontWeight:500 }}>hello@brandinn.com</a>
          </span>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-pad" style={{ borderTop:'1px solid var(--divider)', padding:'4rem', background:'var(--card)' }}>
        <div className="fi" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'3rem', marginBottom:'3rem' }}>
          <div style={{ maxWidth:'26ch' }}>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.1rem', fontWeight:700, letterSpacing:'0.04em', marginBottom:'0.8rem', color:'var(--white)' }}>
              Brandinn <span style={{ color:'var(--teal)' }}>Atelier</span>
            </div>
            <p style={{ fontSize:'0.8rem', color:'var(--soft)', lineHeight:1.8 }}>The branding partner for companies ready to lead their industry.</p>
            <div style={{ marginTop:'1.5rem', padding:'1rem', background:'var(--teal-dim)', border:'1px solid rgba(31,200,180,0.2)', borderRadius:'6px' }}>
              <p style={{ fontSize:'0.58rem', letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(31,200,180,0.7)', marginBottom:'0.4rem' }}>A Brandinn Product</p>
              <a href="https://tutoriva.com" target="_blank" rel="noopener noreferrer" style={{ fontFamily:"'Playfair Display',serif", fontSize:'0.92rem', fontWeight:700, color:'var(--teal)', display:'block', marginBottom:'0.2rem' }}>
                Tutoriva After Class
              </a>
              <p style={{ fontSize:'0.72rem', color:'var(--soft)' }}>K-12 online tutoring platform</p>
            </div>
          </div>

          <div>
            <p style={{ fontSize:'0.62rem', letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--muted)', marginBottom:'1.2rem' }}>Navigate</p>
            <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'0.8rem' }}>
              {['Work','Services','Process','Contact'].map((item) => (
                <li key={item}><a href={`#${item.toLowerCase()}`} style={{ fontSize:'0.82rem', color:'var(--soft)', letterSpacing:'0.05em', transition:'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color='var(--white)'}
                  onMouseLeave={e => e.currentTarget.style.color='var(--soft)'}>{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p style={{ fontSize:'0.62rem', letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--muted)', marginBottom:'1.2rem' }}>Connect</p>
            <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'0.8rem' }}>
              {[
                { label:'LinkedIn', href:'#' },
                { label:'Instagram', href:'#' },
                { label:'Behance', href:'#' },
                { label:'Email Us', href:'mailto:hello@brandinn.com' },
              ].map((link) => (
                <li key={link.label}><a href={link.href} style={{ fontSize:'0.82rem', color:'var(--soft)', letterSpacing:'0.05em', transition:'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color='var(--white)'}
                  onMouseLeave={e => e.currentTarget.style.color='var(--soft)'}>{link.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p style={{ fontSize:'0.62rem', letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--muted)', marginBottom:'1.2rem' }}>Studio</p>
            <p style={{ fontSize:'0.82rem', color:'var(--soft)', lineHeight:1.9 }}>Lagos, Nigeria<br />Available Worldwide</p>
          </div>
        </div>

        <div style={{ borderTop:'1px solid var(--divider)', paddingTop:'2rem', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem' }}>
          <p style={{ fontSize:'0.7rem', color:'var(--muted)', letterSpacing:'0.05em' }}>© 2026 Brandinn Atelier. All rights reserved.</p>
          <p style={{ fontSize:'0.7rem', color:'var(--muted)', letterSpacing:'0.05em', fontStyle:'italic' }}>Identity is the product.</p>
        </div>
      </footer>

    </main>
  )
}