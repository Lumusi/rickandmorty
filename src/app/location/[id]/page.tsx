import React from 'react';
import Link from 'next/link';
import { fetchSingleLocation } from '@/services/api';
import type { Location } from '@/services/api';
import LocationDetail from '@/components/LocationDetail';

interface LocationDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function LocationDetailPage({ params }: LocationDetailPageProps) {
  let location = null;
  let error = null;

  // Await params before accessing id
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  try {
    location = await fetchSingleLocation(parseInt(id));
  } catch (err) {
    error = 'Failed to load location details. Please try again later.';
    console.error('Error fetching location:', err);
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!location) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-medium text-gray-700">Location not found</h2>
        <Link href="/locations" className="text-blue-500 hover:underline mt-4 inline-block">
          Back to Locations
        </Link>
      </div>
    );
  }

  return <LocationDetail location={location} />;
} 