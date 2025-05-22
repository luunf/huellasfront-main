// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AuthProvider } from "./context/AuthContext"
import { useAuth } from "./context/AuthContext"
import { useNavigate } from "react-router-dom"; 
import ProtectedRoute from "./components/ProtectedRoute";
import Indubitadas from "./pages/Indubitadas";
import IndubitadasComisaria from "./pages/IndubitadasComisaria";
import Dubitadas from "./pages/Dubitadas";
import Busqueda from "./pages/Busqueda";
import Login from "./pages/Login";

function App() {
  return (
      <Router>
        <AuthProvider> {/* Envuelve todo el Router con AuthProvider */}
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-extrabold text-center mb-6 text-blue-800">
              Sistema de Huellas de Calzado
            </h1>

            {/* Reemplaza el nav por el componente Navigation */}
            <Navigation />

            <div className="bg-white p-6 rounded-2xl shadow-md">
              <AnimatedRoutes />
            </div>
          </div>
        </div>
        </AuthProvider>
      </Router>
  );
}

// Componente de navegación separado
const Navigation = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Actualiza el estado de autenticación
    navigate('/login'); // Redirige a la página de login
  };

  return (
    <nav className="flex justify-center flex-wrap gap-2 mb-6 bg-white rounded-2xl shadow-lg p-4">
      {isAuthenticated ? (
        <>
          {/* Opciones para usuarios autenticados */}
          {[
            { to: "/indubitadas", label: "Indubitadas" },
            { to: "/indubitadas-comisaria", label: "Indubitadas Comisarías" },
            { to: "/dubitadas", label: "Dubitadas" },
            { to: "/busqueda", label: "Búsqueda" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
                  : "text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-lg transition"
              }
            >
              {label}
            </NavLink>
          ))}
          <button
            onClick={handleLogout} 
            className="text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg transition"
          >
            Cerrar Sesión
          </button>
        </>
      ) : (
        // Opción para usuarios no autenticados
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
              : "text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-lg transition"
          }
        >
          Login
        </NavLink>
      )}
    </nav>
  );
};


// Componente que maneja las animaciones de las rutas
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.5 }}
      >
        <Routes location={location} key={location.pathname}>
          {/* Ruta por defecto redirige a login */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Ruta pública */}
          <Route path="/login" element={<Login />} />
          
          {/* Rutas protegidas */}
          <Route path="/indubitadas" element={
            <ProtectedRoute>
              <Indubitadas />
            </ProtectedRoute>
          } />
          
          <Route path="/indubitadas-comisaria" element={
            <ProtectedRoute>
              <IndubitadasComisaria />
            </ProtectedRoute>
          } />
          
          <Route path="/dubitadas" element={
            <ProtectedRoute>
              <Dubitadas />
            </ProtectedRoute>
          } />
          
          <Route path="/busqueda" element={
            <ProtectedRoute>
              <Busqueda />
            </ProtectedRoute>
          } />

          {/* Ruta 404 */}
          <Route
            path="*"
            element={
              <div className="text-center py-20">
                <h2 className="text-xl font-semibold text-red-500">
                  404 — Página no encontrada
                </h2>
                <NavLink
                  to="/login"
                  className="mt-4 inline-block text-blue-600 hover:underline"
                >
                  Volver al login
                </NavLink>
              </div>
            }
          />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default App;
