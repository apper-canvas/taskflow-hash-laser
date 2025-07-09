import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No items found", 
  description = "Get started by adding your first item.", 
  actionLabel = "Add Item",
  onAction,
  icon = "Plus"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center h-64 text-center p-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className="w-20 h-20 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center mb-6"
      >
        <ApperIcon name={icon} className="w-10 h-10 text-primary-600" />
      </motion.div>
      
      <motion.h3
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-semibold text-neutral-800 mb-2"
      >
        {title}
      </motion.h3>
      
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-neutral-600 mb-6 max-w-md"
      >
        {description}
      </motion.p>
      
      {onAction && (
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={onAction}
          className="px-6 py-3 gradient-primary text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 button-press focus-ring flex items-center gap-2"
        >
          <ApperIcon name={icon} className="w-4 h-4" />
          {actionLabel}
        </motion.button>
      )}
    </motion.div>
  );
};

export default Empty;