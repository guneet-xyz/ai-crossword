"use client"

import { useState } from "react"

export default function HomePage() {
  const [theme, setTheme] = useState("")
  const [showForm, setShowForm] = useState(true)

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full mx-4">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              AI Crossword Generator
            </h1>
            <p>World's most over engineered crossword website.</p>
            <p className="text-gray-600 mt-4">
              We'll generate a crossword from the theme you provide
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
