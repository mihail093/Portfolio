import axios from "axios";

// Configurazione base per axios
const API_URL = "http://localhost:5000/api";

// Creazione di un'istanza axios con la configurazione di base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include automaticamente i cookie
});

// Intercettore di richiesta per logging
api.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    if (process.env.NODE_ENV === "development") {
      console.error("API Request Error:", error);
    }
    return Promise.reject(error);
  }
);

// Intercettore di risposta per logging e gestione errori
api.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === "development") {
      console.log(
        `API Response from ${response.config.url}: Status ${response.status}`
      );
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Cookie scaduto o non valido - reindirizza al login
      console.log("Sessione scaduta, reindirizzamento al login...");

      const isAdminPage = window.location.pathname.startsWith('/admin');
      const isLoginPage = window.location.pathname === '/admin/login';

      if (isAdminPage && !isLoginPage) {
        // Apre il Modal tramite l'utilizzo di dispatchEvent
        window.dispatchEvent(new CustomEvent('auth-required'));
      }
    }

    if (process.env.NODE_ENV === "development") {
      console.error(
        "API Response Error:",
        error.response?.status || "Unknown",
        error.message
      );
    }
    return Promise.reject(error);
  }
);

// SERVIZI PER I PROGETTI
export const projectService = {
  // Ottieni tutti i progetti
  getProjects: async () => {
    try {
      const response = await api.get("/projects");
      return response.data;
    } catch (error) {
      console.error("Errore nel recupero dei progetti:", error);
      throw error;
    }
  },

  // Ottieni progetti in evidenza
  getFeaturedProjects: async () => {
    try {
      const response = await api.get("/projects/featured");
      return response.data;
    } catch (error) {
      console.error("Errore nel recupero dei progetti in evidenza:", error);
      throw error;
    }
  },

  // Ottieni un singolo progetto tramite ID
  getProjectById: async (id) => {
    try {
      const response = await api.get(`/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Errore nel recupero del progetto ${id}:`, error);
      throw error;
    }
  },

  // Crea un nuovo progetto
  createProject: async (projectData) => {
    try {
      console.log("Creazione progetto con dati:", projectData);
      const response = await api.post("/projects", projectData);
      return response.data;
    } catch (error) {
      console.error("Errore nella creazione del progetto:", error);
      throw error;
    }
  },

  // Aggiorna un progetto esistente
  updateProject: async (id, projectData) => {
    try {
      const response = await api.put(`/projects/${id}`, projectData);
      return response.data;
    } catch (error) {
      console.error(`Errore nell'aggiornamento del progetto ${id}:`, error);
      throw error;
    }
  },

  // Elimina un progetto
  deleteProject: async (id) => {
    try {
      const response = await api.delete(`/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Errore nell'eliminazione del progetto ${id}:`, error);
      throw error;
    }
  },
};

// SERVIZI PER I MEDIA (immagini e video)
export const mediaService = {
  // Ottieni tutti i media con filtri opzionali
  getMedia: async (filters = {}) => {
    try {
      const params = {};

      // Filtro per categoria esistente
      if (filters.category) {
        params.category = filters.category;
      }

      // Filtro per tipo di media
      if (filters.mediaType) {
        params.mediaType = filters.mediaType;
      }

      // Filtro per tag
      if (filters.tags && filters.tags.length > 0) {
        // Converte array di tag in stringa separata da virgole
        params.tags = Array.isArray(filters.tags)
          ? filters.tags.join(",")
          : filters.tags;
      }

      const response = await api.get("/media", { params });
      return response.data;
    } catch (error) {
      console.error("Errore nel recupero dei media:", error);
      throw error;
    }
  },

  // Metodo specifico per filtrare media per tag
    getMediaByTags: async (tags) => {
    try {
      const tagsString = Array.isArray(tags) ? tags.join(',') : tags;
      const response = await api.get("/media", { 
        params: { tags: tagsString } 
      });
      return response.data;
    } catch (error) {
      console.error("Errore nel recupero dei media per tag:", error);
      throw error;
    }
  },

  // Metodo per ottenere tutti i tag disponibili
  getAllTags: async () => {
    try {
      const response = await api.get("/media/tags");
      return response.data;
    } catch (error) {
      console.error("Errore nel recupero dei tag:", error);
      throw error;
    }
  },

  // Ottieni un singolo media tramite ID
  getMediaById: async (id) => {
    try {
      const response = await api.get(`/media/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Errore nel recupero del media ${id}:`, error);
      throw error;
    }
  },

  // Carica un nuovo media (immagine o video)
  uploadMedia: async (formData) => {
    try {
      // Usa un'istanza separata per l'upload di file
      const uploadHeaders = {
        "Content-Type": "multipart/form-data",
      };

      console.log(
        "Caricamento media con dati:",
        Object.fromEntries(formData.entries())
      );

      const response = await api.post("/media", formData, {
        headers: uploadHeaders,
      });

      console.log("Risposta upload media:", response.data);
      return response;
    } catch (error) {
      console.error("Errore nel caricamento del media:", error);
      throw error;
    }
  },

  // Elimina un media
  deleteMedia: async (id) => {
    try {
      const response = await api.delete(`/media/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Errore nell'eliminazione del media ${id}:`, error);
      throw error;
    }
  },
};

// Esporta l'istanza axios per uso diretto
export default api;