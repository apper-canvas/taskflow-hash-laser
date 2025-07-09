import React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef(({ 
  className = "", 
  type = "text", 
  error = false,
  ...props 
}, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "w-full px-4 py-2 rounded-lg border-2 border-neutral-200 bg-white text-neutral-800 placeholder-neutral-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200",
        error && "border-secondary-500 focus:border-secondary-500 focus:ring-secondary-200",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;