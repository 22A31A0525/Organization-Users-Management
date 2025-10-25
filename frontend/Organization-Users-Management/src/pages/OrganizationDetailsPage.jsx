// src/pages/OrganizationDetailsPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Import all our components
import ProfileHeader from "../components/organizations/ProfileHeader";
import TabNavigation from "../components/ui/TabNavigation";
import InfoCard from "../components/ui/InfoCard";
import InputWithLabel from "../components/ui/InputWithLabel";
import SelectWithLabel from "../components/ui/SelectWithLabel";
import PhoneInput from "../components/ui/PhoneInput";
import Layout from "../components/layout/Layout";
import logo_url from "../assests/corporate.png";
import UsersList from "../components/users/UserList";
import ChangeStatusModal from "../components/organizations/ChangeStatusModal";
import {
  updateOrganization,
  uploadLogo,
} from "../services/organizationService";

import { getOrganizationDetails } from "../services/organizationService";
import api from "../services/api";

// This is the component for the "Basic details" tab
const BasicDetailsForm = ({ organization }) => {
  const [formData, setFormData] = useState(organization);
  const [isEditing, setIsEditing] = useState(false); // Controls if form is editable

  useEffect(() => {
    // Update form data if organization prop changes
    setFormData(organization);
  }, [organization]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = () => {
    setIsEditing(true); // Enable editing
  };

  // This function goes inside your BasicDetailsForm component
  const handleSave = async (e) => {
    e.preventDefault();

    console.log("Saving data:", formData);

    try {
      // 2. Call your API service with the org's ID and the form data
      const response = await updateOrganization(organization.id, formData);

      // 3. Handle a successful save
      setIsEditing(false); // Disable editing
      alert("Profile updated successfully!");

      // 4. Pass the new data back to the parent page to update its state
      // onUpdateSuccess(response.data);
    } catch (err) {
      // 5. Handle any errors from the API
      console.error("Failed to update organization:", err);
      alert("Error: Could not save changes. Please try again.");
    } finally {
      // 6. Always set loading state back to false
      window.location.reload();
    }
  };

  const handleCancel = () => {
    setFormData(organization); // Revert changes
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSave}>
      <InfoCard
        title="Profile"
        showEdit={!isEditing} // Show edit button only when NOT editing
        onEdit={handleEditClick}
      >
        {/* This div separates the sections */}
        <div className="space-y-6">
          {/* --- Organization details section --- */}
          <div>
            <h4 className="text-base font-semibold text-gray-700">
              Organization details
            </h4>
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              <InputWithLabel
                label="Organization name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <InputWithLabel
                label="Organization SLUG"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                disabled={true}
              />
            </div>
          </div>

          {/* --- Contact details section --- */}
          <div>
            <h4 className="text-base font-semibold text-gray-700">
              Contact details
            </h4>
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              <InputWithLabel
                label="Primary Admin name"
                name="primaryAdminName"
                value={formData.primaryAdminName}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <InputWithLabel
                label="Primary Admin Mail-id"
                name="primaryAdminEmail"
                type="email"
                value={formData.primaryAdminEmail}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <InputWithLabel
                label="Support Email ID"
                name="supportEmail"
                type="email"
                value={formData.supportEmail}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <PhoneInput
                label="Phone no"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <PhoneInput
                label="Alternative phone no"
                name="alternativePhone"
                value={formData.alternativePhone}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* --- Maximum Allowed Coordinators --- */}
          <div>
            <h4 className="text-base font-semibold text-gray-700">
              Maximum Allowed Coordinators
            </h4>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2">
              <SelectWithLabel
                label="Max active Coordinators allowed"
                name="maxCoordinators"
                value={formData.maxCoordinators}
                onChange={handleChange}
                options={[
                  { value: "3", label: "Upto 3 Coordinators" },
                  { value: "5", label: "Upto 5 Coordinators" },
                  { value: "10", label: "Upto 10 Coordinators" },
                ]}
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* --- Timezone --- */}
          <div>
            <h4 className="text-base font-semibold text-gray-700">Timezone</h4>
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              <SelectWithLabel
                label="Common name"
                name="timezone"
                value={formData.timezone}
                onChange={handleChange}
                options={[
                  {
                    value: "India Standard Time",
                    label: "India Standard Time",
                  },
                  { value: "UTC", label: "Coordinated Universal Time" },
                ]}
                disabled={!isEditing}
              />
              <SelectWithLabel
                label="Region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                options={[
                  { value: "Asia/Kolkata", label: "Asia/Kolkata" },
                  { value: "Asia/Colombo", label: "Asia/Colombo" },
                ]}
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* --- Language --- */}
          <div>
            <h4 className="text-base font-semibold text-gray-700">Language</h4>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2">
              <SelectWithLabel
                label="Choose the language for organization"
                name="language"
                value={formData.language}
                onChange={handleChange}
                options={[
                  { value: "English", label: "English" },
                  { value: "Hindi", label: "Hindi" },
                ]}
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* --- Official website URL --- */}
          <div>
            <h4 className="text-base font-semibold text-gray-700">
              Official website URL
            </h4>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2">
              <InputWithLabel
                label="website URL"
                name="officialWebsiteURL"
                value={formData.officialWebsiteURL}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        {/* --- Save/Cancel Buttons --- */}
        {isEditing && (
          <div className="mt-6 flex items-center justify-end gap-x-4 border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        )}
      </InfoCard>
    </form>
  );
};

