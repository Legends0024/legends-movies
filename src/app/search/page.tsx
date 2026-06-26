import { searchMovies } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || "";
  const results = await searchMovies(query);

  return (
    <main className="w-full min-h-screen pt-24 px-6 md:px-16 pb-20">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-300">
          Search results for: <span className="text-white">{query}</span>
        </h1>
      </div>

      {results.length === 0 ? (
        <div className="flex flex-col items-center justify-center pt-20 text-neutral-500">
          <p className="text-xl">No results found.</p>
          <p className="mt-2 text-sm">Try searching for a different title.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </main>
  );
}
