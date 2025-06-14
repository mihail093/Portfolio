import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { mediaService } from "../../services/apiService";
import {
  HomeIcon,
  FolderIcon,
  PhotoIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/outline";

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const BACKGROUND_IMAGE_ID = "68309713c92df25742d9240c";
  const [backgroundImgUrl, setBackgroundImgUrl] = useState(null);

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const imgData = await mediaService.getMediaById(BACKGROUND_IMAGE_ID);
        setBackgroundImgUrl(imgData.data.mediaUrl);
      } catch (error) {
        console.error("Errore nel caricamento dell'immagine background", error);
        setBackgroundImgUrl(null);
      }
    };

    fetchBackgroundImage();
  }, []);

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: HomeIcon },
    { name: "Progetti", href: "/admin/projects", icon: FolderIcon },
    { name: "Media", href: "/admin/media", icon: PhotoIcon },
    { name: "Crea", href: "/admin/manager", icon: PuzzlePieceIcon },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div
      className="h-screen flex"
      style={{
        backgroundImage: backgroundImgUrl ? `url(${backgroundImgUrl})` : null,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Sidebar - larghezza fissa */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        {/* Header della sidebar */}
        <div className="flex h-16 items-center px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
        </div>

        {/* Navigazione principale */}
        <nav className="mt-8 flex-1 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const current = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    current
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  } group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200`}
                >
                  <item.icon
                    className={`${
                      current ? "text-indigo-500" : "text-gray-400"
                    } mr-3 h-5 w-5 transition-colors duration-200`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Informazioni utente - fissate in basso */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {admin?.name || "Admin"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {admin?.email || "admin@example.com"}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="ml-3 text-gray-400 hover:text-red-600 transition-colors duration-200 p-1 rounded-md hover:bg-red-50"
              title="Logout"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main content area - occupa tutto lo spazio rimanente */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Content wrapper con padding e scroll */}
        <div className="flex-1 py-6 px-8 overflow-auto">
          <div className="h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}