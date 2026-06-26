import TVWatchClient from "@/components/TVWatchClient";
import { getTvShowDetails } from "@/lib/tmdb";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface WatchTvPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: WatchTvPageProps): Promise<Metadata> {
  const { id } = await params;
  const show = await getTvShowDetails(id);
  
  return {
    title: show ? `Watch ${show.name} - LegendsMovies` : "Watch TV Show",
    description: show?.overview || "Stream TV shows in 4K instantly.",
  };
}

export default async function WatchTvPage({ params }: WatchTvPageProps) {
  const { id } = await params;
  const show = await getTvShowDetails(id);
  
  if (!show) {
    notFound();
  }

  return <TVWatchClient id={id} show={show} />;
}
