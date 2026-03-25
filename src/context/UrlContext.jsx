import { createContext, useContext, useState } from "react";
import {
  generateUrl,
  getUrls,
  deleteUrl,
  updateUrl,
  redirect,
  getUrl,
  checkSlugAvailability,
  getLinkStats as getLinkStatsApi
} from "../api/url";

export const UrlContext = createContext();

export const useUrl = () => {
  const context = useContext(UrlContext);
  if (!context) {
    throw new Error("useUrl must be used within an UrlProvider");
  }
  return context;
};

export const UrlProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);
  const [checkingSlug, setCheckingSlug] = useState(false);
  const [slugAvailable, setSlugAvailable] = useState(null);

  const create = async (url, userId) => {
    try {
      const res = await generateUrl(url, userId);
      return res.data.shortUrl;
    } catch (error) {
      console.log(error);
      setErrors([error.response.data.message]);
    }
  };

  const get = async (userId) => {
    try {
      const res = await getUrls(userId);
      return res.data.data;
    } catch (error) {
      console.log(error);
      setErrors([error.response.data.message]);
    }
  };

  const deleteLink = async (id) => {
    try {
      const res = await deleteUrl(id);
      return res;
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const getAUrl = async (id) => {
    try {
      const res = await getUrl(id);
      return res;
    } catch (error) {
      setErrors([error]);
    }
  };
  const updateClick = async (id, data) => {
    try {
      const res = await updateUrl(id, data);
      return res;
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const redirectTo = async (id) => {
    try {
      const res = await redirect(id);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const checkSlug = async (slug) => {
    if (!slug || slug.length < 3) {
      setSlugAvailable(null);
      return null;
    }

    const slugRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    if (!slugRegex.test(slug)) {
      setSlugAvailable(false);
      return false;
    }

    setCheckingSlug(true);
    try {
      const res = await checkSlugAvailability(slug);
      const available = res.data.available;
      setSlugAvailable(available);
      return available;
    } catch (error) {
      console.error("Error checking slug:", error);
      setSlugAvailable(null);
      return null;
    } finally {
      setCheckingSlug(false);
    }
  };

  const getLinkDetails = async (shortUrl) => {
    try {
      const res = await getLinkStatsApi(shortUrl);
      return res.data;
    } catch (error) {
      console.error("Error getting link stats:", error);
      throw error;
    }
  };
  return (
    <UrlContext.Provider
      value={{
        create,
        get,
        deleteLink,
        updateClick,
        redirectTo,
        getAUrl,
        checkSlug,
        checkingSlug,
        slugAvailable,
        getLinkDetails,
        errors,
      }}
    >
      {children}
    </UrlContext.Provider>
  );
};
