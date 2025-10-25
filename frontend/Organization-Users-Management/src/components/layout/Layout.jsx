// src/components/layout/Layout.jsx
import React from "react";
import Header from "./Header";
import SubNavigation from "./Sidebar";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

// --- 2. BREADCRUMB LOGIC ---
// A map of your routes to their display names
const breadcrumbNameMap = {
  "/dashboard": "Dashboard",
  "/organizations": "Manage B2B organizations",
  "/organizations/:id": "Organization details",
};

// This is the new header component that includes breadcrumbs and search
const BreadcrumbHeader = () => {
  const location = useLocation();

  const currentPageName =
    breadcrumbNameMap[location.pathname] ||
    (location.pathname.startsWith("/organizations/") &&
    location.pathname !== "/organizations"
      ? "Organization details"
      : null);

  return (
    // This container holds the breadcrumbs and search
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <nav className="flex" aria-label="Breadcrumb">
          <ol role="list" className="flex items-center space-x-2">
            <li>
              <Link
                to="/dashboard"
                className="text-gray-400 hover:text-gray-500"
              >
                <HomeIcon
                  className="h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="sr-only">Home</span>
              </Link>
            </li>

            {/* This is the dynamic part:
              It only shows the " > Page Name" if we are on a sub-page.
              We assume '/dashboard' is the main page and doesn't need it.
            */}
            {currentPageName && location.pathname !== "/dashboard" && (
              <li>
                <div className="flex items-center">
                  <ChevronRightIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-500">
                    {currentPageName}
                  </span>
                </div>
              </li>
            )}
          </ol>
        </nav>

        {/* Search Button on the right */}
        <div>
          <button
            type="button"
            className="bg-indigo-50 p-2 rounded-lg text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <span className="sr-only">Search</span>
            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="min-h-auto ">
      <Header />
      <SubNavigation />

      <BreadcrumbHeader />
    </div>
  );
};

export default Layout;
