import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const TaskStats = ({ stats }) => {
  const statCards = [
    {
      title: "Total Tasks",
      value: stats.total,
      icon: "List",
      color: "primary",
      bgColor: "bg-primary-50",
      textColor: "text-primary-700",
      iconColor: "text-primary-600"
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: "CheckCircle2",
      color: "success",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      iconColor: "text-green-600"
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: "Clock",
      color: "warning",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-700",
      iconColor: "text-yellow-600"
    },
    {
      title: "Overdue",
      value: stats.overdue,
      icon: "AlertCircle",
      color: "error",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
      iconColor: "text-red-600"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`${stat.bgColor} rounded-lg p-4 card-hover`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${stat.textColor}`}>
                {stat.title}
              </p>
              <p className={`text-2xl font-bold ${stat.textColor} mt-1`}>
                {stat.value}
              </p>
            </div>
            <div className={`p-2 rounded-lg bg-white shadow-sm`}>
              <ApperIcon name={stat.icon} className={`w-5 h-5 ${stat.iconColor}`} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TaskStats;