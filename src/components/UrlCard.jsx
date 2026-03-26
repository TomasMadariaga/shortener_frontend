import { formatUrl } from "../utils/formatUrl";
import { Link } from "react-router-dom";
import { getClientUrl } from "../utils/clientUrl";
import { useUrl } from "../context/UrlContext";
import { toast } from "react-toastify";


export const UrlCard = ({ link, index, urls, setUrls }) => {
  const clientUrl = getClientUrl();
    const { deleteLink } = useUrl();
  

  const handleDelete = async (id, url) => {
    if (confirm(`Delete "${url}"?`)) {
      await deleteLink(id);
      setUrls(urls.filter((link) => link.id !== id));
      toast.success("URL deleted successfully");
    }
  };

  return (
    <div className="group border border-border rounded-xl p-5 bg-card/30 hover:border-accent/50 hover:shadow-lg transition-all duration-200">
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
            <p className="text-text-h text-sm font-medium mb-1">Original URL</p>
            <a
              href={formatUrl(link.url)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text hover:text-accent text-sm break-all transition-colors block max-h-16 overflow-y-auto scrollbar-thin"
              title={link.url}
            >
              {link.url}
            </a>
          </div>

          <div className="mb-3">
            <p className="text-text-h text-sm font-medium mb-1">Short URL</p>
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                to={`/${link.shortUrl}`}
                target="_blank"
                className="text-accent hover:underline text-sm break-all"
              >
                <span className="md:hidden">/{link.shortUrl}</span>
                <span className="hidden md:inline">{`${clientUrl}/${link.shortUrl}`}</span>
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
            <p className="text-accent font-bold text-xl">{link.clicks}</p>
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
  );
};
