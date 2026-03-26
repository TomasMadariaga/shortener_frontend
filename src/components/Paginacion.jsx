export const Paginacion = ({ pagina, setPagina, maximo }) => {
  const goToPage = (page) => {
    if (page >= 1 && page <= maximo) {
      setPagina(page);
    }
  };

  const handlePrev = () => goToPage(pagina - 1);
  const handleNext = () => goToPage(pagina + 1);

  const getPageNumbers = () => {
    const pages = [];
    const delta = 2;
    const left = Math.max(1, pagina - delta);
    const right = Math.min(maximo, pagina + delta);

    if (left > 1) pages.push(1);
    if (left > 2) pages.push("...");

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < maximo - 1) pages.push("...");
    if (right < maximo) pages.push(maximo);

    return pages;
  };

  if (maximo <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Botón anterior */}
      <button
        onClick={handlePrev}
        disabled={pagina === 1}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
          pagina === 1
            ? "text-text/30 cursor-not-allowed"
            : "text-text hover:text-accent hover:bg-accent-bg"
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Números de página */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, idx) => (
          <button
            key={idx}
            onClick={() => typeof page === "number" && goToPage(page)}
            disabled={page === "..."}
            className={`min-w-8 h-8 px-2 rounded-lg text-sm font-medium transition-all ${
              page === pagina
                ? "bg-accent text-white"
                : page === "..."
                ? "text-text/30 cursor-default"
                : "text-text hover:text-accent hover:bg-accent-bg"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={pagina === maximo}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
          pagina === maximo
            ? "text-text/30 cursor-not-allowed"
            : "text-text hover:text-accent hover:bg-accent-bg"
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};