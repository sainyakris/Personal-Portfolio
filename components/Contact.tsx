"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Download, ArrowUpRight, ExternalLink } from "lucide-react";

const links = [
  {
    icon: Mail,
    label: "Email",
    value: "sainyakd@gmail.com",
    href: "mailto:sainyakd@gmail.com",
    color: "#FF8C00",
  },
  {
    icon: ExternalLink,
    label: "GitHub",
    value: "github.com/sainyakris",
    href: "https://github.com/sainyakris",
    color: "#FF1493",
  },
  {
    icon: ExternalLink,
    label: "LinkedIn",
    value: "linkedin.com/in/sainyakd",
    href: "https://linkedin.com/in/sainyakd",
    color: "#20B2AA",
  },
  {
    icon: ExternalLink,
    label: "Google Cloud",
    value: "Credly badge",
    href: "https://credly.com/users/sainya-krishnamurthy",
    color: "#FF6347",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-28 px-6 bg-bg-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-orange/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-accent-teal text-sm tracking-widest mb-6">04. contact</p>
          <h2 className="font-heading font-bold text-5xl md:text-6xl text-text-primary mb-5">
            Let&apos;s Build{" "}
            <span className="gradient-text">Something.</span>
          </h2>
          <p className="text-text-secondary text-xl mb-14 max-w-lg mx-auto leading-relaxed">
            If you have an internship, a collab, or just want to talk about something interesting I am always up for it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-bg-card border border-border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              onMouseEnter={e => (e.currentTarget.style.borderColor = link.color + "60")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "")}
            >
              <div
                className="p-3 rounded-xl transition-all duration-200"
                style={{ background: link.color + "18", color: link.color }}
              >
                <link.icon size={18} />
              </div>
              <div>
                <p className="text-xs font-mono text-text-secondary mb-1">{link.label}</p>
                <p className="text-text-primary text-xs font-medium break-all">{link.value}</p>
              </div>
              <ArrowUpRight size={13} className="text-text-secondary group-hover:text-text-primary transition-colors" />
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent-orange/30"
            style={{ background: "linear-gradient(135deg,#FF8C00,#FF1493)" }}
          >
            <Download size={16} />
            Download Resume
          </a>
          <a
            href="https://shorturl.at/V4rXr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-text-secondary hover:border-accent-coral hover:text-accent-coral transition-all duration-300 font-medium hover:-translate-y-0.5"
          >
            <ExternalLink size={16} />
            AWS Badge
          </a>
        </motion.div>
      </div>

      <div className="mt-24 text-center">
        <p className="text-text-secondary text-sm font-mono">
          Designed and built by Sainya Krishnamurthy &nbsp;·&nbsp; Bangalore, India
        </p>
      </div>
    </section>
  );
}
