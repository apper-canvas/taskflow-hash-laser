import React from "react";
import { cn } from "@/utils/cn";

const Badge = React.forwardRef(({ 
  children, 
  className = "", 
  variant = "primary", 
  size = "md",
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-primary-100 text-primary-700 border-primary-200",
    secondary: "bg-secondary-100 text-secondary-700 border-secondary-200",
    accent: "bg-accent-100 text-accent-700 border-accent-200",
    success: "bg-green-100 text-green-700 border-green-200",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-200",
    error: "bg-red-100 text-red-700 border-red-200",
    neutral: "bg-neutral-100 text-neutral-700 border-neutral-200"
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base"
  };

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full font-medium border",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;