// src/components/ui/TabNavigation.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const TabNavigation = ({ tabs }) => {
  return (
    <div>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <NavLink
              key={tab.name}
              to={tab.href}
              end // Use 'end' to match only the exact path for "Basic details" when on dynamic route
              className={({ isActive }) =>
                `whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${
                  isActive
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`
              }
            >
              {tab.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TabNavigation;
