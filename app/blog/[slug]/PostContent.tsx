"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from "lucide-react";

interface Post {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  accentColor: string;
  content: string;
}

function renderMarkdown(content: string, accentColor: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactElement[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="font-heading font-bold text-3xl mt-12 mb-5" style={{ color: "#FFF5EC" }}>
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="font-heading font-semibold text-xl mt-8 mb-3" style={{ color: accentColor }}>
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={i} className="rounded-xl p-5 overflow-x-auto my-6 border" style={{ background: "#1F1409", borderColor: "#2E1F0F" }}>
          <code className="font-mono text-sm" style={{ color: accentColor }}>
            {codeLines.join("\n")}
          </code>
        </pre>
      );
    } else if (line.startsWith("**") && line.endsWith("**") && !line.slice(2,-2).includes("**")) {
      elements.push(
        <p key={i} className="font-semibold mt-5 mb-2" style={{ color: "#FFF5EC" }}>
          {line.slice(2, -2)}
        </p>
      );
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={i} className="list-disc list-inside space-y-1.5 my-4" style={{ color: "#B89880" }}>
          {items.map((item, j) => <li key={j}>{item}</li>)}
        </ul>
      );
      continue;
    } else if (line.startsWith("---")) {
      elements.push(<hr key={i} className="my-10" style={{ borderColor: "#2E1F0F" }} />);
    } else if (line.trim() !== "") {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      elements.push(
        <p key={i} className="leading-relaxed my-3" style={{ color: "#B89880" }}>
          {parts.map((part, j) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={j} style={{ color: "#FFF5EC", fontWeight: 600 }}>{part.slice(2,-2)}</strong>
            ) : part
          )}
        </p>
      );
    }
    i++;
  }
  return elements;
}

export default function PostContent({ post, prevPost, nextPost }: {
  post: Post;
  prevPost: Post | null;
  nextPost: Post | null;
}) {
  return (
    <main className="min-h-screen px-6 pt-28 pb-20" style={{ background: "#0F0A06" }}>
      <div className="max-w-2xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-[#B89880] hover:text-[#FFF5EC] transition-colors text-sm mb-12">
          <ArrowLeft size={14} />All posts
        </Link>

        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono border"
                style={{ color: post.accentColor, borderColor: post.accentColor + "40", background: post.accentColor + "12" }}>
                <Tag size={9} />{tag}
              </span>
            ))}
          </div>
          <div className="w-12 h-1 rounded-full mb-5" style={{ background: post.accentColor }} />
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-5 leading-tight" style={{ color: "#FFF5EC" }}>
            {post.title}
          </h1>
          <div className="flex items-center gap-5 text-sm font-mono" style={{ color: "#B89880" }}>
            <span className="flex items-center gap-1.5"><Calendar size={12} />{post.date}</span>
            <span className="flex items-center gap-1.5"><Clock size={12} />{post.readTime}</span>
          </div>
        </header>

        <hr className="mb-12" style={{ borderColor: "#2E1F0F" }} />
        <article>{renderMarkdown(post.content, post.accentColor)}</article>
        <hr className="mt-14 mb-10" style={{ borderColor: "#2E1F0F" }} />

        <div className="flex items-center gap-5 mb-14">
          <span className="text-sm font-mono" style={{ color: "#B89880" }}>Share:</span>
          {[
            { label: "Twitter / X", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://sainyakd.vercel.app/blog/${post.slug}`)}` },
            { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://sainyakd.vercel.app/blog/${post.slug}`)}` },
          ].map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm transition-colors"
              style={{ color: "#B89880" }}
              onMouseEnter={e => (e.currentTarget.style.color = post.accentColor)}
              onMouseLeave={e => (e.currentTarget.style.color = "#B89880")}
            >
              <Share2 size={14} />{label}
            </a>
          ))}
        </div>

        {(prevPost || nextPost) && (
          <div className="grid grid-cols-2 gap-4">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="p-4 rounded-xl border transition-all hover:-translate-y-0.5"
                style={{ borderColor: "#2E1F0F" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = prevPost.accentColor + "60")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "#2E1F0F")}
              >
                <p className="text-xs font-mono mb-2" style={{ color: "#B89880" }}>← Previous</p>
                <p className="text-sm font-medium" style={{ color: "#FFF5EC" }}>{prevPost.title}</p>
              </Link>
            ) : <div />}
            {nextPost && (
              <Link href={`/blog/${nextPost.slug}`} className="p-4 rounded-xl border transition-all hover:-translate-y-0.5 text-right"
                style={{ borderColor: "#2E1F0F" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = nextPost.accentColor + "60")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "#2E1F0F")}
              >
                <p className="text-xs font-mono mb-2" style={{ color: "#B89880" }}>Next →</p>
                <p className="text-sm font-medium" style={{ color: "#FFF5EC" }}>{nextPost.title}</p>
              </Link>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
