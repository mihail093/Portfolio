import React from "react";
import {
  XMarkIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";

const ICONS = {
  warning: ShieldExclamationIcon,
  info: InformationCircleIcon,
  question: QuestionMarkCircleIcon,
  confirmation: ShieldCheckIcon,
  delete: ExclamationTriangleIcon,
};

const ICON_COLORS = {
  warning: "text-orange-500",
  info: "text-blue-500",
  question: "text-purple-500",
  confirmation: "text-green-500",
  delete: "text-red-500",
};

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  type,
  showCloseButton = true,
  onConfirm,
  onCancel,
  confirmText = "Conferma",
  cancelText = "Annulla",
  isLoading = false,
  showActions = false,
}) {
  if (!isOpen) return null;

  const Icon = ICONS[type] || InformationCircleIcon;
  const iconColor = ICON_COLORS[type] || "text-blue-500";

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={!isLoading ? onClose : undefined}
        />

        {/* Modal Content */}
        <div className="relative transform overflow-hidden rounded-lg shadow-xl transition-all w-full max-w-md mx-auto">
          {/* Header con titolo e X */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-4 bg-[#1d2d44] border-b border-gray-200">
              <Icon className={`w-8 h-8 ${iconColor}`} />
              {title && (
                <h3 className="text-lg font-montserrat text-white select-none">
                  {title}
                </h3>
              )}
              {showCloseButton && !isLoading && (
                <button
                  onClick={onClose}
                  className="text-white hover:text-orange-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="bg-[#3e5c76]">{children}</div>

          {/* Actions */}
          {showActions && (
            <div className="bg-[#3e5c76] px-6 pb-3">
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  onClick={handleConfirm}
                  disabled={isLoading}
                  className={`px-2 py-1 rounded-md text-white text-sm transition-colors ${
                    type === "delete"
                      ? "bg-red-600 hover:bg-red-700 disabled:bg-red-400"
                      : "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400"
                  } disabled:cursor-not-allowed`}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Eliminando...
                    </div>
                  ) : (
                    confirmText
                  )}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="px-2 py-1 text-sm border border-gray-300 rounded-md text-gray-800 bg-white hover:bg-white/65 disabled:bg-white/30 disabled:cursor-not-allowed transition-colors"
                >
                  {cancelText}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}