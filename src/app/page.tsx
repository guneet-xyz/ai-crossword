import { generateCrosswordLayout } from "@/lib/crossword"
import { cn } from "@/lib/utils"

export default async function HomePage() {
  return <Crossword />
}

function Crossword() {
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
    <div className="flex grow items-center justify-center">
      <div className="font-mono flex flex-col gap-0.5 bg-gray-800 p-4 rounded-xl">
        {layout.grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-row gap-0.5">
            {row.map((cell, cellIndex) => (
              <span
                className={cn("size-8 flex items-center justify-center", {
                  "bg-white border rounded-xs uppercase`": cell !== null,
                })}
                key={cellIndex}
              >
                {cell}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
