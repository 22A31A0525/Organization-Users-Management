// src/components/ui/RolePill.jsx
import React from "react";

const RolePill = ({ role }) => {
  let colorClasses = "";
  switch (role.toLowerCase()) {
    case "admin":
      colorClasses = "bg-green-100 text-green-800";
      break;
    case "co-ordinator": // Note: using 'co-ordinator' as per your image
      colorClasses = "bg-orange-100 text-orange-800";
      break;
    case "member": // Example for another role
      colorClasses = "bg-blue-100 text-blue-800";
      break;
    default:
      colorClasses = "bg-gray-100 text-gray-800";
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${colorClasses}`}
    >
      {role}
    </span>
  );
};

export default RolePill;
