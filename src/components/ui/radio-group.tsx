
import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

// Create a specialized PaymentMethod radio component that includes an icon and better styling
const PaymentMethodRadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
PaymentMethodRadioGroup.displayName = "PaymentMethodRadioGroup"

// Radio item specifically for payment methods with icon support
const PaymentMethodRadioItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    icon?: React.ReactNode;
    description?: string;
  }
>(({ className, icon, description, children, ...props }, ref) => {
  return (
    <div className="relative">
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          "peer sr-only",
          className
        )}
        {...props}
      >
      </RadioGroupPrimitive.Item>
      <label
        className="flex items-center justify-between border rounded-md p-4 cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-primary peer-data-[state=checked]:bg-primary/5 hover:bg-muted/50"
        htmlFor={props.id}
      >
        <div className="flex items-center gap-3">
          {icon && <div className="text-muted-foreground flex-shrink-0">{icon}</div>}
          <div>
            <div className="font-medium">{children}</div>
            {description && <div className="text-sm text-muted-foreground">{description}</div>}
          </div>
        </div>
        <Circle className="h-2 w-2 opacity-0 fill-primary text-primary peer-data-[state=checked]:opacity-100" />
      </label>
    </div>
  )
})
PaymentMethodRadioItem.displayName = "PaymentMethodRadioItem"

export { RadioGroup, RadioGroupItem, PaymentMethodRadioGroup, PaymentMethodRadioItem }
