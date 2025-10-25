// src/components/organizations/ChangeStatusModal.jsx
import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition, RadioGroup } from "@headlessui/react"; // Ensure @headlessui/react is installed
import Button from "../ui/Button";

const statuses = [
  { name: "Active", value: "Active" },
  { name: "Inactive", value: "Inactive" },
  { name: "Blocked", value: "Blocked" }, // Example status
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ChangeStatusModal = ({
  isOpen,
  onClose,
  currentStatus,
  onSave,
  isLoading,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  // Update internal state if the prop changes
  useEffect(() => {
    setSelectedStatus(currentStatus);
  }, [currentStatus]);

  const handleSave = () => {
    onSave(selectedStatus); // Pass the selected status back to the parent
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-75"
          leave="ease-in duration-200"
          leaveFrom="opacity-75"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            {/* Modal Panel */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Change Organization Status
                </Dialog.Title>
                <div className="mt-4">
                  {/* Radio Group for Status Selection */}
                  <RadioGroup
                    value={selectedStatus}
                    onChange={setSelectedStatus}
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a status
                    </RadioGroup.Label>
                    <div className="space-y-2">
                      {statuses.map((statusOption) => (
                        <RadioGroup.Option
                          key={statusOption.name}
                          value={statusOption.value}
                          className={({ active, checked }) =>
                            `${
                              active
                                ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-300"
                                : ""
                            }
                            ${
                              checked
                                ? "bg-indigo-600 bg-opacity-75 text-white"
                                : "bg-white"
                            }
                              relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                          }
                        >
                          {({ checked }) => (
                            <>
                              <div className="flex w-full items-center justify-between">
                                <div className="flex items-center">
                                  <div className="text-sm">
                                    <RadioGroup.Label
                                      as="p"
                                      className={`font-medium ${
                                        checked ? "text-white" : "text-gray-900"
                                      }`}
                                    >
                                      {statusOption.name}
                                    </RadioGroup.Label>
                                  </div>
                                </div>
                                {checked && (
                                  <div className="shrink-0 text-white">
                                    <svg
                                      className="h-6 w-6"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <circle
                                        cx={12}
                                        cy={12}
                                        r={12}
                                        fill="#fff"
                                        fillOpacity="0.2"
                                      />
                                      <path
                                        d="M7 13l3 3 7-7"
                                        stroke="#fff"
                                        strokeWidth={1.5}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="secondary" // Use secondary for Cancel
                    onClick={onClose}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    onClick={handleSave}
                    disabled={isLoading || selectedStatus === currentStatus} // Disable if status hasn't changed
                  >
                    {isLoading ? "Saving..." : "Save"}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ChangeStatusModal;
