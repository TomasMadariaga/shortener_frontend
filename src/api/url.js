import axios from "./axios";

const token = localStorage.getItem("token");

export const generateUrl = (url) =>
  axios.post(`/u`, url, { headers: { Authorization: token } });

export const getUrls = () =>
  axios.get(`/u/get`, { headers: { Authorization: token } });

export const redirect = (id) => axios.get(`/u/${id}`);

export const getUrl = (id) => axios.get(`/u/get/${id}`);

export const updateUrl = (id, data) => axios.put(`/u/${id}`, data);

export const deleteUrl = (id) => axios.delete(`/u/${id}`);

export const checkSlugAvailability = (slug) => {
  return axios.get(`/u/check-slug/${slug}`, {
    headers: { Authorization: token },
  });
};

export const getLinkStats = (shortUrl) => {
  return axios.get(`/u/stats/${shortUrl}`, {
    headers: { Authorization: token },
  });
};
