// src/components/MovieCard.jsx
import { Link } from "react-router-dom";
import TMDB from "../config";

export default function MovieCard({ movie }) {
  const hasPoster = Boolean(movie.poster_path);
  const src = hasPoster
    ? `${TMDB.IMG_BASE}/w500${movie.poster_path}`
    : "/no-poster.png"; // opcional: coloque um placeholder em /public

  return (
    <Link
      to={`/movie/${movie.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
      aria-label={`Abrir detalhes de ${movie.title}`}
    >
      <article className="card">
        <img className="poster" src={src} alt={movie.title} loading="lazy" />
        <div className="meta">
          <h3 className="movie-title">{movie.title}</h3>
          <div className="rating">
            <span className="star" />
            {typeof movie.vote_average === "number"
              ? movie.vote_average.toFixed(1)
              : "—"}
          </div>
        </div>
      </article>
    </Link>
  );
}
