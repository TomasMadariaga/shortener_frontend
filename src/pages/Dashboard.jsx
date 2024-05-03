import { useEffect, useState } from "react";
import { useUrl } from "../context/UrlContext";
import { Link } from "react-router-dom";
import { Paginacion } from "../components/Paginacion";

export const Dashboard = () => {
  const [url, setUrl] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(8);

  const maximo = Math.ceil(url.length / porPagina);
  const { get, deleteLink } = useUrl();

  useEffect(() => {
    const getUrl = async () => {
      const data = await get();
      setUrl(data);
      console.log(data)
    };
    getUrl();
  }, [url]);
  return (
    <div className="bg-gray-700 h-4/5">
      <h1 className="text-white text-center py-5 font-bold">My URLs</h1>
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <div className="p-6 grid grid-cols-4 gap-4 mx-10">
            {url &&
              url
                .slice(
                  (pagina - 1) * porPagina,
                  (pagina - 1) * porPagina + porPagina
                )
                .map((link, i) => (
                  <div
                    className="bg-gray-800 grid rounded-md p-4 shadow-md shadow-gray-900"
                    key={link.id}
                  >
                    <div className="flex bg-gray-800 rounded-md max-w-xs pb-3 justify-between items-center max-h-48 sm:max-h-64 overflow-hidden">
                      <h2 className="bg-gray-600 p-2 rounded-md text-white font-bold truncate">
                        {i + 1}) {link.url}
                      </h2>
                      <p className="text-gray-400 font-bold text-sm p-1">
                        {(link.createdAt = new Date().toLocaleDateString())}
                      </p>
                      <button
                        onClick={async () => await deleteLink(link.id)}
                        className="bg-red-700 hover:bg-red-600 p-2 rounded-md text-white font-bold"
                      >
                        X
                      </button>
                    </div>
                    <p className="text-gray-400 font-bold text-left p-1">
                      Clicks: {link.clicks}
                    </p>
                    <Link
                      to={`http://localhost:5173/${link.shortUrl}`}
                      className="text-blue-500 hover:underline text-lg text-center rounded-md bg-gray-600 p-2"
                    >{`http://localhost:5173/${link.shortUrl}`}</Link>
                  </div>
                ))}
          </div>
          <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
        </div>
      </div>

      {url.length == 0 && (
        <div className="justify-center">
          <h1 className="text-white font-bold text-xl text-center tracking-wide">
            No URLs Found
          </h1>
        </div>
      )}
    </div>
  );
};
