"use client";

export default function FeedbackPanel({ data }: any) {
  const feedback = data.resume_feedback;

  return (
    <div className="bg-gray-800 p-8 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-6">AI Feedback</h2>

      <Section title="Strengths" items={feedback?.strengths} />
      <Section title="Improvement Areas" items={feedback?.improvement_areas} />
      <Section title="JD Alignment Suggestions" items={feedback?.jd_alignment_suggestions} />
      <Section title="ATS Optimization Tips" items={feedback?.ats_optimization_tips} />
      <Section title="Career Growth Advice" items={feedback?.career_growth_advice} />
    </div>
  );
}

function Section({ title, items }: any) {
  if (!items || items.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="font-bold mb-2">{title}</h3>
      <ul className="list-disc ml-6 text-gray-300">
        {items.map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}