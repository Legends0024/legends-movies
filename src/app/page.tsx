import { getTrendingMovies, getMediaByProvider } from "@/lib/tmdb";
import MovieRow from "@/components/MovieRow";

export default async function Home() {
  const trendingMovies = await getTrendingMovies();
  const heroMovie = trendingMovies[0];

  // Fetch provider specific content (Region: IN)
  const netflixMovies = await getMediaByProvider(8);
  const primeMovies = await getMediaByProvider(119);
  const hotstarMovies = await getMediaByProvider(122);
  const sonylivMovies = await getMediaByProvider(237);
  const appleMovies = await getMediaByProvider(350);

  return (
    <main className="w-full">
      {/* Hero Section */}
      {heroMovie && (
        <section className="relative w-full h-[70vh] lg:h-[85vh]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 w-full lg:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold drop-shadow-xl mb-4 text-white">
              {heroMovie.title || heroMovie.name}
            </h1>
            <p className="text-lg text-neutral-300 drop-shadow-md mb-8 line-clamp-3">
              {heroMovie.overview}
            </p>
          </div>
        </section>
      )}

      {/* Grid Content */}
      <section className="relative z-20 px-6 md:px-16 pb-20 -mt-24 flex flex-col gap-12">
        <MovieRow title="Trending Movies" movies={trendingMovies.slice(1)} />
        <MovieRow title="Netflix Originals" movies={netflixMovies} />
        <MovieRow title="Prime Video" movies={primeMovies} />
        <MovieRow title="Hotstar Picks" movies={hotstarMovies} />
        <MovieRow title="Sony Liv" movies={sonylivMovies} />
        <MovieRow title="Apple TV+" movies={appleMovies} />
      </section>

      {/* TMDB Attribution */}
      <footer className="w-full py-8 mt-12 border-t border-neutral-800 text-center">
        <p className="text-neutral-500 text-sm">
          This product uses the TMDb API but is not endorsed or certified by TMDb.
        </p>
      </footer>
    </main>
  );
}
