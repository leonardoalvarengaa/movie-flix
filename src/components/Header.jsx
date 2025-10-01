// src/components/Header.jsx

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config";

export default function Header() {
  const [q, setQ] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const initial = params.get("q") || "";
    setQ(initial);
  }, [params]);

  function submit(e) {
    e.preventDefault();
    const sp = new URLSearchParams();
    if (q.trim()) sp.set("q", q.trim());
    navigate(`/?${sp.toString()}`);
  }

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  }

  return (
    <header className="header-container">
      <div className="header-brand" onClick={() => navigate("/")}>
        <h1>🎬 MovieFlix</h1>
      </div>

      <div className="header-search">
        <form className="search" onSubmit={submit}>
          <input
            placeholder="Buscar filme..."
            aria-label="Buscar filme"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      </div>

      <nav className="header-nav">
        {user ? (
          <div className="user-info">
            <span>{user.email}</span>
            <button onClick={handleLogout} className="logout-button">
              Sair
            </button>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login">Login</Link>
            <Link to="/register" className="register-link">
              Criar Conta
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
