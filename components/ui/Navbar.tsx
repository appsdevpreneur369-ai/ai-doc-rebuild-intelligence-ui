"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleReset = () => {
    sessionStorage.removeItem("analysisResult");
    router.push("/");
  };

  return (
    <div className="w-full bg-gray-800 p-4 flex justify-between items-center shadow-md">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        AI Resume Analyzer
      </h1>

      <button
        onClick={handleReset}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm"
      >
        Analyze Another Resume
      </button>
    </div>
  );
}