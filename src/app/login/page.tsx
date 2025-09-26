import { authUser } from "@/lib/auth"

import { Client } from "./client"

import { redirect } from "next/navigation"

export default async function Page() {
  const user = await authUser()
  if (user) redirect("/")

  return <Client />
}
