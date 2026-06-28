"use client";

import Link from "next/link";
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react";

const posts = [
  {
    slug: "building-first-agentic-ai-system",
    title: "What I Learned Building My First Agentic AI System",
    date: "May 28, 2025",
    readTime: "8 min read",
    excerpt: "Multi agent systems are harder than they look and honestly more fun than I expected. Here is what broke, what surprised me, and what I would do differently.",
    tags: ["Agentic AI", "LangChain", "CrewAI"],
    accentColor: "#FF8C00",
  },
  {
    slug: "llm-orchestration-patterns",
    title: "Five LLM Orchestration Patterns Every AI Engineer Should Know",
    date: "April 12, 2025",
    readTime: "6 min read",
    excerpt: "After trying out a bunch of multi agent architectures I kept coming back to five patterns. Here they are with honest notes on when to use them and when to skip them.",
    tags: ["LLM", "Architecture", "Python"],
    accentColor: "#20B2AA",
  },
];

export default function BlogList() {
  return (
    <main className="min-h-screen px-6 pt-28 pb-20" style={{ background: "#0F0A06" }}>
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[#B89880] hover:text-[#FFF5EC] transition-colors text-sm mb-12">
          <ArrowLeft size={14} />Back home
        </Link>

        <p className="font-mono text-[#20B2AA] text-sm tracking-widest mb-3">writing</p>
        <h1 className="font-heading font-bold text-5xl text-[#FFF5EC] mb-4">From the Lab</h1>
        <p className="text-[#B89880] text-lg mb-14 leading-relaxed">
          Things I am figuring out, stuff that broke, and patterns worth writing down.
        </p>

        <div className="space-y-6">
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <article
                className="relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl overflow-hidden"
                style={{ background: "#1F1409", borderColor: "#2E1F0F" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = post.accentColor + "50")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "#2E1F0F")}
              >
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: post.accentColor }} />

                <div className="flex items-center gap-4 text-xs text-[#B89880] font-mono mb-3">
                  <span className="flex items-center gap-1.5"><Calendar size={11} />{post.date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={11} />{post.readTime}</span>
                </div>

                <h2 className="font-heading font-bold text-2xl text-[#FFF5EC] mb-3 transition-colors duration-200 group-hover:opacity-90">
                  {post.title}
                </h2>
                <p className="text-[#B89880] leading-relaxed mb-5">{post.excerpt}</p>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono border"
                      style={{ color: post.accentColor, borderColor: post.accentColor + "40", background: post.accentColor + "12" }}>
                      <Tag size={9} />{tag}
                    </span>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
