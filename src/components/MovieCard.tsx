import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { Movie } from "@/types";
import BookmarkButton from "./BookmarkButton";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const title = movie.title || movie.name || "Unknown";
  const mediaType = movie.media_type === "tv" ? "tv" : "movie"; // Default to movie for discover/provider endpoints

  return (
    <Link
      href={`/watch/${mediaType}/${movie.id}`}
      className="relative flex-none w-full aspect-[2/3] rounded-md overflow-hidden group transition-transform duration-300 hover:scale-105 hover:z-30 cursor-pointer block"
    >
      {movie.poster_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={title}
          fill
          className="object-cover group-hover:opacity-80 transition-opacity"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
        />
      ) : (
        <div className="w-full h-full bg-neutral-800 flex items-center justify-center p-4 text-center">
          <span className="text-neutral-500 text-sm font-medium">{title}</span>
        </div>
      )}
      
      {/* Interactive Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="font-semibold text-white truncate text-sm md:text-base">{title}</h3>
        <div className="flex items-center gap-2 text-xs text-red-600 font-medium mt-2">
          <span className="flex items-center justify-center bg-red-600 rounded-full p-1.5 text-white">
            <Play className="w-3 h-3 fill-current" />
          </span>
          Watch Now
        </div>
      </div>

      {/* Bookmark Button */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <BookmarkButton movie={movie} />
      </div>
    </Link>
  );
}
