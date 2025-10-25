// src/pages/ManageOrganizationsPage.jsx
import React, { useState, useEffect, useCallback } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

// Component Imports
import OrganizationTable from "../components/organizations/OrganizationTable";
import Button from "../components/ui/Button";
import Layout from "../components/layout/Layout"; // Assuming Layout is used in App.jsx
import SlideOver from "../components/ui/SlideOver";
import AddOrganizationForm from "../components/organizations/AddOrganizationForm";

// Service Imports
import {
  createOrganization,
  getOrganizations,
  deleteOrganization,
} from "../services/organizationService";

const ManageOrganizationsPage = () => {
  // State Variables
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // For general page errors (fetch, delete)
  const [formError, setFormError] = useState(null); // For errors specific to the Add form
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5; // Or whatever you prefer
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // --- Data Fetching ---
  const fetchOrganizations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors on fetch start
      const response = await getOrganizations();

      setTotalItems(response.data.length); // Get total count before pagination

      // Calculate pagination slice
      const paginatedData = response.data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
      setOrganizations(paginatedData);

      // Handle edge case: Go to previous page if current page becomes empty after deletion
      if (paginatedData.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      console.error("Failed to fetch organizations:", err);
      setError(
        "Failed to load organizations. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }, [currentPage]); // Dependency: re-fetch if currentPage changes

  // Initial data fetch on component mount
  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]); // Run whenever fetchOrganizations changes (due to currentPage)

  // --- Modal Handlers ---
  const handleAddOrganizationClick = () => {
    setFormError(null); // Clear any old form errors when opening
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setFormError(null); // Clear errors when closing manually
  };

  // --- CRUD Handlers ---
  const handleSaveNewOrganization = async (formData) => {
    setIsSubmitting(true);
    setFormError(null); // Clear previous errors
    try {
      await createOrganization(formData);
      setIsAddModalOpen(false); // Close modal on success

      // Go to first page to see the new item & refetch
      if (currentPage !== 1) {
        setCurrentPage(1); // This will trigger useEffect to refetch
      } else {
        fetchOrganizations(); // Already on page 1, just refetch
      }
      alert("Organization added successfully!");
    } catch (err) {
      console.error("Error adding organization:", err.response || err);
      // Display specific backend error message if available
      if (err.response?.data?.detail) {
        setFormError(err.response.data.detail); // Show error inside the form
        alert(`Error: ${err.response.data.detail}`);
      } else {
        setFormError("An unexpected error occurred."); // Generic error
        alert("Failed to add organization.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleView = (orgId) => {
    navigate(`${orgId}`); // Navigate to the details page
  };

  const handleDelete = async (orgId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this organization and all its users?"
      )
    ) {
      return; // Stop if user cancels
    }

    try {
      await deleteOrganization(orgId);
      alert("Organization successfully deleted.");
      fetchOrganizations(); // Refetch data to update the table
    } catch (err) {
      console.error("Error deleting organization:", err.response || err);
      // Display specific backend error message if available
      if (err.response?.data?.detail) {
        setError(err.response.data.detail); // Show error above the table
        alert(`Error: ${err.response.data.detail}`);
      } else {
        setError("Failed to delete organization."); // Generic error
        alert("Failed to delete organization.");
      }
    }
  };

  // --- Pagination Props ---
  const paginationProps = {
    currentPage: currentPage,
    totalItems: totalItems,
    itemsPerPage: itemsPerPage,
    onPageChange: (newPage) => setCurrentPage(newPage),
  };

  // --- Render Logic ---
  // Initial loading state
  if (loading && organizations.length === 0) {
    return <div className="text-center p-4">Loading organizations...</div>;
  }

  // Error state (if fetch failed completely)
  if (error && organizations.length === 0) {
    return <div className="text-center p-4 text-red-600">{error}</div>;
  }

  return (
    // Note: Removed the redundant <Layout/> wrapper here, assuming it's in App.jsx
    <>
      <Layout />
      <div className=" max-w-[76rem] mx-auto shadow rounded-lg ">
        {" "}
        {/* Added space-y for consistent spacing */}
        {/* Header section with Title and Add Button */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            B2B organizations
          </h1>
          <Button
            onClick={handleAddOrganizationClick}
            className="flex items-center"
          >
            <PlusIcon className="mr-1 h-5 w-5" />
            Add organization
          </Button>
        </div>
        {/* Display general errors (like delete errors) above the table */}
        {error && (
          <div className="p-4 text-red-600 text-center bg-red-50 rounded-md">
            {error}
          </div>
        )}
        {/* Organization Table */}
        <OrganizationTable
          organizations={organizations}
          onView={handleView}
          onDelete={handleDelete}
          paginationProps={paginationProps}
        />
        {/* Add Organization Slide-Over */}
        <SlideOver
          isOpen={isAddModalOpen}
          onClose={handleCloseAddModal}
          title="Add Organization"
        >
          <AddOrganizationForm
            onSave={handleSaveNewOrganization}
            onCancel={handleCloseAddModal}
            isLoading={isSubmitting}
            apiError={formError} // Pass form-specific errors down
          />
        </SlideOver>
      </div>
    </>
  );
};

export default ManageOrganizationsPage;
