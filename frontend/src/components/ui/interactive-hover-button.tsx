import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  className?: string;
}

export const InteractiveHoverButton = React.forwardRef<HTMLButtonElement, InteractiveHoverButtonProps>(
  ({ text = "Button", className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group relative w-auto cursor-pointer overflow-hidden rounded-full border border-primary/20 bg-background/50 p-2 px-6 text-center font-semibold text-primary backdrop-blur-md transition-all duration-300 ease-in-out hover:border-primary hover:bg-primary/10 hover:text-white shadow-lg hover:shadow-primary/25",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          {text}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500/0 via-violet-500/20 to-rose-500/0 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
      </button>
    );
  },
);

InteractiveHoverButton.displayName = "InteractiveHoverButton";
