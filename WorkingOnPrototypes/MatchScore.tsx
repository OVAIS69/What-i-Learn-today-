"use client";
import { motion } from "framer-motion";

export default function MatchScore({ score }: { score: number }) {
  const petals = new Array(5).fill(null);
  return (
    <div className="relative inline-flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.6, rotate: -10, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="relative h-16 w-16"
      >
        {petals.map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={{ scale: 0.2, rotate: i * 72, opacity: 0 }}
            animate={{ scale: 1, rotate: i * 72, opacity: 1 }}
            transition={{ delay: 0.05 * i, duration: 0.35 }}
          >
            <svg viewBox="0 0 20 24" className="h-full w-full">
              <path className="petal-fill" d="M10 0c2.6 5.2 8 6.8 8 12.2C18 18 14 22 10 24 6 22 2 18 2 12.2 2 6.8 7.4 5.2 10 0z" />
            </svg>
          </motion.div>
        ))}
        <motion.div
          className="absolute inset-1 rounded-full bg-white/60 backdrop-blur-md grid place-items-center text-sm font-semibold text-blossom-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          {score}%
        </motion.div>
      </motion.div>
    </div>
  );
}
