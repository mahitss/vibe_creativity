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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geist.variable} font-sans antialiased bg-neutral-950 text-neutral-100`}>
        {children}
      </body>
    </html>
  );
}
