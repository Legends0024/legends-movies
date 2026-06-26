# LegendsMovies Streaming Platform

A professional, high-performance streaming web application built with Next.js 15, Tailwind CSS, and the TMDB API. It features a Netflix-style UI with modular React components, client-side bookmarking, and dynamic media embedding.

## Features
- **Next.js 15 App Router**: Server-side rendering and lightning-fast page transitions.
- **TMDB API Integration**: Dynamically fetches trending movies, series, and provider-specific categories (Netflix, Prime, Hotstar, Sony Liv, Apple TV+).
- **Live Search**: Real-time server-action debounced search with dropdown suggestions.
- **Premium UI**: Uses `bg-neutral-950`, glassmorphism, horizontal smooth scrolling (`overflow-x-auto` & `scrollbar-hide`), and modern Skeleton Loaders via `<Suspense>`.
- **Instant Playback**: Routes directly to a full-screen, embedded VidCore player.

## Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your TMDB API Key:
   ```env
   NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

