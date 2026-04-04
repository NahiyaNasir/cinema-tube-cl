export default function GlobalLoading() {
  // Or a custom loading skeleton component
  const loadingSkeleton = <div className="h-48 w-full rounded-xl bg-linear-to-r from-muted via-muted/50 to-muted animate-pulse">Loading...</div>;
  return loadingSkeleton;
}