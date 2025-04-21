import React, { useState } from 'react';

type ToggleOption = {
  id: string;
  label: string;
};

type LoginToggleProps = {
  options: ToggleOption[];
  defaultSelected?: string;
  onToggle?: (selectedId: string) => void;
};

export default function LoginToggle({ 
  options, 
  defaultSelected, 
  onToggle 
}: LoginToggleProps) {
  const [selected, setSelected] = useState<string>(defaultSelected || options[0]?.id || '');

  const handleToggle = (id: string) => {
    setSelected(id);
    if (onToggle) {
      onToggle(id);
    }
  };

  return (
    <div className="flex w-full max-w-md">
      <div className="flex w-full rounded overflow-hidden">
        {options.map((option) => (
          <button
            key={option.id}
            className={`
              w-full h-10 px-4 text-sm font-medium transition-colors duration-200
              ${selected === option.id 
                ? 'bg-[#0088B1] text-[#F8F8F8]' 
                : 'bg-[#F8F8F8] text-[#161D1F] hover:bg-gray-100'}
            `}
            onClick={() => handleToggle(option.id)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}