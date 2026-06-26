import axios from "axios";

const API_BASE = "/api";

export const api = {
  getTrendingMovies: async () => {
    const res = await axios.get(`${API_BASE}/movies/trending`);
    return res.data;
  },
  getTrendingTvShows: async () => {
    const res = await axios.get(`${API_BASE}/tv/trending`);
    return res.data;
  },
  search: async (query) => {
    const res = await axios.get(`${API_BASE}/search?q=${encodeURIComponent(query)}`);
    return res.data;
  },
  getMovieDetails: async (id) => {
    const res = await axios.get(`${API_BASE}/movie/${id}`);
    return res.data;
  },
  getTvDetails: async (id) => {
    const res = await axios.get(`${API_BASE}/tv/${id}`);
    return res.data;
  },
  getGenres: async (type = "movie") => {
    const res = await axios.get(`${API_BASE}/genres/${type}`);
    return res.data;
  },
  discover: async (type = "movie", genreId = "") => {
    let url = `${API_BASE}/discover/${type}`;
    if (genreId) url += `?with_genres=${genreId}`;
    const res = await axios.get(url);
    return res.data;
  }
};
