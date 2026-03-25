export const getClientUrl = () => {
  return import.meta.env.VITE_CLIENT_URL || "https://shortener-ar.vercel.app";
};