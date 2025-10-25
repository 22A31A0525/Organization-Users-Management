// src/components/users/UsersList.jsx
import React, { useState, useEffect, useCallback } from "react"; // Import useCallback
import Button from "../ui/Button";
import { PlusIcon } from "@heroicons/react/20/solid";
import UserRow from "./UserRow";
import SlideOver from "../ui/SlideOver";
import UserForm from "./UserForm";
// --- 1. Import your new service functions ---
import {
  getUsersForOrganization,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/userService";

const UsersList = ({ organization }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // For form loading
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // --- 2. Create a re-usable fetch function ---
  const fetchUsers = useCallback(async () => {
    if (!organization?.id) return; // Don't fetch if no org

    try {
      setLoading(true);
      // Call the API
      const response = await getUsersForOrganization(organization.id);
      setUsers(response.data); // Set users from API
    } catch (err) {
      setError("Failed to fetch users.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [organization?.id]); // This function updates if organization.id changes

  // --- 3. useEffect now calls the fetch function ---
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); // Runs once on load, and if fetchUsers changes

  const handleAddUserClick = () => {
    setEditingUser(null);
    setIsSlideOverOpen(true);
  };

  const handleEditUserClick = (user) => {
    setEditingUser(user);
    setIsSlideOverOpen(true);
  };

  const handleCloseSlideOver = () => {
    setIsSlideOverOpen(false);
    setEditingUser(null);
  };

  // --- 4. Update handleSaveUser to call the API ---
  const handleSaveUser = async (userData) => {
    setIsSubmitting(true);
    try {
      if (editingUser) {
        // This is an UPDATE
        await updateUser(editingUser.id, userData);
      } else {
        // This is a CREATE
        await createUser(userData, organization.id);
      }
      handleCloseSlideOver();
      fetchUsers(); // Re-fetch the list to show changes
    } catch (err) {
      console.error("Failed to save user:", err);
      alert("Error: Could not save user.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- 5. Update handleDeleteUser to call the API ---
  const handleDeleteUser = async (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      try {
        await deleteUser(user.id);
        fetchUsers(); // Re-fetch the list
      } catch (err) {
        console.error("Failed to delete user:", err);
        alert("Error: Could not delete user.");
      }
    }
  };

  if (loading) return <div className="text-center p-4">Loading users...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-6 pt-6">
        <h2 className="text-xl font-semibold text-gray-900">Users</h2>
        <Button onClick={handleAddUserClick} className="flex items-center">
          <PlusIcon className="mr-1 h-5 w-5" />
          Add user
        </Button>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200 mx-6 mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-16 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sr. No
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="relative w-24 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="py-4 text-center text-sm text-gray-500"
                  >
                    No users found for this organization.
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    index={index}
                    onEdit={handleEditUserClick}
                    onDelete={handleDeleteUser}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <SlideOver
        isOpen={isSlideOverOpen}
        onClose={handleCloseSlideOver}
        title={editingUser ? "Edit User" : "Add User"}
      >
        <UserForm
          initialData={editingUser}
          onSave={handleSaveUser}
          onCancel={handleCloseSlideOver}
          isLoading={isSubmitting} // Pass loading state to the form
        />
      </SlideOver>
    </div>
  );
};

export default UsersList;
