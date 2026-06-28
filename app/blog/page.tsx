import { Metadata } from "next";
import BlogList from "./BlogList";

export const metadata: Metadata = {
  title: "Blog — Sainya Krishnamurthy",
  description: "Writing on agentic AI, LLM engineering, and building real-world AI systems.",
};

export default function BlogPage() {
  return <BlogList />;
}
