import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-button shadow-border bg-bg-primary px-3 py-1 text-base transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-text-primary placeholder:text-text-secondary focus-visible:ring-focus disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-bg-secondary disabled:opacity-50 aria-invalid:border-accent-red aria-invalid:ring-3 aria-invalid:ring-accent-red/20 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }
