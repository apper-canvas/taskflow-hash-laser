import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { startOfWeek, endOfWeek, format, eachDayOfInterval, isToday, isSameDay } from "date-fns";
import Header from "@/components/organisms/Header";
import TaskList from "@/components/organisms/TaskList";
import TaskForm from "@/components/organisms/TaskForm";
import { useTasks } from "@/hooks/useTasks";
import { useCategories } from "@/hooks/useCategories";
import { useTaskFilters } from "@/hooks/useTaskFilters";
import ApperIcon from "@/components/ApperIcon";

const WeekTasks = () => {
  const { onToggleSidebar } = useOutletContext();
  const { tasks, loading, error, loadTasks, createTask, updateTask, deleteTask, toggleComplete } = useTasks();
  const { categories } = useCategories();
  const { searchQuery, setSearchQuery, getTasksByView } = useTaskFilters(tasks);
  
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskFormLoading, setTaskFormLoading] = useState(false);

  const weekTasks = getTasksByView("week");
  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

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

  const filteredWeekTasks = weekTasks.filter(task => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return task.title.toLowerCase().includes(query) ||
           (task.description && task.description.toLowerCase().includes(query));
  });

  const getTasksForDay = (date) => {
    return filteredWeekTasks.filter(task => {
      if (!task.dueDate) return false;
      return isSameDay(new Date(task.dueDate), date);
    });
  };

  return (
    <div className="flex flex-col h-screen bg-surface">
      <Header
        title="This Week"
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
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <ApperIcon name="CalendarDays" className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-neutral-800">
                    {format(weekStart, "MMM d")} - {format(weekEnd, "MMM d, yyyy")}
                  </h2>
                  <p className="text-sm text-neutral-600">
                    {weekTasks.length} tasks due this week
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">
                    {weekTasks.length}
                  </div>
                  <div className="text-sm text-neutral-600">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {weekTasks.filter(t => t.completed).length}
                  </div>
                  <div className="text-sm text-neutral-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {weekTasks.filter(t => !t.completed).length}
                  </div>
                  <div className="text-sm text-neutral-600">Pending</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Week Calendar View */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4 mb-6">
            {weekDays.map((day, index) => {
              const dayTasks = getTasksForDay(day);
              return (
                <motion.div
                  key={day.toISOString()}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-lg p-4 shadow-sm border border-neutral-200 ${
                    isToday(day) ? 'ring-2 ring-primary-500' : ''
                  }`}
                >
                  <div className="text-center mb-3">
                    <div className="text-xs font-medium text-neutral-600 uppercase tracking-wide">
                      {format(day, "EEE")}
                    </div>
                    <div className={`text-lg font-bold ${
                      isToday(day) ? 'text-primary-600' : 'text-neutral-800'
                    }`}>
                      {format(day, "d")}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {dayTasks.slice(0, 3).map(task => (
                      <div
                        key={task.Id}
                        className={`text-xs p-2 rounded border-l-2 ${
                          task.completed 
                            ? 'bg-green-50 border-green-500 text-green-700' 
                            : 'bg-neutral-50 border-neutral-300 text-neutral-700'
                        }`}
                      >
                        <div className={`font-medium truncate ${
                          task.completed ? 'line-through' : ''
                        }`}>
                          {task.title}
                        </div>
                      </div>
                    ))}
                    {dayTasks.length > 3 && (
                      <div className="text-xs text-neutral-500 text-center">
                        +{dayTasks.length - 3} more
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <TaskList
            tasks={filteredWeekTasks}
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

export default WeekTasks;