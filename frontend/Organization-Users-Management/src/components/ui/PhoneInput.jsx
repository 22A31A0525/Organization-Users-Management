// src/components/ui/PhoneInput.jsx
import React from "react";

const PhoneInput = ({ label, name, value, onChange, disabled = false }) => {
  // Simple logic to remove +91 prefix for display
  const number = value.startsWith("+91") ? value.substring(3) : value;

  const handleNumChange = (e) => {
    // Re-attach prefix when sending data back up
    onChange({ target: { name, value: `+91${e.target.value}` } });
  };

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
          +91
        </span>
        <input
          type="tel"
          name={name}
          id={name}
          value={number}
          onChange={handleNumChange}
          disabled={disabled}
          className="block pl-2.5  w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-600 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-50 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default PhoneInput;
