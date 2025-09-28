import { db } from "@/lib/db"
import { crosswordSession, crosswordSessionGrid } from "@/lib/db/schema"

import { getCrossword, isValidCrosswordId } from "."

import { and, eq, or } from "drizzle-orm"

export async function getCrosswordSession({
  crosswordId,
  userId,
}: {
  crosswordId: string
  userId: string
}) {
  if (!(await isValidCrosswordId(crosswordId)))
    throw new Error("Invalid crossword ID")

  const session =
    (
      await db
        .select({
          id: crosswordSession.id,
          createdAt: crosswordSession.createdAt,
        })
        .from(crosswordSession)
        .where(
          and(
            eq(crosswordSession.crosswordId, crosswordId),
            eq(crosswordSession.userId, userId),
          ),
        )
        .limit(1)
    )[0] ??
    (
      await db
        .insert(crosswordSession)
        .values({ userId, crosswordId })
        .returning({
          id: crosswordSession.id,
          createdAt: crosswordSession.createdAt,
        })
    )[0]

  if (!session) throw new Error("Could not create or retrieve session")

  const grid: Array<{ row: number; col: number; letter: string | null }> =
    await db
      .select({
        row: crosswordSessionGrid.row,
        col: crosswordSessionGrid.col,
        letter: crosswordSessionGrid.letter,
      })
      .from(crosswordSessionGrid)
      .where(eq(crosswordSessionGrid.sessionId, session.id))

  const crossword = await getCrossword(crosswordId)
  const cellsToInsert: Array<{ row: number; col: number }> = []
  const cellsToDelete: Array<{ row: number; col: number }> = []

  const expectedGridShape: Array<{ row: number; col: number }> = []

  for (const word of crossword.words) {
    for (let i = 0; i < word.word.length; i++) {
      const row = word.orientation === "down" ? word.row + i : word.row
      const col = word.orientation === "across" ? word.col + i : word.col

      if (expectedGridShape.find((g) => g.row === row && g.col === col))
        continue
      expectedGridShape.push({ row, col })
    }
  }

  for (const cell of expectedGridShape) {
    if (!grid.find((c) => c.row === cell.row && c.col === cell.col)) {
      cellsToInsert.push(cell)
    }
  }

  for (const cell of grid) {
    if (
      !expectedGridShape.find((c) => c.row === cell.row && c.col === cell.col)
    ) {
      cellsToDelete.push({ row: cell.row, col: cell.col })
    }
  }

  if (cellsToInsert.length > 0) {
    await db
      .insert(crosswordSessionGrid)
      .values(
        cellsToInsert.map((c) => ({
          sessionId: session.id,
          row: c.row,
          col: c.col,
          letter: null,
        })),
      )
      .returning({
        row: crosswordSessionGrid.row,
        col: crosswordSessionGrid.col,
        letter: crosswordSessionGrid.letter,
      })
  }

  if (cellsToDelete.length > 0) {
    await db
      .delete(crosswordSessionGrid)
      .where(
        and(
          eq(crosswordSessionGrid.sessionId, session.id),
          or(
            ...cellsToDelete.map((c) =>
              and(
                eq(crosswordSessionGrid.row, c.row),
                eq(crosswordSessionGrid.col, c.col),
              ),
            ),
          ),
        ),
      )
  }

  return { ...session, grid }
}
