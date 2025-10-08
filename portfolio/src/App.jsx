import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound"; // ← Crea questo componente
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import AdminLogin from "./components/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import ProjectMediaManager from "./components/admin/ProjectMediaManager";
import AdminMedia from "./components/admin/AdminMedia";
import AdminProjects from "./components/admin/AdminProjects";
import ProtectedRoute from "./components/admin/ProtectedRoute";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter basename="/">
          <Routes>
            {/* Route pubbliche */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="projects" element={<Projects />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="project/details" element={<ProjectDetails />} />
            </Route>

            {/* Route admin protette */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={<Navigate to="/admin/dashboard" replace />}
              />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="media" element={<AdminMedia />} />
              <Route path="manager" element={<ProjectMediaManager />} />
            </Route>

            {/* Route 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Modal AdminLogin */}
          <AdminLogin />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;