
import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@/lib/utils"

const ClayAvatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
    size?: "sm" | "md" | "lg" | "xl"
  }
>(({ className, size = "md", ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "clay-raised relative flex shrink-0 overflow-hidden rounded-full",
      size === "sm" && "h-8 w-8",
      size === "md" && "h-10 w-10", 
      size === "lg" && "h-12 w-12",
      size === "xl" && "h-16 w-16",
      className
    )}
    {...props}
  />
))
ClayAvatar.displayName = AvatarPrimitive.Root.displayName

const ClayAvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
))
ClayAvatarImage.displayName = AvatarPrimitive.Image.displayName

const ClayAvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center bg-primary text-primary-foreground font-medium",
      className
    )}
    {...props}
  />
))
ClayAvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { ClayAvatar, ClayAvatarImage, ClayAvatarFallback }
