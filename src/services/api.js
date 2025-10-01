import axios from "axios";
import TMDB from "../config";

const api = axios.create({
  baseURL: TMDB.BASE_URL,
  headers: TMDB.TOKEN ? { Authorization: `Bearer ${TMDB.TOKEN}` } : undefined,
  params: {
    language: TMDB.LANG,
    include_adult: false,
    ...(TMDB.TOKEN ? {} : TMDB.API_KEY ? { api_key: TMDB.API_KEY } : {}),
  },
});

api.interceptors.response.use(
  (r) => r,
  (e) => {
    const status = e?.response?.status;
    const msg = e?.response?.data?.status_message || e.message || "Erro";
    return Promise.reject(new Error(`${status ?? ""} ${msg}`.trim()));
  }
);

export default api;
