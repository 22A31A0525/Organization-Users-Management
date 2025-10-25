// src/components/users/UserRow.jsx
import React from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import RolePill from "../ui/RolePill"; // Import the new RolePill

const UserRow = ({ user, index, onEdit, onDelete }) => {
  const isActionsDisabled = user.isActionsDisabled; // New prop to control action buttons

  return (
    <tr className="border-b hover:bg-gray-50">
      {/* Sr. No */}
      <td className="whitespace-nowrap py-3 px-4 text-sm font-medium text-gray-900">
        {index + 1}
      </td>

      {/* User name */}
      <td className="whitespace-nowrap py-3 px-4 text-sm text-gray-900">
        {user.name}
      </td>

      {/* Role (using RolePill) */}
      <td className="whitespace-nowrap py-3 px-4 text-sm text-gray-600">
        <RolePill role={user.role} />
      </td>

      {/* Action Buttons */}
      <td className="whitespace-nowrap py-3 px-4 text-sm text-gray-600 space-x-3">
        <button
          onClick={() => onEdit(user)}
          className={`text-gray-500 hover:text-indigo-600 ${
            isActionsDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isActionsDisabled}
          title={isActionsDisabled ? "Actions disabled" : "Edit user"}
        >
          <span className="sr-only">Edit</span>
          <PencilSquareIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => onDelete(user)}
          className={`text-gray-500 hover:text-red-600 ${
            isActionsDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isActionsDisabled}
          title={isActionsDisabled ? "Actions disabled" : "Delete user"}
        >
          <span className="sr-only">Delete</span>
          <TrashIcon className="h-5 w-5" />
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
