import { cn } from "@/lib/utils"

export function FancyHoverIcon({
  nohover,
  hover,
  className,
}: {
  nohover: React.ReactNode
  hover: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("relative w-2.5", className)}>
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "transition-opacity opacity-100 group-hover:opacity-0",
        )}
      >
        {nohover}
      </div>
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "transition-opacity opacity-0 group-hover:opacity-100",
        )}
      >
        {hover}
      </div>
    </div>
  )
}
