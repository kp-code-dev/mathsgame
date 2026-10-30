import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Combinatorics Quest: Cyber Heist | FM Unit 1 Game",
  description: "An interactive, educational computer-science combinatorics adventure game covering all Foundation of Mathematics Unit 1 topics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
