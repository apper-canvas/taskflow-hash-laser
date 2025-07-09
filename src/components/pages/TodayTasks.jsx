import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/organisms/Header";
import TaskList from "@/components/organisms/TaskList";
import TaskStats from "@/components/organisms/TaskStats";
import TaskForm from "@/components/organisms/TaskForm";
import { useTasks } from "@/hooks/useTasks";
import { useCategories } from "@/hooks/useCategories";
import { useTaskFilters } from "@/hooks/useTaskFilters";

const TodayTasks = () => {
  const { onToggleSidebar } = useOutletContext();
  const { tasks, loading, error, loadTasks, createTask, updateTask, deleteTask, toggleComplete } = useTasks();
  const { categories } = useCategories();
  const { searchQuery, setSearchQuery, getTasksByView, getTaskStats } = useTaskFilters(tasks);
  
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskFormLoading, setTaskFormLoading] = useState(false);

  const todayTasks = getTasksByView("today");
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

  const filteredTodayTasks = todayTasks.filter(task => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return task.title.toLowerCase().includes(query) ||
           (task.description && task.description.toLowerCase().includes(query));
  });

  return (
    <div className="flex flex-col h-screen bg-surface">
      <Header
        title="Today's Tasks"
        searchValue={searchQuery}
        onSearchChange={handleSearchChange}
        onAddTask={handleAddTask}
        onToggleSidebar={onToggleSidebar}
      />
      
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {new Date().getDate()}
                  </span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-neutral-800">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h2>
                  <p className="text-sm text-neutral-600">
                    {todayTasks.length} tasks due today
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-600">
                    {todayTasks.length}
                  </div>
                  <div className="text-sm text-neutral-600">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {todayTasks.filter(t => t.completed).length}
                  </div>
                  <div className="text-sm text-neutral-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {todayTasks.filter(t => !t.completed).length}
                  </div>
                  <div className="text-sm text-neutral-600">Pending</div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <TaskList
            tasks={filteredTodayTasks}
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

export default TodayTasks;