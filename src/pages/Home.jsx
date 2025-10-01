// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";

export default function Home() {
  const [params, setParams] = useSearchParams();
  const [data, setData] = useState({ results: [], page: 1, total_pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const page = Math.max(1, Number(params.get("page") || 1));
  const q = (params.get("q") || "").trim();

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const path = q ? "search/movie" : "movie/popular";
        const res = await api.get(path, {
          params: { page, query: q || undefined },
        });
        if (alive) setData(res.data);
      } catch (e) {
        if (alive) setError(e?.message || "Erro ao carregar dados");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [page, q]);

  function changePage(p) {
    const total = Math.min(data?.total_pages || 1, 500);
    const next = Math.max(1, Math.min(total, Number(p)));
    if (!next || next === page) return;
    const sp = new URLSearchParams(params);
    sp.set("page", String(next));
    setParams(sp, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (loading) return <Loader />;
  if (error) return <p className="state">Erro: {error}</p>;
  if (!data?.results?.length) return <p className="state">Nada encontrado.</p>;

  return (
    <section>
      <div className="grid">
        {data.results.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
      <Pagination
        page={data.page}
        totalPages={Math.min(data.total_pages ?? 1, 500)}
        onChange={changePage}
      />
    </section>
  );
}
