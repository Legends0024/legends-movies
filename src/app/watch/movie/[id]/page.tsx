import WatchClient from "@/components/WatchClient";
import { getMovieDetails } from "@/lib/tmdb";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface WatchMoviePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: WatchMoviePageProps): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovieDetails(id);
  
  return {
    title: movie ? `Watch ${movie.title} - LegendsMovies` : "Watch Movie",
    description: movie?.overview || "Stream movies in 4K instantly.",
  };
}

export default async function WatchMoviePage({ params }: WatchMoviePageProps) {
  const { id } = await params;
  const movie = await getMovieDetails(id);
  
  if (!movie) {
    notFound();
  }

  const showTitle = movie.title || movie.name || "Unknown Title";
  
  return <WatchClient id={id} title={showTitle} />;
}
