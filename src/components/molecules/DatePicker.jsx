import React from "react";
import { format } from "date-fns";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const DatePicker = ({ 
  value, 
  onChange, 
  placeholder = "Select date", 
  className = "" 
}) => {
  const handleDateChange = (e) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    onChange(date);
  };

  const formatDateForInput = (date) => {
    if (!date) return "";
    return format(date, "yyyy-MM-dd");
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <ApperIcon name="Calendar" className="w-5 h-5 text-neutral-400" />
      </div>
      <Input
        type="date"
        value={formatDateForInput(value)}
        onChange={handleDateChange}
        placeholder={placeholder}
        className="pl-10"
      />
    </div>
  );
};

export default DatePicker;