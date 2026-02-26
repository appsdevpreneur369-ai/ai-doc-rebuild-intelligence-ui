"use client";

import { useEffect, useState } from "react";
import ScoreCard from "@/components/ui/ScoreCard";
import FeedbackPanel from "@/components/ui/FeedbackPanel";
import Navbar from "@/components/ui/Navbar";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("analysisResult");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  if (!data) {
    return <div className="p-10 text-white">Loading...</div>;
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-900 text-white p-10">
        <h2 className="text-3xl font-bold mb-8">
          Resume Analysis Dashboard
        </h2>

        <div className="space-y-8">
          <ScoreCard data={data} />
          <FeedbackPanel data={data} />
        </div>
      </main>
    </>
  );
}