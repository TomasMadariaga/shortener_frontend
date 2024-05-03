import { useEffect } from "react";
import { useUrl } from "../context/UrlContext";
import { useParams } from "react-router-dom";

export const Redirect = () => {
  const { redirectTo, updateClick, getAUrl } = useUrl();
  const { id } = useParams();

  useEffect(() => {
    const redirect = async () => {
      const url = await getAUrl(id);
      // Obtener el url largo y redirigir desde aca

      const res = await redirectTo(id);
      const { redirectUrl } = res.data;
      console.log(url.data.data);
      window.location.href = redirectUrl;

      // Funcion para actualizar los clicks
      const data = await updateClick(url.data.data.shortUrl, url.data.data);
      console.log(data);
    };
    redirect();
  }, []);

  return (
    <div className="flex items-center bg-gray-700 justify-center w-full h-4/5">
      <div className="text-white font-bold text-lg">Redirecting...</div>
    </div>
  );
};
