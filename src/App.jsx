// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Details from "./pages/Details.jsx";
import Header from "./components/Header.jsx";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "./index.css";

export default function App() {
  return (
    <>
      <Header />
      <main className="app">
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Rotas Protegidas */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <ProtectedRoute>
                <Details />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}
