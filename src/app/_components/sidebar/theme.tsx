"use client"

import { FancyHoverIcon } from "@/components/fancy-hover-button"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/client/theme"
import { cn } from "@/lib/utils"

import { PiMoon, PiMoonDuotone, PiSun, PiSunDuotone } from "react-icons/pi"

export function ThemeSection() {
  const { theme, setTheme } = useTheme()
  return (
    <Button
      className="relative w-full group/fancy-hover-icon"
      variant="outline"
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light")
      }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className={cn("relative w-full flex items-center gap-2", {
            "opacity-0": theme !== "light",
            "opacity-100": theme === "light",
          })}
        >
          <FancyHoverIcon hover={<PiSunDuotone />} nohover={<PiSun />} />
          <span>Light Mode</span>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className={cn("relative flex items-center gap-2", {
            "opacity-0": theme !== "dark",
            "opacity-100": theme === "dark",
          })}
        >
          <FancyHoverIcon hover={<PiMoonDuotone />} nohover={<PiMoon />} />
          <span>Dark Mode</span>
        </div>
      </div>
    </Button>
  )
}
