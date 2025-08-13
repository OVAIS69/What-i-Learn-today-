"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import MatchScore from "@/components/MatchScore";
import GlassCard from "@/components/GlassCard";

type Profile = {
  name: string; age: number; city: string; bio: string; image: string; score: number; interests: string[];
};

export default function ProfileCard({ p }: { p: Profile }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sy = useSpring(ry, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(sy, [ -20, 20 ], [ 8, -8 ]);
  const rotateY = useTransform(sx, [ -20, 20 ], [ -8, 8 ]);

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 40 - 20;
    const py = (y / rect.height) * 40 - 20;
    rx.set(px); ry.set(py);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY }}
      className="transform-gpu [perspective:1000px]"
    >
      <GlassCard className="overflow-hidden p-3 md:p-4">
        <div className="relative h-64 w-full rounded-xl overflow-hidden">
          <Image src={p.image} alt={p.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div className="text-white">
              <div className="text-xl font-semibold">{p.name} • {p.age}</div>
              <div className="text-xs opacity-80">{p.city}</div>
            </div>
            <MatchScore score={p.score} />
          </div>
        </div>
        <div className="p-3">
          <p className="text-sm text-slate-700/90">{p.bio}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {p.interests.map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs rounded-full bg-white/50 ring-1 ring-white/40">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <button className="px-4 py-2 rounded-xl bg-blossom-600 text-white shadow-glow hover:scale-[1.02] transition">
              Like
            </button>
            <button className="px-4 py-2 rounded-xl bg-white/70 ring-1 ring-white/60 backdrop-blur hover:scale-[1.02] transition">
              Pass
            </button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
