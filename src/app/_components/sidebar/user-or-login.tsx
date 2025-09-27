import { Button } from "@/components/ui/button"
import { type User, authUser } from "@/lib/server/auth"

import { SignInButton, SignOutButton } from "./client"

import Image from "next/image"

export async function UserOrLogin() {
  const user = await authUser()
  if (!user) return <SignInButton />

  return <UserSection user={user} />
}

function UserSection({ user }: { user: User }) {
  return (
    <>
      <Button variant="ghost" className="font-normal">
        <Image
          src={user.image ?? "/default-avatar.png"}
          alt="User Avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
        {user.name}
      </Button>
      <SignOutButton />
    </>
  )
}
