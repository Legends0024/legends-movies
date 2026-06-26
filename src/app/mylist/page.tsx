"use client";

import { useMyList } from "@/hooks/useMyList";
import MovieCard from "@/components/MovieCard";

export default function MyListPage() {
  const { myList } = useMyList();

  return (
    <main className="w-full min-h-screen pt-24 px-6 md:px-16 pb-20 bg-neutral-950">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-wide">My List</h1>
      </div>

      {myList.length === 0 ? (
        <div className="flex flex-col items-center justify-center pt-20 text-neutral-500">
          <p className="text-xl">You haven&apos;t added any titles to your list yet.</p>
          <p className="mt-2 text-sm">Find something to watch on the Home page.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {myList.map((movie) => (
            <MovieCard key={`mylist-${movie.id}`} movie={movie} />
          ))}
        </div>
      )}
    </main>
  );
}