// --- Main Page Component ---
const OrganizationDetailsPage = () => {
  const { id } = useParams();
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // This state will track the active tab
  const [activeTab, setActiveTab] = useState("basic-details");
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isSavingStatus, setIsSavingStatus] = useState(false); // Loading state for save

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        setLoading(true);

        // 1. Fetch the data from your API
        //    (response.data holds your JSON object)
        const response = await getOrganizationDetails(id);
        const apiData = response.data;

        // 2. Set the state using the data from the API
        //    We map backend names (e.g., contact_no) to frontend names (e.g., phone)
        //    We use '|| ""' to prevent 'null' values from breaking the form

        setOrganization({
          id: apiData.id,
          name: apiData.name || "",
          slug: apiData.slug || "",
          status: apiData.status || "Inactive",
          logo_url: apiData.logo_url,

          // Map your JSON response to your form state
          email: apiData.support_email || "", // Your form's 'email'
          phone: apiData.contact_no || "", // Your form's 'phone'
          website: apiData.website_url || "", // Your form's 'website'

          primaryAdminName: apiData.primary_admin_name || "",
          primaryAdminEmail: apiData.primary_admin_email || "",
          supportEmail: apiData.support_email || "", // This field from your form
          alternativePhone: apiData.alternative_phone || "",
          officialWebsiteURL: apiData.website_url || "", // This field from your form

          // Set defaults for fields not in your API response
          maxCoordinators: apiData.max_coordinators || "1", // Default to '1'
          timezone: apiData.timezone || "India Standard Time",
          region: apiData.region || "Asia/Colombo", // 'region' wasn't in your JSON
          language: apiData.language || "English", // 'language' wasn't in your JSON
        });
      } catch (err) {
        console.error("Failed to fetch organization:", err); // Log the real error
        setError("Failed to fetch organization details.");
      } finally {
        setLoading(false);
      }
    };

    // Only run the fetch if 'id' is available
    if (id) {
      fetchOrganization();
    }
  }, [id]); // This hook will re-run if the 'id' in the URL changes

  const handleStatusChange = () => {
    setIsStatusModalOpen(true);
  };

  // --- 4. Handler to CLOSE the Status Modal ---
  const handleCloseStatusModal = () => {
    setIsStatusModalOpen(false);
  };

  const handleSaveStatus = async (newStatus) => {
    if (!organization) return;

    setIsSavingStatus(true);
    try {
      // Prepare data for the generic update endpoint
      const updateData = { status: newStatus };

      // Call the API to update the organization with the new status
      const response = await updateOrganization(organization.id, updateData);

      // Update the local state with the response from the API
      setOrganization(response.data);
      setIsStatusModalOpen(false); // Close modal on success
      alert("Status updated successfully!");
    } catch (err) {
      console.error("Failed to update status:", err.response || err);
      alert(
        `Error: ${err.response?.data?.detail || "Could not update status."}`
      );
    } finally {
      setIsSavingStatus(false);
      window.location.reload();
    }
  };

  const handleLogoChange = async (file) => {
    if (!organization) return;

    console.log("Uploading file:", file.name);
    try {
      // Call the API service you defined earlier
      const response = await uploadLogo(organization.id, file);

      alert("Logo updated successfully!");
      window.location.reload();
    } catch (err) {
      console.error("Failed to upload logo:", err);
      alert("Error: Could not upload logo.");
    }
  };

  // Tabs configuration
  const tabs = [
    { name: "Basic details", id: "basic-details" },
    { name: "Users", id: "users" },
  ];

  if (loading)
    return (
      <div className="text-center p-4">Loading organization details...</div>
    );
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;
  if (!organization)
    return <div className="text-center p-4">Organization not found.</div>;

  return (
    <>
      <Layout />
      <div className="max-w-[76rem] mx-auto">
        {/* 1. Top Profile Header */}
        <ProfileHeader
          organization={organization}
          onStatusChange={handleStatusChange}
          onLogoChange={handleLogoChange}
        />

        {/* 2. "Basic details" / "Users" Tab Navigation */}
        <div>
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === tab.id
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* 3. Main Content (The Form or User List) */}
        <div className="mt-6">
          {activeTab === "basic-details" && (
            <BasicDetailsForm organization={organization} />
          )}
          {activeTab === "users" && <UsersList organization={organization} />}{" "}
          {/* <-- Pass organization prop */}
        </div>

        <ChangeStatusModal
          isOpen={isStatusModalOpen}
          onClose={handleCloseStatusModal}
          currentStatus={organization.status}
          onSave={handleSaveStatus}
          isLoading={isSavingStatus}
        />
      </div>
    </>
  );
};

export default OrganizationDetailsPage;
