// src/components/organizations/AddOrganizationForm.jsx
import React, { useState } from "react";
import Button from "../ui/Button";

const AddOrganizationForm = ({ onSave, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    email: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Pass the data up to the parent
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 mt-4">
        {/* Name of the organization */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm  leading-6 text-gray-400"
          >
            Name of the organization
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="  Type here"
              className="block w-full pl-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
          </div>
        </div>

        {/* Slug */}
        <div>
          <label
            htmlFor="slug"
            className="block text-sm  leading-6 text-gray-400"
          >
            Slug
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="slug"
              id="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="  Type here"
              required
              className="block w-full pl-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* Organization mail */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm  leading-6 text-gray-400"
          >
            Organization mail
          </label>
          <div className="mt-1">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="  Type here"
              className="block w-full pl-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
          </div>
        </div>

        {/* Contact */}
        <div>
          <label
            htmlFor="contact"
            className="block text-sm  leading-6 text-gray-400"
          >
            Contact
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="contact"
              id="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="  Type here"
              required
              className="block w-full pl-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      {/* Modal Footer (Buttons) */}
      <div className="absolute inset-x-0 bottom-0 mt-5 sm:mt-6 sm:flex sm:flex-row-reverse sm:px-6 sm:py-4 border-t border-gray-200 pt-4">
        <Button
          type="submit"
          className="w-full sm:ml-3 sm:w-auto"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="mt-3 w-full sm:mt-0 sm:w-auto text-indigo-600"
          disabled={isLoading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddOrganizationForm;
