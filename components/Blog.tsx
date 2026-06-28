"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";

const posts = [
  {
    slug: "building-first-agentic-ai-system",
    title: "What I Learned Building My First Agentic AI System",
    date: "May 28, 2025",
    readTime: "8 min read",
    excerpt:
      "Multi agent systems are harder than they look and honestly more fun than I expected. Here is what broke, what surprised me, and what I would do differently.",
    tags: ["Agentic AI", "LangChain", "CrewAI"],
    accentColor: "#FF8C00",
  },
  {
    slug: "llm-orchestration-patterns",
    title: "Five LLM Orchestration Patterns Every AI Engineer Should Know",
    date: "April 12, 2025",
    readTime: "6 min read",
    excerpt:
      "After trying out a bunch of multi agent architectures I kept coming back to five patterns. Here they are with honest notes on when to use them and when to skip them.",
    tags: ["LLM", "Architecture", "Python"],
    accentColor: "#20B2AA",
  },
];

export default function Blog() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="blog" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-14 flex-wrap gap-4"
        >
          <div>
            <p className="font-mono text-accent-teal text-sm tracking-widest mb-3">03. writing</p>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-text-primary">
              From the Lab
            </h2>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-accent-orange font-medium hover:gap-3 transition-all duration-200 group"
          >
            View all posts
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 + 0.2, duration: 0.5 }}
            >
              <Link href={`/blog/${post.slug}`} className="block group h-full">
                <div className="relative h-full flex flex-col p-6 rounded-2xl bg-bg-card border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden">
                  <div
                    className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                    style={{ background: post.accentColor }}
                  />

                  <div className="flex items-center gap-4 text-xs text-text-secondary font-mono mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={11} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={11} />
                      {post.readTime}
                    </span>
                  </div>

                  <h3
                    className="font-heading font-bold text-xl text-text-primary mb-3 transition-colors duration-200"
                    onMouseEnter={e => (e.currentTarget.style.color = post.accentColor)}
                    onMouseLeave={e => (e.currentTarget.style.color = "")}
                  >
                    {post.title}
                  </h3>

                  <p className="text-text-secondary text-sm leading-relaxed mb-5 flex-grow">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono border"
                        style={{
                          color: post.accentColor,
                          borderColor: post.accentColor + "40",
                          background: post.accentColor + "12",
                        }}
                      >
                        <Tag size={9} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
