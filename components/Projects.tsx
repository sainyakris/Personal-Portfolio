"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Zap, GitBranch } from "lucide-react";

const projects = [
  {
    title: "Agentic AI Project Manager",
    status: "Live",
    accentColor: "#20B2AA",
    category: "AI / Agentic",
    description:
      "Built an agentic AI prototype that autonomously generates and adapts project workflows. The fun part was getting the LLM to reroute itself when priorities shifted instead of asking a human what to do next.",
    stack: ["Python", "LangChain", "LangGraph", "CrewAI", "LLM APIs"],
    github: "https://github.com/sainyakris",
    metrics: ["40% fewer project delays", "25 hrs/month saved", "Shipped in 8 weeks"],
  },
  {
    title: "Peer to Peer Book Marketplace",
    status: "Live",
    accentColor: "#FF8C00",
    category: "Full Stack",
    description:
      "A backend for a student book marketplace I built with two teammates over a semester. We covered auth, listings, wishlists and collections across 15 plus REST endpoints and got it talking cleanly to a React frontend.",
    stack: ["React", "Vite", "Node.js", "Express", "Supabase"],
    github: "https://github.com/sainyakris",
    metrics: ["15+ REST endpoints", "5 Supabase tables", "3 person team"],
  },
  {
    title: "Personal Portfolio Website",
    status: "In Progress",
    accentColor: "#FF1493",
    category: "In Progress",
    description:
      "The site you are on right now. Five sections, a Three.js hero that reacts to your mouse, scroll animations throughout, and an MDX blog where I write about whatever I am currently obsessing over.",
    stack: ["Next.js 14", "TypeScript", "Three.js", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com/sainyakris",
    metrics: ["Interactive 3D hero", "MDX blog", "Deployed on Vercel"],
  },
];

const filters = ["All", "AI / Agentic", "Full Stack", "In Progress"];

export default function Projects() {
  const [active, setActive] = useState("All");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const filtered = active === "All" ? projects : projects.filter(p => p.category === active);

  return (
    <section id="projects" className="py-28 px-6 bg-bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-mono text-accent-teal text-sm tracking-widest mb-3">02. projects</p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-text-primary mb-6">
            Things I&apos;ve Built
          </h2>

          <div className="flex flex-wrap gap-3">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active === f
                    ? "text-white"
                    : "border border-border text-text-secondary hover:text-text-primary hover:border-accent-orange"
                }`}
                style={active === f ? { background: "linear-gradient(135deg,#FF8C00,#FF1493)" } : {}}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
              className="group relative flex flex-col p-6 rounded-2xl bg-bg-card border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div
                className="absolute top-0 left-6 right-6 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${p.accentColor}, transparent)` }}
              />

              <div className="flex items-start justify-between mb-4">
                <h3
                  className="font-heading font-bold text-xl text-text-primary group-hover:transition-colors duration-200"
                  onMouseEnter={e => (e.currentTarget.style.color = p.accentColor)}
                  onMouseLeave={e => (e.currentTarget.style.color = "")}
                >
                  {p.title}
                </h3>
                <span
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium shrink-0 ml-3 border"
                  style={{
                    color: p.accentColor,
                    borderColor: p.accentColor + "40",
                    background: p.accentColor + "15",
                  }}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${p.status === "In Progress" ? "animate-pulse" : ""}`}
                    style={{ background: p.accentColor }}
                  />
                  {p.status}
                </span>
              </div>

              <p className="text-text-secondary text-sm leading-relaxed mb-5">{p.description}</p>

              <div className="flex flex-col gap-1.5 mb-5">
                {p.metrics.map(m => (
                  <div key={m} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-primary border border-border">
                    <Zap size={11} style={{ color: p.accentColor }} className="shrink-0" />
                    <span className="text-xs font-mono" style={{ color: p.accentColor }}>{m}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {p.stack.map(tech => (
                  <span key={tech} className="px-2.5 py-1 rounded-md text-xs font-mono text-text-secondary bg-bg-primary border border-border">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 mt-auto">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  <GitBranch size={14} />
                  GitHub
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
