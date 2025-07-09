import React from "react";
import { motion } from "framer-motion";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const PriorityBadge = ({ priority, className = "" }) => {
  const priorityConfig = {
    high: {
      label: "High",
      variant: "error",
      icon: "AlertCircle",
      pulse: true
    },
    medium: {
      label: "Medium",
      variant: "warning",
      icon: "Clock",
      pulse: false
    },
    low: {
      label: "Low",
      variant: "success",
      icon: "CheckCircle2",
      pulse: false
    }
  };

  const config = priorityConfig[priority] || priorityConfig.medium;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={className}
    >
      <Badge
        variant={config.variant}
        className={`flex items-center gap-1 ${config.pulse ? 'pulse-glow' : ''}`}
      >
        <ApperIcon name={config.icon} className="w-3 h-3" />
        {config.label}
      </Badge>
    </motion.div>
  );
};

export default PriorityBadge;