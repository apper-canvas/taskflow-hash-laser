import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import Dashboard from "@/components/pages/Dashboard";
import TodayTasks from "@/components/pages/TodayTasks";
import WeekTasks from "@/components/pages/WeekTasks";
import CompletedTasks from "@/components/pages/CompletedTasks";
import CategoryTasks from "@/components/pages/CategoryTasks";
import { useCategories } from "@/hooks/useCategories";

const App = () => {
  const { categories } = useCategories();

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout categories={categories} />}>
          <Route index element={<Dashboard />} />
          <Route path="today" element={<TodayTasks />} />
          <Route path="week" element={<WeekTasks />} />
          <Route path="completed" element={<CompletedTasks />} />
          <Route path="category/:categoryId" element={<CategoryTasks />} />
        </Route>
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </>
  );
};

export default App;