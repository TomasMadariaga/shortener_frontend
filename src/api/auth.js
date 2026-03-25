import axios from "./axios";

export const registerRequest = (user) => axios.post(`/auth/register`, user);

export const loginRequest = (user) => axios.post(`/auth/login`, user);

export const verifyTokenRequest = (token) => axios.post(`/auth/verify`, {token});

export const logoutRequest = () => axios.post('/auth/logout');
