"use client"

import { type CrosswordLayout } from "@/lib/crossword"
import { cn } from "@/lib/utils"

import { useState } from "react"

export function Crossword({ layout }: { layout: CrosswordLayout }) {
  const rows = layout.grid.length
  const cols = layout.grid[0]!.length
  function isValidCell(row: number, col: number) {
    return (
      row >= 0 &&
      row < rows &&
      col >= 0 &&
      col < cols &&
      layout.grid[row]![col] !== null
    )
  }

  let r = 0
  let c = 0
  for (let i = 0; i < layout.grid.length; i++) {
    for (let j = 0; j < layout.grid[i]!.length; j++) {
      if (isValidCell(i, j)) {
        r = i
        c = j
        break
      }
    }
    if (r !== 0 || c !== 0) break
  }

  const [activeCell, setActiveCell] = useState<{
    row: number
    col: number
  }>({ row: r, col: c })

  return (
    <div className="flex grow items-center justify-center">
      <div
        className="font-mono flex flex-col gap-0.5 bg-neutral-800 p-4 rounded-xl"
        autoFocus
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp") {
            e.preventDefault()
            for (let i = activeCell.row - 1; i >= 0; i--) {
              if (isValidCell(i, activeCell.col)) {
                setActiveCell({ row: i, col: activeCell.col })
                break
              }
            }
          } else if (e.key === "ArrowDown") {
            e.preventDefault()
            for (let i = activeCell.row + 1; i < rows; i++) {
              if (isValidCell(i, activeCell.col)) {
                setActiveCell({ row: i, col: activeCell.col })
                break
              }
            }
          } else if (e.key === "ArrowLeft") {
            e.preventDefault()
            for (let j = activeCell.col - 1; j >= 0; j--) {
              if (isValidCell(activeCell.row, j)) {
                setActiveCell({ row: activeCell.row, col: j })
                break
              }
            }
          } else if (e.key === "ArrowRight") {
            e.preventDefault()
            for (let j = activeCell.col + 1; j < cols; j++) {
              if (isValidCell(activeCell.row, j)) {
                setActiveCell({ row: activeCell.row, col: j })
                break
              }
            }
          }
        }}
      >
        {layout.grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-row gap-0.5">
            {row.map((cell, cellIndex) => (
              <span
                onClick={() => {
                  if (isValidCell(rowIndex, cellIndex)) {
                    setActiveCell({ row: rowIndex, col: cellIndex })
                  }
                }}
                className={cn(
                  "size-10 flex items-center justify-center transition-colors duration-75",
                  {
                    "bg-white rounded-sm uppercase border-neutral-400 border-2 hover:bg-indigo-200 cursor-pointer hover:border-indigo-400":
                      cell !== null,
                    "bg-indigo-500 rounded-sm border-2 border-indigo-800 text-indigo-100 shadow-indigo-500":
                      activeCell.row === rowIndex &&
                      activeCell.col === cellIndex,
                  },
                )}
                key={cellIndex}
              >
                {cell}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div>
        <div>
          {layout.words.across.map((word) => (
            <div key={word.number}>{word.answer}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
