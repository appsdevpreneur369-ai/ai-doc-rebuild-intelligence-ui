"use client"

import { motion } from "framer-motion"

export default function SkeletonCard() {
  return (
    <div className="relative overflow-hidden bg-slate-800 rounded-2xl p-6 h-28">
      {/* Shimmer Layer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-700 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
      />

      <div className="space-y-3 relative z-10">
        <div className="h-4 w-24 bg-slate-700 rounded"></div>
        <div className="h-6 w-16 bg-slate-700 rounded"></div>
      </div>
    </div>
  )
}