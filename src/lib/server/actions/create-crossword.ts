"use server"

import { db } from "@/lib/db"
import { crosswordWords, crosswords } from "@/lib/db/schema"

import { authUser } from "../auth"
import { generateCrossword } from "../crossword/grid"

import { after } from "next/server"

export async function createCrossword({
  theme,
}: {
  theme: string
}): Promise<
  | { status: "success"; crosswordId: string }
  | { status: "error"; title: string; description?: string }
> {
  const user = await authUser()
  if (!user)
    return {
      status: "error",
      title: "Not authenticated",
      description: "You must be logged in to create a crossword",
    }

  let crosswordId: string
  try {
    crosswordId = (
      await db
        .insert(crosswords)
        .values({
          theme,
          generatedByUserId: user.id,
        })
        .returning({ id: crosswords.id })
    )[0]!.id
  } catch (error) {
    console.error(error)
    return {
      status: "error",
      title: "Couldn't create crossword",
      description: "An error occurred while creating the crossword",
    }
  }

  after(async () => {
    const words = await generateCrossword(theme)
    await db.insert(crosswordWords).values(
      words.map((w) => ({
        crosswordId,
        word: w.word,
        orientation: w.orientation,
        row: w.row,
        col: w.col,
        clue: w.clue,
      })),
    )
  })

  return { status: "success", crosswordId }
}
