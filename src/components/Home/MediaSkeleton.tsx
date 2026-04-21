 export default function MediaSkeleton() {
  return (
    <div className="min-w-37.5 md:min-w-45 animate-pulse">
      <div className="aspect-2/3 bg-white/10 rounded-xl mb-3" />
      <div className="h-4 w-3/4 bg-white/10 rounded" />
    </div>
  );
}