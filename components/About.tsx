"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillGroups = [
  {
    label: "AI & Machine Learning",
    color: "orange",
    skills: ["Python", "LangChain", "LangGraph", "CrewAI", "RAG Pipelines", "TensorFlow", "Scikit-learn"],
  },
  {
    label: "Languages",
    color: "teal",
    skills: ["Python", "Java", "C/C++", "SQL"],
  },
  {
    label: "Frontend & Creative",
    color: "pink",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Figma", "p5.js"],
  },
  {
    label: "APIs, Tools & Cloud",
    color: "coral",
    skills: ["Google Maps API", "Google Cloud", "AWS", "REST APIs", "Git", "Supabase", "Vercel"],
  },
];

const colorMap: Record<string, string> = {
  orange: "border-[#FF8C00]/30 text-[#FF8C00]/80 bg-[#FF8C00]/10 hover:bg-[#FF8C00]/20 hover:border-[#FF8C00]",
  pink:   "border-[#FF1493]/30 text-[#FF1493]/80 bg-[#FF1493]/10 hover:bg-[#FF1493]/20 hover:border-[#FF1493]",
  teal:   "border-[#20B2AA]/30 text-[#20B2AA]/80 bg-[#20B2AA]/10 hover:bg-[#20B2AA]/20 hover:border-[#20B2AA]",
  coral:  "border-[#FF6347]/30 text-[#FF6347]/80 bg-[#FF6347]/10 hover:bg-[#FF6347]/20 hover:border-[#FF6347]",
};

function SkillTag({ skill, color, index }: { skill: string; color: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.045, duration: 0.28 }}
      className={`px-3 py-1.5 rounded-lg text-sm font-mono border transition-all duration-200 cursor-default ${colorMap[color]}`}
    >
      {skill}
    </motion.span>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-accent-teal text-sm tracking-widest mb-3">01. about me</p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-text-primary">
            Who I Am
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-5"
          >
            <p className="text-text-secondary text-lg leading-relaxed">
              Final year CSE student at{" "}
              <span className="text-text-primary font-medium">GEU, Dehradun</span> who spends most
              of her time building agentic AI systems and figuring out how to make LLMs actually
              useful in the real world.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              Right now I am deep into{" "}
              <span className="text-text-primary font-medium">generative models</span> and{" "}
              <span className="text-text-primary font-medium">human computer interaction</span>,
              with a side of spatial computing and TouchDesigner because why not.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              When I am not coding I am singing, sketching, or doing fashion illustration. Keeping
              the{" "}
              <em className="not-italic gradient-text font-semibold">creative and technical</em>{" "}
              sides equally fed.
            </p>

            <div className="pt-4 flex flex-wrap gap-3">
              {[
                { dot: "#20B2AA", pulse: true,  text: "Open to internships"   },
                { dot: "#FF8C00", pulse: false, text: "Building in public"    },
                { dot: "#FFDAB9", pulse: false, text: "GCP & AWS Certified"   },
              ].map(({ dot, pulse, text }) => (
                <div key={text} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-card border border-border text-text-secondary text-sm">
                  <span className={`w-2 h-2 rounded-full ${pulse ? "animate-pulse" : ""}`} style={{ background: dot }} />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-8"
          >
            {skillGroups.map((group, gi) => (
              <div key={group.label}>
                <p className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-3">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, si) => (
                    <SkillTag key={skill} skill={skill} color={group.color} index={gi * 7 + si} />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
