import { useState, useEffect } from "react";
import { api } from "../utils/api";
import Row from "../components/Row";

export default function TvShows() {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    api.discover("tv", "10759").then(shows => setHero(shows[0])); // Action & Adventure TV as hero
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
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-md">TV Shows</h1>
          <h2 className="text-2xl font-bold mb-2 text-white drop-shadow-md">{hero?.name}</h2>
          <p className="text-neutral-300 line-clamp-3 mb-6 font-medium drop-shadow-md">{hero?.overview}</p>
        </div>
      </div>

      <div className="-mt-16 relative z-10 space-y-2">
        <Row title="Action & Adventure" fetchFn={() => api.discover("tv", "10759")} type="tv" />
        <Row title="Sci-Fi & Fantasy" fetchFn={() => api.discover("tv", "10765")} type="tv" />
        <Row title="Animation" fetchFn={() => api.discover("tv", "16")} type="tv" />
        <Row title="Comedy" fetchFn={() => api.discover("tv", "35")} type="tv" />
        <Row title="Crime" fetchFn={() => api.discover("tv", "80")} type="tv" />
        <Row title="Drama" fetchFn={() => api.discover("tv", "18")} type="tv" />
        <Row title="Mystery" fetchFn={() => api.discover("tv", "9648")} type="tv" />
      </div>
    </div>
  );
}
