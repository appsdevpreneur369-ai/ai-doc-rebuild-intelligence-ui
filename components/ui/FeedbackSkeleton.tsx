"use client"

import { motion } from "framer-motion"

export default function FeedbackSkeleton() {
  return (
    <div className="relative bg-slate-800 rounded-2xl p-8 shadow-md border border-slate-700 overflow-hidden">

      {/* Shimmer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-700 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      />

      <div className="relative z-10 space-y-6">
        <div className="h-6 w-64 bg-slate-700 rounded" />

        <div className="space-y-3">
          <div className="h-4 w-full bg-slate-700 rounded" />
          <div className="h-4 w-5/6 bg-slate-700 rounded" />
          <div className="h-4 w-3/4 bg-slate-700 rounded" />
        </div>

        <div className="space-y-3">
          <div className="h-4 w-full bg-slate-700 rounded" />
          <div className="h-4 w-4/6 bg-slate-700 rounded" />
        </div>
      </div>
    </div>
  )
}