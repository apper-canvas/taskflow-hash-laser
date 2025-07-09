import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "@/components/organisms/TaskCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const TaskList = ({ 
  tasks, 
  categories, 
  loading, 
  error, 
  onRetry, 
  onToggleComplete, 
  onEdit, 
  onDelete, 
  onAddTask 
}) => {
  if (loading) {
    return <Loading type="list" />;
  }

  if (error) {
    return (
      <Error 
        message={error} 
        onRetry={onRetry} 
      />
    );
  }

  if (tasks.length === 0) {
    return (
      <Empty
        title="No tasks yet"
        description="Create your first task to get started organizing your day."
        actionLabel="Add Task"
        onAction={onAddTask}
        icon="Plus"
      />
    );
  }

  const getCategoryById = (categoryId) => {
    return categories.find(cat => cat.Id === categoryId);
  };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <motion.div
            key={task.Id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <TaskCard
              task={task}
              category={getCategoryById(task.categoryId)}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;