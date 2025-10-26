"use client";

import React from "react";
import { FiChevronDown } from "react-icons/fi";

interface Option {
  value: string;
  label: string;
}

interface SortingSelectProps {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  options: Option[];
}

const SortingSelect: React.FC<SortingSelectProps> = ({
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <div className="w-full mb-4 relative">
      {label && (
        <label className="block text-purple-700 font-medium mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-700"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
};

export default SortingSelect;
