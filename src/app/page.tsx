// import { generateCrossword } from "@/lib/ai"
import { generateCrosswordLayout } from "@/lib/crossword"
import { cn } from "@/lib/utils"

export default async function HomePage() {
  // const resp = await generateCrossword()
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

  return (
    <div>
      <h1>Crossword Puzzle</h1>
      {JSON.stringify(layout, null, 2)}
      <div style={{ fontFamily: "monospace", lineHeight: "1.2" }}>
        {layout.grid.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <span
                className={cn("size-8 inline-block", {
                  "bg-black": cell === "",
                  "border border-gray-300": cell !== "",
                })}
                key={cellIndex}
              >
                {cell === "" ? "." : cell}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
