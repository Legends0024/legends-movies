import { useState, useEffect } from "react";
import { api } from "../utils/api";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getTrendingMovies(), api.getTrendingTvShows()])
      .then(([movies, tv]) => {
        setTrendingMovies(movies);
        setTrendingTv(tv);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load trending data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="pt-32 text-center">Loading...</div>;

  return (
    <div className="pb-20">
      {/* Hero */}
      <div className="relative h-[70vh] w-full bg-neutral-900">
        {trendingMovies[0] && (
          <img src={`https://image.tmdb.org/t/p/original${trendingMovies[0].backdrop_path}`} alt="Hero" className="w-full h-full object-cover opacity-60" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent" />
        <div className="absolute bottom-20 left-10 md:left-20 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">{trendingMovies[0]?.title}</h1>
          <p className="text-neutral-300 line-clamp-3 mb-6">{trendingMovies[0]?.overview}</p>
        </div>
      </div>

      <div className="px-6 md:px-12 -mt-10 relative z-10 space-y-12">
        <section>
          <h2 className="text-xl font-bold mb-4">Trending Movies</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide py-4">
            {trendingMovies.map(movie => <MovieCard key={movie.id} movie={movie} type="movie" />)}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Trending TV Shows</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide py-4">
            {trendingTv.map(tv => <MovieCard key={tv.id} movie={tv} type="tv" />)}
          </div>
        </section>
      </div>
    </div>
  );
}
