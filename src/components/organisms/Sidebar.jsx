import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Sidebar = ({ categories, isOpen, onClose }) => {
  const navigationItems = [
    { name: "All Tasks", path: "/", icon: "List", count: null },
    { name: "Today", path: "/today", icon: "Calendar", count: null },
    { name: "This Week", path: "/week", icon: "CalendarDays", count: null },
    { name: "Completed", path: "/completed", icon: "CheckCircle2", count: null },
  ];

  const NavItem = ({ item, onClick }) => (
    <NavLink
      to={item.path}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
          isActive
            ? "bg-primary-100 text-primary-700 shadow-sm"
            : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800"
        )
      }
    >
      <ApperIcon name={item.icon} className="w-4 h-4 flex-shrink-0" />
      <span className="truncate">{item.name}</span>
      {item.count !== null && (
        <span className="ml-auto text-xs bg-neutral-200 text-neutral-600 px-2 py-0.5 rounded-full">
          {item.count}
        </span>
      )}
    </NavLink>
  );

  const CategoryItem = ({ category, onClick }) => (
    <NavLink
      to={`/category/${category.Id}`}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
          isActive
            ? "bg-primary-100 text-primary-700 shadow-sm"
            : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800"
        )
      }
    >
      <ApperIcon name={category.icon} className="w-4 h-4 flex-shrink-0" />
      <span className="truncate">{category.name}</span>
    </NavLink>
  );

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:bg-white lg:border-r lg:border-neutral-200">
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-neutral-200">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
            <ApperIcon name="CheckSquare" className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold gradient-text">TaskFlow</h1>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigationItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
          
          {categories.length > 0 && (
            <>
              <div className="pt-6 pb-2">
                <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                  Categories
                </h3>
              </div>
              {categories.map((category) => (
                <CategoryItem key={category.Id} category={category} />
              ))}
            </>
          )}
        </nav>
      </div>
    </div>
  );

  // Mobile Sidebar
  const MobileSidebar = () => (
    <>
      {/* Overlay */}
      <div 
        className={cn(
          "lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="lg:hidden fixed inset-y-0 left-0 w-64 bg-white border-r border-neutral-200 z-50"
      >
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="CheckSquare" className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold gradient-text">TaskFlow</h1>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <ApperIcon name="X" className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigationItems.map((item) => (
              <NavItem key={item.name} item={item} onClick={onClose} />
            ))}
            
            {categories.length > 0 && (
              <>
                <div className="pt-6 pb-2">
                  <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                    Categories
                  </h3>
                </div>
                {categories.map((category) => (
                  <CategoryItem key={category.Id} category={category} onClick={onClose} />
                ))}
              </>
            )}
          </nav>
        </div>
      </motion.div>
    </>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;