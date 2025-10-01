// src/components/ProtectedRoute.jsx

import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true); // Estado para verificar o carregamento

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsFetching(false); // Finaliza a verificação
    });

    return () => unsubscribe();
  }, []);

  // Enquanto estiver verificando o status da autenticação, mostramos um loading.
  // Isso evita que o usuário seja redirecionado antes da verificação terminar.
  if (isFetching) {
    return <div>Carregando...</div>;
  }

  // Se não houver usuário logado após a verificação, redireciona para o login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Se houver um usuário logado, renderiza a página filha (o conteúdo protegido)
  return children;
}
