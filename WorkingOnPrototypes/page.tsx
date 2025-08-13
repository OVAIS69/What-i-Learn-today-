"use client";
import { motion } from "framer-motion";
import ProfileCard from "@/components/ProfileCard";
import ChatBubble from "@/components/ChatBubble";
import GlassCard from "@/components/GlassCard";

const sampleProfiles = [
  {
    name: "Ava", age: 26, city: "Mumbai",
    bio: "Coffee alchemist • Weekend trekker • Indie films",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1600&auto=format&fit=crop",
    score: 92, interests: ["Trekking", "Coffee", "Anime"]
  },
  {
    name: "Rohan", age: 29, city: "Pune",
    bio: "Runner • Product designer • Board games + biryani loyalist",
    image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?q=80&w=1600&auto=format&fit=crop",
    score: 83, interests: ["Running", "Design", "Cooking"]
  },
  {
    name: "Meera", age: 24, city: "Delhi",
    bio: "Book dragon • K-dramas • Trying new recipes",
    image: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?q=80&w=1600&auto=format&fit=crop",
    score: 88, interests: ["Reading", "K-Drama", "Yoga"]
  }
];

export default function Page() {
  return (
    <main className="relative mx-auto max-w-6xl px-4 py-10 md:py-14">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-8"
      >
        <div className="glass px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-blossom-800">CherryBlossom</h1>
            <p className="text-sm md:text-base text-slate-600/90">Find connections that bloom — serene, safe, and emotionally resonant.</p>
          </div>
          <button className="px-4 py-2 rounded-xl bg-blossom-600 text-white shadow-glow hover:scale-[1.02] transition">Get Started</button>
        </div>
      </motion.section>

      {/* Profiles grid */}
      <section className="grid gap-6 md:grid-cols-3">
        {sampleProfiles.map((p) => <ProfileCard key={p.name} p={p} />)}
      </section>

      {/* Chat preview */}
      <section className="mt-10">
        <GlassCard className="p-4">
          <div className="text-sm font-medium text-blossom-900 mb-2">Chat preview</div>
          <ChatBubble text="Hey! Loved that you’re into trekking too." />
          <ChatBubble fromMe text="Same! Sunday treks are my thing — favorite trail?" />
          <ChatBubble text="Sunrise trail at Kanheri. Coffee after?" />
        </GlassCard>
      </section>
    </main>
  );
}
