// src/components/ui/InfoCard.jsx
import React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

const InfoCard = ({ title, children, showEdit = false, onEdit }) => {
  return (
    // This is the main card container
    <div className="bg-white shadow-sm rounded-lg relative">
      {/* Header with Title and Edit Button */}
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {showEdit && (
          <button
            onClick={onEdit}
            className="text-gray-400 hover:text-indigo-600 focus:outline-none"
            aria-label={`Edit ${title}`}
          >
            <PencilSquareIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Content area for the form */}
      <div className="p-6">{children}</div>
    </div>
  );
};

export default InfoCard;
