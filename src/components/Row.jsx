import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";

export default function Row({ title, fetchFn, type = "movie" }) {
  const [movies, setMovies] = useState([]);
  const rowRef = useRef(null);
  const [isMoved, setIsMoved] = useState(false);

  useEffect(() => {
    fetchFn().then(data => {
      setMovies(data);
    }).catch(err => console.error("Error fetching row data", err));
  }, [fetchFn]);

  const handleClick = (direction) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="space-y-2 group/row relative mb-8">
      <h2 className="w-56 text-lg md:text-xl font-bold text-[#e5e5e5] px-6 md:px-12 transition duration-200 hover:text-white">
        {title}
      </h2>
      
      <div className="relative">
        <button
          className={`absolute top-0 bottom-0 left-0 z-40 m-auto h-full w-12 cursor-pointer opacity-0 transition group-hover/row:opacity-100 hover:scale-125 bg-gradient-to-r from-black/80 to-transparent ${!isMoved && "hidden"}`}
          onClick={() => handleClick("left")}
        >
          <ChevronLeft className="m-auto h-8 w-8 text-white" />
        </button>
        
        <div 
          ref={rowRef} 
          className="flex items-center gap-2 overflow-x-auto overflow-y-hidden scrollbar-hide px-6 md:px-12 py-4"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} type={movie.media_type || type} />
          ))}
        </div>

        <button
          className="absolute top-0 bottom-0 right-0 z-40 m-auto h-full w-12 cursor-pointer opacity-0 transition group-hover/row:opacity-100 hover:scale-125 bg-gradient-to-l from-black/80 to-transparent"
          onClick={() => handleClick("right")}
        >
          <ChevronRight className="m-auto h-8 w-8 text-white" />
        </button>
      </div>
    </div>
  );
}
