"use client";

import { useState } from "react";
import Player from "./Player";
import { Movie } from "@/types";
import { ChevronDown } from "lucide-react";

interface TVWatchClientProps {
  id: string;
  show: Movie;
}

export default function TVWatchClient({ id, show }: TVWatchClientProps) {
  const [season, setSeason] = useState("1");
  const [episode, setEpisode] = useState("1");

  const seasons = show.seasons || [];
  const currentSeasonData = seasons.find(s => s.season_number.toString() === season);
  const maxEpisodes = currentSeasonData ? currentSeasonData.episode_count : 24;

  const episodeOptions = Array.from({ length: maxEpisodes }, (_, i) => i + 1);
  const seasonOptions = seasons.filter(s => s.season_number > 0);

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden group">
      {/* Floating Season & Episode Selectors */}
      <div className="absolute top-6 right-6 z-30 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="relative">
          <select
            value={season}
            onChange={(e) => {
              setSeason(e.target.value);
              setEpisode("1"); // Reset episode when season changes
            }}
            className="appearance-none bg-black/60 backdrop-blur-md border border-neutral-700 text-white text-sm font-medium py-2 pl-4 pr-10 rounded-full focus:outline-none focus:border-red-600 cursor-pointer"
          >
            {seasonOptions.length > 0 ? (
              seasonOptions.map(s => (
                <option key={s.id} value={s.season_number}>Season {s.season_number}</option>
              ))
            ) : (
              <option value="1">Season 1</option>
            )}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={episode}
            onChange={(e) => setEpisode(e.target.value)}
            className="appearance-none bg-black/60 backdrop-blur-md border border-neutral-700 text-white text-sm font-medium py-2 pl-4 pr-10 rounded-full focus:outline-none focus:border-red-600 cursor-pointer"
          >
            {episodeOptions.map(e => (
              <option key={e} value={e}>Episode {e}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
        </div>
      </div>

      {/* Player Area */}
      <Player
        id={id}
        title={`${show.name || "TV Show"} - S${season} E${episode}`}
        type="tv"
        season={season}
        episode={episode}
      />
    </div>
  );
}
