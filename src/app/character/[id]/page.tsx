import React from 'react';
import Link from 'next/link';
import { fetchSingleCharacter } from '@/services/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import type { Character } from '@/services/api';
import CharacterDetail from '@/components/CharacterDetail';

interface CharacterDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CharacterDetailPage({ params }: CharacterDetailPageProps) {
  let character = null;
  let error = null;
  
  // Await params before accessing id
  const resolvedParams = await params;
  const id = resolvedParams.id;

  try {
    character = await fetchSingleCharacter(parseInt(id));
  } catch (err) {
    error = 'Failed to load character details. Please try again later.';
    console.error('Error fetching character:', err);
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!character) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-medium text-gray-700">Character not found</h2>
        <Link href="/characters" className="text-blue-500 hover:underline mt-4 inline-block">
          Back to Characters
        </Link>
      </div>
    );
  }

  return <CharacterDetail character={character} />;
} 