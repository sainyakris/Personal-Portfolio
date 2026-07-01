import "./globals.css";

export const metadata = {
  title: "Sainya Krishnamurthy — Agentic AI Engineer",
  description:
    "Final year CSE student building agentic AI systems, LLM orchestration tools, and interfaces that think alongside you.",
  metadataBase: new URL("https://sainyakrishnamurthy.com"),
  openGraph: {
    title: "Sainya Krishnamurthy — Agentic AI Engineer",
    description:
      "Final year CSE student building agentic AI systems, LLM orchestration tools, and interfaces that think alongside you.",
    url: "https://sainyakrishnamurthy.com",
    siteName: "Sainya Krishnamurthy",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sainya Krishnamurthy — Agentic AI Engineer",
    description:
      "Final year CSE student building agentic AI systems, LLM orchestration tools, and interfaces that think alongside you.",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}