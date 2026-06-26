"use client";

import Player from "./Player";

interface WatchClientProps {
  id: string;
  title: string;
}

export default function WatchClient({ id, title }: WatchClientProps) {
  return (
    <div className="flex flex-col w-screen h-screen bg-black overflow-hidden">
      <Player
        id={id}
        title={title}
        type="movie"
      />
    </div>
  );
}
