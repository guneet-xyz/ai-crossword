import { Crossword } from "@/components/crossword"
import { generateCrosswordLayout } from "@/lib/crossword"

export default async function HomePage() {
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
