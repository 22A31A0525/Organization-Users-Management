// src/components/users/UserForm.jsx
import React, { useState, useEffect } from "react";
import InputWithLabel from "../ui/InputWithLabel";
import SelectWithLabel from "../ui/SelectWithLabel";
import Button from "../ui/Button";

// UserForm receives initialData for editing, and onSave/onCancel callbacks
const UserForm = ({ initialData, onSave, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
  });

  // Effect to populate form when initialData changes (for editing)
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",

        role: initialData.role || "",
      });
    } else {
      // Clear form for adding new user
      setFormData({ name: "", role: "" });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const roles = [
    { value: "", label: "Select an option" }, // Default placeholder
    { value: "Admin", label: "Admin" },
    { value: "Co-ordinator", label: "Co-ordinator" },
    { value: "Member", label: "Member" }, // Example additional role
  ];

  return (
    // Use flex-col and h-full to make the form fill the panel and align buttons at bottom
    <form onSubmit={handleSubmit} className="flex h-full flex-col">
      {/* Form Fields */}
      <div className="flex-1 space-y-5">
        {" "}
        {/* Added space-y for vertical spacing */}
        <InputWithLabel
          label="Name of the user"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Type here"
          required
        />
        <SelectWithLabel
          label="Choose user role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          options={roles}
          required
        />
      </div>

      {/* Form Footer with Buttons */}
      <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
        {" "}
        {/* Added default padding to match existing styles */}
        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="light" // Using the light variant for Cancel
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading
              ? initialData
                ? "Saving..."
                : "Adding..."
              : initialData
              ? "Update"
              : "Add"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
