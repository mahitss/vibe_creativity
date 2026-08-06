import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  description: "Autonomous operating system for creators powered by a persistent Minds Agent.",
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "OMNIA | Living Memory Timeline",
    template: "%s | OMNIA",
  },
};

import { ShellProvider } from "../features/shell/providers/shell-provider";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geist.variable} bg-slate-950 font-sans text-slate-100 antialiased`}>
        <ShellProvider>{children}</ShellProvider>
      </body>
    </html>
  );
}
