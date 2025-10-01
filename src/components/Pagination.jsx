// src/components/Pagination.jsx
export default function Pagination({ page, totalPages, onChange }) {
  // gera uma lista de páginas (máximo 5 em volta da atual)
  const pages = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages || page + 2, page + 2);

  for (let p = start; p <= end; p++) {
    pages.push(p);
  }

  return (
    <nav className="pagination">
      <button onClick={() => onChange(page - 1)} disabled={page <= 1}>
        ← Anterior
      </button>

      {pages.map((p) => (
        <button
          key={p}
          className={p === page ? "active" : ""}
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange(page + 1)}
        disabled={totalPages && page >= totalPages}
      >
        Próxima →
      </button>
    </nav>
  );
}
