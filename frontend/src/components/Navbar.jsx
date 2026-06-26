import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (location.pathname.startsWith("/watch")) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
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
      <div className="flex items-center gap-4">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Movies, TV shows..."
            className="w-32 sm:w-64 bg-black/40 border border-neutral-700 text-sm text-white px-4 py-2 rounded-full focus:outline-none focus:border-neutral-400 pl-10 transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        </form>
      </div>
    </header>
  );
}
