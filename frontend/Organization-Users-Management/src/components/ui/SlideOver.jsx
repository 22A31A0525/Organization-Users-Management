// src/components/ui/SlideOver.jsx
import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function SlideOver({ isOpen, onClose, title, children }) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[1]" onClose={onClose}>
        {/* 1. Backdrop Overlay (This is the dark background) */}
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-10" // <-- Set to 75% opacity
          leave="ease-in-out duration-200"
          leaveFrom="opacity-0" // <-- Set to 75% opacity
          leaveTo="opacity-0"
        >
          {/* This div is the gray overlay */}
          <div className="fixed inset-0 bg-gray-500  opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              {/* 2. The Slide-Over Panel */}
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300 sm:duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300 sm:duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-lg">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-4xl">
                    {/* Panel Header */}
                    <div className="bg-white px-4 mt-10 py-6 sm:px-6">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-lg font-semibold leading-6 text-gray-900">
                          {title}
                        </Dialog.Title>
                        <button
                          type="button"
                          className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={onClose}
                        >
                          <span className="sr-only">Close</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    {/* Panel Body (where your form goes) */}
                    <div className="relative flex-1 px-4 sm:px-6 ">
                      {children}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
