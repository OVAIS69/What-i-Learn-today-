import "./../styles/globals.css";
import type { Metadata } from "next";
import { PetalBackground } from "@/components/PetalBackground";

export const metadata: Metadata = {
  title: "CherryBlossom — AI Matchmaking",
  description: "A serene, emotionally resonant matchmaking experience.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen bg-blossom-gradient">
        <PetalBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
