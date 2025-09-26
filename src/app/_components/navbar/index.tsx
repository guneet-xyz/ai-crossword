import { authUser } from "@/lib/server/auth"

import { ThemeToggle } from "./client"

import Image from "next/image"

export async function Navbar() {
  const user = await authUser()

  return (
    <nav className="flex items-center gap-4 p-4">
      <h1 className="font-semi text-lg">Crossword</h1>
      <div className="grow" />
      {user ? (
        <div className="flex items-center border rounded-md px-2 py-1 gap-2">
          <Image
            src={user.image ?? ""}
            alt="User Avatar"
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="">{user.name}</span>
        </div>
      ) : null}
      <ThemeToggle />
    </nav>
  )
}
