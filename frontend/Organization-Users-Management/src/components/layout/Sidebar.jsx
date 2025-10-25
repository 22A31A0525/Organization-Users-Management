// src/components/layout/SubNavigation.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Manage B2B organizations", href: "/organizations" },
];

const SubNavigation = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-12 items-center space-x-8">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `
                inline-flex items-center 
                h-full  
                border-b-2 
                text-sm font-medium
                ${
                  isActive
                    ? "border-indigo-600 text-indigo-600" // Active: Purple border at the bottom
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" // Inactive: Transparent border
                }
              `
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default SubNavigation;
