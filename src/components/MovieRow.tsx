import MovieCard from "./MovieCard";
import { Movie } from "@/types";

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  if (!movies || movies.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-white tracking-wide">
        {title}
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
        {movies.map((movie) => (
          <div key={`${title.replace(/\s+/g, "-").toLowerCase()}-${movie.id}`} className="w-[160px] md:w-[220px] flex-none snap-start">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
