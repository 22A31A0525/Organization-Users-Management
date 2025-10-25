// src/components/organizations/OrganizationTable.jsx
import React from "react";
import OrganizationRow from "./OrganizationRow";
import Pagination from "../ui/Pagination";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";

const OrganizationTable = ({
  organizations,
  onView,
  onDelete,
  paginationProps,
}) => {
  return (
    <div className="bg-white  overflow-hidden">
      <div className="flex justify-between items-center p-4"></div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-700  tracking-wider">
                Sr. No
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-700  tracking-wider">
                Organizations
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-700  tracking-wider">
                Pending requests
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-700  tracking-wider flex items-center">
                Status
                <FunnelIcon className="ml-1 h-4 w-4 text-gray-400" />
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-700  tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {organizations.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="py-4 text-center text-sm text-gray-500"
                >
                  No organization Found.
                </td>
              </tr>
            ) : (
              organizations.map((org) => (
                <OrganizationRow
                  key={org.id}
                  organization={org}
                  onView={onView}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={paginationProps.currentPage}
        totalItems={paginationProps.totalItems}
        itemsPerPage={paginationProps.itemsPerPage}
        onPageChange={paginationProps.onPageChange}
      />
    </div>
  );
};

export default OrganizationTable;
