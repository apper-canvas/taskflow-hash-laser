import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";
import FormField from "@/components/molecules/FormField";
import DatePicker from "@/components/molecules/DatePicker";
import ApperIcon from "@/components/ApperIcon";

const TaskForm = ({ 
  task, 
  categories, 
  onSave, 
  onCancel, 
  loading = false 
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    priority: "medium",
    dueDate: null
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || "",
        categoryId: task.categoryId,
        priority: task.priority,
        dueDate: task.dueDate ? new Date(task.dueDate) : null
      });
    }
  }, [task]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors and try again");
      return;
    }

    try {
      await onSave(formData);
      toast.success(task ? "Task updated successfully" : "Task created successfully");
      onCancel();
    } catch (error) {
      toast.error("Failed to save task");
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-lg p-6 shadow-lg border border-neutral-200 max-w-md w-full"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-neutral-800">
          {task ? "Edit Task" : "Add New Task"}
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="p-1 h-auto"
        >
          <ApperIcon name="X" className="w-5 h-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Title"
          required
          error={errors.title}
        >
          <Input
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Enter task title"
            error={!!errors.title}
          />
        </FormField>

        <FormField
          label="Description"
          error={errors.description}
        >
          <Textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Enter task description (optional)"
            rows={3}
            error={!!errors.description}
          />
        </FormField>

        <FormField
          label="Category"
          required
          error={errors.categoryId}
        >
          <Select
            value={formData.categoryId}
            onChange={(e) => handleChange("categoryId", e.target.value)}
            error={!!errors.categoryId}
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.Id} value={category.Id}>
                {category.name}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField
          label="Priority"
          error={errors.priority}
        >
          <Select
            value={formData.priority}
            onChange={(e) => handleChange("priority", e.target.value)}
            error={!!errors.priority}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
        </FormField>

        <FormField
          label="Due Date"
          error={errors.dueDate}
        >
          <DatePicker
            value={formData.dueDate}
            onChange={(date) => handleChange("dueDate", date)}
            placeholder="Select due date (optional)"
          />
        </FormField>

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            disabled={loading}
            className="flex-1"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <ApperIcon name="Save" className="w-4 h-4" />
                {task ? "Update Task" : "Create Task"}
              </div>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default TaskForm;