import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ 
  title, 
  searchValue, 
  onSearchChange, 
  onAddTask, 
  onToggleSidebar 
}) => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white border-b border-neutral-200 px-4 py-4 lg:px-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="lg:hidden p-2"
          >
            <ApperIcon name="Menu" className="w-5 h-5" />
          </Button>
          
          <div>
            <h1 className="text-2xl font-bold text-neutral-800">{title}</h1>
            <p className="text-sm text-neutral-600">
              Organize your tasks and boost productivity
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <SearchBar
            value={searchValue}
            onChange={onSearchChange}
            placeholder="Search tasks..."
            className="w-64 hidden sm:block"
          />
          
          <Button
            onClick={onAddTask}
            className="flex items-center gap-2"
          >
            <ApperIcon name="Plus" className="w-4 h-4" />
            <span className="hidden sm:inline">Add Task</span>
          </Button>
        </div>
      </div>
      
      {/* Mobile search */}
      <div className="mt-4 sm:hidden">
        <SearchBar
          value={searchValue}
          onChange={onSearchChange}
          placeholder="Search tasks..."
        />
      </div>
    </motion.header>
  );
};

export default Header;