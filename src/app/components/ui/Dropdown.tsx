import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  name: string;
  label: string;
  placeholder: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  width?: string;
  required?: boolean;
  value?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  name,
  label,
  placeholder,
  options,
  onChange,
  width = "w-full",
  required = false,
  value: propValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
    propValue ? options.find((opt) => opt.value === propValue) || null : null
  );
  const [touched, setTouched] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (propValue) {
      const option = options.find((opt) => opt.value === propValue);
      if (option) {
        setSelectedOption(option);
      }
    }
  }, [propValue, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: DropdownOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    setTouched(true);
    onChange(option.value);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!touched) setTouched(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
      setTouched(true);
    }, 200);
  };

  return (
    <div className={`relative mt-6 mb-4 ${width}`} ref={dropdownRef}>
      <label
        htmlFor={name}
        className="absolute -top-6 left-0 text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={toggleDropdown}
          onBlur={handleBlur}
          className={`flex justify-between items-center w-full px-4 py-2 text-left bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            ${
              touched && required && !selectedOption
                ? "border-red-500"
                : "border-gray-300"
            }
            ${!required ? "bg-[#E5E8E9]" : ""}`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={`w-5 h-5 ml-2 text-gray-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            <ul
              className="py-1"
              role="listbox"
              aria-labelledby="dropdown-button"
            >
              {options.map((option) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={selectedOption?.value === option.value}
                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                    selectedOption?.value === option.value
                      ? "bg-blue-100 text-blue-900"
                      : "text-gray-900"
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {touched && required && !selectedOption && (
        <p className="mt-1 text-sm text-red-600">Please select an option</p>
      )}
    </div>
  );
};

export default Dropdown;
