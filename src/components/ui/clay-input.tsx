
import * as React from "react"
import { cn } from "@/lib/utils"

export interface ClayInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "search"
}

const ClayInput = React.forwardRef<HTMLInputElement, ClayInputProps>(
  ({ className, type, variant = "default", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "clay-input flex h-11 w-full px-4 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          variant === "search" && "pl-10",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
ClayInput.displayName = "ClayInput"

export { ClayInput }
