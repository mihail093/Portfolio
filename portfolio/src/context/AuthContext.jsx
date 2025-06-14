import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth deve essere utilizzato all'interno di AuthProvider"
    );
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Verifica se l'admin è autenticato al caricamento della pagina
  useEffect(() => {
    checkAuthentication();

    // Ascolta per eventi di autenticazione richiesta
    const handleAuthRequired = () => {
      setShowLoginModal(true);
    };

    window.addEventListener('auth-required', handleAuthRequired);

    // Rimuove il listener quando il componente si smonta
    return () => {
      window.removeEventListener('auth-required', handleAuthRequired);
    };
  }, []);

  const checkAuthentication = async () => {
    try {
      // Verifica se il cookie è presente chiamando l'API
      const response = await authService.getProfile();
      if (response.success) {
        setAdmin(response.admin);
      }
    } catch (error) {
      // Cookie non valido o scaduto
      console.log("Utente non autenticato");
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);

      if (response.success) {
        // il token viene salvato nel cookie dal backend
        setAdmin(response.admin);
        return { success: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      // Chiama l'API di logout per rimuovere il cookie
      await authService.logout();
    } catch (error) {
      console.error("Errore durante il logout:", error);
    } finally {
      setAdmin(null);
    }
  };

  const isAuthenticated = () => {
    return !!admin;
  };

  const value = {
    admin,
    loading,
    login,
    logout,
    isAuthenticated,
    showLoginModal,
    setShowLoginModal,
    openLoginModal: () => setShowLoginModal(true),
    closeLoginModal: () => setShowLoginModal(false),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};