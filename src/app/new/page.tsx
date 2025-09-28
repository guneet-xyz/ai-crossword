"use client"

import { FancyHoverIcon } from "@/components/fancy-hover-button"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { useState } from "react"
import { PiDiceFive, PiDiceFiveDuotone } from "react-icons/pi"

const randomThemes = [
  "Space Exploration",
  "Ancient Civilizations",
  "Famous Artists",
  "World Capitals",
  "Mythical Creatures",
  "Classic Literature",
  "Inventions and Discoveries",
  "Famous Scientists",
  "Ocean Life",
  "Historical Events",
]

export default function Page() {
  const [crosswordTheme, setCrosswordTheme] = useState("")

  return (
    <div className="grow flex items-center justify-center">
      <Card className="w-lg">
        <CardHeader>
          <CardTitle>New Crossword</CardTitle>
          <CardDescription>
            Create a new crossword by providing a theme and difficulty.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <label htmlFor="input-theme" className="font-semibold">
            Theme
          </label>
          <div className="mt-2 flex gap-2">
            <Input
              id="input-theme"
              placeholder="Pokemon, Technology, Old Movies, etc."
              value={crosswordTheme}
              onChange={(e) => setCrosswordTheme(e.target.value)}
            />
            <Button
              variant="outline"
              className="w-9 group/fancy-hover-icon"
              onClick={() => {
                const randomTheme =
                  randomThemes[Math.floor(Math.random() * randomThemes.length)]!
                setCrosswordTheme(randomTheme)
              }}
            >
              <FancyHoverIcon
                className="size-5"
                hover={<PiDiceFiveDuotone className="size-5" />}
                nohover={<PiDiceFive className="size-5" />}
              />
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Create Crossword</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
