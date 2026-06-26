import { useState, useEffect } from "react";
import { api } from "../utils/api";
import Row from "../components/Row";

export default function Home() {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    api.getTrendingMovies().then(movies => setHero(movies[0]));
  }, []);

  return (
    <div className="pb-20">
      {/* Hero */}
      <div className="relative h-[85vh] w-full bg-neutral-900">
        {hero && (
          <img src={`https://image.tmdb.org/t/p/original${hero.backdrop_path}`} alt="Hero" className="w-full h-full object-cover opacity-60" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent" />
        <div className="absolute bottom-32 left-6 md:left-12 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-md">{hero?.title || hero?.name}</h1>
          <p className="text-neutral-300 line-clamp-3 mb-6 font-medium text-lg drop-shadow-md">{hero?.overview}</p>
        </div>
      </div>

      <div className="-mt-24 relative z-10 space-y-2">
        <Row title="Trending Movies" fetchFn={() => api.getTrendingMovies()} type="movie" />
        <Row title="Trending TV Shows" fetchFn={() => api.getTrendingTvShows()} type="tv" />
        <Row title="Action Blockbusters" fetchFn={() => api.discover("movie", "28")} type="movie" />
        <Row title="Sci-Fi & Fantasy" fetchFn={() => api.discover("movie", "878")} type="movie" />
        <Row title="Hilarious Comedies" fetchFn={() => api.discover("movie", "35")} type="movie" />
        <Row title="Spine-Chilling Horror" fetchFn={() => api.discover("movie", "27")} type="movie" />
        <Row title="Romantic Movies" fetchFn={() => api.discover("movie", "10749")} type="movie" />
      </div>
    </div>
  );
}
