require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.tmdb.org/3";

if (!TMDB_API_KEY) {
  console.error("CRITICAL: TMDB_API_KEY is missing in backend/.env");
}

// Proxy Helper
const fetchTMDB = async (endpoint, queryParams = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: {
        api_key: TMDB_API_KEY,
        ...queryParams,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`TMDB API Error (${endpoint}):`, error.message);
    throw error;
  }
};

// --- API Routes ---

// Get Trending Movies
app.get("/api/movies/trending", async (req, res) => {
  try {
    const data = await fetchTMDB("/trending/movie/week");
    res.json(data.results || []);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trending movies" });
  }
});

// Get Trending TV Shows
app.get("/api/tv/trending", async (req, res) => {
  try {
    const data = await fetchTMDB("/trending/tv/week");
    res.json(data.results || []);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trending TV shows" });
  }
});

// Search Multi (Movies & TV)
app.get("/api/search", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.json([]);
  try {
    const data = await fetchTMDB("/search/multi", { query: q, include_adult: false });
    const filtered = (data.results || []).filter(
      (item) => item.media_type === "movie" || item.media_type === "tv"
    );
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: "Search failed" });
  }
});

// Get Movie Details
app.get("/api/movie/:id", async (req, res) => {
  try {
    const data = await fetchTMDB(`/movie/${req.params.id}`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
});

// Get TV Show Details
app.get("/api/tv/:id", async (req, res) => {
  try {
    const data = await fetchTMDB(`/tv/${req.params.id}`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch TV details" });
  }
});

// Get TV Season Details
app.get("/api/tv/:id/season/:season_number", async (req, res) => {
  try {
    const data = await fetchTMDB(`/tv/${req.params.id}/season/${req.params.season_number}`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch season details" });
  }
});

// Get Genres
app.get("/api/genres/:type", async (req, res) => {
  const type = req.params.type === "tv" ? "tv" : "movie";
  try {
    const data = await fetchTMDB(`/genre/${type}/list`);
    res.json(data.genres || []);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch genres" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
