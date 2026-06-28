import { Metadata } from "next";
import { notFound } from "next/navigation";
import PostContent from "./PostContent";

interface Post {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  accentColor: string;
  content: string;
}

const posts: Record<string, Post> = {
  "building-first-agentic-ai-system": {
    slug: "building-first-agentic-ai-system",
    title: "What I Learned Building My First Agentic AI System",
    date: "May 28, 2025",
    readTime: "8 min read",
    accentColor: "#FF8C00",
    tags: ["Agentic AI", "LangChain", "CrewAI", "Lessons Learned"],
    content: `
## Why I Started

I had been reading about agentic AI for months before I actually built anything. Papers, Twitter threads, YouTube demos. I was fully in consumption mode. Then one afternoon I just decided to stop watching and start shipping.

The project I picked was an autonomous AI project manager. Something that could take a brief, break it into tasks, hand those tasks to sub-agents, track what was happening, and surface updates without anyone having to babysit it. Ambitious maybe, but that was the point.

Eight weeks later I had something working. It was messy in places and humbling throughout, but it worked.

## What I Built

The architecture is hierarchical. LangChain and LangGraph handle the orchestration and CrewAI handles the agent coordination. At the top sits a Manager Agent that receives a project brief, breaks it into concrete tasks, and hands them off to a Planning Agent, an Execution Agent, and a QA Agent.

Each agent has a role, a backstory, a tool set, and a defined output schema. That last part matters more than I expected.

\`\`\`python
from crewai import Agent, Task, Crew
from langchain_openai import ChatOpenAI

manager = Agent(
    role="Project Manager",
    goal="Break down projects and coordinate agents to deliver on time",
    backstory="Senior PM who has shipped dozens of AI products...",
    llm=ChatOpenAI(model="gpt-4o"),
    verbose=True
)
\`\`\`

## Three Things That Broke

### Agents lie confidently

This was the biggest surprise. Agents will tell you they completed something they never touched. My Execution Agent would submit a status update claiming three tasks were done when the actual output was empty. Yelling at it in the prompt did not help. What helped was adding verification steps that made it structurally harder to fake completion.

### Context bleeds over time

In longer workflows things got weird. Agents started mixing up context from earlier tasks with what they were supposed to be doing right now. Conversation history grew, costs went up, outputs got stranger. I fixed this with rolling summarisation windows and strict context isolation at every handoff point.

### Prompting agents is not the same as prompting a model

This took me longer to understand than I'd like to admit. With a regular prompt you are asking for output. With an agent you are writing a personality contract. The role, goal, backstory and expected output format all shape how the agent behaves across a whole workflow. Vague definitions produce agents that drift. Specific grounded ones actually stay on task.

## The Thing That Changed Everything

Halfway through I realised I had been focused on the wrong problem. I kept trying to make each agent smarter and more autonomous. But the actual bottleneck was handoffs. Getting clean structured state from one agent to the next without anything getting lost or distorted.

Once I started treating handoffs like typed function interfaces with explicit input schemas, output validation and proper error propagation, the whole system became more predictable. That is also where the measurable improvement came from. Forty percent fewer delays and twenty five hours a month saved in manual coordination.

## What is Next

I want to add memory so the system can learn from past project runs and get better over time. I also want to build a simple interface so people who are not comfortable with code can actually use it. Working on both. Building in public on GitHub if you want to follow along.
    `,
  },
  "llm-orchestration-patterns": {
    slug: "llm-orchestration-patterns",
    title: "Five LLM Orchestration Patterns Every AI Engineer Should Know",
    date: "April 12, 2025",
    readTime: "6 min read",
    accentColor: "#20B2AA",
    tags: ["LLM", "Architecture", "Python"],
    content: `
## The Problem With Scaling Up

Single prompt, single model, one response. That is fine for simple things. But once you start building something real you quickly run into situations where one model call is not enough. You need to coordinate multiple calls, route between different capabilities, handle long documents that do not fit in context, and do all of this reliably.

That is where orchestration patterns come in. Here are five I keep reaching for.

## 1. The Router Pattern

A small fast model sits at the front and decides where to send each request. It does not need to be your best model. It just needs to be good at classifying intent quickly.

**Best for:** Products with genuinely different use cases that would fight each other in a single shared prompt. Customer support, code generation and search all need very different system prompts and it shows when you try to combine them.

## 2. The Critic Loop

Generate output with one agent then immediately hand it to a second agent whose only job is to find problems with it. Loop until quality is good enough or you hit your iteration limit.

**Best for:** Anything where first draft quality is unpredictable. Writing, code review, structured data extraction. The critic does not need to be expensive but it needs a specific focused prompt.

## 3. The Map Reduce Pattern

Split a big document or task into chunks, process each chunk in parallel, then aggregate everything at the end. Exactly like the distributed computing pattern but with LLM calls instead of compute jobs.

**Best for:** Long document analysis, research across multiple sources, reviewing a large codebase. Parallelism makes this dramatically faster than sequential processing.

## 4. The Plan Then Execute Pattern

Before doing anything, generate a full plan. Only start executing once the plan is complete and validated. Progress becomes auditable and mid task corrections are much rarer.

**Best for:** Complex multi step tasks where a mistake in step two ruins everything that comes after. The planning step is cheap compared to the cost of backtracking.

## 5. The Tool First Agent

Give your agents a small curated set of tools with strict typed output schemas. Treat tools like function interfaces rather than suggestions. The agent should not have the option to just freestyle a response when a tool call is expected.

**Best for:** Production systems. Any time reliability matters more than flexibility this is the pattern to reach for.

---

None of these are magic. Each one trades off cost against latency against predictability in different ways. The right move is almost always to start with the simplest pattern that solves your actual problem and only add complexity when you genuinely need it.
    `,
  },
};

export async function generateStaticParams() {
  return Object.keys(posts).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return {};
  return {
    title: `${post.title} — Sainya Krishnamurthy`,
    description: post.content.slice(0, 160).replace(/[#*`\n]/g, "").trim(),
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  const allSlugs = Object.keys(posts);
  const idx = allSlugs.indexOf(slug);
  const prevPost = idx > 0 ? posts[allSlugs[idx - 1]] : null;
  const nextPost = idx < allSlugs.length - 1 ? posts[allSlugs[idx + 1]] : null;

  return <PostContent post={post} prevPost={prevPost} nextPost={nextPost} />;
}
