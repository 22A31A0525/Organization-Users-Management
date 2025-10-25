import api from "./api"; // Import the configured api.js file

// --- Organization CRUD Functions ---

// GET /organizations/
export const getOrganizations = () => {
  return api.get("/organizations/");
};

// GET /organizations/{org_id}
export const getOrganizationDetails = (id) => {
  return api.get(`/organizations/${id}`);
};

// POST /organizations/
export const createOrganization = (orgData) => {
  const apiData = {
    name: orgData.name,
    slug: orgData.slug,
    support_email: orgData.email,
    phone: orgData.contact,
  };
  return api.post("/organizations/", apiData);
};

// PUT /organizations/{org_id}
export const updateOrganization = (id, formData) => {
  const apiData = {
    name: formData.name,
    slug: formData.slug,
    status: formData.status,

    support_email: formData.supportEmail, // Map supportEmail
    contact_no: formData.phone, // Map phone
    alternative_phone: formData.alternativePhone,

    primary_admin_name: formData.primaryAdminName,
    primary_admin_email: formData.primaryAdminEmail,

    website_url: formData.officialWebsiteURL, // Map officialWebsiteURL

    max_coordinators: formData.maxCoordinators,
    timezone: formData.timezone,
    region: formData.region,
    language: formData.language,
  };

  // Send the correctly-mapped 'apiData' to the backend
  return api.put(`/organizations/${id}`, apiData);
};

// DELETE /organizations/{org_id}
export const deleteOrganization = (id) => {
  return api.delete(`/organizations/${id}`);
};

// // POST /organizations/{org_id}/logo
export const uploadLogo = (id, file) => {
  const formData = new FormData();
  formData.append("file", file);

  // For file uploads, we must override the 'Content-Type' header
  return api.put(`/organizations/${id}/logo`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
