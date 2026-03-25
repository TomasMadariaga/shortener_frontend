import { useEffect, useState } from "react";
import { useUrl } from "../context/UrlContext";
import { Link } from "react-router-dom";
import { Paginacion } from "../components/Paginacion";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { formatUrl } from "../utils/formatUrl";
import { getClientUrl } from "../utils/clientUrl";

export const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(6);
  const { user } = useAuth();
  const { get, deleteLink } = useUrl();

  const maximo = Math.ceil(urls.length / porPagina);
  const clientUrl = getClientUrl();

  useEffect(() => {
    const getUrls = async () => {
      const data = await get(user.id);
      setUrls(data);
    };
    getUrls();
  }, []);

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  const handleDelete = async (id, url) => {
    if (confirm(`Delete "${url}"?`)) {
      await deleteLink(id);
      setUrls(urls.filter((link) => link.id !== id));
      toast.success("URL deleted successfully");
    }
  };

  if (urls.length === 0) {
    return (
      <div className="grow flex items-center justify-center bg-bg">
        <div className="text-center">
          <svg
            className="w-16 h-16 mx-auto text-text/30 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m1.172-4.172l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          <h2 className="text-text-h text-xl font-medium mb-2">No URLs yet</h2>
          <p className="text-text mb-6">Create your first shortened link</p>
          <Link
            to="/shorter"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-lg hover:opacity-90 transition"
          >
            Shorten a URL
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grow bg-bg py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-h">My URLs</h1>
          <p className="text-text mt-1">
            Manage and track your shortened links
          </p>
        </div>

        {/* Grid de URLs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {urls
            .slice(
              (pagina - 1) * porPagina,
              (pagina - 1) * porPagina + porPagina,
            )
            .map((link, index) => (
              <div
                key={link.id}
                className="group border border-border rounded-xl p-5 bg-card/30 hover:border-accent/50 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-accent bg-accent-bg px-2 py-0.5 rounded-full">
                        #{index + 1}
                      </span>
                      <span className="text-xs text-text/50">
                        {new Date(link.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="mb-3">
                      <p className="text-text-h text-sm font-medium mb-1">
                        Original URL
                      </p>
                      <a
                        href={formatUrl(link.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text hover:text-accent text-sm break-all transition-colors block"
                      >
                        {link.url}
                      </a>
                    </div>
                    <div className="mb-3">
                      <p className="text-text-h text-sm font-medium mb-1">
                        Short URL
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link
                          to={`/${link.shortUrl}`}
                          target="_blank"
                          className="text-accent hover:underline text-sm break-all"
                        >
                          {`${clientUrl}/${link.shortUrl}`}
                        </Link>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `${clientUrl}/${link.shortUrl}`,
                            );
                            toast.success("Copied!");
                          }}
                          className="text-text/40 hover:text-accent transition"
                          title="Copy to clipboard"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <div className="text-center bg-accent-bg rounded-lg px-3 py-1.5">
                      <p className="text-accent font-bold text-xl">
                        {link.clicks}
                      </p>
                      <p className="text-text text-xs">clicks</p>
                    </div>
                    <button
                      onClick={() => handleDelete(link.id, link.url)}
                      className="p-2 text-text/40 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition"
                      title="Delete"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                    <Link
                      to={`/dashboard/links/${link.shortUrl}`}
                      className="text-accent hover:underline text-sm"
                    >
                      View details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Paginación */}
        {maximo > 1 && (
          <div className="mt-8">
            <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
          </div>
        )}
      </div>
    </div>
  );
};
