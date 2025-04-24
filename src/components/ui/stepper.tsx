import * as React from "react"
import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
    currentStep: number
    children: React.ReactNode
}

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    isCompleted?: boolean
    isCurrent?: boolean
}

interface StepTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode
}

interface StepDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
    ({ className, currentStep, children, ...props }, ref) => {
        const steps = React.Children.toArray(children) as React.ReactElement<StepProps>[]

        return (
            <div ref={ref} className={cn("flex items-center w-full", className)} {...props}>
                {steps.map((step, index) => {
                    const isCompleted = index < currentStep
                    const isCurrent = index === currentStep

                    return (
                        <React.Fragment key={index}>
                            <div className="flex flex-col items-center flex-1">
                                <div
                                    className={cn(
                                        "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors",
                                        isCompleted
                                            ? "bg-primary border-primary text-primary-foreground"
                                            : isCurrent
                                                ? "border-primary text-primary"
                                                : "border-muted-foreground text-muted-foreground",
                                    )}
                                >
                                    {isCompleted ? <CheckIcon className="h-4 w-4" /> : <span>{index + 1}</span>}
                                </div>
                                <div className="mt-2 text-center">
                                    {React.cloneElement(step, {
                                        isCompleted,
                                        isCurrent,
                                    })}
                                </div>
                            </div>

                            {index < steps.length - 1 && (
                                <div
                                    className={cn("h-[2px] flex-1 transition-colors", index < currentStep ? "bg-primary" : "bg-muted")}
                                />
                            )}
                        </React.Fragment>
                    )
                })}
            </div>
        )
    },
)
Stepper.displayName = "Stepper"

const Step = React.forwardRef<HTMLDivElement, StepProps>(({ className, children, ...props }, ref) => {
    return (
        <div ref={ref} className={cn("text-center", className)} {...props}>
            {children}
        </div>
    )
})
Step.displayName = "Step"

const StepTitle = React.forwardRef<HTMLHeadingElement, StepTitleProps>(({ className, children, ...props }, ref) => {
    return (
        <h3 ref={ref} className={cn("text-sm font-medium", className)} {...props}>
            {children}
        </h3>
    )
})
StepTitle.displayName = "StepTitle"

const StepDescription = React.forwardRef<HTMLParagraphElement, StepDescriptionProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <p ref={ref} className={cn("text-xs text-muted-foreground", className)} {...props}>
                {children}
            </p>
        )
    },
)
StepDescription.displayName = "StepDescription"

export { Stepper, Step, StepTitle, StepDescription }
