"use client";

import React, { useState, useEffect, useRef } from "react";
const projects = [
  {
    n: "01",
    title: "Agentic AI Project Manager",
    role: "Solo build",
    blurb:
      "An agentic AI prototype that autonomously generates and adapts project workflows. LLM driven rerouting cut simulated delays by 40 percent and saved 25 hours a month in manual tracking.",
    tags: ["LangChain", "CrewAI", "Python", "LLM APIs"],
  },
  {
    n: "02",
    title: "Peer to Peer Book Marketplace",
    role: "Full-stack, 3 person team",
    blurb:
      "Built the production backend for a student book marketplace. 15 plus REST routes across auth, listings, wishlist and collections, wired to Supabase and a React Vite client.",
    tags: ["React", "Node", "Express", "Supabase"],
  },
  {
    n: "03",
    title: "Personal Portfolio Website",
    role: "Solo build",
    blurb:
      "The site you're on right now. Built from scratch with Next.js and a hand rolled CSS system, reveal animations, a custom cursor, and a marquee that warps with scroll velocity.",
    tags: ["Next.js", "React", "CSS", "Motion"],
  },
  {
    n: "04",
    title: "Core Siege",
    role: "Solo build",
    blurb:
      "A fun browser game where you rotate, aim, and defend the reactor core from incoming enemies. Built with smooth gameplay and wave-based progression.",
    tags: ["HTML5", "JavaScript", "CSS3", "Canvas API"],
  },
];

const skills = [
  "Python", "LangChain", "LangGraph", "CrewAI", "RAG", "React",
  "Next.js", "TypeScript", "Supabase", "Git", "Figma",
];

/* ---- DecryptText: scramble-resolve, plays once on mount ------------ */
const SCRAMBLE = "0123456789ABCDEF<>-_/\\[]{}=+*#%λΣΔ";

function DecryptText({ text, className = "", delay = 0, speed = 70 }) {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setDisplay(text); return; }
    let revealed = -(delay / speed);
    let timer;
    const tick = () => {
      let out = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") out += " ";
        else if (i < revealed) out += text[i];
        else out += SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0];
      }
      setDisplay(out);
      revealed += 0.9;
      if (revealed < text.length) timer = setTimeout(tick, speed);
      else setDisplay(text);
    };
    timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [text, delay, speed]);
  return (
    <span className={`line ${className}`}>
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}

/* ---- Grainient: ambient backdrop (dark base + accent haze + grain) - */
function Grainient() {
  return (
    <div className="grainient" aria-hidden="true">
      <div className="gr-blob gr-a" />
      <div className="gr-blob gr-b" />
      <div className="gr-grain" />
    </div>
  );
}

/* ---- TerminalBackdrop: faulty-terminal warping grid of cells ------- *
 *  A diagonal sine field drives the brightness of a square grid in the
 *  accent colour. Fades out on scroll; loop PAUSES off-screen; reduced
 *  motion renders a single static frame.
 * ------------------------------------------------------------------ */
function TerminalBackdrop() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const accent = getComputedStyle(wrap).getPropertyValue("--accent").trim() || "#FF3E80";
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w, h, cell, colsN, rowsN, raf, t = 0, visible = true;

    const setup = () => {
      w = wrap.offsetWidth; h = wrap.offsetHeight;
      cell = window.innerWidth < 720 ? 13 : 17;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      colsN = Math.ceil(w / cell); rowsN = Math.ceil(h / cell);
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = accent;
      for (let y = 0; y < rowsN; y++) {
        for (let x = 0; x < colsN; x++) {
          const v = Math.sin(x * 0.34 + y * 0.22 + t) * 0.5
                  + Math.sin((x - y) * 0.17 - t * 0.6) * 0.5;
          let a = Math.max(0, (v + 1) / 2 - 0.34) * 1.5;
          if (a <= 0.02) continue;
          ctx.globalAlpha = Math.min(a, 0.9);
          ctx.fillRect(x * cell, y * cell, cell - 3, cell - 3);
        }
      }
      ctx.globalAlpha = 1;
      t += 0.03;
    };

    setup();
    window.addEventListener("resize", () => { setup(); if (reduce) frame(); });
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    io.observe(wrap);

    if (reduce) { frame(); return () => io.disconnect(); }
    const loop = () => { raf = requestAnimationFrame(loop); if (visible) frame(); };
    loop();
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const onScroll = () => {
      wrap.style.opacity = String(Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.7)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={wrapRef} className="terminal" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}

