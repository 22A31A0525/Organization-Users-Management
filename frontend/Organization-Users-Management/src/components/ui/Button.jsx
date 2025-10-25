// src/components/ui/Button.jsx
import React from "react";

const Button = ({
  children,
  className = "",
  variant = "primary",
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-opacity-75 transition ease-in-out duration-150";
  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-200",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
