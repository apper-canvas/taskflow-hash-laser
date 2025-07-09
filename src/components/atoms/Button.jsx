import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  children, 
  className = "", 
  variant = "primary", 
  size = "md", 
  disabled = false,
  ...props 
}, ref) => {
  const variants = {
    primary: "gradient-primary text-white hover:shadow-lg",
    secondary: "gradient-secondary text-white hover:shadow-lg",
    accent: "gradient-accent text-white hover:shadow-lg",
    outline: "border-2 border-primary-500 text-primary-500 hover:bg-primary-50",
    ghost: "text-primary-500 hover:bg-primary-50",
    surface: "bg-surface text-neutral-700 hover:bg-neutral-100"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-ring button-press",
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";

export default Button;