/* ---- GridMotion: drifting rows of project tiles -------------------- */
function GridMotion({ items }) {
  const rows = [items, [...items].slice().reverse()];
  return (
    <div className="gridmotion">
      {rows.map((row, ri) => (
        <div key={ri} className={`gm-row ${ri % 2 ? "gm-rtl" : "gm-ltr"}`}>
          <div className="gm-track">
            {[...row, ...row].map((p, i) => (
              <article key={i} className="gm-tile" aria-hidden={i >= row.length ? "true" : undefined}>
                <div className="gm-top">
                  <span className="gm-n">{p.n}</span>
                  <span className="gm-role">{p.role}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.blurb}</p>
                <div className="gm-tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---- Folder: reusable open-on-hover folder ------------------------- */
function Folder({ title, items = [] }) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);
  return (
    <div
      className={`folder ${open ? "open" : ""}`}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      aria-label={title}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onClick={toggle}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } }}
    >
      <div className="folder-papers">
        {items.slice(0, 3).map((it, i) => (
          <span key={i} className="paper" style={{ "--pi": i }}>{it}</span>
        ))}
      </div>
      <div className="folder-front" />
      <div className="folder-tab" />
      <span className="folder-label">{title}</span>
    </div>
  );
}

/* ---- scroll-reveal hook -------------------------------------------- */
function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.unobserve(el); } },
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

