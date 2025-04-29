"use client";
import React, { useState, useEffect } from "react";

interface DOBInputProps {
  name: string;
  label: string;
  placeholder?: string;
  width?: string;
  required?: boolean;
  minAge?: number;
  maxAge?: number;
  onChange: (date: Date | null, isValid: boolean) => void;
  value?: Date | null;
  isClearing?: boolean;
}

const DOBInput: React.FC<DOBInputProps> = ({
  name,
  label,
  placeholder = "YYYY-MM-DD",
  width = "w-full",
  required = false,
  minAge = 0,
  maxAge = 120,
  onChange,
  value,
  isClearing = false, // Default to false
}) => {
  const [dateString, setDateString] = useState("");
  const [error, setError] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);

  useEffect(() => {
    if (isClearing) {
      setDateString("");
      setError("");
      setTouched(false);
      onChange(null, false);
    } else if (value) {
      const year = value.getFullYear();
      const month = String(value.getMonth() + 1).padStart(2, "0");
      const day = String(value.getDate()).padStart(2, "0");
      setDateString(`${year}-${month}-${day}`);
    } else {
      setDateString("");
    }
  }, [value, isClearing, onChange]);

  const validateDate = (
    dateStr: string
  ): { isValid: boolean; message: string } => {
    if (isClearing) {
      return { isValid: true, message: "" };
    }

    if (required && !dateStr) {
      return { isValid: false, message: "Date of birth is required" };
    }

    if (!dateStr) {
      return { isValid: true, message: "" };
    }

    // Rest of your validation logic remains the same...
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(dateStr)) {
      return {
        isValid: false,
        message: "Please enter date in YYYY-MM-DD format",
      };
    }

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return { isValid: false, message: "Please enter a valid date" };
    }

    const today = new Date();
    if (date > today) {
      return {
        isValid: false,
        message: "Date of birth cannot be in the future",
      };
    }

    const birthDate = new Date(dateStr);
    const ageDiff = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    let calculatedAge = ageDiff;

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      calculatedAge--;
    }

    if (minAge !== undefined && calculatedAge < minAge) {
      return {
        isValid: false,
        message: `Age must be at least ${minAge} years`,
      };
    }

    if (maxAge !== undefined && calculatedAge > maxAge) {
      return { isValid: false, message: `Age cannot exceed ${maxAge} years` };
    }

    return { isValid: true, message: "" };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDateString(value);

    if (touched) {
      const validation = validateDate(value);
      setError(validation.message);

      if (validation.isValid && value) {
        onChange(new Date(value), true);
      } else {
        onChange(null, false);
      }
    }
  };

  const handleBlur = () => {
    if (isClearing) return; // Skip validation during clearing

    setTouched(true);
    const validation = validateDate(dateString);
    setError(validation.message);

    if (validation.isValid && dateString) {
      onChange(new Date(dateString), true);
    } else {
      onChange(null, false);
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
        type="date"
        placeholder={placeholder}
        value={dateString}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`${width} px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error && !isClearing ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && !isClearing && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default DOBInput;
