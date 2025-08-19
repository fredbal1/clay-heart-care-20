
import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

const ClaySwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn("clay-switch", className)}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb className="clay-switch-thumb" />
  </SwitchPrimitives.Root>
))
ClaySwitch.displayName = SwitchPrimitives.Root.displayName

export { ClaySwitch }
