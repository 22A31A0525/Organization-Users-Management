// src/components/ui/StatusPill.jsx
import React from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  MinusCircleIcon,
} from "@heroicons/react/20/solid";

const StatusPill = ({ status }) => {
  const getStyles = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return {
          icon: <CheckCircleIcon className="h-4 w-4 text-green-500" />,
          text: "bg-green-100 text-green-800",
        };
      case "blocked":
        return {
          icon: <XCircleIcon className="h-4 w-4 text-red-500" />,
          text: "bg-red-100 text-red-800",
        };
      case "inactive":
        return {
          icon: <MinusCircleIcon className="h-4 w-4 text-gray-500" />,
          text: "bg-gray-100 text-gray-800",
        };
      default:
        return {
          icon: <MinusCircleIcon className="h-4 w-4 text-gray-500" />,
          text: "bg-gray-100 text-gray-800",
        };
    }
  };

  const { icon, text } = getStyles(status);

  return (
    <span
      className={`inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium ${text}`}
    >
      {icon}
      {status}
    </span>
  );
};

export default StatusPill;
