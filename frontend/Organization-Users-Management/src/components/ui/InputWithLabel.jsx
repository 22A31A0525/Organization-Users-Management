// src/components/ui/InputWithLabel.jsx
import React from "react";

const InputWithLabel = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  disabled = false,
}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm  leading-6 text-gray-500">
        {label}
      </label>
      <div className="mt-1">
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="block w-full pl-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default InputWithLabel;
