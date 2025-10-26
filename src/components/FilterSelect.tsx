"use client";

import React from "react";

interface Option {
  value: string;
  label: string;
}

interface FilterSelectProps {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  options: Option[];
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <div className="w-full mb-4">
      {label && (
        <label className="block text-purple-700 font-medium mb-1">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-700"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSelect;
