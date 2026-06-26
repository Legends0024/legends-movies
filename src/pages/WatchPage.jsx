import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import { ArrowLeft, ServerCrash, ChevronDown } from "lucide-react";

const SERVERS = [
  { id: "vidsrc", name: "VidSrc" },
  { id: "vidsrcpro", name: "VidSrc Pro" },
  { id: "superembed", name: "SuperEmbed" },
  { id: "multiembed", name: "MultiEmbed" },
  { id: "vidcore", name: "VidCore" },
];

export default function WatchPage({ type }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [server, setServer] = useState("vidsrc");
  const [season, setSeason] = useState("1");
  const [episode, setEpisode] = useState("1");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchDetails = type === "movie" ? api.getMovieDetails(id) : api.getTvDetails(id);
    fetchDetails.then(data => {
      setDetails(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id, type]);

  if (loading) return <div className="w-screen h-screen flex items-center justify-center bg-black">Loading...</div>;
  if (!details) return <div className="w-screen h-screen flex items-center justify-center bg-black">Error loading media.</div>;

  const queryParams = "?theme=16A085&autoPlay=true&title=true&poster=true";
  let videoUrl = "";

  if (type === "movie") {
    switch (server) {
      case "vidsrc": videoUrl = `https://vidsrc.net/embed/movie?tmdb=${id}`; break;
      case "vidsrcpro": videoUrl = `https://vidsrc.pro/embed/movie/${id}`; break;
      case "superembed": videoUrl = `https://multiembed.mov/?video_id=${id}&tmdb=1`; break;
      case "multiembed": videoUrl = `https://multiembed.mov/direct/movie.php?video_id=${id}&tmdb=1`; break;
      case "vidcore": videoUrl = `https://vidcore.net/movie/${id}${queryParams}`; break;
      default: videoUrl = `https://vidsrc.net/embed/movie?tmdb=${id}`;
    }
  } else {
    switch (server) {
      case "vidsrc": videoUrl = `https://vidsrc.net/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`; break;
      case "vidsrcpro": videoUrl = `https://vidsrc.pro/embed/tv/${id}/${season}/${episode}`; break;
      case "superembed": videoUrl = `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${season}&e=${episode}`; break;
      case "multiembed": videoUrl = `https://multiembed.mov/direct/tv.php?video_id=${id}&tmdb=1&s=${season}&e=${episode}`; break;
      case "vidcore": videoUrl = `https://vidcore.net/tv/${id}/${season}/${episode}${queryParams}`; break;
      default: videoUrl = `https://vidsrc.net/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`;
    }
  }

  const seasons = details.seasons || [];
  const currentSeasonData = seasons.find(s => s.season_number.toString() === season);
  const maxEpisodes = currentSeasonData ? currentSeasonData.episode_count : 24;
  const episodeOptions = Array.from({ length: maxEpisodes }, (_, i) => i + 1);
  const seasonOptions = seasons.filter(s => s.season_number > 0);

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden group">
      {/* Top Left: Back Button & Server Selection Overlay */}
      <div className="absolute top-6 left-6 z-30 flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="bg-black/60 backdrop-blur-md rounded-md p-3 border border-neutral-800">
          <p className="text-xs text-neutral-400 font-semibold uppercase mb-2">Change Server (If Broken)</p>
          <div className="flex flex-col gap-2">
            {SERVERS.map(s => (
              <button 
                key={s.id} 
                onClick={() => setServer(s.id)}
                className={`text-sm px-3 py-1.5 rounded-sm text-left transition-colors ${server === s.id ? "bg-red-600 text-white font-semibold" : "text-neutral-300 hover:bg-neutral-700"}`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top Right: TV Controls Overlay */}
      {type === "tv" && (
        <div className="absolute top-6 right-6 z-30 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="relative">
            <select
              value={season}
              onChange={(e) => { setSeason(e.target.value); setEpisode("1"); }}
              className="appearance-none bg-black/60 backdrop-blur-md border border-neutral-700 text-white text-sm font-medium py-2 pl-4 pr-10 rounded-full focus:outline-none focus:border-red-600 cursor-pointer"
            >
              {seasonOptions.length > 0 ? seasonOptions.map(s => (
                <option key={s.id} value={s.season_number}>Season {s.season_number}</option>
              )) : <option value="1">Season 1</option>}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={episode}
              onChange={(e) => setEpisode(e.target.value)}
              className="appearance-none bg-black/60 backdrop-blur-md border border-neutral-700 text-white text-sm font-medium py-2 pl-4 pr-10 rounded-full focus:outline-none focus:border-red-600 cursor-pointer"
            >
              {episodeOptions.map(e => <option key={e} value={e}>Episode {e}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
          </div>
        </div>
      )}

      {/* Video Iframe */}
      <iframe
        src={videoUrl}
        className="w-full h-full border-0 absolute inset-0 z-0 bg-black"
        allowFullScreen
        allow="encrypted-media"
        title="Video Player"
      />
    </div>
  );
}
