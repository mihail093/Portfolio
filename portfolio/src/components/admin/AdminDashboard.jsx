import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { projectService, mediaService } from "../../services/apiService";
import { Link } from "react-router-dom";
import {
  FolderIcon,
  PhotoIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalMedia: 0,
    recentProjects: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Carica statistiche progetti
      const projectsResponse = await projectService.getProjects();
      const mediaResponse = await mediaService.getMedia();

      setStats({
        totalProjects: projectsResponse.count || 0,
        totalMedia: mediaResponse.count || 0,
        recentProjects: projectsResponse.data?.slice(0, 3) || [],
      });
    } catch (error) {
      setError("Errore nel caricamento della dashboard.");
      console.error("Errore nel caricamento della dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  }

  const StatCard = ({ title, value, icon, link }) => (
    <div className="shadow-lg rounded-lg truncate">
      <div className="p-5 bg-white/95">
        <div className="flex items-center">
          <div className="flex-shrink-0">{icon}</div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-montserrat text-black truncate">
                {title}
              </dt>
              <dd className="text-lg font-montserrat text-gray-900">{value}</dd>
            </dl>
          </div>
        </div>
      </div>
      {link && (
        <div className="bg-white/90 p-3">
          <Link
            to={link}
            className="text-sm font-montserrat text-indigo-700 hover:text-indigo-900"
          >
            Visualizza tutto
          </Link>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 md:px-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 font-montserrat">
        <h1
          aria-label="Dashboard Amministratore"
          className="
            px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-lg font-bold text-white text-center truncate
            bg-black rounded-lg select-none w-full sm:w-auto
          "
        >
          Dashboard Amministratore
        </h1>
        <button
          onClick={handleLogout}
          aria-label="Logout"
          className="
            px-2 sm:px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md 
            text-white text-sm text-center w-full sm:w-auto
          "
        >
          Logout
        </button>
      </div>

      {/* Statistiche */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <StatCard
          title="Progetti Totali"
          value={stats.totalProjects}
          icon={<FolderIcon className="h-8 w-8 text-indigo-500" aria-hidden="true" />}
          link="/admin/projects"
        />
        <StatCard
          title="Media Totali"
          value={stats.totalMedia}
          icon={<PhotoIcon className="h-8 w-8 text-green-500" aria-hidden="true" />}
          link="/admin/media"
        />
      </div>

      {/* Progetti Recenti */}
      <div className="bg-white/95 shadow-lg rounded-lg truncate">
        <div className="px-2 py-4 sm:px-4 sm:py-5">
          <h3
            className="text-base sm:text-lg leading-6 font-medium text-gray-900"
            aria-label="Progetti Recenti"
          >
            Progetti Recenti
          </h3>
          <p className="mt-1 max-w-2xl text-xs sm:text-sm text-gray-500">
            Gli ultimi 3 progetti creati
          </p>
        </div>
        <div className="border-t border-gray-200">
          {stats.recentProjects.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {stats.recentProjects.map((project) => (
                <li key={project._id} className="px-2 py-3 sm:px-4 sm:py-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {project.title}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        tecnologie: {project.technologies?.join(", ")}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                      <span className="text-xs sm:text-sm text-gray-500">
                        {new Date(project.createdAt).toLocaleDateString("it-IT")}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4 text-gray-500 text-center text-sm">
              Nessun progetto trovato
            </p>
          )}
        </div>
      </div>

      {/* Messaggi di errore */}
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded mb-4 text-center">
          {error}
        </div>
      )}
    </div>
  );
}