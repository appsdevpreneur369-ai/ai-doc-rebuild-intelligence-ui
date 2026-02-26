"use client";

export default function ScoreCard({ data }: any) {
  const score = data.structured_document.resume_score;
  const jdMatch = data.jd_match;

  return (
    <div className="bg-gray-800 p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Overview</h2>

      <div className="grid grid-cols-2 gap-6">
        <Card title="Resume Score" value={`${score?.overall_score}/100`} />
        <Card title="JD Match" value={`${jdMatch?.match_score}%`} />
        <Card title="Experience Score" value={score?.experience_score} />
        <Card title="Skill Depth" value={score?.skill_depth_score} />
      </div>
    </div>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="bg-gray-700 p-6 rounded-xl">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}