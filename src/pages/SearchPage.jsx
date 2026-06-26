import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../utils/api";
import MovieCard from "../components/MovieCard";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      api.search(query).then(data => {
        setResults(data);
        setLoading(false);
      }).catch(err => {
        console.error("Search failed:", err);
        setLoading(false);
      });
    }
  }, [query]);

  return (
    <div className="pt-24 px-6 md:px-12 min-h-screen">
      <h1 className="text-2xl font-bold mb-8">Search results for: {query}</h1>
      {loading ? (
        <p>Searching database...</p>
      ) : results.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {results.map(item => <MovieCard key={item.id} movie={item} type={item.media_type} />)}
        </div>
      ) : (
        <p className="text-neutral-400">No results found.</p>
      )}
    </div>
  );
}
