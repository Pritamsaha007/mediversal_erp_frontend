"use client";
import React, { InputHTMLAttributes, useState, ChangeEvent } from "react";

interface ValidationRule {
  pattern?: RegExp;
  test?: (value: string) => boolean;
  message: string;
}

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  placeholder?: string;
  width?: string; // Width as a Tailwind class
  validationRules?: ValidationRule[];
  required?: boolean;
  requiredMessage?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  placeholder,
  width = "w-full", // Default to full width
  validationRules = [],
  required = false,
  requiredMessage = "This field is required",
  onChange,
  onBlur,
  ...rest
}) => {
  const [error, setError] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);

  const validate = (value: string): string => {
    // Check required
    if (required && (!value || value.trim() === "")) {
      return requiredMessage;
    }

    // Skip other validations if empty and not required
    if (!value || value.trim() === "") {
      return "";
    }

    // Check validation rules
    for (const rule of validationRules) {
      if (rule.pattern && !rule.pattern.test(value)) {
        return rule.message;
      }
      if (rule.test && !rule.test(value)) {
        return rule.message;
      }
    }

    return "";
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (touched) {
      setError(validate(value));
    }
    if (onChange) {
      onChange(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    setError(validate(e.target.value));
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <div className="relative mt-6 mb-4">
      <label
        htmlFor={name}
        className="absolute -top-6 left-0 text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        placeholder={placeholder}
        className={`${width} px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        } ${!required ? "bg-[#E5E8E9]" : ""} text-black`}
        onChange={handleChange}
        onBlur={handleBlur}
        {...rest}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default InputField;
