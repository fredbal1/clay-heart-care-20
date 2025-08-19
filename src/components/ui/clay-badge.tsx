
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const clayBadgeVariants = cva(
  "clay-raised inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        accent: "bg-accent text-accent-foreground",
        success: "bg-success text-success-foreground",
        warning: "bg-warning text-warning-foreground",
        error: "bg-error text-error-foreground",
        outline: "border-primary text-primary bg-transparent",
      },
      shape: {
        default: "rounded-clay",
        pill: "rounded-full",
      }
    },
    defaultVariants: {
      variant: "default",
      shape: "pill",
    },
  }
)

export interface ClayBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof clayBadgeVariants> {}

function ClayBadge({ className, variant, shape, ...props }: ClayBadgeProps) {
  return (
    <div className={cn(clayBadgeVariants({ variant, shape }), className)} {...props} />
  )
}

export { ClayBadge, clayBadgeVariants }
