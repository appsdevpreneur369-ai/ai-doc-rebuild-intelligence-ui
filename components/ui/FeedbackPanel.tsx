"use client"

import { motion } from "framer-motion"

export default function FeedbackPanel({ data }: any) {
  const feedback = data?.resume_feedback
  if (!feedback) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-700 space-y-10"
    >
      <h2 className="text-2xl font-semibold">
        AI Feedback & Insights
      </h2>

      <Section title="Strengths" items={feedback.strengths} />
      <Section title="Improvement Areas" items={feedback.improvement_areas} />
      <Section title="JD Alignment Suggestions" items={feedback.jd_alignment_suggestions} />
      <Section title="ATS Optimization Tips" items={feedback.ats_optimization_tips} />
      <Section title="Career Growth Advice" items={feedback.career_growth_advice} />
    </motion.div>
  )
}

function Section({ title, items }: any) {
  if (!Array.isArray(items) || items.length === 0) return null

  return (
    <div>
      <h3 className="text-lg font-semibold text-indigo-400 mb-4">
        {title}
      </h3>

      <ul className="space-y-3 text-gray-300">
        {items.map((item: string, index: number) => (
          <li key={index} className="flex gap-3">
            <span className="text-indigo-500 mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}