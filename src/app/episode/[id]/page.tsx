import React from 'react';
import Link from 'next/link';
import { fetchSingleEpisode } from '@/services/api';
import type { Episode } from '@/services/api';
import EpisodeDetail from '@/components/EpisodeDetail';

interface EpisodeDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function EpisodeDetailPage({ params }: EpisodeDetailPageProps) {
  let episode = null;
  let error = null;

  // Await params before accessing id
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  try {
    episode = await fetchSingleEpisode(parseInt(id));
  } catch (err) {
    error = 'Failed to load episode details. Please try again later.';
    console.error('Error fetching episode:', err);
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!episode) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-medium text-gray-700">Episode not found</h2>
        <Link href="/episodes" className="text-blue-500 hover:underline mt-4 inline-block">
          Back to Episodes
        </Link>
      </div>
    );
  }

  return <EpisodeDetail episode={episode} />;
}