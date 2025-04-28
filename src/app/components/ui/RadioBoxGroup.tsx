"use client";
import React from "react";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioBoxGroupProps {
  name: string;
  options: RadioOption[];
  selectedValue: string;
  onChange: (name: string, value: string) => void;
  required?: boolean;
}

export const RadioBoxGroup: React.FC<RadioBoxGroupProps> = ({
  name,
  options,
  selectedValue,
  onChange,
  required = false,
}) => {
  const handleChange = (value: string) => {
    onChange(name, value);
  };

  return (
    <div className="flex space-x-4">
      {options.map((option) => (
        <div
          key={option.value}
          className={`px-4 py-2 border rounded-md cursor-pointer ${
            selectedValue === option.value
              ? "bg-[#0088B1] text-white border-[#0088B1]"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => handleChange(option.value)}
        >
          <div className="flex items-center">
            <input
              type="radio"
              name={name}
              id={`${name}-${option.value}`}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => handleChange(option.value)}
              className="hidden"
              required={required}
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className="text-sm font-medium cursor-pointer select-none"
            >
              {option.label}
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};
