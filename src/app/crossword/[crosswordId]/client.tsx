"use client"

import { Card, CardHeader } from "@/components/ui/card"
import type { getCrossword } from "@/lib/server/crossword"
import type { getCrosswordSession } from "@/lib/server/crossword/session"
import { cn } from "@/lib/utils"

import { useState } from "react"

type Crossword = Awaited<ReturnType<typeof getCrossword>>
type Session = Awaited<ReturnType<typeof getCrosswordSession>>

export function Client({
  crossword,
  session,
}: {
  crossword: Crossword
  session: Session
}) {
  const initialGrid = Array.from({ length: crossword.size.rows }, (_, row) =>
    Array.from({ length: crossword.size.cols }, (_, col) => {
      return {
        row,
        col,
        letter: session.grid.find((c) => c.row === row && c.col === col)
          ?.letter,
      }
    }),
  ).flat()
  const [grid, setGrid] = useState(initialGrid)

  const [activeCell, setActiveCell] = useState<{
    row: number
    col: number
  } | null>(null)

  return (
    <div className="flex gap-8 p-8">
      <div className="flex items-center justify-center">
        <div
          className="grid w-fit h-fit gap-0.5 bg-neutral-100 p-2 rounded-md dark:bg-neutral-900"
          style={{
            gridTemplateColumns: `repeat(${crossword.size.cols}, 1fr)`,
            gridTemplateRows: `repeat(${crossword.size.rows}, 1fr)`,
          }}
          tabIndex={0}
          onKeyDown={(e) => {
            if (!activeCell) return
            const key = e.key
            switch (key) {
              case "ArrowUp":
                e.preventDefault()
                for (let r = activeCell.row - 1; r >= 0; r--) {
                  if (
                    grid.find((c) => c.row === r && c.col === activeCell.col)
                      ?.letter !== undefined
                  ) {
                    setActiveCell({ row: r, col: activeCell.col })
                    break
                  }
                }
                return
              case "ArrowDown":
                e.preventDefault()
                for (let r = activeCell.row + 1; r < crossword.size.rows; r++) {
                  if (
                    grid.find((c) => c.row === r && c.col === activeCell.col)
                      ?.letter !== undefined
                  ) {
                    setActiveCell({ row: r, col: activeCell.col })
                    break
                  }
                }
                return
              case "ArrowLeft":
                e.preventDefault()
                for (let c = activeCell.col - 1; c >= 0; c--) {
                  if (
                    grid.find(
                      (cell) => cell.row === activeCell.row && cell.col === c,
                    )?.letter !== undefined
                  ) {
                    setActiveCell({ row: activeCell.row, col: c })
                    break
                  }
                }
                return
              case "ArrowRight":
                e.preventDefault()
                for (let c = activeCell.col + 1; c < crossword.size.cols; c++) {
                  if (
                    grid.find(
                      (cell) => cell.row === activeCell.row && cell.col === c,
                    )?.letter !== undefined
                  ) {
                    setActiveCell({ row: activeCell.row, col: c })
                    break
                  }
                }
                return
              case "Backspace":
              case "Delete":
                e.preventDefault()
                if (
                  grid.find(
                    (c) => c.row === activeCell.row && c.col === activeCell.col,
                  )?.letter !== undefined
                ) {
                  setGrid((g) =>
                    g.map((cell) =>
                      cell.row === activeCell.row && cell.col === activeCell.col
                        ? { ...cell, letter: null }
                        : cell,
                    ),
                  )
                }
                return
              default:
                if (key.length === 1 && key.match(/^[a-zA-Z]$/)) {
                  e.preventDefault()
                  if (
                    grid.find(
                      (c) =>
                        c.row === activeCell.row && c.col === activeCell.col,
                    )?.letter !== undefined
                  ) {
                    setGrid((g) =>
                      g.map((cell) =>
                        cell.row === activeCell.row &&
                        cell.col === activeCell.col
                          ? { ...cell, letter: key.toUpperCase() }
                          : cell,
                      ),
                    )

                    for (
                      let c = activeCell.col + 1;
                      c < crossword.size.cols;
                      c++
                    ) {
                      if (
                        grid.find(
                          (cell) =>
                            cell.row === activeCell.row && cell.col === c,
                        )?.letter !== undefined
                      ) {
                        setActiveCell({ row: activeCell.row, col: c })
                        return
                      }
                    }

                    for (
                      let r = activeCell.row + 1;
                      r < crossword.size.rows;
                      r++
                    ) {
                      if (
                        grid.find(
                          (cell) =>
                            cell.row === r && cell.col === activeCell.col,
                        )?.letter !== undefined
                      ) {
                        setActiveCell({ row: r, col: activeCell.col })
                        return
                      }
                    }
                  }
                }
            }
          }}
        >
          {grid.map((cell) => (
            <div
              key={`${cell.row}-${cell.col}`}
              className={cn(
                "size-12 bg-neutral-50/50 dark:bg-neutral-950/50 rounded-md relative flex items-center justify-center",
                {
                  "border bg-white dark:bg-black": cell.letter !== undefined,
                  "border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900":
                    activeCell &&
                    cell.col === activeCell.col &&
                    cell.row === activeCell.row,
                },
              )}
              style={{
                gridRow: cell.row + 1,
                gridColumn: cell.col + 1,
              }}
              onClick={
                cell.letter === undefined
                  ? undefined
                  : () => setActiveCell({ row: cell.row, col: cell.col })
              }
            >
              <div className="absolute top-1 left-1 text-xs font-semibold text-neutral-500">
                {
                  crossword.words.find(
                    (w) => w.row === cell.row && w.col === cell.col,
                  )?.number
                }
              </div>
              <div>{cell.letter}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex rounded-xl border divide-y flex-col h-fit">
          <div className="font-bold text-center py-2 px-4 bg-neutral-100 dark:bg-neutral-900">
            Across
          </div>
          {crossword.words
            .filter((w) => w.orientation === "across")
            .map((w) => (
              <div key={w.number} className="px-4 py-2 flex gap-2 items-center">
                <div
                  className={cn(
                    "font-semibold text-xs bg-neutral-200 rounded-md min-h-6 min-w-6 flex items-center justify-center dark:bg-neutral-800",
                    {
                      "bg-emerald-200/50 dark:bg-emerald-800/50 text-emerald-900 dark:text-emerald-300":
                        Array.from({ length: w.word.length }).every((_, i) => {
                          const cell = grid.find(
                            (c) => c.row === w.row && c.col === w.col + i,
                          )
                          return (
                            cell?.letter?.toUpperCase() ===
                            w.word[i]?.toUpperCase()
                          )
                        }),
                    },
                  )}
                >
                  {w.number}
                </div>
                <div
                  className={cn({
                    "line-through": Array.from({ length: w.word.length }).every(
                      (_, i) => {
                        const cell = grid.find(
                          (c) => c.row === w.row && c.col === w.col + i,
                        )
                        return (
                          cell?.letter?.toUpperCase() ===
                          w.word[i]?.toUpperCase()
                        )
                      },
                    ),
                  })}
                >
                  {w.clue}
                </div>
              </div>
            ))}
          <div className="font-bold text-center py-2 px-4 bg-neutral-100 dark:bg-neutral-900">
            Down
          </div>
          {crossword.words
            .filter((w) => w.orientation === "down")
            .map((w) => (
              <div key={w.number} className="px-4 py-2 flex gap-2 items-center">
                <div className="font-semibold text-xs bg-neutral-200 rounded-md min-h-6 min-w-6 flex items-center justify-center dark:bg-neutral-800">
                  {w.number}
                </div>
                <div>{w.clue}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
