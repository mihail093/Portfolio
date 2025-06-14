import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Footer() {
  const { isDark } = useTheme();
  const { isAuthenticated, openLoginModal } = useAuth();
  const navigate = useNavigate();

  const handleManagerClick = (e) => {
    e.preventDefault();

    // Se l'admin non è autenticato apre il Modal altrimenti reindirizza in dashboard
    if(!isAuthenticated()) {
      openLoginModal();
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <footer className={`py-8 ${isDark ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className={`text-sm select-none ${isDark ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'}`}>
              © 2025 Mihajlo Radosavljevic. All rights reserved.
            </p>
          </div>
          <div className="flex justify-end">
            <Link 
              to="#"
              onClick={handleManagerClick}
              className={`inline-block px-2 pb-1.5 pt-0.5 border-2 select-none transition-colors duration-150
                ${isDark ? 'border-white active:bg-white active:text-black'
                  :
                  'border-black active:bg-black active:text-white'}
                `}
            >
              manager
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}