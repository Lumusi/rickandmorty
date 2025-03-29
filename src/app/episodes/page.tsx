'use client';

import React, { useState, useEffect } from 'react';
import { fetchEpisodes } from '@/services/api';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';
import EpisodeCard from '@/components/EpisodeCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import type { Episode } from '@/services/api';

export default function EpisodesPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadEpisodes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await fetchEpisodes(currentPage, searchQuery);
        setEpisodes(data.results);
        setTotalPages(data.info.pages);
      } catch (err) {
        setError('Failed to load episodes. Please try again later.');
        console.error('Error fetching episodes:', err);
      } finally {
        setLoading(false);
      }
    };

    loadEpisodes();
  }, [currentPage, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top when changing page
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Episodes</h1>
        <p className="text-gray-600">Explore all episodes from the Rick and Morty series.</p>
      </div>

      <SearchBar 
        onSearch={handleSearch} 
        placeholder="Search for episodes..." 
      />

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : episodes.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-xl font-medium text-gray-700">No episodes found</h2>
          <p className="text-gray-500 mt-2">Try a different search term</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {episodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
          
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </>
      )}
    </div>
  );
} 