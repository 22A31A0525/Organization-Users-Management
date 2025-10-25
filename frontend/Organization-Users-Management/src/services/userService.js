// src/services/userService.js
import api from "./api";

/**
 * Fetches all users for a specific organization.
 * Maps to: GET /users/by-organization/{org_id}
 */
export const getUsersForOrganization = (orgId) => {
  return api.get(`/users/by-organization/${orgId}`);
};

/**
 * Creates a new user for an organization.
 * Maps to: POST /users/
 */
export const createUser = (userData, orgId) => {
  // Map frontend form data to what the backend API expects
  const apiData = {
    name: userData.name,
    email: userData.email,
    role: userData.role,
    organization_id: orgId,
    password: "defaultPassword123", // Set a default password
  };
  return api.post("/users/", apiData);
};

/**
 * Updates an existing user's details.
 * Maps to: PUT /users/{user_id}
 */
export const updateUser = (userId, userData) => {
  // Map frontend form data to the backend schema
  const apiData = {
    name: userData.name,
    email: userData.email,
    role: userData.role,
  };
  return api.put(`/users/${userId}`, apiData);
};

/**
 * Deletes a user.
 * Maps to: DELETE /users/{user_id}
 */
export const deleteUser = (userId) => {
  return api.delete(`/users/${userId}`);
};
