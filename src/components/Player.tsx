"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ServerCrash, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface PlayerProps {
  id: string;
  title: string;
  type: "movie" | "tv";
  season?: string;
  episode?: string;
  serverId?: string;
}

export default function Player({ id, title, type, season, episode, serverId = "vidsrc" }: PlayerProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Reset loading state when server changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasError(false);
  }, [serverId, id, season, episode]);

  // Generate URL based on server selection
  const queryParams = "?theme=16A085&autoPlay=true&title=true&poster=true";
  let videoUrl = "";
  
  if (type === "movie") {
    switch (serverId) {
      case "vidcore": videoUrl = `https://vidcore.net/movie/${id}${queryParams}`; break;
      case "vidsrc": videoUrl = `https://vidsrc.net/embed/movie?tmdb=${id}`; break;
      case "vidsrcpro": videoUrl = `https://vidsrc.pro/embed/movie/${id}`; break;
      case "superembed": videoUrl = `https://multiembed.mov/?video_id=${id}&tmdb=1`; break;
      case "2embed": videoUrl = `https://www.2embed.cc/embed/${id}`; break;
      default: videoUrl = `https://vidcore.net/movie/${id}${queryParams}`;
    }
  } else {
    switch (serverId) {
      case "vidcore": videoUrl = `https://vidcore.net/tv/${id}/${season}/${episode}${queryParams}`; break;
      case "vidsrc": videoUrl = `https://vidsrc.net/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`; break;
      case "vidsrcpro": videoUrl = `https://vidsrc.pro/embed/tv/${id}/${season}/${episode}`; break;
      case "superembed": videoUrl = `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${season}&e=${episode}`; break;
      case "2embed": videoUrl = `https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}`; break;
      default: videoUrl = `https://vidcore.net/tv/${id}/${season}/${episode}${queryParams}`;
    }
  }

  // Handle mouse movement to show/hide back button overlay
  useEffect(() => {
    const handleMouseMove = () => {
      setIsControlsVisible(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      controlsTimeoutRef.current = setTimeout(() => {
        setIsControlsVisible(false);
      }, 3000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-black text-white p-6">
        <ServerCrash className="w-16 h-16 text-brand mb-4" />
        <h1 className="text-2xl font-bold mb-2">Server Unavailable</h1>
        <p className="text-neutral-400 mb-6 text-center max-w-md">
          We&apos;re unable to connect to the video server right now. It might be down or blocked by your network.
        </p>
        <button
          onClick={() => router.back()}
          className="px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-neutral-200 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden group">
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black">
          <Loader2 className="w-12 h-12 text-brand animate-spin mb-4" />
          <p className="text-neutral-400 font-medium">Loading stream...</p>
        </div>
      )}

      {/* Video Iframe with exact attributes */}
      <iframe
        src={videoUrl}
        className="w-full h-full border-0 absolute inset-0 z-0"
        allowFullScreen
        allow="encrypted-media"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        title={`Playing ${title}`}
      />

      {/* Custom Back Button Overlay */}
      <div
        className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-500 ${
          isControlsVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute top-0 left-0 w-full p-6 flex items-center justify-between pointer-events-auto">
          <button
            onClick={() => router.back()}
            className="p-2 bg-black/40 rounded-full text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
            title="Go Back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
