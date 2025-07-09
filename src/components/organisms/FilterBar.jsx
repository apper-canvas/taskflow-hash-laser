import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";

const FilterBar = ({ 
  filters, 
  onFilterChange, 
  onClearFilters 
}) => {
  const hasActiveFilters = filters.priority !== "all" || filters.status !== "all" || filters.category !== "all";

  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white border-b border-neutral-200 px-4 py-3 lg:px-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ApperIcon name="Filter" className="w-4 h-4 text-neutral-600" />
            <span className="text-sm font-medium text-neutral-700">Filters:</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Select
              value={filters.status}
              onChange={(e) => onFilterChange("status", e.target.value)}
              className="w-32"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </Select>
            
            <Select
              value={filters.priority}
              onChange={(e) => onFilterChange("priority", e.target.value)}
              className="w-32"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </Select>
            
            <Select
              value={filters.category}
              onChange={(e) => onFilterChange("category", e.target.value)}
              className="w-32"
            >
              <option value="all">All Categories</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="health">Health</option>
            </Select>
          </div>
        </div>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="flex items-center gap-2 text-neutral-600"
          >
            <ApperIcon name="X" className="w-4 h-4" />
            Clear Filters
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default FilterBar;