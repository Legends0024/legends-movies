import { getTrendingTvShows } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";

export default async function TvPage() {
  const shows = await getTrendingTvShows();

  return (
    <main className="w-full min-h-screen pt-24 px-6 md:px-16 pb-20">
      <h1 className="text-3xl font-bold mb-8 text-white">Top Trending TV Shows</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {shows.map((show) => (
          <MovieCard key={show.id} movie={show} />
        ))}
      </div>
    </main>
  );
}
