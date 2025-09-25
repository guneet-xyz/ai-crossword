import { ThemeToggle } from "./client"

export function Navbar() {
  return (
    <nav className="flex items-center gap-4 p-4">
      <h1 className="font-semi text-lg">easystart</h1>
      <div className="grow" />
      <ThemeToggle />
    </nav>
  )
}
