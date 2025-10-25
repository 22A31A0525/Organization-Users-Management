// src/pages/ManageOrganizationsPage.jsx
import React, { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/20/solid"; // Use solid for the button
import OrganizationTable from "../components/organizations/OrganizationTable";
import Button from "../components/ui/Button";
import Layout from "../components/layout/Layout";
import default_organization from "../assests/corporate.png";
import SlideOver from "../components/ui/SlideOver";
import AddOrganizationForm from "../components/organizations/AddOrganizationForm";

const ManageOrganizationsPage = () => {
  // ... (all your state and functions: useState, useEffect, etc.) ...

  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setLoading(true);
        // Mock Data
        const allMockData = [
          {
            id: 1,
            name: "Organization Name 1",
            logo_url: default_organization,
            pending_requests: 45,
            status: "Active",
          },
          {
            id: 2,
            name: "Organization Name 2",
            logo_url: default_organization,
            pending_requests: 45,
            status: "Blocked",
          },
          {
            id: 3,
            name: "Organization Name 3",
            logo_url: default_organization,
            pending_requests: 45,
            status: "Inactive",
          },
          {
            id: 4,
            name: "Organization Name 4",
            logo_url: default_organization,
            pending_requests: 10,
            status: "Active",
          },
          {
            id: 5,
            name: "Organization Name 5",
            logo_url: default_organization,
            pending_requests: 2,
            status: "Active",
          },
        ];

        const paginatedData = allMockData.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        );
        setOrganizations(paginatedData);
        setTotalItems(allMockData.length);
      } catch (err) {
        setError("Failed to fetch organizations.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, [currentPage]);

  const handleAddOrganizationClick = () => {
    setIsAddModalOpen(true); // Open the modal
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false); // Close the modal
  };

  const handleSaveNewOrganization = async (formData) => {
    console.log("Attempting to save new organization:", formData);
    setIsSubmitting(true);
    // try {
    //   // --- 4. Call your API to create the organization ---
    //   // const newOrg = await createOrganization(formData);
    //   // console.log('Organization created:', newOrg);

    //   // For now, mock a delay and success
    //   await new Promise(resolve => setTimeout(resolve, 1000));
    //   alert(`Organization "${formData.name}" added successfully (mock)!`);

    //   setIsAddModalOpen(false); // Close modal on success
    //   // --- 5. Re-fetch data to update the table ---
    //   // setCurrentPage(1); // Optionally go back to first page
    //   // fetchOrganizations(); // This will re-trigger the useEffect
    //   window.location.reload(); // Simple reload for mock, use actual re-fetch

    // } catch (err) {
    //   console.error('Error adding organization:', err);
    //   alert('Failed to add organization.'); // Basic error handling
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  const handleView = (orgId) => console.log("View organization:", orgId);
  const handleDelete = (orgId) => console.log("Delete organization:", orgId);

  const paginationProps = {
    currentPage: currentPage,
    totalItems: totalItems,
    itemsPerPage: itemsPerPage,
    onPageChange: (newPage) => setCurrentPage(newPage),
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  return (
    <>
      <Layout />
      <div className=" max-w-[76rem] mx-auto shadow rounded-lg ">
        <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl  text-gray-900">B2B organizations</h3>
          <Button
            onClick={handleAddOrganizationClick}
            className="flex items-center"
          >
            <PlusIcon className="h-5 w-5" />
            Add organization
          </Button>
        </div>

        <OrganizationTable
          organizations={organizations}
          onView={handleView}
          onDelete={handleDelete}
          paginationProps={paginationProps}
        />

        <SlideOver
          isOpen={isAddModalOpen}
          onClose={handleCloseAddModal}
          title="Add Organization"
        >
          <AddOrganizationForm
            onSave={handleSaveNewOrganization}
            onCancel={handleCloseAddModal}
            isLoading={isSubmitting}
          />
        </SlideOver>
      </div>
    </>
  );
};

export default ManageOrganizationsPage;
