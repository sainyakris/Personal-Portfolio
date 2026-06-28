"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-72 h-72 rounded-full bg-gradient-to-br from-accent-orange/20 to-accent-pink/20 blur-3xl animate-pulse" />
    </div>
  ),
});

const titles = ["Agentic AI Engineer", "Creative Technologist", "Builder"];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTitleIndex(i => (i + 1) % titles.length), 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-0 w-[480px] h-[480px] bg-accent-orange/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-accent-pink/8 rounded-full blur-[100px]" />
        <div className="absolute top-0 right-1/3 w-[300px] h-[300px] bg-accent-teal/6 rounded-full blur-[90px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center pt-24 pb-12">
        <div className="flex flex-col gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-mono text-accent-teal text-sm tracking-[0.2em]"
          >
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
            className="font-heading font-bold text-5xl md:text-6xl xl:text-7xl text-text-primary leading-[1.1]"
          >
            Sainya<br />
            <span className="gradient-text">Krishnamurthy</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="h-10 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={titleIndex}
                initial={{ y: 32, opacity: 0 }}
                animate={{ y: 0,  opacity: 1 }}
                exit={{   y: -32, opacity: 0 }}
                transition={{ duration: 0.38, ease: "easeInOut" }}
                className="font-heading text-2xl md:text-3xl font-semibold"
                style={{ color: ["#FF8C00","#FF1493","#20B2AA"][titleIndex] }}
              >
                {titles[titleIndex]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.6 }}
            className="text-text-secondary text-lg max-w-md leading-relaxed"
          >
            I build things that think. Agentic systems, data driven tools, and interfaces that actually feel good to use.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ delay: 1.25, duration: 0.5 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <a
              href="#projects"
              className="group flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent-orange/30"
              style={{ background: "linear-gradient(135deg,#FF8C00,#FF1493)" }}
            >
              View My Work
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#blog"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[#2E1F0F] text-text-primary hover:border-accent-teal hover:text-accent-teal transition-all duration-300 font-medium hover:-translate-y-0.5"
            >
              Read My Blog
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="flex gap-6 pt-2"
          >
            {[
              { val: "3",   label: "Projects shipped" },
              { val: "GCP", label: "and AWS certified" },
              { val: "∞",   label: "Curiosity"        },
            ].map(({ val, label }) => (
              <div key={label}>
                <p className="font-heading font-bold text-xl text-accent-orange">{val}</p>
                <p className="text-text-secondary text-xs font-mono">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1   }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="hidden md:block h-[520px]"
          aria-hidden="true"
        >
          <HeroCanvas />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-secondary"
      >
        <span className="text-xs font-mono tracking-widest">scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
