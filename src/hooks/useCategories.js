import { useState, useEffect } from "react";
import categoryService from "@/services/api/categoryService";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      setError(err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (categoryData) => {
    try {
      const newCategory = await categoryService.create(categoryData);
      setCategories(prev => [...prev, newCategory]);
      return newCategory;
    } catch (err) {
      throw new Error(err.message || "Failed to create category");
    }
  };

  const updateCategory = async (id, updateData) => {
    try {
      const updatedCategory = await categoryService.update(id, updateData);
      setCategories(prev => prev.map(category => 
        category.Id === id ? updatedCategory : category
      ));
      return updatedCategory;
    } catch (err) {
      throw new Error(err.message || "Failed to update category");
    }
  };

  const deleteCategory = async (id) => {
    try {
      await categoryService.delete(id);
      setCategories(prev => prev.filter(category => category.Id !== id));
    } catch (err) {
      throw new Error(err.message || "Failed to delete category");
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    loadCategories,
    createCategory,
    updateCategory,
    deleteCategory
  };
};