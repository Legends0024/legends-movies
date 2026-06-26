export default function SkeletonGrid() {
  return (
    <div className="w-full min-h-screen pt-24 px-6 md:px-16 pb-20 bg-neutral-950">
      <div className="h-8 w-48 bg-neutral-800 rounded animate-pulse mb-8" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div 
            key={i} 
            className="w-full aspect-[2/3] bg-neutral-800 rounded-md animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
