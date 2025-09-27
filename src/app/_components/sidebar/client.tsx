"use client"

import { FancyHoverIcon } from "@/components/fancy-hover-button"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { signIn, signOut } from "next-auth/react"
import {
  PiGithubLogo,
  PiGithubLogoDuotone,
  PiSignIn,
  PiSignInDuotone,
  PiSignOut,
  PiSignOutDuotone,
} from "react-icons/pi"

export function SignOutButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="group/fancy-hover-icon">
          <FancyHoverIcon
            hover={<PiSignOutDuotone />}
            nohover={<PiSignOut />}
          />
          Sign Out
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign Out</DialogTitle>
          <DialogDescription>
            Are you sure you want to sign out?
          </DialogDescription>
        </DialogHeader>
        <Button
          variant="default"
          className="group/fancy-hover-icon"
          onClick={() => {
            signOut()
          }}
        >
          <FancyHoverIcon
            hover={<PiSignOutDuotone />}
            nohover={<PiSignOut />}
          />
          Sign Out
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export function SignInButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="group/fancy-hover-icon" variant="outline">
          <FancyHoverIcon hover={<PiSignInDuotone />} nohover={<PiSignIn />} />
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>Sign in to create and play</DialogDescription>
        </DialogHeader>
        <Button
          id="github-signin"
          variant="outline"
          className="group/fancy-hover-icon"
          onClick={() => {
            signIn("github")
          }}
        >
          <FancyHoverIcon
            className="size-5"
            hover={<PiGithubLogoDuotone className="size-5" />}
            nohover={<PiGithubLogo className="size-5" />}
          />
          Sign in using GitHub
        </Button>
      </DialogContent>
    </Dialog>
  )
}
