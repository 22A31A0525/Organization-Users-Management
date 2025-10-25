// src/components/ui/Pagination.jsx
import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <nav
      className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="mb-2 sm:mb-0">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{startItem}</span> to{" "}
          <span className="font-medium">{endItem}</span> of{" "}
          <span className="font-medium">{totalItems}</span> results
        </p>
      </div>

      <div className="flex justify-between space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoPrevious}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeftIcon className="h-5 w-5" />
          <span className="ml-1">Previous</span>
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="mr-1">Next</span>
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
