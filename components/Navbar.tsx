"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";

const navLinks = [
  { href: "#home",     label: "Home"     },
  { href: "#about",    label: "About"    },
  { href: "#projects", label: "Projects" },
  { href: "#blog",     label: "Blog"     },
  { href: "#contact",  label: "Contact"  },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [active,   setActive]     = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const ids = ["contact","blog","projects","about","home"];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1  }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0F0A06]/85 backdrop-blur-md border-b border-[#2E1F0F]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="font-heading font-bold text-xl text-text-primary hover:text-accent-orange transition-colors">
          SK<span className="text-accent-orange">.</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => {
            const id = href.replace("#","");
            return (
              <a
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors relative group ${
                  active === id ? "text-accent-orange" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {label}
                <span className={`absolute -bottom-1 left-0 h-px bg-accent-orange transition-all duration-300 ${
                  active === id ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </a>
            );
          })}
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-accent-orange text-accent-orange text-sm font-medium hover:bg-accent-orange hover:text-white transition-all duration-300"
          >
            <Download size={14} />
            Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-text-primary"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{   opacity: 0, height: 0    }}
            className="md:hidden bg-[#1A1008] border-b border-[#2E1F0F]"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="text-text-secondary hover:text-text-primary transition-colors py-1"
                >
                  {label}
                </a>
              ))}
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-accent-orange text-accent-orange text-sm w-fit"
              >
                <Download size={14} />
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
