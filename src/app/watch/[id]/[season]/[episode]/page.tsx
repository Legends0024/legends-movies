import Player from "@/components/Player";
import { getTvShowDetails } from "@/lib/tmdb";
import { Metadata } from "next";

interface WatchTvPageProps {
  params: Promise<{
    id: string;
    season: string;
    episode: string;
  }>;
}

export async function generateMetadata({ params }: WatchTvPageProps): Promise<Metadata> {
  const { id, season, episode } = await params;
  const show = await getTvShowDetails(id);

  if (!show) {
    return {
      title: "Watch | LegendsMovies",
    };
  }

  return {
    title: `Watching ${show.name || "TV Show"} S${season}E${episode} - LegendsMovies`,
    description: show.overview,
  };
}

export default async function WatchTvPage({ params }: WatchTvPageProps) {
  const { id, season, episode } = await params;
  const show = await getTvShowDetails(id);
  const showTitle = show ? show.name || "Unknown Title" : "Unknown Title";
  
  return (
    <main className="w-screen h-screen bg-black overflow-hidden">
      <Player
        id={id}
        season={season}
        episode={episode}
        title={showTitle}
        type="tv"
      />
    </main>
  );
}
