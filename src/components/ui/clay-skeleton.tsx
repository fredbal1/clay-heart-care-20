
import { cn } from "@/lib/utils"

function ClaySkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("clay-skeleton animate-pulse rounded-clay", className)}
      {...props}
    />
  )
}

export { ClaySkeleton }
