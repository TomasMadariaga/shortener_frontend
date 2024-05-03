import axios from "./axios";

export const generateUrl = (url) => axios.post(`/u`, url);

export const getUrls = () => axios.get(`/u/get`);

export const redirect = (id) => axios.get(`/u/${id}`);

export const getUrl = (id) => axios.get(`/u/get/${id}`);

export const updateUrl = (id, data) => axios.put(`/u/${id}`, data);

export const deleteUrl = (id) => axios.delete(`/u/${id}`);
