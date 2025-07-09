import { useState, useEffect } from "react";
import taskService from "@/services/api/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError(err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [...prev, newTask]);
      return newTask;
    } catch (err) {
      throw new Error(err.message || "Failed to create task");
    }
  };

  const updateTask = async (id, updateData) => {
    try {
      const updatedTask = await taskService.update(id, updateData);
      setTasks(prev => prev.map(task => 
        task.Id === id ? updatedTask : task
      ));
      return updatedTask;
    } catch (err) {
      throw new Error(err.message || "Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskService.delete(id);
      setTasks(prev => prev.filter(task => task.Id !== id));
    } catch (err) {
      throw new Error(err.message || "Failed to delete task");
    }
  };

  const toggleComplete = async (id) => {
    try {
      const updatedTask = await taskService.toggleComplete(id);
      setTasks(prev => prev.map(task => 
        task.Id === id ? updatedTask : task
      ));
      return updatedTask;
    } catch (err) {
      throw new Error(err.message || "Failed to toggle task completion");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete
  };
};