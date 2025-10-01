import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import Loader from "../components/Loader";
import TMDB from "../config";

export default function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.get(`/movie/${id}`, {
          params: { append_to_response: "videos,credits" },
        });
        setMovie(res.data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p>Erro: {error}</p>;
  if (!movie) return null;

  const poster = movie.poster_path
    ? `${TMDB.IMG_BASE}/w500${movie.poster_path}`
    : "";

  return (
    <article style={{ display: "grid", gap: 16 }}>
      <Link to="/" className="back-button">
        ← Voltar
      </Link>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {poster && (
          <img
            src={poster}
            alt={movie.title}
            style={{ width: 300, borderRadius: 8 }}
          />
        )}
        <div>
          <h2>
            {movie.title} <small>({movie.release_date?.slice(0, 4)})</small>
          </h2>
          <p>
            <strong>Nota:</strong> ⭐ {movie.vote_average?.toFixed?.(1) ?? "-"}
          </p>
          <p>
            <strong>Gêneros:</strong>{" "}
            {movie.genres?.map((g) => g.name).join(", ")}
          </p>
          <p>
            <strong>Sinopse:</strong> {movie.overview || "Sem descrição."}
          </p>
        </div>
      </div>
    </article>
  );
}
