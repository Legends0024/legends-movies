import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { api } from "../utils/api";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch suggestions when query changes
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const delayFn = setTimeout(async () => {
        try {
          const data = await api.search(searchQuery.trim());
          setSuggestions(data.slice(0, 5)); // Show top 5 suggestions
        } catch (err) {
          console.error("Failed to fetch suggestions", err);
        }
      }, 300); // 300ms debounce
      return () => clearTimeout(delayFn);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (location.pathname.startsWith("/watch")) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSuggestionClick = (item) => {
    setShowSuggestions(false);
    setSearchQuery("");
    navigate(`/watch/${item.media_type}/${item.id}`);
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4 flex items-center justify-between ${
      isScrolled ? "bg-[#141414] shadow-md" : "bg-gradient-to-b from-black/90 to-transparent"
    }`}>
      <div className="flex items-center gap-10">
        <Link to="/">
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#E50914] tracking-tighter cursor-pointer">
            LEGENDSMOVIES
          </h1>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-300">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/" className="hover:text-white transition">TV Shows</Link>
          <Link to="/" className="hover:text-white transition">Movies</Link>
        </nav>
      </div>
      <div className="flex items-center gap-4" ref={searchRef}>
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search movies..."
            className="w-48 sm:w-64 bg-black/40 border border-neutral-700 text-sm text-white px-4 py-2 rounded-full focus:outline-none focus:border-red-600 pl-10 transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          
          {/* Live Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-[#141414] border border-neutral-800 rounded-md shadow-lg overflow-hidden z-50">
              {suggestions.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSuggestionClick(item)}
                  className="px-4 py-2 hover:bg-neutral-800 cursor-pointer flex items-center gap-3 transition-colors"
                >
                  {item.poster_path ? (
                    <img src={`https://image.tmdb.org/t/p/w92${item.poster_path}`} alt="poster" className="w-8 h-12 object-cover rounded-sm" />
                  ) : (
                    <div className="w-8 h-12 bg-neutral-900 rounded-sm" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate font-medium">{item.title || item.name}</p>
                    <p className="text-xs text-neutral-500 capitalize">{item.media_type} • {item.release_date?.substring(0,4) || item.first_air_date?.substring(0,4)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </form>
      </div>
    </header>
  );
}
