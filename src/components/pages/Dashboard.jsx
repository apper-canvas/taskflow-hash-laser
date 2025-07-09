import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/organisms/Header";
import TaskList from "@/components/organisms/TaskList";
import TaskStats from "@/components/organisms/TaskStats";
import FilterBar from "@/components/organisms/FilterBar";
import TaskForm from "@/components/organisms/TaskForm";
import { useTasks } from "@/hooks/useTasks";
import { useCategories } from "@/hooks/useCategories";
import { useTaskFilters } from "@/hooks/useTaskFilters";

const Dashboard = () => {
  const { onToggleSidebar } = useOutletContext();
  const { tasks, loading, error, loadTasks, createTask, updateTask, deleteTask, toggleComplete } = useTasks();
  const { categories } = useCategories();
  const { searchQuery, setSearchQuery, filters, updateFilter, clearFilters, filteredTasks, getTaskStats } = useTaskFilters(tasks);
  
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskFormLoading, setTaskFormLoading] = useState(false);

  const stats = getTaskStats();

  const handleAddTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

const handleSaveTask = async (taskData) => {
    try {
      setTaskFormLoading(true);
      if (editingTask) {
        await updateTask(editingTask.Id, taskData);
      } else {
        await createTask(taskData);
      }
      setShowTaskForm(false);
      setEditingTask(null);
    } finally {
      setTaskFormLoading(false);
    }
  };

  const handleCancelTaskForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex flex-col h-screen bg-surface">
      <Header
        title="All Tasks"
        searchValue={searchQuery}
        onSearchChange={handleSearchChange}
        onAddTask={handleAddTask}
        onToggleSidebar={onToggleSidebar}
      />
      
      <FilterBar
        filters={filters}
        onFilterChange={updateFilter}
        onClearFilters={clearFilters}
      />
      
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <TaskStats stats={stats} />
          
          <TaskList
            tasks={filteredTasks}
            categories={categories}
            loading={loading}
            error={error}
            onRetry={loadTasks}
            onToggleComplete={toggleComplete}
            onEdit={handleEditTask}
            onDelete={deleteTask}
            onAddTask={handleAddTask}
          />
        </div>
      </main>

      {/* Task Form Modal */}
      <AnimatePresence>
        {showTaskForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={handleCancelTaskForm}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <TaskForm
                task={editingTask}
                categories={categories}
                onSave={handleSaveTask}
                onCancel={handleCancelTaskForm}
                loading={taskFormLoading}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;