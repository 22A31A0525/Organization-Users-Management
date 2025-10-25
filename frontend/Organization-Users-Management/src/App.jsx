import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import Layout from "./components/layout/Layout";
import Header from "./components/layout/Header";
import Layout from "./components/layout/Layout";
import ManageOrganizationsPage from "./pages/ManageOrganizationsPage";
import OrganizationDetailsPage from "./pages/OrganizationDetailsPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect from root to your organizations page */}
        <Route path="/" element={<Navigate to="/organizations" replace />} />
        <Route path="/dashboard" element={<Layout />} />
        <Route path="/organizations" element={<ManageOrganizationsPage />} />
        {/* Add more routes here, e.g., /organizations/:orgId for details */}
        <Route
          path="/organizations/:id"
          element={<OrganizationDetailsPage />}
        />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
