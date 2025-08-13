"use client";
import { motion } from "framer-motion";

export default function ChatBubble({ text, fromMe }: { text: string; fromMe?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, borderRadius: 999 }}
      animate={{ opacity: 1, scale: 1, borderRadius: 16 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`max-w-[80%] px-3 py-2 mb-2 ${fromMe ? "ml-auto bg-blossom-500 text-white" : "bg-white/70 ring-1 ring-white/60 backdrop-blur"}`}
    >
      {text}
    </motion.div>
  );
}
