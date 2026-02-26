"use client";

import UploadForm from "@/components/ui/UploadForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">
        AI Resume Analyzer
      </h1>
      <UploadForm />
    </main>
  );
}