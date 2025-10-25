// src/components/organizations/ProfileHeader.jsx
import React, { useRef } from "react"; // <-- 1. Import useRef
import StatusPill from "../ui/StatusPill";
import {
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
} from "@heroicons/react/20/solid";
import { PencilIcon } from "@heroicons/react/24/outline"; // <-- 2. Import PencilIcon

// <-- 3. Add onLogoChange to props
const ProfileHeader = ({ organization, onStatusChange, onLogoChange }) => {
  if (!organization) return null;
  console.log(organization);
  // 4. Create a ref for the hidden file input
  const fileInputRef = useRef(null);

  const handleEditClick = () => {
    // 5. Click the hidden input when the edit button is clicked
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    // 6. Get the selected file
    const file = event.target.files[0];
    if (file) {
      // 7. Pass the file up to the parent page
      onLogoChange(file);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-start">
        {/* Organization Logo */}
        <div className="flex-shrink-0 mr-4">
          {/* 8. Add 'relative' and 'group' for hover effect */}
          <div className="relative group">
            {organization.logo_url ? (
              <img
                className="h-24 w-24 rounded-lg object-cover"
                src={`http://localhost:8000${organization.logo_url}`}
                alt={organization.name}
              />
            ) : (
              <div className="h-24 w-24 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 text-3xl font-bold">
                {organization.name.charAt(0)}
              </div>
            )}

            {/* 9. The "Edit" button overlay */}
            <button
              type="button"
              onClick={handleEditClick}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"
              aria-label="Change organization logo"
            >
              <PencilIcon className="h-6 w-6 text-white" />
            </button>

            {/* 10. The hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/jpeg, image/gif"
            />
          </div>
        </div>

        {/* Organization Details and Status (No change from here) */}
        <div className="flex flex-col flex-grow">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {organization.name}
            </h2>
            <div className="flex items-center space-x-2">
              <StatusPill status={organization.status} />
              <button
                onClick={onStatusChange}
                className="text-indigo-600 text-sm font-medium hover:text-indigo-800"
              >
                Change status
              </button>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600 space-y-1">
            <div className="flex items-center">
              <EnvelopeIcon className="h-4 w-4 mr-1 text-gray-400" />
              <span>{organization.email}</span>
            </div>
            <div className="flex items-center">
              <PhoneIcon className="h-4 w-4 mr-1 text-gray-400" />
              <span>{organization.phone}</span>
            </div>
            {organization.website && (
              <a
                href={`${organization.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-indigo-600 hover:underline"
              >
                <GlobeAltIcon className="h-4 w-4 mr-1" />
                {organization.website}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
