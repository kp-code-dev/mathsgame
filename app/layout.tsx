import type { Metadata } from "next";
import "./globals.css";
import BlueprintBackground from "./components/BlueprintBackground";

export const metadata: Metadata = {
  title: "mathsgame",
  description: "An interactive, educational computer-science mathematics adventure game covering Foundation of Mathematics.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-full flex flex-col bg-[#061426] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black relative">
        <BlueprintBackground />
        <div className="relative z-10 flex flex-col min-h-screen bg-transparent">
          {children}
        </div>
      </body>
    </html>
  );
}
