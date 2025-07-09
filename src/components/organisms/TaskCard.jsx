import React from "react";
import { motion } from "framer-motion";
import { format, isToday, isPast } from "date-fns";
import { toast } from "react-toastify";
import Checkbox from "@/components/atoms/Checkbox";
import Button from "@/components/atoms/Button";
import PriorityBadge from "@/components/molecules/PriorityBadge";
import CategoryBadge from "@/components/molecules/CategoryBadge";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const TaskCard = ({ 
  task, 
  category, 
  onToggleComplete, 
  onEdit, 
  onDelete, 
  className = "" 
}) => {
  const handleToggleComplete = async () => {
    try {
      await onToggleComplete(task.Id);
      toast.success(
        task.completed 
          ? "Task marked as incomplete" 
          : "Task completed! 🎉"
      );
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await onDelete(task.Id);
        toast.success("Task deleted");
      } catch (error) {
        toast.error("Failed to delete task");
      }
    }
  };

  const isOverdue = task.dueDate && isPast(new Date(task.dueDate)) && !task.completed;
  const isDueToday = task.dueDate && isToday(new Date(task.dueDate));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "bg-white rounded-lg p-4 shadow-sm border-l-4 transition-all duration-200 card-hover group",
        task.completed && "opacity-75 bg-neutral-50",
        isOverdue && "border-l-secondary-500 bg-secondary-50",
        isDueToday && !isOverdue && "border-l-accent-500 bg-accent-50",
        !isOverdue && !isDueToday && "border-l-primary-500",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={task.completed}
          onChange={handleToggleComplete}
          className="mt-1 flex-shrink-0"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className={cn(
              "font-medium text-neutral-800 truncate",
              task.completed && "line-through text-neutral-500"
            )}>
              {task.title}
            </h3>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(task)}
                className="p-1 h-auto"
              >
                <ApperIcon name="Edit2" className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="p-1 h-auto text-secondary-600 hover:text-secondary-700"
              >
                <ApperIcon name="Trash2" className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {task.description && (
            <p className={cn(
              "text-sm text-neutral-600 mb-3",
              task.completed && "line-through text-neutral-400"
            )}>
              {task.description}
            </p>
          )}
          
          <div className="flex items-center gap-2 flex-wrap">
            <PriorityBadge priority={task.priority} />
            {category && <CategoryBadge category={category} />}
            
            {task.dueDate && (
              <div className={cn(
                "flex items-center gap-1 text-xs",
                isOverdue && "text-secondary-600",
                isDueToday && "text-accent-600",
                !isOverdue && !isDueToday && "text-neutral-500"
              )}>
                <ApperIcon name="Calendar" className="w-3 h-3" />
                {format(new Date(task.dueDate), "MMM d")}
                {isOverdue && " (Overdue)"}
                {isDueToday && " (Today)"}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;