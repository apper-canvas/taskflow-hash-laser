import { useState, useMemo } from "react";
import { isToday, isPast, isThisWeek } from "date-fns";

export const useTaskFilters = (tasks) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    category: "all"
  });

  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(query) ||
        (task.description && task.description.toLowerCase().includes(query))
      );
    }

    // Status filter
    if (filters.status !== "all") {
      if (filters.status === "completed") {
        filtered = filtered.filter(task => task.completed);
      } else if (filters.status === "pending") {
        filtered = filtered.filter(task => !task.completed);
      }
    }

    // Priority filter
    if (filters.priority !== "all") {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }

    // Category filter
    if (filters.category !== "all") {
      filtered = filtered.filter(task => task.categoryId === filters.category);
    }

    return filtered;
  }, [tasks, searchQuery, filters]);

  const getTasksByView = (view) => {
    switch (view) {
      case "today":
        return tasks.filter(task => 
          task.dueDate && isToday(new Date(task.dueDate))
        );
      case "week":
        return tasks.filter(task => 
          task.dueDate && isThisWeek(new Date(task.dueDate))
        );
      case "completed":
        return tasks.filter(task => task.completed);
      case "overdue":
        return tasks.filter(task => 
          !task.completed && 
          task.dueDate && 
          isPast(new Date(task.dueDate)) && 
          !isToday(new Date(task.dueDate))
        );
      default:
        return tasks;
    }
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = tasks.filter(task => !task.completed).length;
    const overdue = tasks.filter(task => 
      !task.completed && 
      task.dueDate && 
      isPast(new Date(task.dueDate)) && 
      !isToday(new Date(task.dueDate))
    ).length;

    return { total, completed, pending, overdue };
  };

  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: "all",
      priority: "all",
      category: "all"
    });
    setSearchQuery("");
  };

  return {
    searchQuery,
    setSearchQuery,
    filters,
    updateFilter,
    clearFilters,
    filteredTasks,
    getTasksByView,
    getTaskStats
  };
};