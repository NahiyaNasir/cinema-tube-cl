



import { Star, Share2, Bookmark, AlertCircle,  } from 'lucide-react';
import NotFound from '../../../notFound';
import { getMediaBySlug } from '@/src/service/media.service';
import { ClientMotionWrapper } from '@/src/components/Home/ClientMotionWrapper';




export default async function WatchPage({  params,
  searchParams,}:{  params: Promise<{ slug: string }>;
  searchParams: Promise<{ v?: string }>;}) {
      const { slug } = await params;

  console.log(slug);
  const { data: media } = await getMediaBySlug(slug);

console.log(media);
  if (!media) {
    NotFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pb-16">
      {/* Main Cinematic Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Video Player Wrapper */}
        <div className="relative aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl border border-slate-800">
          {media.streamingUrl ? (
            <iframe
              src={media.streamingUrl}
              title={media.title}
              className="absolute top-0 left-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full bg-slate-900 text-slate-400">
              <AlertCircle className="w-12 h-12 mb-2 text-rose-500 animate-pulse" />
              <p className="text-lg font-medium">Streaming link temporarily unavailable</p>
            </div>
          )}
        </div>

        {/* Client-side Animated Metadata & Controls */}
        <ClientMotionWrapper>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left/Center Column: Title, Meta, Description */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 rounded-full text-xs font-semibold tracking-wider uppercase">
                  {media.type ? 'Premium' : 'Free Stream'}
                </span>
                <span className="text-sm text-slate-400 font-medium">
                  {media.releaseYear}
                </span>
                <div className="flex items-center gap-1 text-amber-500 bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-bold">{media.avgRating.toFixed(1)}</span>
                  <span className="text-xs text-slate-400">/10</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                {media.title}
              </h1>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 pt-1">
                {media.genres.map((g) => (
                  <span 
                    key={g.id} 
                    className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-md text-xs text-slate-300 font-medium"
                  >
                    {g.name}
                  </span>
                ))}
              </div>

              <p className="text-slate-300 text-base leading-relaxed pt-2 border-t border-slate-900">
                {media.description}
              </p>
            </div>

            {/* Right Column: Actions & Interactive Panel */}
            <div className="space-y-4">
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 backdrop-blur-sm space-y-4">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                  Watch Actions
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 transition text-sm font-medium rounded-lg border border-slate-700">
                    <Bookmark className="w-4 h-4 text-slate-400" />
                    <span>Watchlist</span>
                  </button>
                  
                  <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 transition text-sm font-medium rounded-lg border border-slate-700">
                    <Share2 className="w-4 h-4 text-slate-400" />
                    <span>Share</span>
                  </button>
                </div>


              </div>
            </div>

          </div>
        </ClientMotionWrapper>

      </div>
    </div>
  );
}