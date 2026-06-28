import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sainya Krishnamurthy — AI Engineer & Creative Technologist",
  description:
    "I build things that think — agentic systems, data-driven tools, and interfaces that feel alive.",
  keywords: [
    "AI Engineer", "Agentic AI", "LangChain", "CrewAI",
    "Next.js", "TypeScript", "Full Stack Developer", "Sainya Krishnamurthy",
  ],
  authors: [{ name: "Sainya Krishnamurthy" }],
  openGraph: {
    title: "Sainya Krishnamurthy — AI Engineer & Creative Technologist",
    description: "I build things that think — agentic systems, data-driven tools, and interfaces that feel alive.",
    type: "website",
    locale: "en_US",
    url: "https://sainyakd.vercel.app",
    siteName: "Sainya Krishnamurthy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sainya Krishnamurthy — AI Engineer & Creative Technologist",
    description: "I build things that think — agentic systems, data-driven tools, and interfaces that feel alive.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#6C63FF] focus:text-white focus:rounded"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
