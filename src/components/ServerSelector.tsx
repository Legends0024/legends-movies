"use client";

import React from "react";

export const SERVERS = [
  { id: "vidcore", name: "VidCore VIP", isPremium: true },
  { id: "vidsrc", name: "VidSrc", isPremium: false },
  { id: "vidsrcpro", name: "VidSrc Pro", isPremium: false },
  { id: "superembed", name: "SuperEmbed", isPremium: false },
  { id: "2embed", name: "2Embed", isPremium: false },
];

interface ServerSelectorProps {
  currentServer: string;
  onServerSelect: (serverId: string) => void;
}

export default function ServerSelector({ currentServer, onServerSelect }: ServerSelectorProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-3 px-4 bg-[#141414] border-b border-neutral-800">
      <span className="text-neutral-400 text-sm font-medium mr-2 flex-none hidden md:block">
        Servers:
      </span>
      {SERVERS.map((server) => {
        const isActive = currentServer === server.id;
        return (
          <button
            key={server.id}
            onClick={() => onServerSelect(server.id)}
            className={`flex-none px-4 py-1.5 rounded-sm text-sm font-semibold transition-colors flex items-center gap-2 ${
              isActive
                ? server.isPremium
                  ? "bg-[#E50914] text-white"
                  : "bg-white text-black"
                : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white"
            }`}
          >
            {server.isPremium && isActive && <span className="font-bold">$</span>}
            {server.name}
          </button>
        );
      })}
    </div>
  );
}
