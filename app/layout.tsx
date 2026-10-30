import type { Metadata } from "next";
import "./globals.css";
import BlueprintBackground from "./components/BlueprintBackground";
import { ThemeProvider } from "./components/ThemeProvider";

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
    <html lang="en" className="h-full antialiased dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-full flex flex-col font-sans selection:bg-cyan-500 selection:text-black relative">
        <ThemeProvider>
          <BlueprintBackground />
          <div className="relative z-10 flex flex-col min-h-screen bg-transparent">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
