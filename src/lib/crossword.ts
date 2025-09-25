export type CrosswordLayout = {
  grid: (string | null)[][]
  words: {
    across: Array<{
      number: number
      clue: string
      answer: string
    }>
    down: Array<{
      number: number
      clue: string
      answer: string
    }>
  }
}

export function generateCrosswordLayout(words: string[]): CrosswordLayout {
  if (words.length === 0) {
    return { grid: [], words: { across: [], down: [] } }
  }

  // Sort words by length in descending order to place longer words first
  words.sort((a, b) => b.length - a.length)

  // Initialize a grid with a reasonable starting size, adjust dynamically
  const initialSize = words[0]!.length * 2 // A heuristic
  let grid: (string | null)[][] = Array(initialSize)
    .fill(null)
    .map(() => Array(initialSize).fill(null))

  let placedWords: {
    word: string
    row: number
    col: number
    direction: "H" | "V"
  }[] = []

  // Place the first word horizontally in the center
  const firstWord = words[0]!
  const startRow = Math.floor((initialSize - 1) / 2)
  const startCol = Math.floor((initialSize - firstWord.length) / 2)

  for (let i = 0; i < firstWord.length; i++) {
    grid[startRow]![startCol + i]! = firstWord[i]!
  }
  placedWords.push({
    word: firstWord,
    row: startRow,
    col: startCol,
    direction: "H",
  })

  // Try to place the remaining words
  for (let i = 1; i < words.length; i++) {
    const currentWord = words[i]!
    let bestPlacement: {
      row: number
      col: number
      direction: "H" | "V"
      intersections: number
    } | null = null
    let bestGrid: (string | null)[][] | null = null

    // Iterate through all placed words and try to intersect
    for (const placed of placedWords) {
      for (
        let charIndexCurrent = 0;
        charIndexCurrent < currentWord.length;
        charIndexCurrent++
      ) {
        for (
          let charIndexPlaced = 0;
          charIndexPlaced < placed.word.length;
          charIndexPlaced++
        ) {
          if (currentWord[charIndexCurrent] === placed.word[charIndexPlaced]) {
            // Found a potential intersection
            let newGrid: (string | null)[][] = JSON.parse(JSON.stringify(grid)) // Deep copy
            let canPlace = true
            let intersections = 0
            let tempRow = -1
            let tempCol = -1
            let tempDirection: "H" | "V"

            if (placed.direction === "H") {
              // Current word should be vertical
              tempDirection = "V"
              tempRow = placed.row - charIndexCurrent
              tempCol = placed.col + charIndexPlaced

              // Check for bounds and conflicts
              if (
                tempRow < 0 ||
                tempCol < 0 ||
                tempRow + currentWord.length > newGrid.length ||
                tempCol >= newGrid[0]!.length
              ) {
                continue // Out of bounds
              }

              for (let k = 0; k < currentWord.length; k++) {
                const targetChar = newGrid[tempRow + k]![tempCol]
                if (targetChar !== null && targetChar !== currentWord[k]) {
                  canPlace = false
                  break
                }
                if (targetChar === currentWord[k]) {
                  intersections++
                }
              }

              if (canPlace) {
                // Ensure no adjacent letters for the new word, except at intersections
                if (
                  tempRow > 0 &&
                  newGrid[tempRow - 1]![tempCol] !== null &&
                  newGrid[tempRow - 1]![tempCol] !== currentWord[0]
                ) {
                  canPlace = false
                }
                if (
                  tempRow + currentWord.length < newGrid.length &&
                  newGrid[tempRow + currentWord.length]![tempCol] !== null &&
                  newGrid[tempRow + currentWord.length]![tempCol] !==
                    currentWord[currentWord.length - 1]
                ) {
                  canPlace = false
                }
                for (let k = 0; k < currentWord.length; k++) {
                  if (k !== charIndexCurrent) {
                    if (
                      tempCol > 0 &&
                      newGrid[tempRow + k]![tempCol - 1] !== null
                    ) {
                      canPlace = false
                      break
                    }
                    if (
                      tempCol + 1 < newGrid[0]!.length &&
                      newGrid[tempRow + k]![tempCol + 1] !== null
                    ) {
                      canPlace = false
                      break
                    }
                  }
                }
              }

              if (canPlace) {
                for (let k = 0; k < currentWord.length; k++) {
                  newGrid[tempRow + k]![tempCol] = currentWord[k]!
                }
              }
            } else {
              // Current word should be horizontal
              tempDirection = "H"
              tempRow = placed.row + charIndexPlaced
              tempCol = placed.col - charIndexCurrent

              // Check for bounds and conflicts
              if (
                tempRow < 0 ||
                tempCol < 0 ||
                tempRow >= newGrid.length ||
                tempCol + currentWord.length > newGrid[0]!.length
              ) {
                continue // Out of bounds
              }

              for (let k = 0; k < currentWord.length; k++) {
                const targetChar = newGrid[tempRow]![tempCol + k]
                if (targetChar !== null && targetChar !== currentWord[k]) {
                  canPlace = false
                  break
                }
                if (targetChar === currentWord[k]) {
                  intersections++
                }
              }

              if (canPlace) {
                // Ensure no adjacent letters for the new word, except at intersections
                if (
                  tempCol > 0 &&
                  newGrid[tempRow]![tempCol - 1] !== null &&
                  newGrid[tempRow]![tempCol - 1] !== currentWord[0]
                ) {
                  canPlace = false
                }
                if (
                  tempCol + currentWord.length < newGrid[0]!.length &&
                  newGrid[tempRow]![tempCol + currentWord.length] !== null &&
                  newGrid[tempRow]![tempCol + currentWord.length] !==
                    currentWord[currentWord.length - 1]
                ) {
                  canPlace = false
                }
                for (let k = 0; k < currentWord.length; k++) {
                  if (k !== charIndexCurrent) {
                    if (
                      tempRow > 0 &&
                      newGrid[tempRow - 1]![tempCol + k] !== null
                    ) {
                      canPlace = false
                      break
                    }
                    if (
                      tempRow + 1 < newGrid.length &&
                      newGrid[tempRow + 1]![tempCol + k] !== null
                    ) {
                      canPlace = false
                      break
                    }
                  }
                }
              }

              if (canPlace) {
                for (let k = 0; k < currentWord.length; k++) {
                  newGrid[tempRow]![tempCol + k] = currentWord[k]!
                }
              }
            }

            if (
              canPlace &&
              intersections > 0 &&
              (bestPlacement === null ||
                intersections > bestPlacement.intersections)
            ) {
              bestPlacement = {
                row: tempRow,
                col: tempCol,
                direction: tempDirection,
                intersections: intersections,
              }
              bestGrid = newGrid
            }
          }
        }
      }
    }

    if (bestPlacement !== null && bestGrid !== null) {
      grid = bestGrid
      placedWords.push({
        word: currentWord,
        row: bestPlacement.row,
        col: bestPlacement.col,
        direction: bestPlacement.direction,
      })
    }
  }

  // Trim the grid to remove empty rows/columns
  let minRow = initialSize
  let maxRow = -1
  let minCol = initialSize
  let maxCol = -1

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r]!.length; c++) {
      if (grid[r]![c] !== null) {
        minRow = Math.min(minRow, r)
        maxRow = Math.max(maxRow, r)
        minCol = Math.min(minCol, c)
        maxCol = Math.max(maxCol, c)
      }
    }
  }

  const finalGrid: (string | null)[][] = []
  if (minRow <= maxRow && minCol <= maxCol) {
    for (let r = minRow; r <= maxRow; r++) {
      const row: (string | null)[] = []
      for (let c = minCol; c <= maxCol; c++) {
        row.push(grid[r]![c]!)
      }
      finalGrid.push(row)
    }
  }

  return { grid: finalGrid, words: { across: [], down: [] } }
}
