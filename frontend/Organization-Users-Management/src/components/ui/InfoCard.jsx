// src/components/ui/InfoCard.jsx
import React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline"; // For the edit icon

const InfoCard = ({ title, children, showEdit = false, onEdit }) => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6 relative">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {showEdit && (
        <button
          onClick={onEdit}
          className="absolute top-6 right-6 text-gray-400 hover:text-indigo-600 focus:outline-none"
          aria-label={`Edit ${title}`}
        >
          <PencilSquareIcon className="h-5 w-5" />
        </button>
      )}
      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        {children}
      </div>
    </div>
  );
};

export default InfoCard;
