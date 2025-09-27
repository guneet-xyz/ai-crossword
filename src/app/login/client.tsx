"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

import { signIn } from "next-auth/react"

export function Client() {
  return (
    <div className="grow flex items-center justify-center">
      <Card>
        <CardHeader className="font-bold text-center">Sign In</CardHeader>
        <CardContent>
          <Button
            onClick={() => {
              signIn("github")
            }}
          >
            Sign in using GitHub
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
