
import * as React from "react"
import { cn } from "@/lib/utils"

const ClayCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "subtle" | "floating"
    hoverable?: boolean
  }
>(({ className, variant = "default", hoverable = true, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "clay-raised p-6",
      variant === "subtle" && "clay-subtle",
      variant === "floating" && "clay-floating",
      hoverable && "clay-card",
      className
    )}
    {...props}
  />
))
ClayCard.displayName = "ClayCard"

const ClayCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-0 pb-4", className)}
    {...props}
  />
))
ClayCardHeader.displayName = "ClayCardHeader"

const ClayCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
ClayCardTitle.displayName = "ClayCardTitle"

const ClayCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
ClayCardDescription.displayName = "ClayCardDescription"

const ClayCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-0", className)} {...props} />
))
ClayCardContent.displayName = "ClayCardContent"

const ClayCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-0 pt-4", className)}
    {...props}
  />
))
ClayCardFooter.displayName = "ClayCardFooter"

export { ClayCard, ClayCardHeader, ClayCardFooter, ClayCardTitle, ClayCardDescription, ClayCardContent }
