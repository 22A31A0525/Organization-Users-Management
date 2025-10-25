// src/components/organizations/ProfileHeader.jsx
import React from "react";
import StatusPill from "../ui/StatusPill"; // Reusing your StatusPill
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid"; // Solid icons for details
import { PencilSquareIcon } from "@heroicons/react/24/outline"; // Outline icon for edit

const ProfileHeader = ({ organization, onStatusChange, onEdit }) => {
  if (!organization) return null;

  return (
    <div className="bg-white shadow rounded-lg p-6 relative">
      {/* Edit icon button */}
      <button
        onClick={onEdit}
        className="absolute top-6 right-6 text-gray-400 hover:text-indigo-600 focus:outline-none"
        aria-label="Edit Profile Header"
      >
        <PencilSquareIcon className="h-5 w-5" />
      </button>

      <div className="flex items-start">
        {/* Organization Logo */}
        <div className="flex-shrink-0 mr-4">
          {organization.logo_url ? (
            <img
              className="h-20 w-20 rounded-lg object-cover"
              src={organization.logo_url}
              alt={organization.name}
            />
          ) : (
            <div className="h-20 w-20 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 text-2xl font-bold">
              {organization.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Organization Details */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {organization.name}
          </h2>
          <div className="mt-1 text-sm text-gray-600 space-y-1">
            <div className="flex items-center">
              <EnvelopeIcon className="h-4 w-4 mr-1 text-gray-400" />
              <span>{organization.email}</span>
            </div>
            <div className="flex items-center">
              <PhoneIcon className="h-4 w-4 mr-1 text-gray-400" />
              <span>{organization.contact}</span>
            </div>
            {organization.website && (
              <a
                href={organization.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                {organization.website}
              </a>
            )}
          </div>
          <div className="mt-3 flex items-center space-x-2">
            <StatusPill status={organization.status} />
            <button
              onClick={onStatusChange}
              className="text-indigo-600 text-sm font-medium hover:text-indigo-800"
            >
              Change status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
