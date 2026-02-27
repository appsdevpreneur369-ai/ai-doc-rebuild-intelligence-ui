"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!file || !jd) return alert("Upload resume & JD");

    setLoading(true);

    // 🔥 CLEAR OLD DATA
    sessionStorage.removeItem("analysisResult");
    sessionStorage.setItem("analysisStatus", "processing");

    // Navigate immediately
    router.push("/dashboard");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("job_description", jd);

      const res = await fetch("http://localhost:8001/analyze-and-match", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("API Failed");

      const result = await res.json();

      sessionStorage.setItem("analysisResult", JSON.stringify(result));
      sessionStorage.setItem("analysisStatus", "completed");

    } catch (err) {
      sessionStorage.setItem("analysisStatus", "error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10
      rounded-3xl p-10 shadow-2xl"
    >
      {/* Upload Section */}
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">
          Upload Resume (PDF)
        </label>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full p-4 rounded-xl bg-white/10
          border border-white/20 text-gray-200
          file:bg-blue-600 file:text-white
          file:px-4 file:py-2 file:rounded-lg
          hover:file:bg-blue-700 transition"
        />
      </div>

      {/* JD Section */}
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">
          Job Description
        </label>

        <textarea
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          placeholder="Paste job description here..."
          className="w-full h-40 p-4 rounded-xl bg-white/10
          border border-white/20 text-gray-200
          focus:ring-2 focus:ring-blue-500
          transition resize-none"
        />
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-4 rounded-xl font-semibold text-lg
        bg-gradient-to-r from-blue-600 to-indigo-600
        hover:from-blue-500 hover:to-indigo-500
        shadow-lg shadow-blue-900/30
        transition-all duration-300
        flex items-center justify-center gap-3"
      >
        {loading ? (
          <>
            <motion.div
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            Analyzing...
          </>
        ) : (
          "🚀 Analyze Resume"
        )}
      </motion.button>
    </motion.div>
  );
}