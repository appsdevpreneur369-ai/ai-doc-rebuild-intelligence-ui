"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle Theme"
      className="p-2 rounded-md hover:bg-white/10 transition"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
