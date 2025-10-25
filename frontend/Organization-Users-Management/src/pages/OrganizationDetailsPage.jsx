// src/pages/OrganizationDetailsPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TabNavigation from "../components/ui/TabNavigation";
import ProfileHeader from "../components/organizations/ProfileHeader";
import InfoCard from "../components/ui/InfoCard";
import InputWithLabel from "../components/ui/InputWithLabel";
import SelectWithLabel from "../components/ui/SelectWithLabel";
import { SparklesIcon } from "@heroicons/react/24/outline"; // Example icon for "Maximum Allowed Coordinators"

const OrganizationDetailsPage = () => {
  const { id } = useParams(); // Get the organization ID from the URL
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("basic-details"); // Manage active tab

  // --- Mock Data Fetch (Replace with actual API call) ---
  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        setLoading(true);
        // In a real app, you'd fetch from your API:
        // const data = await getOrganizationById(id);
        // setOrganization(data);

        // Mock delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Mock data
        setOrganization({
          id: id,
          name: "Massachusetts Institute of Technology",
          slug: "gitam",
          email: "gitam@gitam.in",
          contact: "+91 9678456543",
          website: "Gitam.edu",
          logo_url:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/MIT_seal.svg/1200px-MIT_seal.svg.png", // Example logo
          status: "Active",
          primaryAdminName: "Taylor James",
          primaryAdminMobile: "+91 93473294913",
          supportEmail: "gitam@gitam.com",
          alternativePhone: "+91 93473294913",
          maxAllowedCoordinators: "5",
          timezone: "India Standard Time",
          region: "Asia/Colombo",
          language: "English",
          officialWebsiteURL: "gitam.com",
        });
      } catch (err) {
        setError("Failed to fetch organization details.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrganization();
  }, [id]);

  const handleStatusChange = () => {
    console.log("Change status for:", organization.name);
    // Implement logic to change organization status (e.g., via API)
  };

  const handleEditProfileHeader = () => {
    console.log("Edit profile header details for:", organization.name);
    // Implement logic to open an edit modal/form for header details
  };

  const handleEditBasicDetails = () => {
    console.log("Edit basic details for:", organization.name);
    // Implement logic to open an edit modal/form for basic details
  };

  // Tabs for sub-navigation on this page
  const tabs = [
    { name: "Basic details", href: `/organizations/${id}` },
    { name: "Users", href: `/organizations/${id}/users` },
  ];

  if (loading)
    return (
      <div className="text-center p-4">Loading organization details...</div>
    );
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;
  if (!organization)
    return <div className="text-center p-4">Organization not found.</div>;

  return (
    <div className="space-y-6">
      {/* Top Profile Header Section */}
      <ProfileHeader
        organization={organization}
        onStatusChange={handleStatusChange}
        onEdit={handleEditProfileHeader}
      />

      {/* Basic Details / Users Tabs */}
      <TabNavigation tabs={tabs} />

      {/* Conditionally render content based on active tab */}
      {activeTab === "basic-details" && (
        <div className="space-y-6 mt-6">
          {/* Profile Card */}
          <InfoCard title="Profile" showEdit onEdit={handleEditBasicDetails}>
            {/* You can add a decorative element like the paper plane here */}
            <div className="absolute top-6 right-16 z-0 hidden lg:block">
              <SparklesIcon className="h-10 w-10 text-yellow-300 transform rotate-45 opacity-50" />
            </div>
            <InputWithLabel
              label="Organization name"
              name="profileOrgName"
              value={organization.name}
              disabled
            />
            <InputWithLabel
              label="Organization SLUG"
              name="profileOrgSlug"
              value={organization.slug}
              disabled
            />
          </InfoCard>

          {/* Organization Details Card */}
          <InfoCard
            title="Organization details"
            showEdit
            onEdit={handleEditBasicDetails}
          >
            <InputWithLabel
              label="Organization name"
              name="detailsOrgName"
              value={organization.name}
              disabled
            />
            <InputWithLabel
              label="Organization SLUG"
              name="detailsOrgSlug"
              value={organization.slug}
              disabled
            />
          </InfoCard>

          {/* Contact Details Card */}
          <InfoCard
            title="Contact details"
            showEdit
            onEdit={handleEditBasicDetails}
          >
            <InputWithLabel
              label="Primary Admin name"
              name="primaryAdminName"
              value={organization.primaryAdminName}
              disabled
            />
            <InputWithLabel
              label="Primary Admin Mob. id"
              name="primaryAdminMobile"
              value={organization.primaryAdminMobile}
              disabled
            />
            <InputWithLabel
              label="Support Email ID"
              name="supportEmail"
              value={organization.supportEmail}
              disabled
            />
            {/* Phone numbers with country code prefix */}
            <div className="sm:col-span-1">
              {" "}
              {/* Wrapper for phone numbers */}
              <label
                htmlFor="phoneNo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone no
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                  +91
                </span>
                <input
                  type="text"
                  name="phoneNo"
                  id="phoneNo"
                  value={organization.primaryAdminMobile.substring(4)} // Mocking, extract number part
                  disabled
                  className="block w-full rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
                />
              </div>
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="alternativePhone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Alternative phone no
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                  +91
                </span>
                <input
                  type="text"
                  name="alternativePhone"
                  id="alternativePhone"
                  value={organization.alternativePhone.substring(4)} // Mocking
                  disabled
                  className="block w-full rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </InfoCard>

          {/* Maximum Allowed Coordinators Card */}
          <InfoCard
            title="Maximum Allowed Coordinators"
            showEdit
            onEdit={handleEditBasicDetails}
          >
            <SelectWithLabel
              label="Max active Coordinators allowed"
              name="maxCoordinators"
              value={organization.maxAllowedCoordinators}
              options={[
                { value: "3", label: "Upto 3 Coordinators" },
                { value: "5", label: "Upto 5 Coordinators" },
                { value: "10", label: "Upto 10 Coordinators" },
              ]}
              disabled
            />
          </InfoCard>

          {/* Timezone Card */}
          <InfoCard title="Timezone" showEdit onEdit={handleEditBasicDetails}>
            <SelectWithLabel
              label="Common name"
              name="timezoneCommon"
              value={organization.timezone}
              options={[
                { value: "India Standard Time", label: "India Standard Time" },
                { value: "UTC", label: "Coordinated Universal Time" },
              ]}
              disabled
            />
            <SelectWithLabel
              label="Region"
              name="timezoneRegion"
              value={organization.region}
              options={[
                { value: "Asia/Kolkata", label: "Asia/Kolkata" },
                { value: "Asia/Colombo", label: "Asia/Colombo" },
              ]}
              disabled
            />
          </InfoCard>

          {/* Language Card */}
          <InfoCard title="Language" showEdit onEdit={handleEditBasicDetails}>
            <SelectWithLabel
              label="Choose the language for organization"
              name="language"
              value={organization.language}
              options={[
                { value: "English", label: "English" },
                { value: "Hindi", label: "Hindi" },
              ]}
              disabled
            />
          </InfoCard>

          {/* Official Website URL Card */}
          <InfoCard
            title="Official website URL"
            showEdit
            onEdit={handleEditBasicDetails}
          >
            <InputWithLabel
              label="website URL"
              name="officialWebsiteURL"
              value={organization.officialWebsiteURL}
              disabled
            />
          </InfoCard>
        </div>
      )}

      {/* You would render the Users tab content here when activeTab === 'users' */}
      {activeTab === "users" && (
        <div className="mt-6 p-4 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold">Users List will go here...</h2>
          {/* Add your Users table or components here */}
        </div>
      )}
    </div>
  );
};

export default OrganizationDetailsPage;
