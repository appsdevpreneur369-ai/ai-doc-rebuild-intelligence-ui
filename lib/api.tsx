export async function analyzeResume(file: File, jd: string) {
    console.log("Exec analyzeResume", jd.length);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("job_description", jd);

  const response = await fetch("http://localhost:8001/analyze-and-match", {
    method: "POST",
    body: formData,
  });
    console.log("API RESULT:", response);
  if (!response.ok) {
    throw new Error("Failed to analyze resume");
  }

  return response.json();
}