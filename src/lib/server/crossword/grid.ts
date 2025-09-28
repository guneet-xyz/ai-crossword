import { generateClueForWords, generateWordsFromTheme } from "@/lib/server/ai"

export type CrosswordWords = Array<{
  word: string
  clue: string
  orientation: "across" | "down"
  row: number
  col: number
}>

export async function generateCrossword(
  theme: string,
): Promise<CrosswordWords> {
  const words = await generateWordsFromTheme({ theme, n_words: 10 })
  const clues = await generateClueForWords({ words, theme })

  const crosswordWords = generateCrosswordLayout(words)
    .map((w) => ({
      word: w.word,
      clue: clues.find((c) => c.word === w.word)?.clue,
      orientation: w.orientation,
      row: w.row,
      col: w.col,
    }))
    .filter((w) => w.clue !== undefined) as CrosswordWords

  return crosswordWords
}

export function generateCrosswordLayout(words: string[]): Array<{
  word: string
  orientation: "across" | "down"
  row: number
  col: number
}> {
  const acrossWords = words.slice(0, Math.ceil(words.length / 2))
  const downWords = words.slice(Math.ceil(words.length / 2))

  const maxCol = Math.max(...acrossWords.map((w) => w.length)) - 1

  return [
    ...acrossWords.map((word, index) => ({
      word,
      orientation: "across" as const,
      row: index,
      col: 0,
    })),
    ...downWords.map((word, index) => ({
      word,
      orientation: "down" as const,
      row: 0,
      col: index + maxCol + 2,
    })),
  ]
}
