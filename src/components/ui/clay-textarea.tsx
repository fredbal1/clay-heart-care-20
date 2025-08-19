
import * as React from "react"
import { cn } from "@/lib/utils"

export interface ClayTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const ClayTextarea = React.forwardRef<HTMLTextAreaElement, ClayTextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "clay-input flex min-h-[80px] w-full px-4 py-3 text-sm resize-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
ClayTextarea.displayName = "ClayTextarea"

export { ClayTextarea }
