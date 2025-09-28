import { authUser } from "@/lib/server/auth"
import { getCrossword } from "@/lib/server/crossword"
import { getCrosswordSession } from "@/lib/server/crossword/session"

import { Client } from "./client"

import { notFound, redirect } from "next/navigation"
import z from "zod"

export default async function Page({
  params,
}: {
  params: Promise<{ crosswordId: string }>
}) {
  const { crosswordId } = await params
  const { success } = z.string().uuid().safeParse(crosswordId)
  if (!success) notFound()

  const user = await authUser()
  if (!user) redirect("/")

  const session = await getCrosswordSession({ crosswordId, userId: user.id })
  const crossword = await getCrossword(crosswordId)
  console.log({ session, crossword })

  if (!session) notFound()

  return (
    <div className="flex flex-col py-2">
      <div className="text-xl font-bold text-center">{crossword.theme}</div>
      <div className="text-center text-neutral-600 dark:text-neutral-400">
        By {crossword.generatedByUserId}
      </div>
      <Client crossword={crossword} session={session} />
    </div>
  )
}
