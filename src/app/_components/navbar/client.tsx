"use client"

import { FancyHoverIcon } from "@/components/fancy-hover-button"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/client/theme"
import { cn } from "@/lib/utils"

import { PiMoon, PiMoonDuotone, PiSun, PiSunDuotone } from "react-icons/pi"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="secondary"
      className="group cursor-pointer"
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light")
      }}
    >
      <FancyHoverIcon
        nohover={<PiSun />}
        hover={<PiSunDuotone />}
        className={cn({ hidden: theme !== "light" })}
      />
      <FancyHoverIcon
        nohover={<PiMoon />}
        hover={<PiMoonDuotone />}
        className={cn({ hidden: theme !== "dark" })}
      />
    </Button>
  )
}
