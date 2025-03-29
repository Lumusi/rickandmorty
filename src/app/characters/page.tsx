'use client';

import React, { useState, useEffect } from 'react';
import { fetchCharacters } from '@/services/api';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';
import CharacterCard from '@/components/CharacterCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import type { Character } from '@/services/api';

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await fetchCharacters(currentPage, searchQuery);
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      } catch (err) {
        setError('Failed to load characters. Please try again later.');
        console.error('Error fetching characters:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
  }, [currentPage, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top when changing page
  };

  return (
    <div>
      <div className="rick-gradient py-12 px-4 rounded-xl mb-8 text-white text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">Characters</h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Explore all characters from the Rick and Morty universe. From the Smith family to bizarre aliens and interdimensional beings.
        </p>
      </div>

      <SearchBar 
        onSearch={handleSearch} 
        placeholder="Search for characters by name..." 
      />

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded shadow-md">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      ) : characters.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-medium text-gray-700">No characters found</h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            We couldn't find any characters matching your search. Try a different search term or browse all characters.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 text-gray-600">
            Showing {characters.length} of {totalPages * 20} characters
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
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