import { useEffect, useState } from "react";
import { useUrl } from "../context/UrlContext";
import { Link } from "react-router-dom";
import { Paginacion } from "../components/Paginacion";
import { useAuth } from "../context/AuthContext";
import { UrlCard } from "../components/UrlCard";

export const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(6);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const { get } = useUrl();

  const maximo = Math.ceil(urls.length / porPagina);

  useEffect(() => {
  const getUrls = async () => {
    setLoading(true);
    try {
      const data = await get(user.id);
      setUrls(data);
    } finally {
      setLoading(false);
    }
  };
  getUrls();
}, [user?.id, get]);

  useEffect(() => {
    document.title = "Dashboard";
  }, []);


  if (loading) {
  return (
    <div className="grow flex items-center justify-center bg-bg">
      <div className="text-center">
        <div className="spinner mx-auto mb-4"></div>
        <p className="text-text">Loading your links...</p>
      </div>
    </div>
  );
}

  if (urls?.length === 0) {
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-h">My URLs</h1>
          <p className="text-text mt-1">
            Manage and track your shortened links
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {urls
            .slice(
              (pagina - 1) * porPagina,
              (pagina - 1) * porPagina + porPagina,
            )
            .map((link, index) => (
              <UrlCard link={link} key={index} urls={urls} setUrls={setUrls} index={index}/>
            ))}
        </div>

        {maximo > 1 && (
          <div className="mt-8">
            <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo}/>
          </div>
        )}
      </div>
    </div>
  );
};
