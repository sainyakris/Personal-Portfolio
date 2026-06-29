import "./globals.css";

export const metadata = {
  title: "Sainya Krishnamurthy — Creative Front-End",
  description:
    "CS undergrad ’27 building playful, performant things for the web.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}