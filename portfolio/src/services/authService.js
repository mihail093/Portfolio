import api from "./apiService";

// SERVIZI PER AUTENTICAZIONE
export const authService = {
  // Login admin
  login: async (email, password) => {
    try {
      const response = await api.post("/auth/admin/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Errore durante il login");
    }
  },

  // Logout admin
  logout: async () => {
    try {
      const response = await api.get("/auth/admin/logout");
      return response.data;
    } catch (error) {
      console.error("Errore durante il logout:", error);
      throw error;
    }
  },

  // Ottieni il profilo admin (verifica cookie)
  getProfile: async () => {
    try {
      const response = await api.get("/auth/admin/me");
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Non autenticato");
    }
  },
};