export default function Portfolio() {
  const progressRef = useRef(null);
  const marqueeRef = useRef(null);
  const cursorRef = useRef(null);
  const [navSolid, setNavSolid] = useState(false);
  const state = useRef({ cx: -100, cy: -100, mx: -100, my: -100, lastY: 0, skew: 0 });

  useEffect(() => {
    const onMove = (e) => { state.current.mx = e.clientX; state.current.my = e.clientY; };
    window.addEventListener("pointermove", onMove);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf;
    const loop = () => {
      const s = state.current;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      const solid = y > window.innerHeight * 0.6;
      setNavSolid((p) => (p !== solid ? solid : p));
      const vel = y - s.lastY; s.lastY = y;
      const target = reduce ? 0 : Math.max(-6, Math.min(6, vel * 0.35));
      s.skew += (target - s.skew) * 0.1;
      if (marqueeRef.current) marqueeRef.current.style.transform = `skewY(${s.skew}deg)`;
      if (!reduce) {
        s.cx += (s.mx - s.cx) * 0.16; s.cy += (s.my - s.cy) * 0.16;
        if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${s.cx}px, ${s.cy}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", onMove); };
  }, []);

  return (
    <div className="root">
      <style>{CSS}</style>

      {/* ambient grainy backdrop */}
      <Grainient />

      {/* custom cursor */}
      <div ref={cursorRef} className="cursor" aria-hidden="true" />

      {/* scroll progress */}
      <div className="progress" aria-hidden="true"><div ref={progressRef} className="progress-bar" /></div>

      {/* nav — TODO: swap for Dock or GooeyNav once that's decided */}
      <header className={`nav ${navSolid ? "solid" : ""}`}>
        <a href="#top" className="brand">SK<span className="dot">.</span></a>
        <span className="pill"><span className="ping" /> open to summer ’26 internships</span>
        <nav className="links">
          <a href="#about">what I do</a>
          <a href="#work">work</a>
          <a href="#contact">say hi</a>
        </nav>
      </header>

      {/* hero — terminal + just the name */}
      <section id="top" className="hero">
        <TerminalBackdrop />
        <div className="hero-veil" aria-hidden="true" />
        <span className="eyebrow"><span className="ping" /> CSE Undergrad'27 · agentic AI engineer</span>
        <h1 className="title">
          <DecryptText text="Sainya" delay={60} />
          <DecryptText text="Krishnamurthy" className="line2" delay={260} />
        </h1>
        <a href="#about" className="scrollcue">scroll <span className="arrow">↓</span></a>
      </section>

      {/* marquee band */}
      <div className="marquee-wrap">
        <div ref={marqueeRef} className="marquee">
          <div className="marq-row">
            {Array.from({ length: 2 }).map((_, k) => (
              <span key={k} className="marq-track">
                {["frontend", "creative dev", "motion", "react", "webgl-curious", "ui"].map((w, i) => (
                  <span key={i} className="marq-item">{w}<span className="star">✦</span></span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* what I do */}
      <section id="about" className="about">
        <Reveal className="kicker-wrap"><span className="kicker">what I do</span></Reveal>
        <Reveal as="h2" className="about-h" delay={60}>
          I build agentic AI systems and interfaces that <em>think</em> alongside you.
        </Reveal>
        <Reveal as="p" className="lede" delay={100}>
          Final year CSE student at GEU Dehradun, currently looking for a team to build real things with.
        </Reveal>
        <Reveal className="about-body" delay={140}>
          <p>
            I spend most of my time inside agentic AI systems and LLM orchestration,
            figuring out how to make multi agent workflows actually reliable instead
            of just impressive in a demo. LangChain, LangGraph and CrewAI are where I
            live most days.
          </p>
          <p>
            Outside of code I sing, sketch, and do fashion illustration, which keeps
            the <em>creative and technical</em> sides of my brain equally fed. GCP and
            AWS certified, always building something in public.
          </p>
        </Reveal>
        <Reveal className="skills" delay={180}>
          {skills.map((s) => <span key={s} className="skill">{s}</span>)}
        </Reveal>
      </section>

      {/* projects — grid motion */}
      <section id="work" className="work">
        <div className="work-head">
          <span className="kicker">selected work</span>
          <span className="kicker muted">it moves — hover to pause</span>
        </div>
        <GridMotion items={projects} />
      </section>

      {/* the lab — folders */}
      <section className="lab">
        <Reveal className="kicker-wrap"><span className="kicker">the lab</span></Reveal>
        <Reveal as="p" className="lab-sub" delay={60}>
          Reusable bits, half-built experiments and project templates — hover to peek inside.
        </Reveal>
        <Reveal className="lab-row" delay={120}>
          <Folder title="agentic ai" items={["agent_manager.py", "router.py", "crew_config.yaml"]} />
          <Folder title="frontend" items={["Portfolio.jsx", "Hero.tsx", "globals.css"]} />
          <Folder title="certs" items={["gcp_badge.pdf", "aws_badge.pdf", "resume.pdf"]} />
        </Reveal>
      </section>

      {/* contact */}
      <section id="contact" className="contact">
        <Reveal className="contact-inner">
          <p className="contact-kick">got something to build?</p>
          <a href="mailto:sainyakd@gmail.com" className="contact-cta">let's talk <span className="cta-arrow">↗</span></a>
          <div className="contact-links">
            <a href="https://linkedin.com/in/sainyakd" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/sainyakris" target="_blank" rel="noreferrer">GitHub</a>
            <a href="mailto:sainyakd@gmail.com">Email</a>
            <a href="/resume.pdf" download>Resume</a>
          </div>
        </Reveal>
        <footer className="foot">
          <span>© {new Date().getFullYear()} Sainya Krishnamurthy</span>
          <span>Bangalore, India</span>
        </footer>
      </section>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

* { box-sizing: border-box; }
.root {
  --bg: #0B0A0F;
  --fg: #ECE8E0;
  --dim: #908C9C;
  --surface: #15131C;
  --line: #2E2B38;
  --accent: #FF3E80;
  background: transparent;
  color: var(--fg);
  font-family: 'Space Grotesk', system-ui, sans-serif;
  overflow-x: hidden;
  position: relative;
}
.root a { color: inherit; text-decoration: none; }
@media (hover: hover) and (pointer: fine) { .root { cursor: none; } }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }

/* cursor */
.cursor { position: fixed; top: 0; left: 0; width: 26px; height: 26px; border-radius: 50%; background: #fff; mix-blend-mode: difference; pointer-events: none; z-index: 9999; will-change: transform; }
@media (hover: none), (pointer: coarse) { .cursor { display: none; } .root { cursor: auto; } }

/* progress */
.progress { position: fixed; top: 0; left: 0; right: 0; height: 3px; z-index: 9000; background: rgba(255,255,255,.06); }
.progress-bar { height: 100%; width: 100%; transform-origin: 0 50%; transform: scaleX(0); background: var(--accent); }

/* grainient backdrop */
.grainient { position: fixed; inset: 0; z-index: -1; overflow: hidden; pointer-events: none; background: var(--bg); }
.gr-blob { position: absolute; border-radius: 50%; filter: blur(110px); background: var(--accent); will-change: transform; }
.gr-a { width: 50vw; height: 50vw; opacity: .10; top: -12vh; left: -8vw; animation: drift1 30s ease-in-out infinite; }
.gr-b { width: 44vw; height: 44vw; opacity: .07; bottom: -14vh; right: -6vw; animation: drift2 36s ease-in-out infinite; }
@keyframes drift1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(8vw,6vh); } }
@keyframes drift2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-7vw,-5vh); } }
.gr-grain { position: absolute; inset: 0; opacity: .07; mix-blend-mode: screen;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }

/* nav */
.nav { position: fixed; top: 0; left: 0; right: 0; z-index: 8000; display: flex; align-items: center; justify-content: space-between; padding: 18px 28px; transition: background .4s ease, backdrop-filter .4s ease; margin-top: 4px; }
.nav.solid { background: rgba(11,10,15,.7); backdrop-filter: blur(10px); }
.brand { font-family: 'Bricolage Grotesque'; font-weight: 800; font-size: 22px; letter-spacing: -.02em; }
.brand .dot { color: var(--accent); }
.pill { display: inline-flex; align-items: center; gap: 8px; font-family: 'Space Mono'; font-size: 12px; padding: 7px 14px; border: 1px solid var(--line); border-radius: 999px; color: var(--fg); }
.ping { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); position: relative; }
.ping::after { content: ''; position: absolute; inset: -4px; border-radius: 50%; border: 1px solid var(--accent); animation: ping 1.8s ease-out infinite; }
@keyframes ping { 0% { transform: scale(.6); opacity: 1; } 100% { transform: scale(1.8); opacity: 0; } }
.links { display: flex; gap: 22px; font-size: 15px; }
.links a { position: relative; }
.links a::after { content: ''; position: absolute; left: 0; bottom: -3px; height: 2px; width: 0; background: var(--accent); transition: width .3s ease; }
.links a:hover::after { width: 100%; }
@media (max-width: 720px) { .pill { display: none; } .nav { padding: 14px 18px; } .links { gap: 16px; } }

/* hero */
.hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 120px 6vw 80px; position: relative; overflow: hidden; }
.terminal { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
.terminal canvas { width: 100%; height: 100%; display: block; }
.hero-veil { position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: radial-gradient(62% 52% at 50% 50%, rgba(11,10,15,.85), rgba(11,10,15,.4) 68%, transparent); }
.hero > .eyebrow, .hero > .title, .hero > .scrollcue { position: relative; z-index: 2; }
.eyebrow { display: inline-flex; align-items: center; gap: 9px; font-family: 'Space Mono'; text-transform: uppercase; letter-spacing: .14em; font-size: 12px; color: var(--fg); border: 1px solid var(--line); background: rgba(21,19,28,.55); padding: 8px 15px; border-radius: 999px; margin: 0 0 28px; }
.title { font-family: 'Bricolage Grotesque'; font-weight: 800; line-height: .86; letter-spacing: -.04em; margin: 0; font-size: clamp(50px, 11vw, 150px); color: var(--fg); }
.line { display: block; min-height: .86em; }
.line2 { color: transparent; -webkit-text-stroke: 2px var(--fg); }
.scrollcue { font-family: 'Space Mono'; font-size: 13px; letter-spacing: .1em; text-transform: uppercase; margin-top: 44px; display: inline-flex; align-items: center; gap: 8px; color: var(--dim); }
.scrollcue .arrow { display: inline-block; animation: bob 1.4s ease-in-out infinite; }
@keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(6px); } }

/* marquee */
.marquee-wrap { background: var(--accent); color: var(--bg); padding: 20px 0; overflow: hidden; }
.marquee { will-change: transform; }
.marq-row { display: flex; }
.marq-track { display: flex; align-items: center; white-space: nowrap; animation: slide 22s linear infinite; }
@keyframes slide { from { transform: translateX(0); } to { transform: translateX(-100%); } }
.marq-item { font-family: 'Bricolage Grotesque'; font-weight: 700; font-size: clamp(26px, 5vw, 52px); letter-spacing: -.02em; padding: 0 26px; display: inline-flex; align-items: center; gap: 22px; }
.star { font-size: .5em; color: var(--bg); }

/* what I do */
.about { padding: 16vh 7vw; max-width: 1100px; margin: 0 auto; }
.kicker { font-family: 'Space Mono'; font-size: 13px; text-transform: uppercase; letter-spacing: .14em; color: var(--fg); }
.kicker.muted { color: var(--dim); }
.about-h { font-family: 'Bricolage Grotesque'; font-weight: 700; letter-spacing: -.03em; font-size: clamp(34px, 6vw, 72px); line-height: 1.04; margin: 18px 0 28px; max-width: 16ch; }
.about-h em { font-style: normal; color: var(--accent); }
.lede { max-width: 620px; font-size: clamp(17px, 2vw, 22px); line-height: 1.5; color: var(--fg); margin: 0 0 40px; }
.about-body { display: grid; grid-template-columns: 1fr 1fr; gap: 36px; max-width: 860px; }
.about-body p { line-height: 1.65; color: var(--dim); font-size: 16.5px; margin: 0; }
.about-body em { font-style: normal; color: var(--fg); border-bottom: 2px solid var(--accent); }
.skills { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 44px; }
.skill { font-family: 'Space Mono'; font-size: 14px; padding: 8px 15px; border-radius: 999px; border: 1px solid var(--line); color: var(--fg); transition: background .25s, color .25s, transform .25s, border-color .25s; }
.skill:hover { background: var(--accent); color: var(--bg); border-color: var(--accent); transform: translateY(-3px) rotate(-2deg); }
@media (max-width: 720px) { .about-body { grid-template-columns: 1fr; gap: 18px; } }

/* projects — grid motion */
.work { padding: 9vh 0 5vh; }
.work-head { display: flex; justify-content: space-between; padding: 0 7vw 30px; }
.gridmotion { display: flex; flex-direction: column; gap: 18px; }
.gm-row { overflow: hidden; }
.gm-track { display: flex; gap: 18px; width: max-content; padding: 0 9px; will-change: transform; }
.gm-ltr .gm-track { animation: gmltr 46s linear infinite; }
.gm-rtl .gm-track { animation: gmrtl 52s linear infinite; }
@keyframes gmltr { from { transform: translateX(-50%); } to { transform: translateX(0); } }
@keyframes gmrtl { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.gm-row:hover .gm-track { animation-play-state: paused; }
.gm-tile { flex: 0 0 auto; width: min(80vw, 350px); background: var(--surface); border: 1px solid var(--line); border-radius: 18px; padding: 24px 22px; display: flex; flex-direction: column; gap: 10px; transition: transform .35s cubic-bezier(.2,.8,.2,1), border-color .35s, box-shadow .35s; }
.gm-tile:hover { transform: translateY(-6px); border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent), 0 18px 44px rgba(0,0,0,.45); }
.gm-top { display: flex; justify-content: space-between; align-items: center; }
.gm-n { font-family: 'Bricolage Grotesque'; font-weight: 800; font-size: 40px; line-height: 1; color: transparent; -webkit-text-stroke: 1.5px var(--accent); }
.gm-role { font-family: 'Space Mono'; font-size: 11px; text-transform: uppercase; letter-spacing: .08em; background: var(--accent); color: var(--bg); padding: 4px 10px; border-radius: 999px; }
.gm-tile h3 { font-family: 'Bricolage Grotesque'; font-weight: 700; font-size: 24px; letter-spacing: -.02em; margin: 0; color: var(--fg); }
.gm-tile p { font-size: 14px; line-height: 1.5; color: var(--dim); margin: 0; }
.gm-tags { display: flex; flex-wrap: wrap; gap: 7px; margin-top: auto; }
.gm-tags span { font-family: 'Space Mono'; font-size: 11px; border: 1px solid var(--line); border-radius: 999px; padding: 4px 10px; color: var(--fg); }
@media (max-width: 720px) { .work-head .muted { display: none; } }

/* the lab — folders */
.lab { padding: 13vh 7vw; text-align: center; }
.lab-sub { font-family: 'Space Mono'; color: var(--dim); margin: 10px 0 56px; font-size: 14px; }
.lab-row { display: flex; gap: 56px; flex-wrap: wrap; justify-content: center; }
.folder { position: relative; width: 150px; height: 122px; cursor: pointer; outline: none; }
.folder-tab { position: absolute; top: 10px; left: 4px; width: 56px; height: 18px; background: var(--accent); border: 1.5px solid var(--bg); border-bottom: none; border-radius: 7px 12px 0 0; z-index: 1; }
.folder-front { position: absolute; top: 24px; left: 0; right: 0; bottom: 0; background: var(--accent); border: 1.5px solid rgba(0,0,0,.45); border-radius: 4px 12px 12px 12px; box-shadow: 6px 6px 0 rgba(0,0,0,.5); z-index: 2; transition: transform .35s cubic-bezier(.2,.8,.2,1); }
.folder-papers { position: absolute; top: 22px; left: 14px; right: 14px; z-index: 3; display: flex; flex-direction: column; gap: 6px; pointer-events: none; }
.paper { background: var(--surface); border: 1px solid var(--line); border-radius: 4px; font-family: 'Space Mono'; font-size: 10px; padding: 5px 8px; color: var(--fg); text-align: left; opacity: 0; transform: translateY(26px); transition: transform .4s cubic-bezier(.2,.8,.2,1), opacity .3s; transition-delay: calc(var(--pi) * 45ms); }
.folder.open .paper { opacity: 1; transform: translateY(-36px) rotate(calc((var(--pi) - 1) * 5deg)); }
.folder.open .folder-front, .folder:focus-visible .folder-front { transform: translateY(4px) skewX(-3deg); }
.folder-label { position: absolute; bottom: -28px; left: 50%; transform: translateX(-50%); font-family: 'Space Mono'; font-size: 12px; letter-spacing: .04em; color: var(--fg); white-space: nowrap; }
@media (max-width: 720px) { .lab-row { gap: 44px; } }

/* contact */
.contact { padding: 16vh 7vw 0; }
.contact-inner { text-align: center; }
.contact-kick { font-family: 'Space Mono'; text-transform: uppercase; letter-spacing: .16em; color: var(--accent); font-size: 14px; }
.contact-cta { font-family: 'Bricolage Grotesque'; font-weight: 800; letter-spacing: -.03em; font-size: clamp(46px, 11vw, 150px); display: inline-flex; align-items: center; gap: .1em; margin: 10px 0 30px; color: var(--fg); transition: color .3s; }
.contact-cta:hover { color: var(--accent); }
.cta-arrow { color: var(--accent); transition: transform .3s; }
.contact-cta:hover .cta-arrow { transform: translate(6px, -6px); }
.contact-links { display: flex; gap: 26px; justify-content: center; font-family: 'Space Mono'; font-size: 15px; color: var(--fg); }
.contact-links a { padding-bottom: 3px; border-bottom: 1px solid transparent; transition: border-color .3s; }
.contact-links a:hover { border-color: var(--accent); }
.foot { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px; font-family: 'Space Mono'; font-size: 12.5px; color: var(--dim); padding: 80px 0 30px; }

/* reveal */
.reveal { opacity: 0; transform: translateY(40px); transition: opacity .8s cubic-bezier(.2,.8,.2,1), transform .8s cubic-bezier(.2,.8,.2,1); }
.reveal.in { opacity: 1; transform: none; }

:focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; border-radius: 4px; }

@media (prefers-reduced-motion: reduce) {
  .arrow, .marq-track, .ping::after, .gr-blob, .gm-ltr .gm-track, .gm-rtl .gm-track { animation: none !important; }
  .line2 { color: var(--fg); -webkit-text-stroke: 0; }
  .reveal { opacity: 1; transform: none; transition: none; }
}
`;