import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = React.forwardRef(({ 
  className = "", 
  checked = false,
  onChange,
  ...props 
}, ref) => {
  return (
    <motion.div
      className={cn("relative inline-flex items-center justify-center", className)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
        {...props}
      />
      <div
        className={cn(
          "w-5 h-5 rounded border-2 transition-all duration-200 cursor-pointer flex items-center justify-center",
          checked 
            ? "bg-primary-500 border-primary-500 text-white" 
            : "border-neutral-300 bg-white hover:border-primary-300"
        )}
        onClick={() => onChange?.({ target: { checked: !checked } })}
      >
        {checked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <ApperIcon name="Check" className="w-3 h-3" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;