// src/config.js
const TMDB = {
  BASE_URL: "https://api.themoviedb.org/3",
  IMG_BASE: import.meta.env.VITE_TMDB_IMG_BASE || "https://image.tmdb.org/t/p",
  LANG: import.meta.env.VITE_TMDB_LANG || "pt-BR",
  TOKEN: import.meta.env.VITE_TMDB_V4_TOKEN || "",
  API_KEY: import.meta.env.VITE_TMDB_API_KEY || "",
};

if (!TMDB.TOKEN && !TMDB.API_KEY) {
  console.warn(
    "Sem credenciais TMDB. Defina VITE_TMDB_V4_TOKEN ou VITE_TMDB_API_KEY no .env e reinicie."
  );
}

export default TMDB;