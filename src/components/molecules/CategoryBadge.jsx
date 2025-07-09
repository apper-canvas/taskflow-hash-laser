import React from "react";
import { motion } from "framer-motion";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const CategoryBadge = ({ category, className = "" }) => {
  const getCategoryColor = (color) => {
    const colorMap = {
      primary: "primary",
      secondary: "secondary",
      accent: "accent",
      success: "success",
      warning: "warning",
      error: "error"
    };
    return colorMap[color] || "neutral";
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={className}
    >
      <Badge
        variant={getCategoryColor(category.color)}
        className="flex items-center gap-1"
      >
        <ApperIcon name={category.icon} className="w-3 h-3" />
        {category.name}
      </Badge>
    </motion.div>
  );
};

export default CategoryBadge;