import { Link } from "react-router-dom";

export default function MovieCard({ movie, type = "movie" }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  return (
    <Link to={`/watch/${type}/${movie.id}`} className="block flex-none w-[150px] sm:w-[200px] group relative transition-transform duration-300 hover:scale-105">
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md bg-neutral-900">
        <img src={imageUrl} alt={movie.title || movie.name} className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center pl-1 bg-black/40 backdrop-blur-sm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
