"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { analyzeResume } from "@/lib/api";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a PDF resume.");
      return;
    }

    if (!jd.trim()) {
      alert("Please enter the Job Description.");
      return;
    }

    setLoading(true);

    try {
      const result = await analyzeResume(file, jd);

      sessionStorage.setItem("analysisResult", JSON.stringify(result));
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Error analyzing resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-2xl w-full max-w-2xl shadow-lg">

      {/* File Upload */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">
          Upload Resume (PDF)
        </label>

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
          className="w-full bg-gray-700 p-2 rounded"
        />
      </div>

      {/* Job Description */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">
          Job Description
        </label>

        <textarea
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          rows={8}
          placeholder="Paste the job description here..."
          className="w-full bg-gray-700 p-3 rounded resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded font-semibold"
      >
        {loading ? "Analyzing Resume..." : "Analyze Resume"}
      </button>
    </div>
  );
}