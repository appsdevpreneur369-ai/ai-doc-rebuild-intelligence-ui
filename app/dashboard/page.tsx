"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import SkeletonCard from "@/components/ui/SkeletonCard"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import FeedbackPanel from "@/components/ui/FeedbackPanel"
import FeedbackSkeleton from "@/components/ui/FeedbackSkeleton"

export default function Dashboard() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      const status = sessionStorage.getItem("analysisStatus")

      if (status === "completed") {
        const stored = sessionStorage.getItem("analysisResult")
        if (stored) {
          setData(JSON.parse(stored))
          setLoading(false)
          clearInterval(interval)
        }
      }

      if (status === "error") {
        setLoading(false)
        clearInterval(interval)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-10 max-w-6xl mx-auto space-y-14">

      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-semibold"
      >
        Resume Analysis Dashboard
      </motion.h1>

      {loading ? (
        <>
          <div className="grid grid-cols-4 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>

          <FeedbackSkeleton />
          <LoadingSpinner />
        </>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-4 gap-6"
          >
            <RealCard
              title="Resume Score"
              value={data?.structured_document?.resume_score?.overall_score ?? 0}
              suffix="/100"
            />
            <RealCard
              title="JD Match"
              value={data?.jd_match?.match_score ?? 0}
              suffix="%"
            />
            <RealCard
              title="Experience Score"
              value={data?.structured_document?.resume_score?.experience_score ?? 0}
            />
            <RealCard
              title="Skill Depth"
              value={data?.structured_document?.resume_score?.skill_depth_score ?? 0}
            />
          </motion.div>

          <FeedbackPanel data={data} />
        </>
      )}
    </div>
  )
}

function RealCard({ title, value, suffix = "" }: any) {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-md border border-slate-700">
      <p className="text-slate-400 text-sm">{title}</p>
      <h2 className="text-2xl font-semibold mt-2">
        {value}{suffix}
      </h2>
    </div>
  )
}