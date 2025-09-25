import { useTheme as _useTheme } from "next-themes"

export function useTheme() {
  const { theme: _theme, setTheme } = _useTheme()
  const theme: "light" | "dark" = _theme === "dark" ? "dark" : "light"

  return {
    theme,
    setTheme,
  }
}
