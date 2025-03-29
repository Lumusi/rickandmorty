'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchBar from '@/components/SearchBar';
import CharacterCard from '@/components/CharacterCard';
import LocationCard from '@/components/LocationCard';
import EpisodeCard from '@/components/EpisodeCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import Pagination from '@/components/Pagination';
import { searchAllContent } from '@/services/api';
import type { Character, Location, Episode } from '@/services/api';

// Create a SearchContent component that uses useSearchParams
function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('query') || '';
  
  const [characters, setCharacters] = useState<Character[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  
  // Calculate which content type has the most pages
  const calculateMaxPages = useCallback(() => {
    if (!characters.length && !locations.length && !episodes.length) return 0;
    return Math.max(
      characters.length ? 1 : 0,
      locations.length ? 1 : 0,
      episodes.length ? 1 : 0
    );
  }, [characters.length, locations.length, episodes.length]);

  // Function to load all results
  const loadAllResults = useCallback(async () => {
    if (!queryParam) {
      setCharacters([]);
      setLocations([]);
      setEpisodes([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const allResults = await searchAllContent(queryParam, currentPage);
      
      setCharacters(allResults.characters.results);
      setLocations(allResults.locations.results);
      setEpisodes(allResults.episodes.results);
      
      // Calculate total items count across all content types
      const totalItems = 
        allResults.characters.info.count + 
        allResults.locations.info.count + 
        allResults.episodes.info.count;
      setTotalCount(totalItems);
      
      // Set pages based on the content type with the most pages
      const maxPages = Math.max(
        allResults.characters.info.pages,
        allResults.locations.info.pages,
        allResults.episodes.info.pages
      );
      setTotalPages(maxPages);
    } catch (err) {
      console.error('Error fetching search results:', err);
      setError('Failed to load search results. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [queryParam, currentPage]);

  useEffect(() => {
    loadAllResults();
  }, [loadAllResults]);

  const handleSearch = (query: string) => {
    router.push(`/search?query=${encodeURIComponent(query)}`);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate total results count across all content types
  const totalItems = characters.length + locations.length + episodes.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="portal-gradient py-12 px-4 rounded-xl mb-8 text-white text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">Search Results</h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Explore the Rick and Morty universe by searching for characters, locations, and episodes.
        </p>
      </div>

      <SearchBar 
        onSearch={handleSearch} 
        placeholder="Search the multiverse..." 
        initialValue={queryParam}
      />

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded shadow-md">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      ) : totalItems === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-medium text-gray-700">No results found</h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            {queryParam 
              ? `We couldn't find anything matching "${queryParam}". Try a different search term.` 
              : "Enter a search term to explore the Rick and Morty universe."}
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 text-gray-600">
            Showing {totalItems} results matching "{queryParam}"
          </div>
          
          {/* Characters Section */}
          {characters.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">Characters ({characters.length})</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {characters.map((character) => (
                  <CharacterCard key={character.id} character={character} />
                ))}
              </div>
            </div>
          )}
          
          {/* Locations Section */}
          {locations.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">Locations ({locations.length})</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {locations.map((location) => (
                  <LocationCard key={location.id} location={location} />
                ))}
              </div>
            </div>
          )}
          
          {/* Episodes Section */}
          {episodes.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">Episodes ({episodes.length})</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {episodes.map((episode) => (
                  <EpisodeCard key={episode.id} episode={episode} />
                ))}
              </div>
            </div>
          )}
          
          {/* Only show pagination if there are multiple pages */}
          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          )}
        </>
      )}
    </div>
  );
}

// Main page component with Suspense boundary
export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SearchContent />
    </Suspense>
  );
} 