import { useState, useEffect } from "react";
import { api } from "../utils/api";
import Row from "../components/Row";

export default function Movies() {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    api.discover("movie", "28").then(movies => setHero(movies[0])); // Action movie as hero
  }, []);

  return (
    <div className="pb-20">
      {/* Hero */}
      <div className="relative h-[70vh] w-full bg-neutral-900">
        {hero && (
          <img src={`https://image.tmdb.org/t/p/original${hero.backdrop_path}`} alt="Hero" className="w-full h-full object-cover opacity-60" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent" />
        <div className="absolute bottom-20 left-6 md:left-12 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-md">Movies</h1>
          <h2 className="text-2xl font-bold mb-2 text-white drop-shadow-md">{hero?.title}</h2>
          <p className="text-neutral-300 line-clamp-3 mb-6 font-medium drop-shadow-md">{hero?.overview}</p>
        </div>
      </div>

      <div className="-mt-16 relative z-10 space-y-2">
        <Row title="Action Blockbusters" fetchFn={() => api.discover("movie", "28")} type="movie" />
        <Row title="Sci-Fi & Fantasy" fetchFn={() => api.discover("movie", "878")} type="movie" />
        <Row title="Hilarious Comedies" fetchFn={() => api.discover("movie", "35")} type="movie" />
        <Row title="Spine-Chilling Horror" fetchFn={() => api.discover("movie", "27")} type="movie" />
        <Row title="Romantic Movies" fetchFn={() => api.discover("movie", "10749")} type="movie" />
        <Row title="Documentaries" fetchFn={() => api.discover("movie", "99")} type="movie" />
        <Row title="Family Movies" fetchFn={() => api.discover("movie", "10751")} type="movie" />
      </div>
    </div>
  );
}
