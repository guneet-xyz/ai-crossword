import { db } from "@/lib/db"
import { crosswordWords, crosswords } from "@/lib/db/schema"

import { asc, count, eq } from "drizzle-orm"

export async function getCrossword(crosswordId: string) {
  const crossword = (
    await db
      .select()
      .from(crosswords)
      .where(eq(crosswords.id, crosswordId))
      .limit(1)
  )[0]!
  const words = (
    await db
      .select()
      .from(crosswordWords)
      .where(eq(crosswordWords.crosswordId, crosswordId))
      .orderBy(asc(crosswordWords.row), asc(crosswordWords.col))
  ).map((w, i) => ({
    ...w,
    number: i + 1,
  }))

  const cols = Math.max(
    ...words.map((w) =>
      w.orientation === "across" ? w.col + w.word.length : w.col + 1,
    ),
  )
  const rows = Math.max(
    ...words.map((w) =>
      w.orientation === "down" ? w.row + w.word.length : w.row + 1,
    ),
  )

  return { ...crossword, words, size: { rows, cols } }
}

export async function isValidCrosswordId(crosswordId: string) {
  const resp = await db
    .select({ count: count() })
    .from(crosswords)
    .where(eq(crosswords.id, crosswordId))
    .limit(1)
  return (resp[0]?.count ?? 0) > 0
}
