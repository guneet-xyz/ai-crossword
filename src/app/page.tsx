"use client"

import { Crossword } from "@/components/crossword"
import { generateCrosswordLayout } from "@/lib/crossword"

import { useState } from "react"

export default function HomePage() {
  const [showForm, setShowForm] = useState(true)
  const [theme, setTheme] = useState("")

  if (showForm) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                AI Crossword Generator
              </h1>
              <p className="text-gray-600">
                Enter a theme to generate a custom crossword puzzle
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target as HTMLFormElement)
                const inputTheme = formData.get("theme") as string
                if (inputTheme.trim()) {
                  setTheme(inputTheme.trim())
                  setShowForm(false)
                }
              }}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="theme"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Crossword Theme
                </label>
                <input
                  id="theme"
                  name="theme"
                  type="text"
                  placeholder="e.g., technology, animals, food..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-black"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Generate Crossword
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const words = [
    "algorithm",
    "binary",
    "cloud",
    "cybersecurity",
    "encryption",
    "hardware",
    "processor",
    "software",
    "robotics",
    "server",
  ]
  const layout = generateCrosswordLayout(words)

  return <Crossword layout={layout} />
}
