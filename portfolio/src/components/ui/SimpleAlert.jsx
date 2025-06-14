import React, { useState, useEffect } from "react";

export default function SimpleAlert({
  message,
  type = "info",
  duration = 5000,
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Reset visibility when message changes
    setVisible(true);

    // Auto-hide after duration if provided
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  // If not visible, don't render anything
  if (!visible) return null;

  // Determine background color based on type
  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-800 border-green-500";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-500";
      case "error":
        return "bg-red-100 text-red-800 border-red-500";
      default:
        return "bg-blue-100 text-blue-800 border-blue-500";
    }
  };

  return (
    <div className={`w-fit rounded-md p-1 my-6 sm:p-2 border-l-4 ${getBgColor()} relative`}>
      <div className="flex items-start">
        <p className="text-xs sm:text-sm">{message}</p>
      </div>
    </div>
  );
}