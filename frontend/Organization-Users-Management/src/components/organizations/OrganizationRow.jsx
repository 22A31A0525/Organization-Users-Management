// src/components/organizations/OrganizationRow.jsx
import React from "react";
import StatusPill from "../ui/StatusPill";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";

const OrganizationRow = ({ organization, onView, onDelete }) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-4 text-sm text-gray-600">{organization.id}</td>
      <td className="py-3 px-4 text-sm text-gray-900 flex items-center">
        {organization.logo_url ? (
          <img
            src={`http://localhost:8000${organization.logo_url}`}
            alt="Org Logo"
            className="h-6 w-6 rounded-full mr-2"
          />
        ) : (
          <span className="h-6 w-6 rounded-full mr-2 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
            {organization.name.charAt(0)}
          </span>
        )}
        {organization.name}
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">
        {organization.pending_requests || 0} pending requests
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">
        <StatusPill status={organization.status} />
      </td>
      <td className="py-3 px-4 text-sm text-gray-600 flex items-center space-x-2">
        <button
          onClick={() => onView(organization.id)}
          className="text-gray-500 hover:text-indigo-600"
        >
          <EyeIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => onDelete(organization.id)}
          className="text-gray-500 hover:text-red-600"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </td>
    </tr>
  );
};

export default OrganizationRow;
